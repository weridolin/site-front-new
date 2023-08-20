import { ref,reactive } from 'vue'
import SparkMD5 from 'spark-md5'
import { ElMessage } from 'element-plus'
import {FileBrokerApis} from 'src/services/apis/fileBroker'
import type {FileUploadSetupForm,fileSearchInfoResponse}  from 'src/services/apis/fileBroker'



const remainChunks = ref<FileBlob[]>([]) // 剩余切片
const isStop=ref(false) // 暂停上传控制
const percent=ref(0) // 上传百分比
const uploadedChunkSize=ref(0) // 已完成上传的切片数
const chunkSize= ref(2*1024*1024) // 切片大小


/** 文件对象状态 */
export type fileStateT={
    fileKey:string,
    fileName:string,
    chunkCount:number,
    fileList:Array<any>,
    downCode:string,
    fileSize:number,
    fileMD5:string,
    uploadUrl:string

}

const fileState = reactive<fileStateT>({
    fileKey:"",
    fileName:"",
    chunkCount:0,
    fileList:[],
    downCode:"",
    fileSize:0,
    fileMD5:"",
    uploadUrl:"api/v1/fileBroker"

})

/** 下载弹出框相关 */
const isShowDrawer = ref(false) //是否显示下载弹出框
export type downFormT={
    downCode: string,
    downFileName:string,
    downFileSize:number,
}

const downForm= reactive<downFormT>({
    downCode: "",
    downFileName:"",
    downFileSize:0,
})

const formLabelWidth=ref("120px")
const direction=ref("rtl")
const loading=ref(false) //加载
const loadingText=ref("文件分析中")

const drawerSize=ref("50%")
const isUploading=ref(false)

// uploadUrl:"/api/v1/fileBroker",


/** 文件切片结构 */
interface FileBlob {
    "index": number,
    "hash":any,
    "total": number,
    "name": string,
    "size": number,
    "chunk": Blob
}


/********************* methods  **********************/
function openDrawer(){
    downForm.downCode = fileState.downCode
    getFileInfoByDownCode()
}


function closeDrawer(){
    isShowDrawer.value = false
}

function cancelForm(){
    console.log(">>> close drawer")
}

function copyDownCode(){
    // 创建一个虚拟的input来实现
    let newInput = document.createElement("input");
    // 讲存储的数据赋值给input的value值
    newInput.value = fileState.downCode
    // appendChild() 方法向节点添加最后一个子节点。
    document.body.appendChild(newInput);
    // 选中input元素中的文本
    newInput.select();
    document.execCommand("Copy");   // 执行复制操
    newInput.remove() 
    ElMessage({
        message: '复制下载码成功!',
        type: 'success',
    })
}


/** 计算到期时间 */
function compute(_timedelta:number) {
    let secondTime = parseInt(String(_timedelta));// 秒
    let minuteTime = 0;// 分
    let hourTime = 0;// 小时
    if(secondTime > 60) {//如果秒数大于60，将秒数转换成整数
        //获取分钟，除以60取整数，得到整数分钟
        minuteTime = parseInt(String(secondTime / 60));
        //获取秒数，秒数取佘，得到整数秒数
        secondTime = parseInt(String(secondTime % 60));
        //如果分钟大于60，将分钟转换成小时
        if(minuteTime > 60) {
            //获取小时，获取分钟除以60，得到整数小时
            hourTime = parseInt(String(minuteTime / 60));
            //获取小时后取佘的分，获取分钟除以60取佘的分
            minuteTime = parseInt(String(minuteTime % 60));
        }
    }
    let time = "" + parseInt(String(secondTime)) + "秒";

    if(minuteTime > 0) {
        time = "" + parseInt(String(minuteTime)) + "分" + time;
    }
    if(hourTime > 0) {
        time = "" + parseInt(String(hourTime)) + "小时" + time;
    }
    return time;
}

/**文件大小校验 */
async function fileCheck(file:any,fileList:any){
    // console
    if (isUploading.value){
        ElMessage({
            message: '当前文件正在上传,请上传完成后再重新选择！',
            type: 'error'
        });
        return          
    }
    if (file.size > 500*1024*1024 ){
        ElMessage({
            message: '由于服务器原因,当前文件上传的大小最大只能不超过500m',
            type: 'error'
        });
        return      
    }else{
        if (file.size <= 200*1024*1024){            
            console.log(">>> chunk size","2MB")
            chunkSize.value = 2*1024*1024  
        }
        if (200*1024*1024 < file.size &&  file.size <= 500*1024*1024){
            console.log(">>> chunk size","2MB")
            chunkSize.value = 2*1024*1024  //太大进度条不能实施反馈
        }
    }
    isStop.value = false   
    loading.value = true
    let selectFileEL = document.querySelector("#selectFile")
    if (selectFileEL){
        selectFileEL.textContent= file.name
    }
    
    if (fileList.length >0) {
        fileList = [fileList[fileList.length - 1]]
    }
    let chunkInfo:any = await cutBlob(file)
    remainChunks.value = chunkInfo.chunkArr
    console.log(`>>> 文件切片列表 `,remainChunks.value)
    percent.value = 0
    loading.value = false
        
}

/** 文件切割 */
function cutBlob(file:any) {

    let chunkArr:FileBlob[] = [] // 所有切片缓存数组
    let blobSlice = File.prototype.slice
    // let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice // 切割Api不同浏览器分割处理
    let spark = new SparkMD5.ArrayBuffer() // 文件hash处理
    console.log(file.size,chunkSize.value,file.size / chunkSize.value)
    let chunkNums = Math.ceil(file.size / chunkSize.value) // 切片总数

    fileState.fileName = file.name
    fileState.fileSize = file.size
    fileState.chunkCount = chunkNums
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsArrayBuffer(file.raw)
        reader.addEventListener('loadend', () => {
            const content = reader.result
            spark.append(content)
            const hash = spark.end()
            fileState.fileMD5 = hash

            // 文件切割
            for(let i = 0; i < chunkNums; i++) {
                let startIndex = i * chunkSize.value
                let endIndex = startIndex + chunkSize.value
                endIndex > file.size && (endIndex = file.size)
                let contentItem = blobSlice.call(file.raw, startIndex, endIndex)
                chunkArr.push({
                    "index": i,
                    "hash":hash,
                    "total": chunkNums,
                    "name": file.name,
                    "size": file.size,
                    "chunk": contentItem
                }
                )
            }
            console.log("load end",chunkArr)
            resolve({
                chunkArr,
                fileInfo: {
                    hash,
                    total: chunkNums,
                    name: file.name,
                    size: file.size
                }
            })
        })
        reader.addEventListener('error', function _error(err) {
            reject(err)
        })
        }
    )
}


/**获取下载文件信息 */

async function getFileInfoByDownCode(){
    if(downForm.downCode.length==5){
        let res = await FileBrokerApis.getFileInfoByDownCode(downForm.downCode)
        if (res.data){
            if (res.data.length == 1){
                let downFileEle = document.querySelector(".downFile")
                if (downFileEle!==null){
                    downFileEle.textContent = res.data[0].file_name
                }
                let expireTime = document.querySelector(".expire-time")
                if (expireTime!==null){
                    expireTime.textContent=compute(res.data[0].timedelta)+ "  后过期"
                }
                downForm.downFileName = res.data[0].file_name
            }
            console.log(res,"GET FILE INFO BY DOWN CODE",res.data.length,res.data[0]);
        }else {
            console.log(">>> get file info by down code error",downForm.downCode,res)    
        }
    }else{
        let downFileEle = document.querySelector(".downFile")
        if (downFileEle!==null){
            downFileEle.textContent = ""
        }
        let expireTime = document.querySelector(".expire-time")
        if (expireTime!==null){
            expireTime.textContent=""
        }
        downForm.downFileName = ""
        downForm.downFileSize= 0
    }
}

/** 上传文件 */
function fileUpload() {
    if (fileState.fileName==null || fileState.fileName==""){
        ElMessage({
            message: '请先选择文件!',
            type: 'error'
            });
            return
    }
    if (isUploading.value){
        ElMessage({
            message: '当前文件正在上传!请耐心等待',
            type: 'error'
        });
        return
    }
    percent.value = 0
    uploadedChunkSize.value = 0
    fileUploadSetup()
}


/** 文件上传setup */
async function fileUploadSetup(){
    isUploading.value=true
    let dataForm:FileUploadSetupForm = {
        "file_name":fileState.fileName,
        "chunk_count":fileState.chunkCount,
        "md5":fileState.fileMD5
    } 
    let res = await FileBrokerApis.fileUploadSetup(dataForm,{
        timeout:3*60*1000
    }) 
    console.log("文件上传信息初始化",res)
    if (res.data.is_exist){
        // ElMessage({
        //     message: '授权码该文件已经存在,可直接下载',
        //     type: 'error'
        // })
        console.log("该文件已经存在且不过期,直接显示上传成功")
        percent.value =100
        isUploading.value=false
        if (res.data.file_info){
            fileState.downCode = res.data.file_info.download_code
            downForm.downCode = fileState.downCode
        }else {
            console.log(`返回格式有误`,res)
            ElMessage({
                message: `返回格式有误`,
                type: 'error'
            })
        }

    } else {
        if (res.data.key){
            fileState.fileKey = res.data.key
            sendRequest(6,uploadedCallback)    
        }else {
            console.log(`返回格式有误`,res)
            ElMessage({
                message: `返回格式有误`,
                type: 'error'
            })
        }
    }
    // await this.$post("/api/v1/fileBroker",data)
    //   .then(function (res) {
    //     console.log(res,"GET FILE UPLOAD INFO");
    //     if (res.is_exist){
    //       console.log(">>>>>>> is already exist !" ,res)
    //       that.percent = 100
    //       that.is_uploading = false
    //       that.down_code = res.data.download_code
    //     }else{
    //       that.file_key = res.key
    //       that.sendRequest(6,that.uploadedCallback)           
    //     }
    //   })
    //   .catch(function (error) {
    //     console.log(">>>",error)
    //   });
}

/** 发送上传请求 */
function sendRequest(marCor:number,finishCallback:any) {
    console.log(">>>> 开始上传文件,文件fileKey",fileState.fileKey)
    let promiseArr:Promise<object>[] = [] //所有切片上传的 promise
    let toFetch = ():Promise<any> => {
        if (isStop.value) {
            return Promise.reject('暂停上传')
        }
        if (!remainChunks.value.length) {
            console.log(">>>> 没有待上传的数据")
            return Promise.resolve()
        }

        const chunkItem = remainChunks.value.shift() //弹出数组第一项
        if (chunkItem !== undefined){
            const it = sendChunk(chunkItem) // it 为promise object

            // 定义下上传回调
            it.then(() => {
                // promise完成后会调用并从任务队列里面移除
                promiseArr.splice(promiseArr.indexOf(it), 1)
            }, (err:any) => {
                console.log(">>>> 上传发生错误",err)
                isStop.value = true
                if (chunkItem!=undefined){
                    remainChunks.value.unshift(chunkItem) //将 chunkItem 添加到列表头并返回长度
                    Promise.reject(err)
                }
                }
            )

            // 将该分片上传添加到任务列表里面
            promiseArr.push(it)
            let p = Promise.resolve()
            if (promiseArr.length >= marCor) {
                Promise.race(promiseArr).then(()=> toFetch()) // Promise.race 等待所有的promise完成或者所有其中有一个报错返回
            }
            return p.then(() => toFetch())
        } else {
            return Promise.reject("can not get file blob in")
        }
    }

    toFetch().then(() => {
        Promise.all(promiseArr).then(() => {
            finishCallback()
        })
    }, err => {
        console.log(`上传文件发生异常${err}`)
    })
    }

/** 发送文件切片 */
function sendChunk(item:FileBlob) {
    console.log(">>>>>发送分片",item)
    const formData = new FormData()
    formData.append("file", item.chunk)
    formData.append("key", fileState.fileKey)
    formData.append("chunk_num", item.index.toString())
    formData.append("md5", item.hash)
    formData.append("file_name", item.name)
    
    return FileBrokerApis.sendChunk(formData,{
        onUploadProgress(progressEvent) {
            const { loaded, total } = progressEvent //当前上传的数据大小 整个要上传的数据大小
            uploadedChunkSize.value += loaded < total ? 0 : +loaded  //TODO 只有上传完一个chunk才会更新一下进度 
            // this.uploadedChunkSize > item.size && (this.uploadedChunkSize = item.size)
            percent.value = parseInt((uploadedChunkSize.value / fileState.fileSize).toFixed(2))* 1000 / 10
        },
    })
}

/** 上传完成回调 */
function uploadedCallback(){
    // 上传完成后回调
    loadingText.value="上传完成文件合并中"
    loading.value=true
    console.log("上传完成,准备获取下载授权码")
    const data = {
        "file_key":fileState.fileKey,
    }  
    isUploading.value = false

    FileBrokerApis.uploadedCallback(data,{}).then(function (res) {
        // 注意这里的this不是指向Vue对象，this指向的是windows，和全局变量一样。
        fileState.downCode = res.data.code
        console.log(res,"文件上传完成,获取下载码");
        loadingText.value="分析文件中"
        loading.value=false
    
    }).catch(function (error) {
        console.log("文件下载完成,获取下载码失败!",error)
        loadingText.value="分析文件中"
        loading.value=false
    });


}


/** 下载文件 */
function downFile(){
    if( downForm.downCode==""||downForm.downCode==null || downForm.downCode.length!=5){
        ElMessage({
            message: '授权码非法',
            type: 'error'
        });
        return
    }
    const el = document.createElement('a');
    el.style.display = 'none';
    el.setAttribute('target', '_blank');
    /**
     * download的属性是HTML5新增的属性
     * href属性的地址必须是非跨域的地址，如果引用的是第三方的网站或者说是前后端分离的项目(调用后台的接口)，这时download就会不起作用。
     * 此时，如果是下载浏览器无法解析的文件，例如.exe,.xlsx..那么浏览器会自动下载，但是如果使用浏览器可以解析的文件，比如.txt,.png,.pdf....浏览器就会采取预览模式
     * 所以，对于.txt,.png,.pdf等的预览功能我们就可以直接不设置download属性(前提是后端响应头的Content-Type: application/octet-stream，如果为application/pdf浏览器则会判断文件为 pdf ，自动执行预览的策略)
     */  
    let _ = downForm.downCode && el.setAttribute('download', downForm.downFileName);
    el.href =`${import.meta.env.VITE_API_HOST}/fileBroker/api/v1/?down_code=${downForm.downCode}`;
    console.log(el,">>>> ADD DOWN HREF");
    document.body.appendChild(el);
    el.click();
    document.body.removeChild(el);
}

/****************************** created mounted   ******************/
function beforeunloadHandler (e:any) {
    window.confirm('刷新後当前页面的数据會丟失，确定要刷新？')
    e = e || window.event
    if (e) {
        e.returnValue = '关闭提示'
    }
    return '关闭提示'
} 

function init(){
    if(window.screen.availWidth<768){
        //移动端
            drawerSize.value="100%"
    }else{
        //PC端
        drawerSize.value="50%"
    }
}

export {
    remainChunks,
    isStop,
    isShowDrawer,
    percent,
    uploadedChunkSize,
    chunkSize,
    fileState,
    downForm,
    formLabelWidth,
    direction,
    loading,
    loadingText,
    drawerSize,
    isUploading,
    init,
    beforeunloadHandler,
    fileUpload,
    downFile,
    fileUploadSetup,
    sendChunk,
    sendRequest,
    fileCheck,
    openDrawer,
    cancelForm,
    copyDownCode,
    closeDrawer,
    getFileInfoByDownCode
}


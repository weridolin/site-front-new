import { ref,reactive } from 'vue'
import SparkMD5 from 'spark-md5'
import { ElMessage } from 'element-plus'
import {FileBrokerApis} from 'src/services/apis/fileBroker'


const remainChunks = ref([]) // 剩余切片
const isStop=ref(false) // 暂停上传控制
const percent=ref(0) // 上传百分比
const uploadedChunkSize=ref(0) // 已完成上传的切片数
const chunkSize= 2*1024*1024 // 切片大小

/** 文件对象状态 */
export type fileStateT={
    fileKey:string,
    fileName:string,
    chunkCount:number,
    fileList:Array<any>,
    downCode:string,
    fileSize:number,
    fileMD5:string,

}

const fileState = reactive<fileStateT>({
    fileKey:"",
    fileName:"",
    chunkCount:0,
    fileList:[],
    downCode:"",
    fileSize:0,
    fileMD5:"",

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

/** 文件上传setup */
// async function fileUploadSetup(){
//     isUploading.value=true
//     let that = this
//     const data = {
//       "file_name":this.fileName,
//       "chunk_count":this.chunkCount,
//       "md5":this.file_md5
//     }  
//     await this.$post("/api/v1/fileBroker",data)
//       .then(function (res) {
//         console.log(res,"GET FILE UPLOAD INFO");
//         if (res.is_exist){
//           console.log(">>>>>>> is already exist !" ,res)
//           that.percent = 100
//           that.is_uploading = false
//           that.down_code = res.data.download_code
//         }else{
//           that.file_key = res.key
//           that.sendRequest(6,that.uploadedCallback)           
//         }
//       })
//       .catch(function (error) {
//         console.log(">>>",error)
//       });
//   },



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
    el.href =`${import.meta.env.VITE_API_HOST}/api/v1/fileBroker?down_code=${downForm.downCode}`;
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
}


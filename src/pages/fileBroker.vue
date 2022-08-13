<template>
<div class="bg"     
  v-loading="loading"
  :element-loading-text="loadingText"
  element-loading-spinner="el-icon-loading"
  element-loading-background="rgba(0, 0, 0, 0.8)"  >
<el-row :gutter="20">
<div     
    class="zone2"
  >

    <!-- <el-upload
      class="upload"
      :multiple ="false"
      :auto-upload="false"
      :drag="true"
      :on-change="fileCheck"
      enctype="multipart/form-data"
      :file-list="fileState.fileList"
      :action="fileState.uploadUrl"
      :show-file-list ="false"
      >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击选择文件</em></div>
      <div class="el-upload__text" id="selectFile" >请先选择文件</div>
      <div class="el-upload__tip" >由于服务器网速的原因,不建议上传太大文件🤣</div>
    </el-upload> -->
    <el-upload
      class="upload"
      drag="true"
      :action="fileState.uploadUrl"
      :on-change="fileCheck"
      :multiple ="false"
      :auto-upload="false"
      :file-list="fileState.fileList"
      :show-file-list ="false"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        将文件拖到此处，或<em>点击选择文件</em>
      </div>
      <div class="el-upload__text" id="selectFile" >请先选择文件</div>
      <template #tip>
        <div class="el-upload__tip">
          由于服务器网速的原因,不建议上传太大文件🤣
        </div>
      </template>
    </el-upload>


    <el-button style="margin-left: 10px;" size="small" type="success" @click="fileUpload" id="uploadButton" class="uploadButton">上传到服务器</el-button>
    <el-button style="margin-left: 10px;" size="small"  @click="isShowDrawer=true" type="primary" id="downButton" class="downButton">下载文件</el-button>

    <div class="down-code" id="down-code">
      <el-input
        placeholder="下载授权码"
        v-model="fileState.downCode"
        class="down_code"
        id="down_code"
        >
        <i  class="el-icon-document-copy" id="downCode"  @click="copyDownCode"></i>
      </el-input>
    </div>
    <el-progress :text-inside="true" :stroke-width="26" v-if="!isNaN(percent)" :percentage="percent" id="uploadProgress" class="uploadProgress"></el-progress>

    <el-drawer
      title="文件下载"
      v-model="isShowDrawer"
      :direction="direction"
      :size ="getDrawerSize"
      @open="openDrawer">
        <div class="demo-drawer__content">
          <el-form :model="downForm">
            <el-form-item label="文件下载码" :label-width="formLabelWidth">
              <el-input v-model="downForm.downCode" autocomplete="off" @input="getFileInfoByDownCode"></el-input>
            </el-form-item>
            <el-form-item label="已上传文件" :label-width="formLabelWidth">
              <el-tag size="small" class="downFile" closable></el-tag>
            </el-form-item>
            <el-form-item label="过期时间" :label-width="formLabelWidth">
              <div class="expire-time"> </div>
            </el-form-item>
          </el-form>
          <div class="demo-drawer__footer">
            <el-button @click="closeDrawer">取 消</el-button>
            <el-button type="primary" @click="downFile" >确 定</el-button>
          </div>
        </div>
    </el-drawer>
</div>
</el-row>
</div>


</template>


<style scoped>

@import url(https://fonts.googleapis.com/css?family=Exo+2:400,700,500,300);
body {
  background: #2f6792;
  font-family: "Exo 2";
}

.el-upload-list__item.is-ready,
.el-upload-list__item.is-uploading {
  display: none !important;
}

.bg {
  position: absolute;
  top: 0; left: 0; bottom: 0; right: 0;
  margin: auto;
  position: absolute;
  background: url('src/assets/card-bg1.jpg') ;
  background-size: 100% 100%;
}

#selectFile {
  margin-top:1rem;
  font-weight: bolder;
}
.upload{
  margin-top:2rem;
  margin-bottom: 2rem;
}


.down-code{
  margin-top:1rem;
  margin-bottom: 2rem;
  vertical-align:middle;
  margin-left:auto; margin-right:auto;
  width:30%
}
.zone2  {
  position: absolute;
  top: 0; left: 0; bottom: 0; right: 0;
  margin: auto;
  text-align:center;
  width:80%;
  height:60%;  
  /* border:5px dashed white; */

  /* z-index: -999;
  filter: alpha(opacity=50);  
  -moz-opacity: 0.5;  
  -ms-opacity: 0.5;  
  -webkit-opacity: 0.5;  
  -o-opacity: 0.5;   */
  /* opacity: 0.5; */
  position: absolute;
  background: url('src/assets/card-bg1.jpg') ;
  background-size: 100% 100%;

}

#downCode{
  vertical-align:middle;
  margin: auto;
  text-align:center;
}
.uploadProgress {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.downButton {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.uploadButton {
  margin-top: 2rem;
  margin-bottom: 2rem;
}


</style>

<script setup lang="ts">
  import {
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
  } from 'src/pages/fileBroker'

  import {onMounted,onUnmounted} from  "vue"


  onMounted(() => {
    window.addEventListener('beforeunload', e => beforeunloadHandler(e))
  })

  onUnmounted(
    () => {
    window.removeEventListener('beforeunload', e => beforeunloadHandler(e))
  })


  function getDrawerSize(){
    if(window.screen.availWidth<768){
    //移动端
      drawerSize.value="100%"
    }else{
        //PC端
      drawerSize.value="80%"
    }
  }

</script>


<!-- <script>
import SparkMD5 from 'spark-md5'

export default {
  name: "fileBroker",
  data(){
    return {
      remainChunks: [], // 剩余切片
      isStop : false, // 暂停上传控制
      percent :0 ,// 上传百分比
      uploadedChunkSize:0, // 已完成上传的切片数
      chunkSize:2*1024*1024 ,// 切片大小
      file_key:null, //后台生成的文件 key
      fileName:"",//文件名称
      chunkCount:0,//切片数量
      fileList:[],//文件列表
      uploadUrl:"/api/v1/fileBroker",
      isStop:false, //是否停止状态
      down_code:null,//下载授权码
      drawer: false,
      downForm:{
        down_code: '',
        down_fileName:"",
        down_fileSize:""
      },
      formLabelWidth:"120px",
      direction:"rtl",
      loading:false, //加载
      loadingText:"文件分析中",
      file_md5:"",//文件MD5
      drawerSize:"50%",
      file_size:null,//文件总大小
      is_uploading:false
    }
  },
  methods:{
    openDrawer(){
      if (this.down_code!=null){
        this.downForm.down_code = this.down_code
        this.getFileInfoByDownCode()
      } 
    },
    closeDrawer(){
      this.drawer = false
    },

    cancelForm(){
      console.log(">>> close drawer")
    },
    copyDownCode(){
        // 创建一个虚拟的input来实现
        let newInput = document.createElement("input");
        // 讲存储的数据赋值给input的value值
        newInput.value = this.down_code;
        // appendChild() 方法向节点添加最后一个子节点。
        document.body.appendChild(newInput);
        // 选中input元素中的文本
        newInput.select();
        document.execCommand("Copy");   // 执行复制操
        newInput.remove() 
        this.$message({
          message: '复制成功',
          type: 'success'
        });
    },
    async upChange(file, fileList){
      if (this.is_uploading){
        this.$message({
          message: '当前文件正在上传,请上传完成后再重新选择！',
          type: 'error'
        });
        return          
      }
      if (file.size > 500*1024*1024 ){
        this.$message({
          message: '由于服务器原因,当前文件上传的大小最大只能不超过500m',
          type: 'error'
        });
        return      
      }else{
        if (file.size <= 200*1024*1024){            
          console.log(">>> chunk size","2MB")
          this.chunkSize = 2*1024*1024  
        }
        if (200*1024*1024 < file.size <= 500*1024*1024){
          console.log(">>> chunk size","2MB")
          this.chunkSize = 2*1024*1024  //太大进度条不能实施反馈
        }
      }
      this.isStop = false   
      this.loading = true
      document.querySelector("#selectFile").textContent= file.name
        if (fileList.length >0) {
            this.fileList = [fileList[fileList.length - 1]]
        }
      const chunkInfo = await this.cutBlob(file)
      this.remainChunks = chunkInfo.chunkArr
      this.fileInfo = chunkInfo.fileInfo
      this.percent = 0
      this.loading = false
            
    },  

    cutBlob(file) {
        const chunkArr = [] // 所有切片缓存数组
        const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice // 切割Api不同浏览器分割处理
        const spark = new SparkMD5.ArrayBuffer() // 文件hash处理
        const chunkNums = Math.ceil(file.size / this.chunkSize) // 切片总数
        this.fileName = file.name
        this.file_size = file.size
        this.chunkCount = chunkNums
        console.log(">>> 文件大小",file.size,"切割后的文件数目",chunkNums)
        let that=this
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsArrayBuffer(file.raw)
            reader.addEventListener('loadend', () => {
                const content = reader.result
                spark.append(content)
                const hash = spark.end()
                that.file_md5 = hash
                let startIndex = ''
                let endIndex = ''
                let contentItem = ''
            // 文件切割
                for(let i = 0; i < chunkNums; i++) {
                  startIndex = i * this.chunkSize
                  endIndex = startIndex + this.chunkSize
                  endIndex > file.size && (endIndex = file.size)
                  contentItem = blobSlice.call(file.raw, startIndex, endIndex)
                  chunkArr.push({
                  index: i,
                  hash,
                  total: chunkNums,
                  name: file.name,
                  size: file.size,
                  chunk: contentItem
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
    },
    uploadFile() {
      if (this.fileName==null | this.fileName==""){
      this.$message({
          message: '请先选择文件!',
          type: 'error'
        });
        return
      }
      if (this.is_uploading){
        this.$message({
          message: '当前文件正在上传!请耐心等待',
          type: 'error'
        });
        return
      }
      this.percent = 0
      this.uploadedChunkSize = 0
      this.fileUploadSetup()
      // this.sendRequest(6,this.uploadedCallback)
    },

    sendRequest(max=6,callback) {
      console.log(">>>> 开始上传文件",this.file_key)
      let fetchArr = []
      let toFetch = () => {
        if (this.isStop) {
          return Promise.reject('暂停上传')
        }
        if (!this.remainChunks.length) {
          console.log(">>>> 没有待上传的数据")
          return Promise.resolve()
        }

        const chunkItem = this.remainChunks.shift() //弹出数组第一项
        const it = this.sendChunk(chunkItem)
        it.then(() => {
          // 上传完成后会调用并从任务队列里面移除
          fetchArr.splice(fetchArr.indexOf(it), 1)
          }, err => {
            console.log(">>>> 上传发生错误",err)
            this.isStop = true
            this.remainChunks.unshift(chunkItem) //将 chunkItem 添加到列表头并返回长度
            Promise.reject(err)
            }
        )

        // 将该分片上传添加到任务列表里面
        fetchArr.push(it)
        let p = Promise.resolve()
        if (fetchArr.length >= max) {
          p = Promise.race(fetchArr)
        }
        return p.then(() => toFetch())
      }

      toFetch().then(() => {
        Promise.all(fetchArr).then(() => {
          callback()
        })
      }, err => {
        console.log(err)
      })
    },

    uploadedCallback(){
      // 上传完成后回调
      let that = this
      this.loadingText="上传完成文件合并中"
      this.loading=true
      console.log(">>> 上传完成,准备获取下载授权码")
      const data = {
        "file_key":that.file_key,
      }  
      this.is_uploading = false
      this.$post("/api/v1/fileBroker/downCode",data)
        .then(function (res) {
          // 注意这里的this不是指向Vue对象，this指向的是windows，和全局变量一样。
          that.down_code = res.code
          console.log(res,"GET down load code");
          that.loadingText="分析文件中"
          that.loading=false
          
        })
        .catch(function (error) {
          console.log(">>> GET down load code error",error)
        });

    },

    sendChunk(item) {
      console.log(">>>>>发送分片",item)
      const formdata = new FormData()
      formdata.append("file", item.chunk)
      formdata.append("key", this.file_key)
      formdata.append("chunk_num", item.index)
      formdata.append("md5", item.hash)
      formdata.append("file_name", item.name)

      
      return this.$http({
        url: "/api/v1/fileBroker",
        method: "put",
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" },
        timeout:0,
        onUploadProgress: (event) => {
          const { loaded, total } = event //当前上传的数据大小 整个要上传的数据大小
          this.uploadedChunkSize += loaded < total ? 0 : +loaded  //TODO 只有上传完一个chunk才会更新一下进度 
          // this.uploadedChunkSize > item.size && (this.uploadedChunkSize = item.size)
          this.percent = (this.uploadedChunkSize / this.file_size).toFixed(2) * 1000 / 10
        }
      })
    },

    async fileUploadSetup(){
      this.is_uploading=true
      let that = this
      const data = {
        "file_name":this.fileName,
        "chunk_count":this.chunkCount,
        "md5":this.file_md5
      }  
      await this.$post("/api/v1/fileBroker",data)
        .then(function (res) {
          console.log(res,"GET FILE UPLOAD INFO");
          if (res.is_exist){
            console.log(">>>>>>> is already exist !" ,res)
            that.percent = 100
            that.is_uploading = false
            that.down_code = res.data.download_code
          }else{
            that.file_key = res.key
            that.sendRequest(6,that.uploadedCallback)           
          }
        })
        .catch(function (error) {
          console.log(">>>",error)
        });
    },

    getFileInfoByDownCode(){
      if(this.downForm.down_code.length==5){
        let that = this
        this.$get("/api/v1/fileBroker/search/"+this.downForm.down_code)
          .then(function (res) {
            console.log(res,"GET FILE INFO BY DOWN CODE",res.data.length,res.data[0]);
            if (res.data.length == 1){
                // console.log(document.querySelector(".downFile"))
                document.querySelector(".downFile").textContent = res.data[0].file_name
                document.querySelector(".expire-time").textContent = that.compute(res.data[0].timedelta)+ "  后过期"
                that.downForm.down_fileName = res.data[0].file_name
              }
            
          })
          .catch(function (error) {
            console.log(">>>",error)
          });
      } else{
        document.querySelector(".downFile").textContent = ""
        document.querySelector(".expire-time").textContent=""
        this.downForm.down_fileName = ""
      }
    },

    downFile(){
      if( this.downForm.down_code==""||this.downForm.down_code==null || this.downForm.down_code.length!=5){
        this.$message({
          message: '授权码非法',
          type: 'error'
        });
        return
      }
      let that = this
      const downCode = this.downForm.down_code
      const el = document.createElement('a');
      el.style.display = 'none';
      el.setAttribute('target', '_blank');
    /**
       * download的属性是HTML5新增的属性
       * href属性的地址必须是非跨域的地址，如果引用的是第三方的网站或者说是前后端分离的项目(调用后台的接口)，这时download就会不起作用。
       * 此时，如果是下载浏览器无法解析的文件，例如.exe,.xlsx..那么浏览器会自动下载，但是如果使用浏览器可以解析的文件，比如.txt,.png,.pdf....浏览器就会采取预览模式
       * 所以，对于.txt,.png,.pdf等的预览功能我们就可以直接不设置download属性(前提是后端响应头的Content-Type: application/octet-stream，如果为application/pdf浏览器则会判断文件为 pdf ，自动执行预览的策略)
       */  
      that.downForm.down_fileName && el.setAttribute('download', that.downForm.down_fileName);
      el.href =`${process.env.VUE_APP_API_URL}/api/v1/fileBroker?down_code=${downCode}`;
      console.log(el);
      document.body.appendChild(el);
      el.click();
      document.body.removeChild(el);
    },

    compute(timestamps){
      var secondTime = parseInt(timestamps);// 秒
      var minuteTime = 0;// 分
      var hourTime = 0;// 小时
      if(secondTime > 60) {//如果秒数大于60，将秒数转换成整数
          //获取分钟，除以60取整数，得到整数分钟
          minuteTime = parseInt(secondTime / 60);
          //获取秒数，秒数取佘，得到整数秒数
          secondTime = parseInt(secondTime % 60);
          //如果分钟大于60，将分钟转换成小时
          if(minuteTime > 60) {
              //获取小时，获取分钟除以60，得到整数小时
              hourTime = parseInt(minuteTime / 60);
              //获取小时后取佘的分，获取分钟除以60取佘的分
              minuteTime = parseInt(minuteTime % 60);
          }
      }
      var time = "" + parseInt(secondTime) + "秒";

      if(minuteTime > 0) {
        time = "" + parseInt(minuteTime) + "分" + time;
      }
      if(hourTime > 0) {
        time = "" + parseInt(hourTime) + "小时" + time;
      }
      return time;
    },
    beforeunloadHandler (e) {
      window.confirm('刷新後当前页面的数据會丟失，确定要刷新？')
      e = e || window.event
      if (e) {
        e.returnValue = '关闭提示'
      }
      return '关闭提示'
    } 
  },
  props:{
  },
  created(){
    if(window.screen.availWidth<768){
    //移动端
      this.drawerSize="100%"
    }else{
        //PC端
      this.drawerSize="50%"
    }
  },
  mounted(){
    window.addEventListener('beforeunload', e => this.beforeunloadHandler(e))
  },
  destroyed () {
    window.removeEventListener('beforeunload', e => this.beforeunloadHandler(e))
  },
};
</script> -->
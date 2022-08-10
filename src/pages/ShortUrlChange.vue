<template>
<div class="bg">
<div class="shortUrlForm">
    <el-form :model="form">
        <el-form-item label="原url链接">
            <el-input v-model="form.url" type="textarea"/>
        </el-form-item>

        <el-form-item label="生成类型">
            <el-radio-group v-model="form.type">
                <el-radio label="self">本网站</el-radio>
                <el-radio label="xl" disabled >新浪</el-radio>
                <el-radio label="tx" disabled >腾讯</el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item label="描述">
            <el-input v-model="form.description" type="textarea"/>
        </el-form-item>

          <el-form-item label="过期时间">
              <el-date-picker
                v-model="expire_time"
                type="datetime"
                placeholder="Select date and time"
              />
          </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="getShortUrl">生成</el-button>
        </el-form-item>

        <el-form-item label="生成的短链接">
          <el-input v-model="shortUrl" type="textarea"/>
        </el-form-item>

      </el-form>
</div>
</div>



</template>

<script setup lang="ts">
import {ref,reactive,computed} from 'vue'
import {ThirdApis} from "src/services/apis/third"
import {ElMessage} from "element-plus"
import type {CreateShortUrlForm} from "src/services/apis/third"
import { CONFIG } from 'src/config'


const isLoading= ref(false)
const form:CreateShortUrlForm = reactive({
    "url":"",
    "expire_time":0,
    "type":"self",
    "description":"",
    "short_flag":""
})
const shortUrl=ref("")
const expire_time = ref()

function gettimedelta(value: any) {
  console.log(">>>>>>>",value)
  return Math.ceil((new Date(value).getTime() - new Date().getTime())/1000)
}

function getShortUrl(){
    isLoading.value=true
    form.expire_time = gettimedelta(expire_time.value)
    if (form.expire_time <= 0){
      ElMessage.error("到期时间不能小于当前时间!")
      return
    }
    ThirdApis.createShortUrl(form,{
        timeout:2*60*1000
    }).then(function(res){
        console.log(">>> 生成短链接成功",res)
        ElMessage.success("生成短链接成功!")
        form.short_flag = res.data.short_flag
        shortUrl.value =`${CONFIG.API_HOST}/api/v1/third/shortUrl/${form.short_flag}`
    }).catch(function(err){
        console.log(">>> 生成短链接异常",err)
        ElMessage.error(`生成短链接异常:${err.data.message}`)
    })
}

</script>


<style  scoped>

.bg {

  background: url('src/assets/card-bg1.jpg') ;
  background-size: 100% 100%;
}


@media screen and (max-width: 2560px){
  .shortUrlForm {
    /* display: flex; */
    justify-content: center;
    align-items: center;
    width: 80%;
    padding-top: 10%;
    padding-left: 20%;
    padding-bottom: 15%;
  }
}

@media screen and (max-width: 960px){
  .shortUrlForm {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 15%;
  padding-left: 0%;
  padding-bottom: 0%
}
}
</style>
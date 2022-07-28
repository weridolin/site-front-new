<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">
            {{state =='login'?"登录":"注册"}}
          </h1>
          <!-- <p class="text-xs-center">
            <AppLink name="register">
              Need an account?
            </AppLink>
          </p> -->

          <!-- <ul class="error-messages">
            <li
              v-for="(error, field) in errors"
              :key="field"
            >
              {{ field }} {{ error ? error[0] : '' }}
            </li>
          </ul> -->

          <form
            ref="formRef"
            @submit.prevent="submit"
          >
            <fieldset class=" form-group">
              <input
                v-model="form.email"
                class="form-control form-control-lg"
                type="email"
                required
                placeholder="email"
                v-if="state=='register'"
              >
            </fieldset>
            <fieldset
              class="form-group"
              aria-required="true"
            >
              <input
                v-model="form.username"
                class="form-control form-control-lg"
                required
                placeholder="username"
              >
            </fieldset>
            <fieldset class=" form-group">
              <input
                v-model="form.password"
                class="form-control form-control-lg"
                type="password"
                required
                placeholder="Password"
              >
            </fieldset>
            <button
              class="btn btn-lg btn-primary pull-xs-right"
              :disabled="!form.username || !form.password"
              type="submit"
            >
              {{state =='login'?"登录":"注册"}}
            </button>
              <el-link type="primary" 
                  @click="changeRegister"
                  style="{font-weight:500;text-decoration:underline;font-style:italic;padding-top: 15px;padding-left: 5px;}">
                    {{state =='login'?"没有账号?":"已有账号!"}}
                  </el-link>
              <!-- <button
              class="btn btn-lg btn-primary pull-xs-right"
              :disabled="!form.username || !form.password"
              type="submit"
            >
              {{state =='login'?"登录":"注册"}}
            </button> -->
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { routerPush,router } from 'src/router'
  import { AuthApis } from "src/services/apis/auth"
  import { useAuthStore } from 'src/store/user'
  import { reactive, ref } from 'vue'
  import {ElMessage} from "element-plus"
  import type {
    loginFormOrRegisterForm
  } from "src/services/apis/auth"


  const state=ref<"register"|"login">("login")
  const isLoginOrRegister=ref(false)
  const loadingContent = ref("正在登录...")
  const form = reactive<loginFormOrRegisterForm>({
    username:"",
    password:"",
    telephone:"",
    email:"",
  })

  const {updateUserInfo,updateToken} = useAuthStore()

  function submit(){
    return state.value=="login"?login():register()
  }

  function login(){
      console.log(">>登录")
      isLoginOrRegister.value=true
      loadingContent.value="正在登录..."
      AuthApis.login(form,{
        timeout:1000*2*60
      }).then(function(res){
        if (res.code!=-1){
          ElMessage.success(`登录成功!`)
          console.log(">>> 登录成功",res)
          updateUserInfo({
            profile:res.data.profile,
            permissions_dict:res.data.permissions_dict
          })
          updateToken(res.data.access_token,res.data.refresh_token)
          console.log("更新store完成",useAuthStore().userInfo,useAuthStore().tokens)
          const curr = localStorage.getItem('preRoute')
          if (curr == null || curr=="/login") {
            routerPush("Index");
          } else {
            console.log(">>curr",curr)
            router.push({ path: curr });
          }
        }else{
          ElMessage.error(`T T 登录异常: (${res.message})`)
        }
        isLoginOrRegister.value=false
      }).catch(function(err){
          console.log(">>> 登录异常",err)
          ElMessage.error(`T T 登录异常:${err.data.message}!`)
          isLoginOrRegister.value=false
      }) 
  }

  function changeRegister(){
    state.value=="register"?state.value="login":state.value="register"
  }


  function register(){
    console.log(">>> 注册")
    isLoginOrRegister.value=true
    loadingContent.value="正在注册..."
    AuthApis.register(
      form,{
        timeout:2*60*1000
      }
    ).then(function(res){
      console.log(">>> 注册成功",res)
      ElMessage.success(`登录成功!`)
      state.value="login"

    }).catch(function(err){
      ElMessage.error(`T T 注册失败:${err.data.message}!`)
    })
  }

</script>

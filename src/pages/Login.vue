<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">
            登录
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
            @submit.prevent="login"
          >
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
              登录
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { routerPush } from 'src/router'
  import { AuthApis } from "src/services/apis/auth"
  import { useAuthStore } from 'src/store/user'
  import { reactive, ref } from 'vue'
  import {ElMessage} from "element-plus"
  import type {
    loginForm
  } from "src/services/apis/auth"

  const isLogining=ref(false)
  const form = reactive<loginForm>({
    username:"",
    password:"",
    telephone:"",
    email:"",
  })

  const {updateUserInfo,updateToken} = useAuthStore()

  function login(loginForm:loginForm){
      isLogining.value=true
      AuthApis.login(loginForm,{
        timeout:1000*2*60
      }).then(function(res){
        if (res.code!=-1){
          ElMessage.success(`登录成功!`)
          console.log(">>> 登录成功",res)
          updateUserInfo({
            profile:res.profile,
            permissions_dict:res.permissions_dict
          })
          updateToken(res.access_token,res.refresh_token)
        }else{
          ElMessage.error(`T T 登录异常!(${res.message})`)
        }
        isLogining.value=false
      }).catch(function(err){
          ElMessage.error(`T T ${err.response.data.message}!`)
          isLogining.value=false
      }) 
  }


</script>

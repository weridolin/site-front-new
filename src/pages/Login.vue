<template>
  <div class="auth-page">
    <!-- <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">
            Sign in
          </h1>
          <p class="text-xs-center">
            <AppLink name="register">
              Need an account?
            </AppLink>
          </p>

          <ul class="error-messages">
            <li
              v-for="(error, field) in errors"
              :key="field"
            >
              {{ field }} {{ error ? error[0] : '' }}
            </li>
          </ul>

          <form
            ref="formRef"
            @submit.prevent="login"
          >
            <fieldset
              class="form-group"
              aria-required="true"
            >
              <input
                v-model="form.email"
                class="form-control form-control-lg"
                type="email"
                required
                placeholder="Email"
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
              :disabled="!form.email || !form.password"
              type="submit"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div> -->
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

  const {updateUserInfo,updateToken} = useAuthStore()

  function login(loginForm:loginForm){
      isLogining.value=true
      AuthApis.login(loginForm,{
        timeout:1000*2*60
      }).then(function(res){
        if (res.code!=-1){
          ElMessage.success(`登录成功!`)
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
          ElMessage.error(`T T 登录异常!(${err})`)
          isLogining.value=false
      }) 
  }


</script>

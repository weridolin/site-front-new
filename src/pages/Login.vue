<template>
  <div class="auth-page" 
    v-loading="isLoginOrRegister"
    :element-loading-text="loadingContent"
    :element-loading-spinner="svg"
    element-loading-svg-view-box="-10, -10, 50, 50"
    element-loading-background="rgba(122, 122, 122, 0.8)">
    <div class="container page"
    >
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">
            <!-- {{state =='login'?"登录":"注册"}} -->
            {{title}}
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
              <!-- {{state =='login'?"登录":"注册"}} -->
              {{title}}
            </button>
              <el-link type="primary" 
                  @click="changeRegister"
                  style="{font-weight:500;text-decoration:underline;font-style:italic;padding-top: 15px;padding-left: 5px;}">
                    {{state =='login'?"没有账号?":'bind'?'没有账号?':"已有账号!"}}
              </el-link>

              <!-- <el-button
                type="primary"
                class="iconfont tianji-icongithub"
                circle
                style="{padding-top: 15px;padding-left: 25px;}"
              ></el-button> -->

              <el-link 
                ref="buttonRef" 
                v-click-outside="onClickOutside"
                style="{font-weight:500;text-decoration:underline;font-style:italic;padding-top: 15px;padding-left: 25px;}">
                  其他登录方式 ->
              </el-link>

                <el-popover
                  ref="popoverRef"
                  :virtual-ref="buttonRef"
                  trigger="click"
                  title="第三方登录"
                  virtual-triggering
                >
                  <el-row> 
                      <el-button
                        size="small"
                        type="primary"
                        class="iconfont icongithub"
                        circle
                        @click="GetThirdLoginUrl('github')"
                      ></el-button>
                      <el-button
                        size="small"
                        type="success"
                        class="iconfont iconweixin1" 
                        circle
                        @click="GetThirdLoginUrl('wechat')"
                      ></el-button>
                      <el-button
                        type="info"
                        size="small"
                        class="iconfont iconQQ1" 
                        circle
                        @click="GetThirdLoginUrl('qq')"
                      ></el-button>
                  </el-row>  
                </el-popover>

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
  import { reactive, ref ,unref,onMounted,computed} from 'vue'
  import {ElMessage} from "element-plus"
  import { useRouter} from 'vue-router'
  import type {
    loginFormOrRegisterForm,
  } from "src/services/apis/auth"

  import { ClickOutside as vClickOutside } from 'element-plus'
  const buttonRef = ref()
  const popoverRef = ref()
  const onClickOutside = () => {
    unref(popoverRef).popperRef?.delayHide?.()
  }

  // 状态
  const state=ref<"register"|"login"|"bind">("login")
  const isLoginOrRegister=ref(false)
  const loadingContent = ref("正在登录...")
  const svg = `
          <path class="path" d="
            M 30 15
            L 28 17
            M 25.61 25.61
            A 15 15, 0, 0, 1, 15 30
            A 15 15, 0, 1, 1, 27.99 7.5
            L 15 15
          " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
        `
  const bind_id = ref()

  const form = reactive<loginFormOrRegisterForm>({
    username:"",
    password:"",
    telephone:"",
    email:"",
  })

  // const {updateUserInfo,updateToken} = useAuthStore()

  const title = computed( 
    () => {
      switch (state.value) {
        case "register":
          return '注册';
        case "bind":
          return '绑定账号';      
        default:
          return '登录'
      }})

  function submit(){
    switch (state.value) {
      case "register":
        register()
        break;
      case "login":
        login()
        break;    
      case "bind":
        bindAccount()
        break;    
    }
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
          console.log(">>> 登录成功",res.data)
          useAuthStore().updateUserInfo(res.data.user_info)
          useAuthStore().updateToken(res.data.access_token,res.data.refresh_token)
          console.log("更新store完成",useAuthStore().userInfo)

          // 跳转回登陆前的页面
          const prePage = localStorage.getItem('preRoute')
          if (prePage == null || prePage=="/login") {
            routerPush("Index");
          } else {
            console.log(">>curr",prePage)
            router.push({ path: prePage });
          }
        }else{
          ElMessage.error(`T T 登录异常: (${res.message})`)
        }
        // isLoginOrRegister.value=false
      }).catch(function(err){
          console.log(">>> 登录异常",err)
          ElMessage.error(`T T 登录异常:${err.data.message}!`)
          // isLoginOrRegister.value=false
      }).finally(()=>{
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
      ElMessage.success(`注册成功!`)
      isLoginOrRegister.value=false
      if (bind_id.value){
          state.value="bind"
          bindAccount()
      }else{
        state.value="login"
      }
      
    }).catch(function(err){
      ElMessage.error(`T T 注册失败:${err.data.message}!`)
      isLoginOrRegister.value=false
      state.value="register"
    })
  }

//############################## thirdLogin ###############################
  const router = useRouter()
  onMounted(() => {
    // 打印
    console.log('router:', router.currentRoute.value.query)
    let queryParmas=router.currentRoute.value.query
    if (queryParmas && queryParmas.type){
      switch (queryParmas.type) {
        case "github":
            loginByGithub(queryParmas.code as string)
          break;
        case "wechat":
            loginByWechat()
          break;   
        case "qq":
            loginByQQ()
          break;
        default:
          break;
      }
    }
  })

  function loginByGithub(authCode:string){
    isLoginOrRegister.value=true
    loadingContent.value="正在登录..."
    AuthApis.loginByGithub(authCode,{
      timeout:2*1000*60
    }).then(function(res){
      ElMessage.success("第三方登录成功")
      console.log(">>> 第三方登录成功",res)
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
      isLoginOrRegister.value=false
      loadingContent.value="正在登录..."
    }).catch(function(err){
      console.log(">>>登录 by github 异常！",err)
      if (err.data.status==404){
        state.value="bind",
        ElMessage.warning("请先绑定账号!")
        bind_id.value = err.data.data.oauth_id
      }else{
        ElMessage.error(`登录异常${err.data.message}`)
      }
      isLoginOrRegister.value=false
      loadingContent.value="正在登录..."
    })
  }
  function loginByWechat(){
    console.log(">>> login by wechat ")
  }
  function loginByQQ(){
    console.log(">>> login by qq ")
  }

  function GetThirdLoginUrl(type:string){
    AuthApis.getThirdLoginUrl(type,{
      timeout:2*60*1000
    }).then(function(res){
      let url = res.data.url
      window.location.href=url
    }).catch(function(res){
      ElMessage.error(res.data.message)
    })
  }

  function bindAccount(){
    isLoginOrRegister.value=true
    loadingContent.value="正在绑定账户..."
    AuthApis.bindAccount(form,bind_id.value,{
      timeout:2*60*1000
    }).then(function(res){
        ElMessage.success(`绑定成功!`)
        console.log(">>> 绑定成功",res)
        updateUserInfo({
          profile:res.data.profile,
          permissions_dict:res.data.permissions_dict
        })
        updateToken(res.data.access_token,res.data.refresh_token)
        console.log("更新store完成",useAuthStore().userInfo,useAuthStore().tokens)
        bind_id.value=null
        const curr = localStorage.getItem('preRoute')
        if (curr == null || curr=="/login") {
          routerPush("Index");
        } else {
          console.log(">>curr",curr)
          router.push({ path: curr });
    }
    }).catch(function(err){
      isLoginOrRegister.value=false
      loadingContent.value="正在登录..."
      ElMessage.error(`T T 绑定失败:${err.data.message}`)
    })
  }

</script>

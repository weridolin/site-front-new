
import { routerPush, router } from 'src/router'
import { AuthApis } from 'src/services/apis/auth'
import type { Menu, loginFormOrRegisterForm } from 'src/services/apis/auth'
import { useAuthStore } from 'src/store/user'
import { ref } from 'vue'
import { ElMessage, ClickOutside as vClickOutside } from 'element-plus'

// 状态
const state = ref<'register' | 'login' | 'bind'>('login')
const isLoginOrRegister = ref(false)
const loadingContent = ref('正在登录...')
export const status = ref('登录')

// function submit() {
//   switch (state.value) {
//     case "register":
//       register();
//       break;
//     case "login":
//       login();
//       break;
//     case "bind":
//       bindAccount();
//       break;
//   }
// }

export function login (form: loginFormOrRegisterForm) {
  isLoginOrRegister.value = true
  loadingContent.value = '正在登录...'
  AuthApis.login(form, {
    timeout: 1000 * 2 * 60,
  })
    .then(function (res) {
      console.log('>>> 登录结果', res)
      if (res.code == 0) {
        ElMessage.success('登录成功!')
        console.log('>>> 登录成功', res.data)
        useAuthStore().updateUserInfo(res.data)
        useAuthStore().updateToken(
          res.data.access_token,
          res.data.refresh_token,
        )
        console.log(
          '更新store完成',
          useAuthStore().userInfo,
          useAuthStore().tokens,
        )

        // 获取对应菜单权限
        getMenus()
        // 跳转回登陆前的页面
        const prePage = localStorage.getItem('preRoute')
        if (prePage == null || prePage == '/login') {
          routerPush('Index')
        } else {
          console.log('>>curr', prePage)
          router.push({ path: prePage })
        }
      } else {
        ElMessage.error(`T T 登录异常: (${res.message})`)
      }
      // isLoginOrRegister.value=false
    })
    .catch(function (err) {
      console.log('>>> 登录异常', err)
      ElMessage.error(`登录异常:${err.data.message}!`)
      // isLoginOrRegister.value=false
    })
    .finally(() => {
      isLoginOrRegister.value = false
    })
}

export function changeRegister () {
  state.value == 'register'
    ? state.value = 'login'
    : state.value = 'register'
}

export function register (form: loginFormOrRegisterForm) {
  isLoginOrRegister.value = true
  loadingContent.value = '正在注册...'
  AuthApis.register(form, {
    timeout: 2 * 60 * 1000,
  })
    .then(function (res) {
      if (res.code != 0) {
        isLoginOrRegister.value = false
        ElMessage.error(`T T 注册失败: (${res.message})`)
        return
      }
      console.log('>>> 注册成功', res)
      ElMessage.success('注册成功!')
      isLoginOrRegister.value = false
      status.value = '登录'
      router.push({ path: '/login' })
      // if (bind_id.value) {
      //   state.value = "bind";
      //   bindAccount();
      // } else {
      //   state.value = "login";
      // }
    })
    .catch(function (err) {
      ElMessage.error(`T T 注册失败:${err.data.message}!`)
      isLoginOrRegister.value = false
      state.value = 'register'
    })
}

export function Menu2Tree (
  menu_list: Menu[],
  parent_id: number,
  cached: number[],
) {
  const res: any = []
  for (let i = 0; i < menu_list.length; i++) {
    if (cached.indexOf(menu_list[i].id) !== -1) {
      console.log('cache', cached)
      continue
    }
    if (menu_list[i].parent_id == parent_id) {
      cached.push(menu_list[i].id)
      const children = Menu2Tree(menu_list, menu_list[i].id, cached)
      if (children.length > 0) {
        menu_list[i].children = children
      } else {
        menu_list[i].children = []
      }
      res.push(menu_list[i])
    }
  }
  return res
}

function getMenus () {
  AuthApis.getMenuList({})
    .then((res) => {
      // console.log("gen menus list -> ", res.data);
      useAuthStore().dynamicalRoutes = Menu2Tree(res.data, 0, [])
      console.log('>>>', useAuthStore().dynamicalRoutes)
    })
    .catch((err) => {
      console.log('get menus error ->', err)
    })
}

// ############################## thirdLogin ###############################
// const router = useRouter();
// onMounted(() => {
//   // 打印
//   console.log("router:", router.currentRoute.value.query);
//   const queryParmas = router.currentRoute.value.query;
//   if (queryParmas && queryParmas.type) {
//     switch (queryParmas.type) {
//       case "github":
//         loginByGithub(queryParmas.code as string);
//         break;
//       case "wechat":
//         loginByWechat();
//         break;
//       case "qq":
//         loginByQQ();
//         break;
//       default:
//         break;
//     }
//   }
// });

export function loginByWechat () {
  ElMessage.warning('建设中...')
}

export function loginByQQ () {
  ElMessage.warning('建设中...')
}

export function loginByGithub (authCode: string) {
  ElMessage.warning('建设中...')
  //   isLoginOrRegister.value=true
  //   loadingContent.value="正在登录..."
  //   AuthApis.loginByGithub(authCode,{
  //     timeout:2*1000*60
  //   }).then(function(res){
  //     ElMessage.success("第三方登录成功")
  //     console.log(">>> 第三方登录成功",res)
  //     updateUserInfo({
  //       profile:res.data.profile,
  //       permissions_dict:res.data.permissions_dict
  //     })
  //     updateToken(res.data.access_token,res.data.refresh_token)
  //     console.log("更新store完成",useAuthStore().userInfo,useAuthStore().tokens)
  //     const curr = localStorage.getItem('preRoute')
  //     if (curr == null || curr=="/login") {
  //       routerPush("Index");
  //     } else {
  //       console.log(">>curr",curr)
  //       router.push({ path: curr });
  //     }
  //     isLoginOrRegister.value=false
  //     loadingContent.value="正在登录..."
  //   }).catch(function(err){
  //     console.log(">>>登录 by github 异常！",err)
  //     if (err.data.status==404){
  //       state.value="bind",
  //       ElMessage.warning("请先绑定账号!")
  //       bind_id.value = err.data.data.oauth_id
  //     }else{
  //       ElMessage.error(`登录异常${err.data.message}`)
  //     }
  //     isLoginOrRegister.value=false
  //     loadingContent.value="正在登录..."
  //   })
  // }
  // function loginByWechat(){
  //   console.log(">>> login by wechat ")
  // }
  // function loginByQQ(){
  //   console.log(">>> login by qq ")
}

export function GetThirdLoginUrl (type: string) {
  ElMessage.error('建设中...')
  AuthApis.getThirdLoginUrl(type, {
    timeout: 2 * 60 * 1000,
  })
    .then(function (res) {
      const url = res.data.url
      window.location.href = url
    })
    .catch(function (res) {
      ElMessage.error(res.data.message)
    })
}

export function bindAccount () {
  // isLoginOrRegister.value=true
  // loadingContent.value="正在绑定账户..."
  // AuthApis.bindAccount(form,bind_id.value,{
  //   timeout:2*60*1000
  // }).then(function(res){
  //     ElMessage.success(`绑定成功!`)
  //     console.log(">>> 绑定成功",res)
  //     useAuthStore().updateUserInfo({
  //       profile:res.data.profile,
  //       userin:res.data.permissions_dict
  //     })
  //     updateToken(res.data.access_token,res.data.refresh_token)
  //     console.log("更新store完成",useAuthStore().userInfo,useAuthStore().tokens)
  //     bind_id.value=null
  //     const curr = localStorage.getItem('preRoute')
  //     if (curr == null || curr=="/login") {
  //       routerPush("Index");
  //     } else {
  //       console.log(">>curr",curr)
  //       router.push({ path: curr });
  // }
  // }).catch(function(err){
  //   isLoginOrRegister.value=false
  //   loadingContent.value="正在登录..."
  //   ElMessage.error(`T T 绑定失败:${err.data.message}`)
  // })
}

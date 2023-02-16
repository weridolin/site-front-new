import { defineStore } from 'pinia'
import type {
  Profile,
  Permissions,
  userInfo,
  Menu,
} from 'src/services/apis/auth'
// import Storage from "src/utils/storage";
import { computed, ref, reactive } from 'vue'
// import { router,nav } from "src/router";
// import {AuthApis} from 'src/services/apis/auth'

// export interface userInfo {
//     profile:Profile,
//     permissions:Permissions[]
// }

export interface Tokens {
  accessToken: string
  refreshToken: string
}

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      userInfo: null as userInfo | null,
      tokens: null as Tokens | null,
      has_update_routes:false
    }
  },
  getters: {
    isLogin (state) {
      return computed(() => state.userInfo != null)
    },
  },
  actions: {
    /**
     * 清除登录信息
     */
    clearAuthInfo () {
      this.userInfo = null
      this.tokens = null
      this.has_update_routes=false
    },
    /**
     * 更新token
     * @param accessToken
     * @param refreshToken
     */
    updateToken (accessToken: string, refreshToken: string) {
      this.tokens = {
        accessToken,
        refreshToken,
      }
      console.log('set token.')
    },
    /**
     * 更新用户信息
     */
    updateUserInfo (_userInfo: userInfo) {
      this.userInfo = _userInfo
      // localStorage.setItem("menu",JSON.stringify(_userInfo.permissions.menu))
      console.log('set user info ', _userInfo)
    },
    /**
     * 更新动态路由
     */
    // updateRouter() {
    //   console.log("update dynamical menu",this.userInfo?.permissions)
    //   this.userInfo?.permissions.menu.forEach((route) => {
    //     console.log(`add dynamical menu to route:${route}`);
    //     router.addRoute("adminIndex", {
    //       path: route.menu_url,
    //       name: route.menu_route_name,
    //       component: () => import(`./pages/admin/${route.menu_view_path}`),
    //       meta:{
    //         keepAlive: false, // 需要被缓存
    //         title: route.menu_name,
    //         footer: false,
    //         header: false,
    //         requireAuth: true,
    //         nav:nav
    //       },
    //     });
    // });
    // console.log("now router",router.getRoutes())
    // }
  },
  persist: true,
})

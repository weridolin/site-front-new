import { defineStore } from "pinia";
import type { Profile, Permissions, userInfo } from "src/services/apis/auth";
import Storage from "src/utils/storage";
import { computed, ref,reactive } from "vue";
import { router,nav } from "src/router";
// import {AuthApis} from 'src/services/apis/auth'

// export interface userInfo {
//     profile:Profile,
//     permissions:Permissions[]
// }

export interface tokens {
  accessToken: string;
  refreshToken: string;
}

const userInfoStorage = new Storage<userInfo>("userInfo");
const tokenStorage = new Storage<tokens>("token");

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      userInfo: ref(userInfoStorage.get()).value,
      tokens: ref(tokenStorage.get()).value,
    };
  },
  getters: {
    isLogin(state) {
      return computed(() => state.userInfo != null);
    },
  },
  actions: {
    /**
     * 清除登录信息
     */
    clearAuthInfo() {
      this.userInfo = null;
      this.tokens = null;
      userInfoStorage.remove();
      tokenStorage.remove();
    },
    /**
     * 更新token
     * @param accessToken
     * @param refreshToken
     */
    updateToken(accessToken: string, refreshToken: string) {
      this.tokens = {
        accessToken: accessToken,
        refreshToken: refreshToken,
      }
      console.log("set token.")
    },
    /**
     * 更新用户信息
     */
    updateUserInfo(_userInfo: userInfo) {
      this.userInfo = _userInfo
      console.log("set user info ", _userInfo);
      // userInfoStorage.set(_userInfo);
      // this.updateRouter();
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
});

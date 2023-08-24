import { defineStore } from "pinia";
import type {
  loginResponsePayload,
  Menu,
} from "src/services/apis/auth";
import { computed, ref, reactive } from "vue";
import {SiteApis} from "src/services/api";

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      userInfo: null as loginResponsePayload | null,
      tokens: null as Tokens | null,
      has_update_routes: false,
      dynamicalRoutes: [] as Menu[],
    };
  },
  getters: {
    isLogin(state) {
      return computed(() => state.userInfo != null);
    },
    isAdmin(state) {
      return computed(
        () => state.userInfo != null && state.userInfo.is_super_admin
      );
    },
  },
  actions: {
    /**
     * 清除登录信息
     */
    clearAuthInfo() {
      this.userInfo = null;
      this.tokens = null;
      this.has_update_routes = false;
      this.dynamicalRoutes=[];
    },
    /**
     * 更新token
     * @param accessToken
     * @param refreshToken
     */
    updateToken(accessToken: string, refreshToken: string) {
      this.tokens = {
        accessToken,
        refreshToken,
      };
      console.log("set token.");
    },
    /**
     * 更新用户信息
     */
    updateUserInfo(_userInfo: loginResponsePayload) {
      this.userInfo = _userInfo;
      // localStorage.setItem("menu",JSON.stringify(_userInfo.permissions.menu))
      console.log("set user info ", _userInfo);
    },
    /**
     * 更新动态路由
     */
    // updateRouter() {

    //   console.log("update dynamical menu", this.dynamicalRoutes);
    // },
  },
  persist: true,
});

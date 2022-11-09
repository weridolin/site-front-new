import { defineStore } from 'pinia'
import type { Profile } from 'src/services/apis/auth'
import Storage from 'src/utils/storage'
import { computed, ref } from 'vue'
// import {AuthApis} from 'src/services/apis/auth'

export interface userInfo {
    profile:Profile,
    permissions_dict?:any  
}

export interface tokens {
    accessToken:string,
    refreshToken:string
}

const userInfoStorage = new Storage<userInfo>('userInfo')
const tokenStorage = new Storage<tokens>('token')


export const useAuthStore = defineStore('auth', {

    state: () => {
        return {
            userInfo:ref(userInfoStorage.get()).value,
            tokens:ref(tokenStorage.get()).value
        }
    },
    getters: {
        isLogin(state) {
            return computed(() => state.userInfo!= null)
        }
    },
    actions: {
        clearAuthInfo() {
            this.userInfo=null
            this.tokens=null
            userInfoStorage.remove()
            tokenStorage.remove()
        },
        updateToken(accessToken:string,refreshToken:string) {
            this.tokens={
                "accessToken":accessToken,
                "refreshToken":refreshToken
            },
            tokenStorage.set({
                "accessToken":accessToken,
                "refreshToken":refreshToken
            })
        },
        updateUserInfo(_userInfo:userInfo){
            console.log("set  user info ",_userInfo)
            this.userInfo = _userInfo
            userInfoStorage.set(_userInfo)
        },
        // refreshToken(){
        //     if (this.tokens){
        //         let refreshForm = {
        //             "refresh":this.tokens?.refreshToken
        //         }
        //         return AuthApis.refreshToken(
        //             refreshForm,{
        //                 timeout:2*60*1000
        //             }
        //         )
        //     }
            
        // }
    },
})


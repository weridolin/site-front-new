import {ApiBase} from "src/services/base"
import type {RequestParams,BaseResponse} from "src/services/base"
import { extend } from "lodash"

export interface Profile {
    id: number,
    created: string,
    updated: string,
    age: number,
    location: string,
    QQ: string,
    telephone: string,
    gender: string,
    avator: string,
    first_login: true,
    user:User
    // "roles": [] # TODO
}


export interface User   {
    last_login:string,
    first_name:string,
    username:string,
    last_name:string,
    email:string,
}

export interface loginFormOrRegisterForm {
    username?:string,
    password:string,
    telephone?:string,
    email?:string,
}

// export interface registerForm {
//     username:string,
//     password:string,
//     email:string,
// }


export interface loginResponse extends BaseResponse {
    access_token:string,
    refresh_token:string,
    profile:Profile,
    permissions_dict?:any  //TODO
}

export interface GetUserProfileResponse extends BaseResponse {
    data:Profile
}


export interface registerResponse extends BaseResponse{

}


export class Apis extends ApiBase {

    public login(loginForm:loginFormOrRegisterForm,params: RequestParams = {}){
        console.log(">>> 账户登录",loginForm)
        return this.post<loginResponse>({           
            url:`api/v1/auth/login`,
            data:loginForm,
            ...params}
        )    
    }

    public logout(params: RequestParams = {}){
        return this.post<loginResponse>({           
            url:`api/v1/auth/logout`,
            requiredLogin:true,
            ...params}
        ) 
    }

    public getUserProfile(params:RequestParams = {}){
        return this.get<GetUserProfileResponse>({           
            url:`api/v1/auth/user/profile`,
            requiredLogin:true,
            ...params}
        ) 
    }

    public register(registerForm:loginFormOrRegisterForm,params:RequestParams={}){
        return this.post<registerResponse>({
            url:'/api/v1/auth/user/register',
            data:registerForm,
            ...params
        })
    }
}

const AuthApis = new Apis({})

export {AuthApis}
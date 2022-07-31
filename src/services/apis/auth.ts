import {ApiBase} from "src/services/base"
import type {RequestParams,BaseResponse} from "src/services/base"
import {pwdEncrypt} from 'src/utils/encryption'

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


export interface GetThirdLoginUrlResponse extends BaseResponse {
    data:{
        url:string
    }
}

export interface LoginByThirdResponse extends BaseResponse {
    data:{
        oauth_id:number,
        is_bind:boolean,
        access_token:string,
        refresh_token:string,
        profile:Profile,
        permissions_dict:any
    }
}



export interface BindAccountResponse extends LoginByThirdResponse {
}

export class Apis extends ApiBase {

    public login(loginForm:loginFormOrRegisterForm,params: RequestParams = {}){
        let pwd = pwdEncrypt(loginForm.password)
        let temForm = {
            username:loginForm.username,
            password:pwd,
            email:loginForm.email,
            telephone:loginForm.telephone
        }
        return this.post<loginResponse>({           
            url:`api/v1/auth/login`,
            data:temForm,
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
        let pwd = pwdEncrypt(registerForm.password)
        let temForm = {
            username:registerForm.username,
            password:pwd,
            email:registerForm.email,
            telephone:registerForm.telephone
        }
        return this.post<registerResponse>({
            url:'/api/v1/auth/user/register',
            data:temForm,
            ...params
        })
    }


    // ###################### third login ###############################
    public getThirdLoginUrl(type:string,params:RequestParams={}){
        return this.get<GetThirdLoginUrlResponse>({
            url:`api/v1/auth/third/url/${type}`,
            ...params,
        })
    }

    public loginByGithub(authCode:string,params:RequestParams={}){
        return this.get<LoginByThirdResponse>({
            url:`/api/v1/auth/third/githubLogin?code=${authCode}`,
            ...params,
        })
    }

    public bindAccount(loginForm:loginFormOrRegisterForm,oauth_id:number,params:RequestParams={}){
        let pwd = pwdEncrypt(loginForm.password)
        let temForm = {
            username:loginForm.username,
            password:pwd,
            email:loginForm.email,
            telephone:loginForm.telephone
        }
        return  this.post<BindAccountResponse>({
            url:`api/v1/auth/third/bind?oauth_id=${oauth_id}`,
            data:temForm,
            ...params
        })
    }
}

const AuthApis = new Apis({})

export {AuthApis}
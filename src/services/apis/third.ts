import type {
    User
    } from "src/services/apis/auth"

import {
    ApiBase,
    } from "src/services/base"

import type {
    BaseResponse,
    RequestParams
} from "src/services/base"

import {SiteApis} from "src/services/api"

export interface CreateShortUrlResponse extends BaseResponse {
    data:{
        id:number,
        created:string,
        updated: string,
        url: string,
        short_flag: string,
        description: string,
        type: string,
        expire_time: string       
    }
}

export interface CreateShortUrlForm {
    url:string,
    expire_time:number,
    type:"self"|"xl"|"tx",
    description:string,
    short_flag:string
}


export interface ApiInfo {
    id: number,
    created:string,
    updated:string,
    platform: string,
    is_free: boolean,
    api_type: string,
    api_name: string,
    api_icon: string,
    api_url: string,
    clicked: number,
    expire_time:number,
    api_price: number,
    api_price_unit: string
}

export interface conditionSelectForm  {
    types:string[],
    price:string[],
    platform:string[]
}
export interface GetApiInfoResponse extends BaseResponse {
    data:{
        api_infos:ApiInfo[],
        api_types:string[],
        platform:string[]
    }
}


export interface ApiResource {
    id:number,
    created:string,
    updated:string,
    last_run_time: string,
    name:string,
    script_path:string,
    run_count: number,
    is_forbidden: string,
    run_command: string,
    user: number,
    description:string   
}

export interface GetApiResourceResponse extends BaseResponse {
    data:ApiResource[]
}



export class Api extends ApiBase {
    /**
     * 获取短链接
     * @param data   CreateShortUrlForm
     * @param params  请求参数
     * @returns 
     */
    public createShortUrl(data:CreateShortUrlForm,params: RequestParams = {}){
        console.log(">>> create short url ",data)
        return this.request<CreateShortUrlResponse>({
            method:SiteApis.shortUrl.getShortUrl.method,
            url:SiteApis.shortUrl.getShortUrl.url,
            requiredLogin:SiteApis.shortUrl.getShortUrl.authenticated,
            data:data,
            ...params
    })}


    /**
     * 获取api 信息集合列表
     * @param params 
     * @returns 
     */
    public getApiInfoList(params: RequestParams = {}){
        console.log(">>> get all api info list")
        return this.request<GetApiInfoResponse>({
            method:SiteApis.apiCollector.getApiInfo.method,
            url:SiteApis.apiCollector.getApiInfo.url,
            requiredLogin:SiteApis.apiCollector.getApiInfo.authenticated,
            ...params
    })}

    /**
     * api过滤
     */
    public apiSearch(condition:conditionSelectForm,params:RequestParams={}){
        console.log(">>> search apis ",condition)
        return this.request<GetApiInfoResponse>({
            method:SiteApis.apiCollector.searchApiInfo.method,
            url:SiteApis.apiCollector.searchApiInfo.url,
            requiredLogin:SiteApis.apiCollector.searchApiInfo.authenticated,
            data:condition,
            ...params
        })
    }
    /**
     * 开启spider脚本
     */
    public startSpiderScript(spider_name:string,params:RequestParams={}){
        console.log(">>> start spider script")
        return this.request<BaseResponse>({
            method:SiteApis.apiCollector.startSpiderTask.method,
            url:SiteApis.apiCollector.startSpiderTask.url,
            data:{
                "spider_name":spider_name
            },
            ...params,
            requiredLogin:SiteApis.apiCollector.startSpiderTask.authenticated
        })
    }
    /**
     * 获取spider资源列表
     */
    public getSpiderResource(params:RequestParams={}){
        console.log(">>> get spider resource")
        return this.request<GetApiResourceResponse>({
            method:SiteApis.apiCollector.getSpiderTask.method,
            url:SiteApis.apiCollector.getSpiderTask.url,
            requiredLogin:true,
            ...params
        })
    }
}

const ThirdApis = new Api({})

export {ThirdApis}
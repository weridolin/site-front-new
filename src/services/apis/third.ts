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

export class Api extends ApiBase {

    public createShortUrl(data:CreateShortUrlForm,params: RequestParams = {}){
        console.log(">>> create short url ",data)
        return this.post<CreateShortUrlResponse>({
            url:`api/v1/third/shortUrl/create/`,
            data:data,
            ...params
    })}

    // public redirectSrcUrl(short_number:string,params:RequestParams={}){
    //     console.log
    // }

}

const ThirdApis = new Api({})

export {ThirdApis}
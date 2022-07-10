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



export interface initFileInfo {
    "key": string,
    "is_exist": boolean
}
export interface initFileInfoResponse extends BaseResponse {
    data:initFileInfo
}

export interface fileDownInfo {
    "id": number,
    "created": string,
    "updated": string,
    "timedelta": number,
    "record_key": string,
    "is_delete": boolean,
    "expire_time": string,
    "file": string,
    "download_code": string,
    "is_finish": boolean,
    "fields": any[],
    "count": number,
    "user":  User
}

export interface fileDownInfoResponse extends BaseResponse {
    data:fileDownInfo
}


export interface initFormData {
    "fields":any,
    "count":number
    
}


export class Api extends ApiBase {

    public getFileInfoByDownCode(downCode:string,params: RequestParams = {}){
        return this.get<fileDownInfoResponse>({
            url:`api/v1/dataFaker/search/${downCode}`,
            ...params
        })
    }

    public initDataInfo(dataForm:initFormData,params: RequestParams = {}){
        return this.post<initFileInfoResponse>({
            url:`api/v1/dataFaker`,
            data:dataForm,
            ...params
        })
    }

    public downFile(){
        
    }
}

const dataFakerApis = new Api({})

export {dataFakerApis}
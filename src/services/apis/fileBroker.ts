import type {
    User
    } from "src/services/apis/auth"

import {
    ApiBase,
    } from "src/services/base"

import {SiteApis} from "src/services/api"
 
import type {RequestParams,BaseResponse} from "src/services/base"


// 获取文件下载信息
export interface FileUploadInfo {
    id: number,
    created: string,
    updated: string,
    timedelta: number,
    file_key: string,
    file_name: string,
    file_size: number,
    is_delete: boolean,
    expire_time: string,
    file: string,
    md5: string,
    is_upload_finish: boolean,
    is_last: boolean,
    chunk_num: number,
    chunk_count: number,
    download_code: string,
    is_merge: boolean,
    user: User
}


// 文件上传初始化
export interface FileUploadSetupInfo{
    key?: string,
    is_exist: boolean
    file_info?:FileUploadInfo
    timedelta?: number,
}

export interface FileUploadInfoResponse extends BaseResponse{
    data:FileUploadSetupInfo
}

export interface FileUploadSetupForm {
    file_name:string,
    chunk_count:number,
    md5:string
}


export interface fileSearchInfoResponse extends BaseResponse{
    data:FileUploadInfo[]
}

export interface getDownCode {
    code:string
}

export interface getDownCodeResponse extends BaseResponse {
    data:getDownCode
}


export class Api extends ApiBase {

    public getFileInfoByDownCode(downCode:string,params: RequestParams = {}){
        return this.request<fileSearchInfoResponse>({
            method:SiteApis.fileBroker.searchFileUpload.method,
            url:`${SiteApis.fileBroker.searchFileUpload.url}/${downCode}`,
            ...params
        })
    }

    public fileUploadSetup(dataForm:FileUploadSetupForm,params: RequestParams = {}){
        return this.request<FileUploadInfoResponse>({
            method:SiteApis.fileBroker.filePreUpload.method,
            url:SiteApis.fileBroker.filePreUpload.url,
            data:dataForm,
            ...params
        })
    }

    public sendChunk(form:FormData,params: RequestParams = {}){
        return this.request({
            method:SiteApis.fileBroker.uploadFile.method,
            url:SiteApis.fileBroker.uploadFile.url,
            data: form,
            headers: { "Content-Type": "multipart/form-data" },
            timeout:0,
            ...params
        })
    }

    public uploadedCallback(data:any,params:RequestParams = {}){
        return this.request<getDownCodeResponse>({
            method:SiteApis.fileBroker.generateDownCode.method,
            url:SiteApis.fileBroker.generateDownCode.url,
            data:data,
            ...params
        })
    }
}

const FileBrokerApis = new Api({})

export {FileBrokerApis}
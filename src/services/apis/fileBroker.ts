import type {
    User
    } from "src/services/apis/auth"

import {
    ApiBase
    } from "src/services/base"

import type {RequestParams} from "src/services/base"

// 获取文件下载信息
export type FileUploadInfo={
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

export type FileUploadInfoResponse={
    data:FileUploadInfo[]
}

export type FileUploadSetupForm={
    file_name:string,
    chunk_count:number,
    md5:string
}

export class Api extends ApiBase {

    public getFileInfoByDownCode(downCode:string,params: RequestParams = {}){
        return this.get<FileUploadInfoResponse>({
            url:`api/v1/fileBroker/search/${downCode}`,
            ...params
        })
    }

    // public fileUploadSetup(dataForm:FileUploadSetupForm,params: RequestParams = {}){
    //     // return this.post<FileUploadInfoResponse>()
    //     return
    // }
}

const FileBrokerApis = new Api({})

export {FileBrokerApis}
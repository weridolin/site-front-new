import {
    ApiBase,
    } from "src/services/base"

import { SiteApis } from "src/services/api"
import type {RequestParams,BaseResponse} from "src/services/base"


export interface DrugWord {
    "id": number,
    "created": string,
    "updated": string,
    "content": string,
    "is_show": boolean,
    "is_custom": boolean
}

export interface DrugWordResponse extends BaseResponse {
    data:DrugWord
}

export class Api extends ApiBase {

    public getDrugWord(last_id:number,params: RequestParams = {}){
        return this.request<DrugWordResponse>({
            method:SiteApis.drug.getRandomWord.method,
            url:`${SiteApis.drug.getRandomWord.url}?${last_id}`,
            ...params
        })
    }

}

const DrugApis = new Api({})

export {DrugApis}
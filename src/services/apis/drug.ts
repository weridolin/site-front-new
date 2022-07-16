import {
    ApiBase,
    } from "src/services/base"


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
        return this.get<DrugWordResponse>({
            url:`api/v1/drug/words/random/?${last_id}`,
            ...params
        })
    }

}

const DrugApis = new Api({})

export {DrugApis}
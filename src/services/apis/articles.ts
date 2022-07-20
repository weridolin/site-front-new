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


export interface ArticleType {
    id:number,
    name:string,
    description:string
}
export interface ArticleTag {
    id:number,
    name:string,
    description:string
}

export interface NextOrPreArticle {
    id: number,
    title: string,
    tags?: ArticleTag[],
    type?: ArticleType
}

export interface Article {
    id: number,
    type: ArticleType,
    tags: ArticleTag[],
    author: User,
    created: string,
    updated: string,
    next: NextOrPreArticle,
    pre: NextOrPreArticle,
    title: string,
    summary: string,
    content: string,
    likes: number,
    language: string,
    style: string,
    total_views: number,
    avatar: string,
    cover: string,
    head_show: boolean,
    copyright_show: boolean,
    message_show: boolean
}

export interface ArticleResponse {
    count: number,
    next: string,
    previous: string,
    last_page: number,
    results:Article[],
}


export interface ArticleCountResponse extends BaseResponse{
    data:{
        count:number
    }
}

export interface ArticleSearchResponse extends BaseResponse {
    data:Article[]
}

// export interface ArticleTagsResponse {
//     ArticleTag[]
// }

// export interface ArticleTypesResponse {
//     ArticleType[]
// }
export interface updateArticleStatusForm {
    id:number,
    total_views?:number
    likes?:number
}


export class Api extends ApiBase {

    public getArticles(params: RequestParams = {}){

        console.log(">>> get articles list")
        return this.get<ArticleResponse>({
            url:`api/v2/blogs/articles`,
            ...params

    })}

    public getArticle(article_id:number,params: RequestParams = {}){
        if (article_id){
            console.log(">>> get article",article_id)
            return this.get<Article>({
                url:`api/v2/blogs/articles/${article_id}`,
                ...params
            })
        }
    }

    public updateArticleStatus(updateParams:updateArticleStatusForm,params: RequestParams = {}){
        console.log(">>> update article status",updateParams)
        return this.post<BaseResponse>({
            url:`api/v2/blogs/articles/update_status`,
            data:updateParams,
            ...params
        })
        
    }



    public getArticleTypes(params:RequestParams={}){
        return this.get({
            url:`api/v2/blogs/articlesTypes`,
            ...params
        })
    }

    
    public getArticleTags(params:RequestParams={}){
        return this.get({
            url:`api/v2/blogs/articlesTags`,
            ...params
        })
    }

    public getArticleCount(params:RequestParams={}){
        return this.get<ArticleCountResponse>({
            url:`api/v2/blogs/articles/count`,
            ...params
        })
    }

    public search(params:RequestParams={}){
        return this.get<ArticleSearchResponse>({
            url:`api/v2/blogs/articles/search`,
            ...params
        })
    }
}

const ArticlesApis = new Api({})

export {ArticlesApis}
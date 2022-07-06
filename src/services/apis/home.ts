import type {
    User
    } from "src/services/apis/auth"

import {
    ApiBase
    } from "src/services/base"

import type {RequestParams} from "src/services/base"

//  跑马灯背景图
export type BackGroundInfoResponse ={
    id:number,
    title:string,
    info:string,
    link: string,
    img_url: string,
}

// 网站评论

export type SiteCommentSubmitForm ={
    body:string,
    ip:string,
    address:string,
    name:string,
    qq:string|number,
    email:string
}


export type SiteCommentResponse  ={
    id:number,
    user:User, // TODO
    body:string,
    likes:number,
    qq:string,
    email:string,
    is_valid:boolean,
    ip:string,
    province:string,
    country:string,
    city:string,
    // replay_to:User // TODO
}


export type SiteCommentResponsePagination = {
    count:number,
    next:string,
    previous:string,
    last_page:number,
    results:Array<SiteCommentResponse>
}



// 背景音乐
export type BackGroundMusicResponse = {
    musicId:number,
    title:string,
    name:string
    type:string,
    url:string,
    avatar:string,
    is_used:boolean
}


// 友链
export type FriendsLink ={
    site:string,
    title:string
    intro:string,
    url:string,
    cover:string,
    author:User|string
    is_show:boolean
}

export type FriendsLinkResponse ={
    data:FriendsLink[]
}

// 更新日志

export interface updateLog {
    id:number,
    update_content:string,
    is_finish:boolean,
    author:User,
    finish_time:string
}

//

export class Api extends ApiBase {

    // public baseUrl:string = import.meta.env.BASE_URL+"/api/v1/home";

    backGroundPic= {
        /** 
         * 获取跑马灯背景图片
        */
        getBackGroundPic:(params: RequestParams = {}) =>
            {   
                this.get<BackGroundInfoResponse>({
                        url:"/api/v1/home/bglist",
                        ...params
                    })
        }
    };

    backMusic = {
        /** 
         * 获取背景音乐
        */
        getBackGroundMusic:(params: RequestParams = {}) =>
            this.get<BackGroundMusicResponse>(
                {
                    url:"/api/v1/home/bglist",
                    ...params
                }
            ),
        
    };

    siteComment = {
        /**
         *  获取评论列表
         */
        getCommentList:(params: RequestParams = {}) =>
            this.get<SiteCommentResponsePagination>(
                {
                    url:"/api/v1/home/comments",
                    ...params,
                }
            ),
        /**
         *  提交评论
         */
        submit:(data:SiteCommentSubmitForm,params:RequestParams={}) => 
            this.post(
                {
                    url:"/api/v1/home/comments",
                    data:data,
                    ...params
                }
            ),
        
    };

    friendLink = {
        /**
         *  获取友链列表
         */
        getFriendLinkList:(params: RequestParams = {}) =>
            this.get<FriendsLinkResponse>(
                {
                    url:"/api/v1/home/friendslinks",
                    ...params
                }
            ),
    };

    updateLog= {
        /**
         *  获取更新日志列表
         */
        getUpdateLogList:(params: RequestParams = {}) =>
            this.get<Array<updateLog>>(
                {
                    url:"/api/v1/home/updatelog",
                    ...params
                }
            ),
    }
}

const HomeApi = new Api({})

export {HomeApi}
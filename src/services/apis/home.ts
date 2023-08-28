import type { User } from 'src/services/apis/auth'
import { ApiBase } from 'src/services/base'
import type { BasePaginationResponse, BaseResponse, RequestParams } from 'src/services/base'
import { SiteApis } from 'src/services/api'

//  跑马灯背景图
export type BackGroundInfoResponse = {
  id: number
  title: string
  info: string
  link: string
  img_url: string
}

// 网站评论

export type SiteCommentSubmitForm = {
  body: string
  ip: string
  address: string
  name: string
  qq: string | number
  email: string
}

export type SiteComment = {
  id: number
  body: string
  likes: number
  qq: string
  email: string
  is_valid: boolean
  ip: string
  province: string
  country: string
  city: string
  updated: string
  name: string // 用户名
  user_id: number // 用户id
  replay_to: number // 回复给哪条评论
  root_id: number // 根评论id
  avatar: string // 头像链接
  gender: number // 0女性 1男性
}

export type ReplyForm = {
  body: string
  replay_to: number
  root_id: number
}

export interface CommentsPayload extends BasePaginationResponse {
  results: SiteComment[]
}

export interface GetCommentsResponse extends BaseResponse {
  data: CommentsPayload
}

// 背景音乐
export type BackGroundMusicResponse = {
  musicId: number
  title: string
  name: string
  type: string
  url: string
  avatar: string
  is_used: boolean
}

// 友链
export type FriendsLink = {
  site: string
  title: string
  intro: string
  url: string
  cover: string
  author: User
  is_show: boolean
  updated: string
}

export type FriendsLinkResponse = {
  data: FriendsLink[]
}

// 更新日志

export interface updateLogItem {
  id: number
  update_content: string
  is_finish: boolean
  author: User
  repo_uri: string
  commit_message: string
  commit_id: string
  commit_content: string
  user_id: number
  user_name: string
  updated: string
}

export interface updateLogPayload {
  [year_month: string]: {
    [day_weekday: string]: updateLogItem[]
  }
}

export interface updateLogResponse extends BaseResponse {
  data: updateLogPayload
}

// 对话框消息
export interface ChatMessage {
  type: 'sender' | 'receiver' // sender在右边(客户端发送) receiver在左边（服务端响应）
  content: string
}

// 背景图片

export interface BackGroundImage {
  id: number
  url: string
  is_used: boolean
  type: string
}

export type BackGroundImageResponse = {
  data: BackGroundImage[]
}

export class Api extends ApiBase {
  // public baseUrl:string = import.meta.env.BASE_URL+"/api/v1/home";

  backGroundPic = {
    /**
     * 获取跑马灯背景图片
     */
    getBackGroundPic: (params: RequestParams = {}) => {
      this.request<BackGroundInfoResponse>({
        url: SiteApis.home.getBackGroundImages.url,
        method: SiteApis.home.getBackGroundImages.method,
        requiredLogin: SiteApis.home.getBackGroundImages.authenticated,
        ...params,
      })
    },
  }

  backMusic = {
    /**
     * 获取背景音乐
     */
    getBackGroundMusic: (params: RequestParams = {}) =>
      this.request<BackGroundMusicResponse>({
        method: SiteApis.home.getBackGroundMusic.method,
        requiredLogin: SiteApis.home.getBackGroundMusic.authenticated,
        url: SiteApis.home.getBackGroundMusic.url,
        ...params,
      }),
  }

  siteComment = {
    /**
     *  获取评论列表
     */
    getCommentList: (params: RequestParams = {}) =>
      this.request<GetCommentsResponse>({
        method: SiteApis.home.getSiteComments.method,
        url: SiteApis.home.getSiteComments.url,
        requiredLogin: SiteApis.home.getSiteComments.authenticated,
        ...params,
      }),
    /**
     *  提交评论
     */
    submit: (data: SiteCommentSubmitForm, params: RequestParams = {}) =>
      this.request({
        method: SiteApis.home.submitSiteComment.method,
        url: SiteApis.home.submitSiteComment.url,
        data,
        requiredLogin: SiteApis.home.submitSiteComment.authenticated,
        ...params,
      }),
    /**
     * 获取评论回复
     */
    getCommentReply: (commentId: number, params: RequestParams = {}) =>
      this.request<GetCommentsResponse>({
        method: SiteApis.home.getCommentReply.method,
        url: SiteApis.home.getCommentReply.url(commentId),
        requiredLogin: SiteApis.home.getCommentReply.authenticated,
        ...params,
      }),
    /**
     * 回复评论
     */
    postCommentReply: (commentId: number, replyForm: ReplyForm, params: RequestParams = {}) =>
      this.request<BaseResponse>({
        method: SiteApis.home.replyComment.method,
        url: SiteApis.home.replyComment.url(commentId),
        requiredLogin: SiteApis.home.replyComment.authenticated,
        data: replyForm,
        ...params,
      }),
  }

  friendLink = {
    /**
     *  获取友链列表
     */
    getFriendLinkList: (params: RequestParams = {}) =>
      this.request<FriendsLinkResponse>({
        method: SiteApis.home.getFriendLinks.method,
        url: SiteApis.home.getFriendLinks.url,
        requiredLogin: SiteApis.home.getFriendLinks.authenticated,
        ...params,
      }),
  }

  updateLog = {
    /**
     *  获取更新日志列表
     */
    getUpdateLogList: (params: RequestParams = {}) =>
      this.request<updateLogResponse>({
        url: SiteApis.home.getSiteUpdateLog.url,
        method: SiteApis.home.getSiteUpdateLog.method,
        requiredLogin: SiteApis.home.getSiteUpdateLog.authenticated,
        ...params,
      }),
  }

  background = {
    /**
     * 获取背景图片列表
     */
    getBackgroundImageList: (params: RequestParams = {}) =>
      this.request<BackGroundImageResponse>({
        url: SiteApis.home.getBackGroundImages.url,
        method: SiteApis.home.getBackGroundImages.method,
        requiredLogin: SiteApis.home.getBackGroundImages.authenticated,
        ...params,
      }),
  }
}

const HomeApi = new Api({})

export { HomeApi }

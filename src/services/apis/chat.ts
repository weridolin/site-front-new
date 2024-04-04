import { ApiBase } from "src/services/base";
import type {
  RequestParams,
  BaseResponse,
  BasePaginationResponse,
} from "src/services/base";
import type { User } from "src/services/apis/auth";
import {SiteApis}  from  "src/services/api"

//    { type: 'text', author: `bot`, data: { text: `现在是离线机器人,您可以输入对应的关键词,我会尽量回答的😊` } },
export interface chatMessage {
  id: number;
  type: string;
  author: string;
  data: {
    text: string;
  };
}

export interface chatMessageReplyResponse extends BaseResponse {
  data: chatMessage[];
}

/**********************  gpt  **************************/
export enum gptWSType {
  "connect" = 1, //链接建立
  "disconnect" = 2, //链接断开
  "reply" = 3, //回复消息
  "query" = 4, //询问消息
  "error" = 5, //错误消息
}

export enum gptWSMessageRole {
  "query" = 0, //消息为查询消息
  "reply" = 1, //消息为回复消息
}

export interface gptConversationItem {
  created: string;
  updated: string;
  title: string;
  uuid: string;
  user_id: number;
  description: string;
  platform: string;
  model:string;
  key:string
}

export interface gptMessageItem {
  uuid: string;
  query_content: string; //查询内容
  query_content_type: string; // text
  reply_content: string; //回复内容
  reply_content_type:string; // text
  conversation_id: string; //会话ID
  parent_message_uuid?: string; //父消息UUID
  children_message_uuid?: string; //子消息UUID
  reply_finished: boolean; //是否回复完成
  user_id?: number; //用户ID
  interrupt: boolean; //是否中断
  interrupt_reason: string; //中断原因
  websocket_id: string; //websocket ID
  has_sended: boolean; //是否已发送
  error: boolean; //是否错误
  error_code:string; //错误代码
  error_detail:string; //错误详情
  created?: string;
  updated?: string;
}

export interface createConversationParams {
  title: string;
  description: string;
  platform: string;
  model:string;
}

export interface createConversationResponse extends BaseResponse {
  data: gptConversationItem;
}

export interface getConversationsParams {
  page?: number;
  page_size?: number;
  search?: string;
}

export interface getConversationsPaginationResponse extends BasePaginationResponse {
  results: gptConversationItem[];
}

export interface getConversationsResponse extends BaseResponse {
  data: getConversationsPaginationResponse;
}

export interface gptMessagePaginationResponse extends BasePaginationResponse {
  results: gptMessageItem[];
}

export interface gptMessageResponse extends BaseResponse {
  data: gptMessagePaginationResponse;
}

export interface registerWebsocketBaseResponse extends BaseResponse {
  data: {
    websocket_uri: string;
  };

}

export interface queryMessageParams {
  conversation_id: string;
  query_content: string;
  query_content_type: string;
  parent_message_uuid: string;
  children_message_uuid: string;
  websocket_id: string;
  platform: string;
  model:string;
}

export class Apis extends ApiBase {
  public getReply(body: any, params: RequestParams = {}) {
    return this.request<chatMessageReplyResponse>({
      url: SiteApis.gpt.createMessage.url,
      method: SiteApis.gpt.createMessage.method,
      requiredLogin: SiteApis.gpt.createMessage.authenticated,
      data: body,
      ...params,
    });

  }

  public getReplySSE(body: gptMessageItem, params: RequestParams = {}) {
    return this.request<chatMessageReplyResponse>({
      url: SiteApis.gpt.createMessageSSE.url,
      method: SiteApis.gpt.createMessageSSE.method,
      requiredLogin: SiteApis.gpt.createMessageSSE.authenticated,
      data: body,
      ...params,
    });
  }

  public stopGetMessageSSE(query_message_id:string,params: RequestParams = {}) {
    return this.request<BaseResponse>({
      url: SiteApis.gpt.stopMessageSSE.url,
      method: SiteApis.gpt.stopMessageSSE.method,
      requiredLogin: SiteApis.gpt.stopMessageSSE.authenticated,
      data: {
        query_message_id: query_message_id,
      },
      ...params,
    });
  }

  /********* gpt 相关 ************/
  public getConversations(query_params: any, params: RequestParams = {}) {
    return this.request<getConversationsResponse>({
      url: SiteApis.gpt.getConversationsList.url,
      method: SiteApis.gpt.getConversationsList.method,
      requiredLogin: SiteApis.gpt.getConversationsList.authenticated,
      params: query_params,
      ...params,
    });
  }

  public createConversation(title: string,platform:string,model:string,description:string,key:string, params: RequestParams = {}) {
    return this.request<createConversationResponse>({
      url: SiteApis.gpt.createConversation.url,
      method: SiteApis.gpt.createConversation.method,
      requiredLogin: SiteApis.gpt.createConversation.authenticated,
      data: {
        title: title,
        platform: platform,
        model:model,
        description: description,
        key:key
      },
      ...params,
    });
  }

  public deleteConversation(uuid:string, params: RequestParams = {}) {
    return this.request<BaseResponse>({
      method: SiteApis.gpt.deleteConversation.method,
      url: SiteApis.gpt.deleteConversation.url(uuid),
      requiredLogin: SiteApis.gpt.deleteConversation.authenticated,
      ...params,
    });
  }

  public getMessageList(conversation_uuid:string, params: RequestParams = {}) {
    return this.request<gptMessageResponse>({
      method: SiteApis.gpt.getMessageList.method,
      url: SiteApis.gpt.getMessageList.url,
      requiredLogin: SiteApis.gpt.getMessageList.authenticated,
      params: {
        conversation_id: conversation_uuid,
      },
      ...params,
    });
  }

  public registerConversationWS(params: RequestParams = {}) {
    return this.request<BaseResponse>({
      method: SiteApis.gpt.registerWebsocket.method,
      url: SiteApis.gpt.registerWebsocket.url,
      requiredLogin: SiteApis.gpt.registerWebsocket.authenticated,
      ...params,
    });
  }
}

const ChatApis = new Apis({});
export { ChatApis };

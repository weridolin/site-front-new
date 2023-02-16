import { ApiBase } from "src/services/base";
import type {
  RequestParams,
  BaseResponse,
  BasePaginationResponse,
} from "src/services/base";
import type { User } from "src/services/apis/auth";

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

/**********************  ChatGPT  **************************/
export enum ChatGPTWSType {
  "connect" = 1, //链接建立
  "disconnect" = 2, //链接断开
  "reply" = 3, //回复消息
  "query" = 4, //询问消息
  "error" = 5, //错误消息
}

export enum ChatGPTWSMessageRole {
  "query" = 0, //消息为查询消息
  "reply" = 1, //消息为回复消息
}

export interface ChatGPTConversationItem {
  id: number;
  created: string;
  updated: string;
  title: string;
  uuid: string;
  user: any;
}

export interface ChatGPTMessageItem {
  query_content: string; //查询内容
  parent_message_uuid: string; //上一条ID
  reply_content: string; //回复内容
  uuid: string; //当前消息的UUID
  conversation_uuid: string; //会话ID
  content_type: string; //
  role: ChatGPTWSMessageRole;
  created: string;
  updated: string;
  children_message_uuid: string;
}

export interface ChatGPTWSMessage {
  type: ChatGPTWSType;
  data: ChatGPTMessageItem;
}

interface ChatGPTPaginationResponse extends BasePaginationResponse {
  results: ChatGPTConversationItem[];
}

interface GetConversationsResponse extends BaseResponse {
  data: ChatGPTPaginationResponse;
}

interface ChatGPTMessagePaginationResponse extends BasePaginationResponse {
  results: ChatGPTMessageItem[];
  conversation_uuid: string;
}

interface GetChatGPTMessagePaginationResponse extends BaseResponse {
  data: ChatGPTMessagePaginationResponse;
}

interface CreateConversationResponse extends BaseResponse {
  data: ChatGPTConversationItem;
}

export class Apis extends ApiBase {
  public getReply(query_content: string, params: RequestParams = {}) {
    return this.get<chatMessageReplyResponse>({
      url: `api/v2/blogs/articles`,
      ...params, // TODO
    });
  }

  /********* chatGPT 相关 ************/
  public getConversations(query_params: any, params: RequestParams = {}) {
    return this.get<GetConversationsResponse>({
      url: `api/v1/third/chatGPT/conversation`,
      requiredLogin: true,
      params: query_params,
      ...params,
    });
  }

  public createConversation(title: string, params: RequestParams = {}) {
    return this.post<CreateConversationResponse>({
      url: `api/v1/third/chatGPT/conversation`,
      requiredLogin: true,
      data: {
        title: title,
      },
      ...params,
    });
  }

  public delConversation(pk: number = -1, params: RequestParams = {}) {
    let url =
      pk != -1
        ? `api/v1/third/chatGPT/conversation/${pk}`
        : `api/v1/third/chatGPT/conversation`;
    return this.delete<BaseResponse>({
      url: url,
      requiredLogin: true,
      ...params,
    });
  }

  public getChatMessage(query_params: any = {}, params: RequestParams = {}) {
    return this.get<GetChatGPTMessagePaginationResponse>({
      url: "api/v1/third/chatGPT/message",
      requiredLogin: true,
      params: query_params,
      ...params,
    });
  }
}

const ChatApis = new Apis({});
export { ChatApis };

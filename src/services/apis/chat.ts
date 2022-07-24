import {ApiBase} from "src/services/base"
import type {RequestParams,BaseResponse} from "src/services/base"

//    { type: 'text', author: `bot`, data: { text: `现在是离线机器人,您可以输入对应的关键词,我会尽量回答的😊` } },
export interface chatMessage {
    type:string,
    author:string,
    data:{
        text:string
    }
}


export interface chatMessageReplyResponse extends BaseResponse {
    data:chatMessage[]
}



export class Api extends ApiBase {

    public getReply(query_content:string,params: RequestParams = {}){
        return this.get<chatMessageReplyResponse>({
          url:`api/v2/blogs/articles`,
          ...params // TODO
      }
    )
  }
}

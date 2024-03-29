import { ElMessage, ElMessageBox } from "element-plus";
import { create_conn } from "src/services/ws";
import { useAuthStore } from "src/store/user";
import { ref, reactive, watch } from "vue";
import {
  type gptConversationItem,
  type gptMessageItem,
  ChatApis,
} from "src/services/apis/chat";
import { SiteApis } from "src/services/api";

/***************** 变量    **********************/
let gptWS: WebSocket;

// 会话列表
const conversationList = ref<gptConversationItem[]>([]);
//当前需要显示的对话内容
const currentGptMessageList = ref<gptMessageItem[]>([]);
//会话列表 -- 对话内容的MAP映射
const conversationMessageMap = ref<Map<string, gptMessageItem[]>>(new Map()); // 会话ID -> 对话内容列表
const currentOpenConversation = ref<gptConversationItem>(); //当前打开的会话
const currentOpenConversationID = ref(""); //当前打开的会话ID
const createDialogFormVisible = ref(false); //创建对话框是否显示

watch(currentOpenConversationID, (newValue, oldValue) => {
  loadingMessage.value = true;
  // console.log("- > watch currentOpenConversationID", newValue, oldValue);
  if (
    conversationMessageMap.value &&
    conversationMessageMap.value.has(currentOpenConversationID.value)
  ) {
    currentGptMessageList.value =
      conversationMessageMap.value.get(currentOpenConversationID.value) || [];
    loadingMessage.value = false;
  } else {

    if (!currentOpenConversationID.value) {
      loadingMessage.value = false;
      return;
    }
    ChatApis.getMessageList(currentOpenConversationID.value, {
      
    })
      .then((res) => {
        console.log("get chat message", res.data.results);
        conversationMessageMap.value?.set(
          currentOpenConversationID.value,
          res.data.results
        );
        currentGptMessageList.value = res.data.results;
      })
      .catch((error) => {
        console.log(`get chat message error:${error}`);
      })
      .finally(() => {
        loadingMessage.value = false;
        createDialogFormVisible.value = false;
      });
  }
  console.log("map ->", conversationMessageMap.value);
  // loadingMessage.value = false;
});

// 查询相关
const queryContent = ref(""); //查询内容
const querying = ref(false); //查询中？。。。
const loadingText = ref("生成回复中..."); //查询中显示文字
const loadingMessage = ref(false);
const creatingConversation = ref(false); //创建会话中？。。。
const replying = ref(false); //回复中？。。。

export interface createConversationForm {
  platform: string;
  model: string;
  title: string;
  description: string;
  key: string;
}

/***********   WS method     *************/
// function build() {
//   let user_id = useAuthStore().userInfo?.profile.user.id;
//   if (user_id == null) {
//     ElMessage.error(`请先登录`);
//     return;
//   }
//   gptWS = create_conn(`ws/thirdApi/gpt/${user_id}`);
//   gptWS.onmessage = function (event) {
//     console.log("get message from ws server ->", event.data);
//     onMessage(event.data);
//   };
//   gptWS.onerror = function (event) {
//     ElMessage.error(`ws链接出错`);
//     console.log("ws on error", event);
//     console.log("an error raise an in ws");
//     querying.value = false;
//   };
//   gptWS.onopen = (event) => {
//     ElMessage.success("链接已经建立");
//   };
//   gptWS.onclose = (event) => {
//     console.log("后台ws关闭");
//     ElMessage.error("后台WS服务关闭，请刷新页面!");
//   };
// }

// function onMessage(data: string) {
//   const _data: gptWSMessage = JSON.parse(data);
//   switch (_data.type) {
//     case gptWSType.connect: {
//       console.log(">>> gpt ws connection build");
//       break;
//     }
//     case gptWSType.error: {
//       console.log(">>> gpt raise an error", _data);
//       ElMessage.error("生成回复出错.请刷新页面重试.");
//       querying.value = false;
//       break;
//     }
//     case gptWSType.reply: {
//       console.log("gpt get reply message", _data);
//       querying.value = false;
//       /**add chatMessageItem */
//       let msg = _data.data;
//       if (currentOpenConversationID.value == msg.conversation_id) {
//         /**添加到当前的列表中 */
//         chatMessageList.value.push(msg);

//         /**添加到conversation-message-map列表中 */
//         if (
//           conversationMessageMap.value &&
//           conversationMessageMap.value.has(msg.conversation_id)
//         ) {
//           conversationMessageMap.value
//             .get(currentOpenConversationID.value)
//             ?.push(msg);
//         } else {
//           /**conversation-message-map没有的话,生成对应的item */
//           console.log(
//             "conversationMessageMap 里面找不到对应conversation id",
//             msg.conversation_id
//           );
//         }
//       }
//       break;
//     }
//     default:
//       break;
//   }
// }

// function submit() {
//   console.log(">>>send message");
//   if (!gptWS) {
//     ElMessage.error("请先打开一个会话");
//     return;
//   }
//   if (currentOpenConversationID.value == -1) {
//     ElMessage.error("请先新建一个会话~");
//     return;
//   }
//   if (!queryContent.value) {
//     ElMessage.error("请先输入咨询内容");
//     return;
//   }
//   // 先获取上一条UUID,咨询肯定都是列表的最后一条
//   let _list = conversationMessageMap.value?.get(
//     currentOpenConversationID.value
//   );
//   let p_uuid: string;
//   if (_list && _list.length > 0) {
//     p_uuid = _list[_list.length - 1]?.uuid;
//   } else {
//     p_uuid = crypto.randomUUID();
//   }

//   let data = {
//     type: gptWSType.query,
//     data: {
//       query_content: queryContent.value,
//       parent_message_uuid: p_uuid,
//       reply_content: "",
//       uuid: crypto.randomUUID(),
//       content_type: "text",
//       role: gptWSMessageRole.query,
//       conversation_id: currentOpenConversationID.value,
//     },
//   };
//   /**将发送到消息添加到当前的消息列表里面 */
//   _list?.push(data.data);
//   chatMessageList.value.push(data.data);
//   gptWS.send(JSON.stringify(data));
//   querying.value = true;
//   queryContent.value = "";
// }

/*************    HTTP METHODS                ************/

function delConversation(all: boolean) {
  if (all) {
    ElMessageBox.confirm("确定删除所有会话吗?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(() => {
      ChatApis.deleteConversation("all", {  })
        .then(() => {
          conversationList.value = [];
          conversationMessageMap.value?.clear();
          currentGptMessageList.value = [];
          ElMessage.success("删除会话成功");
          currentOpenConversationID.value = "";
        })
        .catch((error) => {
          console.log("删除所有会话失败", error);
          ElMessage.error(`删除所有会话失败`);
        })
        .finally(() => {
          getAllConversation();
        });
    });
  } else {
    ElMessageBox.confirm("确定删除当前会话吗?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(() => {
      if (!currentOpenConversationID.value) {
        ElMessage.error("当前没有打开的会话");
        return;
      }
      ChatApis.deleteConversation(currentOpenConversationID.value, {
        
      })
        .then(() => {
          // 从 conversationList 删除ID为 currentOpenConversationID 的会话
          let index = conversationList.value.findIndex(
            (item) => item.uuid == currentOpenConversationID.value
          );
          conversationList.value.splice(index, 1);
          ElMessage.success("删除会话成功");
          currentGptMessageList.value = [];
          if (
            conversationMessageMap.value?.has(currentOpenConversationID.value)
          ) {
            conversationMessageMap.value.delete(
              currentOpenConversationID.value
            );
          }
          currentOpenConversationID.value = "";
        })
        .catch((error) => {
          console.log("删除所有会话失败", error);
          ElMessage.error(`删除所有会话失败`);
        });
    });
  }
}


function createConversation(requestForm: createConversationForm) {
  if (conversationList.value.length >= 10) {
    ElMessage.error("暂时最多创建10个会话!");
    return;
  }
  console.log("create conversation", requestForm);
  if (
    !requestForm.title ||
    requestForm.platform == "" ||
    requestForm.model == "" ||
    requestForm.key == ""
  ) {
    ElMessage.error("请填写完整信息");
    return;
  }
  creatingConversation.value = true;

  // let title = `chat-${Date.now().toString()}`;
  ChatApis.createConversation(
    requestForm.title,
    requestForm.platform,
    requestForm.model,
    requestForm.description,
    requestForm.key,
    {  }
  )
    .then((res) => {
      console.log("create conversation", res, res.data.title);
      conversationList.value.push(res.data);
      conversationMessageMap.value?.set(res.data.uuid, []);
      getAllConversation();
      ElMessage.success("创建新会话成功");
    })
    .catch((error) => {
      console.log(`创建新会话失败:${error}`);
    })
    .finally(() => {
      creatingConversation.value = false;
      createDialogFormVisible.value = false;
    });
}

function getAllConversation() {
  ChatApis.getConversations({}, { })
    .then((res) => {
      console.log(">>>get all conversation", res);
      conversationList.value = res.data.results;
    })
    .catch((err) => {
      ElMessage.error(`获取所有的`);
      console.log(">>>get all conversation error", err.data);
    });
}

/********************** post请求模拟 event-stream */

export interface SSEMessageItem {
  event_type: string;
  type: string;
  data: string;
  more_data?: boolean;
  conversation_id: string;
  query_message_id: string;
}

// 注意：这不是标准的SSE，仅作为模拟示例
async function fetchAndHandleEvents(message: gptMessageItem) {
  const headers = new Headers();
  let requestParam: { [key: string]: any } = {
    ...message,
    model: currentOpenConversation.value?.model,
    platform: currentOpenConversation.value?.platform,
  };
  let reply_content = "";
  headers.append("Content-Type", "application/json");
  // headers.append("X-User", "11"); // test
  headers.append(
    "Authorization",
    "Bearer " + `${useAuthStore().tokens?.accessToken}`
  );
  const response: any = await fetch(SiteApis.gpt.createMessageSSE.url, {
    method: SiteApis.gpt.createMessageSSE.method,
    headers,
    body: JSON.stringify(requestParam),
  });

  if (!response.ok) {
    console.error("get reply by sse error -> ", response);
    // on_callback("",true,"backend error",response.text);
    message.error = true;
    message.error_code = "backend error";
    message.error_detail = response.text;
    message.reply_content = reply_content;
    message.reply_finished = true;
    message.has_sended = true;
    return;
  }

  // 模拟事件流处理
  let reader = response.body.getReader();
  let decoder = new TextDecoder();

  // todo 中途中断
  while (true) {
    const result = await reader.read();
    if (result.done) {
      // on_callback(reply_content,false,"","");
      // console.log("get reply by sse success -> ", message.reply_content);
      // let currentMessage = getMessageById(message.uuid);
      // if (currentMessage) {
      //   currentMessage.error = false;
      //   currentMessage.error_code = "";
      //   currentMessage.error_detail = "";
      //   currentMessage.reply_content = reply_content;
      //   currentMessage.reply_finished = true;
      //   currentMessage.has_sended = true;
      // }
      message.error = false;
      message.error_code = "";
      message.error_detail = "";
      message.reply_finished = true;
      message.has_sended = true;
      querying.value = false;
      console.log("get reply by sse success -> ",conversationMessageMap.value,currentGptMessageList.value);

      break;
    }

    const data = decoder.decode(result.value, { stream: true });
    const events = data.split("\n\n"); // 服务器以'\n\n'作为事件边界

    for (const event of events) {
      let currentMessage = getMessageById(message.uuid);
      const lines: String[] = event.split("\n");
      const eventLine = lines.find((line) => line.startsWith("event:"));
      if (eventLine) {
        const eventName = eventLine.substring("event:".length).trim();
        const eventData = lines
          .find((line) => line.startsWith("data:"))
          ?.substring("data:".length)
          .trim();
        /** message 格式
         *  { message: "",query_message_id: "",conversation_id: "",finish_reason:""}
         */
        console.log(`Received event "${eventName}" with data: ${eventData}`);
        if (eventData) {
          let data = JSON.parse(eventData);
          if (
            data.conversation_id == message.conversation_id &&
            data.query_message_uuid == message.uuid
          ) {
            if (currentMessage) {
              currentMessage.reply_content += data.message;
              // console.log("reply content ->", message.reply_content,data.message);
            }
          }
        }
      }
    }
  }
}

function stopGetMessage() {
  // 关闭事件流
  // reader.cancel();
  let query_message_uuid = getMessageById(
    currentOpenConversationID.value
  )?.uuid;
  if (query_message_uuid) {
    ChatApis.stopGetMessageSSE(query_message_uuid)
      .then((res) => {
        console.log("stop get message", res);
        if (query_message_uuid) {
          let messageItem = getMessageById(query_message_uuid);
          if (messageItem) {
            messageItem.error = true;
            messageItem.error_code = "manual stop";
            messageItem.error_detail = "用户手动停止";
          }
        }
      })
      .catch((error) => {
        console.error("stop get message error ->", error);
      })
      .finally(() => {
        querying.value = false;
      });
  } else {
    ElMessage.error("没有找到对应的查询消息");
  }
}

function getMessageById(query_message_uuid: string) {
  if (currentGptMessageList.value.length > 0) {
    return currentGptMessageList.value.find(
      (item) => item.uuid == query_message_uuid
    );
  }
}

export {
  conversationList,
  currentOpenConversationID,
  currentGptMessageList,
  conversationMessageMap,
  queryContent,
  querying,
  loadingText,
  currentOpenConversation,
  loadingMessage,
  replying,
  creatingConversation,
  createDialogFormVisible,
  delConversation,
  createConversation,
  getAllConversation,
  fetchAndHandleEvents,
  stopGetMessage,
  getMessageById,
};

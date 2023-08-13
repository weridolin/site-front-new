import { ElMessage, ElMessageBox } from "element-plus";
import { create_conn } from "src/services/ws";
import { useAuthStore } from "src/store/user";
import { ref, reactive, watch } from "vue";
import {
  type ChatGPTConversationItem,
  type ChatGPTMessageItem,
  type ChatGPTWSMessage,
  ChatGPTWSType,
  ChatGPTWSMessageRole,
  ChatApis,
} from "src/services/apis/chat";

/***************** 变量    **********************/
let chatGPTWS: WebSocket;

// 会话列表
const conversationList = ref<ChatGPTConversationItem[]>([]);
//当前需要显示的对话内容
const chatMessageList = ref<ChatGPTMessageItem[]>([]);
//会话列表 -- 对话内容的MAP映射
const conversationMessageMap = ref<Map<number, ChatGPTMessageItem[]>>();
// const chatConversationMessageMapper=todo

const currentOpenIndex = ref(-4); //当前打开的会话,默认第一个
const currentOpenConversationID = ref(-1); //当前打开的会话ID

watch(currentOpenIndex, (newValue, oldValue) => {
  if (
    conversationMessageMap.value &&
    conversationMessageMap.value.has(currentOpenConversationID.value)
  ) {
    chatMessageList.value =
      conversationMessageMap.value.get(currentOpenConversationID.value) || [];
  } else {
    ChatApis.getChatMessage({
      conversation_id: currentOpenConversationID.value,
    })
      .then((res) => {
        conversationMessageMap.value?.set(
          res.data.conversation_id,
          res.data.results
        );
        chatMessageList.value = res.data.results;
        console.log(">>> get chat message list", res.data);
      })
      .catch((error) => {
        console.log(`get chat message error:${error}`);
      });
  }
});


// 查询相关
const queryContent = ref(""); //查询内容
const querying = ref(false); //查询中？。。。
const loadingText = ref("生成回复中..."); //查询中显示文字
const chatMessagePagination =  ref({
  "count":1,
  "previous":"",
  "next":"",
  "page_size":10,
  "page":1
})

/***********   WS method     *************/
function build() {
  let user_id = useAuthStore().userInfo?.profile.user.id;
  if (user_id == null) {
    ElMessage.error(`请先登录`);
    return;
  }
  chatGPTWS = create_conn(`ws/thirdApi/chatGPT/${user_id}`);
  chatGPTWS.onmessage = function (event) {
    console.log("get message from ws server >>>", event.data);
    onMessage(event.data);
  };
  chatGPTWS.onerror = function (event) {
    ElMessage.error(`ws链接出错`);
    console.log("ws on error", event);
    console.log("an error raise an in ws");
    querying.value = false;
  };
  chatGPTWS.onopen = (event) => {
    ElMessage.success("链接已经建立");
  };
  chatGPTWS.onclose = (event) => {
    console.log("后台ws关闭");
    ElMessage.error("后台WS服务关闭，请刷新页面!");
  };
}

function onMessage(data: string) {
  const _data: ChatGPTWSMessage = JSON.parse(data);
  switch (_data.type) {
    case ChatGPTWSType.connect: {
      console.log(">>> chatGPT ws connection build");
      break;
    }
    case ChatGPTWSType.error: {
      console.log(">>> chatGPT raise an error", _data);
      ElMessage.error("生成回复出错.请刷新页面重试.");
      querying.value = false;
      break;
    }
    case ChatGPTWSType.reply: {
      console.log("chatGPT get reply message", _data);
      querying.value = false;
      /**add chatMessageItem */
      let msg = _data.data;
      if (currentOpenConversationID.value == msg.conversation_id) {
        /**添加到当前的列表中 */
        chatMessageList.value.push(msg);

        /**添加到conversation-message-map列表中 */
        if (
          conversationMessageMap.value &&
          conversationMessageMap.value.has(msg.conversation_id)
        ) {
          conversationMessageMap.value
            .get(currentOpenConversationID.value)
            ?.push(msg);
        } else {
          /**conversation-message-map没有的话,生成对应的item */
          console.log(
            "conversationMessageMap 里面找不到对应conversation id",
            msg.conversation_id
          );
        }
      }
      break;
    }
    default:
      break;
  }
}

function submit() {
  console.log(">>>send message");
  if (!chatGPTWS) {
    ElMessage.error("请先打开一个会话");
    return;
  }
  if (currentOpenConversationID.value == -1) {
    ElMessage.error("请先新建一个会话~");
    return;
  }
  if (!queryContent.value) {
    ElMessage.error("请先输入咨询内容");
    return;
  }
  // 先获取上一条UUID,咨询肯定都是列表的最后一条
  let _list = conversationMessageMap.value?.get(
    currentOpenConversationID.value
  );
  let p_uuid: string;
  if (_list && _list.length > 0) {
    p_uuid = _list[_list.length - 1]?.uuid;
  } else {
    p_uuid = crypto.randomUUID();
  }

  let data = {
    type: ChatGPTWSType.query,
    data: {
      query_content: queryContent.value,
      parent_message_uuid: p_uuid,
      reply_content: "",
      uuid: crypto.randomUUID(),
      content_type: "text",
      role: ChatGPTWSMessageRole.query,
      conversation_id: currentOpenConversationID.value,
    },
  };
  /**将发送到消息添加到当前的消息列表里面 */
  _list?.push(data.data);
  chatMessageList.value.push(data.data);
  chatGPTWS.send(JSON.stringify(data));
  querying.value = true;
  queryContent.value = "";
}

/*************    HTTP METHODS                ************/

function delConversation(all: boolean) {
  ElMessageBox.confirm(
    all ? "是否删除所有会话?" : "是否删除所选会话?",
    "提示",
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }
  ).then(() => {
    if (all) {
      ChatApis.delConversation(-1)
        .then(() => {
          conversationList.value = [];
          conversationMessageMap.value?.clear();
          ElMessage.success("删除会话成功");
          currentOpenConversationID.value = -1;
          currentOpenIndex.value = -4;
        })
        .catch((error) => {
          console.log("删除所有会话失败", error);
          ElMessage.error(`删除所有会话失败`);
        });
    } else {
      if (currentOpenIndex.value == -4) {
        ElMessage.error("请先选择一个会话!");
        return;
      }
      ChatApis.delConversation(currentOpenConversationID.value)
        .then(() => {
          conversationList.value.splice(currentOpenIndex.value, 1);
          ElMessage.success("删除会话成功");
          currentOpenConversationID.value = -1;
          currentOpenIndex.value = -4;
          chatMessageList.value = [];
          if (
            conversationMessageMap.value?.has(currentOpenConversationID.value)
          ) {
            conversationMessageMap.value.delete(
              currentOpenConversationID.value
            );
          }
        })
        .catch((error) => {
          console.log("删除所有会话失败", error);
          ElMessage.error(`删除所有会话失败`);
        });
    }
  });
}

function openConversation(index: number, item: ChatGPTConversationItem) {
  if (!chatGPTWS) {
    build();
  }
  currentOpenConversationID.value = item.id;
  currentOpenIndex.value = index;
  console.log("current open conversation index:", index, " id:", item.id);
}

function createConversation() {
  if (conversationList.value.length >= 5) {
    ElMessage.error("暂时最多创建5个会话!");
    return;
  }
  let title = `chat-${Date.now().toString()}`;
  ChatApis.createConversation(title)
    .then((res) => {
      console.log("create conversation", res, title);
      conversationList.value.push(res.data);
    })
    .catch((error) => {
      console.log(`创建新会话失败:${error}`);
    });
}

function getAllConversation() {
  ChatApis.getConversations({})
    .then((res) => {
      conversationList.value = res.data.results;
    })
    .catch((err) => {
      ElMessage.error(`获取所有的`);
      console.log(">>>get all conversation error", err.data);
    });
}

export {
  build,
  conversationList,
  chatMessageList,
  currentOpenIndex,
  queryContent,
  querying,
  loadingText,
  openConversation,
  delConversation,
  createConversation,
  getAllConversation,
  submit,
};

<template>
  <div class="gpt-windows">
    <!-- 新建会话弹出框 -->
    <el-drawer
      ref="drawerRef"
      v-model="createDialogFormVisible"
      title="新建一个会话!"
      direction="ltr"
      class="demo-drawer"
    >
      <div class="demo-drawer__content">
        <el-form :model="newConversationForm">
          <el-form-item label="会话名称" >
            <el-input v-model="newConversationForm.title" autocomplete="off" />
          </el-form-item>
          <el-form-item label="会话描述" >
            <el-input v-model="newConversationForm.description" autocomplete="off" />
          </el-form-item>
          <el-form-item label="平台" >
            <el-select
              v-model="newConversationForm.platform"
              placeholder="选择平台"
            >
              <el-option
                v-for="item in platformOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>      
          </el-form-item>
          <el-form-item label="模型" >
            <el-select
              v-model="newConversationForm.model"
              placeholder="选择平台"
            >
              <el-option
                v-for="item in getPlatformModelOptions(newConversationForm.platform)"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select> 
          </el-form-item>
          <el-form-item label="密钥" >
            <el-input v-model="newConversationForm.key" autocomplete="off" />
          </el-form-item>
          <!-- <el-form-item label="方式" >
            <el-input v-model="newConversationForm.key" autocomplete="off" />
          </el-form-item> -->
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">取消</el-button>
          <el-button type="primary" :loading="creatingConversation" @click="createCon">{{
            creatingConversation ? '新建中 ...' : '新建'
          }}</el-button>
        </div>
      </div>
    </el-drawer>

    <el-container class="gpt-windows-container-left">
      <el-aside width="10%" class="gpt-windows-container__navbar">
        <el-menu
          class="gpt-windows-container__navbar_menu_buttons"
          text-color="#fff"
        >
          <el-menu-item index="1" @click="showCreateDialog">
            <el-button
              color="#626aef"
              :icon="Edit"
              :dark="true"
              round
              class="gpt-row-menu-item-container_button"
            >
              新建一个会话
            </el-button>
          </el-menu-item>
          <el-menu-item index="2" @click="delConversation(false)">
            <el-button
              color="#626aef"
              :icon="Delete"
              :dark="true"
              round
              class="gpt-row-menu-item-container_button"
            >
              删除一个会话
            </el-button>
          </el-menu-item>
          <el-menu-item index="3" @click="delConversation(true)">
            <el-button
              color="#626aef"
              :icon="Delete"
              :dark="true"
              round
              class="gpt-row-menu-item-container_button"
            >
              删除所有会话
            </el-button>
          </el-menu-item>
          <el-menu-item index="4">
            <el-divider border-style="dashed solid;"></el-divider>
          </el-menu-item>
        </el-menu>
        <el-menu
          class="gpt-windows-container__navbar_menu_conversations"
          text-color="#fff"
        >
            <el-menu-item
              :index="i.toString()"
              style="padding:  0 10px;border: 1px;"
              @click="handleOpen(item)"
              v-for="(item, i) in conversationList" 
              :key="i"
            >
              <div class="gpt-row-menu-item-container_conversation_card">
                <div class="gpt-row-menu-item-container_conversation_card_prefix">
                  <el-icon><ChatDotSquare /></el-icon>
                </div>
                <div class="gpt-row-menu-item-container_conversation_card_title">
                  {{ getTitleBrief(item.title) }}
                </div>
                <el-popover
                  placement="right"
                  trigger="click"
                  width="200"
                  v-model="visiblePopover"
                  class = "popover-container"
                  >
                  <div class="popover-elements">
                    <div class="popover-elements-tags">
                      <el-tag
                        effect="plain"
                        round
                        class="tag"
                        size="small"
                        type="primary"
                      >
                        {{ item.platform }}
                      </el-tag>
                      <el-tag
                        effect="plain"
                        round
                        class="tag"
                        size="small"
                        type="success"
                      >
                        {{ item.model }}
                      </el-tag>

                    </div>
                    <!-- <el-divider content-position="left" /> -->
                    <div class="divider">   </div>
                    <div class="popover-elements-button">
                      <el-button type="danger" plain round size="small" @click="delConversation(false)">删除</el-button>
                  
                    </div>
                    <div class="popover-elements-button">
                      <el-button type="primary" plain round size="small" @click="collectConversation">收藏</el-button>
                    </div>                    
                    <!-- <el-button type="danger" plain>Danger</el-button> -->
                  </div>
                  <template #reference>
                  <div class="gpt-row-menu-item-container_conversation_card_tools">
                    ...
                  </div>
                  </template>
                </el-popover>
              </div>
            </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container class="gpt-windows-content-right">
        <!-- <el-header class="gpt-windows-content-right_header"></el-header> -->
        <el-main class="gpt-windows-content-right__main">
          <div class = "gpt-windows-content-right__main_messages">
            <div class="messageList" v-loading="loadingMessage" >
              <div 
                  v-for="(msg, i) in currentGptMessageList"
                  :key="i"
                >
                <div class="messageCard-query">
                  <div class="message-role">
                    <el-avatar>
                      用户
                    </el-avatar>
                  </div>
                  <div class="card-content">
                    {{ msg.query_content }}
                  </div>
                </div>
                <div class="messageCard-reply">
                  <div class="message-role-reply">
                    <el-avatar>
                      系统
                    </el-avatar>
                  </div>
                  <div class="card-content-reply" v-loading="msg.reply_content === 'todo'" element-loading-text="正在生成回复中">
                    {{ msg.reply_content === "todo" ? "" : msg.reply_content}}
                  </div>
                </div>
              </div>
            </div> 
          </div>
          <div class ="gpt-windows-content-right__main_inputs">
            <div class = "gpt-windows-content-right__main_inputs_buttons">  
                <el-tag
                  class="tag"
                  type="primary"
                  effect="plain"

                >
                  {{currentOpenConversation?currentOpenConversation.platform:"所属平台"}}
                </el-tag>  
                <el-tag
                  class="tag"
                  type="success"
                  effect="plain"
                >
                  {{currentOpenConversation?currentOpenConversation.model:"所用模型"}}
                </el-tag>  
                <el-button color="#626aef" plain round class="clear" @click="submit">
                  {{querying?"停止":"发送"}}
                </el-button>
            </div>
            <div class = "gpt-windows-content-right__main_inputs_textarea">
              <textarea class="multi-line-input" placeholder="输入要查询的内容" v-model="query" @input="handleInput"></textarea>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import replyAvatar from "src/assets/images/50042420.png";
import { ref, onMounted, onUnmounted, computed, reactive, watch } from "vue";
import {
  conversationList,
  delConversation,
  createConversation,
  getAllConversation,
  queryContent,
  querying,
  loadingText,
  getReplyByWS,
  fetchAndHandleEvents,
  currentOpenConversationID,
  currentGptMessageList,
  currentOpenConversation,
  loadingMessage,
  stopGetMessage,
  creatingConversation,
  createDialogFormVisible,
  conversationMessageMap,
  buildWsConn,
  way,
  type createConversationForm
} from "src/pages/alinlab/gpt";
import { Check, Delete, Edit, ChatDotRound } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { v4 as uuidv4 } from 'uuid';

const newConversationForm = reactive<createConversationForm>({
  title: "",
  platform: "",
  model: "",
  description: "",
  key:""
});
const query = ref("");
const chatWin = ref(null);
const visiblePopover = ref(true);
const handleOpen = (item:any) => {
  if (querying.value) {
    ElMessage({
      message: "请先停止当前查询",
      type: "error",
    });
    return;
  }
  console.log(item,item.index);
  currentOpenConversationID.value = item.uuid;
  currentOpenConversation.value = item;
};

const platformOptions = [
  {
    value: '通义千问',
    label: '通义千问',
  },
  {
    value: 'chatGPT',
    label: 'chatGPT',
  },
]

const modelOptions: { [key: string]: { value: string; label: string; }[] }  = {
  "通义千问": [
    {
      value: 'qwen-turbo',
      label: 'qwen-turbo',
    },
    {
      value: 'qwen-plus',
      label: 'qwen-plus',
    },
    {
      value: 'qwen-max',
      label: 'qwen-max',
    },
    {
      value: 'qwen-max-longcontext',
      label: 'qwen-max-longcontext',
    },
    {
      value: 'qwen-max-1201',
      label: 'qwen-max-1201',
    },
  ],
  "chatGPT": [
    {
      value: 'GPT3.5',
      label: 'GPT3.5',
    },
    {
      value: 'GPT4',
      label: 'GPT4',
    },
  ]
}


buildWsConn();

function createCon() {
  console.log("create conversation ->", newConversationForm);
  createConversation(newConversationForm);
  // createConversation(newConversationForm);
}

function getPlatformModelOptions(platform:string){
  return modelOptions[platform];
}

function cancelForm() {
  createDialogFormVisible.value = false;
}

function chatWinResize() {
  if (chatWin.value && chatWin.value != null) {
    console.log(window.innerHeight * 0.7 + "px", ">>>");
    (chatWin.value as HTMLElement).style.height =
      window.innerHeight * 0.7 + "px";
  }
}

function getTitleBrief( title:string){
  if (title.length > 10) {
    return title.substring(0, 10) + "...";
  }
  else{
    return title;
  }
}

// function deleteConversation(){
//   console.log("delete conversation ->", currentOpenConversationID.value);
//   delConversation(true);
// }

function collectConversation(){
  console.log("collect conversation ->", currentOpenConversationID.value);
}

function  handleInput(event:any) {
  console.log("conversationMessageMap ->", conversationMessageMap.value);
// 每次输入时创建一个新字符串，避免影响之前的值
  query.value = event.target.value;
}

function showCreateDialog() {
  if (createDialogFormVisible.value) {
    createDialogFormVisible.value = false;
  } else{
  createDialogFormVisible.value = true;
  }
}

async function submit() {
  if (querying.value) {
    console.log("stop query ->", query.value);
    stopGetMessage()
    return;
  }
  else{
    if (query.value.trim() === "") {
      ElMessage({
        message: "询问内容不能为空",
        type: "error",
      });
      return;
    }
    if (currentOpenConversationID.value === "") {
      ElMessage({
        message: "请选择一个会话",
        type: "error",
      });
      return;
    }
    console.log("start query ->", query.value);
    querying.value = true;
    let getMessageRequest = { 
      uuid:uuidv4(),
      query_content: query.value, //查询内容
      query_content_type: "text", // text
      reply_content: "",//回复内容
      reply_content_type:"text", // text
      conversation_id: currentOpenConversationID.value, //会话ID
      reply_finished: false, //是否回复完成
      interrupt: false, //是否中断
      interrupt_reason: "", //中断原因
      websocket_id: "string", //websocket ID
      has_sended: false, //是否已发送
      error: false,//是否错误
      error_code:"", //错误代码
      error_detail:"", //错误详情
    }
    currentGptMessageList.value.push(getMessageRequest);
    query.value = "";
    if(way.value == "ws"){
      console.log("get reply by ws ->", getMessageRequest)
      getReplyByWS(getMessageRequest)
    }else{
      await fetchAndHandleEvents(getMessageRequest)   
    }
  }
}



onMounted(() => {
  getAllConversation();
  console.log("conversation list ->", conversationList.value);
});
onUnmounted(() => {
  window.removeEventListener("resize", chatWinResize);
});
</script>

<style lang="scss" scoped>
.gpt-windows {
  height: 100%;
}

.el-button {
  height: 75%;
}

.gpt-row {
  height: 100%;
  width: 100%;
}

.gpt-windows-container__navbar {
  overflow: hidden;

  .gpt-windows-container__navbar_menu_buttons {
    // height: 100%;
    width: 100%;
    background-color: #ffffff;
    color: #fff;
    border-radius: 15px;
    // margin-left: 5%;
    margin-top: 20%;
    // margin-right: 5%;
    // border-right: 5%;
    margin-left: 1%;
    margin-right: 1%;
    .gpt-row-menu-item-container_button {
      // text-align: center;
      flex-grow: 1; /* 这会让元素尽可能地增长并占用可用空间 */
      flex-shrink: 0; /* 如果你不希望它收缩以适应容器大小，可设置为0 */
      flex-basis: 0;
      // background-color: #ffffff;
    }
  }
  .gpt-windows-container__navbar_menu_conversations {
    .gpt-row-menu-item-container_conversation_card {
      flex-grow: 1; /* 这会让元素尽可能地增长并占用可用空间 */
      flex-shrink: 0; /* 如果你不希望它收缩以适应容器大小，可设置为0 */
      flex-basis: 0;
      width: 100%;
      display: flex;
      color: black;
      // margin: 0 0 0 0;
      padding: 0 0 0 0;
      .gpt-row-menu-item-container_conversation_card_prefix {
        flex-grow: 1;
      }
      .gpt-row-menu-item-container_conversation_card_title{
        font-size: 15px;
        flex-grow: 8;
        color:#726464e3;
      }
      .gpt-row-menu-item-container_conversation_card_tools{
        flex-grow: 1;
        float: right;
      }
    }
  }
}

.gpt-windows-content-right {
  // height: 100%;
  // width: 100%;
  border-radius: 15px;
  // margin-top: 1%;
  margin-right: 1%;
  margin-left: 1%;
  .gpt-windows-content-right_header {
    // margin-top: 5%;
    // background-color: #f0f0f0;
    margin-left: 1%;
    margin-right: 1%;
  }
  .gpt-windows-content-right__main {
    border-radius: 10px;
    margin-top: 1%;
    margin-bottom: 1%;
    // background-color: #f0f0f0;
    // margin-left: 1%;
    margin-right: 1%;
    display: flex;
    flex-direction: column;
    .gpt-windows-content-right__main_messages{
      flex-grow: 4;
      // background-color: #f7f8fc;
      padding-left: 10%;
      padding-right: 10%;
      max-height: 80%;
      overflow-x: hidden; /* 默认隐藏水平滚动条，只有当内容宽度超出时才需要显示，若需水平滚动则改为 'auto' */

      .messageList {
        background-color: #f7f8fc;
        width: 100%; /* 或者自定义宽度 */
        height: 100%; /* 自定义高度，也可以用CSS响应式设计 */
        border: 1px solid #6469676e; /* 边框样式 */
        border-radius: 12px;
        padding-left: 1%;
        padding-right: 1%;
        // height: 200px; /* 设置一个固定的高度，或者使用 max-height 限制最大高度 */
        overflow-y: auto; /* 当内容高度超出此高度时，会出现垂直滚动条 */
        overflow-x: hidden; /* 默认隐藏水平滚动条，只有当内容宽度超出时才需要显示，若需水平滚动则改为 'auto' */
        
        .messageCard-query {
          padding-top: 1%;
          border-radius: 12px;
          display: flex; 
          .message-role {
            flex: 0 1 3%; /* 第一个子元素占10% */
            display: flex;
            justify-content: center; /* 水平居中 */
            align-items: center; /* 垂直居中 */
          }
          .card-content {
            width: 60% ;
            background-color: white;
            white-space: normal;
            word-wrap: break-word;
            border-radius: 20px;
            padding: 15px 10px;
            flex: 0 1 60%; /* 第二个子元素占60% */
            
          }
        }

        .messageCard-reply {
          padding-top: 1%;
          border-radius: 12px;
          display: flex; 
          flex-direction: row-reverse;
          .message-role-reply {
            flex: 0 1 3%; /* 第一个子元素占10% */
            display: flex;
            justify-content: center; /* 水平居中 */
            align-items: center; /* 垂直居中 */
          }
          .card-content-reply {
            width: 60% ;
            background-color: white;
            white-space: normal;
            word-wrap: break-word;
            border-radius: 20px;
            padding: 15px 10px;
            flex: 0 1 60%; /* 第二个子元素占60% */
            margin-bottom: 3%;
          }
        }
      }
    }
    .gpt-windows-content-right__main_inputs {
      margin-top: 1%;
      flex-grow: 1;
      // background-color: #f7f8fc;
      padding-left: 10%;
      padding-right: 10%;
      display: flex;
      flex-direction: column;
      .gpt-windows-content-right__main_inputs_buttons{
        flex-grow: 1;
        justify-content: flex-end; /* 子元素居右对齐 */
        display: flex;
        padding-top: 1%;
        .clear {
          flex: 0 0 8%; /* 设置宽度占比为8%，flex-grow为0表示不扩展，flex-shrink为0表示不收缩 */
        }
        .tag {
          flex: 0 0 5%; /* 设置宽度占比为92%，flex-grow为0表示不扩展，flex-shrink为0表示不收缩 */
          margin-right: 1%;
          align-self: flex-start; /* 对于居左的子元素，使其在交叉轴上尽可能靠左对齐 */
        }
      }
      .gpt-windows-content-right__main_inputs_textarea{
        padding-top: 1%;
        padding-bottom: 1%;
        flex-grow: 10;
        align-items: stretch; /* 让子元素沿交叉轴（垂直方向）拉伸填充 */
        .multi-line-input {
          width: 100%; /* 或者自定义宽度 */
          height: 100%; /* 自定义高度，也可以用CSS响应式设计 */
          resize: none; /* 允许用户调整文本区域大小 */
          border: 1px solid #098a4d; /* 边框样式 */
          border-radius: 12px;
          padding-left: 1%;
      }
      }
    }
  }
}


// 
// .popover-container{
  // display: flex;
  // flex-direction: column;
  .popover-elements {
    display: flex;
    flex-direction: column;
    .popover-elements-tags {
      margin-top: 5px;
      margin-bottom: 5px;
      display: flex;
      flex-wrap: wrap;
      .tag{
        margin-right: 5px;
        margin-bottom: 5px;
        flex:0 0 20%
      }
    }
    .divider{
      border-top-width: 1px; /* 设置上边框宽度 */
      border-top-style: dashed ; /* 设置上边框样式，如实线、虚线等 */
      border-top-color: rgba(0, 0, 0, 0.281); /* 设置上边框颜色 */
      margin-bottom: 10px;
    }
    .popover-elements-button {
      display: flex;
      flex-direction: column;
      margin-bottom: 5px;
    }
  }
// }
</style>

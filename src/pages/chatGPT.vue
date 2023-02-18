<template>
  <div class="chatgpt-windows">
    <el-row class="chatgpt">
      <el-col :span="3">
        <el-menu
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          :default-active="(currentOpenIndex + 4 + 1).toString()"
          text-color="#fff"
        >
          <el-menu-item index="1" @click="createConversation">
            <el-icon><FolderAdd /></el-icon>
            <template #title style="text-align: center">新建一个会话</template>
          </el-menu-item>
          <el-menu-item index="2" @click="delConversation(false)">
            <el-icon><FolderRemove /></el-icon>
            <template #title style="text-align: center"> 删除所选会话</template>
          </el-menu-item>
          <el-menu-item index="3" @click="delConversation(true)">
            <el-icon><Delete /></el-icon>
            <template #title style="text-align: center"> 删除所有会话</template>
          </el-menu-item>
          <el-menu-item index="4">
            <el-divider border-style="inset"></el-divider>
          </el-menu-item>
          <el-menu-item
            v-for="(item, i) in conversationList"
            :key="i"
            :index="(i + 4 + 1).toString()"
            @click="openConversation(i,item)"
          >
            <el-icon><ChatDotRound /></el-icon>
            <template #title style="text-align: center">{{
              item.title
            }}</template>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="21">
        <div class="message">
          <div
            class="message-content infinite-list-wrapper"
            style="overflow: auto"
            ref="chatWin"
          >
            <ul
              v-infinite-scroll="load"
              class="list"
              :infinite-scroll-disabled="disabled"
            >
              <li
                v-for="(msg, i) in chatMessageList"
                :key="i"
                class="list-item"
                :style="{
                  background: msg.role == 0 ? '#d1c1c114' : '#779d972e',
                }"
              >
                <div>
                  <el-avatar
                    :src="
                      msg.role == 0 // ? query
                        ? 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
                        : replyAvatar
                    "
                  />
                </div>
                <div class="message-detail">
                  {{ msg.role == 0 ? msg.query_content : msg.reply_content }}
                </div>
              </li>
            </ul>
          </div>
          <div 
            class="message-input"
            v-loading="querying"
            :element-loading-text="loadingText"
          >
            <div class="query-message-input">
              <el-input
                v-model="queryContent"
                autosize
                type="textarea"
                placeholder="输入想要查询的内容"
              />
            </div>
            <div class="query-submit-button">
              <el-button type="primary"  @click="submit">发送</el-button>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
// import { UserFilled } from "@element-plus/icons-vue";
import replyAvatar from "src/assets/images/50042420.png";
import query from "src/assets/images/query.png";
import { ref, onMounted, onUnmounted, computed, reactive, watch } from "vue";
import {
  conversationList,
  openConversation,
  delConversation,
  chatMessageList,
  createConversation,
  currentOpenIndex,
  getAllConversation,
  queryContent,
  querying,
  loadingText,
  submit
} from "src/pages/chatGPT";

const isCollapse = ref(false);
const chatWin = ref(null);
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const count = ref(10);
const loading = ref(false);
const noMore = computed(() => count.value >= 20);
const disabled = computed(() => loading.value || noMore.value);
const load = () => {
  loading.value = true;
  setTimeout(() => {
    count.value += 2;
    loading.value = false;
  }, 2000);
};
function chatWinResize() {
  if (chatWin.value && chatWin.value != null) {
    console.log(window.innerHeight * 0.7 + "px", ">>>");
    (chatWin.value as HTMLElement).style.height =
      window.innerHeight * 0.7 + "px";
  }
}
onMounted(() => {
  chatWinResize();
  window.addEventListener("resize", chatWinResize);
  getAllConversation()
});
onUnmounted(() => {
  window.removeEventListener("resize", chatWinResize);
});
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  /* width: ; */
  min-height: 100%;
}
.footer {
  width: auto;
}
.chatgpt {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
/*  */
.message {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 70% 30%;
  overflow: hidden;
  grid-gap: 10px;
  margin-right: 20%;
}

.message-content {
  /* background: #19caad; */
  overflow: hidden;
}
::-webkit-scrollbar {
  height: 20px;
  width: 20;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(224, 219, 219, 0.596);
  background: #bebaba;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(179, 173, 173, 0.2);
  border-radius: 10px;
  background: #ededed;
}

.message-input {
  /* background: #8cc7b5; */
  overflow: hidden;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 10px;
  /* margin-left: 10%; */
  /* margin: 5% 10%; */
}
.query-message-input {
  /* background: #19CAAD; */
  overflow: hidden;
  margin-left: 20%;
  display: flex;
  align-items: center;
  /* margin-right: 5%; */
}
.query-submit-button {
  justify-items: start;
  overflow: hidden;
  /* background: #8CC7B5; */
  margin-right: 10%;
  display: flex;
  align-items: center;
}

/* .query-content {
  position: absolute;
  width: 83%;
  height: 100%;
  overflow: hidden ;
} */

.infinite-list-wrapper {
  height: 300px;
  text-align: center;
}
.infinite-list-wrapper .list {
  padding: 0;
  margin: 0;
  list-style: none;
}

.infinite-list-wrapper .list-item {
  display: grid;
  align-items: center;
  /* justify-content: center; */
  height: 100px;
  background: var(--el-color-danger-light-9);
  /* color: var(--el-color-danger); */
  grid-template-columns: 2fr 9fr;
  grid-gap: 10px;
}

.message-detail {
  text-align: left;
}

.infinite-list-wrapper .list-item + .list-item {
  margin-top: 10px;
}
</style>
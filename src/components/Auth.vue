<template>
  <el-affix :offset="100"  position="bottom">

    <div class="custom-toolbar" >
      <!-- 展开固钉 -->
      <el-tooltip
        class="box-item"
        effect="dark"
        :content="getAffixContent()"
        placement="left"
      >
        <div class="toolbar-item"  @click="showAuthMenu" style="transform: translateY(-50px);">
          <i><el-icon><MoreFilled /></el-icon></i>
        </div>
        <!-- <el-button type="primary" color="#626aef" @click="showAuthMenu" class="statusBtn" round>{{affixContent}}<el-icon><User /></el-icon></el-button> -->
      </el-tooltip>

      <!-- 聊天固钉 -->
      <el-tooltip
        class="box-item"
        effect="dark"
        :content="getContactContent()"
        placement="left"
        v-if="expandAuthMenu"
      > 
      

        <div class="toolbar-item" style="transform: translateY(-140px);" @click="openChatWindows">
            <i><el-icon><ChatDotRound /></el-icon></i>
        </div>

      </el-tooltip>


      <!-- 登录固钉 -->
      <router-link to="/login">
        <el-tooltip
                class="box-item"
                effect="dark"
                content="登录"
                placement="left"
                v-if="expandAuthMenu"
              >
          <div class="toolbar-item " style="transform: translateY(-230px);">
            <i><el-icon><Avatar /></el-icon></i>
          </div>
        </el-tooltip>
      </router-link>

      <!-- 注销固钉 -->
      <el-tooltip
        class="box-item"
        effect="dark"
        content="注销"
        placement="left"
        v-if="expandAuthMenu"
      >
        <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="取消"
            :icon="InfoFilled"
            icon-color="#626AEF"
            title="是否确定注销？"
          >
            <template #reference>
                <div class="toolbar-item " style="transform: translateY(-320px);">
                  <i><el-icon><Back /></el-icon></i>
                </div>
            </template>
          </el-popconfirm>
      </el-tooltip>
    </div>
  </el-affix>
  <ChatWindow v-if="showChatWindows" @closeChatWindows="closeChatWindows" :messages="messageList" :onUserInputSubmit="onUserInputSubmit"></ChatWindow>
</template>


<script setup lang="ts">

  import { InfoFilled } from '@element-plus/icons-vue'
  import { ref,unref } from 'vue'
  import {useAuthStore} from 'src/store/user'
  import ChatWindow from 'src/components/ChatWindow.vue'
  import type {chatMessage} from 'src/services/apis/chat'
  // import {ChatWindow} from 'src/components/chat/ChatWindow.vue'


  const authMenu = ref()
  const isOnline = ref(false)
  const expandAuthMenu = ref(false)
  const isCheckingToken = ref(false) //每次打开校验token 
  const showLogout = ref(false) // 是否显示注销对话框
  const showChatWindows = ref(false)

  const {isLogin,userInfo} = useAuthStore()
  const affixContent = ref<string>("未登录")
  
  function showAuthMenu() {
    console.log(">>>>>")
    expandAuthMenu.value==true?expandAuthMenu.value=false:expandAuthMenu.value=true
    showChatWindows.value=false
  }

  function getContactContent (){
    return `联系我${isOnline.value?"(在线)":"(不在线)"}` 
    }

  function getAffixContent (){
    // console.log(">>>",isLogin)
    if (isLogin.value){
      return `👦:${userInfo?.profile.user.username}`
    }else{
      return `👦:未登录`
    }
  } 

  function openChatWindows(){
      showChatWindows.value==true?showChatWindows.value=false:showChatWindows.value=true
  }

  function closeChatWindows(){
    console.log(">>> close chat windows")
    showChatWindows.value=false
  }

  // ################ 聊天列表 #####################################
  const messageList = ref<chatMessage[]>([
        { type: 'text', author: `bot`, data: { text: `现在是离线机器人,您可以输入对应的关键词,我会尽量回答的😊` } },
        { type: 'system', author: `bot`, data: { text: `[system]:已经为您建立聊天通道` } },
  ])

  function onUserInputSubmit(message:chatMessage){
    let tem_replay = { type: 'text', author: `bot`, data: { text: `离线自动回复还在搭建中...😊` } }
    messageList.value = [ ...messageList.value, message,tem_replay]
    return console.log(">>> 新增聊天记录")

  }


</script>


<style lang="scss" scoped>
.toolbar-item {
    position: relative;
    width: 40px;
    height: 40px;
    background-color: #fff;
    border-radius: 50%;
    text-align: center;
    font-size: 20px;
    line-height: 40px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    cursor: pointer;
}

.custom-toolbar {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 40px;
    height: 40px;
}


</style>
<template>
  <div class="sc-chat-window" :class="{opened: isOpen, closed: !isOpen}">

    <!-- 聊天框头部 -->
    <Header
      v-if="showHeader"
      @close="$emit('closeChatWindows')"
      ><template>
        <slot name="header"> </slot>
      </template>
    </Header>
    <!-- <UserList v-if="showUserList" :colors="colors" :participants="participants" /> -->
    <!-- 聊天内容列表 -->
    <ChatMessageList
      :colors="colors"
      :messages="props.messages"
      :showTypingIndicator="showTypingIndicator"
      :alwaysScrollToBottom="alwaysScrollToBottom"
      :showConfirmationDeletion="showConfirmationDeletion"
      :confirmationDeletionMessage="confirmationDeletionMessage"
      :messageStyling="messageStyling"
      @scrollToTop="$emit('scrollToTop')"
      @remove="$emit('remove', $event)"
    >
      <template v-slot:user-avatar="scopedProps">
        <slot name="user-avatar" :user="scopedProps.user" :message="scopedProps.message"> </slot>
      </template>
      <template v-slot:text-message-body="scopedProps">
        <slot
          name="text-message-body"
          :message="scopedProps.message"
          :messageText="scopedProps.messageText"
          :messageColors="scopedProps.messageColors"
          :me="scopedProps.me"
        >
        </slot>
      </template>
      <template v-slot:system-message-body="scopedProps">
        <slot name="system-message-body" :message="scopedProps.message"> </slot>
      </template>
      <template v-slot:text-message-toolbox="scopedProps">
        <slot name="text-message-toolbox" :message="scopedProps.message" :me="scopedProps.me">
        </slot>
      </template>
    </ChatMessageList>

    <!-- 用户输入模块  -->
    <ChatUserInput
      :show-emoji="showEmoji"
      :show-emoji-in-text="showEmojiInText"
      :on-submit="props.onUserInputSubmit"
      :suggestions="getSuggestions()"
      :show-file="showFile"
      :placeholder="placeholder"
      :colors="colors"
      @onType="$emit('onType', $event)"
      @edit="$emit('edit', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import Header from 'src/components/ChatHeader.vue'
import ChatMessageList from 'src/components/ChatMessageList.vue'
import ChatUserInput from 'src/components/ChatUserInput.vue'
import { ref,watch } from 'vue';
import type {chatMessage} from 'src/services/apis/chat'

// const emit = defineEmits(['close',"onType","edit","scrollToTop","remove"])

interface Props {
  messages:chatMessage[],
  onUserInputSubmit:Function
}

const showEmoji = ref(true)
const showEmojiInText= ref(true)
const showFile= ref(true)
const showHeader= ref(true)
const title = ref("test")
const isOpen=ref(true)
const alwaysScrollToBottom=ref(false)
const messageStyling=ref(true)
const showConfirmationDeletion=ref(true)
const confirmationDeletionMessage=ref("")
const showTypingIndicator=ref(true)
const placeholder=ref("输入你想说的话")


const colors = {
        header: {
          bg: '#4e8cff',
          text: '#ffffff'
        },
        launcher: {
          bg: '#4e8cff'
        },
        messageList: {
          bg: '#ffffff'
        },
        sentMessage: {
          bg: '#4e8cff',
          text: '#ffffff'
        },
        receivedMessage: {
          bg: '#eaeaea',
          text: '#222222'
        },
        userInput: {
          bg: '#f4f7f9',
          text: '#565867'
        }
  }


const props = defineProps<Props>()
const showUserList = ref(false)


// function  handleUserListToggle(showUserList) {
//       showUserList = showUserList
// }
function  getSuggestions() {
      // return messages.length > 0 ? this.messages[this.messages.length - 1].suggestions : []
      console.log(">>> get successtions")
      return ["QQ是多少?","微信是多少?","邮箱是多少?","这个网站是什么?","怎么联系?"]
}

// function onUserInputSubmit(message:chatMessage){
//   let tem_replay = { type: 'text', author: `bot`, data: { text: `离线自动回复还在搭建中...😊` } }
//   messages.value = [ ...messages.value, message,tem_replay]
//   return console.log(">>> 新增聊天记录")

// }


// watch(messages, () =>{
//       // message:any = props.messageList
//       // return messages
//       console.log(">>> message change")
//     }
// )

</script>




<style scoped>
.sc-chat-window {
  width: 370px;
  height: calc(100% - 120px);
  max-height: 590px;
  position: fixed;
  right: 80px;
  bottom: 80px;
  box-sizing: border-box;
  box-shadow: 0px 7px 40px 2px rgba(148, 149, 150, 0.1);
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  animation: fadeIn;
  animation-duration: 0.3s;
  animation-timing-function: ease-in-out;
}

.sc-chat-window.closed {
  opacity: 0;
  display: none;
  bottom: 90px;
}

@keyframes fadeIn {
  0% {
    display: none;
    opacity: 0;
  }

  100% {
    display: flex;
    opacity: 1;
  }
}

.sc-message--me {
  text-align: right;
}
.sc-message--them {
  text-align: left;
}

@media (max-width: 450px) {
  .sc-chat-window {
    width: 100%;
    height: 100%;
    max-height: 100%;
    right: 0px;
    bottom: 0px;
    border-radius: 0px;
  }
  .sc-chat-window {
    transition: 0.1s ease-in-out;
  }
  .sc-chat-window.closed {
    bottom: 0px;
  }
}
</style>

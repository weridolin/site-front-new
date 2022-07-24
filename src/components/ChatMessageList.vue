<template>
  <div
    ref="scrollList"
    class="sc-message-list"
    :style="{backgroundColor: colors.messageList.bg}"
    @scroll="handleScroll"
  >
    <ChatMessage
      v-for="(message, idx) in props.messages"
      :key="idx"
      :message="message"
      :user="getUser()"
      :colors="colors"
      :message-styling="props.messageStyling"
      :show-confirmation-deletion="props.showConfirmationDeletion"
      :confirmation-deletion-message="props.confirmationDeletionMessage"
      @remove="$emit('remove', message)"
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
    </ChatMessage>
    <!-- <Message
      v-show="showTypingIndicator !== ''"
      :message="{author: showTypingIndicator, type: 'typing'}"
      :user="getUser()"
      :colors="colors"
      :message-styling="messageStyling"
      :show-confirmation-deletion="showConfirmationDeletion"
      :confirmation-deletion-message="confirmationDeletionMessage"
    /> -->
  </div>
</template>

<script setup lang="ts">
import {ref,reactive,computed,getCurrentInstance} from 'vue'

import ChatMessage from 'src/components/ChatMessage.vue'
// import chatIcon from './assets/chat-icon.svg'


interface Props {
    messages: Array<any>,
    showTypingIndicator:boolean,
    colors: Object,
    alwaysScrollToBottom:boolean,
    messageStyling: boolean,
    showConfirmationDeletion: boolean
    confirmationDeletionMessage: string
}

const props = defineProps<Props>()
const initialScrollTop = ref(-1)
const chatIcon =  ""
// $refs
const scrollList = ref<HTMLDivElement>()
const colors = ref({
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
  })

function getUser(){
  return "test"
}

function _scrollDown() {
      if (scrollList.value){
        scrollList.value.scrollTop = scrollList.value.scrollHeight
        initialScrollTop.value==-1 ? initialScrollTop.value = scrollList.value.scrollTop : '';
      }
}
function handleScroll(e:any) {
      // if (e.target.scrollTop === 0) {
      //   this.$emit('scrollToTop')
      // }
}
function shouldScrollToBottom() {
      if (scrollList.value){
          const scrollTop = scrollList.value.scrollTop
          const scrollable = scrollTop > scrollList.value.scrollHeight - 600
          return props.alwaysScrollToBottom || scrollable
      }
}
// function profile(author) {
//       const profile = this.participants.find((profile) => profile.id === author)

//       // A profile may not be found for system messages or messages by 'me'
//       return profile || {imageUrl: '', name: ''}
// }
function watchScrollList() {
        let resizeObserver = new ResizeObserver(() => {
          if (scrollList.value){
                      const value = scrollList.value.scrollHeight - scrollList.value.scrollTop
          if (
            initialScrollTop.value === scrollList.value.scrollTop ||
            (scrollList.value.scrollTop > initialScrollTop.value &&
              value > scrollList.value.offsetHeight)
          ) {
            _scrollDown()
          }
          }
          }
        )
        if (scrollList.value){
          resizeObserver.observe(scrollList.value)
        }
}


</script>

<style scoped>
.sc-message-list {
  height: 80%;
  overflow-y: auto;
  background-size: 100%;
  padding: 40px 0px;
}
</style>

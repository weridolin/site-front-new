<template>
  <div class="sc-header" :style="{background: colors.header.bg, color: colors.header.text}">
    <el-badge is-dot class="status" :type="status">
      <el-avatar shape="circle" size="default" :src="getUserAvatar()" />
    </el-badge>

    <!-- 多人聊天头像列表 -->
    <!-- <div v-if="!disableUserListToggle" class="sc-header--title enabled" @click="toggleUserList">
      {{ title }}
    </div>
    <div v-else class="sc-header--title">{{ title }}</div> -->

    <div v-if="showCloseButton" class="sc-header--close-button" @click="$emit('close')">
      <img :src="closeImageUrl" alt="default" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref,reactive,watch} from "vue"
import {useAuthStore} from 'src/store/user'
import titleImageUrl from 'src/assets/chatIcons/robot.png'
import closeImageUrl from 'src/assets/chatIcons/close-icon-big.png'

const {isLogin,userInfo} = useAuthStore()
const title= ref("离线机器人")
// const inUserList =ref()
const showCloseButton = ref(true)

// const disableUserListToggle = ref(true)
const status =ref("")

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


function  toggleUserList() {
      // this.inUserList = !this.inUserList
      // this.$emit('userList', this.inUserList)
    }

function getUserAvatar(){
  if(isLogin.value){
    return "src/assets/chatIcons/mushroom-from-Mario.png"
  }
  return titleImageUrl
}

watch(isLogin, (newValue, oldValue) => {
    console.log('watch isLogin 已触发', newValue)
    !newValue?title.value="离线机器人":title.value=userInfo?.profile.user.username as string
    // !newValue?titleImageUrl.value="src\assets\chatIcons\robot.png":getUserAvatar()
    !newValue?status.value="danger":status.value="success"

})



</script>




<style scoped>
.sc-header {
  min-height: 75px;
  border-top-left-radius: 9px;
  border-top-right-radius: 9px;
  padding: 10px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  position: relative;
  box-sizing: border-box;
  display: flex;
}

.sc-header--img {
  border-radius: 50%;
  align-self: center;
  padding: 10px;
}

.sc-header--title {
  align-self: center;
  padding: 10px;
  flex: 1;
  user-select: none;
  font-size: 20px;
}

.sc-header--title.enabled {
  cursor: pointer;
  border-radius: 5px;
}

.sc-header--title.enabled:hover {
  box-shadow: 0px 2px 5px rgba(0.2, 0.2, 0.5, 0.1);
}

.sc-header--close-button {
  width: 40px;
  align-self: center;
  height: 40px;
  margin-right: 10px;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: 5px;
  margin-left: auto;
}

.sc-header--close-button:hover {
  box-shadow: 0px 2px 5px rgba(0.2, 0.2, 0.5, 0.1);
}

.sc-header--close-button img {
  width: 100%;
  height: 100%;
  padding: 13px;
  box-sizing: border-box;
}

@media (max-width: 450px) {
  .sc-header {
    border-radius: 0px;
  }
}
</style>

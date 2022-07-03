<!--
 * @Description: 
 * @email: 359066432@qq.com
 * @Author: lhj
 * @software: vscode
 * @Date: 2021-10-02 16:28:06
 * @platform: windows 10
 * @LastEditors: lhj
 * @LastEditTime: 2021-10-05 15:50:33
-->
<template>
  <div class="messa">
    <add-message @submit="getMessList" :list="list"></add-message>
    <div class="mess-bg">
      <!--List传给message-list组件-->
      <message-list :list="list" @submit="getMessList" ></message-list>
      <p class="next">
        <span v-loading="loading" element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="#f8f8f8" @click="next">
            <i class="next-icon" :class="current_page==last_page?'el-icon-arrow-up':'el-icon-arrow-down'"></i>
          {{ current_page == last_page ? '没有更多了！快去留言吧！^o^' : '点击查看更多' }}
      </span>
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
  import AddMessage from 'src/components/AddMessage.vue'
  import MessageList from 'src/components/MessageList.vue'
  import { reactive, ref,onBeforeMount } from 'vue';

  import {
      list,
      current_page,
      last_page,
      loading,
      getMessList,
      next,
  } from "src/pages/Message"


  const initMessList = async () => {
    await getMessList()
    console.log("获取评论列表",list.value)
    return list.value
  }




  initMessList() //create时获取 getMessage

  // onBeforeMount(async () => {
  //     await getMessList() //create时获取 getMessage
  //   })
  




</script>


<style lang="stylus" scoped>
.messa
  background-color #f8f8f8
  padding-bottom: 15px

  .next
    text-align center
    color: var(--main-5)
    transition all .3s

    &:hover
      color: var(--main-6)

    span
      cursor pointer

      .next-icon
        animation: next .6s linear infinite alternate;

@keyframes next {
  0% {
    transform translateY(3px)
  }
  100% {
    transform translateY(0px)
  }
}
</style>

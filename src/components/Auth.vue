<template>
  <el-affix :offset="100"  position="bottom">
    <el-button type="primary" color="#626aef" @click="showAuthMenu" round>{{affixContent}}<el-icon><User /></el-icon></el-button>
  </el-affix>
  <el-dropdown ref="authMenu" trigger="contextmenu"  placement="top" style="margin-right: 30px">
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>登录</el-dropdown-item>
        <el-dropdown-item>登出</el-dropdown-item>
        <el-dropdown-item>联系我{{isOnline?"(在线)":"(不在线)"}}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>

</template>


<script setup lang="ts">
  import { ref } from 'vue'
  const authMenu = ref()
  const isOnline = ref(false)

  const affixContent = ref<string>("未登录")
  
  function showAuthMenu() {
    authMenu.value.handleOpen()
  }

</script>

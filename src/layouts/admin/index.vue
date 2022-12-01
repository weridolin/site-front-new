<template>
  <div class="common-layout">
    <el-container>
      <el-aside :style="{ width: SideBarState.collapse ? '5%' : '15%' }">
        <SideBar></SideBar>
      </el-aside>
      <el-container>
        <el-header class="admin-header"><NavBar /></el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
  
  <script lang="ts" setup>
import SideBar from "src/components/admin/Sidebar/index.vue";
import NavBar from "src/components/admin/NavBar/Index.vue";
import { SideBarState } from "src/components/admin/models";
</script>
  <style lang="scss" scoped>
.admin-header {
  padding: 0;
}
</style>
  
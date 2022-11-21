<template>
  <div class="common-layout">
    <el-container>
      <el-aside :style="{'width':SideBarState.collapse?'5%':'15%'}">
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
import NavBar from 'src/components/admin/NavBar/Index.vue'
import {SideBarState} from 'src/components/admin/models'

import MenuManager from 'src/pages/admin/MenuManager.vue'
import ModelOpManager from 'src/pages/admin/ModelOpManager.vue'
import PermissionManager from 'src/pages/admin/PermissionManager.vue'
import RoleManager from 'src/pages/admin/RoleManager.vue'
import UserManager from 'src/pages/admin/UserManager.vue'
import UserProfile from 'src/pages/admin/UserProfile.vue'
// import { useRouter } from "vue-router";


// let router = useRouter();
// watch(
//   () => router.currentRoute.value,
//   (to) => {
//     console.log("路由变化了",to);
//   }
// );
</script>
<style lang="scss" scoped>
.admin-header{
  padding: 0;
}
</style>

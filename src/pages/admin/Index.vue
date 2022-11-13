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
import { defineProps,ref,watch} from "vue";
import {SideBarState} from 'src/components/admin/models'
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

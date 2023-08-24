<template>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
        :collapse="SideBarState.collapse"
      >
      <SidebarItem
          v-for="menu in getDynamicalRoutes()"
          :key="menu.id"
          :menu="menu"
          :base-path="menu.url"
        />
      </el-menu>
    </el-scrollbar>
</template>

<script lang="ts" setup>
import {useAuthStore} from 'src/store/user'
import SidebarItem from 'src/components/admin/Sidebar/SiteBarItem.vue'
import {SideBarState} from 'src/components/admin/models'

function getDynamicalRoutes(){
  console.log("当前路由 -> ",useAuthStore().dynamicalRoutes)
  return useAuthStore().dynamicalRoutes
}

  // get activeMenu() {
  //   const route = this.$route
  //   const { meta, path } = route
  //   // if set path, the sidebar will highlight the path you set
  //   if (meta.activeMenu) {
  //     return meta.activeMenu
  //   }
  //   return path
  // }

// function isCollapse() {
//     return !this.sidebar.opened
//   }

</script>

<style lang="scss">
.sidebar-container {
  // reset element-ui css
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
  }

  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }

  .el-scrollbar__view {
    height: 100%
  }

  .el-scrollbar__bar {
    &.is-vertical {
      right: 0px;
    }

    &.is-horizontal {
      display: none;
    }
  }
}
</style>


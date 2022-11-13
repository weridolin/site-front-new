<template>
    <el-sub-menu 
      v-if="props.menu.children.length!=0"
      :index=props.menu.id.toString()>
      <template #title>
        <el-icon><location /></el-icon>
        <span>{{props.menu.menu_name}}</span>
      </template>
        <SidebarItem
          v-for="child in props.menu.children"
          :menu="child"
          :key="child.id"
          :index=" child.id.toString()">
        </SidebarItem>
    </el-sub-menu>
    <SidebarItemLink
        v-else
        :to="props.menu.menu_url"
      >
        <el-menu-item
          :index="props.menu.id.toString()"
        >

          
          <el-icon>
            <component :class="props.menu.menu_icon" :is="props.menu.menu_icon"></component>
          </el-icon>
          <span
          >{{props.menu.menu_name}}</span>
        </el-menu-item>
    </SidebarItemLink>
</template>

<script lang="ts" setup>
import { ref, defineProps } from "vue";
import { useAuthStore } from "src/store/user";
import type { Menu } from "src/services/apis/auth";
import SidebarItem from "src/components/admin/Sidebar/SiteBarItem.vue";
import SidebarItemLink from 'src/components/admin/Sidebar/SidebarItemLink.vue'

import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";

interface Props {
  menu: Menu;
}


// 传参必须为 interface 类型
const props = defineProps<Props>();

</script>
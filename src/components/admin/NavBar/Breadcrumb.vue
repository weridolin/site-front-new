<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item.path">
        <span
          v-if="
            item.redirect === 'noredirect' || index === breadcrumbs.length - 1
          "
          class="no-redirect"
          >{{item.meta.title }}
          </span>
        <a v-else 
          @click.prevent="handleLink(item)">
          {{item.meta.title}}
        </a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { compile } from 'path-to-regexp'
// import { pa } from "element-plus/es/locale";

const breadcrumbs = ref();

let router = useRouter();
// 监听当前路由变化
watch(
  () => router.currentRoute.value,
  (to) => {
    console.log("路由变化了",to);
    let matched = to.matched.filter(
      (item) => item.meta && item.meta.title
    );
    const first = matched[0];
    breadcrumbs.value = matched.filter((item) => {
      return item.meta && item.meta.title 
    });
  }
);


function pathCompile(path: string) {
    // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
    const params = router.currentRoute.value.params
    const toPath = compile(path)
    return toPath(params)
  }

function handleLink(item: any) {
    const { redirect, path } = item
    console.log("breadcrumbs clicked",redirect,path)
    if (redirect) {
      router.push(redirect).catch(err => {
        console.warn(err)
      })
      return
    }
    router.push(pathCompile(path)).catch(err => {
      console.warn(err)
    })
  }


</script>
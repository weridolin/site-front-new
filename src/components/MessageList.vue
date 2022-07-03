<template>
  <div class="container mess-list">
    <h1 class="mess-title">
      <i class="el-icon-ice-cream-round"></i>
    </h1>
    <div class="mess-group">
      <div class = "mess-content">
      <el-row>
        <el-col :md="12" :sm="24">
          <MessCardBlog
            class="MessListLeft"
            @submit="getMess"
            :list="MessListLeft"
            :card="left"
          ></MessCardBlog>
        </el-col>
        <el-col v-if="!isShow" :md="12" :sm="24">
          <MessCardBlog
            class="MessListRight"
            @submit="getMess"
            :list="MessListRight"
            :card="right"
          ></MessCardBlog>
        </el-col>
      </el-row>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import MessCardBlog from "src/components/MessCardBlog.vue";
  import { computed } from 'vue'
  import {
      // MessListLeft,
      // MessListRight,
      isShow,
      left,
      right,
      getMess,
  }
  from "src/components/MessageList"
  import type {
      SiteCommentResponse
  } from 'src/services/apis/home'

  interface Props {
    list:SiteCommentResponse[]
  }

  const propComments = defineProps<Props>()
  console.log(">>>> message list get list",propComments.list)

  const MessListLeft =  computed(() =>  {
          if (isShow) {
            return propComments.list;
          }
          console.log(propComments.list);
          return propComments.list.filter(function (item) {
              return item.id % 2 != 0;
          });
          })

  const MessListRight =  computed(() =>  {
              if (isShow) {
                  return propComments.list;
              }
              console.log(propComments.list);
              return propComments.list.filter(function (item) {
                      return item.id % 2 == 0;
              });
          })

</script>


<style lang="stylus" scoped>


.mess-list {
  &:hover {
    .mess-title {
      color: #5adcce;
    }
  }

  .mess-title {
    margin: 0;
    font-size: 25px;
    color: #ccc;
  }

  .mess-group {
    position: relative;
    padding: 10px 0;
    background: #eaf1f51f;
    background-image :url('src/assets/commentBg.jpg');
    // opacity :0.1;


  }
  .mess-group::before{
      z-index:-1;
      position: absolute;
      top: 0;
      left: 50%;
      margin-left: -4px;
      content: '';
      height: 100%;
      width: 8px;
      // background: #fff;
      // background-image :url("http://pic2.bbzhi.com/huihuabizhi/jianbichengshifengguang/jianbichengshifengguang_65818_9.jpg");
      // opacity :0.1;
      border-radius: 8px;
  }
}

h1:after{
    content: '       ';
    display: block;
    margin: 0.4em auto 0;
    width: 200px;
    height: 2px;
    border-bottom: 11px dashed var(--main-6);
}

@media (max-width: 992px) {
  .mess-group, .mess-item, .mess-info, .mess-loging {
    &:before {
      display: none;
    }
  }

  .mess-group {
    &:after {
      display: none;
    }
  }
}
</style>

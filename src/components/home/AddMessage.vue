<template>
  <div class="message barrages-drop">
    <div style="width: 100%; overflow: hidden">
      <!--          将浏览以弹幕形式弹出  -->
      <!-- <vueBaberrage
        style="width: 100%; height: 100%"
        :isShow="barrageIsShow"
        :barrageList="testList.value"
        :maxWordCount="30"
        :loop="barrageLoop"
      >
      </vueBaberrage> -->
    </div>
    <div class="mess-body container">
      <h1 class="mess-title blog-animation">
        <i class="el-icon-chat-line-square"></i>畅所欲言！
      </h1>
      <new-comment class="blog-animation comment"></new-comment>
    </div>
    <span @click="next('#next')" class="screen-next iconfont"> &#xe623; </span>
  </div>
</template>


<script setup lang="ts">
// import { vueBaberrage } from "vue-baberrage";
import NewComment from "src/components/NewComment.vue";
import {
  barrageIsShow,
  barrageLoop,
  messList,
  propList,
  next,
} from "src/components/AddMessage";

import type { SiteComment } from "src/services/apis/home";

interface Props {
  list: SiteComment[];
}

// 传参必须为 interface 类型
const props = defineProps<Props>();
propList.value = props.list;

// const testList = ref({
//   id:1,
//   avatar:"string",
//   msg:"弹幕升级中。。。",
//   barrageStyle:"blue"
// })
</script>
<style scoped>
h1,
.h1 {
  text-align: center;
  padding-bottom: 0.3em;
  line-height: 1.2;
}
</style>

<style lang="stylus">
.message {
  height: 100vh;
  min-height: 500px;
  position: relative;
  padding: 50px 10px;
  box-sizing: border-box;
  background: url('src/assets/message-bg1.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  .mess-body {
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;

    &:hover {
      .mess-title {
        color: #5adcce;
      }
    }

    .mess-title {
      margin: 30px;
      font-size: 60px;
      color: #fff;
    }

    .blog-animation {
      margin: 10px;
    }

    .comment {
      background: rgba(255, 255, 255, 0.2);
      transition: all 0.5s;

      &:hover {
        background: rgba(255, 255, 255, 0.8);
      }
    }
  }
}

@media (max-width: 850px) {
  .message {
    .mess-title {
      font-size: 35px !important;
    }

    .mess-body {
      position: absolute;
      top: 10%;
      left: 50%;
      transform: translateX(-50%);
      width: 80%;

      &:hover {
        .mess-title {
          color: #5adcce;
        }
      }

      .mess-title {
        margin: 30px;
        font-size: 60px;
        color: #fff;
      }

      .blog-animation {
        margin: 10px;
      }

      .comment {
        background: rgba(255, 255, 255, 0.2);
        transition: all 0.5s;

        &:hover {
          background: rgba(255, 255, 255, 0.8);
        }
      }
    }
  }
}

.barrages-drop >>> {
  .baberrage-item {
    padding: 0;
    padding-right: 20px;

    .normal {
      background-color: transparent;
    }
  }
}

.barrages-drop >>> {
  .blue {
    border-radius: 100px;
    background: rgba(230, 255, 117, 0.7);
    color: #fff;
  }

  .green {
    border-radius: 100px;
    background: rgba(117, 255, 204, 0.7);
    color: #fff;
  }

  .red {
    border-radius: 100px;
    background: rgba(230, 143, 187, 0.7);
    color: #fff;
  }

  .yellow {
    border-radius: 100px;
    background: rgba(223, 200, 149, 0.7);
    color: #fff;
  }
}
</style>

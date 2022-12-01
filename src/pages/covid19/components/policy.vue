<template>
  <div
    class="left_boottom_wrap beautify-scroll-def"
    :class="{ 'overflow-y-auto': true }"
  >
    <component
      :is="comName"
      :list="state.list"
      v-model="state.scroll"
      :singleHeight=0
			:openTouch=true
      :step=1
      :limitScrollNum=1
      :hover=true
      :singleWaitTime="state.defaultOption.singleWaitTime"
      :wheel="state.defaultOption.wheel"
    >
      <ul class="left_boottom">
        <li class="left_boottom_item" v-for="(item, i) in state.list" :key="i">
          <span class="orderNum doudong">{{ i + 1 }}</span>
          <div class="inner_right">
            <div class="dibu"></div>
            <div class="flex">
              <div class="info">
                <span class="labels">消息源:</span>
                <span class="text-content zhuyao doudong wangguan">
                  {{ item.src }}</span
                >
              </div>
              <div class="info">
                <span class="labels">时间:</span>
                <span class="text-content" style="font-size: 12px">
                  {{ item.date }}</span
                >
              </div>
            </div>

            <span
              class="types doudong"
              :class="{
                typeRed: item.onlineState == 0,
                typeGreen: item.onlineState == 1,
              }"
              >{{ item.loc }}</span
            >

            <div class="info addresswrap">
              <!-- <span class="labels">地址：</span> -->
              <span class="text-content ciyao" style="font-size: 12px">
                新闻标题sssssssss</span
              >
            </div>
          </div>
        </li>
      </ul>
    </component>
  </div>
</template>


<script setup lang="ts">
// import { currentGET } from "@/api";
import SeamlessScroll from "src/components/covid19/seamless-scroll";
import { computed, onMounted, reactive } from "vue";

const state = reactive<any>({
  list: [],
  defaultOption: {
    // ...defaultOption.value,
    singleHeight: 256,
    limitScrollNum: 4,
  },
  scroll: true,
});

interface newItem {
  title: string; //新闻标题
  type: string; // 新闻类型
  url: string; // 新闻链接
  loc: string; // 所属地
  date: string; //日期
  src: string; //来源
}

const getData = () => {
  state.list = [
    {
      title: "string",
      type: "string",
      url: "string",
      loc: "string",
      date: "string",
      src: "string",
    },
    {
      title: "string",
      type: "string",
      url: "string",
      loc: "string",
      date: "string",
      src: "string",
    },
    {
      title: "string",
      type: "string",
      url: "string",
      loc: "string",
      date: "string",
      src: "string",
    },
    {
      title: "string",
      type: "string",
      url: "string",
      loc: "string",
      date: "string",
      src: "string",
    },
    {
      title: "string",
      type: "string",
      url: "string",
      loc: "string",
      date: "string",
      src: "string",
    },
    {
      title: "string",
      type: "string",
      url: "string",
      loc: "string",
      date: "string",
      src: "string",
    },
    {
      title: "string",
      type: "string",
      url: "string",
      loc: "string",
      date: "string",
      src: "string",
    },
    {
      title: "string",
      type: "string",
      url: "string",
      loc: "string",
      date: "string",
      src: "string",
    },
  ];
  // currentGET("leftBottom", { limitNum: 20 }).then((res) => {
  //   console.log("设备提醒", res);
  //   if (res.success) {
  //     state.list = res.data.list;
  //   } else {
  //     window.$message({
  //       text: res.msg,
  //       type: "warning",
  //     });
  //   }
  // });
};
const addressHandle = (item: any) => {
  let name = item.provinceName;
  if (item.cityName) {
    name += "/" + item.cityName;
    if (item.countyName) {
      name += "/" + item.countyName;
    }
  }
  return name;
};
const comName = computed(() => {
  // if (indexConfig.value.leftBottomSwiper) {
  //   return SeamlessScroll;
  // } else {
  //   return EmptyCom;
  // }
  return SeamlessScroll;
});
onMounted(() => {
  getData();
});
</script>

<style scoped lang="scss">
.left_boottom_wrap {
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.doudong {
  overflow: hidden;
  backface-visibility: hidden;
}

.overflow-y-auto {
  overflow-y: auto;
}

.left_boottom {
  width: 100%;
  height: 100%;

  .left_boottom_item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    font-size: 14px;
    margin: 10px 0;
    .orderNum {
      margin: 0 16px 0 -20px;
    }

    .info {
      margin-right: 10px;
      display: flex;
      align-items: center;
      color: #fff;

      .labels {
        flex-shrink: 0;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.6);
      }

      .zhuyao {
        // color: $primary-color;
        font-size: 15px;
      }

      .ciyao {
        color: rgba(255, 255, 255, 0.8);
      }

      .warning {
        color: #e6a23c;
        font-size: 15px;
      }
    }

    .inner_right {
      position: relative;
      height: 100%;
      width: 350px;
      flex-shrink: 0;
      line-height: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      .dibu {
        position: absolute;
        height: 2px;
        width: 100%;
        background-image: url("@/assets/img/zuo_xuxian.png");
        bottom: -10px;
        left: -2%;
        background-size: cover;
      }
      .addresswrap {
        width: 100%;
        display: flex;
        margin-top: 8px;
      }
    }

    .wangguan {
      color: #1890ff;
      font-weight: 900;
      font-size: 15px;
      width: 80px;
      flex-shrink: 0;
    }

    .time {
      font-size: 12px;
      // color: rgba(211, 210, 210,.8);
      color: #fff;
    }

    .address {
      font-size: 12px;
      cursor: pointer;
      // @include text-overflow(1);
    }

    .types {
      width: 30px;
      flex-shrink: 0;
    }

    .typeRed {
      color: #fc1a1a;
    }

    .typeGreen {
      color: #29fc29;
    }
  }
}
</style>

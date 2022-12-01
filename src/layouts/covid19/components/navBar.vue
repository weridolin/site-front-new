<template>
  <div class="nav-wrapper">
    <div class="bar-title" >大数据分析系统</div>
    <div class="time">{{ date }} {{ time }}</div>
    <!-- <div class="mapChoose" v-if="parentInfo.length > 1 && isHome">
      <span v-for="(item, index) in parentInfo" :key="item.code">
        <span class="title" @click="chooseArea(item, index)">{{
          item.cityName == "全国" ? "中国" : item.cityName
        }}</span>
        <span class="icon" v-show="index + 1 != parentInfo.length">></span>
      </span>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, onMounted, ref } from "vue";

const date = ref("1970-01-01");
const time = ref("00:00:00");
// parentInfo: null,
// chooseArea: null,
// toHome: null,
// isHome: null,

onMounted(() => {
  setInterval(() => {
    time.value = getTime();
    date.value = getDate();
  }, 1000);

  // dataCount. = this.getDate();
  // this.time = ref(this.getTime());
  // this.router = useRouter();
  // this.router = useRoute();
});

/*********** METHOD **********/

const addZero = (item: string) => {
  return parseInt(item) > 9 ? item : "0" + item;
};

const getDate = () => {
  const date = new Date();
  return (
    date.getFullYear() +
    "-" +
    addZero((date.getMonth() + 1).toString()) +
    "-" +
    addZero(date.getDate().toString())
  );
};

const getTime = () => {
  const date = new Date();
  return (
    addZero(date.getHours().toString()) +
    ":" +
    addZero(date.getMinutes().toString()) +
    ":" +
    addZero(date.getSeconds().toString())
  );
};
</script>



<style lang="scss" scoped>
.nav-wrapper {
  height: 65px;
  line-height: 50px;
  width: 100%;
  background: url("src/assets/covid19/nav.png") no-repeat;
  background-size: 100% 100%;
  text-align: center;
  position: relative;
  color: #b3efff;

  .bar-title {
    font-size: 1.23rem;
    font-family: "黑体";
    cursor: pointer;
  }

  .time {
    position: absolute;
    right: 8%;
    top: 50%;
    transform: translateY(-35%);
    font-family: "Time Number";
    font-weight: bold;
    font-size: 1.22rem;
  }
  .mapChoose {
    position: absolute;
    left: 10px;
    bottom: -5px;
    color: #eee;

    .title {
      padding: 4px;
      border-top: 1px solid rgba(147, 235, 248, 0.8);
      border-bottom: 1px solid rgba(147, 235, 248, 0.8);
      cursor: pointer;
      font-size: 14px;
    }

    .icon {
      font-family: "simsun";
      font-size: 25px;
      margin: 0 11px;
    }
  }
}
</style>

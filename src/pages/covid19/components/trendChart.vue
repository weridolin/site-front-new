<template>
  <div class="data-picker">
    <el-date-picker
      v-model="timeRange"
      type="daterange"
      range-separator="至"
      placeholder="Pick a day"
      size="small"
      class="data-picker"
			@change="changeTimeRange"
    />
  </div>

  <div class="chart-wrapper" id="trendChat"></div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted, onBeforeUnmount, ref } from "vue";

function getInitTimeRange():[Date, Date]{
	let end:Date = new Date()
	let start = new Date()
	start.setDate(start.getDate()-15)
	return [start,end]
}

const changeTimeRange=()=>{
	console.log(">>>change  time",timeRange)
}

const timeRange = ref<[Date, Date]>(getInitTimeRange());
const option = {
  color: ["#80FFA5", "#00DDFF", "#37A2FF"],
  // title: {
  //   text: "Gradient Stacked Area Chart",
  // },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      label: {
        backgroundColor: "#6a7985",
      },
    },
  },
  legend: {
    show: false,
    data: ["Line 1", "Line 2", "Line 3"],
  },
  toolbox: {
    show: false,
    feature: {
      saveAsImage: {},
    },
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: [
    {
      show: false,
      type: "category",
      boundaryGap: false,
      data: [
        "2022-11-26",
        "2022-11-25",
        "2022-11-24",
        "2022-11-23",
        "2022-11-22",
        "2022-11-21",
        "2022-11-20",
      ],
    },
  ],
  yAxis: [
    {
      type: "value",
      // max : 200,
      min: 0,
      splitNumber: 3,
      // interval:500
    },
  ],
  series: [
    {
      name: "确诊人数",
      type: "line",
      stack: "Total",
      smooth: true,
      lineStyle: {
        width: 0,
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "rgb(128, 255, 165)",
          },
          {
            offset: 1,
            color: "rgb(1, 191, 236)",
          },
        ]),
      },
      emphasis: {
        focus: "series",
      },
      data: [140, 232, 101, 264, 90, 340, 250],
    },
    {
      name: "治愈人数",
      type: "line",
      stack: "Total",
      smooth: true,
      lineStyle: {
        width: 0,
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "rgb(0, 221, 255)",
          },
          {
            offset: 1,
            color: "rgb(77, 119, 255)",
          },
        ]),
      },
      emphasis: {
        focus: "series",
      },
      data: [120, 282, 111, 234, 220, 340, 310],
    },
    {
      name: "死亡人数",
      type: "line",
      stack: "Total",
      smooth: true,
      lineStyle: {
        width: 0,
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "rgb(55, 162, 255)",
          },
          {
            offset: 1,
            color: "rgb(116, 21, 219)",
          },
        ]),
      },
      emphasis: {
        focus: "series",
      },
      data: [320, 132, 201, 334, 190, 130, 220],
    },
  ],
};

let trendChart: any = null;
function resizeHandler() {
  if (trendChart) {
    trendChart.resize(); //不用搞成响应式
  }
}

function initEcharts() {
  if (document.getElementById("trendChat")) {
    trendChart = echarts.init(
      document.getElementById("trendChat") as HTMLElement
    );
    trendChart.setOption(option);
  }
}

onMounted(() => {
  // getChartData();
  window.addEventListener("resize", resizeHandler);
  //模拟接口，获取echarts数据
  initEcharts();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeHandler);
});
</script>

<style lang="scss" scoped>
.data-picker {
  margin-left: 10%;
  margin-top: 5%;
  // float:right;
  z-index: 2;

}
.chart-wrapper {
  z-index: 0;
  // margin-top: %;
  margin-bottom: 2%;
  width: 95%;
  height: 80%;
}

.el-input__wrapper {
  background-color: rgba(12, 4, 4, 0);
}

::v-deep .el-input__wrapper{
  background-color: rgba(12, 4, 4, 0) !important;
  // transition: all 0.3s;
}
</style>


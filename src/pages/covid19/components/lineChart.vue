<template>
  <div class="chart-wrapper" id="lineChart"></div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted, onBeforeUnmount } from "vue";

let myChart: any = null;

function resizeHandler() {
  // console.log(">>>Resize", myChart);
  if (myChart) {
    myChart.resize(); //不用搞成响应式
  }
}
function initEcharts() {
  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: ["感染人数", "治愈人数", "死亡人数"],
      textStyle:{
        color:"rgb(255,255,255,0.8)"
      }
    },
    toolbox: {
      show: false, //右边工具栏
      orient: "vertical",
      left: "right",
      top: "center",
      feature: {
        //自定义按钮
        myTool1: {
          show: true,
          title: "自定义扩展方法1",
          icon: "path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891",
          onclick: function () {
            alert("myToolHandler1");
          },
        },
        // mark: { show: true },
        // dataView: { show: true, readOnly: false },
        // magicType: { show: true, type: ['line', 'bar', 'stack'] },
        // restore: { show: true },
        // saveAsImage: { show: true }
      },
    },
    xAxis: [
      {
        type: "category",
        axisTick: { show: false, alignWithLabel:true },
        data: ["2012", "2013", "2014", "2015", "2016"],
        axisLabel:{
          color:"rgb(255,255,255,0.8)"
        }
      },
    ],
    yAxis: [
      {
        type: "value",
        axisLabel:{
          color:"rgb(255,255,255,0.8)"
        }
      },
    ],
    series: [
      {
        name: "感染人数",
        type: "bar",
        barGap: 0,
        emphasis: {
          focus: "series",
          show:true
        },
        data: [320, 332, 301, 334, 390],
      },
      {
        name: "治愈人数",
        type: "bar",
        emphasis: {
          focus: "series",
          show:true
        },
        data: [220, 182, 191, 234, 290],
      },
      {
        name: "死亡人数",
        type: "bar",
        emphasis: {
          focus: "series",
          show:true
        },
        data: [150, 232, 201, 154, 190],
      },
    ],
  };

  if (document.getElementById("lineChart")) {
    myChart = echarts.init(document.getElementById("lineChart") as HTMLElement);
    myChart.setOption(option);
  }
  // myChart.value = echarts.init(document.getElementById("lineChart"));
  // myChart.value.setOption(option);
  // myChart.off("click");
  // myChart.getZr().off("click");
  // myChart.getZr().on("click", (params) => {
  //   const pointInPixel = [params.offsetX, params.offsetY];
  //   if (myChart.containPixel("grid", pointInPixel) || data.length === 0) {
  //     routerChange("/more");
  //   }
  // });
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
.chart-wrapper {
  width: 95%;
  height: 100%;
}
</style>
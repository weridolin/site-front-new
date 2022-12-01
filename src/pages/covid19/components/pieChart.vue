<template>
  <div
    class="chart-wrapper"
    :id="props.chatID"
    :style="{ height: `${props.height}%`, width: `${props.width}%` }"
  ></div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted, onBeforeUnmount } from "vue";
const props = defineProps({
  width: Number,
  height: Number,
  chatID: String,
  title: String,
  showLegend: Boolean,
});
const option = {
  top:"5%",
  tooltip: {
    trigger: "item",
  },
  legend: {
    show: props.showLegend,
    top: "-1%",
    orient: 'horizontal',
    left: 'left',
    icon: "circle",
    textStyle:{
      color:"white"
    }
  },
  title: {
    text: props.title,
    top: "18%",
    x: "center",
    // y: "center",
    // // top: "280",
    // // 主标题样式
    textStyle: {
      fontSize: "15",
      color: "white",
    },
  },

  series: [
    {
      name: props.title,
      type: "pie",
      radius: ["70%", "90%"],
      // center:["50%","60%"],
      avoidLabelOverlap: false,
      // itemStyle: {
      //   borderRadius: 10,
      //   borderColor: "#fff",
      //   borderWidth: 2,
      // },
      // label: {
      //   normal: {
      //     show: true,
      //     formatter: "{value}",
      //     position: "center",
      //     lineHight: 30,
      //   },
      // },

      // emphasis: {
      //   label: {
      //     show: true,
      //     fontSize: '40',
      //     fontWeight: 'bold'
      //   }
      // },
      labelLine: {
        show: false,
      },

      data: [
        {
          value: 1048,
          name: "新增人数",
          itemStyle: {
            color:"#ff7070",
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
            shadowBlur: 200,
            shadowColor: "#FFA07A",
          },
          label: {
            normal: {
              show: true,
              formatter: "{c}",
              position: "center",
              lineHight: 30,
            },
          },
        },
        {
          value: 735,
          name: "累计总人数",
          itemStyle: {
            color: "#5470c6",
            borderWidth: 2,
            borderRadius: 10,
            shadowBlur: 200,
            shadowColor: "#FFA07A",
          },
        },
      ],
    },
  ],
};

let pieChart: any = null;
function resizeHandler() {
  if (pieChart) {
    pieChart.resize(); //不用搞成响应式
  }
}

function initEcharts() {
  if (props.chatID && document.getElementById(props.chatID)) {
    pieChart = echarts.init(
      document.getElementById(props.chatID) as HTMLElement
    );
    pieChart.setOption(option);
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
.chart-wrapper {
  margin-top: 2%;
  width: 95%;
  height: 100%;
}
</style>
<template>
  <div class="home-container">
    <el-container class="covid-content">
      <el-aside width="20%" class="left-content" style="overflow: hidden">
        <div class="echartList">
          <div class="chart-item">
            <boxContainer
              :box-title="'各城市确诊排名'"
              :titlePos="'center'"
              :color="'#b3efff'"
              :use-box="true"
            >
              <lineChart></lineChart>
            </boxContainer>
          </div>
          <div class="chart-item">
            <boxContainer
              :box-title="'全国累计情况统计'"
              :titlePos="'center'"
              :color="'#b3efff'"
              :use-box="true"
            >
              <div class="pie-group">
                <pieChart
                  :title="'累计确诊'"
                  :width="30"
                  :height="100"
                  :chat-i-d="'pie1'"
                  class="allInfect"
                ></pieChart>
                <pieChart
                  :title="'累计死亡'"
                  :width="30"
                  :height="100"
                  :chat-i-d="'pie2'"
                  class="allDead"
                ></pieChart>
                <pieChart
                  :show-legend="true"
                  :title="'累计治愈'"
                  :width="30"
                  :height="100"
                  :chat-i-d="'pie3'"
                  class="allCured"
                ></pieChart>
              </div>
            </boxContainer>
          </div>
          <div class="chart-item">
            <boxContainer :box-title="'累计增长趋势'" :use-box="true">
              <trendChart></trendChart>
            </boxContainer>
          </div>
        </div>
      </el-aside>
      <el-container>
        <el-main>
          <div class="main-content" style="width: 100%; height: 80%">
            <div style="width: 100%; height: 95%" class="map">
              <scatterMap />
            </div>
            <div class="scroll-policy" style="overflow: hidden; height: 95%">
              <boxContainer :box-title="'最新防疫政策'" :use-box="false">
                <policy style="overflow: hidden"></policy>
              </boxContainer>
            </div>
          </div>
          <div class="scroll-news" style="overflow: hidden; height: 20%">
            <boxContainer
              :box-title="'全国防疫新闻'"
              :use-box="false"
              class="newboxContainer"
            >
              <news2 style="overflow: hidden" class="news"></news2>
            </boxContainer>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script lang="ts"  setup>
import scatterMap from "src/pages/covid19/components/scatterMap.vue";
import boxContainer from "src/components/covid19/boxContainer/index.vue";
import lineChart from "src/pages/covid19/components/lineChart.vue";
import pieChart from "src/pages/covid19/components/pieChart.vue";
import trendChart from "src/pages/covid19/components/trendChart.vue";
import policy from "src/pages/covid19/components/policy.vue";
import news2 from "src/pages/covid19/components/news2.vue";
</script>



<style lang="scss" scoped>
.home-container {
  width: 100%;
  height: 100%;
  position: relative;

  .echartList {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;

    .chart-item {
      height: 32.1%;
      width: 100%;
    }
  }
}
.map {
  margin-top: 2%;
  // margin-left: -4%;
}

.newboxContainer {
  // margin-top: 2%;
  margin-left: 2%;
  margin-right: 10%;
  .scroll-news {
    // margin: 1% 1%;
    // margin-bottom: 2%;
    // margin-top: 2%;
    // height: 120%;
    // width: 95%;
    .news {

    }
  }
}

.covid-content {
  /*设置内部填充为0，几个布局元素之间没有间距*/
  padding: 0px;
  /*外部间距也是如此设置*/
  margin: 0px;
  /*统一设置高度为100%*/
  height: 100%;
}

.left-content {
  /*设置内部填充为0，几个布局元素之间没有间距*/
  /* padding: 1%; */
  /* 外部间距也是如此设置*/
  // margin: 0.5%;
}
.pie-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  // width: 100%;
  height: 100%;
}

.main-content {
  display: flex;
}
</style>

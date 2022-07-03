<template>
<div>
  <div class="mywordcloud" id="mywordcloud"></div>
    <!-- <div class="content-box"> -->
    <!-- vue的ref可以通过this.$refs.获取到DOM节点 -->
    <!-- echart容器div必须设置高度，否则不显示 -->
  <div class="keyWords" id="keyWords" ></div>
  <!-- </div> -->
</div>
</template>
<script>
import "echarts-wordcloud/dist/echarts-wordcloud";
import "echarts-wordcloud/dist/echarts-wordcloud.min";

export default {
  name: "weridoWordCloud",
  data() {
    return {
      indicators: [
        { name: "生活", max: 16000 },
        { name: "学习", max: 35000 },
        { name: "运动", max: 20000 },
        { name: "工作", max: 27000 },
        { name: "娱乐", max: 25000 },
        { name: "八卦", max: 25000 }
      ],
      datas: [4300, 10000, 28000, 35000, 5000, 19000]
    };
  },
  mounted() {
    // this.test();
    this.initChart();
    this.initEchart2();
    // this.test();
  },
  methods: {
    initChart() {
      onload = function () {
      var data = {
        value: [{
          "name": "95后",
          "value": 1446
        },
          {
            "name": "程序狗🐕",
            "value": 928
          },
                    {
            "name": "社会主义新青年",
            "value": 428
          },
          {
            "name": "单身狗🐶",
            "value":806
          },
          {
            "name": "加班狗🌛",
            "value": 625
          },
          {
            "name": "python",
            "value": 514
          },
          {
            "name": "后端",
            "value": 486
          },
          {
            "name": "音乐",
            "value": 53
          },
          {
            "name": "周杰伦",
            "value": 163
          },
          {
            "name": "菜鸡,不会停止学习",
            "value": 86
          },
          {
            "name": "运动",
            "value": 17
          },
          {
            "name": "吃鸡小能手",
            "value": 6
          },
          {
            "name": "努力努力再努力",
            "value": 3
          },
          {
            "name": "菜鸡,不会停止努力",
            "value": 1437
          },
          {
            "name": "爱党爱国爱家🚩",
            "value": 422
          },
          {
            "name": "军事",
            "value": 331
          },
          {
            "name": "喜欢钻研",
            "value": 313
          },
          {
            "name": "喜欢周杰伦",
            "value": 307
          },
          {
            "name": "极简主义者",
            "value": 743
          },
          {
            "name": "不喜欢废话",
            "value": 215
          },
          {
            "name": "不喜欢等人,不喜欢让人等",
            "value": 438
          },
          {
            "name": "RPA",
            "value": 157
          },
          {
            "name": "不张扬",
            "value": 927
          },
          {
            "name": "🐠🐠🐠🐠🐠🐠🐠🐠",
            "value": 308
          },
          {
            "name": "🚀🚀🚀🚀🚀🚀",
            "value": 208
          },
          {
            "name": "独处",
            "value": 693
          },
          {
            "name": "底层搬砖者👻",
            "value": 211
          },
          {
            "name": "会一直努力",
            "value": 516
          },
          {
            "name": "怀旧",
            "value": 621
          }
        ],
        image:"data:image/png;base64,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"
        }      
      let echarts = require("echarts");
      var myChart = echarts.init(document.getElementById('mywordcloud'));
      var maskImage = new Image();
      maskImage.src = data.image

      maskImage.onload = function(){
      myChart.setOption( {
          // backgroundColor:'#fff',
          tooltip: {
            show: false
          },
          series: [{
            type: 'wordCloud',
            gridSize: 1,
            sizeRange: [12, 55],
            rotationRange: [-45, 0, 45, 90],
            maskImage: maskImage,
            textStyle: {
              normal: {
                color: function() {
                  return 'rgb(' +
                      Math.round(Math.random() * 255) +
                      ', ' + Math.round(Math.random() * 255) +
                      ', ' + Math.round(Math.random() * 255) + ')'
                }
              }
            },
            left: 'center',
            top: 'center',
            right: null,
            bottom: null,
            data: data.value
          }]
        })
      }

    }
    },
    createRandomItemColor(){
      return {
        normal:{
          color:'rgb(' +
                      Math.round(Math.random() * 255) +
                      ', ' + Math.round(Math.random() * 255) +
                      ', ' + Math.round(Math.random() * 255) + ')'
        }
      }
    },
    initEchart2() {
      //获取DOM节点并初始化
      let echarts = require("echarts");
      let myChart = echarts.init(document.getElementById('keyWords'));
      let option = {
        tooltip: {},
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: "#fff",
              backgroundColor: "#999",
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          indicator: this.indicators
        },
        series: [
          {
            type: "radar",
            data: [
              {
                value: this.datas
              }
            ]
          }
        ]
      };

      //设置图表的参数
      myChart.setOption(option);
    }
  

  },
};
</script>
<style>

@media screen and (min-width:1200px) 
{ /*当屏幕尺寸小于600px时，应用下面的CSS样式*/
  .mywordcloud {
    width: 700px; 
    height: 500px;
  };
  /* .keyWords{
    /* width: 200PX;  
    height: 300PX;
  } */

}

@media screen and (max-width:620px) 
{ /*当屏幕尺寸小于600px时，应用下面的CSS样式*/
  .mywordcloud {
    width: 400px; 
    height: 500px;
    display: none;
  }
    /* .keyWords{
    width: 200PX; 
    height: 300PX; */
  

}



    

</style>


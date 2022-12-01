<template>
  <div class="chart-wrapper" id="scatterMap" style="height: 100%"></div>
</template>


<script>
import * as echarts from "echarts";
import AMapLoader from "@amap/amap-jsapi-loader";
import { shallowRef } from "@vue/reactivity";
import {
  onMounted,
  onBeforeUnmount,
  ref,
  reactive,
  watch,
  defineComponent,
} from "vue";

export default defineComponent({
  name: "scatterMap",
  setup() {},
  data() {
    return {
      AMap: null, //AMAP对象
      AMapUI: null, //AMAPUI对象
      mapChart: null, //初始化后的echart实例
      geoJson: null, //地图绘制数据
      data: null, //地图数据
      timeData: reactive([2016, 2017, 2018, 2019, 2020]), //时间线
    };
  },
  mounted() {
    window.addEventListener("resize", this.resizeHandler);
    this.initMap();
  },
  methods: {
    resizeHandler: function () {
      if (this.mapChart) {
        this.mapChart.resize();
      }
    },
    //渲染echarts图
    initEcharts: function (data) {
      let el = window.document.getElementById("scatterMap");
      el.style.clientHeight = "800px";
      console.log(el.clientWidth, el.clientHeight);
      this.mapChart = echarts.init(
        window.document.getElementById("scatterMap")
      );
      echarts.registerMap("china", this.geoJson);
      // if (parentInfo.value.length === 1) {
      //   echarts.registerMap("china", geoJson.value); //注册
      // } else {
      //   echarts.registerMap("map", geoJson.value); //注册
      // }
      var min = parseFloat(data[0].value);
      var max = parseFloat(data[data.length - 1].value);
      if (data.length === 1) {
        min = 0;
      }

      this.mapChart.setOption(
        {
          timeline: {
            data: this.timeData, //时间线
            show: true, //是否显示时间线
            axisType: "category", // value|category|time
            autoPlay: false, //时间线自动播放
            playInterval: 8000, //播放间隔
            realtime: true, //拖动原点显示数据
            left: "10%",
            right: "10%",
            bottom: "0%",
            width: "80%",
            label: {
              normal: {
                textStyle: {
                  color: "rgb(179, 239, 255)",
                },
              },
              emphasis: {
                textStyle: {
                  color: "#fff",
                },
              },
            },
            currentIndex: 1, //当前选中的是data中的哪一项
            symbolSize: 10, //标记大小，比如时间，即为对应时间点
            lineStyle: {
              color: "#8df4f4",
            },
            checkpointStyle: {
              //当前项的样式
              symbol: "diamond",
              borderColor: "#8df4f4",
              color: "#53D9FF",
              borderWidth: 2,
            },
            controlStyle: {
              showNextBtn: true,
              showPrevBtn: true,
              normal: {
                color: "#53D9FF",
                borderColor: "#53D9FF",
              },
              emphasis: {
                color: "rgb(58,115,192)",
                borderColor: "rgb(58,115,192)",
              },
            },
          },
          baseOption: {
            animation: true,
            animationDuration: 900,
            animationEasing: "cubicInOut",
            animationDurationUpdate: 900,
            animationEasingUpdate: "cubicInOut",
            // 图标标题
            title: {
              left: "40%",
              top: 0,
              text: "新冠疫情分布",
              textStyle: {
                color: "rgb(179, 239, 255)",
                fontSize: 32,
              },
            },
            tooltip: {
              //地图数据项目提示框
              trigger: "item",
              formatter: (p) => {
                let val = p.value;
                if (p.name == "南海诸岛") return;
                if (window.isNaN(val)) {
                  val = 0;
                }
                let txtCon =
                  "<div style='text-align:left'>" +
                  p.name +
                  ":<br />销售额：" +
                  val.toFixed(2) +
                  "万</div>";
                return txtCon;
              },
            },
            
            visualMap: {
              //坐标轴
              show: true,
              min: min,
              max: max,
              left: "0%",
              bottom: "0%",
              calculable: true,
              inRange: {
                color: ["#24CFF4", "#2E98CA", "#1E62AC"],
              },
              textStyle: {
                color: "#24CFF4",
              },
            }, //图例
            series: [
              {
                // name: year.value + "销售额度",
                name:"covidMap",
                type: "map",
                map: "china", //使用 registerMap 注册的地图名称。
                roam: true, //是否开启鼠标缩放和平移
                zoom: 1.25, //当亲视角的缩放比
                top:"20%",
                left:"25%",
                tooltip: {
                  //提示框浮框的位置
                  trigger: "item",
                  formatter: (p) => {
                    //悬浮框提示内容
                    let val = p.value;
                    if (p.name == "南海诸岛") return;
                    if (window.isNaN(val)) {
                      val = 0;
                    }
                    let txtCon =
                      "<div style='text-align:left'>" +
                      p.name +
                      ":<br />悬浮框提示内容:" +
                      val.toFixed(2) +
                      "万</div>";
                    return txtCon;
                  },
                },
                label: {
                  normal: {
                    show: true,
                    color: "rgb(249, 249, 249)", //省份标签字体颜色
                    formatter: (p) => {
                      //地图上显示的信息
                      switch (p.name) {
                        case "内蒙古自治区":
                          p.name = "内蒙古";
                          break;
                        case "西藏自治区":
                          p.name = "西藏";
                          break;
                        case "新疆维吾尔自治区":
                          p.name = "新疆";
                          break;
                        case "宁夏回族自治区":
                          p.name = "宁夏";
                          break;
                        case "广西壮族自治区":
                          p.name = "广西";
                          break;
                        case "香港特别行政区":
                          p.name = "香港";
                          break;
                        case "澳门特别行政区":
                          p.name = "澳门";
                          break;
                        default:
                          break;
                      }
                      return p.name;
                    },
                  },
                  emphasis: {
                    //高亮状态下的样式
                    show: true,
                    color: "#f75a00",
                  },
                },
                itemStyle: {
                  normal: {
                    areaColor: "#24CFF4",
                    borderColor: "#53D9FF",
                    borderWidth: 1.3,
                    shadowBlur: 15,
                    shadowColor: "rgb(58,115,192)",
                    shadowOffsetX: 7,
                    shadowOffsetY: 6,
                  },
                  emphasis: {
                    areaColor: "#8dd7fc",
                    borderWidth: 1.6,
                    shadowBlur: 25,
                  },
                },
                data: data,
                
              },
            ],
          },
        },
        true
      );
    },

    /*********************** 加载地图数据麽  ****************************/
    async getGeoJson(adcode) {
      let that = this;
      that.geoJson = await new Promise((resolve, reject) => {
        that.AMapUI.loadUI(["geo/DistrictExplorer"], (DistrictExplorer) => {
          var districtExplorer = new DistrictExplorer();
          districtExplorer.loadAreaNode(adcode, function (error, areaNode) {
            console.log(">>>get geo info ", areaNode);
            if (error) {
              console.error(error);
              reject(error);
              return;
            }
            let Json = areaNode.getSubFeatures();
            let mapJson = {
              features: [],
            };
            if (Json.length === 0) {
              Json = geoJson.features.filter(
                (item) => item.properties.adcode == adcode
              );
            }
            console.log(">>>> geo json", Json);
            mapJson.features = Json;
            resolve(mapJson);
          });
        });
      });
      console.log("get geo info finish", this.geoJson);
    },
    async getMapInfo(adcode) {
      let that = this;
      let res = await new Promise((resolve, reject) => {
        let districtSearch = new that.AMap.DistrictSearch();
        districtSearch.search(adcode, function (status, result) {
          console.log("get map data finish", status, result);
          if (status != "complete") {
            reject(new Error("获取地图数据失败"));
            return;
          }
          const data = result.districtList[0];
          if (
            (data.level === "district" &&
              data.districtList[0].level === "street") ||
            !data.districtList
          ) {
            resolve([data]);
          }
          resolve(data.districtList);
        });
      });
      this.data = this.mockData(res);
      console.log("get mock data finish", this.data);
    },

    async loadData(adcode) {
      await this.getMapInfo(adcode);
      await this.getGeoJson(adcode);
      console.log(
        "load data finish",
        this.data,
        this.geoJson,
        window.document.getElementById("scatterMap")
      );
      this.initEcharts(this.data);
    },

    mockData(data) {
      const mapData = data.map((item) => {
        return {
          name: item.name,
          value: (Math.random() * 3000).toFixed(2),
          adcode: item.adcode,
        };
      });
      return mapData;
    },

    initMap() {
      AMapLoader.load({
        key: "f938cfb1957155beff6664010a6a3c83", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ["AMap.DistrictSearch"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        AMapUI: {
          // 是否加载 AMapUI，缺省不加载
          version: "1.1", // AMapUI 缺省 1.1
          plugins: ["geo/DistrictExplorer"], // 需要加载的 AMapUI ui插件
        },
      })
        .then(() => {
          this.AMap = AMap;
          this.AMapUI = AMapUI;
          console.log(">>> create AMap", AMap, AMapUI);
          this.loadData(100000);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
});
// export default
</script>

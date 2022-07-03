<template>
  <el-row :gutter="10">
    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
      <div class="mine-avator">
        <div id="wrapper">
          <div class="container">
            <div class="transition-mask"></div>
            <weridoWordCloud>
            </weridoWordCloud>
            <!-- <div class="front-person-img"> -->
              <!--person's image-->
              <!-- <img :src="mineUrl" alt="Symp" /> -->
              <!--/person's image-->
            <!-- </div> -->
            <!--person's titles-->
            <!-- <div class="front-person-titles"> -->
              <!--title1-->
              <!-- <span class="t1"> 程序狗 懒狗 单身狗 🐕 </span> -->
              <!--/title1-->
              <!--title2-->
              <!-- <span class="t2"> 95后 极简主义者 ⚪ </span> -->
              <!--/title2-->
              <!--title3-->
              <!-- <span class="t3">python 菜鸡，不会停止学习👁‍🗨 </span> -->
              <!--/title3-->
            <!-- </div> -->
            <div class="front-heading text-center">
              <h2>Werido Lin 林怪人 </h2>
            </div>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
      <div class="info">
        <div class="about-me-info">
          <h2 class="universal-h2 universal-h2-bckg">About me</h2>
          <p>
            <span>H</span> 
              95年钢铁理工直男，非计算机科班，毕业后转行，目前从事于RPA行业，主攻PYTHON，半业余水平，希望各位大佬不吝赐教。 
          </p>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import weridoWordCloud from "./mineWorldCloud";
export default {
  name: "Mine",
  components: {
    weridoWordCloud
  },
  data() {
    
    return {
      mineUrl: require("../../../assets/about/mine.jpg"),
    };
  },
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/about/style.css';

P{
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
}

h2 {
    margin: 2em auto 1.4em;
    padding-left: 6px;
    line-height: 1.4;
    font-size: 1.6em;
}

.universal-h2 {
  font-size: 48px;
  text-align: center;
  color: #222; }
@media (max-width: 1250px) {
.universal-h2 {
    font-size: 38px; } }
@media (max-width: 668px) {
.universal-h2 {
    font-size: 30px; } }


.about-me-info {
  width:80%;
  margin-right: 80px;
  text-align: center; }
  .about-me-info .universal-h2 {
    color: #131111;
    padding-bottom: 20px;
    margin-bottom: 25px; }
  .about-me-info p {
    margin-bottom: 35px;
    line-height: 24px;
    color: #c18f59; }
    .about-me-info p span {
      font-size: 48px;
      color: #fff; }
    @media (max-width: 620px) {
      .about-me-info p {
        margin-bottom: 20px;
        font-size: 14px;
        line-height: 19px; } }
  .about-me-info h4 {
    margin-bottom: 7px;
    font-size: 25px;
    color: #c18f59; }
  .about-me-info .p-white {
    margin-bottom: 0;
    color: #fff; }
  @media (max-width: 1250px) {
    .about-me-info {
      width: 48%;
      margin-right: 40px; } }
  @media (max-width: 992px) {
    .about-me-info {
      width: 100%;
      margin-right: 0; } }

.universal-h2-bckg {
  background-image: url("~@/assets/about/double-line.svg");
  background-repeat: no-repeat;
  background-position: center bottom; }
</style>
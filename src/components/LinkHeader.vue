<template>
  <div class="link-header screen content-bg">
    <el-row class="link-top">
      <div class="link-info container">
        <!-- <h1 class="mess-title blog-animation">
          <i class="el-icon-collection"></i>今天你学习了吗？
        </h1> -->
        <!-- <learning class="load-text blog-animation"></learning> -->
      </div>
    </el-row>
    <span @click="next('#next')" class="screen-next iconfont">
      &#xe623;
    </span>
  </div>
</template>
<script>
import Learning from "./Learning";
export default {
  name: "LinkHeader",
  components: {
    Learning,
  },
  methods:{
    next(target){
        let toElement = document.querySelector(target);
          toElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        })
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '~@/assets/style/home.styl';

.link-top {
  min-height 450px
  height:100vh ;
  padding: 0;
  position: relative;
  // overflow: hidden;
  // background: url('https://p.pstatp.com/origin/1375f0001fa65da54c5eb'); // p.pstatp.com/origin/1375f0001fa65da54c5eb
  background: url('~@/assets/link_bg2.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  // background-size:100% 100%;
  .link-info {
    padding: 30px;
    box-sizing: border-box;
    position: sticky;
    top: 50%;
    flex-shrink: 0;
    // position: sticky;
    // top: 50%;
    // left: 50%;
    transform: translateY(-50%);

    .mess-title {
      margin: 0;
      font-size: 25px;
      color: #5adcce;
    }

    .load-text {
      // text-align center
      text-shadow: rgba(99, 88, 88, 0.878) 20px 10px 5px;
      line-height: 40px;
      font-weight: bold;
      color: #607D8B;
      font: 1.5rem 'Montserrat', sans-serif;
    }
  }
}

@media (max-width: 992px) {
  .mess-title {
    font-size: 25px !important;
  }

  .load-text {
    font-size: 18px !important;
  }
}
</style>
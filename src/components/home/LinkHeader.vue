<template>
  <div class="link-header screen content-bg">
    <el-row class="link-top">
      <div class="link-info container">
      </div>
    </el-row>
  </div>
</template>
<script setup lang="ts">
  // import Learning from "src/components/Learning.vue";
  function next(target:string){
      let toElement = document.querySelector(target);
      if( toElement!=null){
        toElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      })
      }
  }

</script>



<style lang="stylus" scoped>


.link-top {
  min-height 450px
  height:100vh ;
  padding: 0;
  position: relative;
  // overflow: hidden;
  // background: url('https://p.pstatp.com/origin/1375f0001fa65da54c5eb'); // p.pstatp.com/origin/1375f0001fa65da54c5eb
  background: url('src/assets/link_bg2.jpg');
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
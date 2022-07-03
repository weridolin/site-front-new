<template>
  <div id="app" class="home-blog">
    <new-header v-show="$route.meta.header"></new-header>
    <!-- <keep-alive>
      <router-view v-if="$route.meta.keepAlive" class="route-content"></router-view>
    </keep-alive> -->

    <router-view v-slot="{ Component }" v-if="$route.meta.keepAlive">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>

    <router-view v-if="!$route.meta.keepAlive" class="route-content"></router-view>
    <el-backtop :right="20" :bottom="50" />
    <index-footer :route="$route.path" v-show="$route.meta.footer && $route.path!=='/drug'"></index-footer>
    <!-- <transition name="slide-fade">
        <el-backtop :right="100" :bottom="100" />
        <el-backtop :right="20" >
          <div class="iconfont backtop">&#xe601;</div>
        </el-backtop>
    </transition> -->
    <!-- APP.vue定义组件都是页面公用的App.vue是项目的主组件，页面入口文件 ，所有页面都在App.vue下进行切换，app.vue负责构建定义及页面组件归集 -->
    <!-- <music></music>  -->
    <!-- <auth></auth> -->
  </div>
</template>


<script setup  lang="ts">
import NewHeader from "src/pages/NewHeader.vue";
import IndexFooter from "src/pages/IndexFooter.vue";
// import Music from "./components/Music";
// import MyMarked from "./components/MyMarked";
// import Auth from "./components/Auth"
</script>

<style>
html {
  padding-bottom:0%
}
.el-backtop {
	z-index: 5;
}

</style>
<style lang="stylus">
.white_content {
	border-radius: 20px;
	display: none;
	position: absolute;
	top: 30%;
	left: 40%;
	background-color: #FFFFFF;
	z-index: 1002;
 /* 数字的大小指明了div的相对层，数字大的在上层 */
	overflow: auto;
} 

.black_overlay {
	display: none;
	position: absolute;
	top: 0%;
	left: 0%;
	width: 100%;
	height: 100%;
	background-color: #00C0A5;
	z-index: 1001;
	-moz-opacity: 0.8;
	opacity: .80;

}

.screen{
  position relative
}
.screen-next{
  position absolute
  bottom 10px
  left 50%
  transform translateX(-50%)
  font-size 30px!important
  animation: next 0.6s linear infinite alternate;
  color rgb(255, 255 ,255, .4)
  cursor pointer
  transition all .3s
  z-index 1000
}
.screen-next:hover{
  color #fff
}

.el-avatar {
  // background:transparent#b5e7f3
  background: #b5e7f3;
}

.el-notification .el-icon-warning {
  color: #fdbc5b;
}

.backtop {
  height: 100%;
  width: 100%;
  background-color: #585d5d;
  text-align: center;
  line-height: 40px;
  font-size: 30px !important;
  color: #fff;
  font-weight: bold;
  transition all .5s
  &:hover{
    line-height: 36px;
    background: linear-gradient(to right, #8EC5FC,#9FACE6)
  }
}

.el-dialog__body {
  padding: 10px 20px !important;
}

.el-dialog__title {
  font-weight: bold;
  color: var(--main-6);
}

.el-input.is-active .el-input__inner, .el-input__inner:focus {
  border-color: var(--main-6);
}

.el-scrollbar__wrap {
  overflow-x: hidden;
}

.v-note-wrapper {
  min-width: 1px !important;
  min-height: 1px !important;
  box-shadow: none !important;
  background-color: transparent !important;
}

.v-show-content {
  padding: 0 !important;
  background-color: transparent !important;
}

.route {
  padding-top: 60px;
}

p {
  word-wrap: break-word;
  word-break: normal;
}

#nprogress .bar {
  background: linear-gradient(120deg, #84fab0 0%, #51cacc 100%) !important; // 自定义颜色
}

.blog-animation {
  animation-name: swcrawl;
  animation-duration: 1s;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(10px);
  opacity: 0;
}
@media (max-width: 850px) {
  .route-content {
    transition: all 0.2s;
    filter: none;
  }

  .route-filter {
    transition: all 0.2s;
    filter: blur(10px);
  }

  .el-dialog {
    width: 90% !important;
  }
}
@keyframes next {
  0% {
    transform: translate(-50%,3px);
  }

  100% {
    transform: translate(-50%,0px);
  }
}
@keyframes swcrawl {
  0% {
    // transform:rotateY(90deg) translateY(300px);
    transform: scale(0.9);
    opacity: 0;
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

</style>

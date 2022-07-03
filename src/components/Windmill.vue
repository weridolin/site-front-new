<template>
    <router-link  to="/blog">
      <div class="canvas a-tag blog-animation">
        <img src="https://iconfont.alicdn.com/s/e9cdd0e7-2697-4566-8b20-2d8f9ea8481d.svg" width="400">
        <p>哎呀，页面不见了！点击返回</p>
      </div>
    </router-link>
</template>
<script>
export default {
    name:'Windmill'
}
</script>
<style lang="stylus" scoped>
.canvas
  width 100vw
  height 100vh
  display flex
  flex-direction column
  justify-content center
  align-items center
  img 
    width 100%
    max-width 400px
  p
    margin-top 20px
  
</style>

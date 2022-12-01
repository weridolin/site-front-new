<template>
  <div class="gradient-border">
    <div class="news-item">
      <img
        src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
        class="cover"
      />
      <div class="description">
        <h5>Java is not the same as JavaScript</h5>
        <div class="auth-info">
          <div class="time">📅:2022-11-28</div>
          <div class="src"><a href="#"> 前往</a></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script  lang="ts" setup>
import { Edit } from "@element-plus/icons-vue";

const props = defineProps({
  title: String,
  src: String,
  summary: String,
  cover: String,
});
</script>

<style lang="scss" scoped>
.gradient-border {
  --borderWidth: 3px;
  background: #1d1f20;
  position: relative;
  border-radius: var(--borderWidth);
}
.gradient-border:after {
  content: "";
  position: absolute;
  top: calc(-1 * var(--borderWidth));
  left: calc(-1 * var(--borderWidth));
  height: calc(100% + var(--borderWidth) * 2);
  width: calc(100% + var(--borderWidth) * 2);
  background: linear-gradient(
    60deg,
    #a166ab,
    #5073b8,
    #1098ad,
    #07b39b,
    #6fba82
  );
  border-radius: calc(2 * var(--borderWidth));
  z-index: -1;
  animation: animatedgradient 3s ease alternate infinite;
  background-size: 300% 300%;
}

@keyframes animatedgradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.news-item {
  display: flex;
  margin: 5% 5%;
  // background-color: #000;
  // padding: 20px;
  .cover {
    width: 40%;
    height: 100%;
  }

  .description {
    margin-left: 2%;
    width: 60%;
    height: 80%;

    h5 {
      margin-left: 2%;
    }
    .auth-info {
      display: flex;
      margin: 0 0;
      justify-content: space-between;
      line-height: 70px;
      .time {
        margin-left: 2%;
      }
    }
  }
}
</style>
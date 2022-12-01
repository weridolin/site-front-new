<template>
  <div class="box-container">
    <four-angel v-if="props.useBox">
      <div class="boxTitle">{{ props.boxTitle }}</div>
      <div class="main-content">
        <slot></slot>
      </div>
    </four-angel>

    <div v-else>
      <div class="item_title">
        <div class="zuo"></div>
        <span class="title-inner">
          &nbsp;&nbsp;{{ props.boxTitle}}&nbsp;&nbsp;
        </span>
        <div class="you"></div>
      </div>
    </div>
    <div
      :class="
        props.boxTitle !== '' ? 'item_title_content' : 'item_title_content_def'
      "
    >
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import fourAngel from "src/components/covid19/fourAngel/index.vue";
import { defineProps } from "vue";

const props = defineProps({
  boxTitle: String,
  titlePos: String,
  color: String,
  useBox: Boolean,
});
</script>

<style lang="scss" scoped>
.box-container {
  width: 100%;
  height: 100%;
  .boxTitle {
    height: 28px;
    line-height: 28px;
    width: 100%;
    font-size: 0.9rem;
    text-align: center;
    color: #b3efff;
    font-family: "黑体";
  }
  .main-content {
    height: calc(100% - 28px);
    width: 100%;
    margin: 10px;
  }
}
</style>

<style scoped lang="scss">
.item-wrap {
  // border: red dashed 1px;
  box-sizing: border-box;
}
$item-title-height: 38px;
$item_title_content-height: calc(100% - 38px);

.item_title {
  height: $item-title-height;
  line-height: $item-title-height;
  width: 100%;
  color: #31abe3;
  text-align: center;
  // background: linear-gradient(to right, transparent, #0f0756, transparent);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2%;
  .zuo,
  .you {
    width: 58px;
    height: 14px;
    background-image: url("src/assets/covid19/zuo.png");
  }

  .you {
    transform: rotate(180deg);
  }
  .title-inner {
    font-weight: 900;
    letter-spacing: 2px;
    background: linear-gradient(
      92deg,
      #0072ff 0%,
      #00eaff 48.8525390625%,
      #01aaff 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.item_title_content {
  height: $item_title_content-height;
}

.item_title_content_def {
  width: 100%;
  height: 100%;
}
</style>
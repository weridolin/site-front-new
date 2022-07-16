<template>
<div class="text_loading">
    <div class="ant-skeleton ant-skeleton-active" data-v-67a5e324="">
    <!---->
    <div class="ant-skeleton-content">
      <div class="ant-skeleton-title" style="width: 38%"></div>
      <ul class="ant-skeleton-paragraph">
        <li></li>
        <li></li>
        <li style="width: 61%"></li>
      </ul>
    </div>
  </div>
</div>
 
</template>

<script>
export default {
  name: "NewLoading",
};
</script>

<style scoped lang="stylus">
.text_loading {
  background-color: #fff;
  padding:20px 7.6923%;
  border-radius: 4px;
  margin 10px
}

.ant-skeleton {
  display: table;
  width: 100%;
}

.ant-skeleton-content {
  display: table-cell;
  width: 100%;
  vertical-align: top;
}

.ant-skeleton-content .ant-skeleton-title {
  width: 100%;
  height: 16px;
  background: rgb(242, 242, 242);
}

.ant-skeleton-content .ant-skeleton-title+.ant-skeleton-paragraph {
  margin-top: 24px;
}

.ant-skeleton-content .ant-skeleton-paragraph {
  padding: 0px;
}

.ant-skeleton-content .ant-skeleton-paragraph>li {
  width: 100%;
  height: 16px;
  list-style: none;
  background: rgb(242, 242, 242);
}

.ant-skeleton-content .ant-skeleton-paragraph>li:last-child:not(:first-child):not(:nth-child(2)) {
  width: 61%;
}

.ant-skeleton-content .ant-skeleton-paragraph>li+li {
  margin-top: 16px;
}

.ant-skeleton-with-avatar .ant-skeleton-content .ant-skeleton-title {
  margin-top: 12px;
}

.ant-skeleton-with-avatar .ant-skeleton-content .ant-skeleton-title+.ant-skeleton-paragraph {
  margin-top: 28px;
}

.ant-skeleton.ant-skeleton-active .ant-skeleton-avatar, .ant-skeleton.ant-skeleton-active .ant-skeleton-content .ant-skeleton-paragraph>li, .ant-skeleton.ant-skeleton-active .ant-skeleton-content .ant-skeleton-title {
  background: linear-gradient(90deg, rgb(242, 242, 242) 25%, rgba(230, 230, 230,.7) 37%, rgb(242, 242, 242) 63%) 0% 0% / 400% 100%;
  animation: ant-skeleton-loading 1.4s ease 0s infinite normal none running;
}

@keyframes ant-skeleton-loading {
  0% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0 50%;
  }
}
</style>
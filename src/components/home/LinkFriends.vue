<template>
  <div class="container link-frie">
    <h1 class="mess-title" id="next">
      <i class="el-icon-connection"></i>优秀的小伙伴们！
    </h1>
    <el-row>
      <el-col
        :xl="6"
        :md="8"
        :sm="12"
        :xs="24"
        class="link-cat"
        v-for="item of friends"
        :key="item.id"
      >
        <a :href="item.site" target="_blank">
          <div class="car">
            <img class="car-img" :src="item.cover" />
            <div class="car-right">
              <h6 class="car-title">{{ item.name }}</h6>
              <p class="car-body">{{ item.intro }}</p>
            </div>
          </div>
        </a>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "LinkFriends",
  props: {
    friends: Array,
  },
};
</script>
<style lang="stylus" scoped>
@import '~@/assets/style/home.styl';

.link-frie {
  &:hover {
    .mess-title {
      color: #5adcce;
    }
  }

  .mess-title {
    font-size: 25px;
    color: #ccc;
  }

  .car {
    position: relative;
    height: 150px;
    width: 90%;
    background-color: #fff;
    border-radius: 8px;
    margin: 30px auto;
    padding: 45px 14px 8px 14px;
    box-sizing: border-box;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.15);
    transition: all 0.3s;

    &:hover {
      box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.1);

      .car-img {
        box-shadow: 0 0 0 6px var(--main-6);
        transform: translate(-50%, -50%) rotate(360deg);
      }
    }

    .car-img {
      width: 70px;
      height: 70px;
      overflow: hidden;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      top: 0;
      transform: translate(-50%, -50%);
      transition: all 0.8s;
      background-color: #fff;
      box-shadow: 0 0 0 4px #fff;
    }

    .car-title {
      text-align: center;
      font-size: 17px;
    }

    .car-body {
      font-size: 16px;
      font-weight: 500;
      text-align: center;
      line-height: 1.5em;
      height: 3em;
      margin-top: 15px;
      overflow: hidden;
      color: #5B667F;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      word-break: break-all;
    }
  }
}
</style>    
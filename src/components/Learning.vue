<template>
  <div class="learning">
    <span class="el-icon-service" @click="isPlay">
      {{content}}
      <i class="el-icon-thumb"></i>
      <!-- <i ></i> -->
      <!-- <audio :src="tts" controls="controls"></audio> -->
    </span>
    <hr class="lear-hr" />
    <span class="el-icon-orange">{{note}}</span>
    <!-- http://sentence.iciba.com/index.php?c=dailysentence&m=getdetail&title=2020-04-24 -->
  </div>
</template>
<script>
import Bus from "@/utils/bus.js";
export default {
  name: "Learning",
  data() {
    return {
      isAdd: false, //是否添加到列表
      pause: true,
      content: "",
      tts: "",
      note: "",
      img: "",
    };
  },
  methods: {
    isPlay() {
      console.log(111);
      let that = this;
      if (!this.isAdd) {
        Bus.$emit("addMusic", {
          name: "词霸每日一句",
          title: "今日英语",
          url: that.tts,
          img: that.img,
          pause: true,
        });
        this.isAdd = !this.isAdd;
      }

      Bus.$emit("isPlay");
    },
    add() {
      console.log("nihao ");
    },
    formatDate() {
      var d = new Date(),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    },
  },
  created() {
    let that = this;
    this.$get(
      "/english/index.php?c=dailysentence&m=getdetail&title=" +
        that.formatDate()
    )
      .then(function (response) {
        that.content = response.content;
        that.note = response.note;
        that.tts = response.tts;
        that.img = response.picture;
      })
      .catch(function (error) {});
  },
};
</script>
<style lang="stylus" scoped>
.learning span {
  font-weight: bold;
  cursor: pointer;
}
.lear-hr{
  width 100%
  color #ccc
  animation lear 1s 1s

}
@keyframes lear {
  0%{
    width 0%
  }
  50%{
    background-color: #fff;
  }
  100%{
    width 100%
  }
}
</style>
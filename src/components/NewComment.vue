<template>
  <div
    class="valine_comment v"
    data-class="v"
    v-loading="loading"
    element-loading-text="评论提交中..."
    :element-loading-spinner="svg"
    element-loading-svg-view-box="-10, -10, 50, 50"
    element-loading-background="rgba(122, 122, 122, 0.8)"
  >
    <el-form :model="commentSubmitFormData" :rules="rules">
      <div class="vpanel">
        <div class="vwrap">
          <!-- <div class="vheader item3" v-if="!isLogin">
            <el-row>
              <el-col :md="8" :xs="8" :sm="8" >
                <el-form-item prop="name">
                  <input
                    placeholder="昵称"
                    v-model="commentSubmitFormData.name"
                    class="vnick vinput"
                    type="text"
                  />
                </el-form-item>
              </el-col>
              <el-col :md="8" :xs="8" :sm="8" class="qq">
                <el-form-item prop="qq">
                  <input
                    placeholder="QQ"
                    v-model="commentSubmitFormData.qq"
                    class="vmail vinput"
                  />
                </el-form-item>
              </el-col>
              <el-col :md="8" :xs="8" :sm="8" class="email">
                <el-form-item prop="email">
                  <input
                    placeholder="邮箱Q"
                    v-model="commentSubmitFormData.email"
                    class="vmail vinput"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </div> -->

          <div class="vedit" style="positon: relative">
            <el-form-item prop="content">
              <el-input
                type="textarea"
                :rows="8"
                :class="{ content: isLogin }"
                v-model="commentSubmitFormData.body"
                class="veditor vinput"
                placeholder="留下你宝贵的意见 @~@ 😎"
              ></el-input>
            </el-form-item>

            <div class="vrow">
              <div class="vcol vcol-60 status-bar"></div>
              <div class="vcol vcol-40 vctrl text-right">
                <!--            EMOJI 弹框 表情   #-->
                <el-popover
                  placement="left"
                  width="220"
                  class="vicon vemoji-btn"
                  trigger="hover"
                >
                  <!-- <div style="text-align: center; margin: 0">
                    <emoji-list
                      style="width 100%"
                      @emotion="handleEmotion"
                    ></emoji-list>
                  </div> -->
                  <svg
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="16172"
                    width="22"
                    height="22"
                  >
                    <path
                      d="M512 1024a512 512 0 1 1 512-512 512 512 0 0 1-512 512zM512 56.888889a455.111111 455.111111 0 1 0 455.111111 455.111111 455.111111 455.111111 0 0 0-455.111111-455.111111zM312.888889 512A85.333333 85.333333 0 1 1 398.222222 426.666667 85.333333 85.333333 0 0 1 312.888889 512z"
                      p-id="16173"
                    />
                    <path
                      d="M512 768A142.222222 142.222222 0 0 1 369.777778 625.777778a28.444444 28.444444 0 0 1 56.888889 0 85.333333 85.333333 0 0 0 170.666666 0 28.444444 28.444444 0 0 1 56.888889 0A142.222222 142.222222 0 0 1 512 768z"
                      p-id="16174"
                    />
                    <path
                      d="M782.222222 391.964444l-113.777778 59.733334a29.013333 29.013333 0 0 1-38.684444-10.808889 28.444444 28.444444 0 0 1 10.24-38.684445l113.777778-56.888888a28.444444 28.444444 0 0 1 38.684444 10.24 28.444444 28.444444 0 0 1-10.24 36.408888z"
                      p-id="16175"
                    />
                    <path
                      d="M640.568889 451.697778l113.777778 56.888889a27.875556 27.875556 0 0 0 38.684444-10.24 27.875556 27.875556 0 0 0-10.24-38.684445l-113.777778-56.888889a28.444444 28.444444 0 0 0-38.684444 10.808889 28.444444 28.444444 0 0 0 10.24 38.115556z"
                      p-id="16176"
                    />
                  </svg>
                </el-popover>
              </div>
            </div>
          </div>
          <div class="vrow">
            <div class="vcol vcol-30">
              <a
                alt="Markdown is supported"
                href="https://guides.github.com/features/mastering-markdown/"
                class="vicon"
                target="_blank"
              >
                <svg
                  class="markdown"
                  viewBox="0 0 16 16"
                  version="1.1"
                  width="16"
                  height="16"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M14.85 3H1.15C.52 3 0 3.52 0 4.15v7.69C0 12.48.52 13 1.15 13h13.69c.64 0 1.15-.52 1.15-1.15v-7.7C16 3.52 15.48 3 14.85 3zM9 11H7V8L5.5 9.92 4 8v3H2V5h2l1.5 2L7 5h2v6zm2.99.5L9.5 8H11V5h2v3h1.5l-2.51 3.5z"
                  />
                </svg>
              </a>
            </div>
            <div id="write" class="vcol vcol-70 text-right">
              <!--              提示框-->
              <span class="count" :class="{ isCount: countCount > 500 }">
                {{ countCount > 500 ? "已超出" : "还可以输入" }}
                <strong class="count-leng">{{
                  Math.abs(500 - countCount)
                }}</strong
                >字
              </span>
              <!--  确定框  -->
              <el-tooltip
                class="item"
                effect="light"
                content="遵守法律，文明发言"
                placement="top"
              >
                <button
                  type="button"
                  title="Cmd|Ctrl+Enter"
                  @click="post"
                  class="vsubmit vbtn"
                >
                  提交
                </button>
              </el-tooltip>
            </div>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>


<script setup lang="ts">
import EmojiList from "src/components/EmojiList.vue";
import MyMarked from "src/components/MyMarked.vue";
import { ElMessage } from "element-plus";
import { useAuthStore } from "src/store/user";
// import EmojiL
import { ref } from "vue";

import {
  commentSubmitFormData,
  rules,
  // post,
  loading,
  isLogin,
  countCount,
  initCommentSubmitFormData,
} from "src/components/NewComment";
import { HomeApi } from "src/services/apis/home";
import { load } from "@amap/amap-jsapi-loader";

const emit = defineEmits(["add-new-comment"]);

const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `;
async function post() {
  if (!useAuthStore().isLogin.value) {
    ElMessage.error("请先登录！");
    return;
  }
  // this.comment.type = "siteComment";
  loading.value = true;
  await HomeApi.siteComment
    .submit(commentSubmitFormData, {
      timeout: 3 * 60 * 1000,
    })
    .then((res) => {
      ElMessage.success("提交成功!");
      initCommentSubmitFormData();
      emit("add-new-comment");
    })
    .catch((err) => {
      ElMessage.error(`提交失败:${err}!`);
      console.log(err);
      // initCommentSubmitFormData()
    }).finally(()=>{
      loading.value = false;
    });
}
</script>



<style lang="stylus" scoped>
.v>>>.el-textarea__inner {
  border: transparent;
  background: transparent;
  padding: 0;
  min-height: 48px !important;
  font-size: 14px;
  font-weight: bold;
  color: var(--main-6);
  // color
}

.slide-left-enter-active {
  transition: all 0.7s ease;
}

.slide-left-leave-active {
  transition: all 0.7s ease;
}

.slide-left-enter, .slide-left-leave-to {
  transform: translateX(-100%);
}

.isshow {
  background-color: var(--main-3);
}

// .vpanel{
// background: url(https://p.pstatp.com/origin/1372100011fb653db9634);
// background-repeat: no-repeat;
// background-position:center;
// // background-size: cover;

// }
.v[data-class=v] {
  font-size: 16px;
  text-align: left;
  border-radius: 4px;
}

.v[data-class=v] .vbtn:active, .v[data-class=v] .vbtn:hover {
  color: #3090e4;
  border-color: #3090e4;
}

.content {
  padding-left: 50px !important;
}

.v[data-class=v] .vbtn {
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
  text-align: center;
  color: #555;
  border: 1px solid #ededed;
  border-radius: 0.3em;
  display: inline-block;
  background: transparent;
  margin-bottom: 0;
  font-weight: 400;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  white-space: nowrap;
  padding: 0.5em 1.25em;
  font-size: 0.875em;
  line-height: 1.42857143;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  outline: none;
}

.v[data-class=v] * {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  line-height: 1.75;
}

.count {
  text-align: right;
  color: #B5B5B5;
  padding: 0 8px;
}

.isCount {
  color: var(--main-5);

  .count-leng {
    color: var(--main-5);
  }
}

.count-leng {
  text-align: right;
  color: #B5B5B5;
  font-family: georgia;
  font-size: 24px;
  padding: 0 2px;
  font-weight: bold;
}

.v[data-class=v] .status-bar, .v[data-class=v] .veditor, .v[data-class=v] .vinput, .v[data-class=v] p, .v[data-class=v] pre code {
  color: #555;
}

.v[data-class=v] .vsys, .v[data-class=v] .vtime {
  color: #b3b3b3;
}

.v[data-class=v] .text-right {
  text-align: right;
}

.v[data-class=v] .text-center {
  text-align: center;
}

.v[data-class=v] a {
  position: relative;
  cursor: pointer;
  color: #1abc9c;
  text-decoration: none;
  display: inline-block;
}

.v[data-class=v] a:hover {
  color: #d7191a;
}

.v[data-class=v] .vinput {
  resize: none;
  outline: none;
  padding: 10px 5px;
  max-width: 100%;
  font-size: 0.775em;
}

.v[data-class=v] input[type=checkbox], .v[data-class=v] input[type=radio] {
  display: inline-block;
  vertical-align: middle;
  margin-top: -2px;
}

.v[data-class=v] .vicon {
  cursor: pointer;
  display: inline-block;
  overflow: hidden;
  fill: #555;
  vertical-align: middle;
}

.v[data-class=v] .vicon+.vicon {
  margin-left: 10px;
}

.v[data-class=v] .vicon.actived {
  fill: #66b1ff;
}

.v[data-class=v] .vrow {
  padding: 10px 0;
}

.v[data-class=v] .vrow .vcol {
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
}

.v[data-class=v] .vrow .vcol.vcol-20 {
  width: 20%;
}

.v[data-class=v] .vrow .vcol.vcol-30 {
  width: 30%;
}

.v[data-class=v] .vrow .vcol.vcol-40 {
  width: 40%;
}

.v[data-class=v] .vrow .vcol.vcol-50 {
  width: 50%;
}

.v[data-class=v] .vrow .vcol.vcol-60 {
  width: 60%;
}

.v[data-class=v] .vrow .vcol.vcol-70 {
  width: 70%;
}

.v[data-class=v] .vrow .vcol.vcol-80 {
  width: 80%;
}

.v[data-class=v] .vrow .vcol.vctrl {
  font-size: 12px;
}

.v[data-class=v] .veditor {
  width: 100%;
  min-height: 5em;
  font-size: 0.875em;
  background: transparent;
  resize: vertical;
  -webkit-transition: all 0.25s ease;
  transition: all 0.25s ease;
}

.v[data-class=v] .vinput {
  border: none;
  resize: none;
  outline: none;
  padding: 0 5px;
  max-width: 100%;
  font-size: 0.775em;
}

.v[data-class=v] .vwrap {
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  margin-bottom: 10px;
  overflow: hidden;
  position: relative;
  padding: 10px;
}

.v[data-class=v] .vwrap input {
  background: transparent;
}

.v[data-class=v] .vwrap .cancel-reply-btn {
  position: absolute;
  right: 5px;
  top: 5px;
  cursor: pointer;
}

.v[data-class=v] .vwrap .vpreview {
  padding: 7px;
  -webkit-box-shadow: 0 0 1px #f0f0f0;
  box-shadow: 0 0 1px #f0f0f0;
}

.v[data-class=v] .vwrap .vheader .vinput {
  width: 33.33%;
  border-bottom: 1px dashed #dedede;
}

.v[data-class=v] .vwrap .vheader.item2 .vinput {
  width: 50%;
}

.v[data-class=v] .vwrap .vheader.item1 .vinput {
  width: 100%;
}

.v[data-class=v] .vwrap .vheader .vinput:focus {
  border-bottom-color: #eb5055;
}

.v[data-class=v] .vwrap .vheader.item2 .vinput, .v[data-class=v] .vwrap .vheader .vinput {
  width: 100%;
}
</style>

<template>
  <div class="media-block pad-all">
    <a class="media-left"
      ><img
        class="img-circle img-sm"
        alt="Profile Picture"
        :src="$props.comment.avatar?$props.comment.avatar:$props.comment.gender?man:woman"
    /></a>
    <div class="media-body">
      <div class="mar-btm">
        <a  class="btn-link text-semibold media-heading box-inline">{{
          $props.comment.name
        }}</a>
        <p class="text-muted text-sm">
          <i class="fa fa-mobile fa-lg"
            ><el-icon><Calendar /></el-icon
          ></i>
          - {{ $props.comment.updated }}
        </p>
      </div>
      <p>{{ $props.comment.body }}</p>

      <div class="pad-ver">
        <!-- <span class="tag tag-sm"
          ><i class="fa fa-heart text-danger"></i> 250 Likes</span
        >
        <div class="btn-group">
          <a class="btn btn-sm btn-default btn-hover-success" href="#"
            ><i class="fa fa-thumbs-up"></i
          ></a>
          <a class="btn btn-sm btn-default btn-hover-danger" href="#"
            ><i class="fa fa-thumbs-down"></i
          ></a>
        </div> -->
        <a class="btn btn-sm btn-default btn-hover-primary">
          <el-button size="small" :icon="ChatDotRound" class="reply-btn" round
            >回复</el-button
          >
        </a>
      </div>
      <hr />

      
      <!-- 对话回复 -->
      <!-- <div>
        <div class="media-block pad-all">
          <a class="media-left" href="#"
            ><img
              class="img-circle img-sm"
              alt="Profile Picture"
              src="https://bootdey.com/img/Content/avatar/avatar2.png"
          /></a>
          <div class="media-body">
            <div class="mar-btm">
              <a
                href="#"
                class="btn-link text-semibold media-heading box-inline"
                >Maria Leanz</a
              >
              <p class="text-muted text-sm">
                <i class="fa fa-globe fa-lg"></i> - From Web - 2 min ago
              </p>
            </div>
            <p>Duis autem vel eum iriure dolor in hendrerit in vulputate ?</p>
            <div>
              <div class="btn-group">
                <a class="btn btn-sm btn-default btn-hover-success" href="#"
                  ><i class="fa fa-thumbs-up"></i
                ></a>
                <a class="btn btn-sm btn-default btn-hover-danger" href="#"
                  ><i class="fa fa-thumbs-down"></i
                ></a>
              </div>
              <a class="btn btn-sm btn-default btn-hover-primary" href="#"
                >Comment</a
              >
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  replyFormData,
  deleteComment,
  formatReply,
  userInfo,
  getDateDiff,
  setColor,
  siteCommentList,
} from "src/components/MessCardBlog";
import { ChatDotRound, Calendar } from "@element-plus/icons-vue";
import { emotion } from "src/components/AddMessage";
import type { SiteCommentResponse } from "src/services/apis/home";
import man from "src/assets/man.png";
import woman from "src/assets/woman.png";
interface Props {
  comment: SiteCommentResponse;
  // list:any[]
}
const props = withDefaults(defineProps<Props>(), {});

</script>

<style scoped>
body {
  margin-top: 20px;
  background: #ebeef0;
}

.img-sm {
  width: 46px;
  height: 46px;
}

.panel {
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.075);
  border-radius: 0;
  border: 0;
  margin-bottom: 15px;
}
/* .pad-ver {
  margin-bottom: 1%;
} */

.reply-btn {
  float: right;
}

.panel .panel-footer,
.panel > :last-child {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.panel .panel-heading,
.panel > :first-child {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.panel-body {
  padding: 25px 20px;
}

.media-block .media-left {
  display: block;
  float: left;
  margin: 5px;
}

.media-block .media-right {
  float: right;
}

.media-block .media-body {
  display: block;
  overflow: hidden;
  width: auto;
}

.middle .media-left,
.middle .media-right,
.middle .media-body {
  vertical-align: middle;
}

.thumbnail {
  border-radius: 0;
  border-color: #e9e9e9;
}

.tag.tag-sm,
.btn-group-sm > .tag {
  padding: 5px 10px;
}

.tag:not(.label) {
  background-color: #fff;
  padding: 6px 12px;
  border-radius: 2px;
  border: 1px solid #cdd6e1;
  font-size: 12px;
  line-height: 1.42857;
  vertical-align: middle;
  -webkit-transition: all 0.15s;
  transition: all 0.15s;
}
.text-muted,
a.text-muted:hover,
a.text-muted:focus {
  color: #acacac;
}
.text-sm {
  font-size: 0.9em;
  margin-top: .5%;
}
.text-5x,
.text-4x,
.text-5x,
.text-2x,
.text-lg,
.text-sm,
.text-xs {
  line-height: 1.25;
}

.btn-trans {
  background-color: transparent;
  border-color: transparent;
  color: #929292;
}

.btn-icon {
  padding-left: 9px;
  padding-right: 9px;
}

.btn-sm,
.btn-group-sm > .btn,
.btn-icon.btn-sm {
  padding: 5px 10px !important;
  display: flex;
  justify-content: flex-end;
}

.mar-top {
  margin-top: 15px;
}
</style>
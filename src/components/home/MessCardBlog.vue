<template>
  <div>
    <div class="media-block pad-all">
      <a class="media-left"
        ><img
          class="img-circle img-sm"
          alt="Profile Picture"
          :src="
            $props.comment.avatar
              ? $props.comment.avatar
              : $props.comment.gender
              ? man
              : woman
          "
      /></a>
      <div class="media-body">
        <div class="mar-btm">
          <a class="btn-link text-semibold media-heading box-inline">{{
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
          <a class="btn btn-sm btn-default btn-hover-primary">
            <el-button
              size="small"
              :icon="ChatDotRound"
              class="reply-btn"
              round
              @click="
                () => {
                  replyToName = $props.comment.name;
                  showReply = true;
                  replyForm.replay_to = $props.comment.id;
                  replyForm.root_id = $props.comment.id;
                }
              "
              >回复</el-button
            >
          </a>
        </div>
        <hr />

        <!-- 对话回复 -->
        <div v-for="item in commentReplyList" :key="item.id">
          <div class="media-block pad-all comment-reply">
            <a class="media-left"
              ><img
                class="img-circle img-sm"
                alt="Profile Picture"
                :src="item.avatar ? item.avatar : item.gender ? man : woman"
            /></a>
            <div class="media-body">
              <div class="mar-btm">
                <a
                  class="btn-link text-semibold media-heading box-inline reply-name"
                  >{{ item.name }}
                  <span class="huifu">&nbsp;回复:&nbsp;</span>
                  <span
                    class="text-primary"
                    style="
                       {
                        color: blue;
                      }
                    "
                    >{{
                      GetReplyName(
                        item.replay_to,
                        $props.comment.id,
                        $props.comment.name
                      )
                    }}</span
                  ></a
                >
                <p class="text-muted text-sm">
                  <i class="fa fa-mobile fa-lg"
                    ><el-icon><Calendar /></el-icon
                  ></i>
                  - {{ item.updated }}
                </p>
              </div>
              <p>{{ item.body }}</p>

              <div class="pad-ver">
                <a class="btn btn-sm btn-default btn-hover-primary">
                  <el-button
                    size="small"
                    :icon="ChatDotRound"
                    class="reply-btn"
                    @click="
                      () => {
                        replyToName = item.name;
                        replyForm.replay_to = item.id;
                        replyForm.root_id = item.root_id;
                        showReply = true;
                      }
                    "
                    round
                    >回复</el-button
                  >
                </a>
              </div>
            </div>
          </div>
        </div>
        <el-divider
          v-show="
            commentReplyList.length > 0 && next_page != '' && next_page != null
          "
        >
          更多👇<el-icon><star-filled /></el-icon>
        </el-divider>
      </div>
    </div>
    <div class="reply-comment">
      <!-- 获取对话框 -->

      <el-dialog v-model="showReply" title="Tips" width="80%" align-center v-loading="loading">
        <span>回复 {{ replyToName }}</span>
        <template #footer>
          <span class="dialog-footer">
            <el-input
              v-model="replyForm.body"
              :rows="2"
              type="textarea"
              placeholder="输入回复内容"
              :close="
                () => {
                  showReply = false;
                }
              "
            />
            <el-button @click="reply" :loading="loading">回复</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import type { SiteComment, ReplyForm } from "src/services/apis/home";
import { HomeApi } from "src/services/apis/home";
import { ChatDotRound, Calendar } from "@element-plus/icons-vue";
import man from "src/assets/man.png";
import woman from "src/assets/woman.png";
import { ElMessage } from "element-plus";
interface Props {
  comment: SiteComment;
  // list:any[]
}

const replyToName = ref("");
const replyName = ref("");
const replay_to = ref<number>(-1);
const loading = ref(false)
const propsComment = defineProps<Props>();
const count = ref<number>();
const next_page = ref<string>("");
const showReply = ref<boolean>(false);
const replyForm = ref<ReplyForm>({
  body: "",
  replay_to: -1,
  root_id: propsComment.comment.id as number,
});

let commentReplyList = ref<Array<SiteComment>>([]);

function GetCommentReply(rootId: number) {
  HomeApi.siteComment
    .getCommentReply(rootId)
    .then((res) => {
      commentReplyList.value = res.data.results;
      count.value = res.data.count;
      next_page.value = res.data.next;
      //过滤掉回复的评论不存在此次查询结果中的
      // commentReplyList.value = commentReplyList.value.filter((item) => {
      //   return item.replay_to != rootId;
      // });
      let tempIds: number[] = [propsComment.comment.id];
      for (let i = 0; i < commentReplyList.value.length; i++) {
        tempIds.push(commentReplyList.value[i].id);
      }
      commentReplyList.value.filter((item) => {
        return tempIds.indexOf(item.replay_to) == -1;
      });
      console.log("get comment reply -> ", commentReplyList.value);
    })
    .catch((err) => {
      console.log("get comment reply error -> ", err);
    });
}

// 获取回复的评论ID
function GetReplyName(
  replyCommentID: number,
  rootId: number,
  rootName: string
) {
  let name = "";
  if (replyCommentID == rootId) {
    name = rootName;
    return name;
  }
  commentReplyList.value.forEach((item) => {
    if (item.id == replyCommentID) {
      name = item.name;
    }
  });
  return name;
}

// 回复评论

const reply = () => {
  loading.value = true
  HomeApi.siteComment.postCommentReply(
    propsComment.comment.id as number,
    replyForm.value
  ).then((res) => {
    console.log("回复评论成功 -> ", res);
    ElMessage.success("回复评论成功");
    GetCommentReply(propsComment.comment.id);
  }).catch((err) => {
    console.log("回复评论失败 -> ", err);
  }).finally(() => {
    showReply.value=false
    replyForm.value.body = "";
    replyForm.value.replay_to = -1;
    replyForm.value.root_id = propsComment.comment.id as number;
    loading.value = false
  });

};

GetCommentReply(propsComment.comment.id);
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
.huifu {
  font-size: small;
  white-space: pre;
  margin-left: 5px;
  margin-right: 5px;
}

.reply-name {
  font-size: small;
  white-space: pre;
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
  margin-top: 0.5%;
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
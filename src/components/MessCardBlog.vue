<template>
  <ul style="padding: 0">
    <!--   留言板/文章评论引用-->
    <li
      class="mess-item"
      :class="card.left ? 'mess-item-left' : 'mess-item-right'"
      v-for="(item, index) of list"
      :key="item.id"
      :style="{ 'animation-duration': ((index + 1) % 10) * 100 + 200 + 'ms' }"
    >
      <div
        class="mess-info"
        :class="card.left ? 'mess-info-left' : 'mess-info-right'"
      >
        <!--      如果是当前账户，或者是管理员，则可以删除-->
        <el-popconfirm
          v-if="
            (userInfo.id == item.user_id && userInfo.id > 0) ||
            userInfo.is_admin == 1
          "
          title="这条留言确认删除吗？"
          @onConfirm="deleteComment(item.id, 'message')"
        >
          <a
            href="javascript:;"
            class="dele-mess el-icon-delete"
          ></a>
        </el-popconfirm>

        <!-- 用户信息栏  start-->
        <div class="mess-header" :class="{ 'mess-header-dis': !card.pattern }">
          <div class="header-left a-tag">
            <div></div>

            <!-- 用户头像-->
            <el-avatar
              shape="square"
              :src="
                item.name
                  ? item.name
                  : item.qq
                  ? 'http://q1.qlogo.cn/g?b=qq&nk=' + item.qq + '&s=100'
                  : ''
              "
              class="user-img"
            >
              <div
                :style="
                  'background-image: linear-gradient(270deg,' +
                  setColor() +
                  ',' +
                  setColor() +
                  ')'
                "
              >
                {{ item.name ? item.name : item.tourist }}
              </div>
            </el-avatar>

            <!-- 用户名字   -->
            <div v-if="card.pattern" class="header-right">
              <a href="javascript:;" class="el-icon-chat-line-round mess-name">
                {{ item.name ? item.name : "游客" }}
              </a>

              <!--              如果是管理员 则显示为博主-->
              <span
                class="bolg-admin el-icon-sunny"
                v-show="item.user != null && item.user.is_admin == 1"
                >站长</span>
            </div>

            <!-- 回复按钮,PATTERN="MESS"-:留言模式  else 非留言模式 -->
                    <!-- <a
                                v-if="car.pattern" 
                          @click="reply(item.id)"
                          class="header-reply"
                        href="javascript:;">
                        {{ item.id == id && pattern == 'mess' ? '取消' : '回复' }}
                      </a> -->
          </div>
        </div>
        <!-- 用户信息 end -->

        <!-- 留言内容 start -->
        <div class="mess-body">
          <!-- <mavon-editor
            style="z-index:10;box-shadow:none;"
            :value="item.message.replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi, emotion)"
            :subfield="false"
            :defaultOpen="'preview'"
            :toolbarsFlag="false"
            :editable="false"
            :scrollStyle="true"
            :ishljs="true"
          /> -->
          <!-- <my-marked
            :initialValue="
              item.body.replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi, emotion)
            "
            :copyCode="false"
            :imgView="false"
          ></my-marked> -->
          <div class="msg-body" >
                {{ item.body }}
          </div>
          <!-- <vue-markdown :source="item.message.replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi, emotion)"></vue-markdown> -->
          <p class="time" style=" text-align :right">
            {{ getDateDiff(item.created)}}
            <span style="margin:10px">&emsp;<span v-html="formatReply(item)">
            </span></span>
          </p>
        </div>
        <!-- 留言内容 end -->

        <!-- <transition name="down">
          <div class="mess-add" v-if="item.id == id && pattern == 'mess'">
            <new-comment @submit="submit" v-if="card.pattern"></new-comment>
          </div>
        </transition> -->

        <!-- 回复列表 start -->
        <!-- <el-tooltip v-if="item.reply.length>0" class="item" effect="light" :content="id==item.id?'关闭评论':'打开评论'" placement="top">
      <span class="open" @click="id=id==item.id?0:item.id"><i :class="id==item.id?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>
        </el-tooltip> -->
        <!--        <div class="mess-footer" v-show="item.replays">-->
        <!--          <div class="mess-info mess-reply" v-for="reply of item.replays" :key="'reply'+reply.id" :id="'reply'+reply.id"-->
        <!--               :class="flicker==reply.id?'flicker':''">-->

        <!--            &lt;!&ndash; TODO 删除留言&ndash;&gt;-->
        <!--            <el-popconfirm-->
        <!--                v-if="(userInfo.id==reply.user.id&&userInfo.id>0)||userInfo.is_admin==1"-->
        <!--                title="这条留言确认删除吗？"-->
        <!--                @onConfirm="dele(reply.user.id,'reply')">-->
        <!--              <a-->
        <!--                  slot="reference"-->
        <!--                  href="javascript:;"-->
        <!--                  class="dele-reply el-icon-delete"></a>-->
        <!--            </el-popconfirm>-->

        <!--            <div class="mess-header">-->
        <!--              <div class="header-left a-tag">-->
        <!--                <el-avatar :src="reply.user.avatar_url" shape="square" class="user-img">-->
        <!--                  <div-->
        <!--                      :style="'background-image: linear-gradient(270deg,'+setColor()+','+setColor()+')'"-->
        <!--                  >{{ reply.name }}-->
        <!--                  </div>-->
        <!--                </el-avatar>-->

        <!--                <div class="header-right">-->
        <!--                  <a href="javascript:;" class="el-icon-sugar mess-name">{{ reply.name }} </a>-->
        <!--                  回复-->
        <!--                  <a href="javascript:;" class="el-icon-sugar mess-name">{{ reply.reply_to_name }}</a>-->
        <!--                  <span-->
        <!--                      class="bolg-admin el-icon-sunny"-->
        <!--                      v-show="reply.user!=null&&reply.user.is_admin==1">博主</span>-->
        <!--                  &lt;!&ndash;                <p>{{ getDateDiff(reply.created_at) }}<span v-if="reply.address">—<span&ndash;&gt;-->
        <!--                  &lt;!&ndash;                    v-html="formatReply(reply.address)"></span></span></p>&ndash;&gt;-->
        <!--                  <p>{{ getDateDiff(reply.createdTimestamps) }}<span v-if="reply.address">—<span-->
        <!--                      v-html="reply.address"></span></span></p>-->
        <!--                </div>-->
        <!--                <a-->
        <!--                    v-if="car.pattern"-->
        <!--                    @click="replyMess(reply.user.id,item.id)"-->
        <!--                    class="header-reply-mess"-->
        <!--                    href="javascript:;">-->
        <!--                  &lt;!&ndash;                {{ reply.user.id == reply.user.id ? '取消' : '回复' }}&ndash;&gt;-->
        <!--                  {{ reply.user.id == reply.user.id ? '回复' : '回复' }}-->
        <!--                </a>-->
        <!--              </div>-->
        <!--            </div>-->
        <!--            &lt;!&ndash;          <div class="mess-body" style="border-bottom:1px dashed #ccc">&ndash;&gt;-->
        <!--            &lt;!&ndash;            <p class="mess-reply-replay" v-if="reply.mess_reply[0]"><span class="replay-name">回复<a style="color:#7bdddf"&ndash;&gt;-->
        <!--            &lt;!&ndash;                                                                                                   href="javascript:;"&ndash;&gt;-->
        <!--            &lt;!&ndash;                                                                                                   @click="roll(reply.mess_reply_id)">@{{ reply.mess_reply[0].user.name }}</a></span><span><my-marked&ndash;&gt;-->
        <!--            &lt;!&ndash;                :initialValue="reply.mess_reply[0].reply.replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi, emotion)"&ndash;&gt;-->
        <!--            &lt;!&ndash;                :copyCode="false" :imgView="false"></my-marked></span></p>&ndash;&gt;-->
        <!--            &lt;!&ndash;            <my-marked :initialValue="reply.reply.replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi, emotion)" :copyCode="false"&ndash;&gt;-->
        <!--            &lt;!&ndash;                       :imgView="false"></my-marked>&ndash;&gt;-->
        <!--            &lt;!&ndash;          </div>&ndash;&gt;-->
        <!--            &lt;!&ndash; 留言内容 end &ndash;&gt;-->

        <!--            &lt;!&ndash;          <transition name="down">&ndash;&gt;-->
        <!--            &lt;!&ndash;            <div class="mess-add" v-if="reply.id==reply_id">&ndash;&gt;-->
        <!--            &lt;!&ndash;              <new-comment @submit="submit" v-if="car.pattern"></new-comment>&ndash;&gt;-->
        <!--            &lt;!&ndash;            </div>&ndash;&gt;-->
        <!--            &lt;!&ndash;          </transition>&ndash;&gt;-->
        <!--          </div>-->
        <!--        </div>-->
        <!-- 回复列表 end -->
      </div>
    </li>
  </ul>
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
      card
  } from "src/components/MessCardBlog"

  import {emotion} from  'src/components/AddMessage'  

  import type {Card} from "src/components/MessCardBlog"

  interface Props{
      card:Card,
      list:any[]
  }
  const props = withDefaults(defineProps<Props>(),{})

  card.value = props.card
  siteCommentList.value = props.list
  


</script>

<style scoped>

li {
  list-style: none;
}

</style>

<style lang="stylus" scoped>


.mess-item {
  position: relative;
  margin: 10px 0;

  // z-index 2
  &:hover:before {
    transform: scale(1.2, 1.2);
    z-index: 10 !important;
    background-color: var(--main-4);
   
  }

  &:before {
    position: absolute;
    top: 26px;
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 10px;
    background-color: var(--main-6);
    animation: fadeIn 0.5s ease-in 0.6s 1 normal backwards;
    border: 3px solid #fff;
    z-index: 2;
  }

  .mess-info { // 留言card样式
    width: 86%;
    margin: 0 7%;
    box-sizing: border-box;
    background-color: #9fe6aa38;
    position: relative;
    padding: 50px;
    box-sizing: border-box;
    font-size: 14px;
    animation: moveLeft 0.3s ease-in 0.4s 1 normal backwards;
    border-radius: 15px;

    &:hover {
      .dele-mess {
        height: 30px;
      }

      .open {
        height: 25px;
      }

      .mess-body {
        &:before {
          width: 100%;
        }
      }

      .mess-header {
        .header-left {
          .header-reply {
            height: 30px;
          }
        }

        .time {
          margin-top: 0px;

        }
      }
    }

    &:before {
      position: absolute;
      content: '';
      top: 20px;
      border: 12px solid transparent;
    }

    .dele-mess, .dele-reply {
      float: right;
      height: 0;
      overflow: hidden;
    }

    .mess-header-dis {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .mess-header {
      .header-left {
        display: flex;
        align-items: center;

        .user-img {
          margin-right: 6px;
        }

        .header-left a {
          padding: 0 5px;
          acitve();
        }

        .header-right {
          transition: all 0.6s;
          color: #ccc;
          font-size: 14px;
          height: 40px;
          line-height: 20px;
          max-width: 50%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          a {
            height: 30px;
            font-size: 16px;
            text-align: center;
          }

          p {
            margin: 0;
            height: 20px;
            font-size: 12px;
          }
        }

        .header-reply, .header-reply-mess {
          margin-left: 10px;
          height: 0;
          overflow: hidden;
        }
      }

      .header-right {
        transition: all 0.6s;
        color: #ccc;
        font-size: 14px;
      }
    }

    .mess-add {
      padding: 2px 0 2px 0px !important;
    }

    .mess-body, .mess-add {
      position: relative;
      padding: 12px 12px 0px 50px;
      line-height: 1.6;
      border-bottom: 1px double #ccc;

      &:before {
        position: absolute;
        left: 0;
        bottom: -1px;
        z-index: 2;
        content: '';
        width: 0;
        height: 1px;
        transition: width 0.6s;
        background-image: linear-gradient(270deg, var(--main-8), var(--main-6));
      }
    }

    .open {
      height: 0px;
      width: 40px;
      transition: all 0.4s;
      overflow: hidden;
      position: absolute;
      bottom: 0px;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      cursor: pointer;
      z-index: 10;

      &:hover {
        i {
          color: var(--main-5);
        }
      }

      i {
        font-size: 24px;
        animation: next 0.6s linear infinite alternate;
        font-weight: bold;
        color: var(--main-6);
      }
    }

    .mess-footer {
      .mess-info {
        width: 100%;
        box-sizing: border-box;
        margin: 0;
        padding: 10px 10px 10px 40px;
      }

      .flicker {
        position: relative;

        &:after {
          content: '';
          position: absolute;
          height: 40px;
          width: 40px;
          max-height: 90%;
          top: 50%;
          right: 10px;
          transform: translateY(-50%);
          background-image: url('https://p.pstatp.com/origin/feab0002ddf50d4289c1'); // p.pstatp.com/origin/feab0002ddf50d4289c1)
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
          transform-origin: center right;
          animation: flicker 0.6s linear 1 normal;
        }
      }
    }
  }

  .mess-reply {
    &:hover {
      .dele-reply {
        height: 30px;
      }

      .mess-header {
        .header-left {
          .header-reply-mess {
            height: 30px;
          }
        }
      }
    }
  }

  .mess-reply-replay {
    background-color: #f7f7f7;
    padding: 4px;
    border-radius: 4px;

    .replay-name {
      color: #ccc;
    }

    .marked {
      color: #a3a3a3 !important;
    }
  }
}

.mess-item-right {
  animation: moveRight 0.3s ease-in 0.4s 1 normal backwards;

  &:before {
    left: -8px;
    transition: all 0.3s;
  }

  .mess-info-right {
    &:before {
      left: -24px;
      border-right-color: #fff;
    }
  }
}

.mess-item-left {
  animation: moveLeft 0.3s ease-in 0.4s 1 normal backwards;

  &:before {
    right: -8px;
    transition: all 0.3s;
  }

  .mess-info-left {
    &:before {
      right: -24px;
      border-left-color: #fff;
    }
  }
}

.bolg-admin {
  color: var(--main-4);
  margin-left: 5px;
  border: 1px solid var(--main-4);
  font-size: 14px;
  padding: 1px 5px;
  border-radius: 10px;
}

>>> .markdown-body p {
  margin-bottom: 0;
}

.down-enter-active {
  transition: all 0.4s ease;
}

.down-leave-active {
  transition: all 0.3s ease;
}

.down-enter, .down-leave-to {
  transform: scale(0.1);
  opacity: 0.5;
}

@media (max-width: 992px) {
  .mess-group, .mess-item, .mess-info {
    &:before {
      display: none;
    }
  }

  .mess-item {
    .mess-info {
      width: 96%;
      margin: 0px 2%;
    }
  }
}

@keyframes flicker {
  0% {
    transform: rotate(50deg) translateY(-50%);
  }

  100% {
    transform: rotate(0deg) translateY(-50%);
  }
}

@keyframes next {
  0% {
    transform: translateY(3px);
  }

  100% {
    transform: translateY(0px);
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes moveLeft {
  0% {
    opacity: 0;
    transform: translateX(5%);
  }

  100% {
    opacity: 1;
    transform: translateX(0%);
  }
}

@keyframes moveRight {
  0% {
    opacity: 0;
    transform: translateX(-5%);
  }

  100% {
    opacity: 1;
    transform: translateX(0%);
  }
}
</style>

<template>
  <footer class="footer">
    <div class="container">
      <div class="foot-row service">
        <p class="title">own to werido,仅供学习用，侵权请告知</p>
        <ul class="link">
          <li><router-link to="/lab">疯狂实验室</router-link></li>
          <li><router-link to="/home/link">友链</router-link></li>
          <li><router-link to="/home/message">留言</router-link></li>
          <li>
            <XRouteLink to="https://weridolin.github.io/#/">博客</XRouteLink>
          </li>
          <li><router-link to="/">主页</router-link></li>
          <li><router-link to="/">💡💡</router-link></li>
        </ul>
      </div>
      <div class="foot-row provide">
        <span
          ><a class="a-flex" target="_blank" href="https://cn.aliyun.com/"
            ><span>本网站由</span
            ><img class="ypy" src="../assets/阿里云.png" /><span
              >提供CDN加速/云存储服务</span
            ></a
          ></span
        >
        <div class="search-wrap"></div>
      </div>
      <div class="foot-row publicity">
        <span
          ><a href="https://beian.miit.gov.cn/" target="_blank">粤ICP备2020119623号</a></span
        >
      </div>
      <div class="foot-row bottom">
        <p class="copyright">
          © 2021 - {{ year }}
          <a href="https://github.com/weridolin">werido</a> All Rights Reserved.
        </p>
        <div class="share">
          <!-- <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=2401694354&site=qq&menu=yes" class="iconfont qq" title="使用QQ账号登录" @click="partyLogin('qq')">&#xe651;</a> -->
          <!-- <a target="_blank" href="https://gitee.com/baymaxsjj" class="iconfont gitee" title="使用Gitee登录" @click="partyLogin('gitee')">&#xe686;</a> -->
          <!-- <a target="_blank" href="https://github.com/baymaxsjj" class="iconfont github" title="使用GitHub登录" @click="partyLogin('github')">&#xe691;</a> -->
        </div>
      </div>
    </div>
  </footer>
</template>
<script setup lang="ts">
import XRouteLink from "src/components/XRouteLink.vue";
const year = new Date().getFullYear();
</script>
<style lang="stylus" scoped>
.footer {
  padding: 10px 30px;
  font-size: 12px;
  color: #a7a7a7;
  // background:rgba(248, 249, 250, 0.9)
  background: #fff;
  font-weight: bolder;
  letter-spacing: 2px;
  padding: 10px;
  line-height: 26px;
  position: relative;
  margin-top: 0;

  a {
    color: #a7a7a7;
    font-size: 12px;
    transition: all 0.3s;

    &:hover {
      text-decoration: underline;
    }
  }

  .container {
    padding: 0 10px;
    box-sizing: border-box;

    .foot-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
    }

    .service {
      margin: 20px 0 0 0;
      font-size: 16px;

      .link {
        li {
          float: right; // 靠右浮动
          margin: 0 20px;
          list-style: none;

          a {
            font-size: 14px;
          }
        }
      }
    }

    .provide {
      .a-flex {
        display: flex;
        justify-content: stretch;
        align-items: center;
        margin: 50px 0 0 0;

        .ypy {
          height: 50 px;
        }
      }

      .search-wrap {
        width: 300px;
        height: 22px;
        position: relative;
        padding: 2px 0;

        .search-ipt {
          height: 20px;
          position: absolute;
          right: 0;
          top: 0;
          width: 240px;
          color: var(--main-6);
          background: none;
          border: none;
          border-bottom: 2px solid var(--main-1);
          font-family: Roboto, serif;
          font-size: 1rem;
          line-height: 1.75;
          transition: all 0.4s;

          &:focus {
            width: 100%;
          }
        }

        .icon {
          outline: none;
          background-color: transparent;
          border: none;
          padding: 7px;
          line-height: 0;
          position: absolute;
          right: 0;
          color: var(--main-4);
          cursor: pointer;
        }
      }
    }

    hr {
      background-color: #f0f0f0;
    }

    .bottom {
      .share {
        .iconfont {
          display: inline-block;
          height: 30px;
          width: 30px;
          line-height: 28px;
          font-size: 16px;
          margin: 5px;
          cursor: pointer;
          color: #a7a7a7;
          border-radius: 50%;
          text-align: center;
          transition: all 0.5s;
          box-sizing: border-box;

          &:hover {
            text-decoration: none;
          }
        }

        .qq {
          // color rgb(27,193,250)
          // border 1px solid rgb(27,193,250)
          &:hover {
            color: #fff;
            background-color: rgb(27, 193, 250);
          }
        }

        .gitee {
          // color  #fe7300
          // border 1px solid  #fe7300
          &:hover {
            color: #fff;
            background-color: #fe7300;
          }
        }

        .github {
          // color  #0a0203
          // border 1px solid  #0a0203
          &:hover {
            color: #fff;
            background-color: #0a0203;
          }
        }
      }
    }
  }
}

@media (max-width: 700px) {
  .footer {
    padding: 10px;
    font-size: 12px;
    letter-spacing: 2px;
    line-height: 24px;
    position: relative;
    margin-top: 0;

    .container {
      padding: 0 !important;

      .foot-row {
        justify-content: center !important;
      }

      .service {
        .title {
          font-size: 14px;
        }

        .link {
          li {
            margin: 0 5px !important;
          }
        }
      }

      .provide {
        .search-wrap {
          padding: 1px 0 !important;

          .search-ipt {
            right: 50% !important;
            transform: translateX(50%);
          }
        }
      }

      .publicity {
        span {
          margin: 0 5px;
        }
      }

      .bottom {
        .copyright {
          letter-spacing: 1px;
        }
      }
    }
  }
}
</style>

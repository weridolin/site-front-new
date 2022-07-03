<template>
  <div class="content">

    <el-row class="container-marked">
<!--      如果正在加载中。。-->
      <new-loading v-if="loading"></new-loading>
<!--      否则显示内容-->
      <el-col v-else class="blog-content" :span="22" :offset="1">
<!--        是否显示文章头部-->
        <div v-if="content.head_show">
          <header class="article-header blog-animation" :class="{isimg:content.cover}">
            <div
                class="article-img"
                v-if="content.cover"
                :style="{background: 'url( '+ content.cover +')'+' no-repeat center'}"
            ></div>
            <div :class="{istitle:content.cover}">
              <h1
                  class="article-title"
              >{{ content.title }}</h1>
              <div class="archive-article-date">
              <span>
                <i class="icon iconfont iconshu"></i> 分类:
                <span>{{ content.type.name }}</span>
              </span>

                <span>
                <i class="icon iconfont iconbiaoqian1"></i> 标签:
                <span><el-tag
                    v-for="tag in content.tags"
                    :key="tag.id"
                    color="rgb(0,0,0,0)"
                    :type="info"
                    size="mini"
                    style="margin-left:5px;">
                    {{tag.name}}
                  </el-tag></span>
              </span>
                <span>
                <i class="icon iconfont iconyuedu"></i> 阅读数:
                <span>{{ content.total_views }}</span>次
              </span>
                <span>
                <time datetime="2019-11-05T01:10:39.000Z">
                  <i class="iconfont iconriqi icon"></i>
                  {{ content.created }}
                </time>
              </span>
              </div>
            </div>
          </header>
          <hr/>
        </div>

        <div id="write" class="blog-content blog-animation" style="padding-bottom: 20px;">
          <!-- <mavon-editor
            style="z-index:10;box-shadow:none;"
            :value="content.content"
            :subfield="false"
            :defaultOpen="'preview'"
            :toolbarsFlag="false"
            :editable="false"
            :scrollStyle="true"
            :ishljs="true"
            codeStyle="white"
          /> -->
          <my-marked :dompurify="false" :markedOptions="{breaks:true}" :tocNav="false"
                     :initialValue="content.content"></my-marked>
          <!-- <vue-markdown :source="content.content" v-highlight></vue-markdown> -->
        </div>
<!--        <el-divider v-if="content.share_show" content-position="center">-->
<!--          <div class="share">-->
<!--            <a :href="qzone" target="_blank" class="iconfont icon-qzone">&#xe642;</a>-->
<!--            <a :href="qq" target="_blank" class="iconfont icon-qq">&#xe651;</a>-->
<!--            <el-tooltip class="item" effect="light" content="可匿名~次数不限" placement="top">-->
<!--              <a-->
<!--                  href="javascript:;"-->
<!--                  :class="{like:click}"-->
<!--                  class="iconfont icon-love"-->
<!--                  @click="setClick"-->
<!--              >-->
<!--                &#xe605;-->
<!--                <p>{{ content.click }}</p>-->
<!--              </a>-->
<!--            </el-tooltip>-->

<!--            <a :href="weibo" target="_blank" class="iconfont icon-weibo">&#xe60a;</a>-->
<!--            <el-popover placement="top" trigger="hover">-->
<!--              <h4 style="text-align:center">{{ config.wechatQrcodeTitle }}</h4>-->
<!--              <div id="logo" style="width: 100px;height:100px;margin:10px auto;"></div>-->
<!--              <div style="text-align:center" v-html="config.wechatQrcodeHelper"></div>-->
<!--              <a href="javascript:;" slot="reference" class="iconfont icon-wechat">&#xe62e;</a>-->
<!--            </el-popover>-->
<!--          </div>-->
<!--        </el-divider>-->

<!--        版权相关-->
        <div v-if="content.copyright_show">
          <div class="blog-info a-tag blog-animation">
            <p>
              本文标题:
              <a :href="url">{{ content.title }}</a>
            </p>
            <p>
              本文链接:
              <a :href="url">{{ url }}</a>
            </p>
            <p>
              版权所有:
              <a>{{ content.author.username }}</a>----
              <a
                  rel="license"
                  href="#"
              >转载注明请注明出处!</a>
            </p>
          </div>

<!--          上一页和下一页-->
          <div class="a-tag article-prev-next">
            <router-link :to="content.pre.id+''" class="prev"  v-if="content.pre !=null && content.id!=content.pre.id ">
              <i class="el-icon-back">
              </i>{{ content.pre.title }}
            </router-link>

            <div class="prev"  v-if="content.pre ==null">
              <i class="el-icon-back">
              </i>没有更多文章了
            </div>  

            <router-link :to="content.next.id+''" class="next" v-if="content.next !=null && content.id!=content.next.id">
                <i class="el-icon-right"></i>{{ content.next.title }}
            </router-link>
            <div class="next"  v-if="content.next==null">
              <i class="el-icon-right">
              </i>没有更多文章了
            </div>              
          </div>
        </div>

      </el-col>

<!--      显示评论-->
      <el-col v-if="content.message_show" :span="22" :offset="1" class="blog-mess">
        <new-comment @submit="submit" class="blog-animation"></new-comment>
        <a href="javascript:;" name="comment">
          <h2 id="comment" style="margin: 20px 0;">评论</h2>
        </a>
        <mess-card @submit="getMess" :list="list" :car="car" v-if="list.length>0 && list !== undefined && list !== null"></mess-card>
        <p class="next">
          <span
              v-loading="load"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="#f8f8f8"
              @click="next">
            <i
                class="next-icon"
                :class="current_page==last_page?'el-icon-arrow-up':'el-icon-arrow-down'"></i>
            {{ current_page == last_page ? '没有更多了！快去评论吧！^o^' : '点击查看更多' }}
          </span>
        </p>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import NewLoading from "./../../../components/NewLoading.vue";
import MessCard from "./../components/MessCard";
import NewComment from "./../components/NewComment";
import MyMarked from './../components/MyMarked'
// import {mavonEditor} from 'mavon-editor'
// import 'mavon-editor/dist/css/index.css'
import ClipboardJS from 'clipboard'

export default {
  name: "BlogContent",
  data() {
    return {
      imgSrc: "http://q1.qlogo.cn/g?b=qq&nk=1936955617&s=100",
      content: {},
      list: [],
      page: 1,
      last_page: 1,
      current_page: 1,
      busy: false,
      car: {
        pattern: true, //留言模式
        left: true, //left模式
      },
      config: {
        url: window.location.href, // 网址，默认使用 window.location.href
        source: "", // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
        title: "", // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
        description: "", // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
        image: (document.images[0] || 0).src || "", // 图片, 默认取网页中第一个img标签
        wechatQrcodeTitle: "扫一扫：分享", // 微信二维码提示文字
        wechatQrcodeHelper:
            "<p>微信或浏览器，扫一下</p><p>二维码便可查看本文章。</p>",
      },
      FormData: {
        message: "",
        article_id: this.$route.params.id,
      },
      loading: false,
      load: false,
      click: false,
      clipboard: '',
      pre:{
        id:null,
        title:"没有更多了"
      },
      next:{
        id:null,
        title:"没有更多了"
      }
    };
  },
  components: {
    //  VueMarkdown,
    MessCard,
    NewComment,
    NewLoading,
    //  mavonEditor
    MyMarked,
  },
  // 当其依赖的属性的值发生变化时，计算属性会重新计算，反之，则使用缓存中的属性值。
  computed:{
    url() {
      return window.location.href;
    },
    // qzone() {
    //   return (
    //       "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" +
    //       this.config.url +
    //       "&title=" +
    //       this.config.title +
    //       "&desc=" +
    //       this.config.description +
    //       "&summary=" +
    //       this.config.title +
    //       "&site=" +
    //       this.config.source +
    //       "&pics=" +
    //       this.config.image +
    //       ""
    //   );
    // },
    // qq() {
    //   return (
    //       "http://connect.qq.com/widget/shareqq/index.html?url=" +
    //       this.config.url +
    //       "&title=" +
    //       this.config.title +
    //       "&source=" +
    //       this.config.source +
    //       "&desc=" +
    //       this.config.description +
    //       "&pics=" +
    //       this.config.image +
    //       '&summary="' +
    //       this.config.title +
    //       '"'
    //   );
    // },
    // weibo() {
    //   return (
    //       "https://service.weibo.com/share/share.php?url=" +
    //       this.config.url +
    //       "&title=" +
    //       this.config.title +
    //       "&pic=" +
    //       this.config.image +
    //       "&appkey=" +
    //       this.config.weibokey +
    //       ""
    //   );
    // },
    // wechat() {
    //   return "http://qr.liantu.com/api.php?text=" + this.url;
    // },
  },
  methods: {
    // 将文章转换为二维码链接
    creatQrCode() {
      let that = this
      let qrcode = new QRCode(document.getElementById('logo'), {
        text: that.url, // 需要转换为二维码的内容
        width: 100,
        height: 100,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      })
    },
    // 获取文章详情
    getArticle() {
      let that = this;
      let id = that.$route.params.id;
      this.loading = true;
      that
          .$get("/api/v1/blogs/articles/" + id)
          // .$get("http://127.0.0.1:8000/api/v1/blogs/articleDetail/" + id)
          .then(function (res) {
            that.content = res;
            console.log("get detail success  ",res,res.tags)
            
            if (res.content.pre != null){
              that.pre = res.content.pre
            }
            if (res.content.next != null){
              that.next = res.content.next
            }

            that.config.title = res.title;
            document.title = res.title

            // 往meta 标签里面添加数据
            document.querySelector('meta[name="keywords"]').setAttribute('content', res.title)
            document.querySelector('meta[name="description"]').setAttribute('content', res.summary)
            console.log("add meta data success")
            that.config.description = res.summary;
            if (res.cover) {
              that.config.image = res.cover;
            }
            that.config.source = res.title;
            that.loading = false
            if (res.message_show) {
              that.getMessList();
              console.log("get messages list success!")
            }
            if (res.share_show) {
              setTimeout(() => {
                // that.creatQrCode();
              }, 1000);
            }
          })
          .catch(function (error) {
          });
    },
    // 获取留言列表
    getMessList() {
      let that = this;
      this.load = true;
      that
          .$get("/api/v1/comments/10/commentlist"
          // .$get("http://127.0.0.1:8000/api/v1/comments/10/commentlist"
              // "/apis/message/list?id=" +
              // that.$route.params.id +
              // "&page=" +
              // that.current_page
          )
          .then(function (res) {
            console.log(res);
            that.list = that.list.concat(res);
            that.last_page = 1;
            that.current_page = 1;
            that.load = false;
          })
          .catch(function (error) {
            that.load = false;
          });
    },
    // 提交留言
    submit(comment) {
      this.FormData.message = comment.content;
      this.FormData.ip = comment.ip
      this.FormData.address = comment.address
      if (comment.name) {
        this.FormData.tourist = comment.name;
      }
      if (comment.qq) {
        this.FormData.qq = comment.qq;
      }
      // 使用 vue-router 路由到指定页面，该方式称之为编程式导航
      let that = this;
      this.$post("/apis/message/add", this.FormData)
          .then(function (res) {
            that.getMess();
            that.$message({
              showClose: true,
              message: "评论成功",
              type: "success",
            });
          })
          .catch(function (error) {
          });
    },
    getMess() {
      let that = this;
      that
          .$get("/api/v1/comments/10/commentlist")
          // .$get("http://127.0.0.1:8000/api/v1/comments/10/commentlist")
          .then(function (res) {
            console.log(res)
            that.list = res;
            that.last_page =1;
            // 原来的
            // that.last_page = res.data.last_page;
          })
          .catch(function (error) {
          });
    },
    setClick() {
      if (this.click) return;
      let that = this;
      that
          .$post("/apis/blog/click?", {
            id: that.$route.params.id,
          })
          .then(function (res) {
            that.click = true;
            that.content.click += 1;
          })
          .catch(function (error) {
          });
    },
    next() {
      if (this.current_page < this.last_page) {
        this.current_page++;
        this.getMessList();
      }
    },
  },
  mounted() {
    let that = this
    //  setTimeout(function (){
    //  },1000)
    this.clipboard = new ClipboardJS('.copy-code', {
      target: function (trigger) {
        that.$message({
          showClose: true,
          message: '复制成功',
          type: "success",
        });
        trigger.innerText = '已复制'
        setTimeout(() => {
          trigger.innerText = '复制代码'
          if (window.getSelection) {
            // 获取选中
            var selection = window.getSelection();
            // 清除选中
            selection.removeAllRanges();
          } else if (document.selection && document.selection.empty) {
            // 兼容 IE8 以下，但 IE9+ 以上同样可用
            document.selection.empty();
            // 或使用 clear() 方法
            // document.selection.clear();
          }
        }, 1300)

        //       console.log()
        //       let info=document.querySelector('.blog-info')
        // trigger.nextElementSibling.appendChild(info)
        return trigger.nextElementSibling;
      }
    });
    // document.addEventListener('copy', function (ev) {
    //   console.log(ev)

    // })
  },
  destroyed() {
    this.clipboard.destroy();
    console.log('离开文章')
  },
  created() {
    this.getArticle();
  },
  watch: {
    '$route'(to, from) {
      // 对路由变化作出响应...
      if (to.name == 'BlogContent') {
        // console.log(to.name)
        this.list = []
        this.current_page = 1;
        this.getArticle();
        this.getMessList();
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.container >>> .el-divider__text {
  background-color: #f8f8f8;
}

.content {
  padding: 60px 0 30px 0;

  .container-marked {
    border-radius: 6px;
    background-color #fff
    margin auto;
    max-width: 1320px;
    width: 95%;

    .share {
      display: flex;
      align-items: center;

      a {
        display: inline-block;
        width: 34px;
        height: 34px;
        line-height: 34px;
        text-align: center;
        font-size: 22px;
        margin: 6px;
        border-radius: 50%;
        border: 1px solid;
      }

      .icon-qzone {
        color: #fdbe3d;
        border-color: #fdbe3d;

        &:hover {
          background-color: #fdbe3d;
          color: #fff;
        }
      }

      .icon-qq {
        color: #56b6e7;
        border-color: #56b6e7;

        &:hover {
          background-color: #56b6e7;
          color: #fff;
        }
      }

      .like {
        background-color: var(--main-5);
        color: #fff !important;
      }

      .icon-love {
        width: 50px;
        height: 50px;
        color: var(--main-5);
        border-color: var(--main-5);
        font-size: 24px;

        &:hover {
          background-color: var(--main-5);
          color: #fff;
        }

        p {
          font-size: 16px;
          line-height: 10px;
          font-family: georgia;
          font-weight: bold;
        }
      }

      .icon-weibo {
        color: #ff763b;
        border-color: #ff763b;

        &:hover {
          background-color: #ff763b;
          color: #fff;
        }
      }

      .icon-wechat {
        color: #7bc549;
        border-color: #7bc549;

        &:hover {
          background-color: #7bc549;
          color: #fff;
        }
      }
    }

    .blog-info {
      border-left: 3px solid var(--main-6);
      padding-left: 8px;
      border-radius: 4px;
      margin: 30px 0
    }

    .blog-info p {
      text-align: left;
      color: #4d4d4d;
      font-size: 14px;
      margin: 0;
    }

    .article-prev-next {
      margin: 10px 0;
      overflow hidden
    }

    .article-prev-next i {
      font-weight bold
    }

    .article-prev-next .prev {
      float left
      color #969696
    }

    .article-prev-next .next {
      float right
      color #969696
    }

    .blog-mess {
      padding-bottom: 15px;

      .next {
        text-align: center;
        color: var(--main-5);
        transition: all 0.3s;

        &:hover {
          color: var(--main-6);
        }

        span {
          cursor: pointer;

          .next-icon {
            animation: next 0.6s linear infinite alternate;
          }
        }
      }
    }
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

@media (max-width: 992px) {
  .isimg {
    height: 240px !important;
  }

  .article-title {
    font-size: 22px !important;
  }

  .container-marked {
    width: 100% !important
  }

}
</style>
<style lang="stylus" scoped>
.article-header {
  border-left: 5px solid #4d4d4d;
  padding: 30px 0 15px 25px;
  position: relative;
  color: #4d4d4d;
  overflow: hidden;
  border-radius: 4px;
}

.article-title {
  margin: 10px 0;
  text-align: left;
  font-size: 30px;
  font-weight: 700;
}

.article-title:after {
  display none
}

.article-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  filter: blur(6px);
}

.isimg {
  height: 350px;
  border: none;
  text-align: center;
  padding: 0;
}

.istitle {
  position: absolute;
  width: 90%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  color: #51cacc;

  span {
    color: #51cacc;
  }
}

.archive-article-date {
  color: #999;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  text-align: left;
}

.archive-article-date .icon {
  margin: 5px 5px 5px 0;
}

[class*=' icon-'], [class^=icon-] {
  speak: none;
  font-style: normal;
  font-weight: 400;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

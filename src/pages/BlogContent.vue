<template>
  <!-- <qrcode-vue :value="QrCodeState.url" :size="QrCodeState.size" level="H" v-show="QrCodeState.show" /> -->
  <!-- <qr-code :value="QrCodeState.url" :size="QrCodeState.size" level="H" v-show="QrCodeState.show" id="canvasDom"></qr-code> -->
  <div class="content">

    <el-row class="container-marked">
      <!--      如果正在加载中。。-->
      <new-loading v-if="loading"></new-loading>
      <!--      否则显示内容-->
      <el-col v-else class="blog-content" :span="22" :offset="1">
      <!--        是否显示文章头部-->
        <div v-if="content?content.head_show:false">
          <header class="article-header blog-animation" :class="{isimg:content?content.cover:''}">
            <div
                class="article-img"
                v-if="content?content.cover:''"
                :style="{background: 'url( '+ content.cover +')'+' no-repeat center'}"
            ></div>
            <div :class="{istitle:content?content.cover:''}">
              <h1
                  class="article-title"
              >{{ content?content.title:'' }}</h1>
              <div class="archive-article-date">
              <span>
                <i class="icon iconfont iconshu"></i> 分类:
                <span>{{ content?content.type.name:'' }}</span>
              </span>

                <span>
                <i class="icon iconfont iconbiaoqian1"></i> 标签:
                <span><el-tag
                    v-for="tag in content?content.tags:[]"
                    :key="tag.id"
                    color="rgb(0,0,0,0)"
                    type="info"
                    size="mini"
                    style="margin-left:5px;">
                    {{tag.name}}
                  </el-tag></span>
              </span>
                <span>
                <i class="icon iconfont iconyuedu"></i> 阅读数:
                <span>{{ content?content.total_views:0 }}</span>次
              </span>
                <span>
                <time datetime="2019-11-05T01:10:39.000Z">
                  <i class="iconfont iconriqi icon"></i>
                  {{ content?content.created:"2019-11-05T01:10:39.000Z" }}
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
          <my-marked :dompurify="false" :markedOptions="{breaks:true}" :tocNav="false" v-if="content.content"
                    :initialValue="content?content.content:''"></my-marked>
          <!-- <vue-markdown :source="content.content" v-highlight></vue-markdown> -->
        </div>
      <!-- 版权相关-->
        <div v-if="content?content.copyright_show:false">
          <div class="blog-info a-tag blog-animation">
            <p>
              本文标题:
              <a :href="url">{{ content?content.title:'' }}</a>
            </p>
            <p>
              本文链接:
              <a :href="url">{{ url }}</a>
            </p>
            <p>
              版权所有:
              <a>{{content?content.author.username:'' }}</a>----
              <a
                  rel="license"
                  href="#"
              >转载注明请注明出处!</a>
            </p>
          </div>

        <!--上一页和下一页-->
          <div class="a-tag article-prev-next">
            <router-link :to="'/blog/'+content.pre.id+''" class="prev"  v-if="content?content.pre !=null:false && content?content.id!=content.pre.id:false ">
              <i class="el-icon-back">
                上一篇:{{ content.pre.title }}
              </i>
            </router-link>

            <div class="prev"  v-if="content.pre ==null">
              <i class="el-icon-back">
              </i>没有更多文章了
            </div>  

            <router-link :to="'/blog/'+content.next.id+''" class="next" v-if="content.next !=null && content.id!=content.next.id">
                <i class="el-icon-right">下一篇:{{ content.next.title }}</i>
            </router-link>
            <div class="next"  v-if="content.next==null">
              <i class="el-icon-right">
              </i>没有更多文章了
            </div>              
          </div>
        </div>

      </el-col>

<!--      显示评论-->
      <el-col v-if="content?content.message_show:false" :span="22" :offset="1" class="blog-mess">
        <new-comment @submit="submit" class="blog-animation"></new-comment>
        <a href="javascript:;" name="comment">
          <h2 id="comment" style="margin: 20px 0;">评论（维护中）</h2>
        </a>
        <mess-card @submit="getMess" :list="list" :car="car" v-if="list.length>0 && list !== undefined && list !== null"></mess-card>
        <p class="next">
          <span
              v-loading="load"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="#f8f8f8"
              @click="_next">
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


<script setup lang="ts">
  import NewLoading from "src/components/NewLoading.vue"
  import QrCode from 'src/components/QrCode.vue'
  import MessCard from "src/components/MessCard.vue"
  import NewComment from "src/components/NewComment.vue"
  import MyMarked from 'src/components/MyMarked.vue'
  import {ref,reactive,computed,watch } from "vue"
  import {ArticlesApis} from "src/services/apis/articles"
  import type {Article,ArticleType,updateArticleStatusForm} from "src/services/apis/articles"
  import { useRouter } from 'vue-router'
  import {routerPush} from "src/router"

  const QrCodeState = reactive({
    show:false,
    url:"https://github.com/weridolin",
    size:300
  })

  const router = useRouter()
  const imgSrc =ref("http://q1.qlogo.cn/g?b=qq&nk=1936955617&s=100")
  const content =ref<Article>({
      id: 1,
      author:{      
        last_login:"",
        first_name:"",
        username:"",
        last_name:"",
        email:""
      },
      type: {
        id:1,
        name:"",
        description:""
      },
      tags:[{        
        id:1,
        name:"",
        description:""
      }],
      created: "",
      updated: "",
      next: {
            id: 1,
            title: "",
      },
      pre: {
            id: 1,
            title: "",
      },
      title: "",
      summary: "",
      content: "",
      likes: 1,
      language: "",
      style: "",
      total_views: 1,
      avatar: "",
      cover: "",
      head_show: false,
      copyright_show: false,
      message_show: false
    })
  const list=ref([])
  const page=ref(1)
  const last_page=ref(1)
  const current_page=ref(1)
  const busy=ref(false)
  const car=reactive({
          pattern: true, //留言模式
          left: true, //left模式
        })
  const config =reactive({
          url: window.location.href, // 网址，默认使用 window.location.href
          source: "", // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
          title: "", // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
          description: "", // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
          image: (document.images[0] || 0).src || "", // 图片, 默认取网页中第一个img标签
          wechatQrcodeTitle: "扫一扫：分享", // 微信二维码提示文字
          wechatQrcodeHelper:
              "<p>微信或浏览器，扫一下</p><p>二维码便可查看本文章。</p>",
        })
  const FormData= reactive({
          message: "",
          article_id: router.currentRoute.value.params.id,
  })
  const loading=ref(false)
  const load=ref(false)
  const click=ref(false)
  const clipboard=ref('')
  const pre=reactive({
        id:-1,
        title:"没有更多了"
      })
    
  const next=reactive({
        id:-1,
        title:"没有更多了"
      })

  /************************ method ********************/

    // 将文章转换为二维码链接
    // function creatQrCode() {
    //   let that = this
    //   let qrcode = new QRCode(document.getElementById('logo'), {
    //     text: that.url, // 需要转换为二维码的内容
    //     width: 100,
    //     height: 100,
    //     colorDark: '#000000',
    //     colorLight: '#ffffff',
    //     correctLevel: QRCode.CorrectLevel.H
    //   })
    // }
    // 获取文章详情
    function getArticle() {
      let id:string = router.currentRoute.value.params.id as string
      loading.value = true;
      let res = ArticlesApis.getArticle(parseInt(id),{
        timeout:2*60*1000
      })
      if (res!=undefined){
        res.then(function (res) {
        updateTotalViews() // 更新total_views
        content.value = res as Article;
        console.log("get detail success  ",res)
        
        if (content.value.pre != null){
          pre.id = content.value.pre.id
          pre.title = content.value.pre.title
        }
        if (content.value.next != null){
          next.id = content.value.next.id
          next.title = content.value.next.title
        }

        config.title = content.value.title;
        document.title = content.value.title

        // 往meta 标签里面添加数据
        let kwEle = document.querySelector('meta[name="keywords"]')
        if (kwEle){
          kwEle.setAttribute('content', content.value.title)
        }
        let descEle = document.querySelector('meta[name="description"]')
        if (descEle){
          descEle.setAttribute('content', content.value.summary)
        }        
        console.log("add meta data success")
        config.description = content.value.summary;
        if (content.value.cover) {
          config.image = content.value.cover;
        }
        config.source = content.value.title;
        loading.value = false
        if (content.value.message_show) {
          getMessList();
          console.log("get messages list success!")
        }
        // 文章分享
        // if (content.value.share_show) {
        //   setTimeout(() => {
        //     // that.creatQrCode();
        //   }, 1000);
        // } 
      })
      .catch(function (error) {
        console.log(">>> get article error!",error)
      });
      }
    }
    // 获取留言列表
    function getMessList() {
      // let that = this;
      // this.load = true;
      // that
      //     .$get("/api/v1/comments/10/commentlist"
      //     // .$get("http://127.0.0.1:8000/api/v1/comments/10/commentlist"
      //         // "/apis/message/list?id=" +
      //         // that.$route.params.id +
      //         // "&page=" +
      //         // that.current_page
      //     )
      //     .then(function (res) {
      //       console.log(res);
      //       that.list = that.list.concat(res);
      //       that.last_page = 1;
      //       that.current_page = 1;
      //       that.load = false;
      //     })
      //     .catch(function (error) {
      //       that.load = false;
      //     });
    }
    // 提交留言
    function submit(comment:string) {
      console.log('blog content submit comment',comment)
      // this.FormData.message = comment.content;
      // this.FormData.ip = comment.ip
      // this.FormData.address = comment.address
      // if (comment.name) {
      //   this.FormData.tourist = comment.name;
      // }
      // if (comment.qq) {
      //   this.FormData.qq = comment.qq;
      // }
      // // 使用 vue-router 路由到指定页面，该方式称之为编程式导航
      // let that = this;
      // this.$post("/apis/message/add", this.FormData)
      //     .then(function (res) {
      //       that.getMess();
      //       that.$message({
      //         showClose: true,
      //         message: "评论成功",
      //         type: "success",
      //       });
      //     })
      //     .catch(function (error) {
      //     });
    }
    function getMess() {
      // let that = this;
      // that
      //     .$get("/api/v1/comments/10/commentlist")
      //     // .$get("http://127.0.0.1:8000/api/v1/comments/10/commentlist")
      //     .then(function (res) {
      //       console.log(res)
      //       that.list = res;
      //       that.last_page =1;
      //       // 原来的
      //       // that.last_page = res.data.last_page;
      //     })
      //     .catch(function (error) {
      //     });
    }
    function setClick() {
      // if (click.value) return;
      // let that = this;
      // that
      //     .$post("/apis/blog/click?", {
      //       id: that.$route.params.id,
      //     })
      //     .then(function (res) {
      //       that.click = true;
      //       that.content.click += 1;
      //     })
      //     .catch(function (error) {
      //     });
    }
    function _next() {
      if (current_page.value < last_page.value) {
        current_page.value++;
        getMessList();
      }
    }

    // update total views
    function updateTotalViews(){
        let _total_views = content.value.total_views+1
        console.log(">>><<<",_total_views,content.value.total_views)
        let updateParam:updateArticleStatusForm={
            "id":content.value.id,
            "total_views":_total_views,
            "likes":content.value.likes
        }
        ArticlesApis.updateArticleStatus(updateParam,{
          timeout:2*60*1000,
        }).then(function(res){
          console.log(">>> update total views success",res)
        }).catch(function(err){
          console.log(">>> update total views error",err)
        })
    }
    /******************** computed **************/
    let url = computed(()=>{
      return window.location.href;
    })


    /****************** watch 方法 *********************/
    // watch路由的变化
    watch(() => router.currentRoute.value.name,(name) => {
        //要执行的方法
        console.log(name,"blog Content toPath");
        if (name=="BlogContent") {
          // console.log(to.name)
          list.value = []
          current_page.value = 1;
          getArticle();
          getMessList();
        }
    },{immediate:true,deep:true}
    )


    /***   create 运行方法 ****/
    getArticle()

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

<template>
  <div class="left-col">
    <!-- <div id="fade" class="black_overlay"  @click="closeWindow()"> -->
    <!-- </div> -->
    <!-- <el-dialog customClass="customWidth" title :visible.sync="imgViewDialogVisible" :modal="false">
    <div class="main">
      <img class="img"  :src="imgViewDialog_imgSrc" />
      </div>
  </el-dialog> -->
    <el-scrollbar style="height: 100%">
      <div class="intrude-less">
        <header id="header" class="inner">
          <a href="javascript:;" class="profilepic blog-animation">
            <img v-bind:src="mine_img" alt="Werido" class="js-avatar" />
          </a>
          <hgroup>
            <h1 class="header-author blog-animation">
              <a href="javascript:;"
                ><span
                  style=" color: transparent;
            -webkit-text-stroke: 1px var(--main-6);
            letter-spacing: 0.04em;
            font-weight bold"
                  >Werido</span
                ></a
              >
            </h1>
          </hgroup>
          <nav class="header-menu">
            <div class="class-search blog-animation">
              <el-form>
                <div class="search-wrap">
                  <input
                    class="search-ipt"
                    v-model="search"
                    type="text"
                    placeholder="find something…"
                    @focus="searchInfoShow = true"
                    @blur="closeSearchInfo"
                    @input="searchInfo"
                  />
                  <i
                    class="icon-search icon el-icon-search"
                    @click="searchBtn"
                  ></i>
                </div>
              </el-form>
              <!-- 结果列表 -->
              <!-- <transition name="down"> -->
              <ul
                class="search-info a-tag blog-animation"
                v-show="searchInfoShow && search.length > 0"
              >
                <li v-show="searchList.length == 0">
                  <a href="javascrpt:;">没有查找到请！更换搜索词</a>
                </li>
                <li v-for="item of searchList" :key="item.id">
                  <router-link :to="'/blog/' + item.id">{{
                    item.title
                  }}</router-link>
                </li>
              </ul>
              <!-- </transition> -->
              <ul
                class="hidden-sm-and-down"
                v-loading="loading"
                style="padding: 0; margin: 0"
                ref="class"
              >
                <li class="blog-animation">
                  <router-link to="/blog">文章分类</router-link>
                </li>
                <div class="tag-group">
                  <el-tag
                    v-for="item in this.classList"
                    :key="item.id"
                    :type="getRandomTagType()"
                    @click="clickTag(item.name)"
                    effect="plain">
                    {{ item.name }}
                  </el-tag>
                </div>

                <!-- <li
                  v-for="(item, index) of classList"
                  :key="index"
                  class="articles-tags"
                >
                  <router-link :to="'/blog?class=' + item.classty">{{
                    item.name
                  }}</router-link>
                </li> -->

              </ul>
            </div>
          </nav>
          <nav
            class="blog-animation"
            style="margin: 10px auto; color: var(--main-6); font-weight: bold">总文章数({{ this.count }})
          </nav>
          <!--        <nav class="header-smart-menu blog-animation">-->
          <!--          <router-link to="/index">主页</router-link>-->

          <!--          <router-link to="/message">留言</router-link>-->

          <!--          <router-link to="/link">友链</router-link>-->
          <!--          <router-link to="/route">成长</router-link>-->
          <!--        </nav>-->
          <nav class="header-nav blog-animation">
            <div class="social">
              <a href="https://github.com/weridolin" target="_blank">
                <span class="github" title="github">
                  <i class="iconfont icongithub"></i>
                </span>
              </a>
              <!--              <a class="qq-social">-->
              <!--                <span class="qq"  v-on:click="imgViewDialog_show('qq')">-->
              <!--                    <i title="QQ" class="iconfont iconQQ1"></i>-->
              <!--                </span>-->
              <!--              </a>-->
              <el-popover class="qq" placement="top" width="50" trigger="hover">
                <img
                  style="width: 200px; height: 200px; margin: 0 auto"
                  v-bind:src="qq_img_url"
                />
                <i
                  title="qq"
                  slot="reference"
                  class="iconfont iconQQ1"
                  @click="openWindow('contact_qq')"
                ></i>
              </el-popover>

              <el-popover
                class="weixin"
                placement="top"
                width="50"
                trigger="hover"
              >
                <img
                  style="width: auto; height: auto; margin: 0 auto"
                  v-bind:src="wechat_img_url"
                />
                <i
                  title="微信"
                  slot="reference"
                  class="iconfont iconweixin1"
                  @click="openWindow('contact_weixin')"
                ></i>
              </el-popover>
              <!-- <div class="top_contact_us">
              <i title="qq" slot="reference" class="iconfont iconQQ1" @click="openWindow('contact_qq')"></i> 
              <i title="微信" slot="reference" class="iconfont iconweixin1"  @click="openWindow('contact_weixin')"></i> -->
              <!-- <div class="top_weixin"><a href="#" id="contact_weixin" onclick="openWindow(this)">微信公众号</a></div>   -->
              <!-- <div class="top_qq"><a href="#" id="contact_qq" onclick="openWindow(this)"></a></div>   -->
              <!-- </div> -->

              <!-- <div id="light_qq" class="white_content"> 
                <img v-bind:src=qq_img_url />  -->
              <!-- <i title="qq" slot="reference" class="iconfont iconQQ1"></i>  -->
              <!-- </div> -->
              <!-- <i title="qq" slot="reference" class="iconfont iconQQ1"></i>  -->
              <!-- <div id="light_weixin" class="white_content">  
                <img v-bind:src=wechat_img_url />   -->
              <!-- <i title="微信" slot="reference" class="iconfont iconweixin1"></i> -->
              <!-- </div> -->
              <!-- <i title="微信" slot="reference" class="iconfont iconweixin1"></i> -->
              <!-- <div id="fade" class="black_overlay"  onClick="closeWindow()">
            </div> -->
              <!--            <span class="weibo" title="微博">-->
              <!--              <i class="iconfont icontubiaozhizuo-"></i>-->
              <!--            </span>-->
            </div>

            <!-- <div class="hidden-sm-and-down">
            <labels class="reveal-bottom"></labels>
          </div> -->

            <img
              class="blog-animation"
              style="
                width: 100%;
                margin: 10px 0;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
              "
              v-bind:src="blog_animation_url"
            />
          </nav>
        </header>
      </div>
    </el-scrollbar>
  </div>
</template>
<script>
// import "element-ui/lib/theme-chalk/display.css";
// import Labels from "./Labels";
export default {
  name: "BlogLeft",
  components: {
    // Labels,
  },
  props:{
      count:Number,
  },
  data() {
    return {
      classList: [], //文章类型列表
      searchList: [], //文章标签类别
      isLoading: true, //是否
      searchInfoShow: false, //搜索结果栏是否显示,
      search: "",
      // count: 0,
      loading: false,
      mine_img: require("@/assets/mine.jpg"),
      wechat_img_url: require("@/assets/wechat.png"),
      qq_img_url: require("@/assets/qq.jpg"),
      blog_animation_url: require("@/assets/fight.jpg"),
      imgViewDialogVisible: false, // 控制dialog显示隐藏
      // imgViewDialog_imgSrc: , // 控制图片src


    };
  },
  mounted() {

  },
  computed: {

  },
  methods: {
    getRandomTagType:function(){
      var items = ['success','info','danger','warning',''];
      console.log("types",items[Math.floor(Math.random()*items.length)])
      return items[Math.floor(Math.random()*items.length)];
      
    },
    openWindow(obj) {
      var qq_or_weixin = "light_qq";
      switch (obj) {
        case "contact_weixin":
          qq_or_weixin = "light_weixin";
          break;

        case "contact_qq":
          qq_or_weixin = "light_qq";
          break;
      }
      document.getElementById(qq_or_weixin).style.display = "block";
      document.getElementById("fade").style.display = "block";
    },
    // closeWindow(){
    //     document.getElementById('light_weixin').style.display='none';
    //     document.getElementById('light_qq').style.display='none';
    //     document.getElementById('fade').style.display='none';
    // },
    // 搜索栏失去焦点一秒钟后隐藏
    closeSearchInfo() {
      let that = this;
      setTimeout(function () {
        that.searchInfoShow = false;
      }, 500);
    },
    clickTag(tagName){
      if (tagName) {
        this.$router.push({
          path: "/blog",
          query: {
            type: tagName,
          },
        });
      }
    },
    // 点击搜索
    searchBtn() {
      if (this.search.length > 0 && this.$route.query.search != this.search) {
        this.$router.push({
          path: "/blog",
          query: {
            title: this.search,
          },
        })

      }else{
        this.$router.push({
          path: "/blog",
          query: {
        
          },
        })
      }
    },
    // 搜索栏实时结果显示
    searchInfo() {
      let that = this;
      if (this.search.length > 0) {
        that
          .$get("/api/v1/blogs/search?title=" + that.search)
          .then(function (res) {
            console.log(res);
            that.searchList = res;
          })
          .catch(function (error) {});
      }
    },
    // 获取文章类型
    getClass() {
      let that = this;
      that
        .$get("/api/v1/blogs/types")
        .then(function (res) {
          console.log(">>> tags", res);
          that.classList = res;
          console.log("list", that.classList);
          if (that.$route.query.class) {
            for (let i = 0; i < that.classList.length; i++) {
              console.log(i);
              if (that.$route.query.class == that.classList[i].classty) {
                that.classItemTop = that.classItem = (i + 1) * 41;
                break;
              }
            }
          }
        })
        .catch(function (error) {});
    },
    // getInfo() {
    //   let that = this;
    //   this.loading = true;
    //   that
    //     .$get("/api/v1/blogs/articleCount")
    //     // $get("http://127.0.0.1:8000/api/v1/blogs/articleCount")
    //     .then(function (res) {
    //       console.log(res);
    //       that.count = res.count;
    //       console.log(">>>>articles-count", res.data);
    //       that.loading = false;
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //       that.loading = false;
    //     });
    // },

    imgViewDialog_show: function (type) {
      this.imgViewDialogVisible = true;
      switch (type) {
        case "qq":
          this.imgViewDialog_imgSrc = require("@/assets/qq.jpg");
          break;
        case "wechat":
          this.imgViewDialog_imgSrc = require("@/assets/wechat.png");
          break;
      }
    },
    /**
     * 图片dialog_关闭
     */
    imgViewDialog_close: function () {
      this.imgViewDialogVisible = false;
      var self = this;
      setTimeout(function () {
        self.imgViewDialog_imgSrc = "";
      }, 100);
    },
  },
  created() {
    // this.getInfo();
    this.getClass();
 
  },

};
</script>
<style lang="stylus" scoped>
@import '~@/assets/style/home.styl'

.el-tag {
  margin-left: 10px;
  cursor:pointer//鼠标悬浮变"手"
}

.class-search {
  position: relative;

  .el-input-group__append {
    padding: 0;
  }

  .articles-tags::hover {
    cursor: w-resize;
    background-color: green;
  }

  .search-info {
    transition: all 0.5s;
    width: 100%;
    position: absolute;
    left: 0;
    border-radius: 5px;
    padding: 5px 3px;
    box-sizing: border-box;
    margin: 0;
    background-color: #fff;
    z-index: 20;
    box-shadow: 8px 14px 38px rgba(231, 238, 239, 0.99);

    li {
      width: 100%;

      a {
        min-width: 50px !important;
        display: block;
        ellipsis();
        height: 25px;
        line-height: 25px;
        text-align: left;
        border-bottom: 1px dashed rgba(204, 204, 204, 0.278);
      }
    }
  }
}

@media (max-width: 992px) {
  .left-col {
    position: relative !important;
    width: 100% !important;
    min-height: 500px !important;
    top: 0 !important;
  }
}
</style>
<style lang="stylus" scoped>
#header .header-nav .social {
  margin-top: 10px;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.search-wrap {
  width: 100%;
  position: relative;
}

.search-wrap .search-ipt {
  width: 100%;
  color: var(--main-6);
  background: none;
  border: none;
  border-bottom: 2px solid var(--main-1);
  font-family: Roboto, serif;
  font-size: 1rem;
  line-height: 1.75;
}

.search-wrap .icon {
  position: absolute;
  right: 0;
  top: 7px;
  color: var(--main-4);
  cursor: pointer;
}

.left-col {
  position: fixed;
  top: 60px;
  bottom: 0px;
  left: 0px;
  background: #fff;
  width: 25%;
  min-width: 200px;
  transition: all 0.2s ease-in;
}

.left-col .overlay {
  width: 100%;
  height: 100%;
  position: absolute;
}

.overlay img {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 100px;
}

.left-col .intrude-less {
  width: 76%;
  text-align: center;
  margin: 0px auto;
  padding-top: 15px;
  position: relative;
}

.left-col #header {
  width: 100%;
  height: 100%;
  position: relative;
  border-bottom: 1px solid color-border;
  overflow: visible;
}

.left-col #header a {
  color: #696969;
}

.left-col #header a:hover {
  color: #b0a0aa;
}

.left-col #header .header-subtitle {
  text-align: center;
  color: #999;
  font-size: 14px;
  line-height: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.left-col #header .header-menu {
  font-weight: 300;
  line-height: 31px;
  float: none;
  text-align: center;
}

.left-col #header .header-menu li {
  cursor: default;
}

.left-col #header .header-menu li a {
  font-size: 14px;
  min-width: 300px;
}

.left-col #header .header-smart-menu {
  font-size: 12px;
  margin-bottom: 10px;
  margin-top: 10px;
}

.left-col #header .header-smart-menu a:after {
  content: '/';
}

.left-col #header .header-smart-menu a:last-child:after {
  content: '';
}

.left-col #header .profilepic {
  display: block;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  background: #fff;
  text-align: center;
  border: 6px solid var(--main-6);
  padding: 2px;
  box-sizing: border-box;
}

.left-col #header .profilepic img {
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 50%;
  transition: transform 1s ease-out;
}

.left-col #header .profilepic img.show {
  width: 100%;
  height: 100%;
  opacity: 1;
}

.left-col #header .profilepic img:hover {
  transform: rotate(1turn);
}

.left-col #header .header-author {
  text-align: center;
  margin: 0.67em 0;
  font-family: Roboto, serif;
  font-size: 30px;
  transition: 0.3s;
}

#header .header-nav {
  width: 100%;
  transition: transform 0.3s ease-in;
  padding-bottom: 20px;
}

#header .header-nav .social {
  margin-top: 10px;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

#header .header-nav .social span {
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
  zoom: 1;
  margin: 0 8px 15px;
  transition: 0.3s;
  text-align: center;
  color: #fff;
  opacity: 0.7;
  width: 28px;
  height: 28px;
  line-height: 26px;
}

#header .header-nav .social span:hover {
  opacity: 1;
}

#header .header-nav .social span.weibo {
  background: #aaf;
  border: 1px solid #aaf;
}

#header .header-nav .social span.weibo:hover {
  border: 1px solid #aaf;
}

#header .header-nav .social span.github {
  background: #afb6ca;
  border: 1px solid #afb6ca;
}

#header .header-nav .social span.github:hover {
  border: 1px solid #909ab6;
}

#header .header-nav .social span.weixin {
  background: #4caf50;
  border: 1px solid #4caf50;
}

#header .header-nav .social span.weixin:hover {
  border: 1px solid #4caf50;
}

#header .header-nav .social span.qq {
  background: #34baad;
  border: 1px solid #34baad;
}

#header .header-nav .social span.qq:hover {
  border: 1px solid #34baad;
}

#header .header-nav .social span.gitee {
  background: #c71d23;
  border: 1px solid #c71d23;
}

#header .header-nav .social span.gitee:hover {
  border: 1px solid #c71d23;
}

#header .header-nav .social .white_content {
  border-radius: 20px;
  display: none;
  position: absolute;
  top: 30%;
  left: 40%;
  background-color: #FFFFFF;
  z-index: 1002;
  /* 数字的大小指明了div的相对层，数字大的在上层 */
  overflow: auto;
}

.black_overlay {
  display: none;
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  background-color: #00C0A5;
  z-index: 1001;
  -moz-opacity: 0.8;
  opacity: 0.8;
}

.down-enter-active {
  transition: all 0.4s ease;
}

.down-leave-active {
  transition: all 0.4s ease;
}

.down-enter, .down-leave-to {
  transform: translateY(10%);
  opacity: 0.5;
}

.customWidth {
  height: 100%;
  width: 100%;
}
</style>

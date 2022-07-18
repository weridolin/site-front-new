<template>

  <el-dialog v-model="wechatVisible" width="10%" title="打开微信扫一扫😁">
    <el-image :src="wechat_img_url" fit="cover"></el-image>
  </el-dialog>
    <el-dialog v-model="qqVisible" width="10%" title="打开QQ扫一扫😁">
      <el-image :src="qq_img_url" fit="cover"></el-image>
  </el-dialog>
  <div class="left-col">
    <el-scrollbar style="height: 100%">

      <div class="intrude-less">
        <header id="header" class="inner">
          <div class="avatar">
              <!-- <img v-bind:src="mine_img" alt="Werido" class="js-avatar" /> -->
            <el-avatar :src="mine_img" size='large'/>
          </div>
          <hgroup>
            <h1 class="header-author blog-animation">
              <a href="javascript:;"
                ><span
                  style="
                  -webkit-text-stroke: 1px #51cacc;
                  font-size: 20px;
                  letter-spacing: 0.04em;
                  font-weight bold"
                  >林叔叔是个怪蜀黍</span
                ></a
              >
            </h1>
          </hgroup>
          <nav class="header-menu">
            <div class="class-search blog-animation">
              <el-form>
                <div class="search-wrap">
                    <el-input
                      v-model="search"
                      class="w-50 m-2"
                      placeholder="输入标题搜索文章..."
                      :suffix-icon="Search"
                      @focus="searchInfoShow = true"
                      @blur="closeSearchInfo"
                      @input="searchInfo"
                    />
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
                <li class="blog-animation" style="list-style:none">
                    <el-divider >文章分类</el-divider>
                  <!-- <router-link to="/blog">文章分类</router-link> -->
                </li>
                <div class="tag-group">
                  <el-tag
                    v-for="item in classList"
                    :key="item.id"
                    :type="getRandomTagType()"
                    @click="clickTag(item.name)"
                    round
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
          <nav >
            <el-row class="society" align="middle">

              <el-button type="info"  class="iconfont icongithub" circle @click="openWindow('https://github.com/weridolin')"/>
        
              <el-button type="success" class="iconfont iconweixin1" circle @click="wechatVisible=true" />
              <el-button type="primary" class="iconfont iconQQ1"  circle  @click="qqVisible=true" />
            </el-row>
          </nav>
          <nav class="header-nav blog-animation">
            <img
              class="blog-animation"
              style="
                width: 100%;
                /* margin: 10px 0; */
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);"
              v-bind:src="blog_animation_url"
            />
          </nav>
        </header>
      </div>
    </el-scrollbar>
  </div>
</template>



<script setup lang="ts">
  import { ref,reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import {ArticlesApis} from "src/services/apis/articles"
  import type {Article,ArticleType} from "src/services/apis/articles"
  import { Search} from '@element-plus/icons-vue'


  const classList = ref<ArticleType[]>([]) //文章类型列表
  const searchList=ref<Article[]>([]) //文章标签类别
  const isLoading=ref(true) //是否
  const searchInfoShow =ref(false)//搜索结果栏是否显示,
  const search=ref("")
  const loading=ref(false)
  const mine_img="src/assets/mine.png"
  const wechat_img_url="src/assets/wechat.png"
  const qq_img_url="src/assets/qq.jpg"
  const blog_animation_url="src/assets/fight.jpg"
  const imgViewDialogVisible=ref(false)// 控制dialog显示隐藏
  const imgViewDialog_imgSrc = ref("")
  const router = useRouter()
  const count = ref(0) //文章总数
  const wechatVisible =ref(false) //是否显示微信二维码
  const qqVisible =ref(false) //是否显示qq二维码


  function openWindow(url:string){
    window.open(url, '_blank')
  }

  function openSocietyDialog(_type:string){
    if (_type=="qq"){

    }else if(_type=="wechat"){

    }
  }

  function getRandomTagType(){
      var items = ['success','info','danger','warning',''];
      console.log("types",items[Math.floor(Math.random()*items.length)])
      return items[Math.floor(Math.random()*items.length)];
    }

    // 搜索栏失去焦点一秒钟后隐藏
  function  closeSearchInfo() {
      setTimeout(function () {
        searchInfoShow.value = false;
      }, 500);
    }

  function clickTag(tagName:string){
      if (tagName) {
        router.push({
          path: "/blog",
          query: {
            type: tagName,
          },
        });
      }
    }



  // 点击搜索

  function  searchBtn() {
      if (search.value.length > 0 && router.currentRoute.value.query.sreach != search.value) {
          router.push({
            path: "/blog",
            query: {
              title:search.value,
          },
        })

      }else{
        router.push({
          path: "/blog",
          query: {
          },
        })
      }
    }

    // 搜索栏实时结果显示
  function searchInfo() {
      console.log(">>> search articles")
      ArticlesApis.search({
        params:{
          "title":search.value
        }
      }).then(function(res){
        console.log(">>> search article",res)
        searchList.value=res.data
      }).catch(function(error){
        console.log(">>> search error",error)
      })
    }
    // 获取文章类型
  function getClass() {
      ArticlesApis.getArticleTags({
        }
      ).then(function(res){
        classList.value = res
        console.log(">>> get articles class",classList.value)
        // if (router.)
      }).catch(function(err){
        console.log(">>> 获取文章类型出错",err)
      })
  }

  // created 时运行
  getClass()

  // 获取文章总数
  ArticlesApis.getArticleCount({}).then(function(res){
    count.value = res.data.count
  }).catch(function(err){
    console.log(">>> get articles error",err)
  })

</script>


<style lang="stylus" scoped>

.el-tag {
  margin-left: 10px;
  cursor:pointer//鼠标悬浮变"手"
}
.blog-animation {
  padding-top: 5%;
}
.society {
  padding-top: 10%;
  justify-content: center;

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
  padding-top: 15%;
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

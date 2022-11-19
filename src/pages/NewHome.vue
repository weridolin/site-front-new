<template>
  <div class="home">
    <blog-info :count="count"></blog-info>
    <div class="blog-right">
      <div v-if="loading">
        <new-loading v-for="item of 6" :key="item"></new-loading>
      </div>
      <blog-list v-else :list="list"></blog-list>
      <el-pagination
        v-if="list.length > 0"
        :background="true"
        layout="prev, pager, next"
        :page-count="last_page"
        :current-page="current_page"
        @current-change="getList"
        style="
          width: 100%;
          display: flex;
          justify-content: center;
          margin-bottom: 10px;
          flex-wrap: wrap;
        "
      >
      </el-pagination>
      <index-footer class="index-foot"></index-footer>
    </div>
  </div>
</template>
<script setup lang="ts">
  import BlogInfo from "src/components/BlogInfo.vue";
  import BlogList from "src/components/BlogList.vue";
  import IndexFooter from "src/pages/IndexFooter.vue";
  import {ElNotification} from 'element-plus';
  import NewLoading from "src/components/NewLoading.vue";
  import {ref,watch} from "vue"
  import { useRouter } from 'vue-router'
  import {ArticlesApis} from "src/services/apis/articles"
  import type {Article} from "src/services/apis/articles"

  const  current_page=ref(1) //当前页
  const  last_page=ref(1) //最后一页
  const  list=ref<Article[]>([]) //文章数据
  const  loading=ref(true)
  const  count=ref(0) //文章总数
  const  router = useRouter()



      // 标签点击查询跳转
  function change(item:string) {
        console.log(item);
        current_page.value = 1;
        router.push({
          path: "/blog",
          query: {
            label: item,
          },
        });
      }
  
    // 分页获取，防止刷新丢失
  function  getList(page:number) {
      console.log(page);
      current_page.value = page;
      let type = {};
      if (router.currentRoute.value.query.label) {
        type = {
          page: page,
          label: router.currentRoute.value.query.label,
        };
      } else if (router.currentRoute.value.query.type) {
        type = {
          page: page,
          type: router.currentRoute.value.query.type,
        };
      } else if (router.currentRoute.value.query.title) {
        type = {
          page: page,
          title: router.currentRoute.value.query.title,
        };
      } else {
        type = {
          page: page,
        };
      }
      console.log(">>> push router",type)
      router.push({
        query: type,
      });
  }


  function getArticle() {
      current_page.value = router.currentRoute.value.query.page? parseInt(router.currentRoute.value.query.page.toString()): 1;
      let type = {};
      if (router.currentRoute.value.query.label) {
        type = {"label":router.currentRoute.value.query.label};
      } else if (router.currentRoute.value.query.type) {
        type = {"type" :router.currentRoute.value.query.type};
      } else if (router.currentRoute.value.query.title) {
        type = {"title" : router.currentRoute.value.query.title};
      }
      loading.value = true;
      ArticlesApis.getArticles({
        params:{
          page:current_page.value,
          ...type
        }
      }).then(function(res){
          list.value = res.results
          loading.value= false
          last_page.value=res.last_page
          count.value = res.count
      }).catch(function(err){
        console.log(">>> get articles error",err)
        ElNotification.error({
                      title: '请求错误 ',
                      message: err.message,
        })
      })
  }

    watch(() => router.currentRoute.value.path,(toPath) => {
            //要执行的方法
            console.log(toPath,"toPath");
          if (toPath=="NewHome") {
            getArticle();
          }
    })

    getArticle()
</script>


<style lang="stylus" scoped>
.home-blog {
  .nav-top {
    color: #515151 !important;
  }

  .nav-no-quiet {
    // backdrop-filter: blur(6px);
    box-shadow: 0px 10px 20px 4px rgba(195, 199, 199, 0.4);
    background-color: rgba(255, 255, 255, 0.85);
    color: #515151;
  }
}

.home {
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: var(--main-4);
  }

  .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li {
    border-radius: 20px;
    font-weight: 900;
    background-color: #fff;

    &:hover {
      color: var(--main-6);
    }
  }
}

.home {
  margin-top: 60px;
  overflow-x: hidden;
  background-color: #f8f8f8;

  .blog-right {
    margin-left: 25%;

    .index-foot {
      margin: 0 10px;
    }
  }
}

@media (max-width: 992px) {
  .blog-right {
    margin-left: 0 !important;
  }

  .index-foot {
    margin: 0 !important;
  }
}
</style>

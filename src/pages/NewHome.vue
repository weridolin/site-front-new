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
<script>
import BlogInfo from "src/components/BlogInfo.vue";
import BlogList from "src/components/BlogList.vue";
import IndexFooter from "src/pages/IndexFooter.vue";
import {ElNotification} from 'element-plus';
import NewLoading from "src/components/NewLoading.vue";
export default {
  name: "NewHome",
  components: {
    BlogInfo,
    BlogList,
    IndexFooter,
    NewLoading,
  },
  data() {
    return {
      current_page: 1, //当前页
      last_page: 1, //最后一页
      list: [], //文章数据
      loading: true,
      count:0, //文章总数
    };
  },
  methods: {
    // 标签点击查询跳转
    change(item) {
      console.log(item);
      this.current_page = 1;
      this.$router.push({
        path: "/blog",
        query: {
          label: item,
        },
      });
    },
    // 分页获取，防止刷新丢失
    getList(page) {
      console.log(page);
      this.current_page = page;
      let type = {};
      if (this.$route.query.label) {
        type = {
          page: page,
          label: this.$route.query.label,
        };
      } else if (this.$route.query.type) {
        type = {
          page: page,
          type: this.$route.query.type,
        };
      } else if (this.$route.query.title) {
        type = {
          page: page,
          title: this.$route.query.title,
        };
      } else {
        type = {
          page: page,
        };
      }
      this.$router.push({
        query: type,
      });
    },
    // 共有访问，根据地址栏参数，获取文章，
    async getArticle() {
      this.current_page = this.$route.query.page
        ? parseInt(this.$route.query.page)
        : 1;
      // this.isLoading=true
      let that = this;
      let type = "";
      if (this.$route.query.label) {
        type = "&label=" + this.$route.query.label;
      } else if (this.$route.query.type) {
        type = "&type=" + this.$route.query.type;
      } else if (this.$route.query.title) {
        type = "&title=" + this.$route.query.title;
      }
      this.loading = true;
      that  
        .$get("/api/v1/blogs/articles?page=" + that.current_page + type)
        .then(function (res) {  
          if (res.data.length != 0) {
            console.log(" >>> get articles list",res.data)
            that.list = res.data;
            that.loading = false;
            // that.current_page = res.data.current_page;
            that.last_page = res.last_page;
            that.count = res.count
            console.info("now page ",that.current_page,"last_page",that.last_page)

          } else {
            ElNotification.error({
                    title: '错误提示 ',
                    message: '未检索到对应文章',
                });
            // window.location.reload();
            console.log('未检索到文章！');     
          }
        })
        .catch(function (error) {
          console.log("get articles error::", error.message);
          ElNotification.error({
                    title: '请求错误 ',
                    message: error.message,
          })
        });
    },
  },

  created() {
    this.getArticle();
  },
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
      if (to.name == "NewHome") {
        console.log(to.name);
        this.getArticle();
      }
    },
  },
};
</script>
<style lang="stylus" scoped>
.home-blog>>> {
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

.home>>> {
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

<template>
  <div class="nav-top" :style="quiet ? navQuiet.navNoQuiet : navQuiet.navQuiet">
    <nav class="nav-container">

          <div class="navbar-header-werido">
            <!-- 确保无论是宽屏还是窄屏，navbar-brand都显示 -->
                  <!-- <router-link to="/"  class="navbar-brand">
                      werido
                  </router-link> -->

        <!-- 屏幕宽度小于768px时，div.navbar-responsive-collapse容器里的内容都会隐藏，显示icon-bar图标，当点击icon-bar图标时，再展开。屏幕大于768px时，默认显示。 -->
            <div
              class="navbar-toggler"
              :class="{ change: isShow }"
              @click="toggleMenu"
            >
              <div class="bar1"></div>
              <div class="bar2"></div>
              <div class="bar3"></div>
            </div>

            
            <!-- 导航栏 -->
            <div
              v-show="isShow"
              class="navbar-collapse blog-animation"
              @click="toggleMenu()"
            >

              <div class="nav_header navbar-nav_header">
                <XRouteLink
                  v-for="item of list"
                  :key="item.id"
                  :class="{ active: $route.path == item.link }"
                  :to="item.link"
                  ><div>{{ item.tag }}</div></XRouteLink
                >
              </div>
              
          </div>

          <!-- <div>
            <el-avatar shape="square" :size="size" :src="squareUrl"></el-avatar>
          </div> -->
          </div>
    </nav>
  </div>
</template>
<script>
import { mapState } from "vuex";
import  XRouteLink from "src/components/XRouteLink.vue"

export default {
  name: "NewHeader",
  components:{
    XRouteLink
  },
  data() {
    return {
      url: "https://p.pstatp.com/origin/febd000185ec2da4425e",
      screenWidth: document.body.clientWidth,
      navQuiet: {},
      quiet: false,
      isShow: false,
      acitve: "/",
      // userInfo:this.$store.state.user,
      welcome: "Hello!欢迎登录哦！",
      // down:false,
      list: [
        {
          id: "0",
          tag: "主页",
          link: "/",
        },
        // {
        //   id: "1",
        //   tag: "文章",
        //   link: "/blog",
        // },
        {
          id: "1",
          tag: "文章",
          link: "https://weridolin.github.io/#/",
        },
        {
          id: "2",
          tag: "留言",
          link: "/home/message",
        },
        {
          id: "4",
          tag: "友链",
          link: "/home/link",
        },
        {
          id: "5",
          tag: "更新轨迹",
          link: "/home/route",
        },
        {
          id: "6",
          tag: "疯狂实验室",
          link: "/lab",
        },
        // {
        //   id: "7",
        //   tag: "文件中转站",
        //   link: "/fileBroker",
        // },
        // {
        //   id: "8",
        //   tag: "数据生成器",
        //   link: "/dataFaker",
        // },
      ],
      success: [
        {
          id: "1",
          tag: "个人信息",
          link: "/user/info",
        },
        {
          id: "2",
          tag: "我的留言",
          link: "/user/message",
        },
        {
          id: "3",
          tag: "发表文章",
          link: "/user/add",
        },
        {
          id: "4",
          tag: "系统消息",
          link: "/user/sysmess",
        },
        // {
        // id:'5',
        // tag:'退出登录',
        // link:'/user/sign'
        // }
      ],
      failure: [
        {
          id: "1",
          tag: "登录",
          link: "/login",
        },
        {
          id: "2",
          tag: "注册",
          link: "/sign",
        },
      ],
    };
  },
  computed: {
    ...mapState(["token"]),
    isToken() {
      return this.$store.state.user.token.length == 0
        ? this.failure
        : this.success;
    },
    userInfo() {
      return this.$store.state.user.user;
    },
  },
  methods: {
    toggleMenu() {
      this.isShow = !this.isShow;
      const route = document.getElementsByClassName("route-content")[0];
      if (this.isShow) {
        route.classList.add("route-filter");
      } else {
        route.classList.remove("route-filter");
      }
    },
    logOut() {
      this.$store.dispatch("logOut");
      this.$router.push("/login");
      this.$message({
        showClose: true,
        message: "退出成功",
        type: "success",
      });
    },
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // console.log(scrollTop)
      if (scrollTop >= 100) {
        this.quiet = true;
      } else {
        this.quiet = false;
      }
    },
  },
  watch: {
    $route(to, from) {      
      // 对路由变化作出响应...
      if (to.meta){
        this.navQuiet = to.meta.nav;
        console.log("nav", to,from);
      }

      // if(to.name=='NewHome'){
      //     console.log(to.name)
      //     this.getArticle()
      // }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    //  console.log(this.$route.path)
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll); // 离开页面 关闭监听 不然会报错
  },
};
</script>
<style lang="stylus" scoped>
@import '../assets/style/home.styl'

.nav-quiet {
  color: #fff;
}

.nav-no-quiet {
  // backdrop-filter: blur(6px);
  box-shadow: 0px 10px 20px 4px rgba(195, 199, 199, 0.4);
  background-color: rgba(255, 255, 255, 0.85);
  color: #515151;
}

    .navbar-header-werido {
      width: 100%;
      display: flex;
      flex-flow: row wrap;
      justify-content: flex-end;
      align-items: center;
      margin:10px -5%;

      .navbar-brand {
        display: flex;
        width: 110px;
        height: 40px;
        // background: url('~@/assets/logo.svg') no-repeat;
        text-indent: -9999rem;
        margin: 10px 0;
        text-decoration: none;
        flex-shrink: 0;

        .navbar-logo {
          height: 50px;
          margin: 5px;
        }
      }
    }

.nav-top {
  width: 100%;
  z-index: 100;
  position: fixed;
  top: 0px;
  transition: background 0.8s;

  nav {
    height: 80px;
    z-index: 50;
    display: flex;
    justify-self: flex-start;
    align-itme: center;
    position: relative;

    // .navbar-header-werido {
    //   width: 100%;
    //   display: flex;
    //   flex-flow: row wrap;
    //   justify-content: flex-start;
    //   align-items: center;

    //   .navbar-brand {
    //     display: flex;
    //     width: 110px;
    //     height: 40px;
    //     // background: url('~@/assets/logo.svg') no-repeat;
    //     text-indent: -9999rem;
    //     margin: 10px 0;
    //     text-decoration: none;
    //     flex-shrink: 0;

    //     .navbar-logo {
    //       height: 50px;
    //       margin: 5px;
    //     }
    //   }
    // }

    .user-info {
      position: relative;

      .user {
        width: 100px;
        height: 40px;
        padding: 4px 0;
        position: absolute;
        top: 50%;
        left: -100px;
        padding-right: 10px;
        display: inline-block;
        box-sizing: border-box;
        transform: translateY(-50%);

        p {
          height: 20px;
          font-size: 12px;
          line-height: 16px;
          margin: 0;
          text-align: right;
          ellipsis();
        }
      }
    }

    .userAvatar {
      margin: 10px 20px;
    }

    .navbar-toggler {
      display: none;
      cursor: pointer;
      width: 25px;
      height: 25px;
      margin: 17.5px 20px;
      transform: scale(1.1);

      .bar1, .bar2, .bar3 {
        width: 25px;
        height: 4px;
        background-color: #838687;
        margin: 4px 0;
        transition: 0.4s;
        border-radius: 4px;
      }
    }

    .change .bar1 {
      transform: rotate(45deg) translate(4px, 7.2px);
    }

    .change .bar2 {
      opacity: 0;
    }

    .change .bar3 {
      transform: rotate(-45deg) translate(4px, -7.2px);
    }

    .navbar-nav_header a {
      color: inherit;
      display: inline-block;
      height: 100%;
      width: 90px;
      margin: 0 5px;
      text-align: center;
      line-height: 60px;
      position: relative;
      transition: all 0.3s;
    }

    .nav_header {
      padding: 0;

      .active:before, .active:after {
        position: absolute;
        content: '';
        top: 0;
        right: 0;
        height: 2px;
        width: 100%;
        background-image: linear-gradient(270deg, var(--main-8), var(--main-6));
      }

      .active:after {
        right: inherit;
        top: inherit;
        left: 0;
        bottom: 0;
      }
    }

    .navbar-nav_header a:hover:before, .navbar-nav_header a:hover:after {
      width: 100%;
      transition: all 600ms ease;
      background-image: linear-gradient(270deg, var(--main-8), var(--main-6));
    }

    .navbar-nav_header a:before, .navbar-nav_header a:after {
      position: absolute;
      content: '';
      top: 0;
      right: 0;
      height: 2px;
      width: 0;
      transition: all 400ms ease;
    }

    .navbar-nav_header a:after {
      right: inherit;
      top: inherit;
      left: 0;
      bottom: 0;
    }

    .navbar-nav_header a:hover {
      cursor: pointer;
      routeHover();
    }
  }

  @media (min-width: 850px) {
    nav, .navbar-collapse {
      display: block !important;
    }
  }

  @media (max-width: 850px) {
    nav {
      display: block;

      .navbar-logo {
        height: 44px !important;
        margin: 8px 5px !important;
      }

      .userAvatar {
        margin: 0;
      }

      .navbar-toggler {
        display: block;
      }

      .navbar-collapse {
        position: relative;
        top: 0px;
        z-index: 999;
        border-bottom: 1px solid #ccc;
        border-bottom-right-radius: 8px;
        border-bottom-left-radius: 8px;
        animation-duration: 0.1s;
        height: 100vh;

        .nav {
          backdrop-filter: blur(5px);
          background-color: rgba(255, 255, 255, 0.46);
          background-image: url('https://p.pstatp.com/origin/fee20001bfd4da833005'); // p.pstatp.com/origin/fee20001bfd4da833005);
          background-repeat: no-repeat;
          background-position: right;
          background-size: contain;
        }
      }

      .navbar-collapse a {
        width: 100%;
        text-align: center;
        background-color: rgba(158, 158, 158, 0.46);
      }

      .navbar-nav_header a {
        margin: 0;
      }
    }
  }
}

.user {
  width: 100%;
  height: 30px;
  text-align: center;
  line-height: 30px;
}

.user:hover {
  cursor: pointer;
  routeHover();
}

.active {
  acitve();
}
</style>

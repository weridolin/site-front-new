import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import type { RouteParams, RouteRecordRaw } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useAuthStore } from "src/store/user";
import type { Menu } from "src/services/apis/auth";
import { ElMessage } from "element-plus";

NProgress.inc(0.2);
NProgress.configure({ easing: "ease", speed: 500, showSpinner: false });

export type AppRouteNames =
  | "Index"
  | "NewHome"
  | "oauth"
  | "BlogContent"
  | "Link"
  | "fileBroker"
  | "alinLab"
  | "Drug"
  | "Message"
  | "GrowthRoute"
  | "third_shortUrl"
  | "login"
  | string;

const name = "werido";

export const nav = {
  navNoQuiet: {
    boxShadow: " 0px 10px 20px 4px  rgba(195,199, 199,0.4)",
    backgroundColor: "#fff",
    color: "rgba(0,0,0,.5)",
  },
  navQuiet: {
    color: "#fff",
  },
};
export const nav1 = {
  navNoQuiet: {
    boxShadow: " 0px 10px 20px 4px  rgba(195,199, 199,0.4)",
    backgroundColor: "#fff",
    color: "rgba(0,0,0,.5)",
  },
  navQuiet: {
    backgroundColor: "#fff",
    color: "rgba(0,0,0,.5)",
  },
};

export const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/Login.vue"),
    meta: {
      keepAlive: false, // 需要被缓存
      title: "登录",
      nav: nav1,
      footer: true,
      header: false,
      requireAuth: false,
    },
  },
  {
    path: "/",
    redirect: (to) => {
      // 方法接收目标路由作为参数
      // return 重定向的字符串路径/路径对象
      return { path: "/home/index" };
    },
  },

  {
    path: "/home",
    name: "homeLayout",
    component: () => import("./layouts/home.vue"),
    // meta: {
    //   title: `首页-${name}`,
    //   nav,
    //   footer: true,
    //   header: true,
    //   keepAlive: false,
    //   requireAuth: false,
    // },
    redirect: (to) => {
      return { path: "/home/index" };
    },
    children: [
      {
        path: "index",
        name: "home",
        component: () => import("./pages/home/Index.vue"),
        meta: {
          title: `首页-${name}`,
          nav,
          footer: true,
          header: true,
          keepAlive: false,
          requireAuth: false,
          requireAdmin:false,
        },
      },
      {
        path: "link",
        name: "Link",
        component: () => import("./pages/home/Link.vue"),
        meta: {
          keepAlive: false, // 需要被缓存
          title: `友情链接-${name}`,
          nav,
          footer: true,
          header: true,
          requireAuth: false,
          requireAdmin:false,

        },
      },
      {
        path: "message",
        name: "Message",
        component: () => import("./pages/home/Message.vue"),
        meta: {
          // keepAlive: true, // 需要被缓存
          title: `留言区-${name}`,
          nav,
          footer: true,
          header: true,
          keepAlive: true,
          requireAuth: false,
          requireAdmin:false,

        },
      },
      {
        path: "route",
        name: "GrowthRoute",
        component: () => import("./pages/home/GrowthRoute.vue"),
        meta: {
          keepAlive: true, // 需要被缓存
          title: `更新日志`,
          nav,
          footer: true,
          header: true,
          requireAuth: false,
          requireAdmin:false,

        },
      },
    ],
  },
  // {
  //   path: "/blog",
  //   name: "NewHome",
  //   component: () => import("./pages/NewHome.vue"),
  //   meta: {
  //     keepAlive: false, // 需要被缓存
  //     title: "文章-" + name,
  //     nav: nav1,
  //     footer: false,
  //     header: true,
  //     requireAuth: false,
  //   },
  // },
  {
    path: "/lab",
    name: "lab",
    component: () => import("./layouts/lab.vue"),
    redirect: (to) => {
      return { path: "/lab/index" };
    },
    children: [
      /*********************** lab index **************************/
      {
        path: "index",
        name: "lab",
        component: () => import("./pages/home/alinlab.vue"),
        meta: {
          title: "疯狂实验室",
          // nav,
          // footer: false,
          // header: false,
          requireAuth: false,
          requireAdmin:false,

        },
      },
      /*********************** file broker **************************/
      {
        path: "fileBroker",
        name: "fileBroker",
        component: () => import("./pages/alinlab/fileBroker.vue"),
        meta: {
          title: "文件中转站",
          // nav,
          // footer: false,
          // header: false,
          requireAuth: false,
          requireAdmin:false,

        },
      },
      /******************* data faker***********************/
      {
        path: "dataFaker",
        name: "dataFaker",
        component: () => import("./pages/alinlab/dataFaker.vue"),
        meta: {
          title: "数据生成器",
          // nav,
          // footer: false,
          // header: false,
          requireAuth: false,
          requireAdmin:false,

        },
      },
      /** *********************  third apis   *****************************/
      {
        path: "shortUrl",
        name: "shortUrl",
        component: () => import("./pages/alinlab/ShortUrlChange.vue"),
        meta: {
          keepAlive: true, // 需要被缓存
          title: "短链接生成",
          // nav,
          // footer: true,
          // header: false,
          requireAuth: false,
          requireAdmin:false,

        },
      },
      /** *********************  apisInfoCollections   *****************************/
      {
        path: "apiInfoCollector",
        name: "apiInfoCollector",
        component: () => import("./pages/alinlab/ApisCollections.vue"),
        meta: {
          keepAlive: true, // 需要被缓存
          title: "Apis合集",
          // nav,
          // footer: true,
          // header: false,
          requireAuth: true,
          requireAdmin:false,

        },
      },
      {
        path: "chatGPT",
        name: "chatGPT",
        component: () => import("./pages/alinlab/chatGPT.vue"),
        meta: {
          keepAlive: true, // 需要被缓存
          title: "chatGPT",
          // nav,
          // footer: true,
          // header: false,
          requireAuth: true,
          requireAdmin:true,

        },
      },
      /************************** oauth *****************************/
      {
        path: "oauth",
        name: "oauth",
        component: () => import("./pages/oauth.vue"),
        meta: {
          keepAlive: true, // 需要被缓存
          title: "oauth认证",
          nav: nav1,
          footer: false,
          header: false,
          requireAuth: false,
          requireAdmin:false,

        },
      },
      /****************************drug ************************ */
      {
        path: "drug",
        name: "Drug",
        component: () => import("./pages/home/Drug.vue"),
        meta: {
          keepAlive: true, // 需要被缓存
          title: "毒",
          nav,
          footer: false,
          header: false,
          requireAuth: false,
          requireAdmin:false,

        },
      },
    ],
  },

  {
    path: "/blog/:id",
    name: "BlogContent",
    component: () => import("./pages/BlogContent.vue"),
    meta: {
      keepAlive: false, // 需要被缓存
      nav: nav1,
      footer: false,
      header: true,
      requireAuth: false,
      requireAdmin:false,

    },
  },

  /** *****************************  admin   ***************************************/
  {
    path: "/admin",
    name: "admin",
    component: () => import("./layouts/admin/index.vue"),
    meta: {
      keepAlive: true, // 需要被缓存
      title: "管理后台",
      nav,
      footer: false,
      header: false,
      requireAuth: true,
      requireAdmin:true,
    },
  },
  /**************************** covid ****************/
  {
    path: "/covid19",
    name: "covid19",
    component: () => import("./layouts/covid19/index.vue"),
    redirect: (to) => {
      return { path: "/covid19/index" };
    },
    // meta: {
    //   keepAlive: true, // 需要被缓存
    //   title: "新冠数据",
    //   requireAuth: false,
    // },
    children:[
      {
        path: "index",
        name: "covidIndex",
        component: () => import("./pages/covid19/index.vue"),
        meta: {
          title: `新冠数据-${name}`,
          nav,
          keepAlive: false,
          requireAuth: false,
          requireAdmin:true,
        },
      },
    ]
  },
  /** ************************** 404 ****************/
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export function routerPush(
  name: AppRouteNames,
  params?: RouteParams
): ReturnType<typeof router.push> {
  if (params !== undefined) {
    return router.push({
      name,
      params,
    });
  } else {
    return router.push({ name });
  }
}

/** ************************** admin 相关权限页面  ******************************** */
const whiteList: string[] = []; // 链接白名单

//导入所有的权限相关的页面,不然打包的时候不会导动态路由对应的组件
const modules = import.meta.glob("./pages/admin/**.vue");

export const dynamicalRoutes: RouteRecordRaw[] = [];

function traverseMenu(route: Menu) {
  const r: RouteRecordRaw = {
    path: route.menu_url,
    name: route.menu_route_name,
    // component: () => import(`./pages/admin/${route.menu_view_path}`),
    component: modules[`./pages/admin/${route.menu_view_path}`],
    meta: {
      keepAlive: false, // 需要被缓存
      title: route.menu_name,
      footer: false,
      header: false,
      requireAuth: true,
      nav,
    },
    children: [],
  };
  if (route.children?.length > 0) {
    route.children.forEach((route) => {
      r.children?.push(traverseMenu(route));
    });
  }
  return r;
}

function getRouteArrayLength(routerArray: RouteRecordRaw[]) {
  let count = 0;
  const traverse = (route: RouteRecordRaw) => {
    if (route.children) {
      route.children.forEach((route) => {
        traverse(route);
      });
    }
    count++;
  };
  routerArray.forEach((route) => {
    traverse(route);
  });
  return count;
}

const staticRoutesLength = getRouteArrayLength(routes);

router.beforeEach(async (to, from, next) => {
  // Start progress bar
  NProgress.start();

  if (to.meta.title) {
    document.title = to.meta.title as string;
  }

  if (to.path == "/login") {
    // 方便登录后跳转
    console.log("登录页,登陆前", router.currentRoute.value.fullPath);
    localStorage.setItem("preRoute", router.currentRoute.value.fullPath);
  }

  if (to.meta.requireAuth) {
    if (!useAuthStore().isLogin.value) {
      ElMessage.error("请先登录...");
      console.log(`${to.path}需要登录,当前未登录`, useAuthStore().userInfo);
      next("/login");
      return;
    }
    if (to.meta.requireAdmin){
      ElMessage.error("当前账户没有权限!")
      next(from.path)
      return
    }
  }
  console.log(getRouteArrayLength(routes), ">>>>", router.getRoutes().length);
  if (
    staticRoutesLength === router.getRoutes().length &&
    useAuthStore().userInfo?.permissions.menu
  ) {
    console.log("check if need to add dynamical routes", modules);
    useAuthStore().userInfo?.permissions.menu.forEach((route) => {
      console.log(`add dynamical menu to route:${route}`);
      const r = traverseMenu(route);
      console.log(">>>>traverse menu result", r);
      router.addRoute("admin", r);
      useAuthStore().has_update_routes = true;
    });
    console.log(
      "after add dynamical routes",
      useAuthStore().userInfo?.permissions.menu
    );
    console.log("get routes", router.getRoutes());
    next({ ...to, replace: true }); // @https://blog.csdn.net/qq_41912398/article/details/109231418
    // return
  } else {
    next();
    const route = document.getElementsByClassName("route-content")[0];
    if (route) {
      route.classList.remove("route-filter");
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

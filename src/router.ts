import { createRouter, createWebHistory } from 'vue-router'
import type { RouteParams, RouteRecordRaw } from 'vue-router'
// import { isAuthorized } from './store/user'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// import {Route} from 'vue-router'
import { useAuthStore } from 'src/store/user'
import { AuthApis } from 'src/services/apis/auth'
import type { Menu } from 'src/services/apis/auth'
import { ElMessage } from 'element-plus'

NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

export type AppRouteNames =
  | 'Index'
  | 'NewHome'
  | 'oauth'
  | 'BlogContent'
  | 'Link'
  | 'fileBroker'
  | 'alinLab'
  | 'Drug'
  | 'Message'
  | 'GrowthRoute'
  | 'third_shortUrl'
  | 'login'
  | string

const name = 'werido'
export const nav = {
  navNoQuiet: {
    boxShadow: ' 0px 10px 20px 4px  rgba(195,199, 199,0.4)',
    backgroundColor: '#fff',
    color: 'rgba(0,0,0,.5)',
  },
  navQuiet: {
    color: '#fff',
  },
}
export const nav1 = {
  navNoQuiet: {
    boxShadow: ' 0px 10px 20px 4px  rgba(195,199, 199,0.4)',
    backgroundColor: '#fff',
    color: 'rgba(0,0,0,.5)',
  },
  navQuiet: {
    backgroundColor: '#fff',
    color: 'rgba(0,0,0,.5)',
  },
}

export const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('./pages/Login.vue'),
    meta: {
      keepAlive: false, // 需要被缓存
      title: '登录',
      nav: nav1,
      footer: true,
      header: false,
      requireAuth: false,
    },
  },
  {
    path: '/',
    name: 'Index',
    component: () => import('./pages/Index.vue'),
    meta: {
      title: `首页-${name}`,
      nav,
      footer: true,
      header: true,
      keepAlive: false,
      requireAuth: false,
    },
  },
  // {
  //   path: "/",
  //   name: "Index",
  //   component: () => import("./pages/Index.vue"),
  //   redirect:'/index',
  //   children:[{
  //     path:'/index',
  //     name:'home',
  //     component: () => import("./pages/Index.vue"),
  //     meta: {
  //       title: "首页-" + name,
  //       nav: nav,
  //       footer: true,
  //       header: true,
  //       keepAlive: false,
  //       requireAuth: false,
  //     }
  //     }
  //   ]
  // },
  // {
  //     // 会匹配所有路径
  //     path: '*',
  //     name: 'Windmill',
  //     component: ()=>import('./pages/Index.vue'),
  //     component: Windmill,
  //     meta: {
  //         title: '哎呀页面不见了-' + name
  //     }
  // },
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
    path: '/oauth',
    name: 'oauth',
    component: () => import('./pages/oauth.vue'),
    meta: {
      keepAlive: true, // 需要被缓存
      title: 'oauth认证',
      nav: nav1,
      footer: false,
      header: false,
      requireAuth: false,
    },
  },
  {
    path: '/blog/:id',
    name: 'BlogContent',
    component: () => import('./pages/BlogContent.vue'),
    meta: {
      keepAlive: false, // 需要被缓存
      nav: nav1,
      footer: false,
      header: true,
      requireAuth: false,
    },
  },
  {
    path: '/link',
    name: 'Link',
    component: () => import('./pages/Link.vue'),
    meta: {
      keepAlive: false, // 需要被缓存
      title: `友情链接-${name}`,
      nav,
      footer: true,
      header: true,
      requireAuth: false,
    },
  },
  {
    path: '/fileBroker',
    name: 'fileBroker',
    component: () => import('./pages/fileBroker.vue'),
    meta: {
      title: '文件慢传',
      nav,
      footer: false,
      header: false,
      requireAuth: false,
    },
  },
  {
    path: '/alinLab',
    name: 'alinLab',
    component: () => import('./pages/alinlab.vue'),
    meta: {
      title: 'alin-lab',
      nav,
      footer: false,
      header: false,
      requireAuth: false,
    },
  },
  {
    path: '/dataFaker',
    name: 'dataFaker',
    component: () => import('./pages/dataFaker.vue'),
    meta: {
      title: '数据生成器',
      nav,
      footer: false,
      header: false,
      requireAuth: false,
    },
  },
  {
    path: '/drug',
    name: 'Drug',
    component: () => import('./pages/Drug.vue'),
    meta: {
      keepAlive: true, // 需要被缓存
      title: '毒',
      nav,
      footer: false,
      header: false,
      requireAuth: false,
    },
  },
  {
    path: '/message',
    name: 'Message',
    component: () => import('./pages/Message.vue'),
    meta: {
      // keepAlive: true, // 需要被缓存
      title: `留言区-${name}`,
      nav,
      footer: true,
      header: true,
      keepAlive: true,
      requireAuth: false,
    },
  },
  {
    path: '/route',
    name: 'GrowthRoute',
    component: () => import('./pages/GrowthRoute.vue'),
    meta: {
      keepAlive: true, // 需要被缓存
      title: `成长路线-${name}`,
      nav,
      footer: true,
      header: true,
      requireAuth: false,
    },
  },

  /** *********************  third apis   *****************************/
  {
    path: '/third/shortUrl',
    name: 'third_shortUrl',
    component: () => import('./pages/ShortUrlChange.vue'),
    meta: {
      keepAlive: true, // 需要被缓存
      title: '短链接生成',
      nav,
      footer: true,
      header: false,
      requireAuth: false,
    },
  },
  /** *********************  apisInfoCollections   *****************************/
  {
    path: '/apiInfoCollector',
    name: 'apiInfoCollector',
    component: () => import('./pages/ApisCollections.vue'),
    meta: {
      keepAlive: true, // 需要被缓存
      title: 'Apis合集',
      nav,
      footer: true,
      header: false,
      requireAuth: true,
    },
  },

  /** *****************************  admin   ***************************************/
  {
    path: '/admin',
    name: 'admin',
    component: () => import('./pages/admin/Index.vue'),
    meta: {
      keepAlive: true, // 需要被缓存
      title: '管理后台',
      nav,
      footer: false,
      header: false,
      requireAuth: true,
    },
  },
  /** ************************** 404 ****************/
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

export function routerPush (
  name: AppRouteNames,
  params?: RouteParams,
): ReturnType<typeof router.push> {
  if (params !== undefined) {
    return router.push({
      name,
      params,
    })
  } else {
    return router.push({ name })
  }
}

/** ************************** admin 相关权限页面  ******************************** */
const whiteList: string[] = [] // 链接白名单

export const dynamicalRoutes: RouteRecordRaw[] = [

]

function traverseMenu (route: Menu) {
  const r: RouteRecordRaw = {
    path: route.menu_url,
    name: route.menu_route_name,
    component: () => import(`./pages/admin/${route.menu_view_path}`),
    meta: {
      keepAlive: false, // 需要被缓存
      title: route.menu_name,
      footer: false,
      header: false,
      requireAuth: true,
      nav,
    },
    children: [],
  }
  if (route.children?.length > 0) {
    route.children.forEach((route) => {
      r.children?.push(traverseMenu(route))
    })
  }
  return r
}

router.beforeEach(async (to, from, next) => {
  // Start progress bar
  NProgress.start()

  // let index = useAuthStore().userInfo?.permissions.menu.findIndex((i) => i.menu_url === to.path)
  // if (index !== -1) {
  //   next({...useAuthStore().userInfo?.permissions.menu[index as number], replace: true })
  //   return
  // }

  console.log('urt to ---> ', to, router.getRoutes().length == routes.length)

  if (to.meta.title) {
    document.title = to.meta.title as string
  }

  if (to.path == '/login') {
    // 方便登录后跳转
    console.log('登录页,登陆前', router.currentRoute.value.fullPath)
    localStorage.setItem('preRoute', router.currentRoute.value.fullPath)
  }

  if (to.meta.requireAuth) {
    if (!useAuthStore().isLogin.value) {
      ElMessage.error('请先登录...')
      console.log(`${to.path}需要登录,当前未登录`, useAuthStore().userInfo)
      next('/login')
      return
    }
  }
  // let menus = localStorage.getItem("menu")
  if (router.getRoutes().length == routes.length && useAuthStore().userInfo?.permissions.menu) {
    // dynamicalRoutes.length=0
    // let _menus:Menu[] = JSON.parse(menus)
    console.log('check if need to add dynamical routes', useAuthStore().userInfo?.permissions.menu)
    useAuthStore().userInfo?.permissions.menu.forEach((route) => {
      console.log(`add dynamical menu to route:${route}`)
      const r = traverseMenu(route)
      console.log('>>>>traverse menu result', r)
      router.addRoute('admin', r) 
    })
    console.log('after add dynamical routes', useAuthStore().userInfo?.permissions.menu)
    console.log('get routes', router.getRoutes())
    next({ ...to, replace: true }) // @https://blog.csdn.net/qq_41912398/article/details/109231418
  // return
  } else {
    next()
    const route = document.getElementsByClassName('route-content')[0]
    if (route) {
      route.classList.remove('route-filter')
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

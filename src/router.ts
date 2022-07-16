import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteParams, RouteRecordRaw } from 'vue-router'
// import { isAuthorized } from './store/user'

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

const name = "werido"
const nav = {
    navNoQuiet: {
        boxShadow: ' 0px 10px 20px 4px  rgba(195,199, 199,0.4)',
        backgroundColor: '#fff',
        color: 'rgba(0,0,0,.5)'
    },
    navQuiet: {
        color: '#fff'
    }
}
const nav1 = {
    navNoQuiet: {
        boxShadow: ' 0px 10px 20px 4px  rgba(195,199, 199,0.4)',
        backgroundColor: '#fff',
        color: 'rgba(0,0,0,.5)'
    },
    navQuiet: {
        backgroundColor: '#fff',
        color: 'rgba(0,0,0,.5)'
    }
}

export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Index',
        component: () => import('./pages/Index.vue'),
        meta: {
            title: '首页-' + name,
            nav: nav,
            footer:true,
            header:true,
            keepAlive:false,
        }
    },
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
    {
        path: '/blog',
        name: 'NewHome',
        component: ()=>import('./pages/NewHome.vue'),
        meta: {
            keepAlive: true, // 需要被缓存
            title: '文章-' + name,
            nav: nav1,
            footer:false,
            header:true
        }
    },
    {
        path: '/oauth',
        name: 'oauth',
        component: ()=>import('./pages/oauth.vue'),
        meta: {
            keepAlive: true, // 需要被缓存
            title: 'oauth认证',
            nav: nav1,
            footer:false,
            header:false
        }
    },
    {
        path: '/blog/:id',
        name: 'BlogContent',
        component: ()=>import('./pages/BlogContent.vue'),
        meta: {
            nav: nav1,
            footer:false,
            header:true
        }
    },
    {
        path: '/link',
        name: 'Link',
        component: ()=>import('./pages/Link.vue'),
        meta: {
            keepAlive: false, // 需要被缓存
            title: '友情链接-' + name,
            nav: nav,
            footer:true,
            header:true
        }
    },
    {
        path: '/fileBroker',
        name: 'fileBroker',
        component: ()=>import('./pages/fileBroker.vue'),
        meta: {
            title: '文件慢传',
            nav: nav,
            footer:false,
            header:false
        }
    },
    {
        path: '/alinLab',
        name: 'alinLab',
        component: ()=>import('./pages/alinlab.vue'),
        meta: {
            title: 'alin-lab',
            nav: nav,
            footer:false,
            header:false
        }
    },
    {
        path: '/dataFaker',
        name: 'dataFaker',
        component: ()=>import('./pages/dataFaker.vue'),
        meta: {
            title: '数据生成器',
            nav: nav,
            footer:false,
            header:false
        }
    },
    {
        path: '/drug',
        name: 'Drug',
        component: ()=>import('./pages/Drug.vue'),
        meta: {
            keepAlive: true, // 需要被缓存
            title: '毒',
            nav: nav,
            footer:false,
            header:false
        }
    },
    {
        path: '/message',
        name: 'Message',
        component: ()=>import('./pages/Message.vue'),
        meta: {
            // keepAlive: true, // 需要被缓存
            title: '留言区-' + name,
            nav: nav,
            footer:true,
            header:true,
            keepAlive:true,
        }
    },
    {
        path: '/route',
        name: 'GrowthRoute',
        component: ()=>import('./pages/GrowthRoute.vue'),
        meta: {
            keepAlive: true, // 需要被缓存
            title: '成长路线-' + name,
            nav: nav,
            footer:true,
            header:true
        }
    }, 
]
export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export function routerPush (name: AppRouteNames, params?: RouteParams): ReturnType<typeof router.push> {
  if (params !== undefined) {
    return router.push({
      name,
      params,
    })
  } else {
    return router.push({ name })
  }
}

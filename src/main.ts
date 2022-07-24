import { createApp } from 'vue'

import App from './App.vue'

import { router } from './router'

import registerGlobalComponents from './plugins/global-components'
// import setAuthorizationToken from './plugins/set-authorization-token'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Particles from "particles.vue3";
import 'src/assets/iconfont/iconfont.css'
import {createPinia} from 'pinia'
import Chat from 'vue3-beautiful-chat'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(Particles)
app.use(router)
app.use(ElementPlus)
app.use(Chat)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// setAuthorizationToken()
registerGlobalComponents(app)


import NProgress from 'nprogress'
import 'nprogress/nprogress.css' //这个样式必须引入
NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

// app.config.productionTip = false
//    to：进入到哪个路由去
//     from：从哪个路由离开
//     next：路由的控制参数，常用的有next(true)和next(false)
router.beforeEach((to, from, next) => {
    console.info("now path:",from ,"to path:",to,to.meta,next)
    NProgress.start()
    if (to.meta.title) { 
        document.title = to.meta.title as string
    }
    next()
    const route = document.getElementsByClassName('route-content')[0]
    if (route) {
        route.classList.remove('route-filter')
    }
})

router.afterEach(() => {
        NProgress.done()
    })

app.mount('#app')
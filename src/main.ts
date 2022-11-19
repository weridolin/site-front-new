import { createApp, createVNode } from "vue";

import App from "./App.vue";

import { router } from "./router";
import registerGlobalComponents from "./plugins/global-components";
// import setAuthorizationToken from './plugins/set-authorization-token'
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import Particles from "particles.vue3";
import "src/assets/iconfont/iconfont.css";
import { createPinia } from "pinia";
import Chat from "vue3-beautiful-chat";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)
app.use(pinia);
app.use(Particles);
app.use(router);
app.use(ElementPlus);
app.use(Chat);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// setAuthorizationToken()
registerGlobalComponents(app);

app.mount("#app");

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import i18n from "./i18n";
// 我图省事儿 工作中按需加载哈
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);
// app.use(i18n);
app.use(store);
app.use(router);
app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.mount("#app");

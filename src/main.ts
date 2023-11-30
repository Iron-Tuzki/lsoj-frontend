import { createApp } from "vue";
import App from "./App.vue";
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
import router from "./router";
import store from "./store"
import "@/plugins/axios";
import "bytemd/dist/index.css";
import "@/access";
import ArcoVueIcon from '@arco-design/web-vue/es/icon';

createApp(App).use(ArcoVue).use(router).use(store).use(ArcoVueIcon).mount("#app");

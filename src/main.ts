import { createApp } from "vue";
import App from "./App.vue";
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
import router from "./router";

import "@/plugins/axios";
import "bytemd/dist/index.css";

createApp(App).use(ArcoVue).use(router).mount("#app");

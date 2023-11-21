import { RouteRecordRaw } from "vue-router";
import HelloWorld from "@/components/HelloWorld.vue";
import AboutView from "@/views/AboutView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/home",
    name: "浏览题目",
    component: HelloWorld,
  },
  {
    path: "/about",
    name: "我的信息",
    component: AboutView
  },
];

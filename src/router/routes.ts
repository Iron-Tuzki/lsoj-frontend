import { RouteRecordRaw } from "vue-router";
import HelloWorld from "@/components/HelloWorld.vue";
import AboutView from "@/views/AboutView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/home",
    name: "home",
    component: HelloWorld,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView
  },
];

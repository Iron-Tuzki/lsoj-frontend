import { RouteRecordRaw } from "vue-router";
import HelloWorld from "@/components/HelloWorld.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "你好",
    component: HelloWorld,
  },
];

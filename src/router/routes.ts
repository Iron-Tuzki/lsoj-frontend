import { RouteRecordRaw } from "vue-router";
import HelloWorld from "@/components/HelloWorld.vue";
import AboutView from "@/views/AboutView.vue";
import adminView from "@/views/AdminView.vue";
import NoAuthView from "@/views/NoAuthView.vue";

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

  {
    path: "/admin",
    name: "管理员界面",
    component: adminView,
    meta: {
      access: "canAdmin"
    }
  },
  {
    path: "/noAuth",
    name: "无权限",
    component: NoAuthView,
    meta: {
      hideInMenu: true,
    },
  }
];

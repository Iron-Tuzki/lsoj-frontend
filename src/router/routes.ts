import { RouteRecordRaw } from "vue-router";
import HelloWorld from "@/components/HelloWorld.vue";
import AboutView from "@/views/AboutView.vue";
import adminView from "@/views/AdminView.vue";
import NoAuthView from "@/views/NoAuthView.vue";
import ACCESS_ENUM from "@/access/accessEnum";
import UserLayout1 from "@/layouts/UserLayout1.vue";
import LoginView from "@/views/user/LoginView.vue";
import RegisterView from "@/views/user/RegisterView.vue";
import QuestionsView1 from "@/views/question/QuestionsView1.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "用户布局",
    component: UserLayout1,
    meta: {
      hideInMenu: true,
      access: ACCESS_ENUM.NOT_LOGIN
    },
    children: [
      {
        path: "login",
        name: "用户登录",
        component: LoginView,
      },
      {
        path: "register",
        name: "用户注册",
        component: RegisterView,
      }
    ]
  },
  {
    path: "/questions",
    name: "浏览题目",
    component: QuestionsView1,
    meta: {
      access: ACCESS_ENUM.NOT_LOGIN,
    },
  },
  {
    path: "/about",
    name: "我的信息",
    component: AboutView,
    meta: {
      access: ACCESS_ENUM.USER
    }
  },

  {
    path: "/admin",
    name: "管理员界面",
    component: adminView,
    meta: {
      access: ACCESS_ENUM.ADMIN
    },
  },
  {
    path: "/noAuth",
    name: "无权限",
    component: NoAuthView,
    meta: {
      hideInMenu: true,
    },
  },
];

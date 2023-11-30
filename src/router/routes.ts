import { RouteRecordRaw } from "vue-router";
import HelloWorld from "@/components/HelloWorld.vue";
import AboutView from "@/views/AboutView.vue";
import adminView from "@/views/AdminView.vue";
import NoAuthView from "@/views/NoAuthView.vue";
import ACCESS_ENUM from "@/access/accessEnum";
import UserLayout from "@/layouts/UserLayout.vue";
import LoginView from "@/views/user/LoginView.vue";
import RegisterView from "@/views/user/RegisterView.vue";
import QuestionsView from "@/views/question/QuestionsView.vue";
import MdViewer from "@/components/MdViewer.vue";
import MdEditor from "@/components/MdEditor.vue";
import CodeEditor1 from "@/components/CodeEditor1.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "用户布局",
    component: UserLayout,
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
    component: QuestionsView,
    meta: {
      access: ACCESS_ENUM.NOT_LOGIN,
    },
  },
  {
    path: "/submit",
    name: "做题页面",
    component: CodeEditor1,
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

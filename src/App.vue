<template>
  <div id="app">
    <template v-if="route.path.startsWith('/user')">
      <router-view />
    </template>
    <template v-else>
      <BasicLayout />
    </template>
  </div>
</template>

<style>
#app {
}
</style>
<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout";
import { onMounted } from "vue";
import { useRoute,useRouter } from "vue-router";
import { useStore } from "vuex";

const route = useRoute();
const router = useRouter();
const store = useStore();
// 鉴权
router.beforeEach((to, from, next) => {
  //跳转前判断该页面是否为仅管理员可见，用户是否为管理员
  if (to.meta?.access === "canAdmin") {
    if (store.state.user?.loginUser?.role !== "admin") {
      next("/noAuth");
      return;
    }
  }
  next();
});

/**
 * 全局初始化函数，有全局单次调用的代码，都可以写到这里
 */
const doInit = () => {
  console.log("hello 欢迎来到我的项目");
};

onMounted(() => {
  doInit();
});
</script>

<template>
  <a-row id="globalHeader" align="center" :wrap="false">
    <a-col flex="auto">
      <a-menu
          mode="horizontal"
          :selected-keys="selectedkeys"
          @menu-item-click="doMenuClick"
      >
        <a-menu-item
            key="0"
            :style="{ padding: 0, marginRight: '38px' }"
            disabled
        >
          <div class="title-bar">
            <img class="logo" src="../assets/oj-logo.svg"/>
            <div class="title">鱼 OJ</div>
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in visibleMenu" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <div>
        {{ store.state.user?.loginUser?.userName ?? "未登录" }}
      </div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import {routes} from "../router/routes";
import {useRouter} from "vue-router";
import {computed, ref} from "vue";
import {useStore} from "vuex";
import checkAccess from "@/access/checkAccess";

const router = useRouter();
const store = useStore();
// 默认主页
const selectedkeys = ref(['/']);
// 计算属性，动态
const visibleMenu = computed(()=> {
  return routes.filter(item=>{
    if (item.meta?.hideInMenu) {
      return false;
    }
    if (!checkAccess(store.state.user.loginUser, item.meta?.access as string)) {
      return false;
    }
    // 根据权限过滤菜单
    return true;
  })
})

//路由跳转后，更新菜单高亮
router.afterEach((to, from, failure) => {
  selectedkeys.value = [to.path]
})

const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
}
</script>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.title {
  color: #444;
  margin-left: 16px;
}

.logo {
  height: 48px;
}
</style>

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
        <a-dropdown @select="handleSelect">
          <a-button >{{ store.state.user?.loginUser?.userName ?? "请登录" }}</a-button>
          <template #content>
            <a-doption :value="{ value: 'login' }" v-if="store.state.user?.loginUser?.userName === '未登录'">登录</a-doption>
            <a-doption :value="{ value: 'myInfo' }" v-if="store.state.user?.loginUser?.userName !== '未登录'">个人信息</a-doption>
            <a-doption :value="{ value: 'logout' }" v-if="store.state.user?.loginUser?.userName !== '未登录'">注销</a-doption>
          </template>
        </a-dropdown>
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
import {UserControllerService} from "../../generated";
import message from "@arco-design/web-vue/es/message";

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
const handleSelect = async (value: any) => {
  if (value.value === 'login') {
    await router.push({
      path: "/user/login"
    });
  } else if (value.value === 'logout') {
    const rst = await UserControllerService.userLogoutUsingPost();
    if (rst.code === 0) {
      message.success("注销成功");
      await router.push({
        path: "/user/login"
      });
    } else {
      message.error(rst.message);
    }
  }
};
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

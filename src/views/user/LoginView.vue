<template>
  <div id="loginView" align="center">
    <h2>用户登录</h2>
    <a-form :model="form" :style="{ width: '400px' }" @submit="handleSubmit" auto-label-width label-align="left">
      <a-form-item field="name" label="账户名">
        <a-input
            v-model="form.userAccount"
            placeholder="please enter your username..."
        />
      </a-form-item>
      <a-form-item field="post" label="密码" tooltip="密码不少于8位">
        <a-input-password v-model="form.userPassword" placeholder="please enter your password..."/>
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit" type="primary">登录</a-button>
        <a-button @click="handleRegister" style="margin-left: 8px">注册</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">

import {reactive} from "vue";
import {UserControllerService, UserLoginRequest} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import {useRouter} from "vue-router";
import {useStore} from "vuex";

const router = useRouter();
const store = useStore();
const form = reactive({
  userAccount: '',
  userPassword: '',
} as UserLoginRequest);
const handleSubmit = async () => {
  const rst = await UserControllerService.userLoginUsingPost(form);
  if (rst.code === 0) {
    message.success("登录成功");
    // 添加到store
    await store.dispatch("user/getLoginUser")
    // 跳转首页或上一页面
    await router.push({
      path: "/",
      replace: true,
    });
  } else {
    message.error(rst.message);
  }
};
const handleRegister = () => {
  router.push({
    path: "/user/register",
  })
};

</script>

<style>
.flex-container {
  display: flex;
  justify-content: flex-end;
}

.flex-item {
  margin-left: 8px;
}
</style>

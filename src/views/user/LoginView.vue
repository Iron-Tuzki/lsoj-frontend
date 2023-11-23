<template>
  <div id="loginView" align="center">
    <a-form :model="form" :style="{ width: '600px' }" @submit="handleSubmit">
      <a-form-item field="name"  label="账户名">
        <a-input
            v-model="form.userAccount"
            placeholder="please enter your username..."
        />
      </a-form-item>
      <a-form-item field="post" label="密码" tooltip="密码不少于8位">
        <a-input-password v-model="form.userPassword" placeholder="please enter your password..."/>
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit">登录</a-button>
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

</script>

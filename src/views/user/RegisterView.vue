<template>
  <div id="loginView" align="center">
    <h2>用户注册</h2>
    <a-form :model="form" :style="{ width: '400px' }" @submit="handleRegister" auto-label-width label-align="left">
      <a-form-item field="name" label="账户名">
        <a-input
            v-model="form.userAccount"
            placeholder="please enter your username..."
        />
      </a-form-item>
      <a-form-item field="post" label="密码" tooltip="密码不少于8位">
        <a-input-password v-model="form.userPassword" placeholder="please enter your password..."/>
      </a-form-item>
      <a-form-item field="post" label="确认密码" tooltip="密码不少于8位">
        <a-input-password v-model="form.checkPassword" placeholder="please enter your password..."/>
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit">注册</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">

import {reactive} from "vue";
import {UserControllerService, UserRegisterRequest} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import {useRouter} from "vue-router";

const router = useRouter();
const form = reactive({
  userAccount: '',
  userPassword: '',
  checkPassword: ''
} as UserRegisterRequest);

const handleRegister = async () => {
  const rst = await UserControllerService.userRegisterUsingPost(form);
  if (rst.code === 0) {
    message.success("注册成功");
    await router.push({
      path: "/user/login",
      replace: true,
    });
  } else {
    message.error(rst.message);
  }
};

</script>

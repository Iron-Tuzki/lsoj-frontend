<template>
  <a-row id="globalHeader" align="center" :wrap="false">
    <a-menu
        mode="horizontal"
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
      <a-menu-item v-for="item in routes" :key="item.path">
        {{ item.name }}
      </a-menu-item>
    </a-menu>
  </a-row>
</template>

<script setup lang="ts">
import {routes} from "../router/routes";
import {useRouter} from "vue-router";

const router = useRouter();

const doMenuClick = (key: string) => {
  router.push(key);
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

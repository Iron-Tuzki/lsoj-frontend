<template>
  <div id="questionsView1">
    <a-form :model="searchParams" layout="inline">
      <a-form-item field="title" label="名称" style="min-width: 240px">
        <a-input v-model="searchParams.title" placeholder="请输入名称"/>
      </a-form-item>
      <a-form-item field="tags" label="标签" style="min-width: 240px">
        <a-input-tag v-model="searchParams.tags" placeholder="请输入标签"/>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="doQuery" style="margin-right: 10px">
          <icon-search/>
        </a-button>
        <a-button type="primary" @click="handleAdd">
          <icon-plus/>
        </a-button>
      </a-form-item>
    </a-form>
    <a-table :ref="tableRef" :columns="columns" :data="dataList"
             :pagination="{
                    showTotal: true,
                    pageSize: searchParams.pageSize,
                    current:searchParams.current,
                    total: totalAmount,
                  }"
             @page-change="onPageChange"
    >

    </a-table>
      <a-modal v-model:visible="isFormVisible" @ok="handleOk" @cancel="handleCancel" okText="提交" width="auto">
        <AddQuestion ref="AddQuestionRef"></AddQuestion>
      </a-modal>

  </div>
</template>

<script setup lang="ts">

import {QuestionControllerService, QuestionQueryRequest} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import {onMounted, ref, watchEffect, watch} from "vue";
import router from "@/router";
import AddQuestion from "@/views/question/AddQuestion.vue";

const tableRef = ref();
const AddQuestionRef = ref();
const totalAmount = ref(0);
const searchParams = ref<QuestionQueryRequest>({
  title: "",
  tags: [],
  pageSize: 3,
  current: 1,
});
const dataList = ref([]);
const isFormVisible = ref(false);
const loadData = async () => {
  const res = await QuestionControllerService.listQuestionVoByPageUsingPost(searchParams.value);
  if (res.code === 0) {
    dataList.value = res.data.records;
    totalAmount.value = res.data.total;
  } else {
    message.error("加载失败，" + res.message);
  }
}
const doQuery = () => {
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  }
}

const handleAdd = () => {
  isFormVisible.value = true;
}
const handleOk = () => {
  // 调用子组件的提交方法
  AddQuestionRef.value.addOrUpdateQuestion();
  isFormVisible.value = false;
};
const handleCancel = () => {
  isFormVisible.value = false;
}

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page
  }
}

//监听器，搜索参数发生变化时，执行
watch(searchParams, loadData);

onMounted(() => {
  loadData();
})

const columns = [
  {
    title: "标题",
    dataIndex: "title",
  }, {
    title: "描述",
    dataIndex: "description",
  }, {
    title: "标签",
    dataIndex: "tags",
  }, {
    title: "难度",
    dataIndex: "difficulty",
    width: 160

  }, {
    title: "提交人数",
    dataIndex: "submitAmount",
    width: 160

  }, {
    title: "通过人数",
    dataIndex: "passAmount",
    width: 160

  }, {
    title: "通过率",
    dataIndex: "passRatio",
    width: 160
  }
];
</script>

<style scoped>
#questionsView1 {
  max-width: 1280px;
  margin: 0 auto;
}
</style>


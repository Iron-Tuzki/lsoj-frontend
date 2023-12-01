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
        <a-button type="primary" @click="handleAdd" v-if="buttonConfig.isShowAdd">
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
      <template #tags="{ record}">
        <a-space wrap>
          <a-tag v-for="(tag,index) in record.tags " :key="index" color="blue">{{tag}}</a-tag>
        </a-space>
      </template>
      <template #edit="{ record }">
        <a-space>
          <a-button type="outline" @click="handleEdit(record)" v-if="buttonConfig.isShowEdit">
            <icon-edit/>
          </a-button>
          <a-button type="outline" status="danger" @click="handleDelete(record)" v-if="buttonConfig.isShowDelete">
            <icon-delete/>
          </a-button>
          <a-button type="outline" @click="toQuestionPage(record)">
            做题
          </a-button>
        </a-space>
      </template>

    </a-table>
    <a-modal v-model:visible="isFormVisible" @ok="handleOk" @cancel="handleCancel" @close="handleClose" okText="提交"
             width="auto">
      <AddQuestion ref="AddQuestionRef"></AddQuestion>
    </a-modal>

  </div>
</template>

<script setup lang="ts">

import {DeleteRequest, QuestionControllerService, QuestionQueryRequest, QuestionVO} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import {onMounted, ref, watchEffect, watch} from "vue";
import AddQuestion from "@/views/question/AddQuestion.vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import ACCESS_ENUM from "@/access/accessEnum";

const router = useRouter();
const store = useStore();
const tableRef = ref();
const AddQuestionRef = ref();
const totalAmount = ref(0);
const searchParams = ref<QuestionQueryRequest>({
  title: "",
  tags: [],
  pageSize: 3,
  current: 1,
  sortField: "createTime"
});
const dataList = ref([]);
const isFormVisible = ref(false);
const buttonConfig = ref({
  isShowAdd: true,
  isShowEdit: true,
  isShowDelete: true,
})
let insertFlag = 'add';

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
  insertFlag = 'add'
}
const handleOk = async () => {
  // 调用子组件的提交方法
  const rst = await AddQuestionRef.value.addOrUpdateQuestion(insertFlag);
  if (rst.code === 0) {
    message.success("提交成功");
    await loadData();
  } else {
    message.error(rst.message);
  }
};
const handleCancel = () => {
  isFormVisible.value = false;
};

const handleClose = () => {
  AddQuestionRef.value.cleanAllInfo();
};
const handleEdit = (record: QuestionVO) => {
  isFormVisible.value = true;
  insertFlag = 'update';
  AddQuestionRef.value.queryQuestion(record.id as number);
};
const handleDelete = (record: QuestionVO) => {
  const confirmed = window.confirm('确定要删除此记录吗？');
  if (confirmed) {
    const rst = QuestionControllerService.deleteQuestionUsingPost({id: record.id});
    if (rst.code === 0) {
      message.success("删除成功");
      loadData();
    } else {
      message.error(rst.message)
    }
  }
};
/**
 * 跳转到做题页面
 * @param question
 */
const toQuestionPage = (question: QuestionVO) => {
  router.push({
    path: `/view/question/${question.id}`,
  });
};

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
  const role = store.state.user.loginUser.userRole;
  if (role === ACCESS_ENUM.USER) {
    buttonConfig.value.isShowAdd = false;
    buttonConfig.value.isShowEdit = false;
    buttonConfig.value.isShowDelete = false;
  }
  console.log(role)
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
    slotName: "tags",
  }, {
    title: "难度",
    dataIndex: "difficulty",
    width: 160
  }, {
    title: "提交人数",
    dataIndex: "submitAmount",
    width: 160
  }, {
    title: "通过率",
    dataIndex: "passRatio",
    width: 160
  }, {
    title: "操作",
    slotName: "edit"
  }];
</script>

<style scoped>
#questionsView1 {
  max-width: 1280px;
  margin: 0 auto;
}
</style>


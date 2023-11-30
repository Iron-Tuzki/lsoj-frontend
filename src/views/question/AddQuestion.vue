<template>
  <div id="addQuestion" >
    <a-form :model="form" auto-label-width>
      <a-form-item field="title" label="标题">
        <a-input
            v-model="form.title"
        />
      </a-form-item>
      <a-form-item field="answer" label="标准答案（代码）">
        <MdEditor :value="form.answer" :handle-change="handleChangeA"></MdEditor>
      </a-form-item>
      <a-form-item field="description" label="描述">
        <MdEditor :value="form.description" :handle-change="handleChangeD"></MdEditor>
      </a-form-item>
      <a-form-item field="tags"  label="标签">
        <a-input-tag v-model:model-value="form.tags" :style="{width:'320px'}" placeholder="Please Enter" allow-clear/>
      </a-form-item>
      <a-form-item field="example" label="示例">
        <a-input
            v-model="form.example"
        />
      </a-form-item>
      <a-form-item label="判题标准" :content-flex="false" :merge-props="false">
        <a-space direction="vertical" fill>
          <a-form-item field="judgeConfig.timeLimit" label="时间限制">
            <a-input-number v-model:model-value="form.judgeConfig.timeLimit"
                            :style="{width:'320px'}" step="100" mode="button"/>
          </a-form-item>
          <a-form-item field="judgeConfig.memoryLimit" label="内存限制">
            <a-input-number v-model:model-value="form.judgeConfig.memoryLimit"
                            :style="{width:'320px'}" step="100" mode="button"/>
          </a-form-item>
          <a-form-item field="judgeConfig.stackLimit" label="堆栈限制">
            <a-input-number v-model:model-value="form.judgeConfig.stackLimit"
                            :style="{width:'320px'}" step="100" mode="button"/>
          </a-form-item>
        </a-space>
      </a-form-item>
      <a-form-item v-for="(post,index) of form.judgeCase" :field="`judgeCase[${index}].value`"
                   :label="`判题用例-${index}`" :key="index">
        <a-input v-model="post.input" placeholder="输入" style="margin-right: 10px"/>
        <a-input v-model="post.output" placeholder="输出"/>
        <a-button @click="handleDeleteCase(index)" :style="{marginLeft:'10px'}">
          <icon-close-circle-fill/>
        </a-button>
      </a-form-item>
      <div>
        <a-button @click="handleAddCase">新增判题用例</a-button>
      </div>

    </a-form>
  </div>
</template>

<script setup lang="ts">

import {ref, defineProps, withDefaults, defineExpose, reactive} from "vue";
import {QuestionAddRequest, QuestionControllerService} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import MdEditor from "@/components/MdEditor.vue";

const form = reactive({
  title: '',
  answer: '',
  description: '',
  example: '',
  judgeCase: [
    {
      input: '',
      output: ''
    }
  ],
  judgeConfig: {
    memoryLimit: 500,
    stackLimit: 500,
    timeLimit: 500
  },
  tags: [],
}) as QuestionAddRequest;

const handleChangeA = (v: string) => {
  form.answer = v;
};
const handleChangeD = (v: string) => {
  form.description = v;
};

const addOrUpdateQuestion = async () => {
  console.log("提交");
  const rst = await QuestionControllerService.addQuestionUsingPost(form);
  if (rst.code === 0) {
    message.success("提交成功");
  } else {
    message.error(rst.message);
  }
};
const handleAddCase = () => {
  form.judgeCase?.push({
    input: '',
    output: ''
  })
};
const handleDeleteCase = (index: number) => {
  form.judgeCase?.splice(index, 1)
}
// 暴露子组件方法，给父组件使用
defineExpose({
  addOrUpdateQuestion,
})
</script>

<style scoped>
#addQuestion {
}
</style>
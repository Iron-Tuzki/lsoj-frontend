<template>
  <div id="submitQuestionView">
    <a-space direction="vertical" :size="16" style="display: block;">
      <a-row :gutter="[24,24]">
        <a-col :md="12" :xs="24">
          <a-card v-if="data" :title="data?.title">
            <template #extra>
              <a-space wrap>
                <a-tag v-for="(tag,index) in data.tags " :key="index" color="blue">{{ tag }}</a-tag>
              </a-space>
            </template>
            <a-descriptions title="判题条件" :column="{xs:1, md:3, lg:4}">
              <a-descriptions-item label="时间限制" :span="1">
                {{ data?.judgeConfig.timeLimit ?? 0 }}
              </a-descriptions-item>
              <a-descriptions-item label="内存限制" :span="1">
                {{ data?.judgeConfig.memoryLimit ?? 0 }}
              </a-descriptions-item>
              <a-descriptions-item label="堆栈限制" :span="1">
                {{ data?.judgeConfig.stackLimit ?? 0 }}
              </a-descriptions-item>
            </a-descriptions>
            <MdViewer :value="data?.description"/>
          </a-card>
        </a-col>
        <a-col :md="12" :xs="24">
          <CodeEditor :language="language"></CodeEditor>
          <a-divider></a-divider>
          <a-select :style="{width:'320px',marginRight: '20px'}"
                    placeholder="请选择编程语言" v-model:model-value="language">
            <a-option>Java</a-option>
            <a-option>C</a-option>
            <a-option>Golang</a-option>
          </a-select>
          <a-button type="primary" @click="doSubmit">提交</a-button>
        </a-col>
      </a-row>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import CodeEditor from "@/components/CodeEditor.vue";
import {onMounted, withDefaults, defineProps, ref} from "vue";
import {QuestionControllerService, QuestionSubmitControllerService, QuestionVO} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import MdViewer from "@/components/MdViewer.vue";

interface Props {
  id: number,
}

const props = withDefaults(defineProps<Props>(), {
  id: -1,
})

const data = ref<QuestionVO>();
const language = ref();

const doSubmit = () => {
  console.log()
  //QuestionSubmitControllerService.submitAnswerUsingPost()
}
const loadData = async () => {
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(props.id);
  if (res.code === 0) {
    data.value = res.data;
    console.log(data.value);
  } else {
    message.error(res.message as string);
  }
}
onMounted(() => {
  loadData();
});
</script>

<style scoped>
#submitQuestionView {
}
</style>
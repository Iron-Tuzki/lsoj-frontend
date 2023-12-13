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
            <MdViewer :value="data?.description"/>
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
          </a-card>
          <br>
          <a-select :style="{width:'320px'}" placeholder="请选择编程语言">
            <a-option>Java</a-option>
            <a-option>C</a-option>
            <a-option>Golang</a-option>
          </a-select>
        </a-col>
        <a-col :md="12" :xs="24">
          <CodeEditor></CodeEditor>
        </a-col>
      </a-row>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import CodeEditor from "@/components/CodeEditor.vue";
import {onMounted, withDefaults, defineProps, ref} from "vue";
import {QuestionControllerService, QuestionVO} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import MdViewer from "@/components/MdViewer.vue";

interface Props {
  id: number,
}

const props = withDefaults(defineProps<Props>(), {
  id: -1,
})

const data = ref<QuestionVO>();
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
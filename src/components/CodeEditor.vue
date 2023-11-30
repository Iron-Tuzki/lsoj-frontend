<template>
  <div id="code-editor" ref="container" style="min-height: 500px">

  </div>
</template>

<script setup lang="ts">
import *  as monaco from "monaco-editor";
import {defineProps, onMounted, ref, toRaw, withDefaults} from "vue";

/**
 * 定义组件属性类型
 */
interface Props {
  value: string,
  language: string,
  handleChange: (v: string) => void
}

const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  language: () => "java",
  handleChange: (v: string) => {
    console.log(v)
  }
})


const container = ref();
const codeEditor = ref();
const value = ref("hello world");

onMounted(() => {
  // dom还未加载
  if (!container.value) {
    return;
  }
  codeEditor.value = monaco.editor.create(container.value, {
    value: props.value,
    language: props.language,
    automaticLayout: true,
    colorDecorators: true,
    minimap: {
      enabled: true
    },
    readOnly: false,
    theme: "vs-dark",
    lineNumbers: "on",

  })
  // 编辑 监听内容变化 使用toRaw，将输入内容传给父组件传入的函数
  codeEditor.value.onDidChangeModelContent(() => {
    props.handleChange(toRaw(codeEditor.value).getValue())
  });


});
</script>
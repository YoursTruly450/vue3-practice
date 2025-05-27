<template>
  <div class="question" @click="opened = !opened">
    <div class="question-title">{{ question.title }}</div>
    <div v-if="opened" class="question-body">{{ question.text }}</div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  props: ['question'],

  setup() {
    const opened = ref(false);

    return {
      opened,
    };
  },
}
</script>

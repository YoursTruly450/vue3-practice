<template>
  <div v-if="message" :class="['alert', message.type]">
    <p class="alert-title">{{ title }}</p>
    <p>{{ message.value }}</p>
    <span class="alert-close" @click="close">&times;</span>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const TITLE_MAP = {
      primary: 'Success !',
      danger: 'Warning',
      warning: 'Attention !'
    };

    const store = useStore();
    const message = computed(() => store.state.message);
    const title = computed(() => message ? TITLE_MAP[message.value.type] : 'Title');

    const close = () => {
      store.commit('clearMessage');
    }

    return {
      title,
      message,
      close,
    };
  },
}
</script>
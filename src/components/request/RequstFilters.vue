<template>
  <div class="filter">
    <div class="form-control">
      <input
        v-model="name"
        type="text"
        placeholder="name"
      >
    </div>
    <div class="form-control">
      <select v-model="status">
        <option disabled selected>Choose status</option>
        <option value="done">Done</option>
        <option value="cancelled">Cancelled</option>
        <option value="active">Active</option>
        <option value="pending">Pending</option>
      </select>
    </div>
    <button v-if="isActive" class="btn warning" @click="clear">clear</button>
  </div>
</template>

<script>
import { ref, watch, computed } from 'vue';

export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],

  setup(_, { emit }) {
    const name = ref('');
    const status = ref(null);

    watch([name, status], values => {
      emit('update:modelValue', {
        name: values[0],
        status: values[1],
      });
    });

    const isActive = computed(() => name.value || status.value);

    return {
      name,
      status,
      isActive,
      clear: () => {
        name.value = '';
        status.value = null;
      },
    };
  },
};
</script>

<template>
  <span :class="['badge', className]">{{ text }}</span>
</template>

<script>
import {ref, watch} from 'vue';

export default {
  props: {
    type: {
      type: String,
      required: true,
      validator(value) {
        return ['active', 'cancelled', 'done', 'pending'].includes(value);
      },
    },
  },
  setup(props) {
    const classesMap = {
      active: 'primary',
      cancelled: 'danger',
      done: 'primary',
      pending: 'warning',
    };

    const textMap = {
      active: 'Active',
      cancelled: 'Cancelled',
      done: 'Done',
      pending: 'Pending',
    };

    watch(props, val => {
      className.value = classesMap[val.type]
      text.value = textMap[val.type]
    });

    const className = ref(classesMap[props.type]);
    const text = ref(textMap[props.type]);

    return {
      className,
      text,
    };
  },
}
</script>

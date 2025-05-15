<template>
  <div class="container">
    <AppMessage />
    <router-view/>
  </div>
</template>

<script>
// import { useStore } from 'vuex';

import AppMessage from '../components/ui/AppMessage.vue';
export default {
  // setup() {
  //   const store = useStore();
  // },
  components: {
    AppMessage,
  },
}
</script>

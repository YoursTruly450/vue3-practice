<template>
  <TheNavbar />
  <TheSidebar v-if="isSidebarOpened" />
  <div class="container with-nav">
    <AppMessage />
    <router-view/>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

import TheNavbar from '../components/TheNavbar.vue';
import TheSidebar from '../components/TheSidebar.vue';
import AppMessage from '../components/ui/AppMessage.vue';

export default {
  components: {
    TheNavbar,
    TheSidebar,
    AppMessage,
  },
  setup() {
    const store = useStore();

    const isSidebarOpened = computed(() => store.state.sidebar);

    return {
      isSidebarOpened,
    };
  },
}
</script>

<style>

</style>
<template>
  <div class="sidebar">
    <span class="sidebar-close" @click="closeSidebar">&times;</span>
    <div class="sidebar-content">
      <p>Welcome to the application accounting system in our bank. Here you will find comprehensive information about the system and applications</p>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();

    const closeSidebar = () => {
      store.commit('clodeSidebar');
    };

    return {
      closeSidebar,
    };
  },
};
</script>

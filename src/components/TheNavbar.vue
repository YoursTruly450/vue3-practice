<template>
  <nav class="navbar">
    <h3>Online bank</h3>

    <ul class="navbar-menu">
      <li>
        <router-link to="/">Requests</router-link>
      </li>
      <li>
        <router-link to="/help">Help</router-link>
      </li>
      <li>
        <a href="#" @click.prevent="openSidebar">Messages</a>
      </li>
      <li>
        <a href="#" @click.prevent="logout">Exit</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  setup() {
    const router = useRouter();
    const store = useStore();

    const logout = () => {
      store.commit('auth/logout');
      router.push('/login');
    };

    const openSidebar = () => {
      store.commit('openSidebar');
    };

    return {
      logout,
      openSidebar,
    };
  },
}
</script>

<style>

</style>
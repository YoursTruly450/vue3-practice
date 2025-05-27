<template>
  <AppLoader v-if="loading"/>
  <AppPage v-else title="Request list">
    <template #header>
      <button class="btn primary" @click="open">Create</button>
    </template>

    <RequstFilters v-model="filter" />
    <RequestTable :requests="requests" />

    <teleport to="body">
      <AppModal v-if="modal" title="Create request" @close="close">
        <RequestModal @created="close" />
      </AppModal>
    </teleport>
  </AppPage>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';

import AppPage from '../components/ui/AppPage.vue';
import AppModal from '../components/ui/AppModal.vue';
import AppLoader from '../components/ui/AppLoader.vue';
import RequestModal from '../components/request/RequestModal.vue';
import RequestTable from '../components/request/RequestTable.vue';
import RequstFilters from '../components/request/RequstFilters.vue';

export default {
  components: {
    AppPage,
    AppModal,
    AppLoader,
    RequestModal,
    RequestTable,
    RequstFilters,
  },
  setup() {
    const store = useStore();

    const modal = ref(false);
    const loading = ref(false);
    const filter = ref({});

    onMounted(async () => {
      loading.value = true;
      await store.dispatch('requests/getRequests');
      loading.value = false;
    });

    const open = () => modal.value = true;

    const close = () => modal.value = false;

    const requests = computed(() => store.getters['requests/requests']
      .filter((request) => {
        if (filter.value.status) {
          return request.status === filter.value.status;
        }
        return request;
      })
      .filter((request) => {
        if (filter.value.name) {
          return String(request.fullName).toLowerCase().includes(String(filter.value.name).toLowerCase());
        }
        return request;
      })
    );

    return {
      modal,
      loading,
      filter,
      open,
      close,
      requests,
    };
  }
}
</script>

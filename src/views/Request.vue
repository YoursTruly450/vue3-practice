<template>
  <AppLoader v-if="loading"/>
  <AppPage v-else-if="request" title="Request" :back="true">
    <p><strong>Owner full name: </strong>{{ request.fullName }}</p>
    <p><strong>Owner phone number: </strong>{{ request.phone }}</p>
    <p><strong>Request amount: </strong>{{ currency(request.amount) }}</p>
    <p><strong>Request status: </strong><AppStatus :type="request.status" /></p>

    <div class="form-control">
      <label for="status">Status</label>
      <select id="status" v-model="status">
        <option value="done">Done</option>
        <option value="cancelled">Cancelled</option>
        <option value="active">Active</option>
        <option value="pending">Pending</option>
      </select>
    </div>

    <button class="btn danger" @click="deleteRequest">delete</button>
    <button v-if="isStatusChanged" class="btn" @click="updateRequest">update</button>
  </AppPage>
  <h3 v-else class="text-center text-white">
    Request with ID = {{ id }} not found
  </h3>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import { currency } from '../utils/currency-formatter';

import AppPage from '../components/ui/AppPage.vue';
import AppLoader from '../components/ui/AppLoader.vue';
import AppStatus from '../components/ui/AppStatus.vue';

export default {
  components: {
    AppPage,
    AppLoader,
    AppStatus,
  },
  setup() {
    const route = useRoute();
    const loading = ref(false);
    const store = useStore();
    const request = ref(null);
    const router = useRouter();
    const status = ref(null);

    onMounted(async () => {
      loading.value = true;
      const id = route.params.id;
      request.value = await store.dispatch('requests/getRequestById', id);
      status.value = request.value?.status;
      loading.value = false;
    });

    const deleteRequest = async () => {
      const id = route.params.id;
      const result = await store.dispatch('requests/deleteRequest', id);
      if (result) router.push('/');
    };

    const updateRequest = async () => {
      const id = route.params.id;
      const body = {
        ...request.value,
        status: status.value,
      }
      request.value = await store.dispatch('requests/updateRequest', { body, id });
    };

    const isStatusChanged = computed(() => status.value !== request.value.status);

    return {
      loading,
      id: route.params.id,
      request,
      currency,
      deleteRequest,
      updateRequest,
      status,
      isStatusChanged,
    };
  },
}
</script>

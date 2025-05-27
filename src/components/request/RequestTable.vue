<template>
  <h4 v-if="requests.length === 0" class="text-center">No requests</h4>
  <table v-else class="table">
    <thead>
      <tr>
        <th>#</th>
        <th>Full name</th>
        <th>Phone</th>
        <th>Amount</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(r, idx) in requests" :key="r.id">
        <td>{{ idx + 1 }}</td>
        <td>{{ r.fullName }}</td>
        <td>{{ r.phone }}</td>
        <td>{{ currency(r.amount) }}</td>
        <!-- <td><AppStatus :type="r.status" /></td> -->
        <!-- <td>
          <router-link v-slot="{navigate}" custom :to="{name: 'Request', params: {id: r.id}}">
            <button class="btn" @click="navigate">Open</button>
          </router-link>
        </td> -->
      </tr>
    </tbody>
  </table>
</template>

<script>
import { currency } from '../../utils/currency-formatter';
import AppStatus from '../ui/AppStatus';

export default {
  props: {
    requests: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    return { currency };
  },
  components: {
    AppStatus,
  },
}
</script>

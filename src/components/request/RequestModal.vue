<template>
  <form @submit="onSubmit">
    <div class="form-control" :class="{'invalid': fullNameError}">
      <label for="fullName">Full name</label>
      <input type="text" id="fullName" v-model="fullName" @blur="fullNameBlur">
      <small v-if="fullNameError">{{ fullNameError }}</small>
    </div>
    <div class="form-control" :class="{'invalid': phoneError}">
      <label for="phone">Phone</label>
      <input type="text" id="phone" v-model="phone" @blur="phoneBlur">
      <small v-if="phoneError">{{ phoneError }}</small>
    </div>
    <div class="form-control" :class="{'invalid': amountError}">
      <label for="amount">Amount</label>
      <input type="number" id="amount" v-model.number="amount" @blur="amountBlur">
      <small v-if="amountError">{{ amountError }}</small>
    </div>
    <div class="form-control">
      <label for="status">Status</label>
      <select id="status" v-model="status">
        <option value="done">Done</option>
        <option value="cancelled">Cancelled</option>
        <option value="active">Active</option>
        <option value="pending">Pending</option>
      </select>
    </div>

    <button class="btn primary" :disabled="isSubmitting">Create</button>
  </form>
</template>

<script>
import { useStore } from 'vuex';
import { useRequestForm } from '../../use/request-form';
export default {
  emits: ['created'],
  setup(_, { emit }) {
    const store = useStore();

    const submit = async (values) => {
      await store.dispatch('requests/createRequest', values);
      emit('created');
    };

    return {
      ...useRequestForm(submit),
    };
  },
}
</script>
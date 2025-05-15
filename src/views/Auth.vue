<template>
  <form class="card" @submit.prevent="onSubmit" autocomplete="off">
    <h1>Login</h1>

    <div :class="['form-control', { 'invalid': emailErrorMessage }]">
      <label for="email">Email</label>
      <input id="email" type="email" v-model="emailValue" @blur="emailHandleBlur" autocomplete="off"/>
      <small v-if="emailErrorMessage">{{ emailErrorMessage }}</small>
    </div>

    <div :class="['form-control', { 'invalid': passwordErrorMessage }]">
      <label for="password">Password</label>
      <input id="password" type="password" v-model="passwordValue" @blur="passwordHandleBlur" autocomplete="new-password"/>
      <small v-if="passwordErrorMessage">{{ passwordErrorMessage }}</small>
    </div>

    <button type="submit" class="btn primary" :disabled="isSubmitting || isTooManyAttemps">Login</button>
    <div v-if="isTooManyAttemps" class="text-danger">too many attemps, try again later</div>
    <!-- <div v-if="error" class="text-danger">{{ error }}</div> -->
  </form>
</template>

<script>
// import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { useLoginForm } from '../use/login-form';

import { errorDict } from '../utils/error';

export default {
  setup() {
    const store = useStore();
    const route = useRoute();

    if (route.query.message === 'auth') {
      store.dispatch('setMessage', {
        value: errorDict('AUTHORIZATION'),
        type: 'warning',
      })
    };

    return {
      ...useLoginForm(),
      // error: computed(() => store.getters['auth/loginError']),
    };
  },
}
</script>

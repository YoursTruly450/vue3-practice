import { createStore, createLogger } from 'vuex'

import { auth } from './moudules/auth';
import { requests } from './moudules/requests.module';

const plugins = [];

if (process.env.NODE_ENV === 'development') {
  plugins.push(createLogger());
}

export default createStore({
  plugins,
  state() {
    return {
      message: null,
      sidebar: false,
    };
  },
  mutations: {
    setMessage(state, message) {
      state.message = message;
    },
    clearMessage(state) {
      state.message = null;
    },
    openSidebar(state) {
      state.sidebar = true;
    },
    clodeSidebar(state) {
      state.sidebar = false;
    },
  },
  actions: {
    setMessage({ commit }, message) {
      commit('setMessage', message);
      setTimeout(() => {
        commit('clearMessage');
      }, message.delay ? message.delay : 4000);
    },
  },
  modules: {
    auth,
    requests,
  }
})

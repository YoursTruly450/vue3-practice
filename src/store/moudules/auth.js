import axios from 'axios';

import { errorDict } from '../../utils/error';

const TOKEN_KEY = 'jwt-token';

export const auth = {
  namespaced: true,
  state() {
    return {
      token: null || localStorage.getItem(TOKEN_KEY),
      // loginError: '',
    };
  },
  getters: {
    token(state) {
      return state.token;
    },
    isAuth(_, getters) {
      return !!getters.token;
    },
    // loginError(state) {
    //   return state.loginError;
    // },
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem(TOKEN_KEY, token);
    },
    logout(state) {
      state.token = null;
      localStorage.removeItem(TOKEN_KEY);
    },
    // setLoginError(state, error) {
    //   state.loginError = error;
    // },
  },
  actions: {
    async login({ commit, dispatch }, payload) {
      commit('clearMessage', null, { root: true });
      try {
        const body = {
          ...payload,
          returnSecureToken: true,
        };
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_API_KEY}`;
        const { data } = await axios.post(url, body);
        const { idToken } = data;
        commit('setToken', idToken);
        commit('clearMessage', null, { root: true });
      } catch(e) {
        const code = e.response.data.error.message;
        if (code) {
          const error = errorDict(code);
          dispatch('setMessage', {
            value: error,
            type: 'danger',
          }, { root: true });
        }
        throw new Error();
      }
    },
  },
};
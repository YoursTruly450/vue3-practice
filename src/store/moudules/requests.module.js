import { requestAxios } from '../../axios/request';
import store from '../index';


export const requests = {
  namespaced: true,
  state() {
    return {
      requests: [],
    };
  },
  getters: {
    requests(state) {
      return state.requests;
    },
  },
  mutations: {
    setRequests(state, requests) {
      state.requests = requests;
    },
    addRequest(state, request) {
      state.requests.push(request);
    },
  },
  actions: {
    async createRequest({ commit, dispatch }, body) {
      const token = store.getters['auth/token'];
      try {
        const { data } = await requestAxios.post(`/requests.json?auth=${token}`, body);
        commit('addRequest', { ...body, id: data.name });
        dispatch('setMessage', {
          value: 'Request successfully created',
          type: 'primary',
        }, { root: true });
      } catch (error) {
        dispatch('setMessage', {
          value: error.message,
          type: 'danger',
        }, { root: true });
      }
    },

    async getRequests({ commit, dispatch }) {
      const token = store.getters['auth/token'];
      try {
        const { data } = await requestAxios.get(`/requests.json?auth=${token}`);
        const requests = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        commit('setRequests', requests);
      } catch (error) {
        dispatch('setMessage', {
          value: error.message,
          type: 'danger',
        }, { root: true });
      }
    },

    async getRequestById({ dispatch }, id) {
      const token = store.getters['auth/token'];
      try {
        const { data } = await requestAxios.get(`/requests/${id}.json?auth=${token}`);
        return data;
      } catch (error) {
        dispatch('setMessage', {
          value: error.message,
          type: 'danger',
        }, { root: true });
      }
    },

    async deleteRequest({ dispatch }, id) {
      const token = store.getters['auth/token'];
      try {
        await requestAxios.delete(`/requests/${id}.json?auth=${token}`);
        dispatch('setMessage', {
          value: `Request with ID = ${id} was deleted`,
          type: 'primary',
        }, { root: true });
        return true;
      } catch (error) {
        dispatch('setMessage', {
          value: error.message,
          type: 'danger',
        }, { root: true });
        return false;
      }
    },

    async updateRequest({ dispatch }, { body, id }) {
      const token = store.getters['auth/token'];
      try {
        const { data } = await requestAxios.patch(`/requests/${id}.json?auth=${token}`, body);
        dispatch('setMessage', {
          value: 'Request status updated',
          type: 'primary',
        }, { root: true });
        return data;
      } catch (error) {
        dispatch('setMessage', {
          value: error.message,
          type: 'danger',
        }, { root: true });
      }
    },
  },
};
import axios from 'axios';
import router from '../router/index';

export const requestAxios = axios.create({
  baseURL: process.env.VUE_APP_FB_URL,
});

requestAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      router.push('/login?message=auth');
    }
    return Promise.reject(error);
  },
)
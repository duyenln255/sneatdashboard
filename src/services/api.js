// src/services/api.js

import axios from 'axios';
import config from '../configs/config';

const api = axios.create({
  baseURL: config.apiUrl,
});

const getToken = () => localStorage.getItem('token');

// Interceptor to add Authorization header
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

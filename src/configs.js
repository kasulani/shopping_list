import axios from "axios";
import store from "./store/configStore";
import { browserHistory } from 'react-router';

export function errorHandler(statusCode) {
  switch (statusCode) {
    case 404:
      // handle 404 error
      browserHistory.push('/error/404');
      break;
    default:
  }
}

export const AXIOS_INSTANCE = axios.create({
  baseURL: 'http://127.0.0.1:5000/v1',
  headers: {'Content-Type': 'application/json'}
});

AXIOS_INSTANCE.interceptors.request.use((config) => {
  const token = store.getState().user.token;
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});


export const TOASTR_CONFIG = {
  "positionClass": "toast-top-center",
  "closeButton": true,
  "newestOnTop": false,
  "preventDuplicates": true,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
};

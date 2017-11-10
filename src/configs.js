import axios from "axios";

export const AXIOS_INSTANCE = axios.create({
  baseURL: 'http://127.0.0.1:5000',
  headers: {'Content-Type': 'application/json'}
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

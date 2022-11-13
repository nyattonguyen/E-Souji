import axios from "axios";

const clientAxios = axios.create({
  baseURL: "http://localhost:3333/",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    Accept: "application/json",
    "access-control-allow-origin": "http://localhost:19006",
  },
  withCredentials: true,
});

clientAxios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
clientAxios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default clientAxios;
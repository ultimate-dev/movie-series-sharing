import { api_key, api_url } from "../configs";
import ax from "axios";
import { default_language } from "../locale";

const axios = ax.create({
  baseURL: api_url + "/",
});

const locale = localStorage.getItem("locale");

axios.interceptors.request.use(
  (config) => {
    config.headers.common["x-access-token"] = `Bearer ${localStorage.getItem(
      "userToken"
    )}`;
    config.headers.common["x-api-key"] = api_key;
    config.headers.common["locale"] = locale ? locale : default_language;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function post(endpoint, data) {
  return axios.post(endpoint, data).then((res) => res.data);
}
function put(endpoint, data) {
  return axios.put(endpoint, data).then((res) => res.data);
}
function get(endpoint, data) {
  return axios.get(endpoint, { headers: data }).then((res) => res.data);
}
function del(endpoint, data) {
  return axios.delete(endpoint, { headers: data }).then((res) => res.data);
}

export { post, put, get, del };

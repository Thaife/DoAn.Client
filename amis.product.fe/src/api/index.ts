import { Employee, EntitySystem, StorageService } from "@/core/public_api";
import { environment } from "@/environments/environment.prod";
import axios from "axios";
const axiosAPI = axios.create({
  baseURL: environment.BASE_API,
});

const user:Employee = JSON.parse(StorageService.getItemWithSystemConstants(EntitySystem.CurrentUser));
axiosAPI.interceptors.request.use(
  function (config) {
    config.headers.Authorization = `Bearer ${ user ? user.accessToken : ''}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosAPI.interceptors.request.use(
  function (config) {
    return config;
  },
);

axiosAPI.interceptors.response.use(
  function (response) {
    return response.data;
  },
);

export default axiosAPI;
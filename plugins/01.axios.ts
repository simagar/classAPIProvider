import axios, { isAxiosError } from "axios";
import { useCookie } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  const authStore = useAuthStore();
  const config = useRuntimeConfig().public;
  // let access_token: null | string = null;
  // if (cookie.value) {
  //   access_token = `Bearer ${cookie.value}`;
  // }

  const axiosInstance = axios.create({
    baseURL: `${config.apiAddress}/api/v1`,
    headers: {
      "Content-type": "application/json",
      "Accept-Language": "fa",
    },
  });
  // if (access_token) {
  //   axiosInstance.defaults.headers.common["Authorization"] = access_token;
  // }
  const cookie = useCookie("_token");
  axiosInstance.interceptors.request.use(async function (config) {
    let access_token = null;
    if (cookie.value) {
      access_token = `Bearer ${cookie.value}`;
    }
    if (access_token) {
      config.headers.Authorization = access_token;
    }
    return config;
  });

  axiosInstance.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      if (!process.server) {
        const alert = useAlerts();
        if (isAxiosError(error)) {
          if (error.response?.status === 401) {
            if (!process.server) {
              alert.error("لطفا برای ادامه دادن وارد سایت شوید");
              authStore.logout();
              const router = useRouter();
              router.push("/trip");
            }
            return;
          }
          if (error.response?.status === 403) {
            alert.error(
              "شما دسترسی های لازم برای مشاهده ی این صفحه یا عملیات را ندارید"
            );
            const router = useRouter();
            router.push("/trip");
            return;
          }
          if (error.code == "ERR_NETWORK") {
            alert.error("خطا در برقرار ارتباط با سرور");
            return;
          }

          throw error;
        }
        throw error;
      } else {
        if (isAxiosError(error)) {
          throw createError({
            statusCode: error?.response?.status,
            statusMessage: error.response?.statusText,
            data: error?.response?.data,
          });
        }
      }
    }
  );

  return {
    provide: {
      axios: axiosInstance,
    },
  };
});

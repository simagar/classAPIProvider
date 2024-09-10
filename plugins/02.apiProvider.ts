import type {AxiosInstance} from "axios";
import type {IApiProvider} from "@/models/IApiProvider";
import ExampleService from "@/services/ExampleService";

export default defineNuxtPlugin((nuxtApp) => {
    const axios = nuxtApp.$axios! as AxiosInstance;
    const api: IApiProvider = {
        example: new ExampleService(axios),
    };
    return {
        provide: {api: api},
    };
});

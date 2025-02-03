import type { $Fetch } from "ofetch";
import type { IApiProvider } from "@/models/IApiProvider";
import ExampleService from "@/services/ExampleService";

export default defineNuxtPlugin((nuxtApp) => {
  const httpClient = nuxtApp.$fetch! as $Fetch;
  const api: IApiProvider = {
    example: new ExampleService(httpClient),
  };
  return {
    provide: { api: api },
  };
});

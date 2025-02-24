import type { $Fetch } from "ofetch";
import type { IApiResult } from "@/models/IApiResult";
import type { IGlobalGridRequest } from "@/models/IGlobalGridRequest";
import type { IGlobalGridResult } from "@/models/IGlobalGridResult";

export default class ExampleService {
  constructor(private httpClient: $Fetch) {}

  get(): Promise<IApiResult<any>> {
    return this.httpClient("", {
      method: "GET",
    });
  }

  set(
    filters: IGlobalGridRequest
  ): Promise<IApiResult<IGlobalGridResult<any[]>>> {
    return this.httpClient("", {
      method: "GET",
      params: filters,
    });
  }

  getQuery(amount: string | number): Promise<IApiResult<any>> {
    return this.httpClient("", null, {
      method: "POST",
      params: {
        amount,
      },
    });
  }
}

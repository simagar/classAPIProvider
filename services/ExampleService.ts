import type {AxiosInstance, AxiosResponse} from "axios";
import type {IApiResult} from "@/models/IApiResult";
import type {IGlobalGridRequest} from "@/models/IGlobalGridRequest";
import type {IGlobalGridResult} from "@/models/IGlobalGridResult";


export default class ExampleService {
    constructor(private axiosInstance: AxiosInstance) {
    }

    get(): Promise<AxiosResponse<IApiResult<any>>> {
        return this.axiosInstance.get("");
    }

    set(filters: IGlobalGridRequest): Promise<
        AxiosResponse<IApiResult<IGlobalGridResult<any[]>>>
    > {
        return this.axiosInstance.get("", {
            params: filters,
        });
    }

    getQuery(
        amount: string | number
    ): Promise<AxiosResponse<IApiResult<any>>> {
        return this.axiosInstance.post("", null, {
            params: {
                amount,
            },
        });
    }
}

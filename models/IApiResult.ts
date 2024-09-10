import type { ApiResultStatusCode } from '@/models/Enums/ApiResultStatusCode'

export interface IApiResult<TData = void> {
  isSuccess: boolean
  statusCode: ApiResultStatusCode
  message: string
  data: TData
}

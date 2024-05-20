import { HttpService } from "@nestjs/axios";
import { firstValueFrom, map } from "rxjs";
import { UtilsParamHttpService } from "./utils.params.http-service.common";

/**
 *
 */
export class UtilsHttpService {
  url: string;
  params: UtilsParamHttpService;

  /**
   *
   * @param url
   * @param params
   * @param employee
   * @param httpService
   */
  constructor(
    url: string,
    params: any,
    private readonly httpService: HttpService
  ) {
    this.params = params;
    this.url = url;
  }

}

import { HttpService } from "@nestjs/axios";
import { firstValueFrom, map } from "rxjs";
import { UtilsParamHttpService } from "src/utils.common/utils.http-service.common/utils.params.http-service.common";

/**
 *
 */
export class UtilsHttpServiceCustom {
  url: string;
  params: UtilsParamHttpService;
  tokenPartner:string;
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
    tokenPartner:string,
    private readonly httpService: HttpService
  ) {
    this.params = params;
    this.url = url;
    this.tokenPartner = tokenPartner;
  }

  public async get() {
    const responseData = await firstValueFrom(
      this.httpService
        .get(this.url, {
          headers: {
            Authorization:`Bearer ${this.tokenPartner} `,
            "Content-Type": "application/json",
          },
        })
        .pipe(map((response) => [response.data]))
    );
    return responseData[0];
  }

  public async post() {
    let responseData = await firstValueFrom(
      this.httpService
        .post(this.url, this.params, {
          headers: {
            Authorization: `Bearer ${this.tokenPartner}`,
            "Content-Type": "application/json",
          },
        })
        .pipe(map((response) => [response.data]))
    );
    return responseData[0];
  }
}

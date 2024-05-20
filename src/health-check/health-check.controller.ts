import { Controller, Get, HttpStatus, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, getSchemaPath } from '@nestjs/swagger';
import { ResponseData } from 'src/utils.common/utils.response.common/utils.response.common';
import { SwaggerResponse } from 'src/utils.common/utils.swagger.common/utils.swagger.response';
import { Response } from "express";

@Controller('api/public')
export class HealthCheckController {
    constructor(

    ) { }
    @ApiOkResponse({
        schema: {
            allOf: [
                { $ref: getSchemaPath(SwaggerResponse) },
                {
                    properties: {
                        data: {

                        },
                    },
                },
            ],
        },
    })
    @Get("/health-check")
    @ApiOperation({ summary: "API health-check" })
    async healthCheck(
        @Res() res: Response,
    ): Promise<any> {
        let response: ResponseData = new ResponseData();
        response.setData({
            "build_number": process.env.CONFIG_BUILD_NUMBER,
            "build_time": process.env.CONFIG_BUILD_TIME
        })
        return res.status(HttpStatus.OK).send(response);
    }
}

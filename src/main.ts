import {
  HttpException,
  HttpStatus,
  LogLevel,
  ValidationError,
  ValidationPipe,
  VersioningType,
} from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import * as fs from "fs";
import * as os from "os";
import { AppModule } from "./app.module";
import { ExceptionResponseDetail } from "./utils.common/utils.exception.common/utils.exception.common";
import * as dotenv  from "dotenv";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
const envConfig = dotenv.parse(fs.readFileSync(".env"));

async function bootstrap() {
  process.env.uv_threadpool_size = os.cpus().length.toString();
    const app = await NestFactory.create(AppModule, {
      logger: process.env.CONFIG_LOGGER_LEVEL.split(',').filter(
        (level: string): level is LogLevel => {
          return ['log', 'error', 'warn', 'debug', 'verbose'].includes(
            level as LogLevel,
          );
        },
      ),
    });
  
    app.enableVersioning({
      type: VersioningType.URI,
    });
  
    app.setGlobalPrefix("/api")
  
    app.useGlobalPipes(
      new ValidationPipe({
        exceptionFactory: (validationErrors: ValidationError[] = []) => {
          throw new HttpException(
            new ExceptionResponseDetail(
              HttpStatus.BAD_REQUEST,
              Object.values(validationErrors[0].constraints)[0]
            ),
            HttpStatus.OK
          );
        },
      })
    );
  
    const config = new DocumentBuilder()
      .setTitle("REPORT VERSION 2")
      .setDescription(
        `
          CHÚ Ý!   
  
          Hệ thống lọc thời gian được phân theo 2 loại sau: 
            . Lọc theo Enum tự tạo (report_type, date_string)
                ReportTypeEnum.HOUR   - định dạng thời gian truyền xuống là: DD/MM/YYYY
                ReportTypeEnum.DAY    - định dạng thời gian truyền xuống là: DD/MM/YYYY
                ReportTypeEnum.WEEK,  - định dạng thời gian truyền xuống là: WW/YYYY
                ReportTypeEnum.MONTH  - định dạng thời gian truyền xuống là: MM/YYYY
                ReportTypeEnum.NEAREST_THREE_MONTHS - định dạng thời gian truyền xuống là: MM/YYYY
                ReportTypeEnum.YEAR     - định dạng thời gian truyền xuống là: YYYY
                ReportTypeEnum.THREE_YEARS - định dạng thời gian truyền xuống là: YYYY
                ReportTypeEnum.ALL_MONTHS  - định dạng thời gian truyền xuống là: MM/YYYY
                ReportTypeEnum.ALL_YEAR   - định dạng thời gian truyền xuống là: YYYY
                ReportTypeEnum.YESTERDAY  - định dạng thời gian truyền xuống là: DD/MM/YYYY
                ReportTypeEnum.LAST_MONTH - định dạng thời gian truyền xuống là: MM/YYYY
                ReportTypeEnum.LAST_YEAR - định dạng thời gian truyền xuống là: YYYY
  
            . Lọc theo Enum tự tạo (report_type, from_date, to_date)
                ReportTypeEnum.OPTION_HOUR - định dạng thời gian truyền xuống là: DD/MM/YYYY
                ReportTypeEnum.OPTION_DAY - định dạng thời gian truyền xuống là: DD/MM/YYYY
                ReportTypeEnum.OPTION_MONTH - định dạng thời gian truyền xuống là: MM/YYYY
                ReportTypeEnum.OPTION_YEAR - định dạng thời gian truyền xuống là: YYYY
  
  
  
              . Report_type
                HOUR = 0, //Lấy theo Tời gian
                DAY = 1, //lấy theo ngày
                WEEK = 2, // lấy theo tuần
                MONTH = 3, // lấy theo tháng
                NEAREST_THREE_MONTHS = 4, // lấy theo 3 tháng gần nhất
                YEAR = 5, // lấy theo năm
                THREE_YEARS = 6, // lấy theo 3 năm gần nhất
                ALL_MONTHS = 7, // lấy tất cả thời gian
                ALL_YEAR = 8, // lấy tất cả thời gian
                YESTERDAY = 9, // lấy theo ngày hôm qua
                LAST_MONTH = 10, // lấy theo tháng trước
                LAST_YEAR = 11, //Lấy theo năm trước
  
                OPTION_HOUR = 12,  //Tuỳ chọn theo giờ
                OPTION_DAY = 13,  //Tuỳ chọn theo ngày
                OPTION_WEEK = 14,  //Tuỳ chọn theo tuần
                OPTION_MONTH = 15,  //Tuỳ chọn theo tháng
                OPTION_YEAR = 16  //Tuỳ chọn theo năm
  
  
           `
      )
      .setVersion("2.0")
      .setBasePath("api")
      .addBearerAuth(
        { type: "http", scheme: "bearer", bearerFormat: "JWT" },
        "access-token"
      )
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document);
  
    app.enableCors();
    await app.listen(process.env.SERVICE_PORT, "0.0.0.0");
  
    let moment = require('moment-timezone');
    console.log(moment().tz("Asia/Ho_Chi_Minh").format());
  
  for (const k in envConfig) {
    console.log(`${k}=${envConfig[k]}`);
  }
  
}
bootstrap();

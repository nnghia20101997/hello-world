import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

import { HealthCheckModule } from "./health-check/health-check.module";
import { GrpcModule } from "./grpc/grpc.module";
import { KafkaModule } from "./kafka/kafka.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      `mongodb://${
        process.env.CONFIG_MONGO_USERNAME_DEVICE_MANAGEMENT
      }:${encodeURIComponent(
        process.env.CONFIG_MONGO_PASSWORD_DEVICE_MANAGEMENT
      )}@${process.env.CONFIG_MONGO_HOST_DEVICE_MANAGEMENT}:${
        process.env.CONFIG_MONGO_PORT_DEVICE_MANAGEMENT
      }/${process.env.CONFIG_MONGO_DB_NAME_DEVICE_MANAGEMENT}`,
      { autoIndex: true }
    ),
    HealthCheckModule,
    GrpcModule,
    KafkaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    console.log(
      `mongodb://${
        process.env.CONFIG_MONGO_USERNAME_DEVICE_MANAGEMENT
      }:${encodeURIComponent(
        process.env.CONFIG_MONGO_PASSWORD_DEVICE_MANAGEMENT
      )}@${process.env.CONFIG_MONGO_HOST_DEVICE_MANAGEMENT}:${
        process.env.CONFIG_MONGO_PORT_DEVICE_MANAGEMENT
      }/${process.env.CONFIG_MONGO_DB_NAME_DEVICE_MANAGEMENT}`
    );
  }
}

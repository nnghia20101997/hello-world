import { Global, Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { join } from "path";

const retryOptions = {
  max_retries: 3, // Set the maximum number of retries
  initial_backoff_ms: 1000, // Initial backoff time in milliseconds
  max_backoff_ms: 5000, // Maximum backoff time in milliseconds
  backoff_multiplier: 1.5, // Backoff multiplier
  retryable_status_codes: [14] // Status codes to retry
};
@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: "GRPC_JAVA_FAOUT_SYNC",
        transport: Transport.GRPC,
        options: {
          package: "vn.techres.grpc.java.customer_device.service",
          protoPath: join(__dirname, "./protos/customer-device.proto"),
          url: `${process.env.CONFIG_GRPC_JAVA_FANOUT_SYNC_HOST}:${process.env.CONFIG_GRPC_JAVA_FANOUT_SYNC_PORT}`,
          loader: {
            keepCase: true,
          },
          keepalive: {
            keepaliveTimeMs: 60000,
            keepaliveTimeoutMs: 20000,
            keepalivePermitWithoutCalls: 0,
            ...(retryOptions && { retry: retryOptions })
          },
          channelOptions: {
            grpcOptions: {
              "grpc.http2.max_frame_size": 1024 * 1024 * 10, // Set the maximum frame size if needed
            },
          },
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class GrpcModule {}

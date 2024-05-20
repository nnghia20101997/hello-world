import { Module } from "@nestjs/common";
import { ConsumerService } from "src/kafka/consumer.service";
import { Consumer } from "./consumer";
import { KafkaService } from "./kafka.service";

@Module({
  imports: [
  ],
  providers: [KafkaService, ConsumerService, Consumer],
  exports: [KafkaService, ConsumerService, Consumer]
})
export class KafkaModule {
}

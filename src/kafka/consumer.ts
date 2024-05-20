import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConsumerService } from "src/kafka/consumer.service";

@Injectable()
export class Consumer implements OnModuleInit {
  constructor(
    private readonly consumerService: ConsumerService,
  ) {}

  async onModuleInit() {
    await this.consumerService.consumerElectricInvoice(
      {
        topic: "kafka.topic.invoice-sync",
        partition: 0,
        offset: "",
      },
      {
        eachMessage: async ({ topic, partition, message }): Promise<void> => {
          console.log("abc");
          
      }
    }
    );
  }
}

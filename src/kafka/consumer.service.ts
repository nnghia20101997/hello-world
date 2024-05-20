import { Injectable, OnApplicationShutdown } from "@nestjs/common";
import { TopicPartitionOffset } from "@nestjs/microservices/external/kafka.interface";
import {
  Consumer,
  ConsumerRunConfig,
  Kafka
} from "kafkajs";

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
  private readonly kafka = new Kafka({
    brokers: [
      `${process.env.CONFIG_KAFKA_HOST_DEVICE_MANAGEMENT}:${process.env.CONFIG_KAFKA_PORT_DEVICE_MANAGEMENT}`
    ]
  });
    private readonly consumers: Consumer[] = [];

  /**
   *
   * @param topic
   * @param config
   */

  async consumerElectricInvoice(
    topic: TopicPartitionOffset,
    config: ConsumerRunConfig
  ): Promise<void> {
    const consumer = this.kafka.consumer({ groupId: "electric-invoices" });
    await consumer.connect();
    await consumer.subscribe(topic);
    await consumer.run(config);
    this.consumers.push(consumer);
  }
  async onApplicationShutdown() {
    // @ts-ignore
    for (const consumer: Consumer of this.consumers) {
      await consumer.disconnect();
    }
  }
}

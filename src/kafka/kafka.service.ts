import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit
} from "@nestjs/common";
import { Consumer, Kafka , Producer, ProducerRecord } from "kafkajs";

@Injectable()
export class KafkaService implements OnModuleInit, OnApplicationShutdown {
  
  private readonly kafka = new Kafka({
    brokers: [
      `${process.env.CONFIG_KAFKA_HOST_DEVICE_MANAGEMENT}:${process.env.CONFIG_KAFKA_PORT_DEVICE_MANAGEMENT}`
    ]
  });
  private readonly producer: Producer = this.kafka.producer();
  private consumer: Consumer;

  async onModuleInit() {
    try {
      await this.producer.connect();
      // @ts-ignore
    } catch (error) {
      console.error("Failed to connect to Kafka server:", error);
    }
  }

  async produce(record: ProducerRecord) {
    await this.producer.send(record);
  }

  async onApplicationShutdown(signal?: string) {
    await this.disconnect();
  }

  async disconnect() {
    try {
      await this.producer.disconnect();
      if (this.consumer) {
        await this.consumer.disconnect();
      }
      console.log("Disconnected from Kafka server");
    } catch (error) {
      console.error("Error while disconnecting from Kafka server:", error);
    }
  }
}

// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.176.0
//   protoc               v5.26.1
// source: src/grpc/protos/customer-device.proto

/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "vn.techres.grpc.java.customer_device.service";

export interface CustomerDeviceDTO {
  restaurantId: number;
  page: number;
  limit: number;
}

export interface EmptyDataResponse {
  status: number;
  message: string;
  data: DataListResponse | undefined;
}

export interface DataListResponse {
  limit: number;
  totalRecord: number;
  list: CustomerDeviceResponse[];
}

export interface CustomerDeviceResponse {
  customerId: number;
  deviceUid: string;
  pushToken: string;
  appType: number;
  platformType: number;
  createdAt: string;
  updatedAt: string;
}

export interface Empty {
}

export const VN_TECHRES_GRPC_JAVA_CUSTOMER_DEVICE_SERVICE_PACKAGE_NAME = "vn.techres.grpc.java.customer_device.service";

export interface CustomerDeviceServiceClient {
  syncCustomerDevice(request: CustomerDeviceDTO, metadata?: Metadata): Observable<EmptyDataResponse>;
}

export interface CustomerDeviceServiceController {
  syncCustomerDevice(
    request: CustomerDeviceDTO,
    metadata?: Metadata,
  ): Promise<EmptyDataResponse> | Observable<EmptyDataResponse> | EmptyDataResponse;
}

export function CustomerDeviceServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["syncCustomerDevice"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("CustomerDeviceService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("CustomerDeviceService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const CUSTOMER_DEVICE_SERVICE_NAME = "CustomerDeviceService";

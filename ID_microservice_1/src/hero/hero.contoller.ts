import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

export interface HeroId {
  id: string;
}
export interface Hero {
  id: string;
}


@Controller()
export class HeroController {
  private readonly logger = new Logger(HeroController.name);

  @GrpcMethod('HeroService', 'Hello')
  hello(
    data: HeroId,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): Hero {
    this.logger.log(
      `The microservice has been called with the data of ${data.id}`,
    );
    return {
      id: data.id,
    };
  }
}

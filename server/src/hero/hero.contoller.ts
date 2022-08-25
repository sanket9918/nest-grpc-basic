import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

export interface HeroId {
  id: string;
}
export interface Hero {
  id: string;
}
@Controller()
export class HeroController {
  @GrpcMethod('HeroService', 'Hello')
  hello(
    data: HeroId,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): Hero {
    const items = [{ id: 'hello' }];
    return {
      id: items[0].id,
    };
  }
}

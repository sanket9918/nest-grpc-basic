import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Controller, Logger, UseFilters } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { ExceptionFilter } from 'src/rpc-exception-filter';

export interface HeroId {
  id: string;
}
export interface Hero {
  id: string;
}

export interface ICustomError {
  error: {
    message: string;
  };
}

@Controller()
export class HeroController {
  private readonly logger = new Logger(HeroController.name);

  @UseFilters(ExceptionFilter)
  @GrpcMethod('HeroService', 'Hello')
  hello(
    data: HeroId,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): Hero | ICustomError {
    this.logger.log(
      `The microservice has been called with the data of ${data.id}`,
    );
    if (data.id === 'Sanket1') {
      return {
        // This setup is to demostrate the custom error scenarios where the error has to pass through multiple microserices where the generic error handlers will fail to do the same or will probably require more work to be handled properly. Handle the error by using an entity in the proto file. For unknown errors , no need to pass it upto gateway , rather handle it local or see from the logs.
        error: {
          message: 'Wrong',
        },
      };
    } else {
      return {
        id: data.id,
      };
    }
  }
}

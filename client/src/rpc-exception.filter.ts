import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

export interface IRpcException {
  message: string;
  status: number;
}

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const exceptionDetails = JSON.parse(exception.details);

    const httpStatus = exceptionDetails.statusCode
      ? exceptionDetails.statusCode
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: exceptionDetails.statusCode,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message: exceptionDetails.message,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}

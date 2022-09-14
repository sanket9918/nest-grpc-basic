import { RpcException } from "@nestjs/microservices";

export interface ICustomException {
    status: number;
    message: string;
}

export class CustomRpcException
  extends RpcException
  implements ICustomException
{
  constructor(message: string, statusCode: number) {
   super(JSON.stringify({ message, statusCode }));
    this.initStatusCode(statusCode);
  }
  public status: number;
  private initStatusCode(statusCode: number) {
    this.status = statusCode;
  }
}
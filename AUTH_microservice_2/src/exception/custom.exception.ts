import { RpcException } from "@nestjs/microservices";

export interface ICustomException {
    status: number;
    message: string;
}

export class CustomRpcException extends RpcException implements ICustomException {
    constructor(message: string, statusCode: number) {
        super(message);

    }
    public status: number;
    private initStatusCode(statusCode) {
        this.status = statusCode;
    }
}
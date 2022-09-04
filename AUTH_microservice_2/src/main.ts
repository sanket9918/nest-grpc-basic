import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';
import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';



const microServiceOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'app',
    protoPath: join(__dirname, '../src/app.proto'),
    url: 'auth_api:50051',
  },
};
async function bootstrap() {
  const logger = new Logger();
  // const app = await NestFactory.create(AppModule);

  const app = await NestFactory.createMicroservice(AppModule, microServiceOptions);
  // app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  // const port = process.env.PORT;
  await app.listen()
 
}
bootstrap();

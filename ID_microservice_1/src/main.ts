import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'app',
        protoPath: join(__dirname, '../src/app.proto'),
        url: 'id_api:50051',
      },
    },
  );

  await app.listen();
}
bootstrap();

import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'HERO',
        transport: Transport.GRPC,
        options: {
          package: 'app',
          protoPath: join(__dirname, '../src/app.proto'),
          url: 'id_api:50051',
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'AUTH',
        transport: Transport.GRPC,
        options: {
          package: 'app',
          protoPath: join(__dirname, '../src/app.proto'),
          url: 'auth_api:50051',
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

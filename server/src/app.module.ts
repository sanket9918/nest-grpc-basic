import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { HeroController } from './hero/hero.contoller';

@Module({
  imports: [],
  controllers: [HeroController],
  providers: [AppService],
})
export class AppModule {}

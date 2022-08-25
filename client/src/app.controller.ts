import { Body, Controller, Get } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Body('id') id:string ): Observable<string> {
    return this.appService.hello(id);
  }
}

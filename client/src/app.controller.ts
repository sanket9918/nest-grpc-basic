import { Body, Controller, Get, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppService, AuthCredentialDTO } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Body('id') id: string): Observable<string> {
    return this.appService.hello(id);
  }

  @Post()
  signUp(@Body() authCredentials: AuthCredentialDTO): Observable<any> {
    return this.appService.signup(authCredentials);
  }
  @Post('/signin')
  signin(@Body() authCredentials: AuthCredentialDTO): Observable<any> {
    return this.appService.signIn(authCredentials);
  }
}

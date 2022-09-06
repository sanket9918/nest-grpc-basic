import { Body, Controller, Get, Logger, Post, UseFilters } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppService, AuthCredentialDTO } from './app.service';
import { CustomExceptionFilter } from './rpc-exception.filter';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  private logger: Logger = new Logger(AppController.name);

  @Get()
  getHello(@Body('id') id: string): Observable<string> {
    this.logger.log('Hitting the endpoint (TEST local API).');
    return this.appService.hello(id);
  }

  @Get('/test')
  getTest(@Body('test') test: string): string {
    this.logger.log('Hitting the endpoint.');
    return test;
  }

  @Post('/signup')
  @UseFilters(CustomExceptionFilter)
  signUp(@Body() authCredentials: AuthCredentialDTO): Observable<any> {
    return this.appService.signup(authCredentials);
  }
  @Post('/signin')
  signin(@Body() authCredentials: AuthCredentialDTO): Observable<any> {
    return this.appService.signIn(authCredentials);
  }
}

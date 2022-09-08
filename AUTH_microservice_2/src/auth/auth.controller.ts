import { Body, Controller, Get, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

export interface AuthResponse {}
export interface LoginResponse {
  accessToken: string;
}
@Controller()
export class AuthController {
  private logger: Logger = new Logger(AuthController.name);
  constructor(private authService: AuthService) {}

  /**
   * The methods for behaving as a client does not work like this as the client in this case is itself a microservice.
   */
  // @Get('/id')
  // getHello(@Body('id') id: string): Observable<string> {
  //   this.logger.log(`Response from Auth microservice acting as client`);
  //   return this.authService.hello(id);
  // }

  /**
   * The GRPC methods that are required as when acting as a microservice
   */
  @GrpcMethod('AuthController', 'Hello')
  helloAuth(@Body('id') id: string): Observable<string> {
    this.logger.log('');
    return this.authService.helloAuth(id);
  }

  @GrpcMethod('AuthController', 'SignUp')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): AuthResponse {
    this.logger.log(
      `Registering user with user id ${authCredentialsDto.username}`,
    );
    return this.authService.signUp(authCredentialsDto);
  }

  @GrpcMethod('AuthController', 'SignIn')
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<LoginResponse> {
    this.logger.log(`Logging user with user id ${authCredentialsDto.username}`);

    return this.authService.signIn(authCredentialsDto);
  }
}

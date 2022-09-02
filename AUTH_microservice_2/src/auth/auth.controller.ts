import { Body, Controller, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
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

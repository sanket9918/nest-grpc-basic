import { Body, Controller, Post } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';


export interface AuthResponse {

}
export interface LoginResponse{
  accessToken: string;
}
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  // @Post('/signup')
  @GrpcMethod('AuthController','SignUp')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): AuthResponse{
    return this.authService.signUp(authCredentialsDto);
  }

  // @Post('/signin')
  @GrpcMethod("AuthController","SignIn")
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<LoginResponse> {
    return this.authService.signIn(authCredentialsDto);
  }
}

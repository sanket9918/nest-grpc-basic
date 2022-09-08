import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export interface HeroId {
  id: string;
}

interface HeroService {
  hello(data: HeroId): Observable<any>;
}

interface AuthService {
  signUp(authCredential: AuthCredentialDTO): Observable<any>;
  signIn(authCredential: AuthCredentialDTO): Observable<any>;
  hello(data: HeroId): Observable<any>;
}

export interface AuthCredentialDTO {
  username: string;
  password: string;
}

@Injectable()
export class AppService implements OnModuleInit {
  private heroService: HeroService;
  private authService: AuthService;

  constructor(
    @Inject('HERO') private clientHero: ClientGrpc,
    @Inject('AUTH') private clientAuth: ClientGrpc,
  ) {}

  onModuleInit() {
    this.heroService = this.clientHero.getService<HeroService>('HeroService');
    this.authService =
      this.clientAuth.getService<AuthService>('AuthController');
  }

  hello(id): Observable<string> {
    return this.heroService.hello({ id });
  }

  signup(authCredential: AuthCredentialDTO): Observable<any> {
    return this.authService.signUp(authCredential);
  }

  signIn(authCredential: AuthCredentialDTO): Observable<any> {
    return this.authService.signIn(authCredential);
  }

  helloAuth(id): Observable<string> {
    return this.authService.hello({ id });
  }
}

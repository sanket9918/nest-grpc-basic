import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt/jwt-payload.interface';
import { LoginResponse } from './auth.controller';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { CustomRpcException } from '../exception/custom.exception';
import { Observable } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';

/**
 * Interface related to the ID microservice
 */
interface HeroService {
  hello(data: HeroId): Observable<any>;
}
export interface HeroId {
  id: string;
}

@Injectable()
export class AuthService implements OnModuleInit {
  private heroService: HeroService;
  constructor(
    @Inject('HERO') private clientHero: ClientGrpc,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  onModuleInit() {
    this.heroService = this.clientHero.getService<HeroService>('HeroService');
  }

  private logger: Logger = new Logger(AuthService.name);

  helloAuth(id): Observable<string> {
    this.logger.log(
      `This call is from Auth and currently tranferring context to ID`,
    );
    return this.heroService.hello({ id });
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
    });

    try {
      await this.usersRepository.save(user);  
    } catch (error) {
      if (error.code === '23505') {
        // duplicate username
        throw new CustomRpcException('Username already exists', 401);
      } else {
        throw new CustomRpcException(error, 500);
      }
    }
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<LoginResponse> {
    const { username, password } = authCredentialsDto;
    const user = await this.usersRepository.findOne({
      where: { username: username },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new CustomRpcException('Invalid login credentials', 404);
    }
  }
}

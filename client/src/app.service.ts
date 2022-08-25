import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export interface HeroId {
  id: string;
}

interface HeroService {
  hello(data: HeroId): Observable<any>;
}

@Injectable()
export class AppService implements OnModuleInit {
  private heroService: HeroService;
  constructor(@Inject('HERO') private client: ClientGrpc) {}

  onModuleInit() {
    this.heroService = this.client.getService<HeroService>('HeroService');
  }

  hello(id): Observable<string> {
    return this.heroService.hello({ id });
  }
}

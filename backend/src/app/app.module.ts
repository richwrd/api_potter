import { Module, Logger, OnModuleInit } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

import { AppGateway } from './app.gateway';
import { TimeoutInterceptor } from '../common/interceptors/timeout.interceptor';
import { ResponseHeaderInterceptor } from '../common/interceptors/response-header.interceptor';

import { AuthModule } from '../auth/auth.module';
import { PersonagensModule } from '../domains/personagens/personagens.module';
import { UsuariosModule } from '../auth/usuarios/usuarios.module';

@Module({
  imports: [
    AuthModule,
    UsuariosModule,
    PersonagensModule,
    MongooseModule.forRoot('mongodb://localhost/api_potter')
  ],
  controllers: [],
  providers: [AppGateway,
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseHeaderInterceptor,
    },
  ],
})
export class AppModule implements OnModuleInit{ 
  private readonly loggerTimeoutInterceptor = new Logger('TimeoutInterceptor');
  private readonly loggerResponseHeaderInterceptor = new Logger('ResponseHeaderInterceptor');

  onModuleInit() {
    this.loggerTimeoutInterceptor.log('ON');
    this.loggerResponseHeaderInterceptor.log('ON');
  }
}

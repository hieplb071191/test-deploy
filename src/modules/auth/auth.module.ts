import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';

import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthJwtStrategy } from './strategies/auth.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return {
          global: true,
          secret: config.get<string>('SECRECT_JWT'),
          signOptions: { 
            expiresIn: config.get<string>('EXPIRED_TOKEN') || '30s'
          },
        }
      },
      inject: [ConfigService]
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthJwtStrategy]
})
export class AuthModule {}

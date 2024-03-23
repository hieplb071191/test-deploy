import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';


@Injectable()
export class AuthJwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme(
        'Bearer'
      ),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRECT_JWT,
      jsonWebTokenOptions: {
        ignoreNotBefore: true
      }
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
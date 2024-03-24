import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';


@Injectable()
export class AuthJwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly authService: AuthService,
  ) {
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
    const user = await this.authService.validateUser(payload)
    return user
  }
}
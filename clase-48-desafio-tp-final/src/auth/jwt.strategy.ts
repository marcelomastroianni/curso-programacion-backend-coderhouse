import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

import {config } from '../config/config';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.SESION_SECRET,
    });
  }

  async validate(payload: any) {
    return { uuid: payload.sub, username: payload.username, is_admin: payload.is_admin, email : payload.email };
    //return { userId: payload.sub, username: payload.username };
  }
}

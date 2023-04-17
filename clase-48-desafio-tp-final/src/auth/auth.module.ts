import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
//import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';

import {config } from '../config/config';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.register({
      secret: config.SESION_SECRET,
      signOptions: { expiresIn: config.SESION_EXPIRATION },
    }),
  ],
  providers: [AuthService, LocalStrategy,JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}

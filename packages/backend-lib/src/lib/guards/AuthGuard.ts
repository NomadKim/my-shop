import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JWTService } from '../jwt/JWTService';
import { DatabaseClient } from '../database/database-client';
import { JWTObject } from '../jwt/dtos';
import { Reflector } from '@nestjs/core';
import { BCCrypt } from '../auth/BCCrypt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwt: JWTService,
    private databaseClient: DatabaseClient,
    private reflector: Reflector,
    private bcrypt: BCCrypt
  ) {}

  async canActivate(context: ExecutionContext) {
    if (this.reflector.get<boolean>('public', context.getHandler())) {
      return true;
    }
    let tokenObject;
    let user;
    try {
      tokenObject = this.jwt.jwtverify(
        context.switchToHttp().getRequest().get('Authorization')
      ) as JWTObject;
      user = await this.databaseClient.user.findUnique({
        where: {
          email: tokenObject.email,
        },
      });
    } catch {
      throw new UnauthorizedException();
    }
    if (this.reflector.get<boolean>('checkRole', context.getHandler())) {
      if (user?.roleId !== 2) {
        throw new UnauthorizedException();
      }
    }
    if (
      await this.bcrypt.compare(user?.password as string, tokenObject.password)
    ) {
      return true;
    } else {
      throw new UnauthorizedException();
    }
  }
}

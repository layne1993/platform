import { AuthGuard } from '@nestjs/passport';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './constant';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const loginAuth = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (loginAuth) {
      return true;
    }

    return super.canActivate(context);
  }

  getRequest(context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    return request;
  }

  handleRequest(err, user: any, _info: any, context: ExecutionContext): any {
    const req = context.switchToHttp().getRequest();
    const hasAdmin = req.url.includes('admin');
    const errorFlag =
      !!err ||
      !user ||
      (!hasAdmin && user?.source === 'admin') ||
      (hasAdmin && user?.source !== 'admin');
    if (errorFlag) {
      throw new UnauthorizedException('身份验证失败');
    }
    return user;
  }
}

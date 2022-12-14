import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';

interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(private readonly reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const IS_STREAM = this.reflector.getAllAndOverride<boolean>('isStream', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (IS_STREAM) return next.handle().pipe();

    return next.handle().pipe(
      map((data) => ({
        data,
        code: 200,
        extra: {},
        message: '请求成功',
        flag: true,
      })),
    );
  }
}

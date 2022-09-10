import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { UserInfoDto } from 'src/dtos/auth.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('SECRET_KEY'),
    } as StrategyOptions);
  }

  // JWT验证 - Step 4: 被守卫调用
  async validate(payload: UserInfoDto) {
    const user = await this.authService.getUser(payload);
    return {
      id: user.id,
      username: user.username,
      mobile: user.mobile,
      source: user.source,
    };
  }
}

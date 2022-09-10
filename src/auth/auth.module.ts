import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PublicModule } from 'src/module/public/public.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

const jwtModule = JwtModule.registerAsync({
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    return {
      secret: configService.get('SECRET_KEY'),
      signOptions: { expiresIn: '4h' },
    };
  },
});

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    jwtModule,
    PublicModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [jwtModule],
})
export class AuthModule {}

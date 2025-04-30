// auth.module.ts
import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { envConfig } from 'src/core/config';

@Global() // Makes it available across the app
@Module({
  imports: [
    JwtModule.register({
      secret: envConfig.JWT_ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  exports: [JwtModule],
})
export class AuthModule {}

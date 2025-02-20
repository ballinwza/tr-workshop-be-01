import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import mongooseConfig from './common/configs/mongoose.config';
import { ConfigName } from './common/enums/configName.enum';
import { PlacardModule } from './placard/placard.module';
import { UserModule } from './user/user.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mongooseConfig],
      envFilePath: join(process.cwd(), `.env`),
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get(ConfigName.MongooseConfig),
      }),
    }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
        },
      }),
    }),
    AuthModule,
    UserModule,
    CommentModule,
    PlacardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

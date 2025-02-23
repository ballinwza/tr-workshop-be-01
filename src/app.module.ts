import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import mongooseConfig from './common/configs/mongoose.config';
import { ConfigName } from './common/enums/configName.enum';
import { PlacardModule } from './placard/placard.module';
import { UserModule } from './user/user.module';
import { GuardModule } from './guard/guard.module';

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
    AuthModule,
    UserModule,
    CommentModule,
    PlacardModule,
    GuardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

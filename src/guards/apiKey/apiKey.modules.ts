import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiKeyGuard } from './apiKey.guard';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: ApiKeyGuard,
    },
  ],
})
export class ApiKeyModule {}

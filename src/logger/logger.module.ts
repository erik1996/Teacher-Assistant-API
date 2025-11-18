import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerService } from './logger.service';
import { ContextService } from './context.service';
import { CustomTypeOrmLogger } from './typeorm-logger';
import { LoggerParams } from './types/logger.params';

const loggerParamsProvider = {
  provide: LoggerParams,
  useFactory: (configService: ConfigService) => new LoggerParams(configService),
  inject: [ConfigService],
};

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    LoggerService,
    loggerParamsProvider,
    ContextService,
    CustomTypeOrmLogger,
  ],
  exports: [
    LoggerService,
    loggerParamsProvider,
    ContextService,
    CustomTypeOrmLogger,
  ],
})
export class LoggerModule {}

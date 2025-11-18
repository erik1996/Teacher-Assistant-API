import { ConfigService } from '@nestjs/config';
import { LogLevel } from './logger';

export class LoggerParams {
  project: string;
  level: LogLevel;

  constructor(configService: ConfigService) {
    this.project = configService.get<string>('GCP_PROJECT_ID') || '';
    this.level = configService.get<LogLevel>('LOG_LEVEL') || LogLevel.INFO;
  }
}

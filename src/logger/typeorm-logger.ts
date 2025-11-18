import { Logger as TypeOrmLogger } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { ContextService } from './context.service';

@Injectable()
export class CustomTypeOrmLogger implements TypeOrmLogger {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly contextService: ContextService,
  ) {}

  private getContextLogger() {
    const logger = this.contextService.getLogger();
    return (
      logger || {
        audit: (msg: string, data?: any) =>
          this.loggerService.audit(
            msg,
            { spanId: 'no-context', traceId: 'no-context' },
            data,
          ),
        info: (msg: string, data?: any) =>
          this.loggerService.info(
            msg,
            { spanId: 'no-context', traceId: 'no-context' },
            data,
          ),
        debug: (msg: string, data?: any) =>
          this.loggerService.debug(
            msg,
            { spanId: 'no-context', traceId: 'no-context' },
            data,
          ),
        warn: (msg: string, data?: any) =>
          this.loggerService.warn(
            msg,
            { spanId: 'no-context', traceId: 'no-context' },
            data,
          ),
        error: (msg: string, data?: any) =>
          this.loggerService.error(
            msg,
            { spanId: 'no-context', traceId: 'no-context' },
            data,
          ),
      }
    );
  }

  logQuery(query: string, parameters?: any[]): void {
    const logger = this.getContextLogger();
    logger.debug('TypeORM Query', { query, parameters });
  }

  logQueryError(error: string, query: string, parameters?: any[]): void {
    const logger = this.getContextLogger();
    logger.error('TypeORM Query Error', { error, query, parameters });
  }

  logQuerySlow(time: number, query: string, parameters?: any[]): void {
    const logger = this.getContextLogger();
    logger.warn('TypeORM Slow Query', { time, query, parameters });
  }

  logSchemaBuild(message: string): void {
    const logger = this.getContextLogger();
    logger.info('TypeORM Schema Build', { message });
  }

  logMigration(message: string): void {
    const logger = this.getContextLogger();
    logger.info('TypeORM Migration', { message });
  }

  log(level: 'log' | 'info' | 'warn', message: any): void {
    const logger = this.getContextLogger();
    switch (level) {
      case 'log':
      case 'info':
        logger.info('TypeORM Log', { message });
        break;
      case 'warn':
        logger.warn('TypeORM Warning', { message });
        break;
    }
  }
}

import { Injectable } from '@nestjs/common';
import { Logging } from '@google-cloud/logging';
import stringify from 'fast-safe-stringify';
import { LoggerTrace, LogLevel } from './types/logger';
import { LoggerParams } from './types/logger.params';

@Injectable()
export class LoggerService {
  private logging: Logging;

  constructor(private readonly loggerParams: LoggerParams) {
    this.logging = new Logging();
  }

  private logToGoogle(
    level: LogLevel,
    message: string,
    trace: LoggerTrace,
    data?: any,
  ) {
    const metadata: Record<string, unknown> = {
      message,
      ...(data ? data : {}),
      timestamp: new Date(),
      severity: level.toUpperCase(),
      'logging.googleapis.com/spanId': trace.spanId,
      'logging.googleapis.com/trace': `projects/${this.loggerParams.project}/traces/${trace.traceId}`,
    };

    const toWrite = this.stringifyJson(metadata, true);
    process.stdout.write(toWrite);
  }

  error(message: string, trace: LoggerTrace, ...args: unknown[]): void {
    this.logToGoogle(LogLevel.ERROR, message, trace, ...args);
  }

  warn(message: string, trace: LoggerTrace, ...args: unknown[]): void {
    this.logToGoogle(LogLevel.WARN, message, trace, ...args);
  }

  info(message: string, trace: LoggerTrace, ...args: unknown[]): void {
    this.logToGoogle(LogLevel.INFO, message, trace, ...args);
  }

  debug(message: string, trace: LoggerTrace, ...args: unknown[]): void {
    this.logToGoogle(LogLevel.DEBUG, message, trace, ...args);
  }

  audit(message: string, trace: LoggerTrace, ...args: unknown[]): void {
    this.logToGoogle(LogLevel.INFO, `Audit: ${message}`, trace, ...args);
  }

  private stringifyJson(obj: Record<string, unknown>, singleLine: boolean) {
    const suffix = '\n';
    try {
      return (
        JSON.stringify(obj, undefined, singleLine ? undefined : 2) + suffix
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return stringify(obj, undefined, singleLine ? undefined : 2) + suffix;
    }
  }
}

// src/logger/logger.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { LoggerService } from './logger.service';
import { ContextService } from './context.service';
import { LoggerTrace } from './types/logger';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly contextService: ContextService,
  ) {}

  use(req: Request, _res: Response, next: NextFunction) {
    const traceHeader = req.headers['x-cloud-trace-context'] || '';
    const [trace, gcpSpanId] = (traceHeader as string).split('/');
    const spanId =
      (req.headers['x-ar-span-id'] as string) || gcpSpanId || uuidv4();
    const requestTrace: LoggerTrace = {
      spanId: spanId,
      traceId: (req.headers['x-ar-trace-id'] as string) || trace || spanId,
    };

    const logger = {
      audit: (msg, data?) => this.loggerService.audit(msg, requestTrace, data),
      info: (msg, data?) => this.loggerService.info(msg, requestTrace, data),
      debug: (msg, data?) => this.loggerService.debug(msg, requestTrace, data),
      warn: (msg, data?) => this.loggerService.warn(msg, requestTrace, data),
      error: (msg, data?) => this.loggerService.error(msg, requestTrace, data),
    };

    // Set logger on request object for backward compatibility
    req.logger = logger;

    // Log request body using debug
    logger.debug(`Request body for ${req.method} ${req.url}`, {
      body: this.sanitizeBody(req.body),
    });

    // Use context service to store the context
    this.contextService.run({ logger }, () => {
      next();
    });
  }

  /**
   * Sanitize request body to remove sensitive information
   */
  private sanitizeBody(body: any): any {
    if (!body || typeof body !== 'object') {
      return body;
    }

    const sanitized = JSON.parse(JSON.stringify(body));

    // Fields to redact from request body
    const sensitiveFields = [
      'password',
      'token',
      'secret',
      'key',
      'authorization',
      'creditCard',
      'ssn',
    ];

    this.redactSensitiveFields(sanitized, sensitiveFields);

    return sanitized;
  }

  /**
   * Recursively redact sensitive fields from an object
   */
  private redactSensitiveFields(obj: any, sensitiveFields: string[]): void {
    if (!obj || typeof obj !== 'object') return;

    Object.keys(obj).forEach((key) => {
      const lowerKey = key.toLowerCase();

      if (
        sensitiveFields.some((field) => lowerKey.includes(field.toLowerCase()))
      ) {
        obj[key] = '[REDACTED]';
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        this.redactSensitiveFields(obj[key], sensitiveFields);
      }
    });
  }
}

export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
}

export interface LogOptions {
  singleLine?: boolean;
}

export interface LoggerParams {
  level: LogLevel;
  singleLine: boolean;
  project: string;
  env: string;
}

export interface LoggerTrace {
  traceId: string;
  spanId: string;
  incidentId?: string;
}

export interface LoggerAuditRequest extends Request {
  originalUrl: string;
}

export type NotificationType = 'audit' | 'error' | 'info' | 'debug' | 'warn';

export type RequestLogger = {
  audit: (message: string, data?: unknown) => void;
  error: (message: string, data?: unknown) => void;
  warn: (message: string, data?: unknown) => void;
  info: (message: string, data?: unknown) => void;
  debug: (message: string, data?: unknown) => void;
};

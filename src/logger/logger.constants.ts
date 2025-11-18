import { NotificationType } from './types/logger';

export const CHANNELS = {
  EMAIL: ['error'],
  SLACK: ['error', 'warn'],
  LOG: ['info', 'debug', 'warn', 'error', 'audit'],
};

export type Channel = (typeof CHANNELS)[keyof typeof CHANNELS];

export const CONTEXTS = {
  INTEGRATION_SERVICE: 'Integration Service',
} as const;

export type Context = (typeof CONTEXTS)[keyof typeof CONTEXTS];

export const NOTIFICATION_TYPES = {
  AUDIT: 'audit' as NotificationType,
  WARNING: 'warn' as NotificationType,
  FAIL: 'fail' as NotificationType,
  ERROR: 'error' as NotificationType,
  INFO: 'info' as NotificationType,
  DEBUG: 'debug' as NotificationType,
} as const;

import { AuthUser } from '../auth/dto/auth-user.dto';
import { RequestLogger } from '../logger/types/logger';

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
      logger: RequestLogger;
    }
  }
}

export {};

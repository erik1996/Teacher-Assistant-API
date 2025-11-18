import { UserRole } from 'src/db/entities/user.entity';

export class AuthUser {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber?: string | null;
  email: string;
  role: UserRole;
}

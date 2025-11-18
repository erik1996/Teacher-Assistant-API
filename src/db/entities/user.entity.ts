import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserRole {
  SUPER_ADMIN = 0,
  ADMIN = 1,
  TEACHER = 2,
  STUDENT = 3,
}

export enum UserStatus {
  INVITED = 'invited',
  REGISTERED = 'registered',
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  DELETED = 'deleted',
}

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'first_name', length: 255, nullable: true })
  firstName: string | null;

  @Column({ type: 'varchar', name: 'last_name', length: 255, nullable: true })
  lastName: string | null;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: true })
  email: string | null;

  @Column({ type: 'int', default: UserRole.STUDENT })
  role: UserRole;

  @Column({ type: 'varchar', name: 'phone_number', length: 20, nullable: true })
  phoneNumber?: string;

  @Column({
    name: 'password_hash',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  passwordHash: string;

  @Column({ name: 'refresh_token_hash', length: 255, nullable: true })
  currentHashedRefreshToken?: string;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.INVITED })
  status: UserStatus;

  @Column({
    name: 'one_time_token',
    type: 'varchar',
    length: 64,
    nullable: true,
  })
  oneTimeToken?: string | null;

  @Column({ name: 'terms_and_conditions', type: 'boolean', default: false })
  termsAndConditions: boolean;

  @Column({ name: 'email_notifications', type: 'boolean', default: false })
  emailNotifications: boolean;

  @ManyToOne(() => User, (user) => user.invitedUsers, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'invited_by' })
  invitedBy?: User | null;

  @OneToMany(() => User, (user) => user.invitedBy)
  invitedUsers?: User[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}

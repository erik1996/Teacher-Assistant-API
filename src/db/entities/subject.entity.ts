import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity('subjects')
@Unique(['code'])
@Index(['code'])
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 3, unique: true })
  code: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'boolean', default: false })
  rtl: boolean;

  @Column({ name: 'system_prompt', type: 'text', nullable: true })
  systemPrompt?: string;

  @Column({ name: 'user_prompt', type: 'text', nullable: true })
  userPrompt?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

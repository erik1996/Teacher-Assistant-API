import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Subject } from './subject.entity';

@Entity('proficiency_levels')
@Index(['subject_id', 'code'], { unique: true })
export class ProficiencyLevel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 10 })
  code: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'int' })
  display_order: number;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'jsonb', nullable: true })
  config?: Record<string, any>;

  @Column({ type: 'text', nullable: true })
  system_prompt?: string;

  @Column({ type: 'text', nullable: true })
  user_prompt?: string;

  @Column({ type: 'int' })
  subject_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Subject, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'subject_id' })
  subject: Subject;
}

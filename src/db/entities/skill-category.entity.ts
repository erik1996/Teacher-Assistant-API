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
import { ProficiencyLevel } from './proficiency-level.entity';
import { Subject } from './subject.entity';

@Entity('skill_categories')
@Index(['name'])
@Index(['subject_id', 'proficiency_level_id', 'name'], { unique: true })
export class SkillCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'int', default: 0 })
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

  @Column({ type: 'int' })
  proficiency_level_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Subject, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'subject_id' })
  subject: Subject;

  @ManyToOne(() => ProficiencyLevel, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'proficiency_level_id' })
  proficiencyLevel: ProficiencyLevel;
}

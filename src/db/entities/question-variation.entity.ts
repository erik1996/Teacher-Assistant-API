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
import { QuestionType } from './question-type.entity';
import { SkillCategory } from './skill-category.entity';

@Entity('question_variations')
@Index(['question_type_id', 'skill_category_id'])
@Index(['code'])
export class QuestionVariation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  code: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'int', default: 0 })
  display_order: number;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'jsonb', nullable: true })
  config?: Record<string, any>;

  @Column({ type: 'jsonb', nullable: true })
  examples?: Record<string, any>;

  @Column({ type: 'text', nullable: true })
  user_prompt?: string;

  @Column({ type: 'int' })
  skill_category_id: number;

  @Column({ type: 'int' })
  question_type_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => QuestionType, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'question_type_id' })
  questionType: QuestionType;

  @ManyToOne(() => SkillCategory, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'skill_category_id' })
  skillCategory: SkillCategory;
}

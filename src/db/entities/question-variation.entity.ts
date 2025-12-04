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
@Index(['questionTypeId', 'skillCategoryId'])
@Index(['code'])
export class QuestionVariation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  code: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ name: 'display_order', type: 'int', default: 0 })
  displayOrder: number;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'jsonb', nullable: true })
  config?: Record<string, any>;

  @Column({ type: 'jsonb', nullable: true })
  examples?: Record<string, any>;

  @Column({ name: 'user_prompt', type: 'text', nullable: true })
  userPrompt?: string;

  @Column({ name: 'skill_category_id', type: 'int' })
  skillCategoryId: number;

  @Column({ name: 'question_type_id', type: 'int' })
  questionTypeId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => QuestionType, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'question_type_id' })
  questionType: QuestionType;

  @ManyToOne(() => SkillCategory, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'skill_category_id' })
  skillCategory: SkillCategory;
}

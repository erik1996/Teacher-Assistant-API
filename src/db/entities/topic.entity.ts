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
import { SkillCategory } from './skill-category.entity';
import { Subject } from './subject.entity';

@Entity('topics')
@Index(['subjectId'])
@Index(['subjectId', 'skillCategoryId'])
@Index(['skillCategoryId'])
@Index(['name'])
@Index(['isActive'])
export class Topic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ name: 'display_order', type: 'int', default: 0 })
  displayOrder: number;

  @Column({ name: 'subject_id', type: 'int' })
  subjectId: number;

  @Column({ name: 'skill_category_id', type: 'int' })
  skillCategoryId: number;

  @Column({ name: 'proficiency_level_id', type: 'int' })
  proficiencyLevelId: number;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Subject, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'subject_id' })
  subject: Subject;

  @ManyToOne(() => SkillCategory, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'skill_category_id' })
  skillCategory: SkillCategory;

  @ManyToOne(() => ProficiencyLevel, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'proficiency_level_id' })
  proficiencyLevel: ProficiencyLevel;
}

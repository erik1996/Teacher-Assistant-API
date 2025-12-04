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
@Index(['subjectId', 'code'], { unique: true })
export class ProficiencyLevel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 10 })
  code: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ name: 'display_order', type: 'int', default: 0 })
  displayOrder: number;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @Column({ name: 'subject_id', type: 'int' })
  subjectId: number;

  @Column({ name: 'ai_configuration', type: 'jsonb' })
  aiConfiguration: Record<string, number>;

  @Column({ name: 'recommended_ai', type: 'varchar', length: 100 })
  recommendedAi: string;

  @Column({ name: 'recommended_model', type: 'varchar', length: 100 })
  recommendedModel: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Subject, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'subject_id' })
  subject: Subject;
}

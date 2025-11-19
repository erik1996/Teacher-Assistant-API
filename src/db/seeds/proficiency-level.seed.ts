import { AppDataSource } from '../data-source';
import { ProficiencyLevel } from '../entities/proficiency-level.entity';
import { Subject } from '../entities/subject.entity';

type LevelSeed = {
  code: string;
  name: string;
  display_order: number;

  config?: Record<string, any>;
};

const cefrLevels: LevelSeed[] = [
  {
    code: 'A1',
    name: 'Beginner',
    display_order: 1,
  },
  {
    code: 'A2',
    name: 'Elementary',
    display_order: 2,
  },
  {
    code: 'B1',
    name: 'Intermediate',
    display_order: 3,
  },
  {
    code: 'B2',
    name: 'Upper Intermediate',
    display_order: 4,
  },
  {
    code: 'C1',
    name: 'Advanced',
    display_order: 5,
  },
  {
    code: 'C2',
    name: 'Proficient',
    display_order: 6,
  },
];

const proficiencyLevelsData: Array<{
  subjectCode: string;
  framework: string;
  levels: LevelSeed[];
}> = [
  { subjectCode: 'ENG', framework: 'CEFR', levels: cefrLevels },
  { subjectCode: 'FRA', framework: 'CEFR', levels: cefrLevels },
  { subjectCode: 'SPA', framework: 'CEFR', levels: cefrLevels },
  { subjectCode: 'ARA', framework: 'CEFR', levels: cefrLevels },
  { subjectCode: 'RUS', framework: 'CEFR', levels: cefrLevels },
];

export async function seedProficiencyLevels() {
  console.log('👉 Seeding proficiency levels...');

  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  const levelRepository = AppDataSource.getRepository(ProficiencyLevel);
  const subjectRepository = AppDataSource.getRepository(Subject);

  for (const { subjectCode, framework, levels } of proficiencyLevelsData) {
    const subject = await subjectRepository.findOne({
      where: { code: subjectCode },
    });

    if (!subject) {
      console.warn(
        `⚠️ Subject with code ${subjectCode} not found. Skipping proficiency levels.`,
      );
      continue;
    }

    for (const level of levels) {
      const existing = await levelRepository.findOne({
        where: { subject_id: subject.id, code: level.code },
      });

      const payload = {
        subject_id: subject.id,
        code: level.code,
        name: level.name,
        display_order: level.display_order,
        is_active: true,
        config: { framework, ...(level.config ?? {}) },
      };

      if (existing) {
        levelRepository.merge(existing, payload);
        await levelRepository.save(existing);
        console.log(`🔄 Updated ${subjectCode} level ${level.code}`);
      } else {
        const newLevel = levelRepository.create(payload);
        await levelRepository.save(newLevel);
        console.log(`✅ Created ${subjectCode} level ${level.code}`);
      }
    }
  }
}

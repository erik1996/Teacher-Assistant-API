import { AppDataSource } from '../data-source';
import { ProficiencyLevel } from '../entities/proficiency-level.entity';
import { Subject } from '../entities/subject.entity';

type LevelSeed = {
  code: string;
  name: string;
  displayOrder: number;
  recommendedAi?: string;
  recommendedModel?: string;
  aiConfiguration?: Record<string, any>;
};

const cefrLevels: LevelSeed[] = [
  {
    code: 'A1',
    name: 'Beginner',
    displayOrder: 1,
    recommendedModel: 'claude-sonnet-4-20250514',
    recommendedAi: 'claude',
    aiConfiguration: {
      complexity: { grammar: 2, vocabulary: 2, reading: 2 },
      min_score: 75,
      max_retries: 2,
      required_focus_coverage: 0.8,
      temperature: 0.6,
    },
  },
  {
    code: 'A2',
    name: 'Elementary',
    displayOrder: 2,
    recommendedModel: 'claude-sonnet-4-20250514',
    recommendedAi: 'claude',
    aiConfiguration: {
      complexity: { grammar: 3, vocabulary: 3, reading: 3 },
      min_score: 75,
      max_retries: 2,
      required_focus_coverage: 0.8,
      temperature: 0.65,
    },
  },
  {
    code: 'B1',
    name: 'Intermediate',
    displayOrder: 3,
    recommendedModel: 'claude-sonnet-4-20250514',
    recommendedAi: 'claude',
    aiConfiguration: {
      complexity: { grammar: 5, vocabulary: 4, reading: 4 },
      min_score: 75,
      max_retries: 2,
      required_focus_coverage: 0.8,
      temperature: 0.7,
    },
  },
  {
    code: 'B2',
    name: 'Upper Intermediate',
    displayOrder: 4,
    recommendedModel: 'claude-opus-4-1-20250805',
    recommendedAi: 'claude',
    aiConfiguration: {
      complexity: { grammar: 6, vocabulary: 5, reading: 5 },
      min_score: 75,
      max_retries: 2,
      required_focus_coverage: 0.8,
      temperature: 0.7,
    },
  },
  {
    code: 'C1',
    name: 'Advanced',
    displayOrder: 5,
    recommendedModel: 'claude-opus-4-1-20250805',
    recommendedAi: 'claude',
    aiConfiguration: {
      complexity: { grammar: 7, vocabulary: 7, reading: 7 },
      min_score: 75,
      max_retries: 2,
      required_focus_coverage: 0.8,
      temperature: 0.75,
    },
  },
  {
    code: 'C2',
    name: 'Proficient',
    displayOrder: 6,
    recommendedModel: 'claude-opus-4-1-20250805',
    recommendedAi: 'claude',
    aiConfiguration: {
      complexity: { grammar: 9, vocabulary: 8, reading: 8 },
      min_score: 75,
      max_retries: 2,
      required_focus_coverage: 0.8,
      temperature: 0.8,
    },
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

  for (const { subjectCode, levels } of proficiencyLevelsData) {
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
        where: { subjectId: subject.id, code: level.code },
      });

      const payload: Partial<ProficiencyLevel> = {
        subjectId: subject.id,
        code: level.code,
        name: level.name,
        displayOrder: level.displayOrder ?? 0,
        isActive: true,
        recommendedAi: level.recommendedAi ?? 'claude',
        recommendedModel: level.recommendedModel ?? 'claude-sonnet-4-20250514',
        aiConfiguration: level.aiConfiguration ?? {
          complexity: {
            grammar: level.displayOrder ?? 0,
            vocabulary: level.displayOrder ?? 0,
            reading: level.displayOrder ?? 0,
          },
          min_score: 75,
          max_retries: 2,
          required_focus_coverage: 0.8,
          temperature: 0.6,
        },
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

import { AppDataSource } from '../data-source';
import { ProficiencyLevel } from '../entities/proficiency-level.entity';
import { SkillCategory } from '../entities/skill-category.entity';
import { Subject } from '../entities/subject.entity';

const baseCategories = [
  { name: 'Grammar', display_order: 1, config: { key: 'grammar' } },
  { name: 'Vocabulary', display_order: 2, config: { key: 'vocabulary' } },
  { name: 'Reading', display_order: 3, config: { key: 'reading' } },
];

export async function seedSkillCategories() {
  console.log('👉 Seeding skill categories...');

  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  const subjectRepository = AppDataSource.getRepository(Subject);
  const levelRepository = AppDataSource.getRepository(ProficiencyLevel);
  const categoryRepository = AppDataSource.getRepository(SkillCategory);

  const subjects = await subjectRepository.find();

  for (const subject of subjects) {
    const levels = await levelRepository.find({
      where: { subject_id: subject.id },
    });

    if (!levels.length) {
      console.warn(
        `⚠️ No proficiency levels for subject ${subject.code}. Skipping skill categories.`,
      );
      continue;
    }

    for (const level of levels) {
      for (const category of baseCategories) {
        const existing = await categoryRepository.findOne({
          where: {
            subject_id: subject.id,
            proficiency_level_id: level.id,
            name: category.name,
          },
        });

        const payload = {
          subject_id: subject.id,
          proficiency_level_id: level.id,
          name: category.name,
          display_order: category.display_order,
          is_active: true,
          config: category.config,
        };

        if (existing) {
          categoryRepository.merge(existing, payload);
          await categoryRepository.save(existing);
          console.log(
            `🔄 Updated ${subject.code} ${level.code} category ${category.name}`,
          );
        } else {
          const newCategory = categoryRepository.create(payload);
          await categoryRepository.save(newCategory);
          console.log(
            `✅ Created ${subject.code} ${level.code} category ${category.name}`,
          );
        }
      }
    }
  }
}

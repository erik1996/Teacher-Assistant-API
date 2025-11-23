import { AppDataSource } from '../data-source';
import { SkillCategory } from '../entities/skill-category.entity';
import { Subject } from '../entities/subject.entity';

const baseCategories = [
  { name: 'Grammar', display_order: 1 },
  { name: 'Vocabulary', display_order: 2 },
  { name: 'Reading', display_order: 3 },
];

export async function seedSkillCategories() {
  console.log('👉 Seeding skill categories...');

  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  const subjectRepository = AppDataSource.getRepository(Subject);
  const categoryRepository = AppDataSource.getRepository(SkillCategory);

  const subjects = await subjectRepository.find();

  for (const subject of subjects) {
    for (const category of baseCategories) {
      const existing = await categoryRepository.findOne({
        where: {
          subject_id: subject.id,
          name: category.name,
        },
      });

      const payload = {
        subject_id: subject.id,
        name: category.name,
        display_order: category.display_order,
        is_active: true,
      };

      if (existing) {
        categoryRepository.merge(existing, payload);
        await categoryRepository.save(existing);
        console.log(`🔄 Updated ${subject.code} category ${category.name}`);
      } else {
        const newCategory = categoryRepository.create(payload);
        await categoryRepository.save(newCategory);
        console.log(`✅ Created ${subject.code} category ${category.name}`);
      }
    }
  }
}

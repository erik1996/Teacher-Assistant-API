import { AppDataSource } from '../data-source';
import { seedProficiencyLevels } from './proficiency-level.seed';
import { seedQuestionTypes } from './question-type.seed';
import { seedQuestionVariations } from './question-variation.seed';
import { seedSkillCategories } from './skill-category.seed';
import { seedSubjects } from './subject.seed';

async function runAllSeeds() {
  await seedSubjects();
  await seedQuestionTypes();
  await seedProficiencyLevels();
  await seedSkillCategories();
  await seedQuestionVariations();

  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
  }
}

runAllSeeds()
  .then(() => {
    console.log('✅ All seeds completed');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Seed error:', err);
    process.exit(1);
  });

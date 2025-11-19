import { AppDataSource } from '../data-source';
import { seedProficiencyLevels } from './proficiency-level.seed';
import { seedSkillCategories } from './skill-category.seed';
import { seedSubjects } from './subject.seed';

async function runAllSeeds() {
  await seedSubjects();
  await seedProficiencyLevels();
  await seedSkillCategories();

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

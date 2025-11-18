import { seedFocusAreas } from './focus-area.seed';

async function runAllSeeds() {
  await Promise.all([seedFocusAreas()]);
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

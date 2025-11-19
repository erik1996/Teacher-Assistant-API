import { AppDataSource } from '../data-source';
import { Subject } from '../entities/subject.entity';

const subjectsData = [
  {
    name: 'English',
    code: 'ENG',
    is_active: true,
    rtl: false,
  },
  {
    name: 'French',
    code: 'FRA',
    is_active: true,
    rtl: false,
  },
  {
    name: 'Spanish',
    code: 'SPA',
    is_active: true,
    rtl: false,
  },
  {
    name: 'Arabic',
    code: 'ARA',
    is_active: true,
    rtl: true,
  },
  {
    name: 'Russian',
    code: 'RUS',
    is_active: true,
    rtl: false,
  },
];

export async function seedSubjects() {
  console.log('👉 Seeding subjects...');

  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  const subjectRepository = AppDataSource.getRepository(Subject);

  for (const data of subjectsData) {
    const existing = await subjectRepository.findOne({
      where: { code: data.code },
    });

    if (existing) {
      subjectRepository.merge(existing, data);
      await subjectRepository.save(existing);
      console.log(`🔄 Updated subject: ${data.name}`);
    } else {
      const subject = subjectRepository.create(data);
      await subjectRepository.save(subject);
      console.log(`✅ Created subject: ${data.name}`);
    }
  }
}

import { AppDataSource } from '../data-source';
import { Subject } from '../entities/subject.entity';

const subjectsData = [
  {
    name: 'English',
    code: 'ENG',
    isActive: true,
    rtl: false,
  },
  {
    name: 'French',
    code: 'FRA',
    isActive: true,
    rtl: false,
  },
  {
    name: 'Spanish',
    code: 'SPA',
    isActive: true,
    rtl: false,
  },
  {
    name: 'Arabic',
    code: 'ARA',
    isActive: true,
    rtl: true,
  },
  {
    name: 'Russian',
    code: 'RUS',
    isActive: true,
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

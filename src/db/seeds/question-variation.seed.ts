import { AppDataSource } from '../data-source';
import { QuestionType } from '../entities/question-type.entity';
import { QuestionVariation } from '../entities/question-variation.entity';
import { SkillCategory } from '../entities/skill-category.entity';

export async function seedQuestionVariations() {
  console.log('👉 Seeding question variations...');

  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  const questionVariationRepository =
    AppDataSource.getRepository(QuestionVariation);
  const skillCategoryRepository = AppDataSource.getRepository(SkillCategory);
  const questionTypeRepository = AppDataSource.getRepository(QuestionType);

  const multipleChoiceType = await questionTypeRepository.findOne({
    where: { code: 'multiple_choice' },
  });
  const fillInBlanksType = await questionTypeRepository.findOne({
    where: { code: 'fill_in_blanks' },
  });
  const orderingType = await questionTypeRepository.findOne({
    where: { code: 'ordering' },
  });
  const textInputType = await questionTypeRepository.findOne({
    where: { code: 'text_input' },
  });

  if (
    !multipleChoiceType ||
    !fillInBlanksType ||
    !orderingType ||
    !textInputType
  ) {
    throw new Error(
      'Question types not found. Please run seedQuestionTypes first.',
    );
  }

  const grammarCategory = await skillCategoryRepository.findOne({
    where: { name: 'Grammar' },
  });
  const vocabularyCategory = await skillCategoryRepository.findOne({
    where: { name: 'Vocabulary' },
  });
  const readingCategory = await skillCategoryRepository.findOne({
    where: { name: 'Reading' },
  });

  if (!grammarCategory || !vocabularyCategory || !readingCategory) {
    throw new Error(
      'Skill categories not found. Please run seedSkillCategories first.',
    );
  }

  const questionVariationsData = [
    {
      question_type_id: multipleChoiceType.id,
      skill_category_id: grammarCategory.id,
      code: 'grammar-multiple-choice',
      name: 'Grammar - Multiple Choice',
      display_order: 1,
      is_active: true,
    },
    {
      question_type_id: fillInBlanksType.id,
      skill_category_id: grammarCategory.id,
      code: 'grammar-fill-blanks',
      name: 'Grammar - Fill in the Blanks',
      display_order: 2,
      is_active: true,
    },
    {
      question_type_id: textInputType.id,
      skill_category_id: grammarCategory.id,
      code: 'grammar-error-correction',
      name: 'Grammar - Error Correction',
      display_order: 3,
      is_active: true,
    },
    {
      question_type_id: multipleChoiceType.id,
      skill_category_id: vocabularyCategory.id,
      code: 'vocab-definition',
      name: 'Vocabulary - Definition Match',
      display_order: 1,
      is_active: true,
    },
    {
      question_type_id: multipleChoiceType.id,
      skill_category_id: vocabularyCategory.id,
      code: 'vocab-synonyms-antonyms',
      name: 'Vocabulary - Synonyms & Antonyms',
      display_order: 2,
      is_active: true,
    },
    {
      question_type_id: fillInBlanksType.id,
      skill_category_id: vocabularyCategory.id,
      code: 'vocab-fill-blanks',
      name: 'Vocabulary - Fill in the Blank',
      display_order: 3,
      is_active: true,
    },
    {
      question_type_id: multipleChoiceType.id,
      skill_category_id: readingCategory.id,
      code: 'reading-comprehension',
      name: 'Reading - Comprehension',
      display_order: 1,
      is_active: true,
    },
    {
      question_type_id: multipleChoiceType.id,
      skill_category_id: readingCategory.id,
      code: 'reading-true-false',
      name: 'Reading - True/False/Not Given',
      display_order: 2,
      is_active: true,
    },
    {
      question_type_id: orderingType.id,
      skill_category_id: readingCategory.id,
      code: 'reading-ordering',
      name: 'Reading - Ordering Events',
      display_order: 3,
      is_active: true,
    },
  ];

  for (const data of questionVariationsData) {
    const existing = await questionVariationRepository.findOne({
      where: { code: data.code },
    });

    if (existing) {
      questionVariationRepository.merge(existing, data);
      await questionVariationRepository.save(existing);
      console.log(`🔄 Updated question variation: ${data.name}`);
    } else {
      const questionVariation = questionVariationRepository.create(data);
      await questionVariationRepository.save(questionVariation);
      console.log(`✅ Created question variation: ${data.name}`);
    }
  }

  console.log('✅ Question variations seeding completed!');
}

if (require.main === module) {
  seedQuestionVariations()
    .then(() => {
      console.log('✅ Seeding finished successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Seeding failed:', error);
      process.exit(1);
    });
}

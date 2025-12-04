import { AppDataSource } from '../data-source';
import { QuestionType } from '../entities/question-type.entity';

const questionTypesData = [
  {
    code: 'multiple_choice',
    name: 'Multiple Choice',
    isActive: true,
    structure: {
      question: {
        type: 'string',
        required: true,
      },
      options: {
        type: 'array',
        required: true,
      },
      correct_answer: {
        type: 'array',
        required: true,
      },
      explanation: {
        type: 'string',
        required: false,
      },
      passage: {
        type: 'string',
        required: false,
      },
    },
    config: {
      ui: {
        response_format: 'single_selection',
      },
      grading: {
        auto_gradable: true,
        method: 'exact_match',
        accepts_multiple_correct: true,
      },
    },
  },
  {
    code: 'fill_in_blanks',
    name: 'Fill in the Blanks',
    isActive: true,
    structure: {
      question: {
        type: 'string',
        required: true,
      },
      correct_answer: {
        type: 'array',
        required: true,
      },
      explanation: {
        type: 'string',
        required: false,
      },
    },
    config: {
      ui: {
        response_format: 'text_input',
      },
      grading: {
        auto_gradable: true,
        method: 'case_insensitive_match',
        accepts_multiple_correct: true,
      },
    },
  },
  {
    code: 'ordering',
    name: 'Ordering',
    isActive: true,
    structure: {
      question: {
        type: 'string',
        required: true,
      },
      items: {
        type: 'array',
        required: true,
      },
      correct_answer: {
        type: 'array',
        required: true,
      },
      explanation: {
        type: 'string',
        required: false,
      },
    },
    config: {
      ui: {
        response_format: 'sequence_selection',
      },
      grading: {
        auto_gradable: true,
        method: 'sequence_match',
        accepts_multiple_correct: true,
      },
    },
  },
  {
    code: 'text_input',
    name: 'Text Input',
    isActive: true,
    structure: {
      question: {
        type: 'string',
        required: true,
      },
      correct_answer: {
        type: 'array',
        required: true,
      },
      explanation: {
        type: 'string',
        required: true,
      },
    },
    config: {
      ui: {
        response_format: 'free_text',
      },
      grading: {
        auto_gradable: false,
        method: 'ai_hybrid',
        accepts_multiple_correct: true,
      },
    },
  },
];

export async function seedQuestionTypes() {
  console.log('👉 Seeding question types...');

  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  const questionTypeRepository = AppDataSource.getRepository(QuestionType);

  for (const data of questionTypesData) {
    const existing = await questionTypeRepository.findOne({
      where: { code: data.code },
    });

    if (existing) {
      questionTypeRepository.merge(existing, data);
      await questionTypeRepository.save(existing);
      console.log(`🔄 Updated question type: ${data.name}`);
    } else {
      const questionType = questionTypeRepository.create(data);
      await questionTypeRepository.save(questionType);
      console.log(`✅ Created question type: ${data.name}`);
    }
  }

  console.log('✅ Question types seeding completed!');
}

// Allow direct execution
if (require.main === module) {
  seedQuestionTypes()
    .then(() => {
      console.log('✅ Seeding finished successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Seeding failed:', error);
      process.exit(1);
    });
}

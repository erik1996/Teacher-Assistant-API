import { AppDataSource } from '../data-source';
import { FocusArea } from '../entities/focus-area.entity';

export async function seedFocusAreas() {
  console.log('👉 Seeding focus areas...');
  await AppDataSource.initialize();

  const focusAreasData = [
    // GRAMMAR FOCUS AREAS
    // A1 Level
    {
      name: 'Present Simple',
      category: 'grammar',
      description: 'Basic present tense for facts, habits, and general truths',
      cefr_levels: ['A1'],
    },
    {
      name: 'Present Continuous',
      category: 'grammar',
      description: 'Present progressive for ongoing actions',
      cefr_levels: ['A1'],
    },
    {
      name: 'Past Simple',
      category: 'grammar',
      description: 'Simple past tense for completed actions',
      cefr_levels: ['A1'],
    },
    {
      name: 'Future Simple (will)',
      category: 'grammar',
      description: 'Basic future tense with will',
      cefr_levels: ['A1'],
    },
    {
      name: 'There is / There are',
      category: 'grammar',
      description: 'Existential structures',
      cefr_levels: ['A1'],
    },
    {
      name: 'Prepositions of Place',
      category: 'grammar',
      description: 'Location prepositions (in, on, at, under, etc.)',
      cefr_levels: ['A1'],
    },
    {
      name: 'Prepositions of Time',
      category: 'grammar',
      description: 'Time prepositions (at, on, in, during, etc.)',
      cefr_levels: ['A1'],
    },

    // A1-A2 Level
    {
      name: 'Articles (a, an, the)',
      category: 'grammar',
      description: 'Definite and indefinite articles',
      cefr_levels: ['A1', 'B1'],
    },
    {
      name: 'Pronouns',
      category: 'grammar',
      description: 'Personal, possessive, and demonstrative pronouns',
      cefr_levels: ['A1', 'A2'],
    },
    {
      name: 'Subject-Verb Agreement',
      category: 'grammar',
      description: 'Verb forms matching subjects',
      cefr_levels: ['A1', 'A2'],
    },
    {
      name: 'Conjunctions (and, but, because)',
      category: 'grammar',
      description: 'Basic coordinating and subordinating conjunctions',
      cefr_levels: ['A1', 'A2'],
    },

    // A2 Level
    {
      name: 'Past Continuous',
      category: 'grammar',
      description: 'Past progressive for ongoing past actions',
      cefr_levels: ['A2'],
    },
    {
      name: 'Going to (future plans)',
      category: 'grammar',
      description: 'Future intentions and plans',
      cefr_levels: ['A2'],
    },
    {
      name: 'Frequency Adverbs',
      category: 'grammar',
      description: 'Always, usually, sometimes, never, etc.',
      cefr_levels: ['A2'],
    },
    {
      name: 'Countable & Uncountable Nouns',
      category: 'grammar',
      description: 'Distinction between count and non-count nouns',
      cefr_levels: ['A2'],
    },
    {
      name: 'Wh- Questions',
      category: 'grammar',
      description: 'Question formation with who, what, where, when, why, how',
      cefr_levels: ['A2'],
    },
    {
      name: 'Imperatives',
      category: 'grammar',
      description: 'Commands and instructions',
      cefr_levels: ['A2'],
    },

    // A2-B1 Level
    {
      name: 'Present Perfect',
      category: 'grammar',
      description: 'Present perfect for experiences and recent past',
      cefr_levels: ['A2', 'B1'],
    },
    {
      name: 'Comparatives & Superlatives',
      category: 'grammar',
      description: 'Comparison of adjectives and adverbs',
      cefr_levels: ['A2', 'B1'],
    },
    {
      name: 'Quantifiers (some, any, much, many)',
      category: 'grammar',
      description: 'Quantity expressions',
      cefr_levels: ['A2'],
    },

    // A2-B1-B2 Level
    {
      name: 'Modal Verbs (can, must, should)',
      category: 'grammar',
      description: 'Basic modal verbs for ability, obligation, advice',
      cefr_levels: ['A2', 'B1', 'B2'],
    },

    // B1 Level
    {
      name: 'Past Perfect',
      category: 'grammar',
      description: 'Past perfect for actions before past time',
      cefr_levels: ['B1'],
    },
    {
      name: 'First Conditional',
      category: 'grammar',
      description: 'Real conditional situations (if + present, will)',
      cefr_levels: ['B1'],
    },

    // B1-B2 Level
    {
      name: 'Present Perfect Continuous',
      category: 'grammar',
      description: 'Duration from past to present',
      cefr_levels: ['B1', 'B2'],
    },
    {
      name: 'Future Continuous',
      category: 'grammar',
      description: 'Future progressive actions',
      cefr_levels: ['B1', 'B2'],
    },
    {
      name: 'Second Conditional',
      category: 'grammar',
      description: 'Hypothetical present/future situations',
      cefr_levels: ['B1', 'B2'],
    },
    {
      name: 'Relative Clauses',
      category: 'grammar',
      description: 'Defining and non-defining relative clauses',
      cefr_levels: ['B1', 'B2', 'C1'],
    },
    {
      name: 'Gerunds & Infinitives',
      category: 'grammar',
      description: 'Verb patterns with -ing forms and infinitives',
      cefr_levels: ['B1', 'B2'],
    },
    {
      name: 'Reported Speech (basic)',
      category: 'grammar',
      description: 'Basic reported speech transformations',
      cefr_levels: ['B1'],
    },
    {
      name: 'Modal Verbs for Deduction',
      category: 'grammar',
      description: "Must, might, can't for logical deduction",
      cefr_levels: ['B1', 'B2'],
    },
    {
      name: 'Passive Voice',
      category: 'grammar',
      description: 'Passive constructions',
      cefr_levels: ['B1', 'B2', 'C1'],
    },

    // B2 Level
    {
      name: 'Third Conditional',
      category: 'grammar',
      description: 'Hypothetical past situations',
      cefr_levels: ['B2'],
    },
    {
      name: 'Causative (have/get something done)',
      category: 'grammar',
      description: 'Causative structures',
      cefr_levels: ['B2'],
    },
    {
      name: 'Reported Speech (advanced)',
      category: 'grammar',
      description: 'Complex reported speech patterns',
      cefr_levels: ['B2', 'C1'],
    },
    {
      name: 'Modals in Past (should have, might have)',
      category: 'grammar',
      description: 'Past modal verbs for speculation and criticism',
      cefr_levels: ['B2'],
    },

    // B2-C1 Level
    {
      name: 'Mixed Conditionals',
      category: 'grammar',
      description: 'Mixed time conditionals',
      cefr_levels: ['B2', 'C1'],
    },
    {
      name: 'Inversion with Negative Adverbials',
      category: 'grammar',
      description: 'Inversion after negative adverbials',
      cefr_levels: ['B2', 'C1'],
    },
    {
      name: 'Phrasal Verbs',
      category: 'grammar',
      description: 'Multi-word verbs',
      cefr_levels: ['B2', 'C1'],
    },

    // C1 Level
    {
      name: 'Future Perfect',
      category: 'grammar',
      description: 'Future perfect tense',
      cefr_levels: ['C1'],
    },
    {
      name: 'Future Perfect Continuous',
      category: 'grammar',
      description: 'Future perfect progressive',
      cefr_levels: ['C1'],
    },
    {
      name: 'Advanced Passive Forms',
      category: 'grammar',
      description: 'Complex passive constructions',
      cefr_levels: ['C1'],
    },
    {
      name: 'Cleft Sentences',
      category: 'grammar',
      description: 'It-cleft and wh-cleft sentences for emphasis',
      cefr_levels: ['C1'],
    },
    {
      name: 'Inversion in Conditionals',
      category: 'grammar',
      description: 'Inverted conditional structures',
      cefr_levels: ['C1'],
    },
    {
      name: 'Advanced Verb Patterns',
      category: 'grammar',
      description: 'Complex verb complementation',
      cefr_levels: ['C1'],
    },
    {
      name: 'Adverbial Clauses of Contrast/Concession',
      category: 'grammar',
      description: 'Despite, although, however structures',
      cefr_levels: ['C1'],
    },

    // C1-C2 Level
    {
      name: 'Nominalisation',
      category: 'grammar',
      description: 'Converting verbs/adjectives to nouns',
      cefr_levels: ['C1', 'C2'],
    },
    {
      name: 'Ellipsis & Substitution',
      category: 'grammar',
      description: 'Avoiding repetition through ellipsis',
      cefr_levels: ['C1', 'C2'],
    },
    {
      name: 'Complex Relative Clauses',
      category: 'grammar',
      description: 'Advanced relative clause constructions',
      cefr_levels: ['C1', 'C2'],
    },

    // C2 Level
    {
      name: 'Mixed Time References',
      category: 'grammar',
      description: 'Complex temporal relationships',
      cefr_levels: ['C2'],
    },
    {
      name: 'Advanced Modal Nuances',
      category: 'grammar',
      description: 'Subtle modal distinctions',
      cefr_levels: ['C2'],
    },
    {
      name: 'Complex Inversions',
      category: 'grammar',
      description: 'Advanced inversion patterns',
      cefr_levels: ['C2'],
    },
    {
      name: 'Advanced Conditionals',
      category: 'grammar',
      description: 'Complex conditional structures',
      cefr_levels: ['C2'],
    },
    {
      name: 'Idiomatic Constructions',
      category: 'grammar',
      description: 'Fixed idiomatic patterns',
      cefr_levels: ['C2'],
    },
    {
      name: 'Discourse Markers for Cohesion',
      category: 'grammar',
      description: 'Advanced linking devices',
      cefr_levels: ['C2'],
    },
    {
      name: 'Fronting & Emphasis Structures',
      category: 'grammar',
      description: 'Fronting for emphasis and focus',
      cefr_levels: ['C2'],
    },
    {
      name: 'Complex Ellipsis',
      category: 'grammar',
      description: 'Advanced elliptical constructions',
      cefr_levels: ['C2'],
    },
    {
      name: 'Advanced Phrasal/Prepositional Verbs',
      category: 'grammar',
      description: 'Complex multi-word verbs',
      cefr_levels: ['C2'],
    },
    {
      name: 'Embedded Clauses & Multiple Subordination',
      category: 'grammar',
      description: 'Complex sentence embedding',
      cefr_levels: ['C2'],
    },

    // VOCABULARY FOCUS AREAS
    // A1 Level
    {
      name: 'Numbers & Time',
      category: 'vocabulary',
      description: 'Basic numbers, time expressions, clock time',
      cefr_levels: ['A1'],
    },
    {
      name: 'Days, Months & Seasons',
      category: 'vocabulary',
      description: 'Calendar vocabulary',
      cefr_levels: ['A1'],
    },
    {
      name: 'Colors & Shapes',
      category: 'vocabulary',
      description: 'Basic colors and geometric shapes',
      cefr_levels: ['A1'],
    },
    {
      name: 'Family & Relationships (basic)',
      category: 'vocabulary',
      description: 'Immediate family members and basic relationships',
      cefr_levels: ['A1'],
    },
    {
      name: 'Food & Drink (basic)',
      category: 'vocabulary',
      description: 'Common foods and beverages',
      cefr_levels: ['A1'],
    },
    {
      name: 'Clothes & Fashion (basic)',
      category: 'vocabulary',
      description: 'Basic clothing items',
      cefr_levels: ['A1'],
    },
    {
      name: 'House & Home (rooms, furniture)',
      category: 'vocabulary',
      description: 'Rooms and basic furniture',
      cefr_levels: ['A1'],
    },
    {
      name: 'School & Classroom Objects',
      category: 'vocabulary',
      description: 'School supplies and classroom items',
      cefr_levels: ['A1'],
    },
    {
      name: 'Animals (common)',
      category: 'vocabulary',
      description: 'Common domestic and wild animals',
      cefr_levels: ['A1'],
    },
    {
      name: 'Daily Activities & Routines',
      category: 'vocabulary',
      description: 'Everyday actions and routines',
      cefr_levels: ['A1'],
    },
    {
      name: 'Weather (basic)',
      category: 'vocabulary',
      description: 'Basic weather conditions',
      cefr_levels: ['A1'],
    },
    {
      name: 'Transport (basic: bus, car, train)',
      category: 'vocabulary',
      description: 'Common means of transportation',
      cefr_levels: ['A1'],
    },
    {
      name: 'Body Parts (basic)',
      category: 'vocabulary',
      description: 'Main body parts',
      cefr_levels: ['A1'],
    },
    {
      name: 'Jobs & Occupations (basic)',
      category: 'vocabulary',
      description: 'Common professions',
      cefr_levels: ['A1'],
    },
    {
      name: 'Shopping (everyday items)',
      category: 'vocabulary',
      description: 'Basic shopping vocabulary',
      cefr_levels: ['A1'],
    },

    // A2 Level
    {
      name: 'Travel & Holidays',
      category: 'vocabulary',
      description: 'Travel and vacation vocabulary',
      cefr_levels: ['A2'],
    },
    {
      name: 'Health & Medicine (basic)',
      category: 'vocabulary',
      description: 'Basic health and medical terms',
      cefr_levels: ['A2'],
    },
    {
      name: 'Sports & Hobbies',
      category: 'vocabulary',
      description: 'Sports and recreational activities',
      cefr_levels: ['A2'],
    },
    {
      name: 'Technology & Internet (basic)',
      category: 'vocabulary',
      description: 'Basic technology and internet terms',
      cefr_levels: ['A2'],
    },
    {
      name: 'Nature & Environment (basic)',
      category: 'vocabulary',
      description: 'Basic nature and environmental vocabulary',
      cefr_levels: ['A2'],
    },
    {
      name: 'Shopping & Services (extended)',
      category: 'vocabulary',
      description: 'Extended shopping and service vocabulary',
      cefr_levels: ['A2'],
    },
    {
      name: 'Food & Drink (extended)',
      category: 'vocabulary',
      description: 'Extended food and beverage vocabulary',
      cefr_levels: ['A2'],
    },
    {
      name: 'Household Chores',
      category: 'vocabulary',
      description: 'Cleaning and household tasks',
      cefr_levels: ['A2'],
    },
    {
      name: 'Describing People (appearance, character)',
      category: 'vocabulary',
      description: 'Physical appearance and personality traits',
      cefr_levels: ['A2'],
    },
    {
      name: 'Feelings & Emotions (basic)',
      category: 'vocabulary',
      description: 'Basic emotional vocabulary',
      cefr_levels: ['A2'],
    },
    {
      name: 'City & Town (places, buildings)',
      category: 'vocabulary',
      description: 'Urban places and buildings',
      cefr_levels: ['A2'],
    },
    {
      name: 'Work & Business (basic)',
      category: 'vocabulary',
      description: 'Basic work and business terms',
      cefr_levels: ['A2'],
    },

    // B1 Level
    {
      name: 'Education (subjects, exams)',
      category: 'vocabulary',
      description: 'Educational vocabulary and academic subjects',
      cefr_levels: ['B1'],
    },
    {
      name: 'Work & Employment (interviews, careers)',
      category: 'vocabulary',
      description: 'Employment and career vocabulary',
      cefr_levels: ['B1'],
    },
    {
      name: 'Health & Lifestyle (fitness, wellbeing)',
      category: 'vocabulary',
      description: 'Health, fitness, and lifestyle vocabulary',
      cefr_levels: ['B1'],
    },
    {
      name: 'Media & Entertainment (TV, cinema, music)',
      category: 'vocabulary',
      description: 'Entertainment and media vocabulary',
      cefr_levels: ['B1'],
    },
    {
      name: 'Travel & Transport (extended: airports, hotels)',
      category: 'vocabulary',
      description: 'Extended travel vocabulary',
      cefr_levels: ['B1'],
    },
    {
      name: 'Environment & Pollution',
      category: 'vocabulary',
      description: 'Environmental issues and pollution',
      cefr_levels: ['B1'],
    },
    {
      name: 'Technology (devices, communication)',
      category: 'vocabulary',
      description: 'Technology and communication vocabulary',
      cefr_levels: ['B1'],
    },
    {
      name: 'Cultural Life (festivals, traditions)',
      category: 'vocabulary',
      description: 'Culture and traditions vocabulary',
      cefr_levels: ['B1'],
    },
    {
      name: 'Society & Social Issues (basic)',
      category: 'vocabulary',
      description: 'Basic social issues vocabulary',
      cefr_levels: ['B1'],
    },
    {
      name: 'Food & Nutrition',
      category: 'vocabulary',
      description: 'Nutrition and healthy eating vocabulary',
      cefr_levels: ['B1'],
    },
    {
      name: 'Feelings & Emotions (extended)',
      category: 'vocabulary',
      description: 'Extended emotional vocabulary',
      cefr_levels: ['B1'],
    },
    {
      name: 'Describing Processes & Changes',
      category: 'vocabulary',
      description: 'Process and change vocabulary',
      cefr_levels: ['B1'],
    },

    // B2 Level
    {
      name: 'Global Issues (climate change, poverty)',
      category: 'vocabulary',
      description: 'Global issues and challenges',
      cefr_levels: ['B2'],
    },
    {
      name: 'Politics & Government (basic terms)',
      category: 'vocabulary',
      description: 'Basic political and government vocabulary',
      cefr_levels: ['B2'],
    },
    {
      name: 'Work & Business (advanced: negotiations, finance)',
      category: 'vocabulary',
      description: 'Advanced business and finance vocabulary',
      cefr_levels: ['B2'],
    },
    {
      name: 'Education (higher education, academic life)',
      category: 'vocabulary',
      description: 'Higher education and academic vocabulary',
      cefr_levels: ['B2'],
    },
    {
      name: 'Media & Advertising',
      category: 'vocabulary',
      description: 'Media and advertising vocabulary',
      cefr_levels: ['B2'],
    },
    {
      name: 'Science & Innovation (basic terms)',
      category: 'vocabulary',
      description: 'Basic science and innovation vocabulary',
      cefr_levels: ['B2'],
    },
    {
      name: 'Technology & Digital Life (extended)',
      category: 'vocabulary',
      description: 'Extended technology and digital vocabulary',
      cefr_levels: ['B2'],
    },
    {
      name: 'Health & Medicine (extended: mental health, diseases)',
      category: 'vocabulary',
      description: 'Extended health and medical vocabulary',
      cefr_levels: ['B2'],
    },
    {
      name: 'Cultural Awareness (art, literature, music)',
      category: 'vocabulary',
      description: 'Arts and culture vocabulary',
      cefr_levels: ['B2'],
    },
    {
      name: 'Society & Law (basic concepts)',
      category: 'vocabulary',
      description: 'Basic legal and social concepts',
      cefr_levels: ['B2'],
    },

    // C1 Level
    {
      name: 'Abstract Concepts (justice, freedom, equality)',
      category: 'vocabulary',
      description: 'Abstract philosophical and social concepts',
      cefr_levels: ['C1'],
    },
    {
      name: 'Advanced Emotions & Attitudes',
      category: 'vocabulary',
      description: 'Sophisticated emotional and attitudinal vocabulary',
      cefr_levels: ['C1'],
    },
    {
      name: 'Academic Vocabulary (research, analysis, evaluation)',
      category: 'vocabulary',
      description: 'Academic and research vocabulary',
      cefr_levels: ['C1'],
    },
    {
      name: 'Economics & Finance',
      category: 'vocabulary',
      description: 'Economic and financial terminology',
      cefr_levels: ['C1'],
    },
    {
      name: 'Science & Research (extended)',
      category: 'vocabulary',
      description: 'Extended scientific and research vocabulary',
      cefr_levels: ['C1'],
    },
    {
      name: 'Technology & Artificial Intelligence',
      category: 'vocabulary',
      description: 'AI and advanced technology vocabulary',
      cefr_levels: ['C1'],
    },
    {
      name: 'Environment (sustainability, conservation)',
      category: 'vocabulary',
      description: 'Environmental sustainability vocabulary',
      cefr_levels: ['C1'],
    },
    {
      name: 'Politics & International Relations',
      category: 'vocabulary',
      description: 'Political and international relations vocabulary',
      cefr_levels: ['C1'],
    },
    {
      name: 'Media Literacy (bias, influence)',
      category: 'vocabulary',
      description: 'Media analysis and critical thinking vocabulary',
      cefr_levels: ['C1'],
    },
    {
      name: 'Philosophical & Ethical Vocabulary',
      category: 'vocabulary',
      description: 'Philosophy and ethics vocabulary',
      cefr_levels: ['C1'],
    },

    // C2 Level
    {
      name: 'Nuanced Emotions & Idiomatic Expressions',
      category: 'vocabulary',
      description: 'Subtle emotional expressions and idioms',
      cefr_levels: ['C2'],
    },
    {
      name: 'Specialized Academic Vocabulary',
      category: 'vocabulary',
      description: 'Highly specialized academic terminology',
      cefr_levels: ['C2'],
    },
    {
      name: 'Law & Legal Terminology',
      category: 'vocabulary',
      description: 'Legal and jurisprudence vocabulary',
      cefr_levels: ['C2'],
    },
    {
      name: 'Advanced Science & Technology',
      category: 'vocabulary',
      description: 'Cutting-edge scientific and technological vocabulary',
      cefr_levels: ['C2'],
    },
    {
      name: 'Philosophy & Abstract Thought',
      category: 'vocabulary',
      description: 'Advanced philosophical and abstract vocabulary',
      cefr_levels: ['C2'],
    },
    {
      name: 'Economics & Globalization',
      category: 'vocabulary',
      description: 'Advanced economic and globalization vocabulary',
      cefr_levels: ['C2'],
    },
    {
      name: 'Cultural Criticism & Literary Analysis',
      category: 'vocabulary',
      description: 'Literary criticism and cultural analysis vocabulary',
      cefr_levels: ['C2'],
    },
    {
      name: 'Advanced Politics & Diplomacy',
      category: 'vocabulary',
      description: 'Diplomatic and advanced political vocabulary',
      cefr_levels: ['C2'],
    },
    {
      name: 'Discourse Markers for Cohesion',
      category: 'vocabulary',
      description: 'Advanced cohesive devices and discourse markers',
      cefr_levels: ['C2'],
    },
    {
      name: 'Idioms & Colloquial Expressions (native-like)',
      category: 'vocabulary',
      description: 'Native-level idiomatic and colloquial expressions',
      cefr_levels: ['C2'],
    },
  ];

  const repo = AppDataSource.getRepository(FocusArea);

  for (const focusAreaData of focusAreasData) {
    const existing = await repo.findOneBy({
      name: focusAreaData.name,
      category: focusAreaData.category,
    });

    if (!existing) {
      const focusArea = repo.create(focusAreaData);
      await repo.save(focusArea);
      console.log(
        `✅ Seeded: ${focusAreaData.name} (${focusAreaData.category}) - [${focusAreaData.cefr_levels.join(', ')}]`,
      );
    } else {
      console.log(
        `⏩ Skipped: ${focusAreaData.name} (${focusAreaData.category}) - already exists`,
      );
    }
  }

  console.log('✅ Focus areas seeded successfully');
}

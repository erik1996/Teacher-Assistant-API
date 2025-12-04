import { AppDataSource } from '../data-source';
import { ProficiencyLevel } from '../entities/proficiency-level.entity';
import { SkillCategory } from '../entities/skill-category.entity';
import { Subject } from '../entities/subject.entity';
import { Topic } from '../entities/topic.entity';

const englishGrammar: Array<{
  name: string;
  description: string;
  proficiencyLevel: string;
}> = [
  {
    name: 'Present Simple - Be',
    description: 'Using am/is/are for states and descriptions',
    proficiencyLevel: 'A1',
  },
  {
    name: 'Present Simple - Have/Has',
    description: 'Using have/has for possession and descriptions',
    proficiencyLevel: 'A1',
  },
  {
    name: 'Present Simple - Regular Verbs',
    description: 'Basic present tense for habits, facts, and routines',
    proficiencyLevel: 'A1',
  },
  {
    name: 'Present Continuous',
    description: 'Present progressive for actions happening now',
    proficiencyLevel: 'A1',
  },
  {
    name: 'Past Simple - Be',
    description: 'Using was/were for past states',
    proficiencyLevel: 'A1',
  },
  {
    name: 'Past Simple - Regular & Irregular Verbs',
    description: 'Simple past tense for completed actions',
    proficiencyLevel: 'A1',
  },
  {
    name: 'Future Simple - Will',
    description: 'Basic future tense with will for predictions and decisions',
    proficiencyLevel: 'A1',
  },
  {
    name: 'There is / There are',
    description: 'Existential structures for describing what exists',
    proficiencyLevel: 'A1',
  },
  {
    name: 'Articles (a, an, the)',
    description: 'Definite and indefinite articles',
    proficiencyLevel: 'A1',
  },
  {
    name: 'Personal Pronouns',
    description: 'Subject pronouns (I, you, he, she, it, we, they)',
    proficiencyLevel: 'A1',
  },
  {
    name: 'Possessive Adjectives',
    description: 'Possessive determiners (my, your, his, her, its, our, their)',
    proficiencyLevel: 'A1',
  },
  {
    name: 'Demonstratives',
    description: 'This, that, these, those for pointing out things',
    proficiencyLevel: 'A1',
  },
  {
    name: 'Prepositions of Place',
    description:
      'Location prepositions (in, on, at, under, next to, behind, etc.)',
    proficiencyLevel: 'A1',
  },
  {
    name: 'Prepositions of Time',
    description: 'Time prepositions (at, on, in for times and dates)',
    proficiencyLevel: 'A1',
  },
  {
    name: 'Basic Question Words',
    description: 'What, who, where for forming simple questions',
    proficiencyLevel: 'A1',
  },
  {
    name: 'Singular & Plural Nouns',
    description: 'Regular plural forms with -s/-es',
    proficiencyLevel: 'A1',
  },
  {
    name: 'Subject-Verb Agreement',
    description: 'Verb forms matching singular and plural subjects',
    proficiencyLevel: 'A1',
  },
  {
    name: 'Can for Ability & Permission',
    description: "Using can/can't for ability and asking permission",
    proficiencyLevel: 'A1',
  },
  {
    name: 'Basic Conjunctions',
    description: 'And, but, or for joining words and clauses',
    proficiencyLevel: 'A1',
  },
  {
    name: 'Numbers & Dates',
    description: 'Cardinal and ordinal numbers, expressing dates',
    proficiencyLevel: 'A1',
  },
  {
    name: 'Past Continuous',
    description: 'Past progressive for ongoing actions in the past',
    proficiencyLevel: 'A2',
  },
  {
    name: 'Future - Going to',
    description: 'Future intentions, plans, and predictions with evidence',
    proficiencyLevel: 'A2',
  },
  {
    name: 'Present Perfect - Introduction',
    description: 'Present perfect with just, already, yet for recent past',
    proficiencyLevel: 'A2',
  },
  {
    name: 'Frequency Adverbs',
    description: 'Always, usually, often, sometimes, rarely, never',
    proficiencyLevel: 'A2',
  },
  {
    name: 'Adverbs of Manner',
    description: 'Quickly, slowly, well, badly, carefully, etc.',
    proficiencyLevel: 'A2',
  },
  {
    name: 'Countable & Uncountable Nouns',
    description: 'Distinction between count and non-count nouns',
    proficiencyLevel: 'A2',
  },
  {
    name: 'Quantifiers',
    description: 'Some, any, much, many, a lot of, a few, a little',
    proficiencyLevel: 'A2',
  },
  {
    name: 'Comparatives & Superlatives',
    description: 'Comparison of adjectives and adverbs',
    proficiencyLevel: 'A2',
  },
  {
    name: 'Object Pronouns',
    description: 'Me, you, him, her, it, us, them as objects',
    proficiencyLevel: 'A2',
  },
  {
    name: 'Possessive Pronouns',
    description: 'Mine, yours, his, hers, ours, theirs',
    proficiencyLevel: 'A2',
  },
  {
    name: 'Wh- Questions',
    description: 'When, why, how + complete question formation',
    proficiencyLevel: 'A2',
  },
  {
    name: 'Imperatives',
    description: 'Commands and instructions',
    proficiencyLevel: 'A2',
  },
  {
    name: 'Modal Verbs - Can, Could, Should, Must',
    description: 'Basic modals for ability, possibility, advice, obligation',
    proficiencyLevel: 'A2',
  },
  {
    name: "Have to / Don't have to",
    description: 'Obligation and absence of obligation',
    proficiencyLevel: 'A2',
  },
  {
    name: 'Too / Enough',
    description: 'Too + adjective, adjective + enough patterns',
    proficiencyLevel: 'A2',
  },
  {
    name: 'Conjunctions - Because, So, Although',
    description: 'Cause, result, and contrast conjunctions',
    proficiencyLevel: 'A2',
  },
  {
    name: 'Used to',
    description: 'Past habits and states that are no longer true',
    proficiencyLevel: 'A2',
  },
  {
    name: 'Question Tags',
    description: "Basic question tags (isn't it?, don't you?, etc.)",
    proficiencyLevel: 'A2',
  },
  {
    name: 'One / Ones',
    description: 'Substitution with one/ones to avoid repetition',
    proficiencyLevel: 'A2',
  },
  {
    name: 'Adverbs of Frequency & Place',
    description: 'Position and usage of adverbs',
    proficiencyLevel: 'A2',
  },
  {
    name: 'Present Perfect vs Past Simple',
    description: 'Distinguishing between present perfect and past simple usage',
    proficiencyLevel: 'B1',
  },
  {
    name: 'Present Perfect Continuous',
    description: 'Duration from past to present with emphasis on continuity',
    proficiencyLevel: 'B1',
  },
  {
    name: 'Past Perfect',
    description:
      'Past perfect for actions completed before another past action',
    proficiencyLevel: 'B1',
  },
  {
    name: 'Past Perfect Continuous',
    description: 'Duration before a past time',
    proficiencyLevel: 'B1',
  },
  {
    name: 'Future Continuous',
    description: 'Future progressive for actions in progress at a future time',
    proficiencyLevel: 'B1',
  },
  {
    name: 'Will vs Going to',
    description: 'Distinguishing between will and going to for future',
    proficiencyLevel: 'B1',
  },
  {
    name: 'First Conditional',
    description: 'Real conditional situations (if + present, will + base verb)',
    proficiencyLevel: 'B1',
  },
  {
    name: 'Second Conditional',
    description:
      'Hypothetical present or future situations (if + past, would + base)',
    proficiencyLevel: 'B1',
  },
  {
    name: 'Relative Clauses - Defining & Non-Defining',
    description: 'Who, which, that, where, whose in relative clauses',
    proficiencyLevel: 'B1',
  },
  {
    name: 'Modal Verbs - May, Might, Could (Possibility)',
    description: 'Modals expressing possibility and probability',
    proficiencyLevel: 'B1',
  },
  {
    name: 'Modal Verbs - Should, Ought to (Advice)',
    description: 'Giving advice and recommendations',
    proficiencyLevel: 'B1',
  },
  {
    name: "Modal Verbs - Must, Can't (Deduction)",
    description: 'Logical deduction about present situations',
    proficiencyLevel: 'B1',
  },
  {
    name: "Need to / Needn't",
    description: 'Necessity and lack of necessity',
    proficiencyLevel: 'B1',
  },
  {
    name: 'Gerunds & Infinitives - Basic',
    description: 'Verb patterns with -ing forms and to-infinitives',
    proficiencyLevel: 'B1',
  },
  {
    name: 'Passive Voice - Present & Past Simple',
    description: 'Basic passive constructions',
    proficiencyLevel: 'B1',
  },
  {
    name: 'Reported Speech - Statements',
    description: 'Reporting what people said (statement backshift)',
    proficiencyLevel: 'B1',
  },
  {
    name: 'Reported Speech - Questions',
    description: 'Reporting questions with appropriate word order',
    proficiencyLevel: 'B1',
  },
  {
    name: 'Time Clauses',
    description: 'When, while, as soon as, before, after, until',
    proficiencyLevel: 'B1',
  },
  {
    name: 'Purpose Clauses',
    description: 'To, in order to, so that for expressing purpose',
    proficiencyLevel: 'B1',
  },
  {
    name: 'So / Such',
    description: 'So + adjective/adverb, such + noun for result/emphasis',
    proficiencyLevel: 'B1',
  },
  {
    name: 'Wish + Past Simple',
    description: 'Expressing wishes about present situations',
    proficiencyLevel: 'B1',
  },
  {
    name: 'Phrasal Verbs - Common',
    description: 'Common separable and inseparable phrasal verbs',
    proficiencyLevel: 'B1',
  },
  {
    name: 'Future Perfect',
    description: 'Actions that will be completed by a future time',
    proficiencyLevel: 'B2',
  },
  {
    name: 'Future Perfect Continuous',
    description: 'Duration up to a point in the future',
    proficiencyLevel: 'B2',
  },
  {
    name: 'Third Conditional',
    description:
      'Hypothetical past situations (if + past perfect, would have + past participle)',
    proficiencyLevel: 'B2',
  },
  {
    name: 'Mixed Conditionals',
    description: 'Mixing time references in conditionals',
    proficiencyLevel: 'B2',
  },
  {
    name: 'Wish / If only + Past Perfect',
    description: 'Expressing regrets about past situations',
    proficiencyLevel: 'B2',
  },
  {
    name: 'Passive Voice - All Tenses',
    description: 'Passive constructions in all tenses including modals',
    proficiencyLevel: 'B2',
  },
  {
    name: 'Causative Have/Get',
    description: 'Have/get something done structures',
    proficiencyLevel: 'B2',
  },
  {
    name: 'Reported Speech - Commands & Requests',
    description: 'Reporting imperatives and requests',
    proficiencyLevel: 'B2',
  },
  {
    name: 'Reported Speech - Advanced',
    description: 'Complex reported speech patterns',
    proficiencyLevel: 'B2',
  },
  {
    name: 'Reporting Verbs',
    description:
      'Suggest, advise, insist, recommend, etc. with various patterns',
    proficiencyLevel: 'B2',
  },
  {
    name: 'Modal Verbs - Past Forms',
    description:
      'Should have, could have, must have, might have for past speculation',
    proficiencyLevel: 'B2',
  },
  {
    name: 'Modal Verbs - Subtle Distinctions',
    description: 'Fine distinctions between modal meanings',
    proficiencyLevel: 'B2',
  },
  {
    name: 'Participle Clauses',
    description: 'Present and past participle clauses for concision',
    proficiencyLevel: 'B2',
  },
  {
    name: 'Reduced Relative Clauses',
    description: 'Omitting relative pronouns and be verb',
    proficiencyLevel: 'B2',
  },
  {
    name: 'Inversion after Negative Adverbials',
    description:
      'Rarely, seldom, never, hardly, etc. with subject-verb inversion',
    proficiencyLevel: 'B2',
  },
  {
    name: 'Cleft Sentences - Basic',
    description: 'It is/was... that/who for emphasis',
    proficiencyLevel: 'B2',
  },
  {
    name: 'Advanced Phrasal Verbs',
    description: 'Less common and more sophisticated phrasal verbs',
    proficiencyLevel: 'B2',
  },
  {
    name: 'Gerunds & Infinitives - Advanced',
    description: 'Complex verb patterns and subtle meaning differences',
    proficiencyLevel: 'B2',
  },
  {
    name: 'Subjunctive - Basic',
    description: 'Subjunctive mood (I suggest that he go...)',
    proficiencyLevel: 'B2',
  },
  {
    name: 'Discourse Markers',
    description: 'However, nevertheless, furthermore, moreover, therefore',
    proficiencyLevel: 'B2',
  },
  {
    name: 'Future in the Past',
    description: 'Was going to, would for past future reference',
    proficiencyLevel: 'C1',
  },
  {
    name: 'Advanced Passive Structures',
    description: 'Complex passive constructions in all forms',
    proficiencyLevel: 'C1',
  },
  {
    name: 'Passive with Reporting Verbs',
    description: 'It is said that..., He is believed to..., etc.',
    proficiencyLevel: 'C1',
  },
  {
    name: 'Subjunctive Mood - Advanced',
    description: 'Advanced uses of subjunctive in formal contexts',
    proficiencyLevel: 'C1',
  },
  {
    name: 'Inversion in Conditionals',
    description: 'Had I known..., Should you need..., Were it not for...',
    proficiencyLevel: 'C1',
  },
  {
    name: 'Inversion after So/Such/Neither/Nor',
    description: 'So too did..., Neither have I..., etc.',
    proficiencyLevel: 'C1',
  },
  {
    name: 'Cleft Sentences - Advanced',
    description: 'What/All clauses for emphasis and focus',
    proficiencyLevel: 'C1',
  },
  {
    name: 'Advanced Relative Clauses',
    description: 'Relative clauses with prepositions and complex structures',
    proficiencyLevel: 'C1',
  },
  {
    name: 'Participle Clauses - Advanced',
    description: 'Perfect participles and complex participial structures',
    proficiencyLevel: 'C1',
  },
  {
    name: 'Nominalisation',
    description: 'Converting verbs and adjectives to noun forms',
    proficiencyLevel: 'C1',
  },
  {
    name: 'Ellipsis & Substitution',
    description: 'Sophisticated ways to avoid repetition',
    proficiencyLevel: 'C1',
  },
  {
    name: 'Advanced Verb Patterns',
    description: 'Complex verb complementation and patterns',
    proficiencyLevel: 'C1',
  },
  {
    name: 'Adverbial Clauses of Concession',
    description: 'Despite, in spite of, although, even though, whereas',
    proficiencyLevel: 'C1',
  },
  {
    name: 'Distancing & Hedging',
    description: 'Language for being cautious and diplomatic',
    proficiencyLevel: 'C1',
  },
  {
    name: 'Advanced Modal Meanings',
    description:
      'Would for typical behavior, will for insistence, subtle nuances',
    proficiencyLevel: 'C1',
  },
  {
    name: 'Complex Sentence Structures',
    description: 'Multiple subordination and embedded clauses',
    proficiencyLevel: 'C1',
  },
  {
    name: 'Fronting for Emphasis',
    description: 'Fronting elements for focus and emphasis',
    proficiencyLevel: 'C1',
  },
  {
    name: 'Advanced Time References',
    description: 'Complex temporal relationships in discourse',
    proficiencyLevel: 'C1',
  },
  {
    name: 'Mixed Time References',
    description: 'Complex temporal relationships across multiple time frames',
    proficiencyLevel: 'C2',
  },
  {
    name: 'Advanced Modal Nuances',
    description: 'Subtle modal distinctions and rare modal uses',
    proficiencyLevel: 'C2',
  },
  {
    name: 'Complex Inversions',
    description: 'Full range of inversion patterns including literary styles',
    proficiencyLevel: 'C2',
  },
  {
    name: 'Advanced Conditional Structures',
    description: 'Alternatives to if (provided that, supposing, etc.)',
    proficiencyLevel: 'C2',
  },
  {
    name: 'Stylistic Inversion',
    description: 'Inversion for stylistic and rhetorical effect',
    proficiencyLevel: 'C2',
  },
  {
    name: 'Archaic & Literary Structures',
    description: 'Older grammatical forms used in literature',
    proficiencyLevel: 'C2',
  },
  {
    name: 'Complex Nominalisation',
    description: 'Advanced noun phrase complexity and abstract nominalisations',
    proficiencyLevel: 'C2',
  },
  {
    name: 'Advanced Ellipsis',
    description: 'Sophisticated elliptical constructions',
    proficiencyLevel: 'C2',
  },
  {
    name: 'Complex Embedded Clauses',
    description: 'Multiple levels of clause embedding',
    proficiencyLevel: 'C2',
  },
  {
    name: 'Register Variation',
    description: 'Grammatical choices appropriate to formal/informal contexts',
    proficiencyLevel: 'C2',
  },
  {
    name: 'Subtle Aspectual Distinctions',
    description: 'Fine differences in aspect and temporal meaning',
    proficiencyLevel: 'C2',
  },
  {
    name: 'Advanced Discourse Markers',
    description: 'Sophisticated cohesive devices and linking',
    proficiencyLevel: 'C2',
  },
  {
    name: 'Idiomatic Grammar Patterns',
    description: 'Fixed grammatical patterns and collocations',
    proficiencyLevel: 'C2',
  },
  {
    name: 'Rhetorical Grammar Devices',
    description: 'Grammar for persuasion and rhetorical effect',
    proficiencyLevel: 'C2',
  },
  {
    name: 'Near-Synonymous Structure Distinctions',
    description: 'Choosing between similar grammatical structures',
    proficiencyLevel: 'C2',
  },
];

const englishVocabulary: Array<{
  name: string;
  description: string;
  proficiencyLevel: string;
}> = [
  {
    name: 'Family Members',
    description:
      'Basic family relationships (mother, father, sister, brother, etc.)',
    proficiencyLevel: 'A1',
  },
  {
    name: 'Numbers (0-100)',
    description: 'Cardinal and ordinal numbers up to 100',
    proficiencyLevel: 'A1',
  },
  {
    name: 'Colors',
    description: 'Basic colors (red, blue, green, yellow, black, white, etc.)',
    proficiencyLevel: 'A1',
  },
  {
    name: 'Days & Months',
    description: 'Days of the week and months of the year',
    proficiencyLevel: 'A1',
  },
  {
    name: 'Basic Food & Drinks',
    description: 'Common food items and beverages (bread, water, apple, etc.)',
    proficiencyLevel: 'A1',
  },
  {
    name: 'Body Parts',
    description: 'Basic body parts (head, hand, foot, eye, nose, etc.)',
    proficiencyLevel: 'A1',
  },
  {
    name: 'Clothes & Accessories',
    description: 'Common clothing items (shirt, pants, shoes, hat, etc.)',
    proficiencyLevel: 'A1',
  },
  {
    name: 'Animals',
    description: 'Common domestic and wild animals',
    proficiencyLevel: 'A1',
  },
  {
    name: 'School Subjects',
    description: 'Basic school subjects (math, English, science, etc.)',
    proficiencyLevel: 'A1',
  },
  {
    name: 'Classroom Objects',
    description: 'Items found in classroom (book, pen, desk, board, etc.)',
    proficiencyLevel: 'A1',
  },
  {
    name: 'House & Rooms',
    description: 'Parts of a house and basic furniture',
    proficiencyLevel: 'A1',
  },
  {
    name: 'Jobs & Occupations',
    description: 'Common professions (teacher, doctor, driver, etc.)',
    proficiencyLevel: 'A1',
  },
  {
    name: 'Daily Routines',
    description: 'Everyday activities (wake up, eat, sleep, work, etc.)',
    proficiencyLevel: 'A1',
  },
  {
    name: 'Time Expressions',
    description:
      'Telling time and time of day (morning, afternoon, evening, night)',
    proficiencyLevel: 'A1',
  },
  {
    name: 'Countries & Nationalities',
    description: 'Common countries and their nationalities',
    proficiencyLevel: 'A1',
  },
  {
    name: 'Basic Adjectives',
    description: 'Common descriptive adjectives (big, small, good, bad, etc.)',
    proficiencyLevel: 'A1',
  },
  {
    name: 'Basic Verbs',
    description: 'High-frequency action verbs (go, come, eat, drink, etc.)',
    proficiencyLevel: 'A1',
  },
  {
    name: 'Weather - Basic',
    description: 'Simple weather vocabulary (sunny, rainy, hot, cold)',
    proficiencyLevel: 'A1',
  },
  {
    name: 'Places in Town',
    description: 'Common locations (school, shop, park, hospital, etc.)',
    proficiencyLevel: 'A1',
  },
  {
    name: 'Transportation',
    description: 'Basic transport (car, bus, train, bike, plane)',
    proficiencyLevel: 'A1',
  },
  {
    name: 'Personal Information',
    description: 'Name, age, address, phone number vocabulary',
    proficiencyLevel: 'A1',
  },
  {
    name: 'Greetings & Polite Expressions',
    description: 'Hello, goodbye, please, thank you, sorry',
    proficiencyLevel: 'A1',
  },
  {
    name: 'Extended Family',
    description: 'Grandparents, aunts, uncles, cousins, in-laws',
    proficiencyLevel: 'A2',
  },
  {
    name: 'Food & Meals',
    description: 'Breakfast, lunch, dinner vocabulary and meal-related terms',
    proficiencyLevel: 'A2',
  },
  {
    name: 'Shopping',
    description: 'Shopping vocabulary (price, pay, buy, sell, discount, etc.)',
    proficiencyLevel: 'A2',
  },
  {
    name: 'Hobbies & Free Time',
    description: 'Common leisure activities and pastimes',
    proficiencyLevel: 'A2',
  },
  {
    name: 'Sports & Exercise',
    description: 'Common sports and fitness activities',
    proficiencyLevel: 'A2',
  },
  {
    name: 'Travel & Tourism',
    description: 'Hotels, airports, tickets, booking, sightseeing',
    proficiencyLevel: 'A2',
  },
  {
    name: 'Health & Illness',
    description: 'Common ailments, symptoms, and remedies',
    proficiencyLevel: 'A2',
  },
  {
    name: 'Weather - Detailed',
    description: 'Extended weather vocabulary (cloudy, windy, foggy, etc.)',
    proficiencyLevel: 'A2',
  },
  {
    name: 'Furniture & Household Items',
    description: 'Detailed home furnishings and appliances',
    proficiencyLevel: 'A2',
  },
  {
    name: 'Technology - Basic',
    description: 'Computer, phone, internet, email basics',
    proficiencyLevel: 'A2',
  },
  {
    name: 'Feelings & Emotions',
    description: 'Happy, sad, angry, excited, nervous, etc.',
    proficiencyLevel: 'A2',
  },
  {
    name: 'Personality Traits',
    description: 'Friendly, kind, shy, confident, etc.',
    proficiencyLevel: 'A2',
  },
  {
    name: 'Seasons & Nature',
    description: 'Seasons, trees, flowers, landscape features',
    proficiencyLevel: 'A2',
  },
  {
    name: 'Money & Banking',
    description: 'Cash, card, account, ATM, currency',
    proficiencyLevel: 'A2',
  },
  {
    name: 'Restaurant & Ordering',
    description: 'Menu, order, waiter, bill, tip',
    proficiencyLevel: 'A2',
  },
  {
    name: 'Describing People',
    description: 'Physical appearance and character descriptions',
    proficiencyLevel: 'A2',
  },
  {
    name: 'Describing Places',
    description: 'Vocabulary for describing locations and environments',
    proficiencyLevel: 'A2',
  },
  {
    name: 'Music & Entertainment',
    description: 'Musical instruments, concerts, movies, shows',
    proficiencyLevel: 'A2',
  },
  {
    name: 'Celebrations & Festivals',
    description: 'Birthdays, holidays, parties, traditions',
    proficiencyLevel: 'A2',
  },
  {
    name: 'Communication',
    description: 'Talk, speak, tell, say, ask, phone, message',
    proficiencyLevel: 'A2',
  },
  {
    name: 'Work & Employment',
    description: 'Career, salary, contract, promotion, unemployment',
    proficiencyLevel: 'B1',
  },
  {
    name: 'Education & Learning',
    description: 'University, degree, course, study, exam, graduate',
    proficiencyLevel: 'B1',
  },
  {
    name: 'Environment & Nature',
    description: 'Pollution, recycling, climate, endangered species',
    proficiencyLevel: 'B1',
  },
  {
    name: 'Technology & Internet',
    description: 'Social media, website, download, upload, software',
    proficiencyLevel: 'B1',
  },
  {
    name: 'News & Media',
    description: 'Newspaper, article, journalist, broadcast, headline',
    proficiencyLevel: 'B1',
  },
  {
    name: 'Crime & Law',
    description: 'Police, court, judge, guilty, innocent, evidence',
    proficiencyLevel: 'B1',
  },
  {
    name: 'Relationships',
    description: 'Friendship, dating, marriage, divorce, partner',
    proficiencyLevel: 'B1',
  },
  {
    name: 'Housing & Accommodation',
    description: 'Rent, mortgage, landlord, tenant, apartment',
    proficiencyLevel: 'B1',
  },
  {
    name: 'Social Issues',
    description: 'Poverty, inequality, discrimination, rights',
    proficiencyLevel: 'B1',
  },
  {
    name: 'Health & Fitness',
    description: 'Diet, nutrition, exercise, mental health, well-being',
    proficiencyLevel: 'B1',
  },
  {
    name: 'Science & Research',
    description: 'Experiment, discovery, theory, evidence, prove',
    proficiencyLevel: 'B1',
  },
  {
    name: 'Art & Culture',
    description: 'Museum, gallery, exhibition, sculpture, painting',
    proficiencyLevel: 'B1',
  },
  {
    name: 'Fashion & Style',
    description: 'Trendy, stylish, outfit, designer, casual, formal',
    proficiencyLevel: 'B1',
  },
  {
    name: 'Business Basics',
    description: 'Company, customer, profit, loss, market',
    proficiencyLevel: 'B1',
  },
  {
    name: 'Geography',
    description: 'Continent, ocean, mountain, desert, population',
    proficiencyLevel: 'B1',
  },
  {
    name: 'History',
    description: 'Ancient, medieval, modern, century, civilization',
    proficiencyLevel: 'B1',
  },
  {
    name: 'Opinion & Argument',
    description: 'Agree, disagree, point of view, argument, debate',
    proficiencyLevel: 'B1',
  },
  {
    name: 'Success & Failure',
    description: 'Achieve, accomplish, fail, overcome, challenge',
    proficiencyLevel: 'B1',
  },
  {
    name: 'Change & Development',
    description: 'Improve, decline, progress, evolve, transform',
    proficiencyLevel: 'B1',
  },
  {
    name: 'Cause & Effect',
    description: 'Result in, lead to, because of, due to, consequence',
    proficiencyLevel: 'B1',
  },
  {
    name: 'Global Issues',
    description: 'Globalization, migration, terrorism, humanitarian crisis',
    proficiencyLevel: 'B2',
  },
  {
    name: 'Economics & Finance',
    description: 'Inflation, recession, investment, stock market, GDP',
    proficiencyLevel: 'B2',
  },
  {
    name: 'Politics & Government',
    description: 'Democracy, election, policy, parliament, legislation',
    proficiencyLevel: 'B2',
  },
  {
    name: 'Advanced Technology',
    description:
      'Artificial intelligence, automation, innovation, breakthrough',
    proficiencyLevel: 'B2',
  },
  {
    name: 'Medicine & Healthcare',
    description: 'Diagnosis, treatment, surgery, prescription, symptoms',
    proficiencyLevel: 'B2',
  },
  {
    name: 'Psychology & Behavior',
    description: 'Motivation, attitude, perception, cognitive, emotional',
    proficiencyLevel: 'B2',
  },
  {
    name: 'Ethics & Morality',
    description: 'Moral, ethical, dilemma, conscience, principle',
    proficiencyLevel: 'B2',
  },
  {
    name: 'Marketing & Advertising',
    description: 'Brand, campaign, target audience, consumer, promotion',
    proficiencyLevel: 'B2',
  },
  {
    name: 'Literature & Writing',
    description: 'Novel, poetry, genre, narrative, metaphor, plot',
    proficiencyLevel: 'B2',
  },
  {
    name: 'Film & Theater',
    description: 'Director, screenplay, performance, critic, premiere',
    proficiencyLevel: 'B2',
  },
  {
    name: 'Academic Vocabulary',
    description: 'Research, hypothesis, methodology, analysis, conclusion',
    proficiencyLevel: 'B2',
  },
  {
    name: 'Advanced Adjectives',
    description: 'Sophisticated descriptive vocabulary',
    proficiencyLevel: 'B2',
  },
  {
    name: 'Phrasal Verbs',
    description: 'Common multi-word verbs in context',
    proficiencyLevel: 'B2',
  },
  {
    name: 'Idioms & Expressions',
    description: 'Common idiomatic expressions',
    proficiencyLevel: 'B2',
  },
  {
    name: 'Collocations',
    description: 'Common word combinations and partnerships',
    proficiencyLevel: 'B2',
  },
  {
    name: 'Abstract Concepts',
    description: 'Freedom, justice, truth, reality, existence',
    proficiencyLevel: 'B2',
  },
  {
    name: 'Formal & Informal Language',
    description: 'Register awareness and appropriate vocabulary choice',
    proficiencyLevel: 'B2',
  },
  {
    name: 'Prefixes & Suffixes',
    description: 'Word formation through affixes',
    proficiencyLevel: 'B2',
  },
  {
    name: 'Advanced Economics',
    description:
      'Monetary policy, fiscal strategy, macroeconomics, derivatives',
    proficiencyLevel: 'C1',
  },
  {
    name: 'Law & Legal Systems',
    description: 'Jurisdiction, precedent, litigation, statute, jurisprudence',
    proficiencyLevel: 'C1',
  },
  {
    name: 'Philosophy',
    description:
      'Metaphysics, epistemology, logic, existentialism, rationalism',
    proficiencyLevel: 'C1',
  },
  {
    name: 'Advanced Science',
    description: 'Quantum physics, genetics, neuroscience, biotechnology',
    proficiencyLevel: 'C1',
  },
  {
    name: 'International Relations',
    description: 'Diplomacy, alliance, sovereignty, treaty, sanctions',
    proficiencyLevel: 'C1',
  },
  {
    name: 'Corporate World',
    description: 'Merger, acquisition, stakeholder, leverage, synergy',
    proficiencyLevel: 'C1',
  },
  {
    name: 'Environmental Science',
    description: 'Ecosystem, biodiversity, sustainability, carbon footprint',
    proficiencyLevel: 'C1',
  },
  {
    name: 'Advanced Medicine',
    description: 'Pathology, epidemiology, immunology, clinical trials',
    proficiencyLevel: 'C1',
  },
  {
    name: 'Sociology',
    description:
      'Social stratification, demographics, urbanization, inequality',
    proficiencyLevel: 'C1',
  },
  {
    name: 'Advanced Idioms',
    description: 'Less common idiomatic expressions and figurative language',
    proficiencyLevel: 'C1',
  },
  {
    name: 'Nuanced Vocabulary',
    description: 'Subtle distinctions between near-synonyms',
    proficiencyLevel: 'C1',
  },
  {
    name: 'Connotation & Register',
    description: 'Understanding subtle meanings and appropriateness',
    proficiencyLevel: 'C1',
  },
  {
    name: 'Academic Writing',
    description: 'Discourse, paradigm, conceptual, empirical, theoretical',
    proficiencyLevel: 'C1',
  },
  {
    name: 'Critical Thinking',
    description: 'Analyze, evaluate, synthesize, critique, interpret',
    proficiencyLevel: 'C1',
  },
  {
    name: 'Advanced Collocations',
    description: 'Sophisticated word partnerships',
    proficiencyLevel: 'C1',
  },
  {
    name: 'Euphemisms & Hedging',
    description: 'Diplomatic and cautious language',
    proficiencyLevel: 'C1',
  },
  {
    name: 'Specialized Academic Fields',
    description: 'Field-specific terminology across disciplines',
    proficiencyLevel: 'C2',
  },
  {
    name: 'Advanced Literary Terms',
    description: 'Allegory, irony, symbolism, motif, foreshadowing',
    proficiencyLevel: 'C2',
  },
  {
    name: 'Archaic & Literary Vocabulary',
    description: 'Older forms and literary expressions',
    proficiencyLevel: 'C2',
  },
  {
    name: 'Advanced Legal Terminology',
    description: 'Complex legal jargon and concepts',
    proficiencyLevel: 'C2',
  },
  {
    name: 'Sophisticated Idioms',
    description: 'Rare and sophisticated idiomatic expressions',
    proficiencyLevel: 'C2',
  },
  {
    name: 'Technical & Specialized Jargon',
    description: 'Professional and technical terminology',
    proficiencyLevel: 'C2',
  },
  {
    name: 'Subtle Semantic Distinctions',
    description: 'Fine-grained meaning differences',
    proficiencyLevel: 'C2',
  },
  {
    name: 'Rhetorical Devices',
    description: 'Metaphor, hyperbole, understatement, allusion',
    proficiencyLevel: 'C2',
  },
  {
    name: 'Regional & Dialectal Variation',
    description: 'Understanding vocabulary variants across regions',
    proficiencyLevel: 'C2',
  },
  {
    name: 'Historical Language Development',
    description: 'Etymology and language evolution',
    proficiencyLevel: 'C2',
  },
  {
    name: 'Colloquialisms & Slang',
    description: 'Informal, contemporary expressions',
    proficiencyLevel: 'C2',
  },
  {
    name: 'Native-like Word Choice',
    description: 'Natural vocabulary selection in all contexts',
    proficiencyLevel: 'C2',
  },
  {
    name: 'Advanced Wordplay',
    description: 'Puns, double meanings, linguistic humor',
    proficiencyLevel: 'C2',
  },
  {
    name: 'Stylistic Variation',
    description: 'Vocabulary for different styles and purposes',
    proficiencyLevel: 'C2',
  },
];

const englishReading: Array<{
  name: string;
  description: string;
  proficiencyLevel: string;
}> = [
  {
    name: 'Personal Introduction',
    description: 'Short texts introducing people (name, age, nationality, job)',
    proficiencyLevel: 'A1',
  },
  {
    name: 'Family Descriptions',
    description: 'Simple descriptions of family members and relationships',
    proficiencyLevel: 'A1',
  },
  {
    name: 'Daily Routines',
    description: 'Texts about everyday activities and schedules',
    proficiencyLevel: 'A1',
  },
  {
    name: 'Food & Meals',
    description: 'Simple texts about food preferences and eating habits',
    proficiencyLevel: 'A1',
  },
  {
    name: 'House & Home',
    description: 'Descriptions of houses, rooms, and furniture',
    proficiencyLevel: 'A1',
  },
  {
    name: 'School Life',
    description:
      'Simple texts about school, subjects, and classroom activities',
    proficiencyLevel: 'A1',
  },
  {
    name: 'Hobbies & Interests',
    description: 'Basic texts about free time activities and interests',
    proficiencyLevel: 'A1',
  },
  {
    name: 'Weather & Seasons',
    description: 'Simple weather descriptions and seasonal activities',
    proficiencyLevel: 'A1',
  },
  {
    name: 'Shopping',
    description: 'Basic shopping situations and product descriptions',
    proficiencyLevel: 'A1',
  },
  {
    name: 'Places in Town',
    description: 'Descriptions of locations and directions',
    proficiencyLevel: 'A1',
  },
  {
    name: 'Simple Instructions',
    description: 'Basic procedural texts and directions',
    proficiencyLevel: 'A1',
  },
  {
    name: 'Animals & Pets',
    description: 'Simple descriptions of animals and pet care',
    proficiencyLevel: 'A1',
  },
  {
    name: 'Time & Dates',
    description: 'Texts about telling time, days, months, and dates',
    proficiencyLevel: 'A1',
  },
  {
    name: 'Clothing & Fashion',
    description: 'Basic descriptions of clothes and what people wear',
    proficiencyLevel: 'A1',
  },
  {
    name: 'Jobs & Work',
    description: 'Simple texts about different professions',
    proficiencyLevel: 'A1',
  },
  {
    name: 'Transportation',
    description: 'Basic texts about different means of transport',
    proficiencyLevel: 'A1',
  },
  {
    name: 'Simple Signs & Notices',
    description: 'Public signs, notices, and short messages',
    proficiencyLevel: 'A1',
  },
  {
    name: 'Greetings & Messages',
    description: 'Simple greeting cards, postcards, and short messages',
    proficiencyLevel: 'A1',
  },
  {
    name: 'Personal Experiences',
    description: 'Past experiences, vacations, and memorable events',
    proficiencyLevel: 'A2',
  },
  {
    name: 'Travel & Tourism',
    description: 'Holiday destinations, travel plans, and tourist information',
    proficiencyLevel: 'A2',
  },
  {
    name: 'Health & Fitness',
    description: 'Healthy lifestyle, exercise, and common illnesses',
    proficiencyLevel: 'A2',
  },
  {
    name: 'Technology in Daily Life',
    description: 'Using phones, computers, and basic technology',
    proficiencyLevel: 'A2',
  },
  {
    name: 'Entertainment & Leisure',
    description: 'Movies, music, concerts, and entertainment venues',
    proficiencyLevel: 'A2',
  },
  {
    name: 'Celebrations & Events',
    description: 'Festivals, parties, birthdays, and cultural celebrations',
    proficiencyLevel: 'A2',
  },
  {
    name: 'Friends & Relationships',
    description: 'Friendships, social activities, and relationships',
    proficiencyLevel: 'A2',
  },
  {
    name: 'Sports & Games',
    description: 'Different sports, teams, competitions, and rules',
    proficiencyLevel: 'A2',
  },
  {
    name: 'Restaurant & Dining',
    description: 'Menus, ordering food, restaurant experiences',
    proficiencyLevel: 'A2',
  },
  {
    name: 'Money & Prices',
    description: 'Buying and selling, banking, and managing money',
    proficiencyLevel: 'A2',
  },
  {
    name: 'Simple Biographies',
    description: 'Life stories of famous or interesting people',
    proficiencyLevel: 'A2',
  },
  {
    name: 'Local Community',
    description: 'Neighborhood, community services, local events',
    proficiencyLevel: 'A2',
  },
  {
    name: 'Nature & Environment',
    description: 'Plants, animals, natural landscapes',
    proficiencyLevel: 'A2',
  },
  {
    name: 'Simple News Stories',
    description: 'Short news articles about everyday events',
    proficiencyLevel: 'A2',
  },
  {
    name: 'Emails & Letters',
    description: 'Informal correspondence and messages',
    proficiencyLevel: 'A2',
  },
  {
    name: 'Product Descriptions',
    description: 'Advertisements and product information',
    proficiencyLevel: 'A2',
  },
  {
    name: 'Simple Instructions & Recipes',
    description: 'How-to guides and cooking instructions',
    proficiencyLevel: 'A2',
  },
  {
    name: 'Transportation Schedules',
    description: 'Timetables, tickets, and travel information',
    proficiencyLevel: 'A2',
  },
  {
    name: 'Education & Learning',
    description: 'School systems, university life, learning experiences',
    proficiencyLevel: 'B1',
  },
  {
    name: 'Career & Employment',
    description: 'Job applications, workplace culture, career development',
    proficiencyLevel: 'B1',
  },
  {
    name: 'Cultural Differences',
    description: 'Customs, traditions, and cultural comparisons',
    proficiencyLevel: 'B1',
  },
  {
    name: 'Environmental Issues',
    description: 'Pollution, conservation, climate change basics',
    proficiencyLevel: 'B1',
  },
  {
    name: 'Modern Technology',
    description: 'Internet, social media, digital communication',
    proficiencyLevel: 'B1',
  },
  {
    name: 'News & Current Events',
    description: 'Local and international news stories',
    proficiencyLevel: 'B1',
  },
  {
    name: 'Health & Medicine',
    description: 'Medical conditions, treatments, healthcare systems',
    proficiencyLevel: 'B1',
  },
  {
    name: 'Crime & Safety',
    description: 'Laws, rules, safety precautions, crime prevention',
    proficiencyLevel: 'B1',
  },
  {
    name: 'Housing & Accommodation',
    description: 'Finding homes, renting, neighborhood descriptions',
    proficiencyLevel: 'B1',
  },
  {
    name: 'Social Issues',
    description: 'Basic social problems and community concerns',
    proficiencyLevel: 'B1',
  },
  {
    name: 'Science & Discovery',
    description: 'Scientific facts, inventions, and discoveries',
    proficiencyLevel: 'B1',
  },
  {
    name: 'Art & Culture',
    description: 'Museums, exhibitions, artistic movements',
    proficiencyLevel: 'B1',
  },
  {
    name: 'Biography & Life Stories',
    description: 'Detailed life stories and personal narratives',
    proficiencyLevel: 'B1',
  },
  {
    name: 'Travel Experiences',
    description: 'Travel blogs, destination guides, cultural experiences',
    proficiencyLevel: 'B1',
  },
  {
    name: 'Consumer Information',
    description: 'Product reviews, consumer rights, complaints',
    proficiencyLevel: 'B1',
  },
  {
    name: 'Opinion Pieces',
    description: 'Editorials and opinion articles on familiar topics',
    proficiencyLevel: 'B1',
  },
  {
    name: 'Historical Events',
    description: 'Important historical events and periods',
    proficiencyLevel: 'B1',
  },
  {
    name: 'Narrative Fiction',
    description: 'Short stories with straightforward plots',
    proficiencyLevel: 'B1',
  },
  {
    name: 'Global Issues',
    description:
      'International problems, humanitarian crises, global cooperation',
    proficiencyLevel: 'B2',
  },
  {
    name: 'Economics & Business',
    description: 'Markets, trade, economic trends, business strategies',
    proficiencyLevel: 'B2',
  },
  {
    name: 'Politics & Governance',
    description: 'Political systems, elections, government policies',
    proficiencyLevel: 'B2',
  },
  {
    name: 'Advanced Technology',
    description: 'AI, automation, technological innovation and impact',
    proficiencyLevel: 'B2',
  },
  {
    name: 'Scientific Research',
    description: 'Research findings, experiments, scientific debates',
    proficiencyLevel: 'B2',
  },
  {
    name: 'Psychology & Human Behavior',
    description: 'Mental processes, behavior patterns, psychological studies',
    proficiencyLevel: 'B2',
  },
  {
    name: 'Ethics & Morality',
    description: 'Ethical dilemmas, moral questions, philosophical debates',
    proficiencyLevel: 'B2',
  },
  {
    name: 'Media & Communication',
    description: 'Journalism, media bias, communication theories',
    proficiencyLevel: 'B2',
  },
  {
    name: 'Literature & Literary Analysis',
    description: 'Literary works, themes, criticism, and interpretation',
    proficiencyLevel: 'B2',
  },
  {
    name: 'Complex Biographies',
    description: 'Detailed life stories with analysis and context',
    proficiencyLevel: 'B2',
  },
  {
    name: 'Academic Texts',
    description: 'Research papers, academic articles on various subjects',
    proficiencyLevel: 'B2',
  },
  {
    name: 'Environmental Science',
    description: 'Ecology, sustainability, environmental policies',
    proficiencyLevel: 'B2',
  },
  {
    name: 'Social & Cultural Trends',
    description: 'Societal changes, cultural movements, demographics',
    proficiencyLevel: 'B2',
  },
  {
    name: 'Complex News Analysis',
    description: 'In-depth news analysis and investigative journalism',
    proficiencyLevel: 'B2',
  },
  {
    name: 'Legal & Constitutional Matters',
    description: 'Laws, rights, legal systems, court cases',
    proficiencyLevel: 'B2',
  },
  {
    name: 'Complex Fiction',
    description: 'Literary fiction with complex themes and narratives',
    proficiencyLevel: 'B2',
  },
  {
    name: 'Abstract Philosophical Concepts',
    description: 'Complex philosophical arguments and theories',
    proficiencyLevel: 'C1',
  },
  {
    name: 'Advanced Economics',
    description: 'Economic theories, fiscal policy, financial markets',
    proficiencyLevel: 'C1',
  },
  {
    name: 'International Relations',
    description: 'Diplomacy, geopolitics, international law',
    proficiencyLevel: 'C1',
  },
  {
    name: 'Advanced Scientific Papers',
    description: 'Specialized research in various scientific fields',
    proficiencyLevel: 'C1',
  },
  {
    name: 'Sociology & Anthropology',
    description: 'Social structures, cultural anthropology, human societies',
    proficiencyLevel: 'C1',
  },
  {
    name: 'Advanced Medical Texts',
    description: 'Medical research, clinical studies, healthcare policy',
    proficiencyLevel: 'C1',
  },
  {
    name: 'Legal Texts & Case Law',
    description: 'Legal documents, court rulings, legislative texts',
    proficiencyLevel: 'C1',
  },
  {
    name: 'Complex Political Analysis',
    description: 'Political theory, policy analysis, governance studies',
    proficiencyLevel: 'C1',
  },
  {
    name: 'Academic Research Papers',
    description: 'Specialized academic texts across disciplines',
    proficiencyLevel: 'C1',
  },
  {
    name: 'Literary Criticism',
    description: 'Critical analysis of literature and literary movements',
    proficiencyLevel: 'C1',
  },
  {
    name: 'Historical Analysis',
    description: 'Complex historical texts with interpretation and analysis',
    proficiencyLevel: 'C1',
  },
  {
    name: 'Advanced Technology & Innovation',
    description: 'Cutting-edge technology, future trends, innovation theory',
    proficiencyLevel: 'C1',
  },
  {
    name: 'Corporate & Business Strategy',
    description: 'Business models, strategic planning, organizational theory',
    proficiencyLevel: 'C1',
  },
  {
    name: 'Cultural Theory',
    description: 'Cultural criticism, aesthetic theory, cultural studies',
    proficiencyLevel: 'C1',
  },
  {
    name: 'Complex Narrative Fiction',
    description: 'Literary fiction with sophisticated narrative techniques',
    proficiencyLevel: 'C1',
  },
  {
    name: 'Specialized Professional Texts',
    description: 'Technical and professional documents in various fields',
    proficiencyLevel: 'C1',
  },
  {
    name: 'Highly Specialized Academic Texts',
    description: 'Advanced scholarly texts in specialized fields',
    proficiencyLevel: 'C2',
  },
  {
    name: 'Classical & Historical Literature',
    description: 'Historical texts, classical works, archaic language',
    proficiencyLevel: 'C2',
  },
  {
    name: 'Complex Legal Documents',
    description: 'Contracts, legislation, complex legal arguments',
    proficiencyLevel: 'C2',
  },
  {
    name: 'Advanced Philosophical Texts',
    description: 'Original philosophical works and complex arguments',
    proficiencyLevel: 'C2',
  },
  {
    name: 'Technical Scientific Papers',
    description: 'Highly specialized research with technical terminology',
    proficiencyLevel: 'C2',
  },
  {
    name: 'Literary Masterworks',
    description: 'Complex literary texts with nuanced language and themes',
    proficiencyLevel: 'C2',
  },
  {
    name: 'Abstract Theoretical Texts',
    description: 'Complex theories across various academic disciplines',
    proficiencyLevel: 'C2',
  },
  {
    name: 'Historical Documents',
    description: 'Original historical texts and primary sources',
    proficiencyLevel: 'C2',
  },
  {
    name: 'Advanced Poetry & Drama',
    description: 'Complex poetic and dramatic works',
    proficiencyLevel: 'C2',
  },
  {
    name: 'Satirical & Ironic Texts',
    description: 'Texts with subtle humor, satire, and irony',
    proficiencyLevel: 'C2',
  },
  {
    name: 'Complex Argumentative Texts',
    description: 'Sophisticated arguments with implicit meanings',
    proficiencyLevel: 'C2',
  },
  {
    name: 'Interdisciplinary Academic Works',
    description: 'Texts combining multiple academic disciplines',
    proficiencyLevel: 'C2',
  },
  {
    name: 'Regional & Dialectal Texts',
    description: 'Texts with regional varieties and non-standard language',
    proficiencyLevel: 'C2',
  },
  {
    name: 'Texts with Cultural References',
    description: 'Content requiring deep cultural knowledge',
    proficiencyLevel: 'C2',
  },
];

export async function seedTopics() {
  console.log('👉 Seeding topics...');

  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  const topicRepository = AppDataSource.getRepository(Topic);
  const subjectRepository = AppDataSource.getRepository(Subject);
  const skillCategoryRepository = AppDataSource.getRepository(SkillCategory);
  const proficiencyLevelRepository =
    AppDataSource.getRepository(ProficiencyLevel);

  const englishSubject = await subjectRepository.findOne({
    where: { code: 'ENG' },
  });

  if (!englishSubject) {
    throw new Error(
      'English subject not found. Please run seedSubjects first.',
    );
  }

  const grammarCategory = await skillCategoryRepository.findOne({
    where: { subjectId: englishSubject.id, name: 'Grammar' },
  });

  if (!grammarCategory) {
    throw new Error(
      'Grammar skill category not found. Please run seedSkillCategories first.',
    );
  }

  const vocabularyCategory = await skillCategoryRepository.findOne({
    where: { subjectId: englishSubject.id, name: 'Vocabulary' },
  });

  if (!vocabularyCategory) {
    throw new Error(
      'Vocabulary skill category not found. Please run seedSkillCategories first.',
    );
  }

  const readingCategory = await skillCategoryRepository.findOne({
    where: { subjectId: englishSubject.id, name: 'Reading' },
  });

  if (!readingCategory) {
    throw new Error(
      'Reading skill category not found. Please run seedSkillCategories first.',
    );
  }

  const proficiencyLevels = await proficiencyLevelRepository.find({
    where: { subjectId: englishSubject.id },
  });

  const levelMap = new Map(
    proficiencyLevels.map((level) => [level.code, level]),
  );

  const processTopics = async (
    topics: Array<{
      name: string;
      description: string;
      proficiencyLevel: string;
    }>,
    skillCategory: SkillCategory,
    categoryName: string,
  ) => {
    for (let i = 0; i < topics.length; i++) {
      const topicData = topics[i];
      const displayOrder = i + 1;

      const proficiencyLevel = levelMap.get(topicData.proficiencyLevel);

      if (!proficiencyLevel) {
        console.warn(
          `⚠️ Proficiency level ${topicData.proficiencyLevel} not found for ${categoryName} topic: ${topicData.name}. Skipping.`,
        );
        continue;
      }

      const existing = await topicRepository.findOne({
        where: {
          subjectId: englishSubject.id,
          skillCategoryId: skillCategory.id,
          name: topicData.name,
        },
        relations: ['proficiencyLevel'],
      });

      const payload: Partial<Topic> = {
        subjectId: englishSubject.id,
        skillCategoryId: skillCategory.id,
        name: topicData.name,
        description: topicData.description,
        displayOrder,
        isActive: true,
        proficiencyLevelId: proficiencyLevel.id,
        proficiencyLevel: proficiencyLevel,
      };

      if (existing) {
        topicRepository.merge(existing, payload);
        await topicRepository.save(existing);
        console.log(
          `🔄 Updated ${categoryName} topic: ${topicData.name} (order: ${displayOrder})`,
        );
      } else {
        const newTopic = topicRepository.create(payload);
        await topicRepository.save(newTopic);
        console.log(
          `✅ Created ${categoryName} topic: ${topicData.name} (order: ${displayOrder})`,
        );
      }
    }
  };

  await processTopics(englishGrammar, grammarCategory, 'Grammar');
  await processTopics(englishVocabulary, vocabularyCategory, 'Vocabulary');
  await processTopics(englishReading, readingCategory, 'Reading');

  console.log('✅ Topics seeding completed!');
}

if (require.main === module) {
  seedTopics()
    .then(() => {
      console.log('✅ Seeding finished successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Seeding failed:', error);
      process.exit(1);
    });
}

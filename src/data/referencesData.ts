import type { BookReference, ResearchPaperReference } from '../types';

export const BOOKS_DATABASE: BookReference[] = [
  {
    id: 'goddard_reflexes_learning',
    title: "Reflexes, Learning and Behavior: A Window into the Child's Mind",
    author: 'Sally Goddard Blythe, MSc',
    authorTitle: 'Director of the Institute for Neuro-Physiological Psychology (INPP, Chester, UK)',
    category: 'clinical_manual',
    categoryLabel: 'Foundational Clinical Manual',
    year: 2002,
    isbn: '978-0933358047',
    coverEmoji: '🧠',
    targetAudience: 'Clinicians & OTs',
    summary:
      'The seminal global standard text connecting retained primitive reflexes to specific learning and behavioral difficulties in children. Documents how the nervous system matures from involuntary survival loops into voluntary cortical motor control.',
    whyItMatters:
      'If you only read one clinical manual, make it this one. It details exactly how retained Moro triggers fight-or-flight anxiety, how ATNR fractures binocular vision and handwriting, and how STNR causes chronic slouching and W-sitting.',
    keyTakeaways: [
      'Primitive reflexes must integrate in a strict developmental sequence for the neocortex to take charge.',
      'A retained Moro reflex causes continuous release of cortisol and adrenaline, producing chronic anxiety.',
      'Standardized INPP clinical diagnostic screening protocols and scoring guidelines.'
    ]
  },
  {
    id: 'melillo_disconnected_kids',
    title: 'Disconnected Kids: The Groundbreaking Brain Balance Program',
    author: 'Dr. Robert Melillo',
    authorTitle: 'Functional Neurologist, Clinician & Researcher',
    category: 'parent_guide',
    categoryLabel: 'Parent Neurodevelopmental Guide',
    year: 2015,
    isbn: '978-0399172441',
    coverEmoji: '🌱',
    targetAudience: 'Parents & Caregivers',
    summary:
      'A highly accessible, actionable guide for parents of children with Autism Spectrum, ADHD, Dyslexia, and Tourette’s Syndrome based on the concept of Functional Disconnection Syndrome (hemispheric imbalance).',
    whyItMatters:
      'Translates complex developmental neuroscience into concrete home routines. Shows how primitive reflex remediation directly stimulates the weaker brain hemisphere, balancing sensory-motor processing and emotional regulation.',
    keyTakeaways: [
      'Primitive reflex retention is almost universally present in hemispheric developmental delays.',
      'Pairs physical primitive reflex exercises with sensory stimulation (olfactory, auditory, visual) for rapid neuroplasticity.',
      'Practical home checklist to determine whether the right or left hemisphere needs targeted stimulation.'
    ]
  },
  {
    id: 'blomberg_movements_that_heal',
    title: 'Movements That Heal: Rhythmic Movement Training and Primitive Reflexes',
    author: 'Dr. Harald Blomberg, MD & Moira Dempsey',
    authorTitle: 'Psychiatrist & Founders of Rhythmic Movement Training International (RMTi)',
    category: 'clinical_manual',
    categoryLabel: 'Rhythmic Movement (RMTi) Protocol',
    year: 2011,
    isbn: '978-0646562094',
    coverEmoji: '🌊',
    targetAudience: 'Parents & Caregivers',
    summary:
      'Explains the transformative healing power of rhythmic movement training. Demonstrates how slow, rhythmic rocking movements mimic infant motor milestones to stimulate the reticular activating system and cerebellum.',
    whyItMatters:
      'Provides the neurological foundation for why gentle, rocking movements (like our Fear Paralysis and Moro pathways) soothe severe anxiety, reduce muscle tone abnormalities, and restore peaceful sleep.',
    keyTakeaways: [
      'Rhythmic movements stimulate the cerebellum, which coordinates both motor balance and cognitive thought sequencing.',
      'Gentle passive movements are as effective as active exercises for children with hypotonia or extreme resistance.',
      'Direct protocols for integrating TLR, FPR, and Spinal Galant to stop chronic bedwetting and fidgeting.'
    ]
  },
  {
    id: 'masgutova_reflex_integration_autism',
    title: 'Reflex Integration for Children with Autism & Neurodevelopmental Challenges',
    author: 'Dr. Svetlana Masgutova, Ph.D.',
    authorTitle: 'Founder of the Svetlana Masgutova Educational Institute (MNRI®)',
    category: 'clinical_manual',
    categoryLabel: 'MNRI® Neurosensory Manual',
    year: 2015,
    isbn: '978-0979523632',
    coverEmoji: '✨',
    targetAudience: 'Clinicians & OTs',
    summary:
      'The comprehensive reference for the Masgutova Neurosensorimotor Reflex Integration (MNRI®) method, detailing how stress, maternal trauma, or genetic conditions freeze primitive motor patterns into dysfunctional states.',
    whyItMatters:
      'Widely considered the gold-standard protocol utilized by specialized pediatric occupational therapists worldwide for non-verbal and sensory-defensive children with Autism and Cerebral Palsy.',
    keyTakeaways: [
      'Reflexes do not just disappear; they form the foundational neurological alphabet for all voluntary motor and emotional skills.',
      'Deep tactile-proprioceptive sensory stimulation must precede active motor demands.',
      'Specific re-patterning sequences that awaken the body’s innate protective circuits without triggering stress.'
    ]
  },
  {
    id: 'ayres_sensory_integration_child',
    title: 'Sensory Integration and the Child',
    author: 'A. Jean Ayres, Ph.D., OTR',
    authorTitle: 'Pioneering Occupational Therapist & Creator of Sensory Integration Theory',
    category: 'sensory_integration',
    categoryLabel: 'Sensory Integration Classic',
    year: 2005,
    isbn: '978-0874244373',
    coverEmoji: '🧩',
    targetAudience: 'Educators & Therapists',
    summary:
      'The landmark classic by the occupational therapist who first discovered and identified Sensory Processing Disorder (SPD). Explains how the brain organizes sensations from the body and environment.',
    whyItMatters:
      'Crucial for understanding that primitive reflexes do not operate in a vacuum—they are intertwined with the vestibular (inner ear), proprioceptive (joints/muscles), and tactile systems.',
    keyTakeaways: [
      'Sensory nourishment is as vital to brain development as nutritional nourishment.',
      'Gravitational insecurity is a vestibular-Moro dysfunction where the brain misinterprets gravity as imminent falling.',
      'How proprioceptive "heavy work" functions as the brain’s natural neurological brake pedal.'
    ]
  },
  {
    id: 'kranowitz_out_of_sync_child',
    title: 'The Out-of-Sync Child: Recognizing and Coping with Sensory Processing Differences',
    author: 'Carol Stock Kranowitz, M.A.',
    authorTitle: 'Educator, Sensory Processing Advocate & Author',
    category: 'parent_guide',
    categoryLabel: 'Sensory Parenting Handbook',
    year: 2022,
    isbn: '978-0593419403',
    coverEmoji: '🎒',
    targetAudience: 'Parents & Caregivers',
    summary:
      'The internationally acclaimed parent guide to sensory processing differences. Provides compassionate, practical explanations for why children melt down over loud noises, clothes tags, food textures, or sudden transitions.',
    whyItMatters:
      'Invaluable for parents who feel confused or judged by meltdowns. Outlines daily home strategies and sensory diets that make everyday routines joyful rather than overwhelming.',
    keyTakeaways: [
      'Clear distinctions between sensory over-responsivity, under-responsivity, and sensory seeking.',
      'Sensory strategies to incorporate into morning dressing, mealtime, and bedtime transitions.',
      'Practical guidance for communicating effectively with teachers and IEP school teams.'
    ]
  },
  {
    id: 'goddard_well_balanced_child',
    title: 'The Well Balanced Child: Movement and Early Learning',
    author: 'Sally Goddard Blythe, MSc',
    authorTitle: 'Director of the Institute for Neuro-Physiological Psychology (INPP)',
    category: 'parent_guide',
    categoryLabel: 'Early Childhood Movement Guide',
    year: 2005,
    isbn: '978-1903458631',
    coverEmoji: '🤸',
    targetAudience: 'Parents & Caregivers',
    summary:
      'A warm, highly practical guide examining how traditional early childhood activities—nursery rhymes, rolling down hills, climbing trees, and floor play—naturally integrate primitive reflexes.',
    whyItMatters:
      'Highlights the hidden developmental costs of modern infant equipment (car seat carriers, baby walkers, excess screen time) and provides playful movement remedies parents can do in the living room.',
    keyTakeaways: [
      'Movement is the first language of the infant brain before words emerge.',
      'Singing with rhythmic rocking accelerates vestibular myelination and language acquisition.',
      'Simple floor games that naturally prevent retained reflexes without feeling like clinical homework.'
    ]
  },
  {
    id: 'hannaford_smart_moves',
    title: 'Smart Moves: Why Learning Is Not All in Your Head',
    author: 'Dr. Carla Hannaford, Ph.D.',
    authorTitle: 'Neurobiologist, Educator & Senior Consultant',
    category: 'neurological_research',
    categoryLabel: 'Neurobiology of Movement',
    year: 2005,
    isbn: '978-0915556373',
    coverEmoji: '🔬',
    targetAudience: 'Educators & Therapists',
    summary:
      'Explores the detailed neurobiology of movement, explaining how physical cross-lateral exercises stimulate the corpus callosum and activate whole-brain learning for reading, writing, and emotional focus.',
    whyItMatters:
      'Validates why cross-lateral exercises (like our ATNR Lizard Crawl and cross-body opposition drills) unlock academic breakthroughs in children previously labeled learning disabled.',
    keyTakeaways: [
      'The vestibular system is the master coordinator of all sensory input arriving in the brain.',
      'Cross-crawl physical patterns force the left and right cerebral hemispheres to synchronize communication.',
      'Physical movement generates Brain-Derived Neurotrophic Factor (BDNF), catalyzing neuroplasticity.'
    ]
  }
];

export const RESEARCH_PAPERS_DATABASE: ResearchPaperReference[] = [
  {
    id: 'mcphillips_lancet_2000',
    title:
      'Effects of replicating primary-reflex movements on specific reading difficulties in children: a randomised, double-blind, controlled trial',
    authors: 'McPhillips, M., Hepper, P. G., & Mulhern, G.',
    journal: 'The Lancet, Vol. 355(9203), pp. 537–541',
    year: 2000,
    doi: '10.1016/S0140-6736(99)02179-0',
    reflexFocus: 'ATNR (Asymmetrical Tonic Neck Reflex)',
    keyFinding:
      'A landmark randomized double-blind trial demonstrating that a specific movement sequence replicating primary reflexes significantly reduced retained ATNR and resulted in dramatic reading improvement compared to control groups.'
  },
  {
    id: 'goddard_bjot_1998',
    title:
      'Screening for Neurological Dysfunction in the Specific Learning Difficulty Child',
    authors: 'Goddard Blythe, S. & Hyland, D.',
    journal: 'British Journal of Occupational Therapy, Vol. 61(10), pp. 459–464',
    year: 1998,
    doi: '10.1177/030802269806101008',
    reflexFocus: 'ATNR, STNR, TLR & Moro Reflex Battery',
    keyFinding:
      'Identified that persistent primitive reflexes act as direct neurodevelopmental barriers in children with specific learning difficulties, establishing standardized clinical screening protocols for pediatric occupational therapists.'
  },
  {
    id: 'gieysztor_aoms_2018',
    title:
      'Persistence of primitive reflexes and associated motor problems in healthy preschool children',
    authors: 'Gieysztor, E. Z., Choińska, A. M., & Paprocka-Borowicz, M.',
    journal: 'Archives of Medical Science, Vol. 14(1), pp. 167–173',
    year: 2018,
    doi: '10.5114/aoms.2016.60503',
    reflexFocus: 'ATNR, STNR, TLR & Spinal Galant',
    keyFinding:
      'Demonstrated that persistent primitive reflexes occur across healthy preschool populations and correlate significantly with impaired gross motor skills, static balance, and bilateral motor coordination.'
  },
  {
    id: 'konicarova_ndt_2013',
    title:
      'Persisting primitive reflexes in medication-naïve girls with attention-deficit and hyperactivity disorder',
    authors: 'Konicarova, J. & Bob, P.',
    journal: 'Neuropsychiatric Disease and Treatment, Vol. 9, pp. 1457–1461',
    year: 2013,
    doi: '10.2147/NDT.S49343',
    reflexFocus: 'Moro, ATNR & Spinal Galant Reflexes',
    keyFinding:
      'Found statistically significant elevation of unintegrated primitive reflexes in medication-naïve children with ADHD compared to neurotypical controls, confirming uninhibited brainstem reflexes as neurodevelopmental biomarkers.'
  }
];

export type ReflexId =
  | 'fpr'
  | 'moro'
  | 'tlr'
  | 'landau'
  | 'spinal_galant'
  | 'amphibian'
  | 'atnr'
  | 'stnr'
  | 'palmar'
  | 'plantar_babinski'
  | 'rooting';

export type ReflexTier = 1 | 2 | 3 | 4;

export type ExerciseCategory =
  | 'primary_movement'
  | 'assisted_passive'
  | 'isometric_resistance'
  | 'rhythmic_movement'
  | 'equipment_sensory'
  | 'active_play'
  | 'classroom_desk';

export interface TransientStep {
  stepNumber: number;
  phase: 'setup' | 'begin' | 'transient' | 'finish';
  title: string;
  postureDescription: string;
  actionInstruction: string;
  parentCue: string;
  imageUrl?: string;
  diagramType?: string;
  alignmentCheck?: string;
  durationSeconds?: number;
  breathCue?: string;
  compensationWarning?: string;
}

export interface BookReference {
  id: string;
  title: string;
  author: string;
  authorTitle: string;
  category: 'clinical_manual' | 'parent_guide' | 'sensory_integration' | 'neurological_research';
  categoryLabel: string;
  year: number;
  isbn: string;
  coverEmoji: string;
  targetAudience: 'Parents & Caregivers' | 'Clinicians & OTs' | 'Educators & Therapists';
  summary: string;
  whyItMatters: string;
  keyTakeaways: string[];
}

export interface ResearchPaperReference {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  doi?: string;
  reflexFocus: string;
  keyFinding: string;
}

export interface IntegrationExerciseOption {
  id: string;
  name: string;
  category: ExerciseCategory;
  categoryLabel: string;
  suitableFor: string;
  durationSeconds: number;
  targetReps: string;
  transientSteps: TransientStep[];
  coachingCues: string[];
  resistancePlayScript: string;
  imageUrl?: string;
  transientSequenceImageUrl?: string;
  metronomeBpm?: number;
  compensationRedFlags?: string[];
}

export interface ReflexInfo {
  id: ReflexId;
  name: string;
  aka: string;
  tier: ReflexTier;
  tierName: string;
  tierDescription: string;
  description: string;
  functionalSigns: string[];
  assessment: {
    setup: string;
    action: string;
    baselineCheck?: string;
    safetyCaution: string;
    techniqueTip?: string;
    grading: {
      grade0: string; // Integrated
      grade1: string; // Mild
      grade2: string; // Moderate
      grade3: string; // Severe
    };
    retainedCharacteristics: string[];
    integratedCharacteristics: string[];
    retainedVsIntegratedImageUrl?: string;
    assessmentVideoId: string; // Verified OT assessment explanation video
    assessmentVideoUrl: string;
  };
  exercisePathways: IntegrationExerciseOption[];
  verification: {
    durationWeeks: string;
    retestProtocol: string;
    criteriaForIntegration: string;
  };
  primaryVideo: {
    youtubeId: string;
    youtubeUrl: string;
    title: string;
  };
}

export type RegulationZone = 'red' | 'yellow' | 'green' | 'blue';

export type MovementQuality =
  | 'smooth_slow'
  | 'assisted_passive'
  | 'rushed_compensated'
  | 'micro_win'
  | 'dysregulated_stopped';

export interface LateralizedScore {
  left: number;
  right: number;
}

export type SupportNeedLevel =
  | 'independent_verbal'
  | 'moderate_scaffolding'
  | 'extensive_hands_on';

export type SensoryModulationProfile =
  | 'sensory_seeking'
  | 'sensory_defensive'
  | 'sensory_under_responsive'
  | 'mixed_fluctuating';

export type MuscleToneProfile =
  | 'hypotonic'
  | 'hypertonic_tense'
  | 'typical_variable';

export type CuePreference =
  | 'imaginative_story'
  | 'literal_clear'
  | 'hands_free_audio';

export interface ChildProfile {
  id: string;
  name: string; // Nickname / Alias only (Zero PII)
  avatarEmoji?: string;
  supportLevel?: 'level1' | 'level2' | 'level3'; // Kept for backward compatibility
  supportNeed?: SupportNeedLevel;
  sensoryProfile?: SensoryModulationProfile;
  muscleTone?: MuscleToneProfile;
  cuePreference?: CuePreference;
  preferredReward?: string;
  targetStreak?: number;
}

export interface UserSyncState {
  isSignedIn: boolean;
  email?: string;
  displayName?: string;
  photoUrl?: string;
  lastSyncedAt?: number;
}

export interface RegulationLog {
  id: string;
  date: string;
  time: string;
  timestamp?: number;
  preZone: RegulationZone;
  postZone: RegulationZone;
  exercisesDone: ReflexId[];
  deckName?: string;
  durationMinutes?: number;
  movementQuality?: MovementQuality;
  compensationsObserved?: string[];
  notes?: string;
}

export type AssessmentScores = Record<ReflexId, number> & {
  lateralized?: Partial<Record<ReflexId, LateralizedScore>>;
};

import type {
  RegulationLog,
  AssessmentScores,
  ChildProfile,
  ReflexId,
  RegulationZone,
  UserSyncState
} from '../types';

const STORAGE_KEYS = {
  LOGS: 'kineticbloom_logs_v2',
  SCORES: 'kineticbloom_scores_v2',
  BASELINE_SCORES: 'kineticbloom_baseline_scores_v2',
  PROFILES: 'kineticbloom_profiles_v2',
  ACTIVE_PROFILE_ID: 'kineticbloom_active_profile_id_v2',
  SENSORY_MODE: 'kineticbloom_sensory_mode_v2',
  SYNC_STATE: 'kineticbloom_sync_state_v2'
};

export const PRESET_PERSONAS: ChildProfile[] = [
  {
    id: 'persona_maya',
    name: 'Maya',
    avatarEmoji: '🚀',
    supportLevel: 'level1',
    supportNeed: 'independent_verbal',
    sensoryProfile: 'sensory_seeking',
    muscleTone: 'typical_variable',
    cuePreference: 'imaginative_story',
    preferredReward: '10 Mins Trampoline Jump',
    targetStreak: 14
  },
  {
    id: 'persona_leo',
    name: 'Leo',
    avatarEmoji: '🧩',
    supportLevel: 'level2',
    supportNeed: 'moderate_scaffolding',
    sensoryProfile: 'mixed_fluctuating',
    muscleTone: 'hypotonic',
    cuePreference: 'literal_clear',
    preferredReward: 'Lego Space Station Break',
    targetStreak: 14
  },
  {
    id: 'persona_sam',
    name: 'Sam',
    avatarEmoji: '🧸',
    supportLevel: 'level3',
    supportNeed: 'extensive_hands_on',
    sensoryProfile: 'sensory_defensive',
    muscleTone: 'hypotonic',
    cuePreference: 'hands_free_audio',
    preferredReward: 'Soft Blanket & Story Time',
    targetStreak: 21
  }
];

export const PRESET_SCORES: Record<string, { baseline: AssessmentScores; current: AssessmentScores }> = {
  persona_maya: {
    baseline: {
      fpr: 0,
      moro: 1,
      tlr: 2,
      landau: 1,
      spinal_galant: 2,
      amphibian: 1,
      atnr: 3,
      stnr: 2,
      palmar: 0,
      plantar_babinski: 1,
      rooting: 0,
      lateralized: {
        atnr: { left: 3, right: 1 },
        spinal_galant: { left: 2, right: 1 }
      }
    },
    current: {
      fpr: 0,
      moro: 0,
      tlr: 1,
      landau: 0,
      spinal_galant: 1,
      amphibian: 0,
      atnr: 2,
      stnr: 1,
      palmar: 0,
      plantar_babinski: 1,
      rooting: 0,
      lateralized: {
        atnr: { left: 2, right: 1 },
        spinal_galant: { left: 1, right: 1 }
      }
    }
  },
  persona_leo: {
    baseline: {
      fpr: 2,
      moro: 3,
      tlr: 3,
      landau: 2,
      spinal_galant: 2,
      amphibian: 1,
      atnr: 2,
      stnr: 2,
      palmar: 1,
      plantar_babinski: 2,
      rooting: 0,
      lateralized: {
        atnr: { left: 2, right: 1 },
        spinal_galant: { left: 2, right: 1 },
        plantar_babinski: { left: 2, right: 1 }
      }
    },
    current: {
      fpr: 1,
      moro: 2,
      tlr: 2,
      landau: 2,
      spinal_galant: 1,
      amphibian: 1,
      atnr: 1,
      stnr: 2,
      palmar: 1,
      plantar_babinski: 1,
      rooting: 0,
      lateralized: {
        atnr: { left: 1, right: 1 },
        spinal_galant: { left: 1, right: 1 },
        palmar: { left: 1, right: 1 },
        plantar_babinski: { left: 1, right: 1 }
      }
    }
  },
  persona_sam: {
    baseline: {
      fpr: 3,
      moro: 3,
      tlr: 3,
      landau: 2,
      spinal_galant: 2,
      amphibian: 2,
      atnr: 3,
      stnr: 2,
      palmar: 3,
      plantar_babinski: 3,
      rooting: 2,
      lateralized: {
        atnr: { left: 3, right: 3 },
        palmar: { left: 3, right: 3 },
        plantar_babinski: { left: 3, right: 3 }
      }
    },
    current: {
      fpr: 3,
      moro: 2,
      tlr: 2,
      landau: 1,
      spinal_galant: 2,
      amphibian: 1,
      atnr: 2,
      stnr: 2,
      palmar: 2,
      plantar_babinski: 2,
      rooting: 1,
      lateralized: {
        atnr: { left: 2, right: 2 },
        palmar: { left: 2, right: 2 },
        plantar_babinski: { left: 2, right: 2 }
      }
    }
  }
};

const DEFAULT_SCORES: AssessmentScores = {
  fpr: 2,
  moro: 2,
  tlr: 2,
  landau: 1,
  spinal_galant: 1,
  amphibian: 1,
  atnr: 2,
  stnr: 1,
  palmar: 1,
  plantar_babinski: 1,
  rooting: 0,
  lateralized: {
    atnr: { left: 2, right: 1 },
    spinal_galant: { left: 1, right: 1 },
    palmar: { left: 1, right: 1 },
    plantar_babinski: { left: 1, right: 1 }
  }
};

const INITIAL_DEMO_LOGS: RegulationLog[] = [
  {
    id: 'log-1',
    date: 'Yesterday',
    time: '4:30 PM',
    timestamp: Date.now() - 86400000,
    preZone: 'yellow',
    postZone: 'green',
    exercisesDone: ['moro', 'atnr', 'stnr'],
    deckName: 'Tier 1 & 2 Core Deck',
    movementQuality: 'smooth_slow',
    notes: 'Completed all 3 cards with gentle 60 BPM metronome. Good co-regulation.'
  },
  {
    id: 'log-2',
    date: '2 Days Ago',
    time: '5:00 PM',
    timestamp: Date.now() - 86400000 * 2,
    preZone: 'red',
    postZone: 'green',
    exercisesDone: ['fpr', 'moro'],
    deckName: '🆘 Overload State (SOS) Vagal Grounding',
    movementQuality: 'assisted_passive',
    notes: 'Downshifted to passive side cradle & starfish embrace due to meltdown.'
  },
  {
    id: 'log-3',
    date: '3 Days Ago',
    time: '9:15 AM',
    timestamp: Date.now() - 86400000 * 3,
    preZone: 'yellow',
    postZone: 'green',
    exercisesDone: ['moro', 'atnr'],
    deckName: 'Morning Regulation',
    movementQuality: 'smooth_slow',
    notes: 'Great calm start before school bus.'
  }
];

export function getStoredProfiles(): ChildProfile[] {
  if (typeof window === 'undefined') return PRESET_PERSONAS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(PRESET_PERSONAS));
      return PRESET_PERSONAS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : PRESET_PERSONAS;
  } catch {
    return PRESET_PERSONAS;
  }
}

export function saveStoredProfiles(profiles: ChildProfile[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(profiles));
  } catch (e) {
    console.error('Failed to save profiles to localStorage', e);
  }
}

export function getActiveProfile(): ChildProfile {
  const profiles = getStoredProfiles();
  if (typeof window === 'undefined') return profiles[1] || profiles[0];
  try {
    const activeId = localStorage.getItem(STORAGE_KEYS.ACTIVE_PROFILE_ID);
    const found = profiles.find((p) => p.id === activeId);
    return found || profiles[1] || profiles[0];
  } catch {
    return profiles[1] || profiles[0];
  }
}

export function saveActiveProfile(profile: ChildProfile): void {
  if (typeof window === 'undefined') return;
  try {
    const profiles = getStoredProfiles();
    const index = profiles.findIndex((p) => p.id === profile.id);
    let updated: ChildProfile[];
    if (index >= 0) {
      updated = [...profiles];
      updated[index] = profile;
    } else {
      updated = [...profiles, profile];
    }
    saveStoredProfiles(updated);
    localStorage.setItem(STORAGE_KEYS.ACTIVE_PROFILE_ID, profile.id);
  } catch (e) {
    console.error('Failed to save active profile', e);
  }
}

export const getStoredProfile = getActiveProfile;
export const saveStoredProfile = saveActiveProfile;

export function setActiveProfileId(id: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_PROFILE_ID, id);
  } catch (e) {
    console.error('Failed to set active profile id', e);
  }
}

export function getStoredLogs(profileId?: string): RegulationLog[] {
  if (typeof window === 'undefined') return INITIAL_DEMO_LOGS;
  try {
    const id = profileId || getActiveProfile().id;
    const scopedRaw = localStorage.getItem(`${STORAGE_KEYS.LOGS}_${id}`);
    if (scopedRaw) {
      return JSON.parse(scopedRaw);
    }

    // Preset initial logs per persona
    if (id === 'persona_leo') {
      localStorage.setItem(`${STORAGE_KEYS.LOGS}_${id}`, JSON.stringify(INITIAL_DEMO_LOGS));
      return INITIAL_DEMO_LOGS;
    }

    if (id === 'persona_maya') {
      const mayaLogs: RegulationLog[] = [
        {
          id: 'log-maya-1',
          date: 'Yesterday',
          time: '3:30 PM',
          timestamp: Date.now() - 86400000,
          preZone: 'yellow',
          postZone: 'green',
          exercisesDone: ['atnr', 'stnr', 'amphibian'],
          deckName: 'Tier 3 Bilateral Midline Circuit',
          movementQuality: 'smooth_slow',
          notes: 'Great visual tracking with laser pointer game. Maintained prone lizard for 60s.'
        }
      ];
      localStorage.setItem(`${STORAGE_KEYS.LOGS}_${id}`, JSON.stringify(mayaLogs));
      return mayaLogs;
    }

    if (id === 'persona_sam') {
      const samLogs: RegulationLog[] = [
        {
          id: 'log-sam-1',
          date: 'Yesterday',
          time: '11:00 AM',
          timestamp: Date.now() - 86400000,
          preZone: 'red',
          postZone: 'green',
          exercisesDone: ['fpr', 'moro'],
          deckName: '🆘 Overload State (SOS) Vagal Grounding',
          movementQuality: 'assisted_passive',
          notes: 'Passive deep pressure cradle & calcaneal heel cupping. Heart rate lowered visibly.'
        }
      ];
      localStorage.setItem(`${STORAGE_KEYS.LOGS}_${id}`, JSON.stringify(samLogs));
      return samLogs;
    }

    // For custom child profiles, initialize with a clean empty logs array
    const emptyLogs: RegulationLog[] = [];
    localStorage.setItem(`${STORAGE_KEYS.LOGS}_${id}`, JSON.stringify(emptyLogs));
    return emptyLogs;
  } catch {
    return [];
  }
}

export function saveStoredLogs(logs: RegulationLog[], profileId?: string): void {
  if (typeof window === 'undefined') return;
  try {
    const id = profileId || getActiveProfile().id;
    localStorage.setItem(`${STORAGE_KEYS.LOGS}_${id}`, JSON.stringify(logs));
  } catch (e) {
    console.error('Failed to save logs to localStorage', e);
  }
}

export function getStoredScores(profileId?: string): AssessmentScores {
  if (typeof window === 'undefined') return DEFAULT_SCORES;
  try {
    const id = profileId || getActiveProfile().id;
    const scopedRaw = localStorage.getItem(`${STORAGE_KEYS.SCORES}_${id}`);
    if (scopedRaw) {
      return { ...DEFAULT_SCORES, ...JSON.parse(scopedRaw) };
    }

    // Check preset defaults
    if (PRESET_SCORES[id]?.current) {
      const presetScore = PRESET_SCORES[id].current;
      localStorage.setItem(`${STORAGE_KEYS.SCORES}_${id}`, JSON.stringify(presetScore));
      return { ...DEFAULT_SCORES, ...presetScore };
    }

    const raw = localStorage.getItem(STORAGE_KEYS.SCORES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.SCORES, JSON.stringify(DEFAULT_SCORES));
      return DEFAULT_SCORES;
    }
    return { ...DEFAULT_SCORES, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SCORES;
  }
}

export function saveStoredScores(scores: AssessmentScores, profileId?: string): void {
  if (typeof window === 'undefined') return;
  try {
    const id = profileId || getActiveProfile().id;
    localStorage.setItem(`${STORAGE_KEYS.SCORES}_${id}`, JSON.stringify(scores));
    localStorage.setItem(STORAGE_KEYS.SCORES, JSON.stringify(scores));

    // Capture baseline snapshot if not already saved for this profile
    const existingBaseline = localStorage.getItem(`${STORAGE_KEYS.BASELINE_SCORES}_${id}`);
    if (!existingBaseline) {
      localStorage.setItem(`${STORAGE_KEYS.BASELINE_SCORES}_${id}`, JSON.stringify(scores));
    }
  } catch (e) {
    console.error('Failed to save scores to localStorage', e);
  }
}

export function getStoredBaselineScores(profileId?: string): AssessmentScores {
  if (typeof window === 'undefined') return DEFAULT_SCORES;
  try {
    const id = profileId || getActiveProfile().id;
    const scopedRaw = localStorage.getItem(`${STORAGE_KEYS.BASELINE_SCORES}_${id}`);
    if (scopedRaw) {
      return { ...DEFAULT_SCORES, ...JSON.parse(scopedRaw) };
    }
    if (PRESET_SCORES[id]?.baseline) {
      const presetBaseline = PRESET_SCORES[id].baseline;
      localStorage.setItem(`${STORAGE_KEYS.BASELINE_SCORES}_${id}`, JSON.stringify(presetBaseline));
      return { ...DEFAULT_SCORES, ...presetBaseline };
    }
    return getStoredScores(id);
  } catch {
    return DEFAULT_SCORES;
  }
}

export function saveStoredBaselineScores(scores: AssessmentScores, profileId?: string): void {
  if (typeof window === 'undefined') return;
  try {
    const id = profileId || getActiveProfile().id;
    localStorage.setItem(`${STORAGE_KEYS.BASELINE_SCORES}_${id}`, JSON.stringify(scores));
  } catch (e) {
    console.error('Failed to save baseline scores to localStorage', e);
  }
}

export function getStoredSensoryMode(): 'standard' | 'calm_dark' {
  if (typeof window === 'undefined') return 'standard';
  try {
    return (localStorage.getItem(STORAGE_KEYS.SENSORY_MODE) as any) || 'standard';
  } catch {
    return 'standard';
  }
}

export function saveStoredSensoryMode(mode: 'standard' | 'calm_dark'): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.SENSORY_MODE, mode);
  } catch (e) {
    console.error('Failed to save sensory mode to localStorage', e);
  }
}

export function getUserSyncState(): UserSyncState {
  if (typeof window === 'undefined') return { isSignedIn: false };
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SYNC_STATE);
    if (!raw) return { isSignedIn: false };
    return JSON.parse(raw);
  } catch {
    return { isSignedIn: false };
  }
}

export function saveUserSyncState(state: UserSyncState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.SYNC_STATE, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save sync state', e);
  }
}

export function simulateGoogleSignIn(
  email = 'caregiver.ot@gmail.com',
  displayName = 'Caregiver & Pediatric OT (Local Preview)'
): UserSyncState {
  const newState: UserSyncState = {
    isSignedIn: true,
    email,
    displayName,
    lastSyncedAt: Date.now()
  };
  saveUserSyncState(newState);
  return newState;
}

export function simulateSignOut(): void {
  saveUserSyncState({ isSignedIn: false });
}

export function exportBackupJson(): string {
  const activeProf = getActiveProfile();
  const profiles = getStoredProfiles();
  const perChildData: Record<string, any> = {};

  profiles.forEach((p) => {
    perChildData[p.id] = {
      scores: getStoredScores(p.id),
      baselineScores: getStoredBaselineScores(p.id),
      logs: getStoredLogs(p.id)
    };
  });

  const data = {
    version: 3,
    exportedAt: new Date().toISOString(),
    profiles,
    activeProfile: activeProf,
    perChildData,
    scores: getStoredScores(activeProf.id),
    baselineScores: getStoredBaselineScores(activeProf.id),
    logs: getStoredLogs(activeProf.id),
    sensoryMode: getStoredSensoryMode()
  };
  return JSON.stringify(data, null, 2);
}

export function importBackupJson(jsonString: string): boolean {
  try {
    const parsed = JSON.parse(jsonString);
    if (parsed.profiles && Array.isArray(parsed.profiles)) {
      saveStoredProfiles(parsed.profiles);
    }
    if (parsed.activeProfile && parsed.activeProfile.id) {
      saveActiveProfile(parsed.activeProfile);
    }
    if (parsed.perChildData && typeof parsed.perChildData === 'object') {
      Object.entries(parsed.perChildData).forEach(([childId, childData]: [string, any]) => {
        if (childData.scores) saveStoredScores(childData.scores, childId);
        if (childData.baselineScores) saveStoredBaselineScores(childData.baselineScores, childId);
        if (childData.logs) saveStoredLogs(childData.logs, childId);
      });
    }
    if (parsed.scores) {
      saveStoredScores(parsed.scores);
    }
    if (parsed.baselineScores) {
      saveStoredBaselineScores(parsed.baselineScores);
    }
    if (parsed.logs && Array.isArray(parsed.logs)) {
      saveStoredLogs(parsed.logs);
    }
    if (parsed.sensoryMode) {
      saveStoredSensoryMode(parsed.sensoryMode);
    }
    return true;
  } catch (e) {
    console.error('Failed to import backup JSON', e);
    return false;
  }
}

export interface SafetyConsentRecord {
  consented: boolean;
  version: '1.0.0';
  timestamp: number;
  acknowledgedContraindications: boolean;
  acknowledgedNonMedicalNature: boolean;
  acknowledgedParentalAge18Plus: boolean;
}

export function getSafetyConsent(): SafetyConsentRecord | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem('kineticbloom_safety_consent_v1');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveSafetyConsent(record: SafetyConsentRecord): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('kineticbloom_safety_consent_v1', JSON.stringify(record));
  } catch (e) {
    console.error('Failed to save safety consent', e);
  }
}

export function deleteChildProfile(profileId: string): ChildProfile {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(`${STORAGE_KEYS.LOGS}_${profileId}`);
    localStorage.removeItem(`${STORAGE_KEYS.SCORES}_${profileId}`);
    localStorage.removeItem(`${STORAGE_KEYS.BASELINE_SCORES}_${profileId}`);
    const remaining = getStoredProfiles().filter((p) => p.id !== profileId);
    const nextProfiles = remaining.length > 0 ? remaining : PRESET_PERSONAS;
    saveStoredProfiles(nextProfiles);
    localStorage.setItem(STORAGE_KEYS.ACTIVE_PROFILE_ID, nextProfiles[0].id);
    return nextProfiles[0];
  }
  return PRESET_PERSONAS[0];
}

export function clearAllKineticBloomData(): void {
  if (typeof window === 'undefined') return;
  try {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && (k.startsWith('kineticbloom_') || k.startsWith('kinetic_bloom_'))) {
        keysToRemove.push(k);
      }
    }
    keysToRemove.forEach((k) => localStorage.removeItem(k));
  } catch (e) {
    console.error('Failed to clear KineticBloom data', e);
  }
}

/**
 * Calculates real consecutive active days from stored logs.
 */
export function calculateActiveStreak(logs: RegulationLog[]): number {
  if (!logs || logs.length === 0) return 0;

  const days = new Set<string>();
  logs.forEach((log) => {
    if (!log.timestamp) return;
    const d = new Date(log.timestamp);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    days.add(key);
  });

  const now = new Date();
  const formatDay = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

  const todayKey = formatDay(now);
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = formatDay(yesterday);

  // If neither today nor yesterday has activity, active streak is broken (0)
  if (!days.has(todayKey) && !days.has(yesterdayKey)) {
    return 0;
  }

  // Count backwards from whichever recent day has activity
  let checkDate = days.has(todayKey) ? new Date(now) : new Date(yesterday);
  let streak = 0;

  for (let i = 0; i < 365; i++) {
    const key = formatDay(checkDate);
    if (days.has(key)) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}

/**
 * Calculates current program cycle week (Week 1 through 8).
 */
export function calculateProgramWeek(logs: RegulationLog[]): number {
  if (!logs || logs.length === 0) return 1;
  const timestamps = logs
    .map((l) => l.timestamp || 0)
    .filter((t) => t > 0);

  if (timestamps.length === 0) return 1;
  const earliest = Math.min(...timestamps);
  const diffDays = Math.floor((Date.now() - earliest) / (1000 * 60 * 60 * 24));
  const weekNum = Math.floor(diffDays / 7) + 1;
  return Math.min(Math.max(weekNum, 1), 8);
}

/**
 * Generates an individualized 3-reflex deck prioritized from the screener.
 * Respects the clinical rule: Tier 1 > Tier 2 > Tier 3 > Tier 4.
 * Fixes bug where Tier 4 Grade 3 pushed Tier 1 Grade 2 out of the deck.
 */
export function generateRecommendedDeck(
  scores: AssessmentScores,
  preZone: RegulationZone
): { reflexes: ReflexId[]; name: string; desc: string; reason: string } {
  // If child is in RED ZONE meltdown, do NOT demand active motor planning
  if (preZone === 'red') {
    return {
      reflexes: ['fpr', 'moro', 'tlr'],
      name: '🆘 Overload State (SOS) Vagal Grounding',
      desc: 'Passive Somatic Pressure + Fetal Embrace + Grounded Breathing. No active motor demands.',
      reason: 'Child is overwhelmed in sympathetic fight-or-flight. Tier 1 passive calming downregulates brainstem arousal.'
    };
  }

  // Tier mappings for brainstem-to-cortex hierarchy
  const tierOf: Record<ReflexId, number> = {
    fpr: 1,
    moro: 1,
    tlr: 2,
    landau: 2,
    spinal_galant: 2,
    amphibian: 3,
    atnr: 3,
    stnr: 3,
    palmar: 4,
    plantar_babinski: 4,
    rooting: 4
  };

  const allReflexes: ReflexId[] = [
    'fpr',
    'moro',
    'tlr',
    'landau',
    'spinal_galant',
    'amphibian',
    'atnr',
    'stnr',
    'palmar',
    'plantar_babinski',
    'rooting'
  ];

  // Clinical Rule Sorting:
  // 1. Significant retention (score >= 2) beats mild/integrated (score <= 1)
  // 2. Among significant retentions, strictly enforce Brainstem-to-Cortex Tier Hierarchy (Tier 1 -> 2 -> 3 -> 4)
  // 3. Within the same Tier, prioritize the higher severity score
  const sorted = [...allReflexes].sort((a, b) => {
    const scoreA = scores[a] ?? 0;
    const scoreB = scores[b] ?? 0;
    const sigA = scoreA >= 2 ? 1 : 0;
    const sigB = scoreB >= 2 ? 1 : 0;

    if (sigB !== sigA) {
      return sigB - sigA;
    }
    if (tierOf[a] !== tierOf[b]) {
      return tierOf[a] - tierOf[b];
    }
    return scoreB - scoreA;
  });

  const selected = sorted.slice(0, 3);

  return {
    reflexes: selected,
    name: '🎯 Recommended from Screener',
    desc: `Targeting your child's highest neurological retention priority (${selected.map((r) => r.toUpperCase()).join(', ')}).`,
    reason: `Prioritizes foundational brainstem safety and postural bridges before higher-level motor coordination.`
  };
}

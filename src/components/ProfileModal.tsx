import { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  Plus,
  Download,
  Upload,
  Check,
  LogOut,
  Trash2,
  AlertTriangle
} from 'lucide-react';
import type {
  ChildProfile,
  SupportNeedLevel,
  SensoryModulationProfile,
  MuscleToneProfile,
  CuePreference,
  UserSyncState
} from '../types';
import {
  getStoredProfiles,
  saveStoredProfiles,
  saveActiveProfile,
  setActiveProfileId,
  PRESET_PERSONAS,
  simulateSignOut,
  getUserSyncState,
  exportBackupJson,
  importBackupJson,
  deleteChildProfile,
  clearAllKineticBloomData
} from '../utils/storage';

interface ProfileModalProps {
  currentProfile: ChildProfile;
  isOpen: boolean;
  onClose: () => void;
  onProfileUpdated: (updatedProfile: ChildProfile) => void;
  onSensoryModeChange?: (mode: 'standard' | 'calm_dark') => void;
}

export const ProfileModal = ({
  currentProfile,
  isOpen,
  onClose,
  onProfileUpdated,
  onSensoryModeChange
}: ProfileModalProps) => {
  const [profiles, setProfiles] = useState<ChildProfile[]>(() => getStoredProfiles());
  const [activeId, setActiveId] = useState<string>(currentProfile.id);

  // Form state
  const [name, setName] = useState(currentProfile.name);
  const [avatarEmoji, setAvatarEmoji] = useState(currentProfile.avatarEmoji || '🌱');
  const [supportNeed, setSupportNeed] = useState<SupportNeedLevel>(
    currentProfile.supportNeed ||
      (currentProfile.supportLevel === 'level3'
        ? 'extensive_hands_on'
        : currentProfile.supportLevel === 'level1'
        ? 'independent_verbal'
        : 'moderate_scaffolding')
  );
  const [sensoryProfile, setSensoryProfile] = useState<SensoryModulationProfile>(
    currentProfile.sensoryProfile || 'mixed_fluctuating'
  );
  const [muscleTone, setMuscleTone] = useState<MuscleToneProfile>(
    currentProfile.muscleTone || 'typical_variable'
  );
  const [preferredReward, setPreferredReward] = useState(
    currentProfile.preferredReward || 'Lego Space Station Break'
  );
  const [cuePreference, setCuePreference] = useState<CuePreference>(
    currentProfile.cuePreference ||
      (currentProfile.supportLevel === 'level3'
        ? 'hands_free_audio'
        : currentProfile.supportLevel === 'level2'
        ? 'literal_clear'
        : 'imaginative_story')
  );

  // Auth & Cloud state
  const [userSync, setUserSync] = useState<UserSyncState>(() => getUserSyncState());
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSelectProfile = (p: ChildProfile) => {
    setActiveId(p.id);
    setName(p.name);
    setAvatarEmoji(p.avatarEmoji || '🌱');
    setSupportNeed(
      p.supportNeed ||
        (p.supportLevel === 'level3'
          ? 'extensive_hands_on'
          : p.supportLevel === 'level1'
          ? 'independent_verbal'
          : 'moderate_scaffolding')
    );
    setSensoryProfile(p.sensoryProfile || 'mixed_fluctuating');
    setMuscleTone(p.muscleTone || 'typical_variable');
    setCuePreference(
      p.cuePreference ||
        (p.supportLevel === 'level3'
          ? 'hands_free_audio'
          : p.supportLevel === 'level2'
          ? 'literal_clear'
          : 'imaginative_story')
    );
    setPreferredReward(p.preferredReward || 'Favorite Sensory Break');
    setActiveProfileId(p.id);
    onProfileUpdated(p);
  };

  const handleDeleteCurrentProfile = () => {
    const next = deleteChildProfile(activeId);
    setProfiles(getStoredProfiles());
    handleSelectProfile(next);
    setShowDeleteConfirm(false);
  };

  const handleFactoryReset = () => {
    clearAllKineticBloomData();
    window.location.reload();
  };

  if (!isOpen) return null;

  const handleLoadPreset = (preset: ChildProfile) => {
    const exists = profiles.some((p) => p.id === preset.id);
    let updatedProfiles: ChildProfile[];
    if (exists) {
      updatedProfiles = profiles.map((p) => (p.id === preset.id ? { ...preset } : p));
    } else {
      updatedProfiles = [...profiles, { ...preset }];
    }
    setProfiles(updatedProfiles);
    saveStoredProfiles(updatedProfiles);
    saveActiveProfile(preset);
    handleSelectProfile(preset);
    if (preset.sensoryProfile === 'sensory_defensive' && onSensoryModeChange) {
      onSensoryModeChange('calm_dark');
    }
  };

  const handleAddNewChild = () => {
    const newId = `child_${Date.now()}`;
    const newProfile: ChildProfile = {
      id: newId,
      name: 'New Child',
      avatarEmoji: '⭐',
      supportNeed: 'moderate_scaffolding',
      supportLevel: 'level2',
      sensoryProfile: 'mixed_fluctuating',
      muscleTone: 'typical_variable',
      cuePreference: 'literal_clear',
      preferredReward: 'Sensory Trampoline Break',
      targetStreak: 14
    };
    const updated = [...profiles, newProfile];
    setProfiles(updated);
    saveStoredProfiles(updated);
    handleSelectProfile(newProfile);
  };

  const handleSave = () => {
    const supportLevel =
      supportNeed === 'extensive_hands_on'
        ? 'level3'
        : supportNeed === 'independent_verbal'
        ? 'level1'
        : 'level2';

    const updated: ChildProfile = {
      id: activeId,
      name: name.trim() || 'My Child',
      avatarEmoji,
      supportNeed,
      supportLevel,
      sensoryProfile,
      muscleTone,
      cuePreference,
      preferredReward: preferredReward.trim() || 'Favorite Break',
      targetStreak: 14
    };

    saveActiveProfile(updated);
    onProfileUpdated(updated);

    // If child is sensory defensive, suggest Calm Dark Mode
    if (sensoryProfile === 'sensory_defensive' && onSensoryModeChange) {
      onSensoryModeChange('calm_dark');
    }

    onClose();
  };

  const handleGoogleSignOut = () => {
    simulateSignOut();
    setUserSync({ isSignedIn: false });
  };

  const handleExport = () => {
    const jsonStr = exportBackupJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kineticbloom_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importBackupJson(content);
      if (success) {
        setImportStatus('Backup restored successfully! Refreshing...');
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      } else {
        setImportStatus('Invalid JSON backup file.');
      }
    };
    reader.readAsText(file);
  };

  const quickRewardChips = [
    '🧱 Lego Break',
    '🤸 10m Trampoline Jump',
    '🍓 Favorite Snack',
    '🫧 Giant Bubbles',
    '📖 Story Time',
    '📱 10m iPad Free Time',
    '🎨 Sensory Drawing'
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="profile-modal-title">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-7 space-y-6 shadow-2xl relative my-8 border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-xl border border-teal-100">
              {avatarEmoji}
            </div>
            <div>
              <h3 id="profile-modal-title" className="font-extrabold text-lg text-slate-900">
                Child Neuro-Sensory Profile & Cloud Sync
              </h3>
              <p className="text-xs text-slate-500">
                Functional customization without medical demographics or sensitive PII
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Zero-PII Privacy Assurance Callout */}
        <div className="p-3 bg-teal-50 border border-teal-200 rounded-2xl flex items-start gap-2.5 text-xs text-teal-900">
          <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>🔒 100% Private & Zero-PII:</strong> Use a first-name nickname, initial, or superhero alias (e.g., "Maya", "Sam", or "Captain Tiger"). We never ask for full legal names, dates of birth, or formal medical records.
          </p>
        </div>

        {/* Profile Switcher & Multi-Child Tabs */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>Select or Switch Child:</span>
            <button
              onClick={handleAddNewChild}
              className="text-teal-600 hover:text-teal-700 font-semibold flex items-center gap-1 cursor-pointer normal-case"
            >
              <Plus className="w-3.5 h-3.5" /> Add Sibling / Profile
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {profiles.map((p) => {
              const isSelected = p.id === activeId;
              return (
                <button
                  key={p.id}
                  onClick={() => handleSelectProfile(p)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>{p.avatarEmoji || '🌱'}</span>
                  <span>{p.name}</span>
                  {isSelected && <Check className="w-3 h-3 text-white" />}
                </button>
              );
            })}
          </div>

          {/* 1-Click Persona Pre-fills */}
          <div className="pt-1 flex items-center gap-1.5 text-[11px] text-slate-500 overflow-x-auto">
            <span className="font-semibold text-slate-400 shrink-0">Sample Personas:</span>
            {PRESET_PERSONAS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleLoadPreset(preset)}
                className="px-2 py-0.5 rounded-lg bg-slate-50 hover:bg-teal-50 hover:text-teal-800 border border-slate-200 text-slate-600 shrink-0 cursor-pointer transition-all"
                title={`Load ${preset.name}'s profile (${preset.supportLevel})`}
              >
                {preset.avatarEmoji} {preset.name} ({preset.supportLevel?.toUpperCase()})
              </button>
            ))}
          </div>
        </div>

        {/* Form Body: 6 Functional Neuro-Sensory Fields */}
        <div className="space-y-4 pt-2 border-t border-slate-100 text-xs">
          {/* Row 1: Nickname & Avatar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2 space-y-1">
              <label htmlFor="child-alias-input" className="font-bold text-slate-700">Child Nickname / Superhero Alias:</label>
              <input
                id="child-alias-input"
                type="text"
                maxLength={20}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Maya, Sam, Tiger"
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
              />
              {(name.includes(' ') || name.includes('/')) && (
                <p className="text-[10px] text-amber-700 font-medium">
                  For your child's privacy, please enter a single first nickname or superhero alias only—no full names or birthdates.
                </p>
              )}
            </div>
            <div className="space-y-1">
              <label className="font-bold text-slate-700">Avatar Emoji:</label>
              <div className="flex gap-1 overflow-x-auto p-1 bg-slate-50 rounded-xl border border-slate-200">
                {['🌱', '🚀', '🧩', '🧸', '🦖', '🦄', '🦁', '🐬'].map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setAvatarEmoji(emoji)}
                    className={`p-1.5 text-base rounded-lg transition-all cursor-pointer ${
                      avatarEmoji === emoji ? 'bg-white shadow-xs scale-110' : 'hover:bg-slate-200'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2: Neurodevelopmental Support Need Level */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 flex items-center justify-between">
              <span>Support & Motor Planning Level:</span>
              <span className="text-[10px] text-teal-700 font-semibold">Adapts exercise instructions automatically</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                {
                  id: 'independent_verbal',
                  title: 'Level 1: Verbal / Independent',
                  desc: 'Follows multi-step verbal cues. Enjoys active play stories.'
                },
                {
                  id: 'moderate_scaffolding',
                  title: 'Level 2: Routine & Visual',
                  desc: 'Relies on First–Then visual schedule, timers & transition buffers.'
                },
                {
                  id: 'extensive_hands_on',
                  title: 'Level 3: Assisted / Non-Speaking',
                  desc: 'Severe apraxia or sensory freeze. Defaults drills to 🤝 Passive Repatterning!'
                }
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSupportNeed(opt.id as SupportNeedLevel)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    supportNeed === opt.id
                      ? 'border-teal-600 bg-teal-50/50 ring-2 ring-teal-200 font-semibold'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <div className="font-bold text-slate-900">{opt.title}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5 leading-tight">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Row 3: Sensory Modulation Profile */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700">Sensory Modulation Profile:</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'sensory_seeking', label: 'Sensory Seeker', tip: 'Prompts 90s Heavy Work' },
                { id: 'sensory_defensive', label: 'Sensory Avoider', tip: 'Enables Calm Dark Mode' },
                { id: 'sensory_under_responsive', label: 'Under-Responsive', tip: 'Rhythmic auditory cue' },
                { id: 'mixed_fluctuating', label: 'Mixed / Variable', tip: 'Adapts by time of day' }
              ].map((sp) => (
                <button
                  key={sp.id}
                  type="button"
                  onClick={() => setSensoryProfile(sp.id as SensoryModulationProfile)}
                  className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                    sensoryProfile === sp.id
                      ? 'border-purple-600 bg-purple-50 ring-2 ring-purple-200 text-purple-900 font-bold'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <div className="font-bold">{sp.label}</div>
                  <div className="text-[10px] opacity-75">{sp.tip}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Row 4: Baseline Postural Muscle Tone */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700">Baseline Postural Muscle Tone:</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'hypotonic', label: 'Hypotonic (Low Tone)', tip: 'Adds bolster & 3s hold cues' },
                { id: 'hypertonic_tense', label: 'Hypertonic (Stiff)', tip: 'Focuses on long exhalations' },
                { id: 'typical_variable', label: 'Typical Tone', tip: 'Standard 5s holds' }
              ].map((mt) => (
                <button
                  key={mt.id}
                  type="button"
                  onClick={() => setMuscleTone(mt.id as MuscleToneProfile)}
                  className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                    muscleTone === mt.id
                      ? 'border-amber-600 bg-amber-50 ring-2 ring-amber-200 text-amber-900 font-bold'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <div className="font-bold">{mt.label}</div>
                  <div className="text-[10px] opacity-75">{mt.tip}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Row 4b: Parent Coaching & Instruction Style */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700">Parent Coaching & Instruction Style:</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: 'imaginative_story', label: 'Imaginative & Playful', tip: 'Story scripts (Starfish, Lizard, Airplane)' },
                { id: 'literal_clear', label: 'Literal & Concrete (ASD L2)', tip: 'Exact anatomical cues ("Right elbow 90°")' },
                { id: 'hands_free_audio', label: 'Hands-Free Visual & Token', tip: 'Audio chime + 1➔2➔3 PECS tokens' }
              ].map((cp) => (
                <button
                  key={cp.id}
                  type="button"
                  onClick={() => setCuePreference(cp.id as CuePreference)}
                  className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                    cuePreference === cp.id
                      ? 'border-indigo-600 bg-indigo-50 ring-2 ring-indigo-200 text-indigo-900 font-bold'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <div className="font-bold">{cp.label}</div>
                  <div className="text-[10px] opacity-75">{cp.tip}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Row 5: Preferred Reward for First–Then Board */}
          <div className="space-y-1.5">
            <label htmlFor="preferred-reward-input" className="font-bold text-slate-700">Preferred "First–Then" Reward Activity:</label>
            <input
              id="preferred-reward-input"
              aria-label="Preferred reward or motivator"
              type="text"
              value={preferredReward}
              onChange={(e) => setPreferredReward(e.target.value)}
              placeholder="e.g. Lego Space Station Break, 10m Trampoline"
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
            />
            <div className="flex flex-wrap gap-1.5 pt-1">
              {quickRewardChips.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => setPreferredReward(chip)}
                  className="px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-medium transition-all cursor-pointer"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Offline Backup & Privacy Storage Section */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-slate-800">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>100% Private Offline Storage & Backup</span>
            </div>
            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
              <Check className="w-3 h-3 text-emerald-600" /> Zero Cloud Dependency (Zero-PII)
            </span>
          </div>

          <p className="text-[11px] text-slate-600 leading-relaxed">
            All movement observations, session logs, custom routines, and child profiles are stored exclusively on this device. KineticBloom never transmits personal data to external servers, protecting your family’s privacy without requiring account creation.
          </p>

          {/* Offline JSON Export/Import buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              type="button"
              onClick={handleExport}
              className="px-3.5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl flex items-center gap-2 transition-all shadow-xs cursor-pointer"
              title="Download your profiles, scores, and logs as a portable JSON file"
            >
              <Download className="w-4 h-4" /> Export Backup (.json)
            </button>

            <label className="px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-800 font-bold rounded-xl border border-slate-300 flex items-center gap-2 transition-all shadow-2xs cursor-pointer">
              <Upload className="w-4 h-4 text-slate-600" /> Import Backup (.json)
              <input type="file" accept=".json" onChange={handleFileImport} className="hidden" />
            </label>

            {userSync.isSignedIn && (
              <button
                type="button"
                onClick={handleGoogleSignOut}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" /> Clear Preview Account
              </button>
            )}
          </div>

          <div className="p-2.5 bg-amber-50/70 border border-amber-200/80 rounded-xl space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-[11px] text-amber-900">
              <span>💡 Moving to a new iPad or phone, or sharing with your pediatric OT?</span>
            </div>
            <p className="text-[10px] text-amber-800 leading-relaxed">
              Click <strong>Export Backup</strong> to save your progress file to your device, iCloud, or Google Drive. On another device, click <strong>Import Backup</strong> to resume right where you left off.
            </p>
          </div>

          {importStatus && (
            <p className="text-[11px] font-semibold text-teal-700 bg-teal-50 p-2 rounded-lg border border-teal-200">
              {importStatus}
            </p>
          )}
        </div>

        {/* Danger Zone: Data Erasure & Privacy Reset */}
        <div className="p-4 bg-rose-50/70 border border-rose-200 rounded-2xl space-y-3">
          <div className="flex items-center gap-2 text-rose-800 font-bold text-xs">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>Data Erasure & Reset (COPPA / FTC Right to Erasure)</span>
          </div>
          <p className="text-[11px] text-rose-900/80 leading-relaxed">
            You have full control over your child's data. You can delete the active profile or completely wipe all local storage data from this device at any time.
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {showDeleteConfirm ? (
              <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-rose-300">
                <span className="text-[11px] text-rose-700 font-bold">Delete "{name}"?</span>
                <button
                  type="button"
                  onClick={handleDeleteCurrentProfile}
                  className="px-2.5 py-1 bg-rose-600 text-white rounded-lg text-xs font-bold hover:bg-rose-700 cursor-pointer"
                >
                  Confirm Delete
                </button>
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-2 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs hover:bg-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(true)}
                className="px-3 py-1.5 bg-white hover:bg-rose-100 text-rose-700 border border-rose-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5 text-rose-600" /> Delete This Profile
              </button>
            )}

            {showResetConfirm ? (
              <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-rose-400">
                <span className="text-[11px] text-rose-800 font-bold">Wipe ALL data & reset app?</span>
                <button
                  type="button"
                  onClick={handleFactoryReset}
                  className="px-2.5 py-1 bg-rose-700 text-white rounded-lg text-xs font-bold hover:bg-rose-800 cursor-pointer"
                >
                  Yes, Factory Reset
                </button>
                <button
                  type="button"
                  onClick={() => setShowResetConfirm(false)}
                  className="px-2 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs hover:bg-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowResetConfirm(true)}
                className="px-3 py-1.5 bg-rose-100 hover:bg-rose-200 text-rose-800 border border-rose-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5 text-rose-700" /> Erase All Local Data & Factory Reset
              </button>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex gap-3 pt-2 border-t border-slate-100">
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs sm:text-sm cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Check className="w-4 h-4" /> Save Profile & Adapt Coaching
          </button>
        </div>
      </div>
    </div>
  );
};

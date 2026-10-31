import { useState, useEffect, lazy, Suspense } from 'react';
import {
  PlayCircle,
  ClipboardList,
  BookOpen,
  BarChart3,
  Shield,
  Bookmark,
  Moon,
  Sun,
  Loader2
} from 'lucide-react';
import { SafetyConsentModal } from './components/SafetyConsentModal';
import { ProfileModal } from './components/ProfileModal';
import { ClinicalErrorBoundary } from './components/ClinicalErrorBoundary';
import {
  getStoredLogs,
  saveStoredLogs,
  getStoredScores,
  saveStoredScores,
  getStoredProfile,
  saveStoredProfile,
  getStoredSensoryMode,
  saveStoredSensoryMode,
  getSafetyConsent
} from './utils/storage';
import type { RegulationLog, RegulationZone, ReflexId, AssessmentScores, ChildProfile, MovementQuality } from './types';

// Lazy-loaded routes for code-splitting and rapid initial load
const CircuitRunner = lazy(() =>
  import('./components/CircuitRunner').then((m) => ({ default: m.CircuitRunner }))
);
const AssessmentWizard = lazy(() =>
  import('./components/AssessmentWizard').then((m) => ({ default: m.AssessmentWizard }))
);
const ReflexLibrary = lazy(() =>
  import('./components/ReflexLibrary').then((m) => ({ default: m.ReflexLibrary }))
);
const OfflineReferences = lazy(() =>
  import('./components/OfflineReferences').then((m) => ({ default: m.OfflineReferences }))
);
const ProgressDashboard = lazy(() =>
  import('./components/ProgressDashboard').then((m) => ({ default: m.ProgressDashboard }))
);

const ONBOARDING_DISMISSED_KEY = 'kineticbloom_onboarding_dismissed_v1';

export function App() {
  // Deep-linking URL tab sync
  const getInitialTab = (): 'circuit' | 'assessment' | 'library' | 'books' | 'progress' => {
    try {
      const paramTab = new URLSearchParams(window.location.search).get('tab');
      if (paramTab && ['circuit', 'assessment', 'library', 'books', 'progress'].includes(paramTab)) {
        return paramTab as any;
      }
    } catch {
      // fallback
    }
    return 'circuit';
  };

  const [activeTab, setActiveTab] = useState<'circuit' | 'assessment' | 'library' | 'books' | 'progress'>(getInitialTab);

  // Safety & Medical Precaution Attestation Gate
  const [hasSafetyConsent, setHasSafetyConsent] = useState<boolean>(() => {
    return getSafetyConsent()?.consented ?? false;
  });
  const [isSafetyModalOpen, setIsSafetyModalOpen] = useState(false);

  // Persistent storage hooks
  const [logs, setLogs] = useState<RegulationLog[]>(() => getStoredLogs());
  const [scores, setScores] = useState<AssessmentScores>(() => getStoredScores());
  const [childProfile, setChildProfile] = useState<ChildProfile>(() => getStoredProfile());
  const [sensoryMode, setSensoryMode] = useState<'standard' | 'calm_dark'>(() => getStoredSensoryMode());
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(() => {
    try {
      return localStorage.getItem(ONBOARDING_DISMISSED_KEY) !== 'true';
    } catch {
      return true;
    }
  });

  // Keep URL in sync with tab switches and browser forward/backward buttons
  const navigateToTab = (tab: 'circuit' | 'assessment' | 'library' | 'books' | 'progress') => {
    setActiveTab(tab);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', tab);
      window.history.pushState({ tab }, '', url.toString());
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const paramTab = new URLSearchParams(window.location.search).get('tab');
      if (paramTab && ['circuit', 'assessment', 'library', 'books', 'progress'].includes(paramTab)) {
        setActiveTab(paramTab as any);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleDismissOnboarding = () => {
    setShowOnboarding(false);
    try {
      localStorage.setItem(ONBOARDING_DISMISSED_KEY, 'true');
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    saveStoredLogs(logs, childProfile.id);
  }, [logs, childProfile.id]);

  useEffect(() => {
    saveStoredScores(scores, childProfile.id);
  }, [scores, childProfile.id]);

  useEffect(() => {
    saveStoredProfile(childProfile);
  }, [childProfile]);

  useEffect(() => {
    saveStoredSensoryMode(sensoryMode);
  }, [sensoryMode]);

  const handleSessionComplete = (
    preZone: RegulationZone,
    postZone: RegulationZone,
    completedExercises: ReflexId[],
    details?: {
      movementQuality?: MovementQuality;
      compensationsObserved?: string[];
      deckName?: string;
      notes?: string;
    }
  ) => {
    const newLog: RegulationLog = {
      id: Date.now().toString(),
      date: 'Today',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: Date.now(),
      preZone,
      postZone,
      exercisesDone: completedExercises,
      deckName: details?.deckName,
      movementQuality: details?.movementQuality || 'smooth_slow',
      compensationsObserved: details?.compensationsObserved || [],
      notes: details?.notes
    };
    setLogs((prev) => [newLog, ...prev]);
  };

  const handleAssessmentFinish = (newScores: AssessmentScores) => {
    setScores(newScores);
  };

  const toggleSensoryMode = () => {
    setSensoryMode((prev) => (prev === 'standard' ? 'calm_dark' : 'standard'));
  };

  const isDark = sensoryMode === 'calm_dark';

  return (
    <ClinicalErrorBoundary>
      <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${isDark ? 'calm-dark-mode bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
        {/* First-Launch Safety & Contraindication Gate */}
        <SafetyConsentModal
          isOpen={!hasSafetyConsent || isSafetyModalOpen}
          onConsent={() => {
            setHasSafetyConsent(true);
            setIsSafetyModalOpen(false);
          }}
        />

        {/* Top Header / Navigation */}
        <header className={`border-b sticky top-0 z-40 transition-colors ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                🌱
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-extrabold text-base sm:text-lg leading-tight">
                    KineticBloom
                  </h1>
                  {/* Interactive Child Profile Switcher & Sync Badge */}
                  <button
                    onClick={() => setIsProfileModalOpen(true)}
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border transition-all cursor-pointer shadow-2xs ${
                      isDark
                        ? 'bg-slate-700/80 text-teal-300 border-slate-600 hover:bg-slate-700'
                        : 'bg-teal-50 text-teal-800 border-teal-200 hover:bg-teal-100/80'
                    }`}
                    title="Zero-PII Child Profile & Local Storage Sync"
                  >
                    <span className="text-sm leading-none">{childProfile.avatarEmoji || '🌱'}</span>
                    <span className="font-bold">{childProfile.name}</span>
                    <span className="text-[10px] opacity-75 hidden sm:inline">
                      ({childProfile.supportNeed === 'extensive_hands_on' || childProfile.supportLevel === 'level3'
                        ? 'Hands-On Co-Reg'
                        : childProfile.supportNeed === 'independent_verbal' || childProfile.supportLevel === 'level1'
                        ? 'Independent'
                        : 'Visual Guided'})
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" title="Local-First Synced" />
                  </button>
                </div>
                <p className="text-[10px] sm:text-xs text-slate-500 font-medium">
                  10-Minute Home Movement & Co-Regulation Companion
                </p>
              </div>
            </div>

            {/* Right Action: Sensory Mode & Navigation */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Sensory Theme Mode Toggle */}
              <button
                onClick={toggleSensoryMode}
                className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isDark
                    ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
                title={isDark ? 'Switch to Standard Light Mode' : 'Switch to Low-Stim Calm Dark Mode (Bedtime / Sensory Safe)'}
              >
                {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-500" />}
                <span className="hidden lg:inline">{isDark ? 'Calm Dark' : 'Standard'}</span>
              </button>

              {/* Tab Navigation */}
              <nav className="flex items-center gap-1 sm:gap-1.5" aria-label="Main Navigation">
                {[
                  { id: 'circuit', label: '10-Min Circuit', shortLabel: 'Circuit', icon: PlayCircle },
                  { id: 'assessment', label: 'Movement Guide', shortLabel: 'Guide', icon: ClipboardList },
                  { id: 'library', label: 'Handbook', shortLabel: 'Handbook', icon: BookOpen },
                  { id: 'books', label: 'Books', shortLabel: 'Books', icon: Bookmark },
                  { id: 'progress', label: 'Progress', shortLabel: 'Progress', icon: BarChart3 }
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => navigateToTab(tab.id as any)}
                      className={`px-2 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                        isActive
                          ? isDark
                            ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-xs'
                            : 'bg-teal-50 text-teal-700 shadow-xs border border-teal-100'
                          : isDark
                          ? 'text-slate-400 hover:text-slate-100 hover:bg-slate-700'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-teal-500' : 'opacity-60'}`} />
                      <span className="hidden md:inline">{tab.label}</span>
                      <span className="inline md:hidden text-[11px]">{tab.shortLabel}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 lg:p-8">
          {/* Living-Room Guided Onboarding Banner */}
          {showOnboarding && (
            <div className="mb-6 p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-teal-50 via-indigo-50 to-purple-50 border border-teal-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-base">🚀</span>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                    Welcome to KineticBloom! 3-Step Guided Quick Start:
                  </h3>
                </div>
                <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
                  <strong>1. Profile:</strong> Set your child's sensory profile & support level. • <strong>2. Movement Guide:</strong> Complete the 5-minute 11-reflex movement observation. • <strong>3. Daily Circuit:</strong> Run your personalized 10-minute brainstem routine!
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <button
                  onClick={() => setIsProfileModalOpen(true)}
                  className="px-3 py-1.5 bg-white text-teal-800 border border-teal-200 hover:bg-teal-50 text-xs font-bold rounded-xl transition-all cursor-pointer shadow-2xs"
                >
                  1. Edit Profile
                </button>
                <button
                  onClick={() => navigateToTab('assessment')}
                  className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-xs"
                >
                  2. Movement Guide
                </button>
                <button
                  onClick={handleDismissOnboarding}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer text-xs font-semibold"
                  title="Dismiss Guide"
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          <Suspense
            fallback={
              <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3 text-slate-400 py-12">
                <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
                <span className="text-xs font-medium">Loading component...</span>
              </div>
            }
          >
            {activeTab === 'circuit' && (
              <CircuitRunner
                key={childProfile.id}
                onSessionComplete={handleSessionComplete}
                scores={scores}
                sensoryMode={sensoryMode}
                childProfile={childProfile}
              />
            )}
            {activeTab === 'assessment' && (
              <AssessmentWizard
                key={childProfile.id}
                onAssessmentFinish={handleAssessmentFinish}
                initialScores={scores}
                onStartPersonalizedCircuit={() => navigateToTab('circuit')}
              />
            )}
            {activeTab === 'library' && (
              <ReflexLibrary onNavigateToBooks={() => navigateToTab('books')} />
            )}
            {activeTab === 'books' && <OfflineReferences />}
            {activeTab === 'progress' && (
              <ProgressDashboard
                key={childProfile.id}
                logs={logs}
                childProfile={childProfile}
                onStartNewCircuit={() => navigateToTab('circuit')}
                onNavigateToScreener={() => navigateToTab('assessment')}
              />
            )}
          </Suspense>
        </main>

        {/* Footer & Medical / Trademark Disclaimer */}
        <footer className={`border-t mt-auto py-6 px-4 text-center text-xs space-y-3 transition-colors ${isDark ? 'bg-slate-800 border-slate-700 text-slate-400' : 'bg-white border-slate-200 text-slate-500'}`}>
          <div className="flex items-center justify-center gap-2.5 font-medium flex-wrap">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-teal-600" /> Educational & Developmental Wellness Companion
            </span>
            <span>•</span>
            <button
              type="button"
              onClick={() => setIsSafetyModalOpen(true)}
              className="text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 font-semibold underline cursor-pointer"
            >
              Safety & Contraindications Notice
            </button>
          </div>
          <p className="max-w-xl mx-auto text-[11px] opacity-75">
            KineticBloom is designed for parent home movement enrichment and primitive reflex co-regulation. It does not provide medical diagnosis or substitute for professional pediatric occupational therapy.
          </p>
          <div className="border-t border-slate-200/60 dark:border-slate-700/60 pt-3 max-w-2xl mx-auto text-[10px] text-slate-400 space-y-1">
            <p>
              <strong>Intellectual Property & Non-Affiliation Notice:</strong> KineticBloom is an independent developmental wellness web application. "The Zones of Regulation®" is a registered trademark of Think Social Publishing, Inc. "MNRI®" is a registered trademark of Svetlana Masgutova Educational Institute. "Harkla®" is a registered trademark of Harkla LLC. "INPP" refers to the Institute for Neuro-Physiological Psychology. "RMTi® / BRMT" refers to Rhythmic Movement Training International / Blomberg Rhythmic Movement Training. All referenced third-party trademarks and educational video demonstrations belong to their respective owners and are referenced under nominative fair use for parent educational guidance without sponsorship or endorsement.
            </p>
            <p>
              <strong>Informational Boundary:</strong> KineticBloom provides movement observation and sensory wellness activities. It is not an FDA-cleared Software as a Medical Device (SaMD) and does not provide clinical diagnoses, medical advice, or replace formal treatment by a licensed physician or occupational therapist.
            </p>
          </div>
        </footer>

        {/* Profile & Child Management Modal */}
        {isProfileModalOpen && (
          <ProfileModal
            isOpen={isProfileModalOpen}
            onClose={() => setIsProfileModalOpen(false)}
            currentProfile={childProfile}
            onProfileUpdated={(updatedProfile) => {
              setChildProfile(updatedProfile);
              setScores(getStoredScores(updatedProfile.id));
              setLogs(getStoredLogs(updatedProfile.id));
            }}
            onSensoryModeChange={(newMode) => {
              setSensoryMode(newMode);
            }}
          />
        )}
      </div>
    </ClinicalErrorBoundary>
  );
}

export default App;

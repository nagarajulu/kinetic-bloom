import { useState, useEffect } from 'react';
import {
  ClipboardCheck,
  AlertTriangle,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Printer,
  Video,
  X,
  Check,
  Sparkles,
  PlayCircle,
  HelpCircle,
  LayoutGrid,
  CheckCircle2,
  ListOrdered
} from 'lucide-react';
import { REFLEX_DATABASE } from '../data/reflexData';
import { PrivacyVideoPlayer } from './PrivacyVideoPlayer';
import type { ReflexId, AssessmentScores, LateralizedScore } from '../types';

interface AssessmentWizardProps {
  onAssessmentFinish: (scores: AssessmentScores) => void;
  initialScores?: AssessmentScores;
  onStartPersonalizedCircuit?: () => void;
}

const REFLEX_SHORT_NAMES: Record<ReflexId, string> = {
  fpr: 'FPR',
  moro: 'Moro',
  tlr: 'TLR',
  landau: 'Landau',
  spinal_galant: 'Galant',
  amphibian: 'Amphibian',
  atnr: 'ATNR',
  stnr: 'STNR',
  palmar: 'Palmar',
  plantar_babinski: 'Plantar',
  rooting: 'Rooting'
};

const LATERALIZED_REFLEXES: ReflexId[] = ['atnr', 'spinal_galant', 'palmar', 'plantar_babinski'];

const ALL_REFLEX_KEYS: ReflexId[] = [
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

export const AssessmentWizard = ({
  onAssessmentFinish,
  initialScores,
  onStartPersonalizedCircuit
}: AssessmentWizardProps) => {
  const allReflexKeys = ALL_REFLEX_KEYS;

  const [currentIndex, setCurrentIndex] = useState(() => {
    try {
      const url = new URL(window.location.href);
      const reflexParam = url.searchParams.get('reflex');
      if (reflexParam) {
        const idx = allReflexKeys.indexOf(reflexParam as ReflexId);
        if (idx !== -1) return idx;
      }
    } catch {}
    return 0;
  });
  const [viewMode, setViewMode] = useState<'deep_dive' | 'all_grid'>('deep_dive');

  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('reflex', ALL_REFLEX_KEYS[currentIndex]);
      window.history.replaceState(window.history.state, '', url.toString());
    } catch {}
  }, [currentIndex]);

  const [scores, setScores] = useState<AssessmentScores>(
    initialScores || {
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
      rooting: 0
    }
  );

  const [lateralScores, setLateralScores] = useState<Partial<Record<ReflexId, LateralizedScore>>>(
    scores.lateralized || {
      atnr: { left: 2, right: 1 },
      spinal_galant: { left: 1, right: 1 },
      palmar: { left: 1, right: 1 },
      plantar_babinski: { left: 1, right: 1 }
    }
  );

  const [isFinished, setIsFinished] = useState(false);
  const [showAssessmentVideo, setShowAssessmentVideo] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showAssessmentVideo) {
        setShowAssessmentVideo(false);
      }
    };
    if (showAssessmentVideo) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showAssessmentVideo]);

  const currentReflexId = allReflexKeys[currentIndex];
  const currentReflex = REFLEX_DATABASE[currentReflexId] || REFLEX_DATABASE.moro;
  const currentScore = scores[currentReflexId] ?? 0;

  // Reflexes requiring unilateral Left vs Right distinction
  const isLateralizedReflex = LATERALIZED_REFLEXES.includes(currentReflexId);
  const currentLateral = lateralScores[currentReflexId] || { left: currentScore, right: currentScore };

  const handleScoreChangeForReflex = (reflexId: ReflexId, score: number) => {
    setScores((prev) => ({
      ...prev,
      [reflexId]: score,
      lateralized: lateralScores
    }));
  };

  const handleLateralChangeForReflex = (reflexId: ReflexId, side: 'left' | 'right', val: number) => {
    const prevLateral = lateralScores[reflexId] || { left: scores[reflexId] ?? 0, right: scores[reflexId] ?? 0 };
    const updated = {
      ...prevLateral,
      [side]: val
    };
    setLateralScores((prev) => ({ ...prev, [reflexId]: updated }));
    const maxScore = Math.max(updated.left, updated.right);
    setScores((prev) => ({
      ...prev,
      [reflexId]: maxScore,
      lateralized: { ...prev.lateralized, [reflexId]: updated }
    }));
  };

  const finishAndShowRoadmap = () => {
    setIsFinished(true);
    onAssessmentFinish({
      ...scores,
      lateralized: lateralScores
    });
  };

  const handleNext = () => {
    if (currentIndex < allReflexKeys.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      finishAndShowRoadmap();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const getGradeBadge = (rId: ReflexId) => {
    const score = scores[rId] ?? 0;
    const lat = lateralScores[rId];
    if (lat && LATERALIZED_REFLEXES.includes(rId) && lat.left !== lat.right) {
      return {
        label: `L:${lat.left} R:${lat.right}`,
        short: `L${lat.left}/R${lat.right}`,
        className:
          lat.left >= 2 || lat.right >= 2
            ? 'bg-amber-100 text-amber-800 border-amber-300'
            : 'bg-blue-100 text-blue-800 border-blue-300'
      };
    }
    if (score === 0) return { label: 'Level 0: Integrated', short: 'L0', className: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
    if (score === 1) return { label: 'Level 1: Mild', short: 'L1', className: 'bg-blue-100 text-blue-800 border-blue-300' };
    if (score === 2) return { label: 'Level 2: Moderate', short: 'L2', className: 'bg-amber-100 text-amber-800 border-amber-300' };
    return { label: 'Level 3: Prominent', short: 'L3', className: 'bg-red-100 text-red-800 border-red-300' };
  };

  const gradeLabels = [
    { grade: 0, title: 'Level 0: Integrated (Smooth)', desc: currentReflex.assessment.grading.grade0, color: 'text-emerald-700 bg-emerald-50 border-emerald-300' },
    { grade: 1, title: 'Level 1: Mild Retention', desc: currentReflex.assessment.grading.grade1, color: 'text-blue-700 bg-blue-50 border-blue-300' },
    { grade: 2, title: 'Level 2: Moderate Retention', desc: currentReflex.assessment.grading.grade2, color: 'text-amber-700 bg-amber-50 border-amber-300' },
    { grade: 3, title: 'Level 3: Prominent Retention', desc: currentReflex.assessment.grading.grade3, color: 'text-red-700 bg-red-50 border-red-300' }
  ];

  if (isFinished) {
    const tierSummaries = [1, 2, 3, 4].map((tierNum) => {
      const items = allReflexKeys
        .filter((id) => REFLEX_DATABASE[id].tier === tierNum)
        .map((id) => ({
          id,
          name: REFLEX_DATABASE[id].name,
          score: scores[id] ?? 0,
          lateral: lateralScores[id]
        }));
      const maxScore = Math.max(...items.map((i) => i.score));
      return { tierNum, items, maxScore };
    });

    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
          {/* Print-only Non-Diagnostic Watermark */}
          <div className="hidden print:block p-4 border-2 border-slate-300 rounded-xl text-center text-xs text-slate-600 mb-2">
            <strong className="text-slate-800">INFORMATIONAL MOVEMENT OBSERVATION SUMMARY — NOT A MEDICAL DIAGNOSIS.</strong>
            <p className="mt-1">
              This summary is compiled by the child's caregiver using structured at-home observational guidelines. It does not replace a comprehensive clinical evaluation by a licensed Occupational Therapist (OTR/L), Physical Therapist (PT), or Pediatric Neurologist.
            </p>
          </div>

          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto text-2xl font-bold">
              ✓
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              Personalized Neurological Priority Roadmap
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
              Based on the brainstem-to-cortex hierarchy, here is your child's prioritized 4–8 week integration schedule.
            </p>
          </div>

          {/* Quick Direct Launch into Circuit */}
          {onStartPersonalizedCircuit && (
            <div className="p-4 bg-teal-50 border border-teal-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-teal-900 shadow-2xs">
              <div>
                <div className="font-bold text-sm flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-teal-600" /> Movement Observation Synced with Daily Circuit!
                </div>
                <div className="text-xs text-teal-700 mt-0.5">
                  We have built a personalized 3-drill daily routine targeting your child's highest priority reflexes.
                </div>
              </div>
              <button
                onClick={onStartPersonalizedCircuit}
                className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shrink-0 flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <PlayCircle className="w-4 h-4" /> Start Personalized Circuit Now
              </button>
            </div>
          )}

          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs sm:text-sm text-amber-900 space-y-1.5">
            <div className="font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-700" /> Developmental Sequencing Principle:
            </div>
            <p className="leading-relaxed">
              Always integrate <strong>Tier 1 (FPR & Moro)</strong> first. If a child's nervous system is trapped in survival arousal, higher-level motor reflexes (like ATNR and STNR) will resist remediation.
            </p>
          </div>

          <div className="space-y-4">
            {tierSummaries.map((ts) => {
              const tierName =
                ts.tierNum === 1
                  ? 'Tier 1: Autonomic Safety (Survival Foundation)'
                  : ts.tierNum === 2
                  ? 'Tier 2: Vestibular & Brainstem Motor Tone'
                  : ts.tierNum === 3
                  ? 'Tier 3: Hemispheric Bilateral Integration'
                  : 'Tier 4: Extremities & Oral-Motor Specialization';

              return (
                <div key={ts.tierNum} className="border border-slate-200 rounded-2xl p-4 bg-slate-50/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-teal-600 text-white flex items-center justify-center text-xs">
                        T{ts.tierNum}
                      </span>
                      {tierName}
                    </h4>
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      ts.maxScore >= 2 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {ts.maxScore >= 2 ? 'Focus Required' : 'Mild / Regulated'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {ts.items.map((it) => (
                      <div key={it.id} className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-xs text-slate-800">{it.name}</div>
                          <div className="text-[11px] text-slate-400">
                            {it.score === 0 ? 'Integrated' : it.score === 1 ? 'Mild' : it.score === 2 ? 'Moderate' : 'Prominent'}
                            {it.lateral && (
                              <span className="ml-1 text-slate-500 font-mono">
                                (L: {it.lateral.left} | R: {it.lateral.right})
                              </span>
                            )}
                          </div>
                        </div>
                        <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${
                          it.score === 0 ? 'bg-emerald-50 text-emerald-700' : it.score === 1 ? 'bg-blue-50 text-blue-700' : it.score === 2 ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'
                        }`}>
                          Level {it.score}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => setIsFinished(false)}
              className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs sm:text-sm cursor-pointer"
            >
              ← Edit & Adjust Observations
            </button>
            <button
              onClick={() => window.print()}
              className="flex-1 py-3 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-xl text-xs sm:text-sm shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4" /> Print Caregiver Observation Summary
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      {/* Top Header & View Mode Switcher */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-sm border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold shrink-0">
            <ClipboardCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-extrabold text-slate-900 text-base sm:text-lg leading-tight">
              Home Movement Observation Guide
            </h2>
            <p className="text-xs text-slate-500">
              Observation grading across all 11 reflexes • Jump directly or view all
            </p>
          </div>
        </div>

        {/* View Mode Pills & Quick Roadmap Button */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('deep_dive')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                viewMode === 'deep_dive'
                  ? 'bg-white text-teal-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Step-by-step deep dive with video and visual guides"
            >
              <ListOrdered className="w-3.5 h-3.5" />
              <span>Deep-Dive</span>
            </button>
            <button
              onClick={() => setViewMode('all_grid')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                viewMode === 'all_grid'
                  ? 'bg-white text-teal-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Overview of all 11 reflexes in a single matrix"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>All 11 Grid</span>
            </button>
          </div>

          <button
            onClick={finishAndShowRoadmap}
            className="px-3.5 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer shrink-0"
            title="Generate personalized 4-tier integration roadmap"
          >
            <span>Roadmap</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Interactive Reflex Jump Ribbon (Always visible to allow 1-click jump to any reflex) */}
      <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-2xs space-y-2">
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider px-1">
          <span>Click any reflex to jump directly:</span>
          <span className="text-teal-700 font-semibold">
            {currentIndex + 1} of 11 • {currentReflex.tierName.split(':')[0]}
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {allReflexKeys.map((id, idx) => {
            const reflex = REFLEX_DATABASE[id];
            const isCurrent = currentIndex === idx && viewMode === 'deep_dive';
            const badge = getGradeBadge(id);
            return (
              <button
                key={id}
                onClick={() => {
                  setCurrentIndex(idx);
                  setViewMode('deep_dive');
                }}
                className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-teal-600 text-white font-bold shadow-xs ring-2 ring-teal-200'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
                title={`${reflex.name} (${reflex.tierName.split(':')[0]})`}
              >
                <span>{REFLEX_SHORT_NAMES[id]}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-md font-bold ${
                    isCurrent ? 'bg-white/25 text-white' : badge.className
                  }`}
                >
                  {badge.short}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* VIEW MODE 1: All 11 Quick Screener Grid */}
      {viewMode === 'all_grid' && (
        <div className="space-y-4">
          <div className="p-3.5 bg-teal-50/70 border border-teal-200 rounded-2xl text-xs text-teal-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-600 shrink-0" />
              <span>
                <strong>Quick Observation Mode:</strong> Tap 0 to 3 for each reflex below. Tap "Guide ↗" on any reflex to open its movement demonstration video and visual guides.
              </span>
            </div>
            <button
              onClick={finishAndShowRoadmap}
              className="px-4 py-2 bg-teal-600 text-white font-bold rounded-xl text-xs hover:bg-teal-700 shadow-2xs shrink-0 cursor-pointer"
            >
              View Roadmap ➔
            </button>
          </div>

          {[1, 2, 3, 4].map((tierNum) => {
            const tierReflexes = allReflexKeys.filter((id) => REFLEX_DATABASE[id].tier === tierNum);
            const tierTitle = REFLEX_DATABASE[tierReflexes[0]]?.tierName || `Tier ${tierNum}`;
            return (
              <div key={tierNum} className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-700 font-bold text-xs flex items-center justify-center">
                      {tierNum}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      {tierTitle}
                    </h3>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400">
                    {tierReflexes.length} Reflexes
                  </span>
                </div>

                <div className="space-y-3">
                  {tierReflexes.map((rId) => {
                    const reflex = REFLEX_DATABASE[rId];
                    const score = scores[rId] ?? 0;
                    const isLat = LATERALIZED_REFLEXES.includes(rId);
                    const lat = lateralScores[rId] || { left: score, right: score };
                    const badge = getGradeBadge(rId);

                    return (
                      <div
                        key={rId}
                        className="p-3.5 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all bg-slate-50/50 space-y-2.5"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-sm text-slate-900">{reflex.name}</h4>
                              <span className="text-[11px] text-slate-400">({reflex.aka})</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                              {reflex.description}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${badge.className}`}>
                              {badge.label}
                            </span>
                            <button
                              onClick={() => {
                                const idx = allReflexKeys.indexOf(rId);
                                setCurrentIndex(idx);
                                setViewMode('deep_dive');
                              }}
                              className="px-2.5 py-1 bg-white hover:bg-slate-100 text-teal-700 border border-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
                              title="View full test video and posture comparison"
                            >
                              <span>Guide</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {/* Quick Grading Buttons */}
                        {isLat ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-slate-200/60">
                            {/* Left Side */}
                            <div className="flex items-center justify-between bg-white px-2.5 py-1.5 rounded-xl border border-slate-200">
                              <span className="text-xs font-bold text-slate-700">Left Side:</span>
                              <div className="flex gap-1">
                                {[0, 1, 2, 3].map((g) => (
                                  <button
                                    key={g}
                                    type="button"
                                    onClick={() => handleLateralChangeForReflex(rId, 'left', g)}
                                    className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                      lat.left === g
                                        ? 'bg-teal-600 text-white shadow-2xs'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                                  >
                                    {g}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Right Side */}
                            <div className="flex items-center justify-between bg-white px-2.5 py-1.5 rounded-xl border border-slate-200">
                              <span className="text-xs font-bold text-slate-700">Right Side:</span>
                              <div className="flex gap-1">
                                {[0, 1, 2, 3].map((g) => (
                                  <button
                                    key={g}
                                    type="button"
                                    onClick={() => handleLateralChangeForReflex(rId, 'right', g)}
                                    className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                      lat.right === g
                                        ? 'bg-teal-600 text-white shadow-2xs'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                                  >
                                    {g}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between bg-white p-2 rounded-xl border border-slate-200">
                            <span className="text-xs font-semibold text-slate-600">Observed Level:</span>
                            <div className="flex items-center gap-1.5">
                              {[
                                { g: 0, label: '0: Integrated' },
                                { g: 1, label: '1: Mild' },
                                { g: 2, label: '2: Moderate' },
                                { g: 3, label: '3: Prominent' }
                              ].map((opt) => (
                                <button
                                  key={opt.g}
                                  type="button"
                                  onClick={() => handleScoreChangeForReflex(rId, opt.g)}
                                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                    score === opt.g
                                      ? opt.g === 0
                                        ? 'bg-emerald-600 text-white shadow-2xs'
                                        : opt.g === 1
                                        ? 'bg-blue-600 text-white shadow-2xs'
                                        : opt.g === 2
                                        ? 'bg-amber-500 text-white shadow-2xs'
                                        : 'bg-red-600 text-white shadow-2xs'
                                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                  }`}
                                >
                                  {opt.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          <div className="pt-2">
            <button
              onClick={finishAndShowRoadmap}
              className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer"
            >
              <CheckCircle2 className="w-5 h-5" /> Finish & View Prioritized Roadmap ➔
            </button>
          </div>
        </div>
      )}

      {/* VIEW MODE 2: Focused Deep-Dive Card */}
      {viewMode === 'deep_dive' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="inline-block px-2.5 py-0.5 bg-teal-50 text-teal-700 rounded-full text-xs font-semibold tracking-wide uppercase">
                  {currentReflex.tierName.split(':')[0]} • Card {currentIndex + 1} of 11
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                  {currentReflex.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">{currentReflex.aka}</p>
              </div>

              <button
                onClick={() => setShowAssessmentVideo(true)}
                className="px-3 py-1.5 bg-red-50 text-red-700 hover:bg-red-100 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all shrink-0 cursor-pointer"
                title="Watch 2-minute movement observation guide video"
              >
                <Video className="w-3.5 h-3.5 text-red-600" /> Watch OT Test Demo
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
              {currentReflex.description}
            </p>
          </div>

          {/* Retained vs. Integrated Visual Diagnostic Comparison */}
          {currentReflex.assessment.retainedVsIntegratedImageUrl && (
            <div className="space-y-1.5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner max-h-64 flex items-center justify-center">
                <img
                  src={currentReflex.assessment.retainedVsIntegratedImageUrl}
                  alt={`${currentReflex.name} Retained vs Integrated`}
                  loading="lazy"
                  decoding="async"
                  width={1200}
                  height={896}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-red-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-xs">
                  Retained Involuntary
                </div>
                <div className="absolute top-2 right-2 bg-emerald-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-xs">
                  Integrated Posture
                </div>
              </div>
              <div className="text-[11px] text-slate-500 font-medium text-center italic">
                Observation Guide: Left shows Retained Involuntary Reflex vs. Right shows Integrated Mature Posture
              </div>
            </div>
          )}

          {/* Testing Guide */}
          <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200/80 space-y-3.5">
            <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
              <ClipboardCheck className="w-4 h-4 text-teal-600" /> At-Home Observation Steps:
            </h4>

            {currentReflex.assessment.baselineCheck && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>{currentReflex.assessment.baselineCheck}</span>
              </div>
            )}

            <div className="text-xs sm:text-sm text-slate-700 space-y-2">
              <p><strong>1. Setup:</strong> {currentReflex.assessment.setup}</p>
              <p><strong>2. Action:</strong> {currentReflex.assessment.action}</p>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span><strong>Safety Precaution:</strong> {currentReflex.assessment.safetyCaution}</span>
            </div>
          </div>

          {/* Side-by-Side Diagnostic Clues */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl border border-red-200 bg-red-50/50 space-y-1.5">
              <div className="font-bold text-red-800 flex items-center gap-1.5">
                <X className="w-3.5 h-3.5 text-red-600" /> Look For (Retained):
              </div>
              <ul className="text-red-900 space-y-1 pl-4 list-disc text-[11px]">
                {currentReflex.assessment.retainedCharacteristics.slice(0, 3).map((rc, i) => (
                  <li key={i}>{rc}</li>
                ))}
              </ul>
            </div>
            <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-1.5">
              <div className="font-bold text-emerald-800 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> Look For (Integrated):
              </div>
              <ul className="text-emerald-900 space-y-1 pl-4 list-disc text-[11px]">
                {currentReflex.assessment.integratedCharacteristics.slice(0, 3).map((ic, i) => (
                  <li key={i}>{ic}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Unilateral Left vs. Right Scoring for Lateralized Reflexes */}
          {isLateralizedReflex && (
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-teal-600" /> Unilateral Hemispheric Scoring (Left vs. Right):
                </div>
                <span className="text-[10px] text-slate-500 italic">Test both sides independently</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Left Side */}
                <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-800">Left Side Level:</span>
                    <span className="text-xs font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                      Level {currentLateral.left}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    {[0, 1, 2, 3].map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => handleLateralChangeForReflex(currentReflexId, 'left', g)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          currentLateral.left === g
                            ? 'bg-teal-600 text-white shadow-2xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right Side */}
                <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-800">Right Side Level:</span>
                    <span className="text-xs font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                      Level {currentLateral.right}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    {[0, 1, 2, 3].map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => handleLateralChangeForReflex(currentReflexId, 'right', g)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          currentLateral.right === g
                            ? 'bg-teal-600 text-white shadow-2xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {currentLateral.left !== currentLateral.right && (
                <p className="text-[11px] text-amber-700 bg-amber-50 p-2 rounded-lg border border-amber-200">
                  ⚡ <strong>Asymmetry Detected:</strong> One side retains higher tone than the other. The daily circuit will focus extra repatterning on the more retained side.
                </p>
              )}
            </div>
          )}

          {/* 0 to 3 Overall Scoring Selection */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
              {isLateralizedReflex ? 'Overall Peak Level (Auto-Computed):' : 'What did you observe? Select the movement level that matches:'}
            </label>

            <div className="grid grid-cols-1 gap-2.5">
              {gradeLabels.map((g) => {
                const isSelected = currentScore === g.grade;
                return (
                  <button
                    key={g.grade}
                    onClick={() => handleScoreChangeForReflex(currentReflexId, g.grade)}
                    className={`p-3.5 rounded-2xl border-2 text-left transition-all flex items-start justify-between gap-3 cursor-pointer ${
                      isSelected
                        ? `${g.color} ring-2 ring-offset-1 ring-slate-400 font-medium shadow-xs`
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="text-sm font-bold flex items-center gap-2">
                        <span>{g.title}</span>
                      </div>
                      <p className="text-xs leading-relaxed opacity-90">{g.desc}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected ? 'border-current bg-current' : 'border-slate-300'
                    }`}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                currentIndex === 0
                  ? 'text-slate-300 cursor-not-allowed'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{currentIndex > 0 ? `Prev: ${REFLEX_SHORT_NAMES[allReflexKeys[currentIndex - 1]]}` : 'Previous'}</span>
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => setViewMode('all_grid')}
                className="flex-1 sm:flex-initial px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1"
              >
                <LayoutGrid className="w-3.5 h-3.5" /> All 11 Overview
              </button>

              <button
                onClick={handleNext}
                className="flex-1 sm:flex-initial px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <span>
                  {currentIndex === allReflexKeys.length - 1
                    ? 'Finish & View Roadmap'
                    : `Next: ${REFLEX_SHORT_NAMES[allReflexKeys[currentIndex + 1]]}`}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video Demonstration Modal */}
      {showAssessmentVideo && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-modal-title"
          className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 z-50"
        >
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h4 id="video-modal-title" className="font-bold text-slate-900 text-base sm:text-lg">
                  Movement Observation Video: {currentReflex.name}
                </h4>
                <p className="text-xs text-slate-500">
                  Pediatric OT movement observation technique and posture guidance
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAssessmentVideo(false)}
                aria-label="Close video dialog"
                className="text-slate-400 hover:text-slate-600 p-2 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <PrivacyVideoPlayer
              youtubeId={currentReflex.assessment.assessmentVideoId}
              title={`Pediatric OT Movement Observation Guide: ${currentReflex.name}`}
              youtubeUrl={currentReflex.assessment.assessmentVideoUrl}
            />

            <div className="flex items-center justify-end pt-1">
              <button
                type="button"
                onClick={() => setShowAssessmentVideo(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs rounded-xl cursor-pointer"
              >
                Close Video
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

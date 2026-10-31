import { useState } from 'react';
import { Video, ShieldAlert, CheckCircle, Clock, Sparkles, Layers, Search, Check, X, BookOpen } from 'lucide-react';
import { REFLEX_DATABASE } from '../data/reflexData';
import { StepIllustration } from './StepIllustration';
import { PathwayHeroVisual } from './PathwayHeroVisual';
import { PrivacyVideoPlayer } from './PrivacyVideoPlayer';
import { getAssetUrl } from '../utils/assets';
import type { ReflexId, ReflexTier } from '../types';

interface ReflexLibraryProps {
  onNavigateToBooks?: () => void;
}

export const ReflexLibrary: React.FC<ReflexLibraryProps> = ({ onNavigateToBooks }) => {
  const [selectedReflexId, setSelectedReflexId] = useState<ReflexId>(() => {
    try {
      const url = new URL(window.location.href);
      const param = url.searchParams.get('reflex');
      if (param && REFLEX_DATABASE[param as ReflexId]) {
        return param as ReflexId;
      }
    } catch {}
    return 'moro';
  });
  const [selectedTier, setSelectedTier] = useState<ReflexTier | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'exercises' | 'transient_steps' | 'evaluation_comparison' | 'verification'>('exercises');
  const [selectedPathwayIndex, setSelectedPathwayIndex] = useState(0);
  const [activeHeroStepIndex, setActiveHeroStepIndex] = useState(0);
  const [videoMode, setVideoMode] = useState<'exercise' | 'assessment'>('exercise');
  const [isLiteralMode, setIsLiteralMode] = useState(false);
  const [showNeuroDeepDive, setShowNeuroDeepDive] = useState(false);

  const allReflexes = Object.values(REFLEX_DATABASE);
  const filteredReflexes = allReflexes.filter((r) => {
    const matchesTier = selectedTier === 'all' || r.tier === selectedTier;
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.aka.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.functionalSigns.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTier && matchesSearch;
  });

  const reflex = REFLEX_DATABASE[selectedReflexId] || allReflexes[0];
  const activePathway = reflex.exercisePathways[selectedPathwayIndex] || reflex.exercisePathways[0];

  const handleSelectReflex = (id: ReflexId) => {
    setSelectedReflexId(id);
    setSelectedPathwayIndex(0);
    setActiveHeroStepIndex(0);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('reflex', id);
      window.history.replaceState(window.history.state, '', url.toString());
    } catch {}
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 text-teal-800 rounded-full text-xs font-semibold">
          <Layers className="w-3.5 h-3.5" /> Comprehensive Reference Edition
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Primitive Reflex & Movement Handbook
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
          Exhaustive educational reference: Retained vs. Integrated movement observations, multi-pathway integration exercises, transient movement breakdowns, and verified OT videos.
        </p>
      </div>

      {/* Neurological Foundation Hierarchy Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-indigo-950 rounded-3xl p-5 sm:p-6 text-white shadow-md space-y-3">
        <div className="flex items-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-wider">
          <Layers className="w-4 h-4" /> The 4-Tier Neurological Integration Hierarchy
        </div>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
          The nervous system matures from the <strong>brainstem upward to the cortex</strong>. Foundational reflexes must be integrated before higher cognitive and motor skills can stabilize:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
          <div className="p-2.5 rounded-xl bg-white/10 border border-white/10">
            <span className="font-bold text-teal-300 block">Tier 1: Survival</span>
            <span className="text-[11px] text-slate-300">FPR & Moro (Autonomic Safety)</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white/10 border border-white/10">
            <span className="font-bold text-teal-300 block">Tier 2: Vestibular</span>
            <span className="text-[11px] text-slate-300">TLR, Landau & Galant (Posture)</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white/10 border border-white/10">
            <span className="font-bold text-teal-300 block">Tier 3: Bilateral</span>
            <span className="text-[11px] text-slate-300">Amphibian, ATNR & STNR (Midline)</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white/10 border border-white/10">
            <span className="font-bold text-teal-300 block">Tier 4: Extremity</span>
            <span className="text-[11px] text-slate-300">Palmar, Plantar, Rooting</span>
          </div>
        </div>
      </div>

      {/* Filter Tiers & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-200/70 rounded-2xl w-full sm:w-auto">
          {[
            { id: 'all', label: 'All 11 Reflexes' },
            { id: 1, label: 'Tier 1: Survival' },
            { id: 2, label: 'Tier 2: Vestibular' },
            { id: 3, label: 'Tier 3: Bilateral' },
            { id: 4, label: 'Tier 4: Extremity' }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTier(t.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedTier === t.id
                  ? 'bg-white text-teal-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            aria-label="Search symptoms or reflexes"
            placeholder="Search symptoms or reflexes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-teal-500"
          />
        </div>
      </div>

      {/* Horizontal Reflex Pill Selector */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {filteredReflexes.map((r) => {
          const isSelected = selectedReflexId === r.id;
          return (
            <button
              key={r.id}
              onClick={() => handleSelectReflex(r.id)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                isSelected
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span className="opacity-75 mr-1 font-mono">T{r.tier}</span> {r.name}
            </button>
          );
        })}
      </div>

      {/* Reflex Detail Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
        {/* Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="inline-block px-2.5 py-0.5 bg-teal-50 text-teal-800 rounded-full text-xs font-bold uppercase tracking-wider mb-1">
              {reflex.tierName}
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900">
              {reflex.name}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">{reflex.aka}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-amber-50 text-amber-800 text-xs font-semibold rounded-full flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {reflex.verification.durationWeeks}
            </span>
          </div>
        </div>

        {/* Tier Rationale */}
        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-600">
          <strong>Hierarchy Rationale:</strong> {reflex.tierDescription}
        </div>

        <p className="text-sm text-slate-700 leading-relaxed">
          {reflex.description}
        </p>

        {/* Functional Signs */}
        <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-100 space-y-2.5">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-amber-500" /> Daily Signs This Reflex Is Retained:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
            {reflex.functionalSigns.map((sign, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-amber-500 font-bold shrink-0">•</span>
                <span>{sign}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 gap-6 text-xs sm:text-sm font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab('exercises')}
            className={`pb-3 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'exercises'
                ? 'border-b-2 border-teal-600 text-teal-700 font-bold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Exercise Options ({reflex.exercisePathways.length} Pathways)
          </button>
          <button
            onClick={() => setActiveTab('transient_steps')}
            className={`pb-3 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'transient_steps'
                ? 'border-b-2 border-teal-600 text-teal-700 font-bold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Setup & Transient Steps
          </button>
          <button
            onClick={() => setActiveTab('evaluation_comparison')}
            className={`pb-3 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'evaluation_comparison'
                ? 'border-b-2 border-teal-600 text-teal-700 font-bold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Movement Guide: Retained vs Integrated
          </button>
          <button
            onClick={() => setActiveTab('verification')}
            className={`pb-3 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'verification'
                ? 'border-b-2 border-teal-600 text-teal-700 font-bold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Integration Verification
          </button>
        </div>

        {/* TAB 1: Multiple Integration Exercise Options */}
        {activeTab === 'exercises' && (
          <div className="space-y-6">
            {/* Pathway Selector Pills */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Choose the best pathway for your child's physical & sensory profile:
                </label>
                <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                  {reflex.exercisePathways.length} Movement Pathways Available
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {reflex.exercisePathways.map((path, idx) => {
                  const isSelected = selectedPathwayIndex === idx;
                  const getBadge = () => {
                    switch (path.category) {
                      case 'primary_movement':
                        return { label: 'Active Dynamic', color: 'bg-teal-50 text-teal-800 border-teal-200', icon: '🌟' };
                      case 'assisted_passive':
                        return { label: 'Passive Co-Regulation', color: 'bg-purple-50 text-purple-800 border-purple-200', icon: '🤝' };
                      case 'isometric_resistance':
                        return { label: 'Isometric Gentle Resistance', color: 'bg-amber-50 text-amber-800 border-amber-200', icon: '🛑' };
                      case 'rhythmic_movement':
                        return { label: '60 BPM Rhythmic Rocking', color: 'bg-blue-50 text-blue-800 border-blue-200', icon: '🌊' };
                      case 'equipment_sensory':
                        return { label: 'Therapy Ball & Sensory Play', color: 'bg-rose-50 text-rose-800 border-rose-200', icon: '🎈' };
                      case 'classroom_desk':
                        return { label: 'Classroom & Desk Reset', color: 'bg-emerald-50 text-emerald-800 border-emerald-200', icon: '🏫' };
                      case 'active_play':
                        return { label: 'Therapeutic Play', color: 'bg-indigo-50 text-indigo-800 border-indigo-200', icon: '🎮' };
                      default:
                        return { label: 'Movement Pathway', color: 'bg-slate-50 text-slate-800 border-slate-200', icon: '✨' };
                    }
                  };
                  const badge = getBadge();

                  return (
                    <button
                      key={path.id}
                      onClick={() => {
                        setSelectedPathwayIndex(idx);
                        setActiveHeroStepIndex(0);
                      }}
                      className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-teal-500 bg-teal-50/70 ring-2 ring-teal-200 shadow-xs'
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-1.5">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border flex items-center gap-1 ${badge.color}`}>
                            <span>{badge.icon}</span>
                            <span>{badge.label}</span>
                          </span>
                          <span className="text-[10px] font-bold text-slate-500">
                            {Math.round(path.durationSeconds / 60)}m
                          </span>
                        </div>
                        <div className="font-bold text-xs text-slate-900 leading-snug">{path.name}</div>
                        <div className="text-[11px] text-teal-700 font-medium mt-0.5">{path.categoryLabel}</div>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-2 pt-1.5 border-t border-slate-200/60 leading-tight line-clamp-2">
                        {path.suitableFor}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Pathway Details */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
                <div>
                  <h4 className="font-extrabold text-base sm:text-lg text-slate-900">
                    {activePathway.name}
                  </h4>
                  <p className="text-xs text-slate-500">{activePathway.suitableFor}</p>
                </div>
                <div className="text-xs text-teal-800 font-semibold bg-white px-3 py-1 rounded-full border border-teal-200 self-start sm:self-auto">
                  Suggested Practice: {activePathway.targetReps}
                </div>
              </div>

              {/* Dynamic Pathway Hero Visual Guide */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Anatomical Pathway Guide:
                  </h5>
                  <button
                    onClick={() => setIsLiteralMode(!isLiteralMode)}
                    className={`px-2.5 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                      isLiteralMode
                        ? 'bg-purple-100 text-purple-800 ring-2 ring-purple-300'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                    <span>{isLiteralMode ? 'Literal Instructions ON' : 'Switch to Literal Mode'}</span>
                  </button>
                </div>
                <PathwayHeroVisual
                  pathway={activePathway}
                  activeStepIndex={activeHeroStepIndex}
                  onSelectStep={setActiveHeroStepIndex}
                  fallbackImageUrl={reflex.exercisePathways[0].imageUrl}
                />
              </div>

              {/* Step sequence */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Step-by-Step Movement Sequence:
                  </h5>
                  <span className="text-[11px] text-teal-700 font-semibold">
                    Includes Posture Illustrations & Zoomable Clinical Photos
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activePathway.transientSteps.map((st) => (
                    <StepIllustration
                      key={st.stepNumber}
                      step={st}
                      fallbackImageUrl={activePathway.imageUrl || reflex.exercisePathways[0].imageUrl}
                      sequenceImageUrl={activePathway.transientSequenceImageUrl}
                      drillTitle={activePathway.name}
                      isLiteralMode={isLiteralMode}
                    />
                  ))}
                </div>
              </div>

              {/* Resistance Script */}
              <div className="p-3.5 bg-purple-50 rounded-xl border border-purple-100 text-xs text-purple-900 space-y-1">
                <div className="font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" /> Child Resistance Story:
                </div>
                <p>{activePathway.resistancePlayScript}</p>
              </div>
            </div>

            {/* Video Player Section with Mode Switcher */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-red-500" />
                  <span className="text-sm font-bold text-slate-800">Pediatric OT Video Demonstrations:</span>
                </div>
                <div className="flex gap-1.5 p-1 bg-slate-100 rounded-xl self-start sm:self-auto">
                  <button
                    onClick={() => setVideoMode('exercise')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      videoMode === 'exercise' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-500'
                    }`}
                  >
                    Integration Exercise Video
                  </button>
                  <button
                    onClick={() => setVideoMode('assessment')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      videoMode === 'assessment' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-500'
                    }`}
                  >
                    Assessment Guide Video
                  </button>
                </div>
              </div>

              <PrivacyVideoPlayer
                youtubeId={
                  videoMode === 'exercise'
                    ? reflex.primaryVideo.youtubeId
                    : reflex.assessment.assessmentVideoId
                }
                title={
                  videoMode === 'exercise'
                    ? reflex.primaryVideo.title
                    : `Pediatric OT Movement Observation Guide: ${reflex.name}`
                }
                youtubeUrl={
                  videoMode === 'exercise'
                    ? reflex.primaryVideo.youtubeUrl
                    : reflex.assessment.assessmentVideoUrl
                }
                thumbnailUrl={activePathway.imageUrl}
              />
            </div>
          </div>
        )}

        {/* TAB 2: Setup & Transient Steps Visuals */}
        {activeTab === 'transient_steps' && (
          <div className="space-y-6">
            {activePathway.transientSequenceImageUrl && (
              <div className="space-y-2">
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm aspect-4/3 bg-slate-100 flex items-center justify-center">
                  <img
                    src={getAssetUrl(activePathway.transientSequenceImageUrl)}
                    alt="Transient Steps Progression"
                    loading="lazy"
                    decoding="async"
                    width={1200}
                    height={896}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-[11px] text-center text-slate-500 font-medium">
                  4-Panel Step-by-Step Movement Timeline (Setup ➔ Begin ➔ Transient ➔ Finish)
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activePathway.transientSteps.map((st) => (
                <StepIllustration
                  key={st.stepNumber}
                  step={st}
                  fallbackImageUrl={activePathway.imageUrl || reflex.exercisePathways[0].imageUrl}
                  sequenceImageUrl={activePathway.transientSequenceImageUrl}
                  drillTitle={activePathway.name}
                  isLiteralMode={isLiteralMode}
                />
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Movement Observation Guide: Retained vs Integrated */}
        {activeTab === 'evaluation_comparison' && (
          <div className="space-y-6">
            {/* Observation Comparison Image */}
            {reflex.assessment.retainedVsIntegratedImageUrl && (
              <div className="space-y-2">
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm aspect-4/3 bg-slate-100 flex items-center justify-center">
                  <img
                    src={getAssetUrl(reflex.assessment.retainedVsIntegratedImageUrl)}
                    alt="Retained vs Integrated Movement Comparison"
                    loading="lazy"
                    decoding="async"
                    width={1200}
                    height={896}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-[11px] text-center text-slate-500 font-medium">
                  Side-by-Side Home Movement Observation Comparison
                </div>
              </div>
            )}

            {/* Checklist Comparison Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Retained Card */}
              <div className="p-5 rounded-2xl border-2 border-red-200 bg-red-50/50 space-y-3">
                <div className="flex items-center gap-2 text-red-800 font-bold text-sm">
                  <div className="w-6 h-6 rounded-full bg-red-200 text-red-800 flex items-center justify-center text-xs">
                    <X className="w-4 h-4" />
                  </div>
                  Retained Reflex Pattern:
                </div>
                <ul className="text-xs text-red-900 space-y-2">
                  {reflex.assessment.retainedCharacteristics.map((c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-red-500 font-bold shrink-0">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Integrated Card */}
              <div className="p-5 rounded-2xl border-2 border-emerald-200 bg-emerald-50/50 space-y-3">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                  <div className="w-6 h-6 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center text-xs">
                    <Check className="w-4 h-4" />
                  </div>
                  Integrated Reflex Pattern:
                </div>
                <ul className="text-xs text-emerald-900 space-y-2">
                  {reflex.assessment.integratedCharacteristics.map((c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold shrink-0">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Movement Observation Scale (Levels 0–3) */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Home Movement Observation Scale (Levels 0–3):
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/50">
                  <div className="font-bold text-emerald-800">Level 0 (Smooth / Integrated)</div>
                  <div className="text-slate-600 mt-1">{reflex.assessment.grading.grade0}</div>
                </div>
                <div className="p-3 rounded-xl border border-blue-200 bg-blue-50/50">
                  <div className="font-bold text-blue-800">Level 1 (Mild Retention)</div>
                  <div className="text-slate-600 mt-1">{reflex.assessment.grading.grade1}</div>
                </div>
                <div className="p-3 rounded-xl border border-amber-200 bg-amber-50/50">
                  <div className="font-bold text-amber-800">Level 2 (Moderate Retention)</div>
                  <div className="text-slate-600 mt-1">{reflex.assessment.grading.grade2}</div>
                </div>
                <div className="p-3 rounded-xl border border-red-200 bg-red-50/50">
                  <div className="font-bold text-red-800">Level 3 (Prominent Retention)</div>
                  <div className="text-slate-600 mt-1">{reflex.assessment.grading.grade3}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Verification Content */}
        {activeTab === 'verification' && (
          <div className="space-y-4 text-xs sm:text-sm text-slate-700">
            <div className="p-4 bg-teal-50 rounded-2xl border border-teal-100 space-y-2">
              <h4 className="font-bold text-teal-900 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-teal-600" /> Follow-Up Observation Guide:
              </h4>
              <p className="text-teal-800">{reflex.verification.retestProtocol}</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-800">Objective Criteria for True Neurological Integration:</h4>
              <p className="text-slate-600">{reflex.verification.criteriaForIntegration}</p>
            </div>

            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 text-xs text-amber-900">
              💡 <strong>Developmental Integration Note:</strong> Once reflex inhibitory pathways are myelinated through 4–8 weeks of rhythmic consistency, the integration is permanent. Temporary regressions can occur following illness, general anesthesia, or severe trauma; a 1-week tune-up circuit quickly reactivates the cortical pathways.
            </div>
          </div>
        )}
      </div>

      {/* Neurobiology Deep Dive Accordion (Perspective 5: PhD Research Rigor) */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
        <button
          onClick={() => setShowNeuroDeepDive(!showNeuroDeepDive)}
          className="w-full flex items-center justify-between text-left cursor-pointer group"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center text-sm font-bold border border-indigo-100 group-hover:bg-indigo-100 transition-all">
              🧠
            </span>
            <div>
              <h4 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-indigo-600 transition-colors">
                Neurobiology Deep Dive: Descending Tracts & Subcortical Reflex Arc
              </h4>
              <p className="text-xs text-slate-500">
                Peer-reviewed motor control mechanisms, brainstem localization, and myelination
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-xl border border-indigo-200 shrink-0">
            {showNeuroDeepDive ? 'Hide Deep Dive ▲' : 'Read Neurobiology ▼'}
          </span>
        </button>

        {showNeuroDeepDive && (
          <div className="pt-4 border-t border-slate-100 space-y-4 text-xs text-slate-700 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <h5 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <span>🔬</span> Brainstem Tract Localization
                </h5>
                <p className="text-slate-600 leading-relaxed">
                  Primitive reflexes never \"disappear\" or get erased; in neurotypical development, they are placed under tonic subcortical inhibition by descending white matter pathways:
                </p>
                <ul className="space-y-1.5 text-slate-700">
                  <li>• <strong>Vestibulospinal Tracts (LVST/MVST):</strong> Mediate antigravity extensor tone in TLR and autonomic startle in Moro.</li>
                  <li>• <strong>Rubrospinal & Reticulospinal Tracts:</strong> Modulate flexor tone and contralateral limb inhibition in ATNR and STNR.</li>
                  <li>• <strong>Corticospinal (Pyramidal) Tract:</strong> Myelinates from precentral gyrus through internal capsule to suppress Babinski and Plantar grasp.</li>
                  <li>• <strong>Corticobulbar Tract:</strong> Suppresses cranial nerve reflexes (Rooting/Sucking via CN V, VII, XII).</li>
                </ul>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <h5 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <span>🌊</span> Cerebellar Vermis & Rhythmic Movement
                </h5>
                <p className="text-slate-600 leading-relaxed">
                  The neurobiological foundation of Dr. Harald Blomberg\'s 60 BPM Rhythmic Movement Training (BRMT) lies in <strong>Purkinje cell entrainment within the cerebellar vermis</strong> and rhythmic modulation of the Ascending Reticular Activating System (ARAS).
                </p>
                <div className="p-2.5 bg-blue-50 rounded-xl border border-blue-200 text-blue-900 font-medium text-[11px]">
                  60 BPM exactly matches the resting cardiac rhythm and alpha brainwave entrainment (8–12 Hz harmonics), lowering sympathetic fight-or-flight arousal while synchronizing vestibular-proprioceptive mapping.
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-indigo-50/70 rounded-2xl border border-indigo-100 text-[11px] text-indigo-950 flex items-start gap-2">
              <span className="text-base shrink-0">📚</span>
              <div>
                <strong>Gold-Standard Literature Citations:</strong> Goddard Blythe & Blythe (INPP, 2002); Masgutova (MNRI®, 2011); Blomberg & Dempsey (RMTi, 2011); McPhillips, Hepper & Mulhern (<em>The Lancet</em>, 2000, 355:1804–1808); Ayres (Sensory Integration, 1972).
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Offline References Banner */}
      {onNavigateToBooks && (
        <div className="bg-gradient-to-r from-indigo-900 to-slate-900 rounded-3xl p-5 sm:p-6 text-white shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-4 h-4" /> Recommended Offline Reading
            </div>
            <h4 className="font-extrabold text-base sm:text-lg">
              Want deeper clinical textbooks or parent handbooks?
            </h4>
            <p className="text-xs text-slate-300 max-w-lg">
              Explore our curated reference library featuring Sally Goddard Blythe (INPP), Dr. Robert Melillo, Dr. Blomberg (RMTi), Dr. Masgutova (MNRI), and peer-reviewed studies.
            </p>
          </div>
          <button
            onClick={onNavigateToBooks}
            className="px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer shadow-sm"
          >
            Open Books & Studies Library ➔
          </button>
        </div>
      )}
    </div>
  );
};

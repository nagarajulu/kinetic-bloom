import { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Video,
  Smile,
  Frown,
  Meh,
  AlertCircle,
  HeartHandshake,
  Volume2,
  VolumeX,
  ShieldAlert,
  ShieldCheck,
  Compass,
  ArrowRight,
  HandHeart,
  Activity
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { REFLEX_DATABASE } from '../data/reflexData';
import { StepIllustration } from './StepIllustration';
import { PathwayHeroVisual } from './PathwayHeroVisual';
import { PrivacyVideoPlayer } from './PrivacyVideoPlayer';
import {
  playChime,
  playPulseTick,
  playSuccessChime,
  speakCue,
  requestWakeLock,
  releaseWakeLock
} from '../utils/audioCues';
import { generateRecommendedDeck } from '../utils/storage';
import type {
  ReflexId,
  RegulationZone,
  AssessmentScores,
  ChildProfile,
  MovementQuality
} from '../types';

interface CircuitRunnerProps {
  onSessionComplete: (
    preZone: RegulationZone,
    postZone: RegulationZone,
    completedExercises: ReflexId[],
    details?: {
      movementQuality?: MovementQuality;
      compensationsObserved?: string[];
      deckName?: string;
      notes?: string;
    }
  ) => void;
  scores: AssessmentScores;
  sensoryMode?: 'standard' | 'calm_dark';
  childProfile?: ChildProfile;
}

export const CircuitRunner = ({
  onSessionComplete,
  scores,
  sensoryMode = 'standard',
  childProfile
}: CircuitRunnerProps) => {
  const [step, setStep] = useState<
    'pre_check' | 'red_intercept' | 'deck_select' | 'warm_up' | 'exercising' | 'transition_buffer' | 'post_check' | 'completed'
  >('pre_check');

  const [preZone, setPreZone] = useState<RegulationZone>('yellow');
  const [postZone, setPostZone] = useState<RegulationZone>('green');

  // Dynamic recommendation based on screener and autonomic zone
  const recommended = generateRecommendedDeck(scores, preZone);

  const deckPresets: { name: string; desc: string; reflexes: ReflexId[]; tag?: string }[] = [
    {
      name: recommended.name,
      desc: recommended.desc,
      reflexes: recommended.reflexes,
      tag: 'Personalized'
    },
    {
      name: 'Foundation Safety Circuit (Tier 1)',
      desc: 'Fear Paralysis + Moro + TLR. Best for high anxiety, meltdowns, and sensory overload.',
      reflexes: ['fpr', 'moro', 'tlr']
    },
    {
      name: 'Posture & Coordination Circuit (Tier 2 & 3)',
      desc: 'Landau + ATNR + STNR. Best for fidgeting, W-sitting, reading focus, and core strength.',
      reflexes: ['landau', 'atnr', 'stnr']
    },
    {
      name: 'Cross-Lateral & Spinal Freedom (Tier 2 & 3)',
      desc: 'Spinal Galant + Amphibian + ATNR. Best for bilateral integration and fluid walking.',
      reflexes: ['spinal_galant', 'amphibian', 'atnr']
    },
    {
      name: 'Handwriting & Oral-Motor Circuit (Tier 4)',
      desc: 'Palmar + Plantar + Rooting. Best for pencil grip, speech articulation, and sensory feet.',
      reflexes: ['palmar', 'plantar_babinski', 'rooting']
    }
  ];

  const [activeDeck, setActiveDeck] = useState<ReflexId[]>(deckPresets[0].reflexes);
  const [selectedDeckName, setSelectedDeckName] = useState<string>(deckPresets[0].name);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const currentReflexId = activeDeck[currentCardIndex] || 'moro';
  const currentReflex = REFLEX_DATABASE[currentReflexId] || REFLEX_DATABASE.moro;
  const [pathwayIndices, setPathwayIndices] = useState<Record<string, number>>({});

  const isHighSupportChild =
    childProfile?.supportNeed === 'extensive_hands_on' || childProfile?.supportLevel === 'level3';
  const defaultPathwayIndex = isHighSupportChild
    ? Math.max(0, currentReflex.exercisePathways.findIndex((p) => p.category === 'assisted_passive'))
    : 0;

  const activePathwayIndex = pathwayIndices[currentReflexId] ?? defaultPathwayIndex;
  const activePathway = currentReflex.exercisePathways[activePathwayIndex] || currentReflex.exercisePathways[0];

  // Timer states
  const [timeLeft, setTimeLeft] = useState(activePathway.durationSeconds);
  const [isRunning, setIsRunning] = useState(false);

  // Audio / hands-free states
  const [audioCuesEnabled, setAudioCuesEnabled] = useState(true);
  const [metronomeEnabled, setMetronomeEnabled] = useState(false);

  // Pacer states
  const [pacerPhase, setPacerPhase] = useState<'inhale' | 'exhale'>('inhale');
  const [bilateralSide, setBilateralSide] = useState<'right' | 'left'>('right');
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isLiteralMode, setIsLiteralMode] = useState(() => childProfile?.cuePreference === 'literal_clear' || childProfile?.supportLevel === 'level2');
  const [isPecsMode, setIsPecsMode] = useState(() => Boolean(
    childProfile?.cuePreference === 'hands_free_audio' ||
    childProfile?.supportNeed === 'extensive_hands_on' ||
    childProfile?.supportLevel === 'level3'
  ));

  // Transition buffer countdown
  const [bufferTimeLeft, setBufferTimeLeft] = useState(10);

  // Modals
  const [showPlayScript, setShowPlayScript] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Completed items in today's circuit
  const [completedExercises, setCompletedExercises] = useState<ReflexId[]>([]);

  // Movement quality and compensations logging
  const [movementQuality, setMovementQuality] = useState<MovementQuality>('smooth_slow');
  const [selectedCompensations, setSelectedCompensations] = useState<string[]>([]);
  const [sessionNotes, setSessionNotes] = useState('');

  const metronomeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const bilateralCycleCountRef = useRef(0);

  // Wake lock management while exercising
  useEffect(() => {
    if (isRunning) {
      requestWakeLock();
    } else {
      releaseWakeLock();
    }
    return () => {
      releaseWakeLock();
    };
  }, [isRunning]);

  // Main timer effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev: number) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      handleDrillFinished();
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  // Metronome pulse effect (dynamically calculated from activePathway.metronomeBpm)
  useEffect(() => {
    if (isRunning && metronomeEnabled) {
      const bpm = activePathway?.metronomeBpm || 60;
      const intervalMs = Math.round((60 / bpm) * 1000);
      metronomeIntervalRef.current = setInterval(() => {
        playPulseTick();
      }, intervalMs);
    } else {
      if (metronomeIntervalRef.current) {
        clearInterval(metronomeIntervalRef.current);
        metronomeIntervalRef.current = null;
      }
    }
    return () => {
      if (metronomeIntervalRef.current) {
        clearInterval(metronomeIntervalRef.current);
      }
    };
  }, [isRunning, metronomeEnabled, activePathway?.metronomeBpm]);

  // Universal Pacer cycle effect with voice and chime cues for all 11 reflexes
  useEffect(() => {
    let pacerInterval: ReturnType<typeof setInterval>;
    if (isRunning) {
      pacerInterval = setInterval(() => {
        setPacerPhase((prev) => {
          const next = prev === 'inhale' ? 'exhale' : 'inhale';
          if (audioCuesEnabled) {
            playChime(next === 'inhale' ? 480 : 380, 0.6);
            if (activePathway.category === 'isometric_resistance') {
              speakCue(next === 'inhale' ? 'Hold static for 6 seconds, resist gently' : 'Release tension and breathe out', true);
            } else if (activePathway.category === 'rhythmic_movement') {
              speakCue('Gentle rhythmic rocking, matching the rhythm', true);
            } else if (currentReflexId === 'moro' || currentReflexId === 'fpr') {
              speakCue(next === 'inhale' ? 'Breathe in, open starfish' : 'Breathe out, curl tight', true);
            } else if (activePathway.transientSteps && activePathway.transientSteps.length > 0) {
              const currentStep = activePathway.transientSteps[activeStepIndex];
              const cue = isLiteralMode
                ? (currentStep?.actionInstruction?.split(/[.!?]/)[0] || currentStep?.alignmentCheck)
                : currentStep?.parentCue;
              if (cue) speakCue(cue, true);
            }
          }
          return next;
        });

        const latScore = scores.lateralized?.[currentReflexId];
        const hasAsymmetry = Boolean(latScore && latScore.left !== latScore.right);
        const weakerSide: 'left' | 'right' = latScore && latScore.left > latScore.right ? 'left' : 'right';
        const strongerSide: 'left' | 'right' = weakerSide === 'left' ? 'right' : 'left';

        setBilateralSide((prev) => {
          let next: 'left' | 'right';
          if (hasAsymmetry) {
            // 2:1 Hemispheric Rebalance: 2 beats on weaker side, 1 on stronger side
            const stepInCycle = bilateralCycleCountRef.current % 3;
            bilateralCycleCountRef.current += 1;
            next = stepInCycle < 2 ? weakerSide : strongerSide;
          } else {
            next = prev === 'right' ? 'left' : 'right';
          }

          if ((currentReflexId === 'atnr' || currentReflexId === 'amphibian') && audioCuesEnabled) {
            const focusNote = hasAsymmetry && next === weakerSide ? ' (weaker side 2:1 focus)' : '';
            speakCue(`Turn head to ${next}${focusNote}`, true);
          }
          return next;
        });

        // Auto-advance movement steps synchronously with pacer cycle
        if (activePathway.transientSteps && activePathway.transientSteps.length > 1) {
          setActiveStepIndex((prevStep) => (prevStep + 1) % activePathway.transientSteps.length);
        }
      }, 5000);
    }
    return () => clearInterval(pacerInterval);
  }, [isRunning, audioCuesEnabled, currentReflexId, activePathway, activeStepIndex, isLiteralMode, scores]);

  // Transition buffer countdown effect
  useEffect(() => {
    let bufferInterval: ReturnType<typeof setInterval>;
    if (step === 'transition_buffer' && bufferTimeLeft > 0) {
      bufferInterval = setInterval(() => {
        setBufferTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (step === 'transition_buffer' && bufferTimeLeft === 0) {
      proceedToNextCard();
    }
    return () => clearInterval(bufferInterval);
  }, [step, bufferTimeLeft]);

  const handleSelectCard = (index: number) => {
    setCurrentCardIndex(index);
    const targetReflexId = activeDeck[index];
    const targetPIdx = pathwayIndices[targetReflexId] || 0;
    const targetReflex = REFLEX_DATABASE[targetReflexId];
    const pathway = targetReflex?.exercisePathways[targetPIdx] || targetReflex?.exercisePathways[0];
    setTimeLeft(pathway?.durationSeconds || 150);
    setActiveStepIndex(0);
    setIsRunning(false);
  };

  const handleSelectPathway = (pIdx: number) => {
    setPathwayIndices((prev) => ({ ...prev, [currentReflexId]: pIdx }));
    const pathway = currentReflex.exercisePathways[pIdx] || currentReflex.exercisePathways[0];
    setTimeLeft(pathway.durationSeconds);
    setActiveStepIndex(0);
    setIsRunning(false);
  };

  const handleDrillFinished = () => {
    if (!completedExercises.includes(currentReflexId)) {
      setCompletedExercises((prev) => [...prev, currentReflexId]);
    }

    playSuccessChime();

    // Gentle confetti only in standard mode to avoid sensory overload, respecting reduced motion
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (sensoryMode !== 'calm_dark' && !prefersReducedMotion) {
      try {
        confetti({ particleCount: 40, spread: 50, origin: { y: 0.8 } });
      } catch {
        // ignore
      }
    }

    if (currentCardIndex < activeDeck.length - 1) {
      setBufferTimeLeft(10);
      setStep('transition_buffer');
    } else {
      setStep('post_check');
    }
  };

  const proceedToNextCard = () => {
    if (currentCardIndex < activeDeck.length - 1) {
      handleSelectCard(currentCardIndex + 1);
      setStep('exercising');
    } else {
      setStep('post_check');
    }
  };

  // 1-Tap 60s Micro-Win downshift for resistant or struggling moments
  const triggerMicroWin = () => {
    setTimeLeft(60);
    setMovementQuality('micro_win');
    if (audioCuesEnabled) {
      speakCue('Adapting drill to 60 second micro win. Great job trying!', true);
    }
  };

  // Switch immediately to passive grounding
  const switchToPassivePathway = () => {
    const passiveIdx = currentReflex.exercisePathways.findIndex((p) => p.category === 'assisted_passive');
    if (passiveIdx >= 0) {
      handleSelectPathway(passiveIdx);
      setMovementQuality('assisted_passive');
    }
  };

  const finishSession = () => {
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (sensoryMode !== 'calm_dark' && !prefersReducedMotion) {
      try {
        confetti({ particleCount: 100, spread: 90, origin: { y: 0.6 } });
      } catch {
        // ignore
      }
    }
    playSuccessChime();

    onSessionComplete(preZone, postZone, completedExercises, {
      movementQuality,
      compensationsObserved: selectedCompensations,
      deckName: selectedDeckName,
      notes: sessionNotes
    });

    setStep('completed');
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  const totalDuration = activePathway.durationSeconds;
  const progressPercent = Math.min(100, Math.max(0, ((totalDuration - timeLeft) / totalDuration) * 100));

  const childName = childProfile?.name || 'Your child';
  const childReward = childProfile?.preferredReward || 'Sensory Break / Trampoline';

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Step 1: Pre-session State Check */}
      {step === 'pre_check' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-800 rounded-full text-xs font-semibold">
            <HeartHandshake className="w-3.5 h-3.5" /> Step 1: Baseline Nervous System Check-in
          </div>
          <h2 className="text-2xl font-bold text-slate-800">
            How is {childName}'s nervous system right now?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            Checking in before and after captures how somatic sensory-motor movement calms brainstem arousal.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              {
                id: 'red',
                label: 'Overload State (SOS)',
                desc: 'Overwhelmed, Meltdown, Fight-or-Flight',
                color: 'border-red-400 bg-red-50 text-red-700',
                icon: AlertCircle
              },
              {
                id: 'yellow',
                label: 'Revved-Up State (Buzzing)',
                desc: 'Fidgety, Wiggly, High Sensory-Seeking',
                color: 'border-amber-400 bg-amber-50 text-amber-700',
                icon: Frown
              },
              {
                id: 'green',
                label: 'Anchored State (Ready)',
                desc: 'Calm, Connected, Ready & Focused',
                color: 'border-emerald-400 bg-emerald-50 text-emerald-700',
                icon: Smile
              },
              {
                id: 'blue',
                label: 'Low-Battery State (Resting)',
                desc: 'Sluggish, Tired, Low Energy, Hypotonic',
                color: 'border-blue-400 bg-blue-50 text-blue-700',
                icon: Meh
              }
            ].map((zone) => {
              const Icon = zone.icon;
              const isSelected = preZone === zone.id;
              return (
                <button
                  key={zone.id}
                  onClick={() => setPreZone(zone.id as RegulationZone)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                    isSelected
                      ? `${zone.color} ring-2 ring-offset-2 ring-slate-400 font-semibold shadow-xs`
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-6 h-6 mb-2" />
                  <div className="font-semibold text-sm">{zone.label}</div>
                  <div className="text-[11px] text-slate-500 mt-1 leading-tight">{zone.desc}</div>
                </button>
              );
            })}
          </div>

          {/* Red Zone Emergency Intercept Warning */}
          {preZone === 'red' && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-left space-y-2 text-xs sm:text-sm text-red-900 animate-fadeIn">
              <div className="flex items-center gap-2 font-bold text-red-800">
                <ShieldAlert className="w-5 h-5 text-red-600 shrink-0" />
                <span>Co-Regulation Intercept: Child in Overload State (SOS)</span>
              </div>
              <p className="leading-relaxed">
                <strong>Never demand active motor planning or coordination during a meltdown.</strong> When the sympathetic brainstem is in survival freeze, calisthenics will trigger further distress. We strongly recommend switching to <strong>Passive Somatic Calming (Tier 1 Grounding)</strong>.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => {
                    setActiveDeck(['fpr', 'moro', 'tlr']);
                    setSelectedDeckName('🆘 Overload State (SOS) Vagal Grounding');
                    setStep('exercising');
                    handleSelectCard(0);
                    // Preselect passive pathway
                    setPathwayIndices({ fpr: 1, moro: 1, tlr: 1 });
                  }}
                  className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <HandHeart className="w-4 h-4" /> Start 3-Min Passive Grounding Circuit Now
                </button>
                <button
                  onClick={() => setStep('deck_select')}
                  className="px-4 py-2.5 bg-white border border-red-300 text-red-800 hover:bg-red-100 rounded-xl font-semibold cursor-pointer"
                >
                  Choose Deck Manually
                </button>
              </div>
            </div>
          )}

          {preZone !== 'red' && (
            <button
              onClick={() => setStep('deck_select')}
              className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer"
            >
              Continue to Select Daily Circuit Deck ➔
            </button>
          )}
        </div>
      )}

      {/* Step 1.5: Deck Selection */}
      {step === 'deck_select' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="text-center space-y-1">
            <span className="px-2.5 py-0.5 bg-teal-50 text-teal-700 rounded-full text-xs font-semibold">
              Personalized Focus
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Select Today's 10-Minute Routine
            </h2>
            <p className="text-xs text-slate-500">
              Recommended based on your screener scores and the brainstem-to-cortex hierarchy:
            </p>
          </div>

          <div className="space-y-3">
            {deckPresets.map((preset, idx) => {
              const isSelected = activeDeck === preset.reflexes;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveDeck(preset.reflexes);
                    setSelectedDeckName(preset.name);
                    setCurrentCardIndex(0);
                    const firstReflex = REFLEX_DATABASE[preset.reflexes[0]];
                    setTimeLeft(firstReflex?.exercisePathways[0]?.durationSeconds || 180);
                  }}
                  className={`w-full p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-teal-500 bg-teal-50/70 ring-2 ring-teal-200 shadow-xs'
                      : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-slate-900">{preset.name}</h4>
                      {preset.tag && (
                        <span className="px-2 py-0.5 bg-teal-600 text-white rounded-md text-[10px] font-bold">
                          {preset.tag}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-semibold text-teal-700 bg-white px-2 py-0.5 rounded-full border border-teal-200">
                      3 Drills • 10 Mins
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{preset.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {preset.reflexes.map((rId) => (
                      <span
                        key={rId}
                        className="text-[10px] bg-white px-2 py-0.5 rounded-md border border-slate-200 text-slate-700 font-medium"
                      >
                        {REFLEX_DATABASE[rId]?.name || rId}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => setStep('warm_up')}
              className="py-3.5 px-4 bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 font-bold rounded-2xl transition-all flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer shadow-xs"
            >
              <Sparkles className="w-4 h-4 text-purple-600" /> 60s Sensory & Vagal Warm-Up
            </button>
            <button
              onClick={() => {
                setStep('exercising');
                handleSelectCard(0);
              }}
              className="py-3.5 px-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" /> Start Circuit Directly
            </button>
          </div>
        </div>
      )}

      {/* Step 1.8: 60s Sensory & Vagal Warm-Up Primer */}
      {step === 'warm_up' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="text-center space-y-1">
            <span className="px-2.5 py-0.5 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold">
              Pre-Circuit Neurological Priming
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              60-Second Sensory & Vagal Primer
            </h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Clinical best practice: never jump cold into reflex dissociation. Prime autonomic stability and proprioceptive tracts first:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-violet-50/70 border border-violet-200 space-y-2">
              <div className="flex items-center gap-2 text-violet-800 font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-violet-600" /> 1. Heavy Work (Dopamine)
              </div>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                <strong>10 Wall Push-Ups</strong> or <strong>20s Deep Joint Compressions</strong> down both arms to saturate muscle spindles.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 space-y-2">
              <div className="flex items-center gap-2 text-teal-800 font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-teal-600" /> 2. Vagal Sigh (Parasympathetic)
              </div>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                <strong>3 Physiological Sighs:</strong> Double inhale through nose + long audible exhale through mouth (<em>"Voooo"</em> vibration).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-2">
              <div className="flex items-center gap-2 text-blue-800 font-bold text-xs uppercase tracking-wider">
                <Compass className="w-4 h-4 text-blue-600" /> 3. Midline Tracking
              </div>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                <strong>15s Smooth Pursuit:</strong> Track parent's thumb moving horizontally left-to-right without rotating head.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={() => {
                setStep('exercising');
                handleSelectCard(0);
              }}
              className="w-full sm:flex-1 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" /> Nervous System Primed ➔ Start Circuit
            </button>
            <button
              onClick={() => {
                setStep('exercising');
                handleSelectCard(0);
              }}
              className="w-full sm:w-auto px-4 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold rounded-2xl text-xs cursor-pointer"
            >
              Skip Warm-Up
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Active Circuit Runner */}
      {step === 'exercising' && (
        <div className="space-y-4">
          {/* First–Then Visual Schedule Bar for ASD Level 2 / Predictability */}
          <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wide">
              <Compass className="w-4 h-4 text-teal-600" />
              <span>First: 3 Movement Cards</span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
              {activeDeck.map((id, index) => {
                const reflex = REFLEX_DATABASE[id];
                const isCurrent = currentCardIndex === index;
                const isDone = completedExercises.includes(id);
                return (
                  <button
                    key={id}
                    onClick={() => handleSelectCard(index)}
                    className={`py-1.5 px-2.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-teal-600 text-white font-bold shadow-xs'
                        : isDone
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <span className="w-3.5 h-3.5 rounded-full bg-slate-300 text-[9px] flex items-center justify-center font-bold">
                        {index + 1}
                      </span>
                    )}
                    <span>{reflex?.name.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-purple-700 bg-purple-50 px-3 py-1 rounded-xl border border-purple-100 shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>Then: {childReward}</span>
            </div>
          </div>

          {/* ASD Level 3 Visual Schedule PECS Token Board */}
          {isPecsMode && (
            <div className="bg-amber-50/80 border-2 border-amber-300 rounded-3xl p-4 flex items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="text-lg">⭐</span>
                <div>
                  <h4 className="text-xs font-extrabold text-amber-900 uppercase tracking-wider">
                    Visual Schedule (PECS Tokens)
                  </h4>
                  <p className="text-[11px] text-amber-800 font-medium">
                    Tap a token when completed. Visual progress for non-verbal learners.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {activePathway.transientSteps.map((st, idx) => {
                  const isDone = idx < activeStepIndex;
                  const isCurrent = idx === activeStepIndex;
                  return (
                    <button
                      key={st.stepNumber}
                      onClick={() => setActiveStepIndex(idx)}
                      className={`w-9 h-9 rounded-2xl flex items-center justify-center font-bold text-xs transition-all cursor-pointer ${
                        isDone
                          ? 'bg-emerald-500 text-white shadow-xs'
                          : isCurrent
                          ? 'bg-amber-500 text-white ring-4 ring-amber-200 shadow-md scale-110'
                          : 'bg-white text-slate-400 border border-amber-200'
                      }`}
                    >
                      {isDone ? '✓' : st.stepNumber}
                    </button>
                  );
                })}
                <span className="text-sm font-bold text-amber-700">➔ 🏆</span>
              </div>
            </div>
          )}

          {/* Active Card Body */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200 space-y-6">
            {/* Header with Hands-Free Audio Controls */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div>
                <div className="inline-block px-2.5 py-0.5 bg-teal-50 text-teal-700 rounded-full text-xs font-semibold tracking-wide uppercase">
                  Card {currentCardIndex + 1} of {activeDeck.length} • {currentReflex.tierName.split(':')[0]}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                  {activePathway.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  Target: {currentReflex.name} ({currentReflex.aka})
                </p>
              </div>

              {/* Hands-Free Audio Toggles */}
              <div className="flex items-center gap-2 self-start">
                <button
                  onClick={() => setAudioCuesEnabled(!audioCuesEnabled)}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    audioCuesEnabled
                      ? 'bg-teal-100 text-teal-800'
                      : 'bg-slate-100 text-slate-400 hover:text-slate-600'
                  }`}
                  title="Toggle hands-free chime and voice cues"
                >
                  {audioCuesEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  <span>Voice Cues</span>
                </button>

                <button
                  onClick={() => setMetronomeEnabled(!metronomeEnabled)}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    metronomeEnabled
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-slate-100 text-slate-400 hover:text-slate-600'
                  }`}
                  title="Toggle 60 BPM rhythm tick"
                >
                  <Activity className="w-4 h-4" />
                  <span>60 BPM</span>
                </button>

                <button
                  onClick={() => setIsLiteralMode(!isLiteralMode)}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isLiteralMode
                      ? 'bg-purple-100 text-purple-800 ring-2 ring-purple-300'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                  }`}
                  title="Toggle ASD Level 2 literal/concrete instructions"
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  <span>{isLiteralMode ? 'Literal Mode ON' : 'Playful'}</span>
                </button>

                <button
                  onClick={() => setIsPecsMode(!isPecsMode)}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isPecsMode
                      ? 'bg-emerald-100 text-emerald-800 ring-2 ring-emerald-300'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                  }`}
                  title="Toggle ASD Level 3 Visual Schedule PECS Tokens"
                >
                  <span>⭐</span>
                  <span>{isPecsMode ? 'PECS Schedule' : 'PECS'}</span>
                </button>

                <button
                  onClick={() => setShowPlayScript(true)}
                  className="px-2.5 py-1.5 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
                  title="Play story script if child resists"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Story
                </button>

                <button
                  onClick={() => setShowVideoModal(true)}
                  className="px-2.5 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
                >
                  <Video className="w-3.5 h-3.5 text-red-500" /> OT Video
                </button>
              </div>
            </div>

            {/* Exercise Adaptation Pathways (Active vs. Passive vs. Equipment) */}
            {currentReflex.exercisePathways.length > 1 && (
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <span>Adaptation Pathways (Adjust for child's motor capacity):</span>
                  <span className="text-teal-700 font-semibold">{activePathway.categoryLabel}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {currentReflex.exercisePathways.map((pw, pIdx) => {
                    const isSelected = activePathwayIndex === pIdx;
                    const getIcon = () => {
                      switch (pw.category) {
                        case 'primary_movement': return '🌟';
                        case 'assisted_passive': return '🤝';
                        case 'isometric_resistance': return '🛑';
                        case 'rhythmic_movement': return '🌊';
                        case 'equipment_sensory': return '🎈';
                        case 'classroom_desk': return '🏫';
                        case 'active_play': return '🎮';
                        default: return '✨';
                      }
                    };
                    return (
                      <button
                        key={pw.id}
                        onClick={() => handleSelectPathway(pIdx)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-teal-600 text-white shadow-xs'
                            : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                        }`}
                      >
                        <span>{getIcon()}</span>
                        <span>{pw.categoryLabel}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Visual Guide & Interactive Pacer */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <PathwayHeroVisual
                pathway={activePathway}
                activeStepIndex={activeStepIndex}
                onSelectStep={setActiveStepIndex}
                fallbackImageUrl={currentReflex.exercisePathways[0].imageUrl}
                isMetronomePlaying={metronomeEnabled}
              />

              {/* Dynamic Pacer Synchronized with Exercise Phase */}
              <div className="flex flex-col items-center justify-center text-center p-3 space-y-3">
                {currentReflexId === 'moro' || currentReflexId === 'fpr' ? (
                  <>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Somatic Breathing Pacer
                    </div>
                    <div
                      className={`w-28 h-28 rounded-full flex flex-col items-center justify-center transition-all duration-1000 ${
                        pacerPhase === 'inhale'
                          ? 'bg-teal-100 text-teal-800 scale-110 ring-4 ring-teal-300'
                          : 'bg-amber-100 text-amber-800 scale-90 ring-4 ring-amber-300'
                      }`}
                    >
                      <span className="text-xs font-bold uppercase tracking-wider">
                        {pacerPhase === 'inhale' ? 'Inhale Open' : 'Exhale Tuck'}
                      </span>
                      <span className="text-xs opacity-75 mt-0.5">
                        {pacerPhase === 'inhale' ? 'Starfish 4s' : 'Cross Hug 5s'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 max-w-xs">
                      Inhale opens chest; slow exhalation into the cross hug activates parasympathetic calming.
                    </p>
                  </>
                ) : currentReflexId === 'atnr' || currentReflexId === 'amphibian' ? (
                  <>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Bilateral Alternation Pacer
                    </div>
                    <div className="flex items-center gap-3">
                      <div
                        className={`px-4 py-3 rounded-2xl text-center border-2 transition-all ${
                          bilateralSide === 'right'
                            ? 'border-teal-500 bg-teal-50 text-teal-900 font-bold scale-105'
                            : 'border-slate-200 bg-white text-slate-500 font-medium'
                        }`}
                      >
                        <div className="text-xs">Side A</div>
                        <div className="text-sm">Turn RIGHT</div>
                      </div>
                      <div
                        className={`px-4 py-3 rounded-2xl text-center border-2 transition-all ${
                          bilateralSide === 'left'
                            ? 'border-teal-500 bg-teal-50 text-teal-900 font-bold scale-105'
                            : 'border-slate-200 bg-white text-slate-500 font-medium'
                        }`}
                      >
                        <div className="text-xs">Side B</div>
                        <div className="text-sm">Turn LEFT</div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 max-w-xs">
                      Head leads rotation smoothly. Face-side arm/knee flex, skull arm lies straight palm-up.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Rhythmic Movement Cadence
                    </div>
                    <div className="w-24 h-24 rounded-full bg-teal-50 border-4 border-teal-200 flex flex-col items-center justify-center text-teal-700 animate-pulse">
                      <span className="text-lg font-bold">Slow</span>
                      <span className="text-[11px] font-medium">60 BPM Hold</span>
                    </div>
                    <p className="text-xs text-slate-500 max-w-xs">
                      Slow, intentional execution without momentum is what myelinated brainstem tracts require.
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Hemispheric Asymmetry Coaching Alert */}
            {(() => {
              const latScore = scores.lateralized?.[currentReflexId];
              if (!latScore || latScore.left === latScore.right) return null;
              const weakerSide = latScore.left > latScore.right ? 'Left Side Focus' : 'Right Side Focus';
              return (
                <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-2xl flex items-start gap-2.5 text-xs text-indigo-900">
                  <Compass className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Hemispheric Asymmetry Coaching ({weakerSide} • L:{latScore.left} vs R:{latScore.right}): </span>
                    <span>Screener identified unilateral imbalance. <strong>2:1 Hemispheric Rebalance Pacer is active:</strong> The pacer cues 2 slow reps on the weaker side for every 1 on the integrated side to restore bilateral symmetry.</span>
                  </div>
                </div>
              );
            })()}

            {/* Hypotonia Bolster Alert */}
            {childProfile?.muscleTone === 'hypotonic' && (
              <div className="p-3 bg-sky-50 border border-sky-200 rounded-2xl flex items-start gap-2.5 text-xs text-sky-900">
                <HandHeart className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Hypotonia Support: </span>
                  <span>Place a firm rolled towel or yoga bolster under chest/hips to prevent joint hyperextension during holds.</span>
                </div>
              </div>
            )}

            {/* Hypertonia Support Alert */}
            {childProfile?.muscleTone === 'hypertonic_tense' && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-2.5 text-xs text-rose-900">
                <Activity className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Hypertonic / Muscle Spasticity Adaptation: </span>
                  <span>Offer 20s of gentle rhythmic limb rocking and warm beanbag compressions before extension holds to release resting tension.</span>
                </div>
              </div>
            )}

            {/* Sensory Seeker Primer Alert */}
            {childProfile?.sensoryProfile === 'sensory_seeking' && (
              <div className="p-3 bg-violet-50 border border-violet-200 rounded-2xl flex items-start gap-2.5 text-xs text-violet-900">
                <Sparkles className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Sensory Seeker Primer: </span>
                  <span>Offer 30s of deep joint compressions or a weighted blanket lap hug before starting this drill to ground arousal.</span>
                </div>
              </div>
            )}

            {/* Sensory Defensive / Avoidant Callout */}
            {childProfile?.sensoryProfile === 'sensory_defensive' && (
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-2xl flex items-start gap-2.5 text-xs text-purple-900">
                <ShieldAlert className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Sensory Avoidant / Tactile Defensiveness Adaptation: </span>
                  <span>Use firm, predictable palm pressure over light ticklish touch. Dim room lights and lower voice cue volume to prevent autonomic freeze.</span>
                </div>
              </div>
            )}

            {/* Autonomic Overstimulation Clinical Stop-Rule */}
            <div className="p-3 bg-red-50/80 border border-red-200 rounded-2xl text-xs text-red-900 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-red-800">Autonomic Stop-Rule: </span>
                <span>If child exhibits sudden pallor, autonomic sweating, dizziness, or persistent hiccups (vestibular overload), immediately pause drill and switch to Calcaneal Heel Cupping or Fetal Tuck.</span>
              </div>
            </div>

            {/* Clinical Compensation Red Flags Callout */}
            {activePathway.compensationRedFlags && activePathway.compensationRedFlags.length > 0 && (
              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-1 text-xs text-amber-900">
                <div className="font-bold flex items-center gap-1.5 text-amber-800">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" /> Watch for Compensations:
                </div>
                <ul className="list-disc list-inside space-y-0.5 text-[11px] text-amber-800 pl-1">
                  {activePathway.compensationRedFlags.map((flag, i) => (
                    <li key={i}>{flag}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Transient Step sequence */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Movement Timeline & Step Guides:
                </h4>
                <span className="text-[11px] text-teal-700 font-semibold">
                  Click photo to zoom • Highlighted step active
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activePathway.transientSteps.map((st, idx) => (
                  <div
                    key={st.stepNumber}
                    className={`transition-all duration-300 rounded-3xl ${
                      idx === activeStepIndex && isRunning
                        ? 'ring-4 ring-teal-500/80 shadow-lg scale-[1.01]'
                        : ''
                    }`}
                  >
                    <StepIllustration
                      step={st}
                      fallbackImageUrl={activePathway.imageUrl || currentReflex.exercisePathways[0].imageUrl}
                      drillTitle={activePathway.name}
                      isLiteralMode={isLiteralMode}
                      sequenceImageUrl={activePathway.transientSequenceImageUrl}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Timer & Controls Bar */}
            <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div
                  className="text-3xl font-mono font-bold text-slate-800"
                  role="timer"
                  aria-label="Exercise time remaining"
                >
                  {formatTime(timeLeft)}
                </div>
                <div
                  className="w-32 bg-slate-200 h-2.5 rounded-full overflow-hidden"
                  role="progressbar"
                  aria-valuenow={Math.round(progressPercent)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="bg-teal-500 h-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center flex-wrap gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isRunning
                      ? 'bg-amber-500 hover:bg-amber-600 text-white'
                      : 'bg-teal-600 hover:bg-teal-700 text-white shadow-sm'
                  }`}
                >
                  {isRunning ? (
                    <>
                      <Pause className="w-4 h-4" /> Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" /> Start Timer
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    setTimeLeft(activePathway.durationSeconds);
                    setIsRunning(false);
                  }}
                  className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-all cursor-pointer"
                  title="Reset Timer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* 1-Tap Micro-Win Downshift */}
                <button
                  onClick={triggerMicroWin}
                  className="px-3 py-2 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                  title="Struggling today? Downshift to a 60-second micro-win"
                >
                  ⚡ 60s Micro-Win
                </button>

                {/* 1-Tap Switch to Passive */}
                {activePathway.category !== 'assisted_passive' && (
                  <button
                    onClick={switchToPassivePathway}
                    className="px-3 py-2 bg-amber-50 text-amber-800 hover:bg-amber-100 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                    title="Switch to hands-on passive repatterning"
                  >
                    🤝 Make Passive
                  </button>
                )}

                <button
                  onClick={handleDrillFinished}
                  className="flex-1 sm:flex-initial px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" /> Done ✓
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Transition Buffer Screen (10-Second High-Five Breather between cards) */}
      {step === 'transition_buffer' && (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto text-3xl font-bold">
            ✋
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            Great Job! High-Five Breather
          </h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Take a deep breath and give {childName} a warm high-five or hug before moving to Card {currentCardIndex + 2}.
          </p>

          <div className="w-24 h-24 rounded-full bg-teal-50 border-4 border-teal-400 flex items-center justify-center mx-auto font-mono text-3xl font-bold text-teal-700">
            {bufferTimeLeft}s
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={proceedToNextCard}
              className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Next Card: {REFLEX_DATABASE[activeDeck[currentCardIndex + 1]]?.name.split(' ')[0]}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setBufferTimeLeft((prev) => prev + 20)}
              className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl transition-all cursor-pointer"
            >
              +20s More Rest
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Post-session State Check & Quality Logging */}
      {step === 'post_check' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> Daily Routine Complete!
            </div>
            <h2 className="text-2xl font-bold text-slate-800">
              How does {childName} feel now?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              Logging nervous system state and movement quality tracks true neuroplastic integration over the 4–8 week cycle.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: 'red', label: 'Overload State (SOS)', desc: 'Still upset or fight-or-flight', color: 'border-red-400 bg-red-50 text-red-700', icon: AlertCircle },
              { id: 'yellow', label: 'Revved-Up State (Buzzing)', desc: 'Still fidgety / sensory seeking', color: 'border-amber-400 bg-amber-50 text-amber-700', icon: Frown },
              { id: 'green', label: 'Anchored State (Ready)', desc: 'Calm, grounded, connected & ready', color: 'border-emerald-400 bg-emerald-50 text-emerald-700', icon: Smile },
              { id: 'blue', label: 'Low-Battery State (Resting)', desc: 'Drowsy, low energy, ready for rest', color: 'border-blue-400 bg-blue-50 text-blue-700', icon: Meh }
            ].map((zone) => {
              const Icon = zone.icon;
              const isSelected = postZone === zone.id;
              return (
                <button
                  key={zone.id}
                  onClick={() => setPostZone(zone.id as RegulationZone)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                    isSelected ? `${zone.color} ring-2 ring-offset-2 ring-slate-400 font-semibold shadow-xs` : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-6 h-6 mb-2" />
                  <div className="font-semibold text-sm">{zone.label}</div>
                  <div className="text-[11px] text-slate-500 mt-1 leading-tight">{zone.desc}</div>
                </button>
              );
            })}
          </div>

          {/* Movement Quality Selector */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Movement Quality Observed Today:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { id: 'smooth_slow', label: '🌟 Smooth & Controlled', desc: 'Slow, fluid execution with calm breathing' },
                { id: 'assisted_passive', label: '🤝 Parent-Assisted / Passive', desc: 'Parent provided physical guiding or pressure' },
                { id: 'rushed_compensated', label: '⚡ Rushed with Momentum', desc: 'Fast movement, breath-holding, or compensations' },
                { id: 'micro_win', label: '🌱 60-Second Micro-Win', desc: 'Shortened duration to prevent meltdown' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setMovementQuality(opt.id as MovementQuality)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    movementQuality === opt.id
                      ? 'border-teal-600 bg-white ring-2 ring-teal-200 font-semibold'
                      : 'border-slate-200 bg-white/60 hover:bg-white text-slate-600'
                  }`}
                >
                  <div className="text-xs font-bold text-slate-900">{opt.label}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Compensations Observed Checkboxes */}
          <div className="space-y-1.5 text-xs text-slate-700">
            <span className="font-semibold text-slate-600">Compensations noticed (optional):</span>
            <div className="flex flex-wrap gap-2">
              {[
                'Held breath (Valsalva)',
                'Pelvis lifted / Hip hiked',
                'Elbows bent in Cat-Cow',
                'Head jutted into hyperextension',
                'Tactile resistance'
              ].map((comp) => {
                const isChecked = selectedCompensations.includes(comp);
                return (
                  <button
                    key={comp}
                    type="button"
                    onClick={() => {
                      if (isChecked) {
                        setSelectedCompensations((prev) => prev.filter((c) => c !== comp));
                      } else {
                        setSelectedCompensations((prev) => [...prev, comp]);
                      }
                    }}
                    className={`px-2.5 py-1 rounded-lg border text-xs transition-all cursor-pointer ${
                      isChecked
                        ? 'bg-amber-100 text-amber-900 border-amber-300 font-medium'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {isChecked ? '✓ ' : '+ '} {comp}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notes Input */}
          <div>
            <textarea
              id="caregiver-session-notes"
              aria-label="Caregiver session notes"
              value={sessionNotes}
              onChange={(e) => setSessionNotes(e.target.value)}
              placeholder="Caregiver notes (e.g. Leo loved the lizard story today, breathing was calm)..."
              className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none h-20"
            />
          </div>

          <button
            onClick={finishSession}
            className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer"
          >
            Save Today's Session & Streak 🌟
          </button>
        </div>
      )}

      {/* Step 4: Celebration Screen */}
      {step === 'completed' && (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-3xl">
            🎉
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            Brilliant Work Today!
          </h2>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            You completed 10 minutes of deliberate neuro-motor co-regulation with {childName}. Every gentle repetition builds myelinated inhibitory pathways in the brainstem.
          </p>
          <div className="p-4 bg-teal-50 rounded-2xl border border-teal-100 text-teal-800 text-sm font-medium flex flex-col sm:flex-row items-center justify-center gap-3">
            <div>
              Autonomic Shift: <span className="font-bold uppercase">{preZone === 'red' ? 'Overload (SOS)' : preZone === 'yellow' ? 'Revved-Up' : preZone === 'green' ? 'Anchored' : 'Low-Battery'} State</span> ➔{' '}
              <span className="font-bold uppercase">{postZone === 'red' ? 'Overload (SOS)' : postZone === 'yellow' ? 'Revved-Up' : postZone === 'green' ? 'Anchored' : 'Low-Battery'} State</span>
            </div>
            <span className="hidden sm:inline text-teal-300">•</span>
            <div className="text-xs bg-white px-2.5 py-1 rounded-lg border border-teal-200 font-bold">
              {movementQuality.replace('_', ' ').toUpperCase()}
            </div>
          </div>
          <button
            onClick={() => {
              setStep('pre_check');
              setCompletedExercises([]);
              setCurrentCardIndex(0);
            }}
            className="px-6 py-3 bg-slate-800 hover:bg-slate-900 text-white text-sm font-bold rounded-xl shadow-sm transition-all cursor-pointer"
          >
            Start Another Circuit or Return Home
          </button>
        </div>
      )}

      {/* Resistance Play Script Modal */}
      {showPlayScript && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="play-script-title"
        >
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-xl border border-purple-100">
            <div className="flex items-center justify-between">
              <div id="play-script-title" className="flex items-center gap-2 text-purple-700 font-bold text-base">
                <Sparkles className="w-5 h-5" /> Child Resisting? Play Story Script
              </div>
              <button
                onClick={() => setShowPlayScript(false)}
                aria-label="Close modal"
                className="text-slate-400 hover:text-slate-600 p-1 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100 text-purple-900 text-sm leading-relaxed">
              {activePathway.resistancePlayScript}
            </div>
            <button
              onClick={() => setShowPlayScript(false)}
              className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-sm transition-all cursor-pointer"
            >
              Got it, let's play!
            </button>
          </div>
        </div>
      )}

      {/* Video Demonstration Modal */}
      {showVideoModal && (
        <div
          className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="circuit-video-modal-title"
        >
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h4 id="circuit-video-modal-title" className="font-bold text-slate-900 text-base sm:text-lg">
                  Demonstration Video: {activePathway.name}
                </h4>
                <p className="text-xs text-slate-500">
                  {currentReflex.primaryVideo.title}
                </p>
              </div>
              <button
                onClick={() => setShowVideoModal(false)}
                aria-label="Close modal"
                className="text-slate-400 hover:text-slate-600 p-2 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <PrivacyVideoPlayer
              youtubeId={currentReflex.primaryVideo.youtubeId}
              title={currentReflex.primaryVideo.title}
              youtubeUrl={currentReflex.primaryVideo.youtubeUrl}
              thumbnailUrl={currentReflex.exercisePathways[0]?.imageUrl}
            />

            <div className="flex items-center justify-end pt-1">
              <button
                onClick={() => setShowVideoModal(false)}
                className="px-4 py-2 bg-slate-800 text-white font-semibold text-xs rounded-xl cursor-pointer"
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

import React, { useState, useEffect } from "react";
import {
  Printer,
  X,
  ShieldAlert,
  Heart,
  Compass,
  Sparkles,
  AlertTriangle,
  Clock,
  Activity,
  Layers,
  CheckCircle2
} from "lucide-react";
import { REFLEX_DATABASE } from "../data/reflexData";
import type { ReflexId, ReflexInfo } from "../types";
import { getAssetUrl } from "../utils/assets";

interface ReflexHandoutModalProps {
  initialReflexId?: ReflexId;
  isOpen: boolean;
  onClose: () => void;
}

export const ReflexHandoutModal: React.FC<ReflexHandoutModalProps> = ({
  initialReflexId = "moro",
  isOpen,
  onClose,
}) => {
  const [selectedId, setSelectedId] = useState<ReflexId>(initialReflexId);
  const [selectedPathwayIndex, setSelectedPathwayIndex] = useState(0);

  useEffect(() => {
    if (initialReflexId) {
      setSelectedId(initialReflexId);
      setSelectedPathwayIndex(0);
    }
  }, [initialReflexId]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const reflex: ReflexInfo = REFLEX_DATABASE[selectedId] || REFLEX_DATABASE["moro"];
  const activePathway = reflex.exercisePathways[selectedPathwayIndex] || reflex.exercisePathways[0];
  const allReflexIds = Object.keys(REFLEX_DATABASE) as ReflexId[];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-6 overflow-y-auto print:p-0 print:bg-white print:static print:inset-auto print:overflow-visible"
      role="dialog"
      aria-modal="true"
      aria-labelledby="handout-modal-title"
    >
      {/* Container Card */}
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden print:max-h-none print:shadow-none print:rounded-none print:border-none print:w-full print:max-w-none">
        {/* Screen-Only Control Toolbar (Hidden on Print) */}
        <div className="p-3.5 sm:p-4 border-b border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-xs shrink-0">
              <Printer className="w-4 h-4" />
            </span>
            <div>
              <h2 id="handout-modal-title" className="text-sm sm:text-base font-extrabold text-slate-900 leading-tight">
                Printable Parent & Clinical Handout
              </h2>
              <p className="text-[11px] text-slate-500">
                1-Click clean print / PDF save • Includes Retained vs Integrated photos & step transitions
              </p>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-2">
            {/* Quick Reflex Selector */}
            <select
              value={selectedId}
              onChange={(e) => {
                setSelectedId(e.target.value as ReflexId);
                setSelectedPathwayIndex(0);
              }}
              className="text-xs font-semibold px-2.5 py-1.5 bg-white border border-slate-300 rounded-xl text-slate-800 shadow-xs focus:ring-2 focus:ring-teal-500 focus:outline-hidden cursor-pointer"
            >
              {allReflexIds.map((id) => (
                <option key={id} value={id}>
                  {REFLEX_DATABASE[id].name}
                </option>
              ))}
            </select>

            {/* Pathway Selector */}
            {reflex.exercisePathways.length > 1 && (
              <select
                value={selectedPathwayIndex}
                onChange={(e) => setSelectedPathwayIndex(Number(e.target.value))}
                className="text-xs font-semibold px-2.5 py-1.5 bg-white border border-slate-300 rounded-xl text-slate-800 shadow-xs focus:ring-2 focus:ring-teal-500 focus:outline-hidden cursor-pointer max-w-[180px] truncate"
              >
                {reflex.exercisePathways.map((pw, idx) => (
                  <option key={pw.id} value={idx}>
                    {pw.name}
                  </option>
                ))}
              </select>
            )}

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-all cursor-pointer"
              title="Close Handout"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-6 print:p-4 print:space-y-4 print:overflow-visible text-slate-900 text-sm leading-relaxed">
          {/* Handout Header */}
          <div className="border-b-2 border-teal-700 pb-3 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-teal-700">
                <span>KineticBloom • Clinical Home Protocol</span>
                <span>•</span>
                <span>Parent & Therapist Handout</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
                {reflex.name}
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 italic">
                {reflex.aka}
              </p>
            </div>

            <div className="text-left sm:text-right text-xs space-y-1 shrink-0">
              <span className="inline-block px-2.5 py-0.5 bg-teal-50 text-teal-800 border border-teal-200 rounded-lg font-bold">
                {reflex.tierName}
              </span>
              <div className="text-slate-500 text-[11px]">
                Target: 4–6 Weeks Daily Practice
              </div>
            </div>
          </div>

          {/* Child Fill-In Info Row for Fridge Tracking */}
          <div className="grid grid-cols-3 gap-3 p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs font-medium print:bg-white print:border-slate-300">
            <div>
              <span className="text-slate-500 font-bold">Child Name: </span>
              <span className="border-b border-slate-400 inline-block w-28">&nbsp;</span>
            </div>
            <div>
              <span className="text-slate-500 font-bold">Start Date: </span>
              <span className="border-b border-slate-400 inline-block w-24">&nbsp;</span>
            </div>
            <div>
              <span className="text-slate-500 font-bold">Re-Check Date: </span>
              <span className="border-b border-slate-400 inline-block w-24">&nbsp;</span>
            </div>
          </div>

          {/* Section 1: Why This Matters (Daily Impact on Child) */}
          <div className="space-y-1.5">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-teal-700" />
              <span>1. Why This Matters in Daily Life</span>
            </h3>
            <p className="text-xs text-slate-700 leading-normal">
              {reflex.description}
            </p>
            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-3 space-y-1 print:bg-white print:border-slate-300">
              <span className="text-[11px] font-bold text-amber-900 block">
                Common Signs of Retention at Home & School:
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-slate-800 list-disc list-inside">
                {reflex.functionalSigns.map((sign, idx) => (
                  <li key={idx} className="leading-snug">
                    {sign}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 2: 3-Minute Quick At-Home Assessment + Retained vs Integrated Image */}
          <div className="space-y-2.5 break-inside-avoid">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-teal-700" />
                <span>2. 3-Minute At-Home Reflex Check & Visual Comparison</span>
              </h3>
              <span className="text-[11px] font-bold text-slate-500">
                Observe Somatic Reaction
              </span>
            </div>

            {/* Visual Retained vs. Integrated Diagnostic Comparison Image */}
            {reflex.assessment.retainedVsIntegratedImageUrl && (
              <div className="rounded-2xl border-2 border-slate-200 overflow-hidden bg-slate-50 shadow-xs print:bg-white print:border-slate-300 print:shadow-none">
                <div className="px-3 py-1.5 bg-slate-100/90 border-b border-slate-200 flex items-center justify-between text-[11px] font-bold text-slate-700 print:bg-white print:border-slate-300">
                  <span className="flex items-center gap-1.5 text-amber-900">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span>Visual Comparison Guide: Retained (Needs Integration) vs. Integrated (Resolved)</span>
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">
                    Clinical Photography Reference
                  </span>
                </div>
                <div className="p-2 sm:p-3 flex items-center justify-center bg-white">
                  <img
                    src={getAssetUrl(reflex.assessment.retainedVsIntegratedImageUrl)}
                    alt={`${reflex.name} Retained vs Integrated Visual Comparison`}
                    loading="eager"
                    className="w-full max-h-56 sm:max-h-64 object-contain rounded-xl print:max-h-48"
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1 print:bg-white print:border-slate-300">
                <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wider">
                  Test Setup & Stimulus:
                </span>
                <p className="text-slate-700">
                  <strong className="text-slate-900">Setup: </strong>
                  {reflex.assessment.setup}
                </p>
                <p className="text-slate-700 pt-0.5">
                  <strong className="text-slate-900">Action: </strong>
                  {reflex.assessment.action}
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1 print:bg-white print:border-slate-300">
                <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wider">
                  What You Are Looking For:
                </span>
                <div className="text-[11px] space-y-1">
                  <div className="flex items-start gap-1 text-red-900">
                    <span className="font-bold shrink-0">⚠️ Retained:</span>
                    <span>{reflex.assessment.retainedCharacteristics[0]}</span>
                  </div>
                  <div className="flex items-start gap-1 text-emerald-900">
                    <span className="font-bold shrink-0">✅ Integrated:</span>
                    <span>{reflex.assessment.integratedCharacteristics[0]}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Safety Caution Callout */}
            <div className="p-2 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 flex items-start gap-2 print:bg-white print:border-slate-300">
              <ShieldAlert className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
              <div className="leading-tight">
                <strong className="font-bold">Safety Rule: </strong>
                <span>{reflex.assessment.safetyCaution}</span>
              </div>
            </div>
          </div>

          {/* Section 3: Realistic 6-Week Home Integration Protocol */}
          <div className="space-y-2 break-inside-avoid">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-teal-700" />
              <span>3. Realistic 6-Week Home Protocol</span>
            </h3>

            {/* Protocol Dosage Summary Strip */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 bg-teal-50 rounded-xl border border-teal-200 font-medium print:bg-white print:border-slate-300">
                <div className="text-[10px] text-teal-800 font-bold uppercase">Daily Time</div>
                <div className="text-sm font-black text-teal-950">5–8 Minutes</div>
                <div className="text-[10px] text-teal-700">1x Daily • Consistency over duration</div>
              </div>
              <div className="p-2 bg-teal-50 rounded-xl border border-teal-200 font-medium print:bg-white print:border-slate-300">
                <div className="text-[10px] text-teal-800 font-bold uppercase">Cadence</div>
                <div className="text-sm font-black text-teal-950">{activePathway.metronomeBpm || 60} BPM</div>
                <div className="text-[10px] text-teal-700">Slow, rhythmic heartbeat tempo</div>
              </div>
              <div className="p-2 bg-teal-50 rounded-xl border border-teal-200 font-medium print:bg-white print:border-slate-300">
                <div className="text-[10px] text-teal-800 font-bold uppercase">Best Timing</div>
                <div className="text-sm font-black text-teal-950">Before Bed / Reset</div>
                <div className="text-[10px] text-teal-700">Calm room, low sensory noise</div>
              </div>
            </div>

            {/* 3-Phase Progression Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-0.5 print:bg-white print:border-slate-300">
                <span className="font-bold text-teal-800 block text-[11px] uppercase">
                  Weeks 1–2: Foundation
                </span>
                <p className="text-slate-700 leading-snug">
                  <strong>Gentle Co-Regulation: </strong> Focus on safety, slow belly breathing, and 2–3 slow holds. Never force past resistance.
                </p>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-0.5 print:bg-white print:border-slate-300">
                <span className="font-bold text-teal-800 block text-[11px] uppercase">
                  Weeks 3–4: Active Reps
                </span>
                <p className="text-slate-700 leading-snug">
                  <strong>Smooth Execution: </strong> {activePathway.targetReps}. Child leads movement with parent gentle guidance.
                </p>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-0.5 print:bg-white print:border-slate-300">
                <span className="font-bold text-teal-800 block text-[11px] uppercase">
                  Weeks 5–6: Automation
                </span>
                <p className="text-slate-700 leading-snug">
                  <strong>Cross-Body Integration: </strong> Seamless transitions without breath-holding or limb compensations. Re-test reflex.
                </p>
              </div>
            </div>

            {/* When Child Resists Play Script */}
            <div className="p-2.5 bg-purple-50/70 border border-purple-200 rounded-xl text-xs text-purple-950 flex items-start gap-2 print:bg-white print:border-slate-300">
              <Sparkles className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
              <div className="leading-tight">
                <strong className="font-bold">Play Script (When Child Resists): </strong>
                <span>{activePathway.resistancePlayScript}</span>
              </div>
            </div>
          </div>

          {/* Section 4: Primary Exercise Step-by-Step Guide with Dedicated Image Transitions */}
          <div className="space-y-2.5 break-inside-avoid">
            <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-teal-700" />
                <span>4. Step-by-Step Exercise Posture Guide: {activePathway.name}</span>
              </h3>
              <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-lg border border-teal-200">
                {activePathway.targetReps}
              </span>
            </div>

            {/* Step Grid: Dedicated Visual Transition Image for Every Step */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activePathway.transientSteps.map((step) => {
                const stepImg = step.imageUrl ? getAssetUrl(step.imageUrl) : null;
                const sequenceImg = activePathway.transientSequenceImageUrl ? getAssetUrl(activePathway.transientSequenceImageUrl) : null;

                return (
                  <div
                    key={step.stepNumber}
                    className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs flex flex-col justify-between print:bg-white print:border-slate-300 print:break-inside-avoid"
                  >
                    <div>
                      {/* Step Card Header */}
                      <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                        <span className="font-bold text-slate-900 flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-teal-700 text-white flex items-center justify-center text-[10px] font-bold shadow-2xs">
                            {step.stepNumber}
                          </span>
                          <span>{step.title}</span>
                        </span>
                        <span className="text-[9px] font-bold text-slate-500 uppercase px-1.5 py-0.5 bg-slate-200/60 rounded">
                          Phase: {step.phase}
                        </span>
                      </div>

                      {/* Dedicated Step Transition Posture Image */}
                      <div className="relative h-36 sm:h-40 w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center my-2 print:border-slate-300">
                        {stepImg ? (
                          <img
                            src={stepImg}
                            alt={`Step ${step.stepNumber}: ${step.title}`}
                            loading="eager"
                            className="w-full h-full object-cover"
                          />
                        ) : sequenceImg ? (
                          <div className="w-full h-full overflow-hidden flex items-center justify-center bg-slate-100">
                            <img
                              src={sequenceImg}
                              alt={`Step ${step.stepNumber}: ${step.title}`}
                              loading="eager"
                              style={{
                                objectFit: 'cover',
                                width: '100%',
                                height: '100%',
                                ...(step.stepNumber === 1 ? { objectPosition: '0% 0%', transform: 'scale(2)', transformOrigin: '0% 0%' } :
                                   step.stepNumber === 2 ? { objectPosition: '100% 0%', transform: 'scale(2)', transformOrigin: '100% 0%' } :
                                   step.stepNumber === 3 ? { objectPosition: '0% 100%', transform: 'scale(2)', transformOrigin: '0% 100%' } :
                                   { objectPosition: '100% 100%', transform: 'scale(2)', transformOrigin: '100% 100%' })
                              }}
                            />
                          </div>
                        ) : (
                          <img
                            src={getAssetUrl(activePathway.imageUrl)}
                            alt={`Step ${step.stepNumber}: ${step.title}`}
                            loading="eager"
                            className="w-full h-full object-cover"
                          />
                        )}
                        <div className="absolute top-1.5 left-1.5 bg-slate-900/75 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded-md shadow-xs print:hidden">
                          Step {step.stepNumber} Posture Transition
                        </div>
                      </div>

                      {/* DO Action Instruction */}
                      <p className="text-slate-800 font-medium leading-snug">
                        <strong className="text-slate-900 font-bold">Action: </strong>
                        {step.actionInstruction}
                      </p>

                      {/* SAY Parent Script */}
                      <p className="text-purple-900 italic text-[11px] leading-snug bg-purple-50 p-1.5 rounded-lg border border-purple-100 mt-1 print:bg-transparent print:border-none print:p-0">
                        <strong className="text-purple-950 font-bold not-italic">SAY: </strong>
                        "{step.parentCue}"
                      </p>
                    </div>

                    {/* Step Alignment / Compensation Footer */}
                    <div className="pt-1 space-y-1">
                      {step.compensationWarning && (
                        <div className="text-amber-800 text-[10px] flex items-center gap-1 font-semibold">
                          <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0" />
                          <span>Watch: {step.compensationWarning}</span>
                        </div>
                      )}
                      {step.alignmentCheck && (
                        <div className="text-emerald-700 text-[10px] flex items-center gap-1 font-medium">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span>Align: {step.alignmentCheck}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 5: Common Compensations to Watch Out For */}
          <div className="space-y-1.5 break-inside-avoid">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>5. Common Compensations (Cheats to Gently Correct)</span>
            </h3>
            <div className="p-2.5 bg-amber-50/70 border border-amber-200 rounded-2xl text-xs text-amber-950 space-y-1 print:bg-white print:border-slate-300">
              <ul className="list-disc list-inside space-y-0.5">
                {activePathway.compensationRedFlags?.map((flag, idx) => (
                  <li key={idx}>
                    <span className="font-semibold text-amber-950">{flag}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[10px] text-amber-800 pt-0.5 italic">
                Tip: Never scold a child for compensating. Simply pause, gently touch the aligned joint, and say: "Let's do one slow one together."
              </p>
            </div>
          </div>

          {/* Section 6: Refrigerator 30-Day Checkbox Chart */}
          <div className="space-y-1.5 border-t-2 border-slate-200 pt-3 break-inside-avoid">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <span>📅</span>
                <span>6. Refrigerator Progress Tracker (30 Days of Practice)</span>
              </h3>
              <span className="text-[10px] text-slate-500 font-medium">
                Tick or add a star sticker each day on the fridge!
              </span>
            </div>

            <div className="grid grid-cols-6 sm:grid-cols-10 gap-1.5 text-center text-xs">
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className="p-1 sm:p-1.5 border border-slate-300 rounded-xl bg-slate-50 flex flex-col items-center justify-between h-11 print:bg-white print:border-slate-400"
                >
                  <span className="text-[9px] font-bold text-slate-500">Day {i + 1}</span>
                  <div className="w-3.5 h-3.5 rounded-md border border-slate-400 mt-0.5"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 7: Emergency Co-Regulation & Meltdown Bailout Box */}
          <div className="p-3 bg-rose-50 border-2 border-rose-300 rounded-2xl space-y-1 text-xs text-rose-950 break-inside-avoid print:bg-white print:border-rose-300">
            <div className="flex items-center gap-1.5 font-black text-rose-900 text-xs uppercase tracking-wider">
              <Heart className="w-4 h-4 text-rose-600" />
              <span>🆘 Meltdown Bailout (If Your Child Becomes Overwhelmed)</span>
            </div>
            <p className="leading-snug">
              If your child cries, resists intensely, or goes into sensory freeze: <strong>STOP the exercise immediately.</strong>
            </p>
            <ol className="list-decimal list-inside space-y-0.5 text-[11px] text-rose-900 pt-0.5">
              <li>Place one warm flat hand on upper chest, and one warm hand on mid-back between shoulder blades.</li>
              <li>Slow down your own breathing (4-second inhale, 6-second exhale) so child's nervous system co-regulates with yours.</li>
              <li>Whisper: <em>"You are safe. We are done for today."</em> Give water and a warm hug.</li>
            </ol>
          </div>

          {/* Section 8: Pedagogical / Medical Disclaimer */}
          <div className="border-t border-slate-200 pt-2.5 text-[9px] text-slate-500 text-center space-y-0.5 print:border-slate-300">
            <p>
              KineticBloom is an educational platform for pediatric motor development and primitive reflex integration.
              This handout is intended for home co-regulation under parental supervision and is not a medical diagnosis.
            </p>
            <p className="font-semibold text-slate-600">
              Open-Source Pedagogical Guide • Zero-PII • https://nagarajulu.github.io/kinetic-bloom/
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

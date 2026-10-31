import React, { useState, useEffect } from "react";
import { CheckCircle2, AlertTriangle, Maximize2, X, Sparkles, Compass, ShieldAlert } from "lucide-react";
import type { TransientStep } from "../types";
import { PediatricOtDiagram } from "./PediatricOtDiagrams";
import { getAssetUrl } from "../utils/assets";

interface StepIllustrationProps {
  step: TransientStep;
  fallbackImageUrl?: string;
  drillTitle?: string;
  isLiteralMode?: boolean;
  sequenceImageUrl?: string;
}

export const StepIllustration: React.FC<StepIllustrationProps> = ({
  step,
  fallbackImageUrl,
  drillTitle = "Exercise",
  isLiteralMode = false,
  sequenceImageUrl,
}) => {
  const activeImage = getAssetUrl(step.imageUrl || fallbackImageUrl);
  const resolvedSequenceUrl = getAssetUrl(sequenceImageUrl);
  const hasDiagram = Boolean(step.diagramType);
  const hasDedicatedStepPhoto = Boolean(
    sequenceImageUrl || (step.imageUrl && fallbackImageUrl && step.imageUrl !== fallbackImageUrl)
  );
  const [cardView, setCardView] = useState<"diagram" | "photo">(hasDiagram ? "diagram" : "photo");
  const [showModal, setShowModal] = useState(false);
  const [modalTab, setModalTab] = useState<"diagram" | "photo">("diagram");

  useEffect(() => {
    if (!showModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowModal(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showModal]);

  const phaseColors = {
    setup: "bg-indigo-50 text-indigo-700 border-indigo-200",
    begin: "bg-indigo-50 text-indigo-700 border-indigo-200",
    transient: "bg-amber-50 text-amber-800 border-amber-200",
    finish: "bg-emerald-50 text-emerald-800 border-emerald-200",
  };

  const phaseLabels = {
    setup: "Phase 1: Setup",
    begin: "Phase 1: Setup",
    transient: "Phase 2: Movement",
    finish: "Phase 3: Integration",
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
      {/* Card Header: Step number, phase, and title */}
      <div className="p-3.5 pb-2 border-b border-slate-100 flex items-center justify-between gap-2 bg-slate-50/50">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-xs">
            {step.stepNumber}
          </span>
          <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border shrink-0 ${phaseColors[step.phase] || phaseColors.transient}`}>
            {phaseLabels[step.phase] || step.phase}
          </span>
          <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
            {step.title}
          </h4>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="p-1.5 text-slate-400 hover:text-teal-700 hover:bg-teal-50 rounded-xl transition-all cursor-pointer shrink-0"
          title="Inspect Biomechanics & Alignment"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Hero Visual Area: OT Diagram by Default, 1-Tap Toggle to Photo */}
      <div
        className="relative h-48 sm:h-52 w-full bg-slate-50 flex items-center justify-center cursor-pointer group overflow-hidden border-b border-slate-100"
        onClick={() => setShowModal(true)}
      >
        {/* Toggle between Diagram and Reference Photo */}
        {hasDiagram && activeImage && (
          <div
            className="absolute top-2 right-2 z-10 flex bg-white/95 backdrop-blur-xs p-0.5 rounded-lg border border-slate-200 shadow-xs text-[10px]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setCardView("diagram")}
              className={`px-2 py-0.5 rounded-md font-bold transition-all cursor-pointer ${
                cardView === "diagram" ? "bg-teal-700 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              📐 Diagram
            </button>
            <button
              type="button"
              onClick={() => setCardView("photo")}
              className={`px-2 py-0.5 rounded-md font-bold transition-all cursor-pointer ${
                cardView === "photo" ? "bg-teal-700 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {hasDedicatedStepPhoto ? "📷 Step Photo" : "📷 Reflex Overview"}
            </button>
          </div>
        )}

        {cardView === "diagram" && hasDiagram ? (
          <div className="w-full h-full p-2.5 flex items-center justify-center bg-slate-50/80">
            <PediatricOtDiagram
              diagramType={step.diagramType}
              phase={step.phase}
              stepNumber={step.stepNumber}
              alignmentCheck={step.alignmentCheck}
              compensationWarning={step.compensationWarning}
              isLiteralMode={isLiteralMode}
            />
          </div>
        ) : resolvedSequenceUrl ? (
          <div className="w-full h-full overflow-hidden flex items-center justify-center bg-slate-100">
            <img
              src={resolvedSequenceUrl}
              alt={step.title}
              loading="lazy"
              decoding="async"
              width={1200}
              height={896}
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%',
                ...(step.stepNumber === 1 ? { objectPosition: '0% 0%', transform: 'scale(2)', transformOrigin: '0% 0%' } :
                   step.stepNumber === 2 ? { objectPosition: '100% 0%', transform: 'scale(2)', transformOrigin: '100% 0%' } :
                   step.stepNumber === 3 ? { objectPosition: '0% 100%', transform: 'scale(2)', transformOrigin: '0% 100%' } :
                   { objectPosition: '100% 100%', transform: 'scale(2)', transformOrigin: '100% 100%' })
              }}
              className="transition-transform duration-300"
            />
          </div>
        ) : activeImage ? (
          <img
            src={activeImage}
            alt={step.title}
            loading="lazy"
            decoding="async"
            width={1200}
            height={896}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full p-2.5 flex items-center justify-center bg-slate-50/80">
            <PediatricOtDiagram
              diagramType="mat_setup"
              phase={step.phase}
              stepNumber={step.stepNumber}
              alignmentCheck={step.alignmentCheck}
              compensationWarning={step.compensationWarning}
              isLiteralMode={isLiteralMode}
            />
          </div>
        )}

        {/* Alignment Check Overlay Pill */}
        {step.alignmentCheck && (
          <div className="absolute top-2 left-2 bg-slate-900/75 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-lg flex items-center gap-1 shadow-sm">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span className="truncate max-w-[170px]">{step.alignmentCheck}</span>
          </div>
        )}

        {/* Hover Zoom Hint */}
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/85 backdrop-blur-xs text-white text-[10px] font-semibold px-2.5 py-1 rounded-xl flex items-center gap-1 shadow-md">
          <Maximize2 className="w-3.5 h-3.5" />
          <span>Inspect Full-Res</span>
        </div>
      </div>

      {/* 3-Second Rule Caregiver Directives */}
      <div className="p-3.5 space-y-2.5 flex-1 flex flex-col justify-between text-xs">
        {/* DO Directive */}
        <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
          <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
            <Compass className="w-3.5 h-3.5 text-teal-600" />
            <span>DO (Movement Action):</span>
          </div>
          <p className="text-slate-800 font-semibold text-xs leading-snug">
            {step.actionInstruction}
          </p>
        </div>

        {/* SAY Script (Adaptive: Playful vs Literal for ASD Level 2) */}
        <div className="p-2.5 bg-purple-50/70 rounded-2xl border border-purple-100 space-y-1">
          <div className="flex items-center justify-between text-[10px] font-extrabold uppercase tracking-wider text-purple-700">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>SAY (Parent Script):</span>
            </span>
            {isLiteralMode && (
              <span className="text-[9px] bg-purple-200/80 text-purple-900 px-1.5 py-0.2 rounded-md font-bold">
                Literal Mode
              </span>
            )}
          </div>
          <p className="text-purple-950 font-medium italic text-xs leading-snug">
            \"{isLiteralMode ? (step.alignmentCheck || step.postureDescription) : step.parentCue}\"
          </p>
        </div>

        {/* WATCH / COMPENSATION RED FLAG */}
        {step.compensationWarning && (
          <div className="p-2 px-2.5 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 text-[11px] flex items-start gap-1.5 font-medium">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
            <div className="leading-tight">
              <strong className="text-amber-800 font-bold">WATCH: </strong>
              <span>{step.compensationWarning}</span>
            </div>
          </div>
        )}

        {/* Breath & Alignment Badges */}
        <div className="flex items-center justify-between gap-2 pt-1 text-[10px] border-t border-slate-100 text-slate-500">
          {step.breathCue ? (
            <span className="flex items-center gap-1 text-teal-700 font-medium truncate">
              <span>🌬️</span> <span>{step.breathCue}</span>
            </span>
          ) : (
            <span></span>
          )}
          {step.alignmentCheck && (
            <span className="flex items-center gap-1 text-emerald-700 font-semibold shrink-0">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span className="truncate max-w-[130px]">{step.alignmentCheck}</span>
            </span>
          )}
        </div>
      </div>

      {/* Expanded Modal: Full-Screen Biomechanical Inspection */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="step-modal-title"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-3xl w-full p-5 sm:p-7 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
                    Step {step.stepNumber} • {step.phase.toUpperCase()}
                  </span>
                  <span className="text-xs text-slate-500">• {drillTitle}</span>
                </div>
                <h3 id="step-modal-title" className="font-extrabold text-base sm:text-lg text-slate-900">
                  {step.title}
                </h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                aria-label="Close modal"
                className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal View Selector: Diagram vs Photo */}
            <div className="flex items-center justify-between gap-2 pb-1">
              <div className="flex bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setModalTab("diagram")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    modalTab === "diagram" ? "bg-white text-teal-800 shadow-xs" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  📐 Anatomical Biomechanics
                </button>
                {activeImage && (
                  <button
                    onClick={() => setModalTab("photo")}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      modalTab === "photo" ? "bg-white text-teal-800 shadow-xs" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {hasDedicatedStepPhoto ? "📷 Step Photo Reference" : "📷 Reflex Overview Photo"}
                  </button>
                )}
              </div>
              <span className="text-[11px] text-slate-400 hidden sm:inline">
                Zero-PII Pedagogical Guide
              </span>
            </div>

            {/* Main Visual Display */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 aspect-16/10 flex items-center justify-center overflow-hidden">
              {modalTab === "diagram" ? (
                <PediatricOtDiagram
                  diagramType={step.diagramType}
                  phase={step.phase}
                  stepNumber={step.stepNumber}
                  alignmentCheck={step.alignmentCheck}
                  compensationWarning={step.compensationWarning}
                  isLiteralMode={isLiteralMode}
                  className="w-full h-full max-h-[300px]"
                />
              ) : resolvedSequenceUrl ? (
                <div className="w-full h-full overflow-hidden flex items-center justify-center bg-slate-100 rounded-xl">
                  <img
                    src={resolvedSequenceUrl}
                    alt={step.title}
                    loading="lazy"
                    decoding="async"
                    width={1200}
                    height={896}
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%',
                      ...(step.stepNumber === 1 ? { objectPosition: '0% 0%', transform: 'scale(2)', transformOrigin: '0% 0%' } :
                         step.stepNumber === 2 ? { objectPosition: '100% 0%', transform: 'scale(2)', transformOrigin: '100% 0%' } :
                         step.stepNumber === 3 ? { objectPosition: '0% 100%', transform: 'scale(2)', transformOrigin: '0% 100%' } :
                         { objectPosition: '100% 100%', transform: 'scale(2)', transformOrigin: '100% 100%' })
                    }}
                    className="w-full h-full transition-transform duration-300"
                  />
                </div>
              ) : (
                <img
                  src={activeImage}
                  alt={step.title}
                  loading="lazy"
                  decoding="async"
                  width={1200}
                  height={896}
                  className="w-full h-full object-contain rounded-xl"
                />
              )}
            </div>

            {/* Deep Clinical Coaching Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-teal-50/70 rounded-2xl border border-teal-100 space-y-1.5">
                <h5 className="font-extrabold text-teal-900 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  <span>Target Alignment & Biomechanics</span>
                </h5>
                <p className="text-teal-950 font-medium leading-relaxed">
                  {step.postureDescription}
                </p>
                {step.alignmentCheck && (
                  <div className="pt-1.5 border-t border-teal-200/60 font-semibold text-teal-800">
                    Key Marker: {step.alignmentCheck}
                  </div>
                )}
              </div>

              <div className="p-3.5 bg-amber-50/70 rounded-2xl border border-amber-100 space-y-1.5">
                <h5 className="font-extrabold text-amber-900 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                  <ShieldAlert className="w-4 h-4 text-amber-600" />
                  <span>OT Compensation Red Flag</span>
                </h5>
                <p className="text-amber-950 font-medium leading-relaxed">
                  {step.compensationWarning || "Observe for breath holding or compensatory trunk twisting."}
                </p>
                <div className="pt-1.5 border-t border-amber-200/60 text-amber-800 text-[11px]">
                  Therapy Tip: Performing with compensation reinforces the primitive pattern. Slow the cadence down.
                </div>
              </div>
            </div>

            {/* ASD Communication Scripts */}
            <div className="p-3.5 bg-purple-50/60 rounded-2xl border border-purple-100 space-y-2 text-xs">
              <h5 className="font-extrabold text-purple-900 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>Special Needs Caregiver Communication</span>
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 bg-white rounded-xl border border-purple-200/60">
                  <span className="font-bold text-purple-800 block mb-0.5">Playful / Superhero Mode (ASD Level 1):</span>
                  <span className="italic text-slate-700">\"{step.parentCue}\"</span>
                </div>
                <div className="p-2 bg-white rounded-xl border border-purple-200/60">
                  <span className="font-bold text-purple-800 block mb-0.5">Literal / Concrete Mode (ASD Level 2):</span>
                  <span className="font-medium text-slate-700">\"{step.actionInstruction.split(/[.!?]/)[0]}\". Count 5 breaths together.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

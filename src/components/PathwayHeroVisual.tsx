import React, { useState } from "react";
import type { IntegrationExerciseOption, TransientStep } from "../types";
import { PediatricOtDiagram } from "./PediatricOtDiagrams";
import { Activity, CheckCircle2 } from "lucide-react";

interface PathwayHeroVisualProps {
  pathway: IntegrationExerciseOption;
  activeStepIndex?: number;
  onSelectStep?: (index: number) => void;
  fallbackImageUrl?: string;
  isMetronomePlaying?: boolean;
}

export const PathwayHeroVisual: React.FC<PathwayHeroVisualProps> = ({
  pathway,
  activeStepIndex = 0,
  onSelectStep,
  fallbackImageUrl,
  /* isMetronomePlaying */
}) => {
  const currentStep: TransientStep | undefined =
    pathway.transientSteps && pathway.transientSteps[activeStepIndex]
      ? pathway.transientSteps[activeStepIndex]
      : pathway.transientSteps?.[0];

  const activePhoto = currentStep?.imageUrl || pathway.imageUrl || fallbackImageUrl;
  const hasDedicatedPathwayPhoto = Boolean(
    pathway.transientSequenceImageUrl ||
    (pathway.category === "primary_movement" && pathway.imageUrl) ||
    (pathway.imageUrl && fallbackImageUrl && pathway.imageUrl !== fallbackImageUrl)
  );
  const [viewMode, setViewMode] = useState<"diagram" | "photo">("diagram");

  const getModalityBadge = () => {
    switch (pathway.category) {
      case "primary_movement":
        return { label: "Active Dynamic Pattern", color: "bg-teal-50 text-teal-800 border-teal-200", icon: "🌟" };
      case "assisted_passive":
        return { label: "Passive Co-Regulation", color: "bg-purple-50 text-purple-800 border-purple-200", icon: "🤝" };
      case "isometric_resistance":
        return { label: "Isometric Gentle Resistance", color: "bg-amber-50 text-amber-800 border-amber-200", icon: "🛑" };
      case "rhythmic_movement":
        return { label: "60 BPM Rhythmic Rocking", color: "bg-blue-50 text-blue-800 border-blue-200", icon: "🌊" };
      case "equipment_sensory":
        return { label: "Therapy Ball & Sensory Play", color: "bg-rose-50 text-rose-800 border-rose-200", icon: "🎈" };
      case "classroom_desk":
        return { label: "Classroom & Desk Reset", color: "bg-emerald-50 text-emerald-800 border-emerald-200", icon: "🏫" };
      default:
        return { label: "Therapeutic Pathway", color: "bg-slate-50 text-slate-800 border-slate-200", icon: "✨" };
    }
  };

  const badge = getModalityBadge();

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
      {/* Top Controls: Modality Pill + Diagram/Photo Switcher */}
      <div className="p-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between gap-2 flex-wrap">
        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-xl border flex items-center gap-1.5 ${badge.color}`}>
          <span>{badge.icon}</span>
          <span>{badge.label}</span>
          {pathway.metronomeBpm && (
            <span className="font-mono text-[9px] opacity-75">({pathway.metronomeBpm} BPM)</span>
          )}
        </span>

        {/* View mode toggle */}
        <div className="flex bg-slate-200/60 p-0.5 rounded-lg text-[10px]">
          <button
            onClick={() => setViewMode("diagram")}
            className={`px-2 py-0.5 rounded-md font-bold transition-all cursor-pointer ${
              viewMode === "diagram" ? "bg-white text-teal-800 shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            📐 Vector Guide
          </button>
          {activePhoto && (
            <button
              onClick={() => setViewMode("photo")}
              className={`px-2 py-0.5 rounded-md font-bold transition-all cursor-pointer ${
                viewMode === "photo" ? "bg-white text-teal-800 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {hasDedicatedPathwayPhoto ? "📷 Photo" : "📷 Reflex Overview"}
            </button>
          )}
        </div>
      </div>

      {/* Main Visual Display */}
      <div className="relative aspect-4/3 sm:aspect-16/10 bg-slate-50/70 p-3 sm:p-5 flex items-center justify-center">
        {viewMode === "diagram" ? (
          <div className="w-full h-full max-h-[220px] flex items-center justify-center">
            <PediatricOtDiagram
              diagramType={currentStep?.diagramType || "mat_setup"}
              phase={currentStep?.phase || "transient"}
              stepNumber={currentStep?.stepNumber || activeStepIndex + 1}
              alignmentCheck={currentStep?.alignmentCheck}
              compensationWarning={currentStep?.compensationWarning}
            />
          </div>
        ) : pathway.transientSequenceImageUrl ? (
          <div className="w-full h-full max-h-[220px] overflow-hidden flex items-center justify-center bg-slate-100 rounded-xl">
            <img
              src={pathway.transientSequenceImageUrl}
              alt={pathway.name}
              loading="lazy"
              decoding="async"
              width={1200}
              height={896}
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%',
                ...((activeStepIndex + 1) === 1 ? { objectPosition: '0% 0%', transform: 'scale(2)', transformOrigin: '0% 0%' } :
                   (activeStepIndex + 1) === 2 ? { objectPosition: '100% 0%', transform: 'scale(2)', transformOrigin: '100% 0%' } :
                   (activeStepIndex + 1) === 3 ? { objectPosition: '0% 100%', transform: 'scale(2)', transformOrigin: '0% 100%' } :
                   { objectPosition: '100% 100%', transform: 'scale(2)', transformOrigin: '100% 100%' })
              }}
              className="w-full h-full transition-transform duration-300"
            />
          </div>
        ) : (
          <img
            src={activePhoto}
            alt={pathway.name}
            loading="lazy"
            decoding="async"
            width={1200}
            height={896}
            className="w-full h-full object-contain rounded-xl"
          />
        )}

        {/* Cadence or Metronome Wave Pulse Ribbon */}
        {pathway.category === "rhythmic_movement" && (
          <div className="absolute top-2 right-2 bg-blue-100/90 text-blue-900 border border-blue-200 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs animate-pulse">
            <Activity className="w-3 h-3 text-blue-600" />
            <span>60 BPM Cadence Active</span>
          </div>
        )}

        {/* Isometric Static Resistance Banner */}
        {pathway.category === "isometric_resistance" && (
          <div className="absolute top-2 right-2 bg-amber-100/90 text-amber-900 border border-amber-200 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
            <span>🛑</span>
            <span>Static 6s Contraction</span>
          </div>
        )}
      </div>

      {/* Active Step Indicator Footer */}
      {currentStep && (
        <div className="p-3 bg-white border-t border-slate-100 flex items-center justify-between gap-2 text-xs flex-wrap">
          <div className="flex items-center gap-2 min-w-0">
            {pathway.transientSteps && pathway.transientSteps.length > 1 ? (
              <div className="flex items-center gap-1">
                {pathway.transientSteps.map((st, idx) => (
                  <button
                    key={st.stepNumber}
                    type="button"
                    onClick={() => onSelectStep?.(idx)}
                    className={`w-6 h-6 rounded-full text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center ${
                      idx === activeStepIndex
                        ? "bg-teal-600 text-white shadow-xs scale-105"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                    title={`Step ${st.stepNumber}: ${st.title}`}
                  >
                    {st.stepNumber}
                  </button>
                ))}
              </div>
            ) : (
              <span className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                {currentStep.stepNumber}
              </span>
            )}
            <span className="font-bold text-slate-800 truncate">
              {currentStep.title}
            </span>
          </div>
          {currentStep.alignmentCheck && (
            <span className="text-[10px] text-teal-700 font-medium flex items-center gap-1 shrink-0">
              <CheckCircle2 className="w-3 h-3 text-teal-600" />
              <span className="truncate max-w-[140px]">{currentStep.alignmentCheck}</span>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

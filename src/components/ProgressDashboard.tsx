import React from 'react';
import {
  Flame,
  Calendar,
  Award,
  CheckCircle,
  HeartPulse,
  Printer,
  Layers,
  TrendingDown,
  Sparkles,
  ClipboardList
} from 'lucide-react';
import type { RegulationLog, ChildProfile, ReflexId } from '../types';
import { REFLEX_DATABASE } from '../data/reflexData';
import { calculateActiveStreak, calculateProgramWeek, getStoredScores, getStoredBaselineScores } from '../utils/storage';

interface ProgressDashboardProps {
  logs: RegulationLog[];
  childProfile?: ChildProfile;
  onStartNewCircuit: () => void;
  onNavigateToScreener?: () => void;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  logs,
  childProfile,
  onStartNewCircuit,
  onNavigateToScreener
}) => {
  const totalSessions = logs.length;
  const activeStreak = calculateActiveStreak(logs);
  const currentWeek = calculateProgramWeek(logs);

  const currentScores = getStoredScores(childProfile?.id);
  const baselineScores = getStoredBaselineScores(childProfile?.id);
  const reflexList = Object.values(REFLEX_DATABASE);

  // Calculate per-reflex session counts for 3-Stage Progression Ladder
  const reflexSessionCounts: Record<ReflexId, number> = {
    fpr: 0, moro: 0, tlr: 0, landau: 0, spinal_galant: 0,
    amphibian: 0, atnr: 0, stnr: 0, palmar: 0, plantar_babinski: 0, rooting: 0
  };
  logs.forEach((l) => {
    l.exercisesDone.forEach((rId) => {
      if (reflexSessionCounts[rId] !== undefined) {
        reflexSessionCounts[rId]++;
      }
    });
  });

  // Calculate Green shift percentage
  const greenPostCount = logs.filter((l) => l.postZone === 'green').length;
  const greenShiftRate = totalSessions > 0 ? Math.round((greenPostCount / totalSessions) * 100) : 100;

  // Movement quality breakdown
  const smoothCount = logs.filter((l) => l.movementQuality === 'smooth_slow').length;
  const assistedCount = logs.filter((l) => l.movementQuality === 'assisted_passive').length;
  const rushedCount = logs.filter((l) => l.movementQuality === 'rushed_compensated').length;
  const microWinCount = logs.filter((l) => l.movementQuality === 'micro_win').length;

  const formatZoneState = (zone: string) => {
    switch (zone) {
      case 'red':
        return { label: 'Overload (SOS)', className: 'bg-red-100 text-red-800 border-red-200' };
      case 'yellow':
        return { label: 'Revved-Up (Buzzing)', className: 'bg-amber-100 text-amber-800 border-amber-200' };
      case 'green':
        return { label: 'Anchored (Ready)', className: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
      case 'blue':
        return { label: 'Low-Battery (Resting)', className: 'bg-blue-100 text-blue-800 border-blue-200' };
      default:
        return { label: zone, className: 'bg-slate-100 text-slate-800 border-slate-200' };
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Print-only Non-Diagnostic Watermark */}
      <div className="hidden print:block p-4 border-2 border-slate-300 rounded-xl text-center text-xs text-slate-600 mb-2">
        <strong className="text-slate-800">INFORMATIONAL CAREGIVER PROGRESS LOG — NOT A MEDICAL RECORD.</strong>
        <p className="mt-1">
          This progress journal is recorded by the child's caregiver to document movement practice consistency. It is not intended for diagnostic billing or clinical decision-making without independent pediatric evaluation.
        </p>
      </div>

      {/* Top Banner Dynamic Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
            <Flame className="w-6 h-6 fill-current" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">{activeStreak} {activeStreak === 1 ? 'Day' : 'Days'}</div>
            <div className="text-xs text-slate-500 font-medium">Active Streak</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-600 flex items-center justify-center shrink-0">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">{totalSessions}</div>
            <div className="text-xs text-slate-500 font-medium">Circuits Completed</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
            <HeartPulse className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">{greenShiftRate}%</div>
            <div className="text-xs text-slate-500 font-medium">Anchored Regulation Rate</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">Week {currentWeek}</div>
            <div className="text-xs text-slate-500 font-medium">Of 8-Week Target</div>
          </div>
        </div>
      </div>

      {/* Movement Quality & Myelination Analytics */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold text-slate-900 text-sm sm:text-base">
              Movement Quality Breakdown
            </h4>
            <p className="text-xs text-slate-500">
              Slow, controlled pacing ensures brainstem myelination rather than cortical momentum compensation.
            </p>
          </div>
          <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-xl">
            {totalSessions} Total Sessions Logged
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
            <div className="font-bold text-emerald-800">🌟 Smooth & Slow</div>
            <div className="text-lg font-bold text-emerald-900 mt-1">{smoothCount} sessions</div>
            <div className="text-[10px] text-emerald-700">Optimal Myelination</div>
          </div>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="font-bold text-blue-800">🤝 Assisted / Passive</div>
            <div className="text-lg font-bold text-blue-900 mt-1">{assistedCount} sessions</div>
            <div className="text-[10px] text-blue-700">Proprioceptive Grounding</div>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
            <div className="font-bold text-amber-800">⚡ Rushed / Momentum</div>
            <div className="text-lg font-bold text-amber-900 mt-1">{rushedCount} sessions</div>
            <div className="text-[10px] text-amber-700">Needs Slower Metronome</div>
          </div>

          <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl">
            <div className="font-bold text-purple-800">🌱 Micro-Wins</div>
            <div className="text-lg font-bold text-purple-900 mt-1">{microWinCount} sessions</div>
            <div className="text-[10px] text-purple-700">Protected Co-Regulation</div>
          </div>
        </div>
      </div>

      {/* 4-Week Re-Test Prompt if week >= 4 */}
      {currentWeek >= 4 && onNavigateToScreener && (
        <div className="bg-gradient-to-r from-teal-500/15 via-purple-500/15 to-indigo-500/15 p-5 sm:p-6 rounded-3xl border border-teal-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-teal-800 bg-teal-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              📅 Practice Milestone • Week {currentWeek}
            </span>
            <h4 className="font-bold text-slate-900 text-sm sm:text-base">
              Time for your Child's Movement Re-Observation Guide!
            </h4>
            <p className="text-xs text-slate-600 max-w-lg">
              4+ weeks of daily neural input has laid foundational myelination. Retest all 11 reflexes to update their brainstem-to-cortex priority roadmap.
            </p>
          </div>
          <button
            onClick={onNavigateToScreener}
            className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <ClipboardList className="w-4 h-4" /> Start 5-Min Movement Re-Test
          </button>
        </div>
      )}

      {/* Neurological Integration Progress: Baseline vs Current Level Matrix */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-teal-600" />
              <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                Neurological Integration Progress (Baseline vs. Current)
              </h4>
            </div>
            <p className="text-xs text-slate-500">
              Observation scale: Level 0 (Integrated) • Level 1 (Mild) • Level 2 (Moderate) • Level 3 (Prominent)
            </p>
          </div>
          <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-xl self-start sm:self-auto">
            {childProfile?.name ? `${childProfile.name}'s Profile` : 'Active Child'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {reflexList.map((r) => {
            const baseline = baselineScores[r.id] ?? 0;
            const current = currentScores[r.id] ?? 0;
            const delta = baseline - current;
            const count = reflexSessionCounts[r.id] || 0;
            const stage = count >= 6 ? 'Stage 3: Dynamic' : count >= 3 ? 'Stage 2: Isometric' : 'Stage 1: Passive';

            return (
              <div
                key={r.id}
                className="p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/50 flex flex-col justify-between gap-2 text-xs"
              >
                <div className="flex items-start justify-between gap-1">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                      Tier {r.tier} • {r.tierName}
                    </span>
                    <span className="font-bold text-slate-900 text-xs sm:text-sm">
                      {r.name.split(' (')[0]}
                    </span>
                  </div>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                    current === 0
                      ? 'bg-emerald-100 text-emerald-800'
                      : current === 1
                      ? 'bg-blue-100 text-blue-800'
                      : current === 2
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    L{current}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-200/60">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <span>Baseline: <strong className="text-slate-800">L{baseline}</strong></span>
                    <span>➔</span>
                    <span>Now: <strong className="text-teal-700">L{current}</strong></span>
                  </div>
                  {delta > 0 ? (
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                      <TrendingDown className="w-3 h-3 text-emerald-600" /> -{delta} {delta === 1 ? 'Level' : 'Levels'}
                    </span>
                  ) : delta === 0 && current === 0 ? (
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                      <Sparkles className="w-3 h-3 text-emerald-600" /> Integrated
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-500 font-medium">
                      Baseline Stable
                    </span>
                  )}
                </div>

                <div className="pt-1 flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-100">
                  <span className="font-medium text-slate-600">{count} sessions</span>
                  <span className="font-semibold text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded">
                    {stage}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Impact Card & History */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              Autonomic Regulation Shifts & Session History
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Tracking how 10 minutes of daily sensory-motor routines calms your child's nervous system.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" /> Print Caregiver Summary
            </button>
            <button
              onClick={onStartNewCircuit}
              className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
            >
              + Start Today's Circuit
            </button>
          </div>
        </div>

        {/* Recent Session History */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Detailed Session Logs ({logs.length})
          </h4>
          {logs.map((log) => (
            <div
              key={log.id}
              className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col gap-3 text-xs sm:text-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-600 shrink-0">
                    <Calendar className="w-4 h-4 text-slate-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">
                      {log.date} at {log.time}
                      {log.deckName && (
                        <span className="ml-2 font-normal text-xs text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-100">
                          {log.deckName}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                      {log.exercisesDone.map((id) => REFLEX_DATABASE[id]?.name.split(' ')[0] || id).join(' + ')}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
                  <span className="text-xs font-medium text-slate-500">State:</span>
                  {(() => {
                    const pre = formatZoneState(log.preZone);
                    const post = formatZoneState(log.postZone);
                    return (
                      <>
                        <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] border ${pre.className}`}>
                          {pre.label}
                        </span>
                        <span className="text-slate-400 text-xs">➔</span>
                        <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] border ${post.className}`}>
                          {post.label}
                        </span>
                      </>
                    );
                  })()}

                  {log.movementQuality && (
                    <span className="ml-2 text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700">
                      {log.movementQuality.replace('_', ' ').toUpperCase()}
                    </span>
                  )}
                </div>
              </div>

              {/* Notes & Observed Compensations */}
              {(log.notes || (log.compensationsObserved && log.compensationsObserved.length > 0)) && (
                <div className="pt-2 border-t border-slate-200/60 text-xs space-y-1 text-slate-600">
                  {log.compensationsObserved && log.compensationsObserved.length > 0 && (
                    <div className="flex flex-wrap gap-1 text-[11px] text-amber-800">
                      <span className="font-semibold text-slate-500">Noted:</span>
                      {log.compensationsObserved.map((c, i) => (
                        <span key={i} className="bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                          {c}
                        </span>
                      ))}
                    </div>
                  )}
                  {log.notes && (
                    <p className="italic text-slate-600 bg-white p-2 rounded-lg border border-slate-200 text-[11px]">
                      "{log.notes}"
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

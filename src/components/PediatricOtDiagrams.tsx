import React from "react";

export interface DiagramProps {
  diagramType?: string;
  phase?: "setup" | "begin" | "transient" | "finish";
  stepNumber?: number;
  alignmentCheck?: string;
  compensationWarning?: string;
  className?: string;
  isLiteralMode?: boolean;
}

export const PediatricOtDiagram: React.FC<DiagramProps> = ({
  diagramType = "mat_setup",
  phase = "transient",
  alignmentCheck,
  compensationWarning,
  className = "w-full h-full",
}) => {
  const isSetup = phase === "setup" || phase === "begin";
  const isFinish = phase === "finish";
  const isTransient = phase === "transient";

  // Render Green Alignment Check Badge
  const renderAlignmentBadge = (x: number, y: number, text: string) => {
    const label = alignmentCheck || text;
    return (
      <g transform={`translate(${x}, ${y})`}>
        <circle cx="0" cy="0" r="7" fill="#10B981" />
        <path d="M -3 0 L -1 2 L 3 -2" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="9" y="-7" width={Math.min(label.length * 5 + 8, 120)} height="14" rx="4" fill="#ECFDF5" stroke="#10B981" strokeWidth="0.8" />
        <text x="13" y="3" fontSize="6.5" fill="#047857" fontWeight="bold">
          {label.length > 25 ? label.slice(0, 24) + "…" : label}
        </text>
      </g>
    );
  };

  // Render Red Compensation Warning Pin
  const renderCompensationPin = (x: number, y: number, text: string) => {
    const label = compensationWarning || text;
    return (
      <g transform={`translate(${x}, ${y})`}>
        <circle cx="0" cy="0" r="7" fill="#EF4444" />
        <text x="0" y="2.5" textAnchor="middle" fontSize="7.5" fill="#FFFFFF" fontWeight="bold">!</text>
        <rect x="9" y="-7" width={Math.min(label.length * 4.8 + 8, 115)} height="14" rx="4" fill="#FEF2F2" stroke="#EF4444" strokeWidth="0.8" />
        <text x="13" y="3" fontSize="6" fill="#B91C1C" fontWeight="bold">
          {label.length > 24 ? label.slice(0, 23) + "…" : label}
        </text>
      </g>
    );
  };

  // Render Caregiver Hand Placement (Soft Indigo Hands)
  const renderCaregiverHand = (x: number, y: number, label: string = "Caregiver Hand") => (
    <g transform={`translate(${x}, ${y})`}>
      <ellipse cx="0" cy="0" rx="9" ry="6" fill="#EEF2FF" stroke="#6366F1" strokeWidth="1.5" strokeDasharray="2 2" />
      <path d="M -5 -2 L -5 2 M -2 -3 L -2 3 M 1 -3 L 1 3 M 4 -2 L 4 2" stroke="#6366F1" strokeWidth="1" strokeLinecap="round" />
      <text x="0" y="11" textAnchor="middle" fontSize="5" fill="#4F46E5" fontWeight="bold">{label}</text>
    </g>
  );

  // Render 60 BPM sinusoidal wave ribbon
  const renderBrmtWave = () => (
    <g>
      <path
        d="M 20 28 Q 45 16 70 28 T 120 28 T 170 28"
        fill="none"
        stroke="#8B5CF6"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="95" cy="28" r="4" fill="#8B5CF6" />
      <rect x="65" y="6" width="70" height="13" rx="4" fill="#F5F3FF" stroke="#8B5CF6" strokeWidth="1" />
      <text x="100" y="15" textAnchor="middle" fontSize="6.5" fill="#6D28D9" fontWeight="bold">
        60 BPM • 1 ROCK/SEC
      </text>
    </g>
  );

  // Render 6s Isometric Static Resistance Badge
  const renderIsometricBadge = (x: number = 100, y: number = 18) => (
    <g transform={`translate(${x}, ${y})`}>
      <rect x="-38" y="-9" width="76" height="17" rx="5" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.2" />
      <text x="0" y="3" textAnchor="middle" fontSize="7" fill="#B45309" fontWeight="extrabold">
        HOLD 6s • NO MOTION
      </text>
    </g>
  );

  // Switcher across diagram types
  switch (diagramType) {
    // -------------------------------------------------------------
    // MORO & FPR: Starfish, Fetal Tuck, Swaddle, Burrow
    // -------------------------------------------------------------
    case "starfish_open":
      return (
        <svg viewBox="0 0 200 130" className={className}>
          <rect x="15" y="110" width="170" height="8" rx="4" fill="#E2E8F0" />
          <rect x="92" y="52" width="16" height="36" rx="6" fill="#CCFBF1" stroke="#0D9488" strokeWidth="2.5" />
          <circle cx="100" cy="38" r="13" fill="#FED7AA" stroke="#EA580C" strokeWidth="2.5" />
          <line x1="92" y1="58" x2="35" y2="35" stroke="#0D9488" strokeWidth="4" strokeLinecap="round" />
          <line x1="108" y1="58" x2="165" y2="35" stroke="#0D9488" strokeWidth="4" strokeLinecap="round" />
          <line x1="94" y1="86" x2="48" y2="108" stroke="#0D9488" strokeWidth="4" strokeLinecap="round" />
          <line x1="106" y1="86" x2="152" y2="108" stroke="#0D9488" strokeWidth="4" strokeLinecap="round" />

          {isTransient && (
            <>
              <path d="M 28 26 Q 38 18 48 26" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 152 26 Q 162 18 172 26" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
              <text x="100" y="20" textAnchor="middle" fontSize="7.5" fill="#059669" fontWeight="bold">
                INHALE 5s • SLOW EXPANSION
              </text>
            </>
          )}

          {isFinish && (
            <>
              {renderAlignmentBadge(30, 20, "Chest Open")}
              {renderCompensationPin(105, 20, "Watch: Limbs Heavy")}
            </>
          )}

          {isSetup && (
            <>
              <line x1="25" y1="110" x2="175" y2="110" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="3 3" />
              <text x="100" y="124" textAnchor="middle" fontSize="6.5" fill="#0284C7" fontWeight="bold">
                START: SUPINE FLAT ON SOFT MAT
              </text>
            </>
          )}
        </svg>
      );

    case "fetal_tuck":
      return (
        <svg viewBox="0 0 200 130" className={className}>
          <rect x="15" y="110" width="170" height="8" rx="4" fill="#E2E8F0" />
          <ellipse cx="100" cy="72" rx="34" ry="28" fill="#CCFBF1" stroke="#0D9488" strokeWidth="3" />
          <circle cx="78" cy="62" r="14" fill="#FED7AA" stroke="#EA580C" strokeWidth="2.5" />
          <path d="M 85 75 Q 100 88 118 75" fill="none" stroke="#0F766E" strokeWidth="4" strokeLinecap="round" />
          <path d="M 115 88 Q 128 72 118 60" fill="none" stroke="#0D9488" strokeWidth="4" strokeLinecap="round" />

          {isTransient && (
            <>
              <path d="M 62 36 Q 100 24 138 36" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="3 3" />
              <text x="100" y="20" textAnchor="middle" fontSize="7.5" fill="#D97706" fontWeight="bold">
                EXHALE 5s • CROSS HUG TIGHT
              </text>
            </>
          )}

          {isSetup && renderCaregiverHand(135, 70, "Support Lower Back")}
          {isFinish && (
            <>
              {renderAlignmentBadge(35, 20, "Chin Tucked")}
              {renderCompensationPin(115, 20, "Watch: No Breath Holding")}
            </>
          )}
        </svg>
      );

    case "weighted_burrow":
      return (
        <svg viewBox="0 0 200 130" className={className}>
          <rect x="15" y="110" width="170" height="8" rx="4" fill="#E2E8F0" />
          <ellipse cx="100" cy="80" rx="30" ry="20" fill="#CCFBF1" stroke="#0D9488" strokeWidth="2" />
          <circle cx="80" cy="72" r="12" fill="#FED7AA" stroke="#EA580C" strokeWidth="2" />
          <path d="M 60 88 Q 100 50 140 88" fill="#DDD6FE" stroke="#7C3AED" strokeWidth="3" opacity="0.9" />
          <line x1="80" y1="65" x2="120" y2="85" stroke="#8B5CF6" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="120" y1="65" x2="80" y2="85" stroke="#8B5CF6" strokeWidth="1" strokeDasharray="2 2" />

          <path d="M 85 45 L 85 58 M 82 54 L 85 58 L 88 54" stroke="#6D28D9" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 115 45 L 115 58 M 112 54 L 115 58 L 118 54" stroke="#6D28D9" strokeWidth="2.5" strokeLinecap="round" />
          <text x="100" y="24" textAnchor="middle" fontSize="7.5" fill="#6D28D9" fontWeight="bold">
            DEEP PROPRIOCEPTIVE PRESSURE (5-10% BODYWEIGHT)
          </text>

          {isFinish && renderAlignmentBadge(55, 36, "Autonomic Calm Baseline")}
        </svg>
      );

    // -------------------------------------------------------------
    // ATNR: Head Turn Lizard, Fencer, Midline Crossing
    // -------------------------------------------------------------
    case "head_turn_lizard":
      return (
        <svg viewBox="0 0 200 130" className={className}>
          <rect x="15" y="112" width="170" height="8" rx="4" fill="#E2E8F0" />
          {/* Prone Torso */}
          <ellipse cx="96" cy="74" rx="36" ry="14" fill="#CCFBF1" stroke="#0D9488" strokeWidth="2.5" />
          {/* Head turned to RIGHT */}
          <circle cx="140" cy="68" r="12" fill="#FED7AA" stroke="#EA580C" strokeWidth="2.5" />
          <path d="M 148 68 L 158 68 M 154 64 L 158 68 L 154 72" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />

          {/* Skull-Side (Left) Arm Extended straight down along flank (Palm UP) */}
          <line x1="116" y1="80" x2="72" y2="82" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />
          <circle cx="68" cy="82" r="3.5" fill="#CBD5E1" stroke="#64748B" strokeWidth="1.2" />
          <text x="56" y="93" fontSize="5.5" fill="#64748B" fontWeight="600">Palm Up</text>

          {/* Skull-Side (Left) Leg Extended straight back */}
          <line x1="68" y1="74" x2="28" y2="74" stroke="#64748B" strokeWidth="4.5" strokeLinecap="round" />

          {/* Face-Side (Right) Arm Flexed 90° at elbow */}
          <path d="M 120 64 L 132 44 L 148 46" fill="none" stroke="#0D9488" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 128 48 A 6 6 0 0 1 134 45" fill="none" stroke="#0284C7" strokeWidth="1.2" />
          <text x="135" y="38" fontSize="6.5" fill="#0284C7" fontWeight="bold">90°</text>

          {/* Face-Side (Right) Knee Flexed 90° toward chest */}
          <path d="M 82 78 L 96 98 L 112 94" fill="none" stroke="#0D9488" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 94 92 A 6 6 0 0 1 100 96" fill="none" stroke="#0284C7" strokeWidth="1.2" />
          <text x="103" y="106" fontSize="6.5" fill="#0284C7" fontWeight="bold">90°</text>

          {isTransient && (
            <text x="100" y="22" textAnchor="middle" fontSize="7.5" fill="#0D9488" fontWeight="bold">
              PRONE LIZARD • HOMOLATERAL FLEXION
            </text>
          )}

          {isFinish && (
            <>
              {renderAlignmentBadge(25, 22, "Face-Side Flexed 90°")}
              {renderCompensationPin(115, 22, "Watch: Skull Arm Bending")}
            </>
          )}

          {isSetup && renderCaregiverHand(146, 52, "Occiput Head Guide")}
        </svg>
      );

    case "seated_fencer_desk":
      return (
        <svg viewBox="0 0 200 130" className={className}>
          <line x1="110" y1="70" x2="185" y2="70" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />
          <line x1="145" y1="70" x2="145" y2="114" stroke="#64748B" strokeWidth="3" />
          <path d="M 55 50 L 55 88 L 90 88 L 90 114" fill="none" stroke="#94A3B8" strokeWidth="3.5" strokeLinecap="round" />

          <circle cx="80" cy="46" r="11" fill="#FED7AA" stroke="#EA580C" strokeWidth="2.5" />
          <line x1="80" y1="57" x2="80" y2="88" stroke="#0D9488" strokeWidth="4" />
          <path d="M 80 88 L 105 88 L 105 114" fill="none" stroke="#0D9488" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />

          <line x1="80" y1="62" x2="150" y2="68" stroke="#0D9488" strokeWidth="4" strokeLinecap="round" />
          <path d="M 135 62 L 155 62 M 150 58 L 155 62 L 150 66" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />

          <path d="M 80 62 L 68 72 L 76 80" fill="none" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />

          <text x="100" y="20" textAnchor="middle" fontSize="7.5" fill="#0F766E" fontWeight="bold">
            DESK FENCER • DISCREET HEAD TURN & ARM GLIDE
          </text>

          {isFinish && renderCompensationPin(65, 72, "Watch: No Slouching")}
        </svg>
      );

    // -------------------------------------------------------------
    // STNR: Cat-Cow Symmetrical Flexion & Extension
    // -------------------------------------------------------------
    case "cat_cow_flex":
      return (
        <svg viewBox="0 0 200 130" className={className}>
          <rect x="15" y="110" width="170" height="8" rx="4" fill="#E2E8F0" />
          <path d="M 65 78 Q 100 36 135 78" fill="none" stroke="#0D9488" strokeWidth="5" strokeLinecap="round" />
          <circle cx="148" cy="85" r="11" fill="#FED7AA" stroke="#EA580C" strokeWidth="2.5" />
          <line x1="135" y1="78" x2="135" y2="110" stroke="#0D9488" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="65" y1="78" x2="65" y2="110" stroke="#0D9488" strokeWidth="4.5" strokeLinecap="round" />

          <path d="M 100 65 L 100 50 M 95 55 L 100 50 L 105 55" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
          <text x="100" y="24" textAnchor="middle" fontSize="7.5" fill="#D97706" fontWeight="bold">
            EXHALE • ARCH SPINE UP • HEAD DOWN
          </text>

          {renderCompensationPin(35, 65, "RED FLAG: Hips Rocking Back!")}
          {renderAlignmentBadge(135, 60, "Elbows Straight")}
        </svg>
      );

    case "cat_cow_extend":
      return (
        <svg viewBox="0 0 200 130" className={className}>
          <rect x="15" y="110" width="170" height="8" rx="4" fill="#E2E8F0" />
          <path d="M 65 70 Q 100 94 135 70" fill="none" stroke="#0D9488" strokeWidth="5" strokeLinecap="round" />
          <circle cx="148" cy="50" r="11" fill="#FED7AA" stroke="#EA580C" strokeWidth="2.5" />
          <path d="M 156 46 L 164 42" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />
          <line x1="135" y1="70" x2="135" y2="110" stroke="#0D9488" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="65" y1="70" x2="65" y2="110" stroke="#0D9488" strokeWidth="4.5" strokeLinecap="round" />

          <text x="100" y="24" textAnchor="middle" fontSize="7.5" fill="#0D9488" fontWeight="bold">
            INHALE • BELLY DOWN • GENTLE HEAD LIFT
          </text>

          {renderCompensationPin(135, 85, "RED FLAG: Elbows Collapsing!")}
          {renderAlignmentBadge(35, 55, "Hips Over Knees")}
        </svg>
      );

    case "quadruped_table":
      return (
        <svg viewBox="0 0 200 130" className={className}>
          <rect x="15" y="110" width="170" height="8" rx="4" fill="#E2E8F0" />
          <line x1="65" y1="68" x2="135" y2="68" stroke="#0D9488" strokeWidth="5" strokeLinecap="round" />
          <circle cx="146" cy="54" r="11" fill="#FED7AA" stroke="#EA580C" strokeWidth="2.5" />
          <line x1="132" y1="68" x2="132" y2="110" stroke="#0D9488" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="68" y1="68" x2="68" y2="110" stroke="#0D9488" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="60" y1="58" x2="140" y2="58" stroke="#0284C7" strokeWidth="2" strokeDasharray="3 3" />
          <text x="100" y="24" textAnchor="middle" fontSize="7.5" fill="#0284C7" fontWeight="bold">
            START: 90° SHOULDERS & HIPS • FLAT TABLETOP
          </text>
          {renderCaregiverHand(100, 78, "Palm on Sacrum")}
        </svg>
      );

    // -------------------------------------------------------------
    // TLR & LANDAU: Superman Prone & Meatball Supine
    // -------------------------------------------------------------
    case "superman_prone":
    case "superman_lift":
    case "airplane_prone":
      return (
        <svg viewBox="0 0 200 130" className={className}>
          <rect x="15" y="110" width="170" height="8" rx="4" fill="#E2E8F0" />
          <ellipse cx="100" cy="85" rx="18" ry="10" fill="#CCFBF1" stroke="#0D9488" strokeWidth="2.5" />
          <path d="M 90 85 Q 120 82 140 68" fill="none" stroke="#0D9488" strokeWidth="4.5" strokeLinecap="round" />
          <circle cx="150" cy="58" r="11" fill="#FED7AA" stroke="#EA580C" strokeWidth="2.5" />
          <line x1="135" y1="70" x2="175" y2="48" stroke="#0D9488" strokeWidth="4" strokeLinecap="round" />
          <line x1="88" y1="85" x2="35" y2="60" stroke="#0D9488" strokeWidth="4.5" strokeLinecap="round" />

          <path d="M 170 70 L 170 54 M 166 58 L 170 54 L 174 58" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
          <text x="100" y="24" textAnchor="middle" fontSize="7.5" fill="#D97706" fontWeight="bold">
            SUPERMAN EXTENSION • LIFT CHEST & FEET 2"
          </text>

          {renderCompensationPin(125, 40, "Watch: Long Neck (Don’t Crunch!)")}
          {renderAlignmentBadge(35, 102, "Pelvis Glued to Mat")}
        </svg>
      );

    case "meatball_hug":
    case "meatball_curl":
      return (
        <svg viewBox="0 0 200 130" className={className}>
          <rect x="15" y="110" width="170" height="8" rx="4" fill="#E2E8F0" />
          <line x1="50" y1="108" x2="150" y2="108" stroke="#0D9488" strokeWidth="5" strokeLinecap="round" />
          <circle cx="95" cy="72" r="24" fill="#CCFBF1" stroke="#0D9488" strokeWidth="3" />
          <circle cx="134" cy="94" r="11" fill="#FED7AA" stroke="#EA580C" strokeWidth="2" />
          <path d="M 75 72 Q 95 48 115 72" fill="none" stroke="#0F766E" strokeWidth="4" strokeLinecap="round" />

          <text x="100" y="24" textAnchor="middle" fontSize="7.5" fill="#0F766E" fontWeight="bold">
            MEATBALL FLEXION • HUG SHINS • CHIN TO CHEST
          </text>
          {renderAlignmentBadge(40, 42, "Full Spinal Rounding")}
        </svg>
      );

    // -------------------------------------------------------------
    // SENSORY EQUIPMENT: Peanut Ball, Lycra Tunnel, Putty, Scooter
    // -------------------------------------------------------------
    case "peanut_ball_rock":
      return (
        <svg viewBox="0 0 200 130" className={className}>
          <rect x="15" y="112" width="170" height="8" rx="4" fill="#E2E8F0" />
          <ellipse cx="75" cy="88" rx="24" ry="22" fill="#FED7AA" stroke="#EA580C" strokeWidth="2.5" />
          <ellipse cx="125" cy="88" rx="24" ry="22" fill="#FED7AA" stroke="#EA580C" strokeWidth="2.5" />
          <rect x="80" y="74" width="40" height="28" rx="8" fill="#FFEDD5" />

          <path d="M 55 92 Q 100 55 145 92" fill="none" stroke="#0D9488" strokeWidth="5" strokeLinecap="round" />
          <circle cx="148" cy="82" r="11" fill="#FED7AA" stroke="#EA580C" strokeWidth="2" />

          <path d="M 50 50 Q 100 38 150 50" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="3 3" />
          <path d="M 145 46 L 150 50 L 144 53" stroke="#F59E0B" strokeWidth="2" />
          <path d="M 55 53 L 50 50 L 56 46" stroke="#F59E0B" strokeWidth="2" />

          <text x="100" y="22" textAnchor="middle" fontSize="7.5" fill="#D97706" fontWeight="bold">
            PEANUT BALL • SLOW VESTIBULAR ROCKING
          </text>
          {renderCaregiverHand(100, 68, "Two-Hand Pelvic Hold")}
        </svg>
      );

    // -------------------------------------------------------------
    // SPINAL GALANT: Snow Angels & Rhythmic Pelvic Wag
    // -------------------------------------------------------------
    case "snow_angel_sweep":
      return (
        <svg viewBox="0 0 200 130" className={className}>
          <rect x="15" y="112" width="170" height="8" rx="4" fill="#E2E8F0" />
          <ellipse cx="100" cy="68" rx="14" ry="26" fill="#CCFBF1" stroke="#0D9488" strokeWidth="2.5" />
          <circle cx="100" cy="32" r="12" fill="#FED7AA" stroke="#EA580C" strokeWidth="2" />

          <path d="M 60 85 Q 28 60 50 30" fill="none" stroke="#0EA5E9" strokeWidth="2.5" strokeDasharray="3 3" />
          <path d="M 140 85 Q 172 60 150 30" fill="none" stroke="#0EA5E9" strokeWidth="2.5" strokeDasharray="3 3" />

          <line x1="90" y1="58" x2="42" y2="45" stroke="#0D9488" strokeWidth="4" strokeLinecap="round" />
          <line x1="110" y1="58" x2="158" y2="45" stroke="#0D9488" strokeWidth="4" strokeLinecap="round" />
          <line x1="94" y1="92" x2="60" y2="110" stroke="#0D9488" strokeWidth="4" strokeLinecap="round" />
          <line x1="106" y1="92" x2="140" y2="110" stroke="#0D9488" strokeWidth="4" strokeLinecap="round" />

          <text x="100" y="18" textAnchor="middle" fontSize="7.5" fill="#0284C7" fontWeight="bold">
            SYNCHRONOUS 4-LIMB SWEEP (NO BACK ARCH)
          </text>
          {renderCompensationPin(115, 60, "Watch: Lower Back Glued to Mat")}
        </svg>
      );

    case "pelvic_tail_wag":
      return (
        <svg viewBox="0 0 200 130" className={className}>
          <rect x="15" y="110" width="170" height="8" rx="4" fill="#E2E8F0" />
          <rect x="65" y="55" width="70" height="20" rx="6" fill="#CCFBF1" stroke="#0D9488" strokeWidth="2.5" />
          <circle cx="148" cy="55" r="11" fill="#FED7AA" stroke="#EA580C" strokeWidth="2" />
          <line x1="132" y1="75" x2="132" y2="110" stroke="#0D9488" strokeWidth="4" />
          <line x1="70" y1="75" x2="70" y2="110" stroke="#0D9488" strokeWidth="4" />

          <path d="M 50 55 Q 65 40 80 55" fill="none" stroke="#F59E0B" strokeWidth="3" strokeDasharray="3 3" />
          <path d="M 48 65 Q 65 80 82 65" fill="none" stroke="#F59E0B" strokeWidth="3" strokeDasharray="3 3" />

          {renderBrmtWave()}
          <text x="100" y="124" textAnchor="middle" fontSize="6.5" fill="#6D28D9" fontWeight="bold">
            RHYTHMIC PELVIC WAG (INHIBITING LUMBOSACRAL ARC)
          </text>
        </svg>
      );

    // -------------------------------------------------------------
    // PLANTAR & BABINSKI: Towel Scrunch, Marble Pickup, Spiky Roller
    // -------------------------------------------------------------
    case "towel_curl":
      return (
        <svg viewBox="0 0 200 130" className={className}>
          <rect x="15" y="110" width="170" height="8" rx="4" fill="#E2E8F0" />
          <line x1="75" y1="30" x2="75" y2="80" stroke="#0D9488" strokeWidth="5" strokeLinecap="round" />
          <ellipse cx="75" cy="104" rx="10" ry="8" fill="#FED7AA" stroke="#EA580C" strokeWidth="2.5" />
          <path d="M 80 104 Q 105 98 130 106" fill="none" stroke="#FED7AA" strokeWidth="10" strokeLinecap="round" />
          <path d="M 110 110 Q 120 96 130 110 Q 140 96 150 110" fill="#93C5FD" stroke="#2563EB" strokeWidth="2.5" />

          <path d="M 140 92 L 125 92 M 130 87 L 125 92 L 130 97" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round" />
          <text x="100" y="20" textAnchor="middle" fontSize="7.5" fill="#2563EB" fontWeight="bold">
            SCRUNCH TOWEL TOWARD GROUNDED HEEL
          </text>

          {renderCompensationPin(35, 88, "RED FLAG: Heel Glued!")}
          {renderAlignmentBadge(120, 75, "Toes Curling")}
        </svg>
      );

    case "marble_pickup":
      return (
        <svg viewBox="0 0 200 130" className={className}>
          <rect x="15" y="110" width="170" height="8" rx="4" fill="#E2E8F0" />
          <line x1="70" y1="45" x2="70" y2="85" stroke="#0D9488" strokeWidth="5" strokeLinecap="round" />
          <ellipse cx="70" cy="102" rx="10" ry="8" fill="#FED7AA" stroke="#EA580C" strokeWidth="2" />
          <path d="M 75 102 Q 100 95 125 98" fill="none" stroke="#FED7AA" strokeWidth="10" strokeLinecap="round" />
          <circle cx="132" cy="106" r="8" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
          <path d="M 155 96 Q 168 96 178 108 L 148 108 Z" fill="#F1F5F9" stroke="#64748B" strokeWidth="2" />

          <text x="100" y="24" textAnchor="middle" fontSize="7.5" fill="#0284C7" fontWeight="bold">
            GRIP MARBLE WITH TOES • LIFT & DROP IN BOWL
          </text>
          {renderAlignmentBadge(35, 70, "Heel Grounded")}
        </svg>
      );

    case "sole_calcaneal_glide":
      return (
        <svg viewBox="0 0 200 130" className={className}>
          {/* Sole of Foot Contour */}
          <path
            d="M 90 108 C 78 108 75 85 80 62 C 84 46 90 32 102 32 C 114 32 120 46 124 62 C 129 85 126 108 114 108 Z"
            fill="#FED7AA"
            stroke="#EA580C"
            strokeWidth="2.5"
          />
          {/* Relaxed Plantar Toes (No pathological Babinski fanning) */}
          <circle cx="102" cy="22" r="5.5" fill="#FED7AA" stroke="#EA580C" strokeWidth="2" />
          <circle cx="91" cy="24" r="5" fill="#FED7AA" stroke="#EA580C" strokeWidth="1.8" />
          <circle cx="81" cy="28" r="4.5" fill="#FED7AA" stroke="#EA580C" strokeWidth="1.8" />
          <circle cx="113" cy="24" r="5" fill="#FED7AA" stroke="#EA580C" strokeWidth="1.8" />
          <circle cx="123" cy="28" r="4.5" fill="#FED7AA" stroke="#EA580C" strokeWidth="1.8" />

          {/* Calming Downward Metatarsal-to-Heel Vector (Opposite of Babinski Trigger) */}
          <line x1="102" y1="46" x2="102" y2="94" stroke="#10B981" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 97 86 L 102 94 L 107 86" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Sustained Plantar Arch Pressure Zone (Kidney 1 Acupressure Point) */}
          <circle cx="102" cy="70" r="7" fill="#A7F3D0" stroke="#059669" strokeWidth="1.5" strokeDasharray="2 2" />
          <text x="114" y="72" fontSize="5.5" fill="#047857" fontWeight="bold">Sustained Arch Pressure</text>

          {/* Caregiver Deep Calcaneal Heel Cup */}
          {renderCaregiverHand(102, 108, "Deep Calcaneal Heel Cup")}

          <text x="100" y="124" textAnchor="middle" fontSize="7" fill="#047857" fontWeight="bold">
            CALCANEAL CUP & GROUNDING GLIDE (DOWNWARD PRESSURE)
          </text>
          {renderAlignmentBadge(15, 18, "Firm Calcaneal Cup")}
          {renderCompensationPin(115, 18, "Avoid Upward Scratching")}
        </svg>
      );

    // -------------------------------------------------------------
    // PALMAR GRASP: Finger Opposition, Acupressure, Putty
    // -------------------------------------------------------------
    case "finger_opposition":
      return (
        <svg viewBox="0 0 200 130" className={className}>
          <path d="M 75 95 Q 100 102 125 95 L 132 58 Q 100 52 68 58 Z" fill="#FED7AA" stroke="#EA580C" strokeWidth="2.5" />
          <line x1="78" y1="56" x2="65" y2="30" stroke="#FED7AA" strokeWidth="6" strokeLinecap="round" />
          <line x1="92" y1="54" x2="90" y2="24" stroke="#FED7AA" strokeWidth="6" strokeLinecap="round" />
          <line x1="108" y1="54" x2="110" y2="24" stroke="#FED7AA" strokeWidth="6" strokeLinecap="round" />
          <line x1="122" y1="56" x2="135" y2="34" stroke="#FED7AA" strokeWidth="5.5" strokeLinecap="round" />

          <path d="M 58 82 Q 52 56 80 48" fill="none" stroke="#EA580C" strokeWidth="4" strokeLinecap="round" />
          <circle cx="72" cy="38" r="6" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" />

          <text x="100" y="118" textAnchor="middle" fontSize="7.5" fill="#CA8A04" fontWeight="bold">
            SEQUENTIAL OPPOSITION • THUMB TO EACH FINGERTIP
          </text>

          {renderCompensationPin(115, 55, "Babkin: Keep Jaw Relaxed")}
        </svg>
      );

    case "palm_acupressure":
      return (
        <svg viewBox="0 0 200 130" className={className}>
          <path d="M 70 100 Q 100 106 130 100 L 134 56 Q 100 50 66 56 Z" fill="#FED7AA" stroke="#EA580C" strokeWidth="2.5" />
          <line x1="76" y1="54" x2="70" y2="28" stroke="#FED7AA" strokeWidth="5.5" strokeLinecap="round" />
          <line x1="91" y1="52" x2="91" y2="20" stroke="#FED7AA" strokeWidth="5.5" strokeLinecap="round" />
          <line x1="106" y1="52" x2="108" y2="20" stroke="#FED7AA" strokeWidth="5.5" strokeLinecap="round" />
          <line x1="121" y1="54" x2="128" y2="30" stroke="#FED7AA" strokeWidth="5.5" strokeLinecap="round" />
          <line x1="64" y1="78" x2="44" y2="65" stroke="#FED7AA" strokeWidth="5.5" strokeLinecap="round" />

          <circle cx="86" cy="80" r="10" fill="#CCFBF1" stroke="#0D9488" strokeWidth="2.5" />
          <path d="M 86 72 A 8 8 0 1 1 86 88" fill="none" stroke="#0D9488" strokeWidth="2" strokeDasharray="3 3" />

          <text x="100" y="122" textAnchor="middle" fontSize="7.5" fill="#0D9488" fontWeight="bold">
            CIRCULAR THENAR MASSAGE (INHIBITING PALMAR CLAW)
          </text>
        </svg>
      );

    // -------------------------------------------------------------
    // ROOTING & SUCKING: Facial Circles, Straw Heavy Work
    // -------------------------------------------------------------
    case "facial_circle":
      return (
        <svg viewBox="0 0 200 130" className={className}>
          <circle cx="100" cy="62" r="38" fill="#FED7AA" stroke="#EA580C" strokeWidth="3" />
          <path d="M 86 54 Q 92 48 98 54" fill="none" stroke="#7C2D12" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 102 54 Q 108 48 114 54" fill="none" stroke="#7C2D12" strokeWidth="2.5" strokeLinecap="round" />
          <ellipse cx="100" cy="78" rx="7" ry="5" fill="#F43F5E" stroke="#BE123C" strokeWidth="2" />

          <path d="M 75 64 A 10 10 0 1 1 75 78" fill="none" stroke="#0D9488" strokeWidth="2.5" strokeDasharray="3 3" />
          <path d="M 125 64 A 10 10 0 1 1 125 78" fill="none" stroke="#0D9488" strokeWidth="2.5" strokeDasharray="3 3" />

          <text x="100" y="116" textAnchor="middle" fontSize="7.5" fill="#0D9488" fontWeight="bold">
            DIAMOND PERIORAL SWEEP • NOSE TO CHIN, CHEEK TO CHEEK
          </text>
          {renderCompensationPin(115, 45, "Watch: Head Stays Center")}
        </svg>
      );

    case "straw_bubble_blow":
      return (
        <svg viewBox="0 0 200 130" className={className}>
          <circle cx="82" cy="60" r="28" fill="#FED7AA" stroke="#EA580C" strokeWidth="2.5" />
          <ellipse cx="110" cy="66" rx="5" ry="4" fill="#F43F5E" />
          <line x1="110" y1="66" x2="148" y2="90" stroke="#0284C7" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 138 85 L 144 110 L 162 110 L 168 85 Z" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2.5" />
          <circle cx="154" cy="76" r="5" fill="#BAE6FD" stroke="#0284C7" strokeWidth="1.5" />
          <circle cx="164" cy="66" r="7" fill="#BAE6FD" stroke="#0284C7" strokeWidth="1.5" />
          <circle cx="156" cy="52" r="8" fill="#BAE6FD" stroke="#0284C7" strokeWidth="1.5" />

          <text x="100" y="22" textAnchor="middle" fontSize="7.5" fill="#0284C7" fontWeight="bold">
            ORAL-MOTOR RESISTANCE • THICK SMOOTHIE STRAW PULL
          </text>
          {renderAlignmentBadge(40, 98, "Firm Lip Seal")}
        </svg>
      );

    // -------------------------------------------------------------
    // ISOMETRIC PRESS (MNRI) & RHYTHMIC INFANT ROCK (BRMT)
    // -------------------------------------------------------------
    case "isometric_press":
      return (
        <svg viewBox="0 0 200 130" className={className}>
          <rect x="15" y="110" width="170" height="8" rx="4" fill="#E2E8F0" />
          <line x1="40" y1="65" x2="95" y2="65" stroke="#0D9488" strokeWidth="6" strokeLinecap="round" />
          <ellipse cx="98" cy="65" rx="9" ry="7" fill="#FED7AA" stroke="#EA580C" strokeWidth="2.5" />

          <line x1="112" y1="46" x2="112" y2="84" stroke="#4F46E5" strokeWidth="5" strokeLinecap="round" />
          <line x1="112" y1="65" x2="160" y2="65" stroke="#4F46E5" strokeWidth="5" strokeLinecap="round" />

          <path d="M 90 52 L 105 52 M 100 48 L 105 52 L 100 56" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 120 52 L 105 52 M 110 48 L 105 52 L 110 56" stroke="#4F46E5" strokeWidth="2.5" strokeLinecap="round" />

          <ellipse cx="105" cy="65" rx="20" ry="14" fill="#FEF3C7" opacity="0.6" stroke="#F59E0B" strokeWidth="1" strokeDasharray="2 2" />

          {renderIsometricBadge(100, 20)}
          <text x="100" y="122" textAnchor="middle" fontSize="6.5" fill="#0F766E" fontWeight="bold">
            STATIC RESISTANCE • RESETTING MUSCLE SPINDLE SENSITIVITY
          </text>
        </svg>
      );

    case "rhythmic_infant_rock":
      return (
        <svg viewBox="0 0 200 130" className={className}>
          <rect x="15" y="110" width="170" height="8" rx="4" fill="#E2E8F0" />
          <ellipse cx="100" cy="74" rx="36" ry="16" fill="#CCFBF1" stroke="#0D9488" strokeWidth="3" />
          <circle cx="140" cy="68" r="12" fill="#FED7AA" stroke="#EA580C" strokeWidth="2.5" />
          <path d="M 70 74 L 60 55 L 50 74" fill="none" stroke="#0D9488" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

          {renderBrmtWave()}
          {renderCaregiverHand(45, 82, "Heel Rock Anchor")}

          <text x="100" y="124" textAnchor="middle" fontSize="6.5" fill="#6D28D9" fontWeight="bold">
            ENTRAINING PURKINJE CELLS IN CEREBELLAR VERMIS
          </text>
        </svg>
      );

    // -------------------------------------------------------------
    // CLASSROOM DESK & GENERAL MAT SETUP
    // -------------------------------------------------------------
    case "seated_starfish_desk":
      return (
        <svg viewBox="0 0 200 130" className={className}>
          <line x1="125" y1="68" x2="180" y2="68" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />
          <line x1="150" y1="68" x2="150" y2="110" stroke="#64748B" strokeWidth="3" />
          <path d="M 60 52 L 60 88 L 95 88 L 95 110" fill="none" stroke="#94A3B8" strokeWidth="3.5" strokeLinecap="round" />

          <circle cx="82" cy="46" r="10" fill="#FED7AA" stroke="#EA580C" strokeWidth="2" />
          <line x1="82" y1="56" x2="82" y2="88" stroke="#0D9488" strokeWidth="4" />
          <line x1="82" y1="62" x2="48" y2="48" stroke="#0D9488" strokeWidth="3" strokeLinecap="round" />
          <line x1="82" y1="62" x2="120" y2="48" stroke="#0D9488" strokeWidth="3" strokeLinecap="round" />

          <text x="100" y="20" textAnchor="middle" fontSize="7.5" fill="#0D9488" fontWeight="bold">
            SEATED DESK STARFISH • DISCREET EXPANSION RESET
          </text>
        </svg>
      );

    case "cross_crawl_march":
    case "amphibian_slide":
      return (
        <svg viewBox="0 0 200 130" className={className}>
          <rect x="15" y="110" width="170" height="8" rx="4" fill="#E2E8F0" />
          <ellipse cx="100" cy="70" rx="38" ry="15" fill="#CCFBF1" stroke="#0D9488" strokeWidth="2.5" />
          <circle cx="145" cy="65" r="11" fill="#FED7AA" stroke="#EA580C" strokeWidth="2" />
          <line x1="68" y1="70" x2="35" y2="70" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />
          <path d="M 95 75 L 110 98 L 128 92" fill="none" stroke="#0D9488" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 85 100 L 105 100 M 100 96 L 105 100 L 100 104" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />

          <text x="100" y="22" textAnchor="middle" fontSize="7.5" fill="#D97706" fontWeight="bold">
            HOMOLATERAL SLIDE • 90° KNEE FLEXION • PELVIS FLAT
          </text>
          {renderAlignmentBadge(40, 50, "Pelvis Level")}
        </svg>
      );


    // -------------------------------------------------------------
    // ADVANCED SENSORY & PLAY EQUIPMENT
    // -------------------------------------------------------------
    case "scooter_board":
      return (
        <svg viewBox="0 0 200 130" className={className}>
          <rect x="15" y="112" width="170" height="8" rx="4" fill="#E2E8F0" />
          {/* 4-Wheel Scooter Board */}
          <rect x="65" y="85" width="70" height="10" rx="4" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
          <circle cx="75" cy="100" r="5" fill="#64748B" />
          <circle cx="125" cy="100" r="5" fill="#64748B" />

          {/* Prone Superman child on scooter board */}
          <ellipse cx="100" cy="78" rx="35" ry="12" fill="#CCFBF1" stroke="#0D9488" strokeWidth="2.5" />
          <circle cx="145" cy="65" r="11" fill="#FED7AA" stroke="#EA580C" strokeWidth="2" />
          {/* Hands pushing floor */}
          <line x1="120" y1="82" x2="135" y2="108" stroke="#0D9488" strokeWidth="3.5" strokeLinecap="round" />
          {/* Propelled motion lines */}
          <path d="M 40 85 L 55 85 M 35 90 L 52 90" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />

          <text x="100" y="24" textAnchor="middle" fontSize="7.5" fill="#1D4ED8" fontWeight="bold">
            SCOOTER BOARD SUPERMAN • PROPEL FORWARD WITH PALMS
          </text>
          {renderAlignmentBadge(40, 50, "Cervical Extension")}
        </svg>
      );

    case "lycra_tunnel":
      return (
        <svg viewBox="0 0 200 130" className={className}>
          <rect x="15" y="112" width="170" height="8" rx="4" fill="#E2E8F0" />
          {/* Stretchy Lycra Tunnel */}
          <path d="M 50 50 Q 100 40 150 50 L 150 105 Q 100 115 50 105 Z" fill="#EDE9FE" stroke="#8B5CF6" strokeWidth="2.5" strokeDasharray="3 3" />
          {/* Child pushing through inside */}
          <ellipse cx="100" cy="85" rx="32" ry="16" fill="#CCFBF1" stroke="#0D9488" strokeWidth="2" />
          <circle cx="132" cy="78" r="10" fill="#FED7AA" stroke="#EA580C" strokeWidth="2" />
          {/* Force resistance arrows */}
          <path d="M 90 65 L 90 75 M 87 70 L 90 65 L 93 70" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
          <path d="M 110 65 L 110 75 M 107 70 L 110 65 L 113 70" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />

          <text x="100" y="24" textAnchor="middle" fontSize="7.5" fill="#7C3AED" fontWeight="bold">
            LYCRA SENSORY TUNNEL • RESISTIVE HEAVY WORK CRAWL
          </text>
        </svg>
      );

    case "therapy_putty":
      return (
        <svg viewBox="0 0 200 130" className={className}>
          {/* Tabletop */}
          <line x1="20" y1="105" x2="180" y2="105" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
          {/* Blob of Putty */}
          <ellipse cx="100" cy="95" rx="32" ry="16" fill="#FDE047" stroke="#CA8A04" strokeWidth="2.5" />
          {/* Hidden beads inside putty */}
          <circle cx="88" cy="94" r="3.5" fill="#EF4444" />
          <circle cx="104" cy="90" r="3.5" fill="#3B82F6" />
          <circle cx="114" cy="96" r="3" fill="#10B981" />

          {/* Child Fingers Pinching Putty */}
          <path d="M 78 50 L 88 85 L 95 85" fill="none" stroke="#FED7AA" strokeWidth="6" strokeLinecap="round" />
          <path d="M 122 50 L 112 85 L 105 85" fill="none" stroke="#FED7AA" strokeWidth="6" strokeLinecap="round" />

          <text x="100" y="24" textAnchor="middle" fontSize="7.5" fill="#CA8A04" fontWeight="bold">
            THERAPY PUTTY • PINCH & DIG TO FIND HIDDEN TREASURES
          </text>
          {renderCompensationPin(115, 45, "Watch: Keep Mouth Closed")}
        </svg>
      );

    case "spiky_roller":
      return (
        <svg viewBox="0 0 200 130" className={className}>
          <rect x="15" y="112" width="170" height="8" rx="4" fill="#E2E8F0" />
          {/* Textured Spiky Roller */}
          <ellipse cx="105" cy="100" rx="18" ry="14" fill="#F43F5E" stroke="#E11D48" strokeWidth="2" />
          {/* Spikes */}
          <circle cx="95" cy="92" r="2" fill="#FFFFFF" />
          <circle cx="105" cy="88" r="2" fill="#FFFFFF" />
          <circle cx="115" cy="92" r="2" fill="#FFFFFF" />
          <circle cx="105" cy="102" r="2" fill="#FFFFFF" />

          {/* Bare Foot pressing arch on roller */}
          <path d="M 60 40 L 60 85" stroke="#0D9488" strokeWidth="5" strokeLinecap="round" />
          <path d="M 60 85 Q 90 75 105 85 Q 120 75 145 92" fill="none" stroke="#FED7AA" strokeWidth="10" strokeLinecap="round" />

          {/* Rolling back and forth arrows */}
          <path d="M 80 114 L 130 114 M 85 110 L 80 114 L 85 118 M 125 110 L 130 114 L 125 118" stroke="#E11D48" strokeWidth="2" strokeLinecap="round" />

          <text x="100" y="24" textAnchor="middle" fontSize="7.5" fill="#E11D48" fontWeight="bold">
            SPIKY ROLLER • DESENSITIZE ARCH & RESTORE CALCANEUS
          </text>
        </svg>
      );

    case "mat_setup":
    default:
      return (
        <svg viewBox="0 0 200 130" className={className}>
          <rect x="15" y="105" width="170" height="12" rx="5" fill="#CCFBF1" stroke="#0D9488" strokeWidth="2.5" />
          <ellipse cx="45" cy="98" rx="20" ry="8" fill="#FED7AA" stroke="#EA580C" strokeWidth="2" />

          <circle cx="98" cy="68" r="15" fill="#FED7AA" stroke="#EA580C" strokeWidth="2.5" />
          <rect x="90" y="83" width="16" height="22" rx="4" fill="#99F6E4" stroke="#0D9488" strokeWidth="2.5" />

          <line x1="98" y1="48" x2="98" y2="105" stroke="#0284C7" strokeWidth="2" strokeDasharray="3 3" />
          <text x="100" y="24" textAnchor="middle" fontSize="7.5" fill="#0F766E" fontWeight="bold">
            CALM STARTING BASE OF SUPPORT
          </text>

          {renderCaregiverHand(140, 90, "Ready Anchor")}
          {renderAlignmentBadge(40, 40, "Neutral Base")}
        </svg>
      );
  }
};

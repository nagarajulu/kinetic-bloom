# 🧠 KineticBloom — Round 3 Clinical & Architectural Verification & "Path to 100% Complete Clinical Platform" Blueprint

**Prepared By:** Principal Pediatric Neuro-Developmental Reflex Integration Head Coach & Clinical Director  
**Clinical Synthesis:** INPP (*Sally Goddard Blythe*), MNRI® (*Dr. Svetlana Masgutova*), RMTi / BRMT (*Dr. Harald Blomberg & Moira Dempsey*), Brain Balance (*Dr. Robert Melillo*), Harkla Pediatric OT (*Rachel Harrington, COTA/L & Jessica Hill, COTA/L*), and Williams & Shellenberger's *Pyramid of Learning*  
**Application Evaluated:** `KineticBloom` (`http://localhost:3000/` | `/Users/naga.aerakoni/workspace/projects/kinetic-bloom`)  
**Evaluation Round:** **Round 3 (Verification of Iteration 2 Fixes + Gap Analysis for a 100% Complete Clinical Platform)**

---

## Executive Summary & Round 1 $\rightarrow$ Round 2 $\rightarrow$ Round 3 Scorecard

Iteration 2 delivered a **massive leap forward** across clinical content depth, video authenticity, neuro-sensory intake design, and multimodal exercise variety. Most notably:
1. **All 11 reflexes now feature 4 to 5 distinct clinical exercise pathways (52 total pathways in [`reflexData.ts`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/data/reflexData.ts))**, expanding from 23 pathways in Round 2 to include **MNRI® Isometric Resistance (`isometric_resistance`)**, **BRMT 60 BPM Innate Rhythmic Movement (`rhythmic_movement`)**, **Harkla Sensory Equipment Play (`equipment_sensory`)**, and **Discreet Classroom / Desk Resets (`classroom_desk`)**.
2. **100% of fabricated YouTube IDs were replaced with verified, live pediatric OT video IDs** (`ZkGDm3t2hb8` with exact timestamp parameters `&start=24`, `&start=91`, `&start=169`, `&start=227`, `&start=302`, `&start=381`, plus dedicated Harkla videos `sP8IBcpFRpM`, `WFWW1fr3dlw`, `xDkduQyZsQg`, `hopxSwLLSWI`, `7oOSBuzGUys`, `DQQFcN72gno`, `hgg3TRqb7TM`, `XS2nM_suVTc`, `t2luajmBIyc`, `iXOEAnEJD48`).
3. **A 28-diagram custom pediatric OT vector library ([`PediatricOtDiagrams.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/PediatricOtDiagrams.tsx)) and synchronized hero visual banner ([`PathwayHeroVisual.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/PathwayHeroVisual.tsx)) were engineered.**
4. **A Zero-PII Functional Neuro-Sensory Intake ([`ProfileModal.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/ProfileModal.tsx)) with 3 1-click clinical personas (Maya L1, Leo L2, Sam L3)** was implemented and wired into [`CircuitRunner.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/CircuitRunner.tsx) for high-support passive defaults, hypotonia bolster alerts, and sensory-seeker primers.
5. **All 6 Round 2 clinical/UX bugs were addressed** (with 4 completely resolved and 2 partially resolved, detailed in Section 1.4 below).

| Clinical & Architectural Pillar | Round 1 | Round 2 | **Round 3 (Current)** | Remaining Gap to **100 / 100** |
| :--- | :---: | :---: | :---: | :--- |
| **1. Neuro-Hierarchy & Priority Engine (`storage.ts`)** | 72/100 | 94/100 | **98/100** | Factor longitudinal score deltas & stage mastery into daily deck selection |
| **2. Diagnostic Screener & Unilateral Grading (`AssessmentWizard.tsx`)** | 65/100 | 91/100 | **95/100** | Add Baseline vs. Week 4 vs. Week 8 snapshot comparison & Functional Symptom Checklist |
| **3. Multi-Pathway Exercise Library (`reflexData.ts` & `ReflexLibrary.tsx`)** | 68/100 | 88/100 | **97/100** | Add pathway-specific video timestamps & stage progression tags (Stage 1 $\rightarrow$ 2 $\rightarrow$ 3) |
| **4. Anatomical SVG & Step Visual Pedagogy (`PediatricOtDiagrams.tsx`)** | 50/100 | 76/100 | **88/100** | Fix `StepIllustration` photo-override bug, `head_turn_lizard` limb inversion, and `onSelectStep` wiring |
| **5. Daily Circuit Co-Regulation & Pacing (`CircuitRunner.tsx`)** | 70/100 | 92/100 | **93/100** | Auto-advance `activeStepIndex` with timer, add 90s Vagal/Heavy-Work Warm-Up, & 2:1 unilateral pacer bias |
| **6. Zero-PII Neuro-Sensory Profile & Multi-Child Data (`ProfileModal.tsx`)** | 40/100 | 85/100 | **89/100** | Scope `scores` & `logs` per `profile.id` in `storage.ts`; wire `cuePreference` & `sensory_avoidant` |
| **Overall Clinical Platform Readiness** | **64 / 100** | **88.5 / 100** | **93.5 / 100** | **+6.5 points to achieve 100/100 Gold-Standard Clinical Platform** |

---

## PART 1: Verification of Iteration 2 Fixes

### 1.1 YouTube Links & Video Rendering Verification (`reflexData.ts`, `ReflexLibrary.tsx`, `AssessmentWizard.tsx`, `CircuitRunner.tsx`)
- **Status:** ✅ **VERIFIED & FIXED (97%)**
- **What Was Verified:**
  - All 6 placeholder/broken video IDs from Round 2 (`j82X_3B7N5hI`, etc.) have been eliminated from [`src/data/reflexData.ts`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/data/reflexData.ts).
  - Every reflex now has valid, embeddable `assessmentVideoId` / `assessmentVideoUrl` and `primaryVideo.youtubeId` / `youtubeUrl`.
  - Both [`ReflexLibrary.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/ReflexLibrary.tsx#L396-L411) and [`AssessmentWizard.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/AssessmentWizard.tsx#L848-L859) properly parse `?t=(\d+)s?` from `assessmentVideoUrl` and append `&start=<seconds>` to `https://www.youtube-nocookie.com/embed/...`, ensuring parents jump directly to the exact reflex test segment in multi-reflex clinical videos (`ZkGDm3t2hb8`).
  - Both components include a clinic/school Wi-Fi resilient fallback card with a direct `"Open in YouTube app ↗"` anchor link.
- **Minor Remaining Gap:**
  - In [`CircuitRunner.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/CircuitRunner.tsx#L1228-L1235), the video modal embeds `currentReflex.primaryVideo.youtubeId` without checking for a `?t=` start parameter or pathway-specific video override.

### 1.2 New `PediatricOtDiagrams.tsx` & `PathwayHeroVisual.tsx` Verification
- **Status:** ⚠️ **MAJOR UPGRADE DELIVERED, BUT 3 CRITICAL BUGS BLOCK FULL IMPACT**
- **What Was Verified:**
  - [`PediatricOtDiagrams.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/PediatricOtDiagrams.tsx#L1-L754) is a comprehensive 754-line custom SVG library supporting 28 distinct `diagramType` postures (`starfish_open`, `fetal_tuck`, `weighted_burrow`, `head_turn_lizard`, `seated_fencer_desk`, `cat_cow_flex`, `cat_cow_extend`, `quadruped_table`, `superman_prone`, `airplane_prone`, `meatball_hug`, `peanut_ball_rock`, `snow_angel_sweep`, `pelvic_tail_wag`, `towel_curl`, `marble_pickup`, `sole_calcaneal_glide`, `finger_opposition`, `palm_acupressure`, `facial_circle`, `straw_bubble_blow`, `isometric_press`, `rhythmic_infant_rock`, `seated_starfish_desk`, `cross_crawl_march`, `amphibian_slide`, `scooter_board`, `lycra_tunnel`, `therapy_putty`, `spiky_roller`, `mat_setup`).
  - [`PathwayHeroVisual.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/PathwayHeroVisual.tsx#L1-L142) renders the active step's SVG diagram alongside a multi-step timeline ribbon and `DO` / `SAY` coaching cards.
- **3 Critical Bugs Discovered in the Visual Pipeline:**
  1. **Bug A — `StepIllustration.tsx` Hides All `PediatricOtDiagram` SVGs Behind Duplicate Static Photos ([`StepIllustration.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/StepIllustration.tsx#L19-L86)):**
     - Look at line 19 of [`StepIllustration.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/StepIllustration.tsx#L19):
       ```ts
       const activeImage = step.imageUrl || fallbackImageUrl;
       ```
       And lines 69–86:
       ```tsx
       {activeImage ? (
         <img src={activeImage} alt={step.title} ... />
       ) : (
         <PediatricOtDiagram diagramType={step.diagramType} ... />
       )}
       ```
     - Because **every single `TransientStep` in `reflexData.ts` defines `imageUrl: "/images/<reflex>.jpg"`** (and `StepIllustration` also receives `fallbackImageUrl`), `activeImage` is **always truthy**!
     - **Result:** The inline `<PediatricOtDiagram>` in `StepIllustration.tsx` (lines 77–84) is **dead code that never renders on the page**! Instead, all 3–4 step cards in `CircuitRunner` and `ReflexLibrary` render the **exact same static JPEG photo 3–4 times in a row**, and even when the user clicks to zoom ([line 21](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/StepIllustration.tsx#L21)), `modalTab` defaults to `"photo"` instead of `"diagram"`!
     - **Fix Required:** Render `<PediatricOtDiagram>` as the **primary inline step visual** on every `StepIllustration` card (with a small toggle or modal tab for the reference photo), and default `modalTab` to `"diagram"`.
  2. **Bug B — `PathwayHeroVisual.tsx` Step Buttons Are Unclickable Because `onSelectStep` Is Never Passed ([`PathwayHeroVisual.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/PathwayHeroVisual.tsx#L15-L113), [`CircuitRunner.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/CircuitRunner.tsx#L753-L758), [`ReflexLibrary.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/ReflexLibrary.tsx#L330-L333)):**
     - `PathwayHeroVisual` accepts `activeStepIndex` (defaulting to `0`) and `onSelectStep?: (index: number) => void`.
     - In [`ReflexLibrary.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/ReflexLibrary.tsx#L330-L333), `<PathwayHeroVisual pathway={activePathway} fallbackImageUrl={...} />` is called **without `activeStepIndex` or `onSelectStep`**, so clicking "Step 2" or "Step 3" in the `PathwayHeroVisual` header does nothing at all—it is permanently frozen on Step 1!
     - In [`CircuitRunner.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/CircuitRunner.tsx#L753-L758), `activeStepIndex={activeStepIndex}` is passed, **but `onSelectStep={setActiveStepIndex}` is omitted**, AND the timer never advances `activeStepIndex` while running! Thus, unless the user enables PECS Mode and clicks the PECS buttons, `PathwayHeroVisual` in `CircuitRunner` is also permanently stuck on Step 1!
  3. **Bug C — Anatomical Contradictions in `head_turn_lizard` and `sole_calcaneal_glide` in [`PediatricOtDiagrams.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/PediatricOtDiagrams.tsx#L180-L212) (Detailed in Part 2.1 below).**

### 1.3 Zero-PII Functional Neuro-Sensory Intake & Deep Wiring Verification (`ProfileModal.tsx`, `storage.ts`, `App.tsx`, `CircuitRunner.tsx`)
- **Status:** ⚠️ **89% COMPLETE — STRONG UI & PRESETS, 3 WIRING GAPS REMAIN**
- **What Worked Exceptionally Well:**
  - [`ProfileModal.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/ProfileModal.tsx) implements a best-in-class Zero-PII clinical intake with 1-click preset personas (**Maya** - Sensory Avoidant L1, **Leo** - Seeker & W-Sitter L2, **Sam** - Non-Speaking High Support L3), sibling switcher, and JSON backup/restore.
  - [`CircuitRunner.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/CircuitRunner.tsx#L113-L118) checks `childProfile?.supportNeed === 'extensive_hands_on'` and automatically defaults to the `assisted_passive` exercise pathway.
  - [`CircuitRunner.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/CircuitRunner.tsx#L850-L869) dynamically renders a **Hypotonia Support** bolster alert when `muscleTone === 'hypotonic'` and a **Sensory Seeker Primer** alert when `sensoryProfile === 'sensory_seeking'`.
- **3 Wiring Gaps Identified:**
  1. **Multi-Child Storage Collision in [`storage.ts`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/utils/storage.ts#L6-L13):**
     - `ProfileModal.tsx` allows creating and switching between multiple children (`kineticbloom_profiles_v2` + `kineticbloom_active_profile_id_v2`).
     - **However**, `getStoredScores()` / `saveStoredScores()` and `getStoredLogs()` / `saveStoredLogs()` read and write to global singleton keys (`kineticbloom_scores_v2` and `kineticbloom_logs_v2`) that are **NOT scoped by `profile.id`**!
     - If a parent or OT switches from **Maya** to **Sam**, Sam inherits Maya's exact INPP screener scores and session logs, and editing Sam's screener overwrites Maya's data.
  2. **`cuePreference` Is Defined in `types.ts` & `PRESET_PERSONAS`, But Dropped by `ProfileModal.tsx` and Ignored by `CircuitRunner.tsx`:**
     - `ChildProfile.cuePreference` (`'imaginative_story' | 'literal_clear' | 'hands_free_audio'`) is defined in [`types.ts`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/types.ts#L167) and populated in `PRESET_PERSONAS` ([`storage.ts`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/utils/storage.ts#L72-L94)).
     - Yet [`ProfileModal.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/ProfileModal.tsx#L140-L150) has no state or UI selector for `cuePreference` and strips it when saving!
     - Furthermore, [`CircuitRunner.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/CircuitRunner.tsx#L134) hardcodes `useState(false)` for `isLiteralMode` and `isPecsMode` instead of initializing `isLiteralMode` from `childProfile?.cuePreference === 'literal_clear'` (or `supportNeed === 'moderate_visual'`) and `isPecsMode` from `childProfile?.supportNeed === 'extensive_hands_on'`.
     - Even worse, in [`CircuitRunner.tsx` line 897](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/CircuitRunner.tsx#L897-L902), `<StepIllustration>` is rendered **without passing `isLiteralMode={isLiteralMode}`**! So toggling "Literal Mode ON" in `CircuitRunner` does not update the `SAY (Parent Script)` on the step cards below!
  3. **`sensoryProfile === 'sensory_avoidant'` Has No Automatic Adaptation:**
     - Selecting a `sensory_avoidant` child (like Maya) does not auto-enable `sensoryMode = 'calm_dark'` in `App.tsx`, nor does `CircuitRunner.tsx` show a **Sensory Avoidant / Tactile Defensiveness** coaching card (e.g., *"Use firm predictability over light ticklish touch; dim room lights and lower voice cue volume"*).

### 1.4 Verification of the 6 Round 2 Bugs

| Round 2 Bug | Status | Verification Details |
| :--- | :---: | :--- |
| **Bug 1:** TLR SVG keys `superman_lift` & `meatball_curl` falling through to default | ✅ **FIXED** | [`reflexData.ts`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/data/reflexData.ts#L831-L844) updated to `superman_prone` & `meatball_hug`, and [`PediatricOtDiagrams.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/PediatricOtDiagrams.tsx#L290-L295) handles both alias pairs. |
| **Bug 2:** `generateRecommendedDeck` sorting Grade 3 Tier 4 above Grade 2 Tier 1 | ✅ **FIXED** | [`storage.ts`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/utils/storage.ts#L424-L438) now sorts strictly by `sigB !== sigA` (`score >= 2`), then by `tierOf[a] - tierOf[b]` (Tier 1 $\rightarrow$ 4), then by `scoreB - scoreA`. |
| **Bug 3:** `"All 10 Reflexes"` label in `ReflexLibrary.tsx` & missing pathways | ✅ **FIXED** | [`ReflexLibrary.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/ReflexLibrary.tsx#L87) now reads `'All 11 Reflexes'` and all 11 reflexes have 4–5 clinical pathways (52 total). |
| **Bug 4:** `⚡ 60s Micro-Win` button setting timer to `30` instead of `60` | ✅ **FIXED** | [`CircuitRunner.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/CircuitRunner.tsx#L306) now calls `setTimeLeft(60)` (minor: tooltip at line 956 still says `"30-second"`). |
| **Bug 5:** Unilateral L/R asymmetry not surfaced in `CircuitRunner.tsx` | 🟡 **PARTIAL** | [`CircuitRunner.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/CircuitRunner.tsx#L834-L847) now shows a **Hemispheric Asymmetry Coaching** alert banner, but the Bilateral Pacer (lines 227–233) still alternates 50/50 instead of a 2:1 duration/rep bias on the weaker side. |
| **Bug 6:** Step cards not advancing or clickable during active timer | 🟡 **PARTIAL** | `PathwayHeroVisual` has step buttons, but `onSelectStep` is not passed from `CircuitRunner` or `ReflexLibrary`, and the timer does not auto-advance `activeStepIndex` across the drill duration. |

---

## PART 2: Thorough Clinical & Architectural Gap Analysis — Path to a 100% Complete Platform

To elevate KineticBloom from **93.5/100** to a **100/100 Gold-Standard Clinical Platform**, here is the complete breakdown of every remaining clinical, biomechanical, and architectural gap.

### 2.1 Anatomical & Biomechanical Accuracy Audit of `PediatricOtDiagrams.tsx`

1. **CRITICAL Biomechanical Inversion in `head_turn_lizard` ([`PediatricOtDiagrams.tsx` lines 180–212](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/PediatricOtDiagrams.tsx#L180-L212)):**
   - **What the Exercise Actually Is (`atnr_lizard` in `reflexData.ts` lines 2158–2185):** In the Prone Lizard / Amphibian-ATNR dissociation exercise, when the child turns their head to the **RIGHT (face-side)**, they bend the **face-side (RIGHT) arm and RIGHT knee to 90°**, while keeping the **skull-side (LEFT) arm straight down by their side (palm UP) and LEFT leg straight**.
   - **What the SVG Currently Draws:**
     - Lines 188–192 draw **four limbs on the right side** (both an extended arm/leg in `#0D9488` AND a flexed arm/leg in `#64748B`), creating a confusing 6-limb silhouette!
     - Line 199 labels the red compensation warning `"Watch: Skull Arm Flexed 90°"` and line 206 titles the diagram `"HEAD TURN RIGHT • HOMOLATERAL EXTENSION"`.
     - That describes the **raw retained ATNR fencer reflex** (where turning the head extends the face-side limbs and flexes the skull-side limbs), which contradicts the `atnr_lizard` instructions directly below it (`"Turn head to RIGHT. Slowly slide RIGHT knee and RIGHT elbow up to a 90° angle"`).
   - **Clinical Fix:** Separate `head_turn_lizard` (Prone Homolateral Flexion: face-side elbow & knee flexed to 90°, skull-side arm extended straight down with palm UP, skull-side leg straight) from a dedicated `fencer_supine` diagram (for `atnr_passive_fencer` / `atnr_standing_laser` where face-side arm extends and skull-side arm flexes).

2. **Neurological Stimulus vs. Integration Inversion in `sole_calcaneal_glide` ([`PediatricOtDiagrams.tsx` lines 445–474](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/PediatricOtDiagrams.tsx#L445-L474)):**
   - **What the SVG Currently Draws:** An upward arrow along the lateral border of the foot labeled `"LATERAL BORDER FIRM STROKE (HEEL TO METATARSALS)"` with toes fanning (`"Involuntary Toe Extension"`).
   - **Why This Matters Clinically:** Stroking from the heel up the lateral border to the metatarsals is the **diagnostic Babinski provocation test** (which elicits the reflex). When used as the diagram for `plantar_passive_grounding` (step 1–3) and `fpr_rhythmic_infant_rock` (step 2: Calcaneal Heel Cup), it tells parents to perform the Babinski trigger stroke!
   - **Clinical Fix:** Update `sole_calcaneal_glide` to depict **Deep Calcaneal Heel Cupping & Metatarsal-to-Heel Grounding Pressure** (green calming vector from ball of foot down to heel cup + sustained arch thumb press).

3. **Render Unused `alignmentCheck` and `compensationWarning` Props Inside `PediatricOtDiagrams.tsx` ([lines 16–18](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/PediatricOtDiagrams.tsx#L16-L18)):**
   - Currently `_alignmentCheck` and `_compensationWarning` are prefixed with underscores and ignored inside `PediatricOtDiagrams.tsx`. Rendering them in a clean footer strip inside the SVG viewBox (or using them to dynamically label the green/amber callout pills) ensures every step's SVG reflects its exact step-level alignment cue.

---

### 2.2 Dynamic Tracking & Auto-Progression of the 3-Stage Neuro-Developmental Progression Ladder

- **Clinical Gap:** In INPP, MNRI, and Brain Balance clinical protocols, a child does not perform the exact same pathway forever. Each reflex follows a **3-Stage Neuro-Developmental Progression Ladder**:
  - **Stage 1: Passive Co-Regulation & Proprioceptive Mapping** (`assisted_passive` / `rhythmic_movement` — Weeks 1–2 or whenever in Red/Yellow survival state)
  - **Stage 2: Isometric Stabilization & Anti-Gravity Hold** (`isometric_resistance` — Weeks 3–4, building static muscle spindle / Golgi tendon inhibition without momentum)
  - **Stage 3: Slow Isotonic Dissociation & 60 BPM Metronome Pacing** (`primary_movement` / `classroom_desk` — Weeks 5–8, cortical inhibition under slow dynamic load)
- **What Is Currently Missing:**
  - While `reflexData.ts` now contains pathways for all three stages, the app treats them as flat, unordered tabs (`Pathway 1`, `Pathway 2`, `Pathway 3`...).
  - In Fact, `Pathway 1` is currently `primary_movement` (Stage 3 hardest dynamic movement!), while `Pathway 2` is `assisted_passive` (Stage 1) and `Pathway 3/4` is `isometric_resistance` (Stage 2).
  - There is **no per-reflex Mastery / Stage Progression tracker** that automatically advances a child from **Stage 1 (Passive/Rhythmic)** $\rightarrow$ **Stage 2 (Isometric)** $\rightarrow$ **Stage 3 (Slow Dynamic)** after logging e.g. 5 `smooth_slow` or `assisted_passive` sessions without compensations!
- **Required Architectural Addition:**
  - Add a **Neuro-Developmental Stage Ladder Badge (`Stage 1: Passive/Rhythmic` $\rightarrow$ `Stage 2: Isometric Hold` $\rightarrow$ `Stage 3: Slow Dynamic Mastery`)** in `CircuitRunner.tsx` and `ProgressDashboard.tsx` calculated from the child's logged sessions per reflex, automatically recommending the appropriate stage pathway!

---

### 2.3 Sensory Warm-Up / Vagal Primer Module (Pre-Circuit Readiness)

- **Clinical Gap:** In pediatric OT clinics (Harkla, Brain Balance, MNRI), we **never** jump cold from an autonomic check-in straight into complex reflex dissociation drills (like ATNR Lizard or STNR Cat-Cow). A dysregulated or ADHD/Sensory-Seeking nervous system needs **60–90 seconds of Vagal & Proprioceptive Priming** first:
  1. **Dopamine Heavy-Work Primer (for Yellow/Blue Zone or Sensory Seekers):** 10 Wall Push-Ups or 20s Joint Compressions to flood proprioceptive tracts.
  2. **Cranial / Vagal Nerve Co-Regulation Primer (for Red/Yellow Zone or Sensory Avoidant):** 3 Physiological Sighs (double inhale + long audible exhale / humming `"Vooo"` vibration) + Palmar Eye Cupping (CN II/III/X).
  3. **Oculomotor / Vestibular Horizontal Tracking Check (for Tier 2 & 3 Circuits):** 15 seconds of smooth thumb tracking across visual midline without head movement.
- **Required Architectural Addition:**
  - Add an optional **60-Second Sensory & Vagal Warm-Up Primer** step between `deck_select` and `exercising` in [`CircuitRunner.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/CircuitRunner.tsx) (with a 1-tap `"Skip Warm-Up"` button if already primed).

---

### 2.4 Longitudinal Outcome Tracking, Re-Evaluation Snapshots & Functional Symptom Checklists

- **Clinical Gap:**
  1. **Overwritten Screener Scores (`storage.ts`):** Currently, when a parent re-tests their child at Week 4 or Week 8 in `AssessmentWizard.tsx`, `saveStoredScores()` overwrites `kineticbloom_scores_v2` in place. The parent and OT **lose the Baseline assessment scores** and cannot see the **Baseline vs. Current Grade Delta** (e.g., *Moro: Grade 3 $\rightarrow$ Grade 1 (-2 improvement)*)!
  2. **Missing Functional Real-World Symptom Tracker:** Parents don't just care about whether the Moro tilt test improved—they care whether **daily meltdowns, handwriting fatigue, W-sitting, motion sickness, bedwetting, and reading line-skipping** improved!
- **Required Architectural Addition:**
  - Store `assessmentHistory: AssessmentSnapshot[]` per child profile in `storage.ts` (automatically capturing a baseline snapshot on first assessment and saving dated re-test snapshots).
  - Display a **Baseline vs. Current Neurological Integration Comparison Card** in [`ProgressDashboard.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/ProgressDashboard.tsx) showing per-reflex Grade reductions (`G3 ➔ G1`) alongside a **4-Week Re-Evaluation Due Prompt** when `currentWeek >= 4`.

---

### 2.5 Multi-Child Roster Isolation, Therapist/Parent Report Export & Safety Guardrails

1. **Per-Child Scoped Storage (`storage.ts`):**
   - Scope `scores` and `logs` by `activeProfileId` (`kineticbloom_scores_v2_${profileId}` and `kineticbloom_logs_v2_${profileId}` with automatic fallback/migration from global keys) so switching between **Maya (L1)**, **Leo (L2)**, and **Sam (L3)** in `ProfileModal.tsx` loads each child's distinct clinical profile, screener scores, and session logs!
2. **Header Badge Generalization (`App.tsx` line 120):**
   - In [`App.tsx` line 120](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/App.tsx#L120), the header badge currently hardcodes `(ASD L1)` / `(ASD L2)` / `(ASD L3)` based on `supportLevel`. Since KineticBloom is a Zero-PII functional platform serving ADHD, SPD, Dyslexia, DCD, and ASD alike, replace `(ASD L1)` with functional support labels (`Independent` / `Visual Guided` / `Hands-On Co-Reg`).
3. **Clinical Contraindication & Stop-Rule Banner (`CircuitRunner.tsx`):**
   - Add a collapsible **Autonomic Overstimulation Stop-Rule Guardrail** in `CircuitRunner.tsx`: if a child exhibits sudden pallor, nausea/dizziness (vestibular overload during TLR/Landau), hiccups, or autonomic sweating, immediately pause and transition to Calcaneal Grounding.

---

## PART 3: Concrete Action Plan for Final 100/100 Polish (Prioritized Checklist)

1. **Fix `StepIllustration.tsx` Visual Priority ([`src/components/StepIllustration.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/StepIllustration.tsx#L65-L86)):**
   - Render `<PediatricOtDiagram>` as the primary visual on every step card so each step (`Step 1`, `Step 2`, `Step 3`, `Step 4`) displays its unique anatomical posture diagram instead of repeating the same static fallback photo 4 times. Default `modalTab` to `"diagram"`.
2. **Fix `PediatricOtDiagrams.tsx` Biomechanics ([`src/components/PediatricOtDiagrams.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/PediatricOtDiagrams.tsx#L180-L212)):**
   - Fix `head_turn_lizard` so the **face-side (Right) arm and leg are flexed 90°** and the **skull-side (Left) arm and leg are extended straight**, matching `atnr_lizard`.
   - Fix `sole_calcaneal_glide` ([lines 445–474](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/PediatricOtDiagrams.tsx#L445-L474)) so it depicts calming calcaneal cupping & top-to-heel grounding pressure rather than the Babinski trigger stroke.
   - Render `alignmentCheck` and `compensationWarning` inside the SVG footer badge when provided.
3. **Wire Step Selection & Auto-Advance in `PathwayHeroVisual.tsx`, `CircuitRunner.tsx`, and `ReflexLibrary.tsx`:**
   - Pass `onSelectStep={setActiveStepIndex}` in `CircuitRunner.tsx` and add `activeStepIndex` state + `onSelectStep` in `ReflexLibrary.tsx`.
   - Auto-advance `activeStepIndex` proportionally as `timeLeft` counts down in `CircuitRunner.tsx`.
   - Pass `isLiteralMode={isLiteralMode}` to `<StepIllustration>` in `CircuitRunner.tsx` (line 897).
4. **Complete Multi-Child Profile Isolation & `cuePreference` Wiring (`storage.ts`, `ProfileModal.tsx`, `App.tsx`, `CircuitRunner.tsx`):**
   - Scope `getStoredScores(profileId)` and `getStoredLogs(profileId)` per child profile in `storage.ts`, with preset-appropriate initial scores for Maya, Leo, and Sam.
   - Add `cuePreference` selector to `ProfileModal.tsx` and initialize `isLiteralMode` / `isPecsMode` / `sensoryMode` in `CircuitRunner.tsx` and `App.tsx` from the active `ChildProfile`.
5. **Add 60s Sensory & Vagal Warm-Up Primer + Longitudinal Baseline vs. Current Comparison (`CircuitRunner.tsx`, `ProgressDashboard.tsx`, `storage.ts`):**
   - Add an optional 60-second **Vagal & Heavy-Work Warm-Up Primer** step before `exercising` in `CircuitRunner.tsx`.
   - Track Baseline vs. Current INPP score snapshots in `storage.ts` and visualize per-reflex Grade improvements + 3-Stage Progression Ladder status in `ProgressDashboard.tsx`.

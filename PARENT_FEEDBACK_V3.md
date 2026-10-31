# KineticBloom — Round 3 Parent & Caregiver Advocate Verification & "Path to 100% Complete Production App" Blueprint

**Evaluated By:** Parent & Caregiver Advocate (Representing Families of Neurodivergent Children Across ASD Support Levels 1, 2, and 3)  
**Target Application:** KineticBloom (`http://localhost:3000/` | `/Users/naga.aerakoni/workspace/projects/kinetic-bloom`)  
**Evaluation Round:** Round 3 — Post-Iteration 2 Verification + Holistic Blueprint to 100% Production Readiness

---

## Executive Summary & Overall Score Evolution

| Evaluation Dimension | Round 1 | Round 2 | **Round 3 (Current)** | Status |
| :--- | :---: | :---: | :---: | :--- |
| **Emotional Tone & Parent Co-Regulation** | 8.5 / 10 | 9.5 / 10 | **9.7 / 10** | Production-Grade |
| **Living-Room Floor Usability (Hands-Free / 8-Ft Rule)** | 6.5 / 10 | 9.0 / 10 | **9.2 / 10** | Minor Step-Sync Polish Needed |
| **Clinical Sequencing & Multi-Modality Depth (7 Pathways)** | 7.0 / 10 | 8.2 / 10 | **9.8 / 10** | **Fixed!** Tier-1-First Sort + 7 Modalities |
| **Visual Clarity, OT Diagrams & Video Reliability** | 5.0 / 10 | 5.5 / 10 | **9.4 / 10** | **11/11 YouTube Videos Live!** (1 UI toggle bug in `StepIllustration`) |
| **ASD Level 1 / 2 / 3 Neuro-Sensory Adaptability** | 6.0 / 10 | 8.8 / 10 | **9.5 / 10** | Huge Leap (Profile + Literal + PECS + Passive Auto-Select) |
| **Multi-Child Data Architecture & Longitudinal Tracking** | 5.5 / 10 | 8.5 / 10 | **8.0 / 10** | Shared Scores/Logs Bug Across Profiles |
| **OVERALL PARENT ADVOCATE SCORE** | **6.4 / 10** | **8.2 / 10** | **9.3 / 10** | **Ready for Final Polish to Reach 10.0 / 10** |

---

## Part 1: Round 3 Verification of Iteration 2 Fixes (What Was Fixed & Verified)

As a parent testing this app on the living-room rug with three very different neurodivergent profiles—**Maya (Age 8, ASD Level 1)**, **Leo (Age 7, ASD Level 2)**, and **Sam (Age 5, ASD Level 3 Non-Verbal)**—Iteration 2 resolved **every single P0 blocker** from Round 2:

### 1. 100% Working YouTube Video Demonstrations (11/11 Verified via YouTube oEmbed)
In Round 2, 10 out of 11 YouTube video IDs in [`reflexData.ts`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/data/reflexData.ts) were hallucinated/dead (`Video unavailable`). In Round 3, we programmatically tested every unique `youtubeId` and `assessmentVideoId` in [`reflexData.ts`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/data/reflexData.ts) against YouTube's oEmbed endpoint:
- `7oOSBuzGUys` — *Primitive Reflex Integration: Simple, Play-Based Strategies for Cognitive and Motor Delays* (Harkla) ✅
- `DQQFcN72gno` — *What is the Asymmetrical Tonic Neck Reflex (ATNR)? Signs, Symptoms & Integration Explained* (Harkla) ✅
- `WFWW1fr3dlw` — *What is the Moro Reflex? Signs, Symptoms & Integration Explained* (Harkla) ✅
- `XS2nM_suVTc` — *What Is the Palmer Grasp Reflex? | Signs, Retention & OT Activities* (Harkla) ✅
- `ZkGDm3t2hb8` — *How to Assess Retained Primitive Reflexes - 6 Most Common Ones* (Harkla) ✅
- `hgg3TRqb7TM` — *What is the STNR Reflex? | Primitive Reflexes Explained for Parents & Therapists* (Harkla) ✅
- `hopxSwLLSWI` — *Spinal Galant Reflex Explained | Primitive Reflexes in Babies & Children* (Harkla) ✅
- `iXOEAnEJD48` — *What Is the Rooting Reflex? | Signs, Timing & OT Tips for Parents* (Harkla) ✅
- `sP8IBcpFRpM` — *Why They Shut Down (How a Retained Fear Paralysis Reflex Impacts Kids!)* (Harkla) ✅
- `t2luajmBIyc` — *Why Your Child's Feet Are So Sensitive (The Babinski Reflex May Be to Blame)* (Harkla) ✅
- `xDkduQyZsQg` — *Does Your Child Have Retained Reflexes? TLR vs. Landau Reflex Explained* (Harkla) ✅

Plus, [`ReflexLibrary.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/ReflexLibrary.tsx#L413-L427) and [`AssessmentWizard.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/AssessmentWizard.tsx#L861-L875) now include a resilient `"Open in YouTube app ↗"` fallback card for clinics or school Wi-Fi networks that block embedded iframes.

### 2. Clinical Tier-1-First Priority Sorting Fixed in `generateRecommendedDeck`
- In [`storage.ts`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/utils/storage.ts#L420-L438), `generateRecommendedDeck` now properly groups significant retentions (`score >= 2` vs. `< 2`), then sorts strictly by **Neurological Tier (`tierOf[a] - tierOf[b]`, Tier 1 $\rightarrow$ Tier 4)** before breaking ties by severity score!
- If a child has Grade 2 Moro (Tier 1) and Grade 3 Palmar (Tier 4), Tier 1 Moro is now always prioritized first—honoring the clinical brainstem-to-cortex hierarchy.

### 3. Comprehensive Pediatric OT Biomechanical Diagram Engine (`PediatricOtDiagrams.tsx` + `PathwayHeroVisual.tsx`)
- [`PediatricOtDiagrams.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/PediatricOtDiagrams.tsx) (754 lines) now renders **31 distinct, clinically annotated SVG diagrams** covering every single `diagramType` in [`reflexData.ts`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/data/reflexData.ts) (including `superman_prone`, `airplane_prone`, `meatball_hug`, `peanut_ball_rock`, `amphibian_slide`, `scooter_board`, `lycra_tunnel`, `therapy_putty`, `spiky_roller`, `mat_setup`, etc. — fixing the Round 2 missing-key fallback bug).
- Includes **Green Alignment Check Badges**, **Red Compensation Warning Pins**, **Caregiver Hand-Placement Overlays (`CAREGIVER HOLD`)**, **60 BPM BRMT Sinusoidal Wave Ribbons**, and **6s MNRI Isometric Hold Badges**.
- [`PathwayHeroVisual.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/PathwayHeroVisual.tsx) (142 lines) renders an interactive 2-panel/4-panel Start $\rightarrow$ Movement $\rightarrow$ Finish visual sequence with a 1-tap toggle between **📐 Anatomical OT Sequence** and **📷 Reference Photo**.

### 4. Rich Neuro-Sensory Child Profile Modal & Adaptive Circuit Execution
- [`ProfileModal.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/ProfileModal.tsx) provides a Zero-PII Setup Wizard with 1-click sample personas (**Maya - ASD L1**, **Leo - ASD L2**, **Sam - ASD L3**), Support Need Level, Sensory Modulation Profile (`sensory_seeking`, `sensory_defensive`, `sensory_under_responsive`, `mixed_fluctuating`), Muscle Tone (`hypotonic`, `hypertonic_tense`, `typical_variable`), Cue Preference, Preferred Reward, and JSON Backup Export/Import.
- [`CircuitRunner.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/CircuitRunner.tsx) dynamically adapts to the active child profile:
  - **ASD Level 3 / Extensive Hands-On (`isHighSupportChild`, L113–117):** Automatically defaults `activePathwayIndex` to the **Assisted / Passive Co-Regulation (`assisted_passive`)** pathway so non-verbal or high-support children aren't handed impossible multi-step motor commands.
  - **ASD Level 2 Literal Mode (`isLiteralMode`, L668–678) & ASD Level 3 PECS Token Board (`isPecsMode`, L585–621):** Interactive visual token board (`1 ➔ 2 ➔ 3 ➔ 4 ➔ 🏆`) and literal/concrete script toggle right inside the circuit runner.
  - **Muscle Tone & Sensory Alerts (L850–869):** Displays a **Hypotonia Support** bolster alert when `muscleTone === 'hypotonic'` and a **Sensory Seeker Primer** (30s deep joint compressions / weighted lap hug) when `sensoryProfile === 'sensory_seeking'`.
  - **All 11 Reflexes Screener Access (`AssessmentWizard.tsx`):** Added **Deep-Dive vs. All 11 Grid** mode switcher and an always-visible **11-Reflex Jump Ribbon** showing live grades (`G0`–`G3` and `L2/R1` unilateral badges).
  - **Round 2 UI Micro-Fixes Verified:** `triggerMicroWin` sets `timeLeft(60)` to match `"⚡ 60s Micro-Win"`, and [`ReflexLibrary.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/ReflexLibrary.tsx#L87) displays `"All 11 Reflexes"`.

---

## Part 2: Remaining Bugs & Technical Gaps Discovered in Round 3

While testing all flows end-to-end in Round 3, we uncovered **6 specific bugs/disconnects** in the current implementation that prevent the existing features from working seamlessly together:

### Bug 1 (High Priority — Multi-Child Data Collision): Assessment Scores & Session Logs Are Global Instead of Per-Child
- **Where:** [`storage.ts`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/utils/storage.ts#L10-L15) and [`App.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/App.tsx#L28-L82).
- **What Happens:** `ProfileModal` allows a parent to create and switch between multiple children (e.g., Maya, Leo, and Sam). However, `loadAssessmentScores()` / `saveAssessmentScores()` (`kineticbloom_scores_v2`) and `loadRegulationLogs()` / `saveRegulationLogs()` (`kineticbloom_logs_v2`) are stored as a **single global object/array**, NOT keyed by `activeProfile.id`!
- **Real-World Parent Impact:** When a parent switches from their 8-year-old (Maya) to their 5-year-old sibling (Sam) and completes the Screener or logs a circuit, **Sam's scores and logs overwrite Maya's scores and logs**.
- **Fix Required:** Store scores and logs per profile ID (e.g., `Record<string, AssessmentScores>` and `Record<string, RegulationLog[]>` keyed by `profile.id`, or attach `profileId: string` to each `RegulationLog` and store `assessmentScores?: AssessmentScores` on `ChildProfile`). Also provide preset-specific baseline scores when loading Maya, Leo, or Sam.

### Bug 2 (High Priority — Sample Persona Switcher Overwrites Active Profile): `handleLoadPreset` in `ProfileModal.tsx`
- **Where:** [`ProfileModal.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/ProfileModal.tsx#L95-L112).
- **What Happens:** When a user clicks one of the 3 sample persona cards (`Maya (8y) • ASD L1`, `Leo (7y) • ASD L2`, `Sam (5y) • ASD L3`), `handleLoadPreset(preset)` copies `preset`'s fields into the **currently active profile (`id: activeId`)** instead of adding/activating `preset.id` as its own separate profile!
- **Real-World Parent Impact:** If a parent created a custom profile for their child and clicks a sample persona to see what it looks like, their child's profile gets overwritten in-place instead of switching to the sample persona.
- **Fix Required:** `handleLoadPreset` should check if `preset.id` already exists in `profiles`; if so, switch `activeId` to `preset.id` (updating it cleanly); if not, append `preset` to `profiles` and set `activeId = preset.id`.

### Bug 3 (High Priority — Hidden Biomechanical SVG Diagrams on Step Cards): `StepIllustration.tsx` Defaults to Static `.jpg` Instead of `PediatricOtDiagram`
- **Where:** [`StepIllustration.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/StepIllustration.tsx#L19-L86).
- **What Happens:** Look at lines 19 and 69–86 of `StepIllustration.tsx`:
  ```tsx
  const activeImage = step.imageUrl || fallbackImageUrl;
  const [modalTab, setModalTab] = useState<"diagram" | "photo">(activeImage ? "photo" : "diagram");
  ```
  Because every pathway in [`reflexData.ts`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/data/reflexData.ts) has a `fallbackImageUrl` (and 207 steps have `imageUrl` pointing to the same reflex-level photo like `/images/moro_starfish.jpg`), `activeImage` is **always truthy**. Consequently:
  1. All 4 `<StepIllustration />` cards in a drill render the **exact same static photo** for Step 1, Step 2, Step 3, and Step 4!
  2. The custom step-by-step `<PediatricOtDiagram />` (which actually shows the distinct posture for Step 1 Setup vs. Step 2 Movement vs. Step 3 Hold vs. Step 4 Release) is **never rendered on the card**, and even when the user clicks to open the zoom modal, `modalTab` defaults to `"photo"` instead of `"diagram"`!
- **Fix Required:** Render `<PediatricOtDiagram />` as the **primary visual** on every `<StepIllustration />` card (and default `modalTab` to `"diagram"`), with a small badge or toggle to view the `"📷 Reference Photo"`. That way, Steps 1, 2, 3, and 4 are visually distinct at a glance from 8 feet away!

### Bug 4 (Medium Priority — Profile Cue Preference Not Auto-Wiring `CircuitRunner` Modes):
- **Where:** [`CircuitRunner.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/CircuitRunner.tsx#L134-L135) & [`StepIllustration.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/CircuitRunner.tsx#L897-L903).
- **What Happens:**
  1. In `ProfileModal`, a parent can set `childProfile.cuePreference` to `'literal_concrete'` (for Leo, ASD L2) or `'visual_pecs'` (for Sam, ASD L3), and `childProfile.sensoryProfile` to `'sensory_defensive'`.
  2. However, `CircuitRunner.tsx` initializes `isLiteralMode` (L134) and `isPecsMode` (L135) to `false` instead of syncing them via `useEffect` from `childProfile?.cuePreference` / `childProfile?.supportLevel`!
  3. Furthermore, at [`CircuitRunner.tsx` L897–903](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/CircuitRunner.tsx#L897-L903), `<StepIllustration />` is missing the `isLiteralMode={isLiteralMode}` prop (which *was* passed in `ReflexLibrary.tsx`, but forgotten in `CircuitRunner.tsx`)!
  4. And when `isRunning` is true, `activeStepIndex` (0 $\rightarrow$ 1 $\rightarrow$ 2 $\rightarrow$ 3) never auto-advances with the pacer cycle—it only changes if the parent manually taps the PECS token buttons.

### Bug 5 (Medium Priority — Missing Sensory-Defensive & Hypertonic Coaching Callouts in `CircuitRunner`):
- **Where:** [`CircuitRunner.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/CircuitRunner.tsx#L849-L870).
- **What Happens:** `CircuitRunner` renders helpful coaching callouts for `muscleTone === 'hypotonic'` and `sensoryProfile === 'sensory_seeking'`, plus unilateral asymmetry (`scores.lateralized`). However, if a parent selects **`sensory_defensive`** (like Sam's profile!) or **`hypertonic_tense`**, no corresponding clinical adaptation banner appears (e.g., warning to use firm, predictable palm pressure instead of light ticklish touch for `sensory_defensive`, or gentle rhythmic shaking/warmth before extension holds for `hypertonic_tense`).

### Bug 6 (Low/Medium Priority — Tooltip Typo & Simulated Cloud Sync Transparency):
- In [`CircuitRunner.tsx` L956](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/CircuitRunner.tsx#L956), the button says `⚡ 60s Micro-Win` (and sets 60s), but the `title` tooltip still reads `"Struggling today? Downshift to a 30-second micro-win"`.
- In [`ProfileModal.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/ProfileModal.tsx#L73-L93) and [`storage.ts`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/utils/storage.ts#L268-L280), `"Continue with Google"` (`simulateGoogleSignIn`) immediately signs in a hardcoded mock user (`Dr. Sarah (Caregiver & OT)` / `caregiver.ot@gmail.com`) and sets `syncStatus: 'synced'` in `localStorage`. In a production app, this should either connect to real Firebase/Supabase Auth or clearly label itself as **"Local Device Account Preview (Use JSON Export/Import for Cross-Device Transfer)"** so parents don't mistakenly think their data is backed up on Google's servers if they clear browser storage.

---

## Part 3: The "Path to 100% Complete Production App" Blueprint (What Is Still Missing?)

To elevate KineticBloom from a **9.3 / 10 prototype** to a **10.0 / 10, 100% complete, gold-standard production application** that supports families across the entire 8-week neuro-integration lifecycle, here is the complete blueprint of what should be built or completed next:

### Pillar 1: Per-Child Scoped Data Architecture & Multi-Point Longitudinal Progress (Baseline $\rightarrow$ Week 4 $\rightarrow$ Week 8)
1. **Per-Child Scoped Screener Scores & Logs:**
   - Scope `AssessmentScores` and `RegulationLog[]` by `childProfile.id` so multi-child households and pediatric OTs managing multiple caseload profiles have completely isolated data per child.
   - Pre-populate distinct, clinically realistic baseline screener scores and sample session logs for each of the 3 preset personas (**Maya L1**, **Leo L2**, **Sam L3**) so switching personas immediately demonstrates how the entire app (Screener, Recommended Deck, Circuit Runner, and Progress Dashboard) adapts.
2. **Longitudinal Reflex Re-Test Comparison (Baseline vs. Current Grade Chart):**
   - Right now, [`AssessmentWizard.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/AssessmentWizard.tsx) only stores a single current `AssessmentScores` snapshot, and [`ProgressDashboard.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/ProgressDashboard.tsx) only shows session logs—not reflex grade improvements over time!
   - **What to Add:** Store a `baselineScores` snapshot alongside `currentScores` (or a timestamped `AssessmentHistoryEntry[]`) per child, and display a **"Neurological Integration Progress Tracker (Baseline vs. Current Grade)"** visual comparison inside `ProgressDashboard.tsx` so parents and OTs can see at a glance: *e.g., Moro Reflex: Grade 3 (Baseline) $\rightarrow$ Grade 1 (Current)*.

### Pillar 2: First-Time Guided Parent Onboarding & Daily "Where Do I Start?" Flow
1. **Interactive Welcome / Onboarding Banner for New Parents:**
   - When a stressed parent lands on KineticBloom for the first time, they see 4 top navigation tabs (`Daily Circuit`, `11-Reflex Screener`, `Reflex Handbook`, `8-Week Progress`).
   - **What to Add:** A collapsible **"3-Step Getting Started Guide"** card at the top of the home view (or a 1-click guided path):
     - **Step 1:** Choose or customize your child's Neuro-Sensory Profile (`ProfileModal`).
     - **Step 2:** Complete the 5-minute 11-Reflex Screener (`AssessmentWizard`) to map their brainstem-to-cortex hierarchy.
     - **Step 3:** Run your personalized 10-minute Daily Circuit (`CircuitRunner`).

### Pillar 3: Floor-Session Execution Polish (Hands-Free Step Auto-Advancer & Troubleshooting Drawer)
1. **Auto-Advancing `activeStepIndex` Synchronized with Pacer & Highlighted Step Cards:**
   - During an active timer in [`CircuitRunner.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/CircuitRunner.tsx), automatically advance `activeStepIndex` (`0 -> 1 -> 2 -> 3 -> 0`) on each 5-second pacer cycle, and visually highlight the active `<StepIllustration />` card with a glowing teal ring so a parent glancing at the iPad from 8 feet away knows exactly which phase of the movement they are in.
2. **Default `<StepIllustration />` to `<PediatricOtDiagram />` with Photo Toggle:**
   - Fix [`StepIllustration.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/StepIllustration.tsx) so each step card displays its unique anatomical SVG diagram by default (with a 1-tap toggle button on the card corner to switch between `📐 Diagram` and `📷 Photo`).
3. **"Child Resisting or Sensory Overload? Real-Time OT Troubleshooting" Quick-Help Drawer:**
   - Alongside the `"Story"` modal in `CircuitRunner.tsx`, include quick, actionable sensory modifications for the current reflex (e.g., *"Refusing to lie flat on back? Prop shoulders on a wedge/beanbag at 30°"*, *"Laughing/running away? Add 20s firm shoulder pressure before restarting"*).

### Pillar 4: Dedicated Print / IEP / Pediatrician Clinical Summary Stylesheet (`@media print`)
1. **Clean `@media print` Report Layout:**
   - Both `AssessmentWizard.tsx` (Roadmap) and `ProgressDashboard.tsx` have a `"Print OT & Pediatrician Summary"` button calling `window.print()`.
   - Adding a clean `@media print` CSS rule in [`index.css`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/index.css) (hiding navigation buttons/modals, printing the child's Zero-PII profile summary, 4-Tier Reflex Matrix, Unilateral Left/Right scores, Green Regulation Shift %, and Movement Quality breakdown cleanly on 1–2 pages) turns KineticBloom into an instant clinical artifact that parents can bring to their next IEP meeting or developmental pediatrician visit.

---

## Summary Checklist for the Engineering Team (Final Polish to 10/10)

- [ ] **Fix Bug 1 (Per-Child Scoped Data):** Scope `AssessmentScores` (including `baselineScores`) and `RegulationLog[]` per `childProfile.id` in `storage.ts` and `App.tsx`, with tailored presets for Maya (L1), Leo (L2), and Sam (L3).
- [ ] **Fix Bug 2 (Preset Switcher):** Fix `handleLoadPreset` in `ProfileModal.tsx` so clicking Maya, Leo, or Sam switches to/activates that persona's own `id` (`preset-level1`, `preset-level2`, `preset-level3`) without overwriting the user's custom profile.
- [ ] **Fix Bug 3 (Step Card Diagrams):** Update `StepIllustration.tsx` so the step-specific `<PediatricOtDiagram />` is rendered by default on each step card (with an inline `📐 Diagram / 📷 Photo` toggle), rather than hiding the diagram behind the repeated fallback `.jpg`.
- [ ] **Fix Bug 4 & 5 (Auto-Wire Profile Preferences & Step Sync in `CircuitRunner.tsx`):**
  - Sync `isLiteralMode` and `isPecsMode` automatically when `childProfile` changes (`cuePreference === 'literal_concrete'` / `'visual_pecs'`).
  - Pass `isLiteralMode={isLiteralMode}` to `<StepIllustration />` in `CircuitRunner.tsx`.
  - Auto-advance `activeStepIndex` during `isRunning` pacer cycles and highlight the active step card.
  - Add clinical coaching banners for `sensory_defensive` and `hypertonic_tense` profiles.
- [ ] **Add Longitudinal Reflex Progress Section in `ProgressDashboard.tsx` & `@media print` CSS:** Show Baseline vs. Current Reflex Grades alongside the session logs, and add `@media print` styling in `index.css` for clean IEP/OT printout reports.

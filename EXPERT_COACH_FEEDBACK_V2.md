# Round 2 Clinical & Technical Verification Report: KineticBloom (`http://localhost:3000/`)

**Prepared By:** Head Coach & Clinical Director — Primitive Reflex Integration, Pediatric Occupational Therapy & Functional Neurology  
**Frameworks Referenced:** INPP (Sally Goddard Blythe), MNRI® (Dr. Svetlana Masgutova), RMTi (Dr. Harald Blomberg & Moira Dempsey), Brain Balance® (Dr. Robert Melillo), Harkla Clinical OT Protocols, and Williams & Shellenberger’s *Pyramid of Learning*.  
**Target Codebase:** `/Users/naga.aerakoni/workspace/projects/kinetic-bloom` (`src/App.tsx`, `src/types.ts`, `src/index.css`, `src/utils/storage.ts`, `src/utils/audioCues.ts`, `src/data/reflexData.ts`, `src/components/*`)

---

## 1. Executive Clinical Summary: Round 2 Verification

The Round 2 engineering iteration represents a **massive leap forward** in both clinical fidelity and real-world floor usability for neurodivergent families. Nearly 90% of the clinical biomechanics, sensory-safe UX guardrails, and hands-free floor execution tools requested in Round 1 are now live in the codebase:

### What Was Implemented Exceptionally Well in Round 2
1. **11-Reflex Clinical Database (`src/types.ts`, `src/data/reflexData.ts`):**
   - Added the two critical missing postural bridge reflexes: **Landau Reflex** (`landau` — Tier 2 Prone Extension & Postural Bridge) and **Amphibian Reflex** (`amphibian` — Tier 3 Cross-Lateral Crawling & Pelvic Dissociation).
2. **Corrected Moro Starfish Biomechanics & Respiratory Coupling (`src/data/reflexData.ts` lines 234–310):**
   - Fixed the respiratory inversion from Round 1! The child now **inhales over 4 seconds while expanding into the 45° Starfish** (facilitating physiological thoracic extension) and **exhales slowly over 5 seconds while folding into the Fetal Embrace** (activating the parasympathetic vagal brake).
   - Added explicit **contralateral upper AND lower midline crossing** (*Rep 1: RIGHT arm over LEFT and RIGHT ankle over LEFT; Rep 2: LEFT arm over RIGHT and LEFT ankle over RIGHT*).
3. **MNRI-Inspired Passive / Assisted Pathways Across All 11 Reflexes (`src/data/reflexData.ts`, `src/components/CircuitRunner.tsx`):**
   - Every single reflex now includes an `assisted_passive` pathway (`fpr_passive`, `moro_passive_repatterning`, `tlr_passive_cradle_flexion`, `landau_passive_ball`, `galant_passive_trunk_crescent`, `amphibian_passive_pelvic_glide`, `atnr_passive_fencer`, `stnr_passive_lap_rocking`, `palmar_babkin_acupressure`, `plantar_passive_grounding`, `rooting_passive_calming_stroke`) plus a 1-tap **"🤝 Make Passive"** downshift button right inside the active timer bar (`CircuitRunner.tsx` line 825).
4. **Strict Form Cues & Compensation Red Flags (`src/data/reflexData.ts`):**
   - **ATNR (`atnr_lizard`):** Explicitly cues head rotation leading the movement, pelvis staying flat on the mat, and the skull-side arm resting straight along the hip with **PALM UP** toward the ceiling (lines 1078–1134).
   - **STNR (`stnr_cat_cow`):** Eliminated the Child's Pose hip-collapse mix-up! Now enforces **Fixed 90° Hip Isolation** directly above the knees with straight elbows during both Cow and Cat phases (lines 1249–1305).
   - **TLR (`tlr_superman_meatball`):** Explicitly warns against cervical hyperextension (*"Chin stays tucked with eyes on mat!"*) and hamstring/knee bending (lines 462–517).
   - **Spinal Galant (`galant_snow_angels`):** Mandates **Synchronous 4-Limb Pacing** where arms and legs move at identical speed with wrists and heels glued to the carpet (lines 777–820).
5. **Unilateral Left vs. Right Hemispheric Scoring (`src/components/AssessmentWizard.tsx` lines 78–101, 380–450):**
   - Added independent Left and Right 0–3 grading for lateralized reflexes (`atnr`, `spinal_galant`, `palmar`, `plantar_babinski`) with automatic peak score calculation and an **"⚡ Asymmetry Detected"** clinical callout.
6. **Red-Zone Sympathetic Meltdown Intercept (`src/components/CircuitRunner.tsx` lines 395–427):**
   - Selecting `Red Zone` in Step 1 (`pre_check`) immediately intercepts standard motor-planning decks, warns the caregiver never to demand active calisthenics during a survival freeze/meltdown, and offers a 1-click **"Start 3-Min Passive Grounding Circuit Now"** (`['fpr', 'moro', 'tlr']` pre-configured to passive pathways `{ fpr: 1, moro: 1, tlr: 1 }`).
7. **Hands-Free Floor Execution (`src/utils/audioCues.ts`, `src/components/CircuitRunner.tsx`):**
   - Synthesized Web Audio API harmonic sine chimes (`playChime`), a 60 BPM woodblock metronome pulse (`playPulseTick`), native `speechSynthesis` voice cues (`speakCue` at `0.88x` calming speech rate), and Screen Wake Lock (`requestWakeLock`) so parents can keep their hands on their child without touching the screen.
8. **Neurodivergent Predictability & Persistence (`src/utils/storage.ts`, `src/index.css`):**
   - Added a **First–Then Visual Schedule Bar**, a **10-Second High-Five Transition Buffer** between exercises, a **Sensory-Safe Calm Dark Mode** (which also disables startling confetti bursts!), **Movement Quality & Compensation Logging**, `localStorage` persistence, real computed streaks/weeks in `ProgressDashboard.tsx`, and an `@media print` clinical report stylesheet.

---

## 2. Deep-Dive Investigation #1: Broken YouTube Video Links Audit & Verified Replacements

### 2.1 Root Cause of Broken Videos
We audited every `youtubeId` and `assessmentVideoId` in [`src/data/reflexData.ts`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/data/reflexData.ts) against YouTube’s official oEmbed API (`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=VIDEO_ID&format=json`).

**What Happened:** When the Round 2 engineering pass attempted to diversify the `assessmentVideoId` fields, it introduced **two hallucinated/non-existent YouTube IDs (`f94z_zKkX1I` and `k70H75N82Hk`)** that return **`HTTP 404 Not Found`**, and accidentally overwrote the working `primaryVideo.youtubeId` fields from Round 1 across **7 of the 11 reflexes** (`moro`, `spinal_galant`, `amphibian`, `atnr`, `stnr`, `palmar`, `plantar_babinski`)!

### 2.2 Complete Audit Table of All 11 Reflex Videos (Current vs. Verified Working)

Every replacement ID in the right-hand column below has been **live-tested via HTTP `curl` against YouTube oEmbed (`HTTP 200 OK`)** and confirmed embeddable:

| Reflex ID | Current `primaryVideo.youtubeId` | Current `assessmentVideoId` | Current Status | **Verified Working `primaryVideo.youtubeId` (`HTTP 200`)** | **Verified Working `assessmentVideoId` (`HTTP 200`)** |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`fpr`** | `ZkGDm3t2hb8` | `ZkGDm3t2hb8` | ⚠️ Works, but lost specific FPR video | **`sP8IBcpFRpM`** (*"Why They Shut Down: How a Retained Fear Paralysis Reflex Impacts Kids!"* — Harkla) | **`ZkGDm3t2hb8`** (*"How to Assess Retained Primitive Reflexes - 6 Most Common Ones"* — Harkla) |
| **`moro`** | `f94z_zKkX1I` | `f94z_zKkX1I` | ❌ **BROKEN (`HTTP 404`)** | **`WFWW1fr3dlw`** (*"What is the Moro Reflex? Signs, Symptoms & Integration Explained"* — Harkla) | **`ZkGDm3t2hb8`** (or `WFWW1fr3dlw`) |
| **`tlr`** | `xDkduQyZsQg` | `xDkduQyZsQg` | ✅ **WORKING (`HTTP 200`)** | **`xDkduQyZsQg`** (*"Does Your Child Have Retained Reflexes? TLR vs. Landau Reflex Explained"* — Harkla) | **`xDkduQyZsQg`** (or `ZkGDm3t2hb8`) |
| **`landau`** | `xDkduQyZsQg` | `xDkduQyZsQg` | ✅ **WORKING (`HTTP 200`)** | **`xDkduQyZsQg`** (*"Does Your Child Have Retained Reflexes? TLR vs. Landau Reflex Explained"* — Harkla) | **`xDkduQyZsQg`** |
| **`spinal_galant`** | `k70H75N82Hk` | `k70H75N82Hk` | ❌ **BROKEN (`HTTP 404`)** | **`hopxSwLLSWI`** (*"Spinal Galant Reflex Explained | Primitive Reflexes in Babies & Children"* — Harkla) | **`ZkGDm3t2hb8`** (or `hopxSwLLSWI`) |
| **`amphibian`** | `k70H75N82Hk` | `k70H75N82Hk` | ❌ **BROKEN (`HTTP 404`)** | **`7oOSBuzGUys`** (*"Primitive Reflex Integration: Simple, Play-Based Strategies for Cognitive and Motor Delays"* — Harkla) | **`7oOSBuzGUys`** |
| **`atnr`** | `k70H75N82Hk` | `k70H75N82Hk` | ❌ **BROKEN (`HTTP 404`)** | **`DQQFcN72gno`** (*"What is the Asymmetrical Tonic Neck Reflex (ATNR)? Signs, Symptoms & Integration Explained"* — Harkla) | **`ZkGDm3t2hb8`** (or `DQQFcN72gno`) |
| **`stnr`** | `k70H75N82Hk` | `k70H75N82Hk` | ❌ **BROKEN (`HTTP 404`)** | **`hgg3TRqb7TM`** (*"What is the STNR Reflex? | Primitive Reflexes Explained for Parents & Therapists"* — Harkla) | **`ZkGDm3t2hb8`** (or `hgg3TRqb7TM`) |
| **`palmar`** | `f94z_zKkX1I` | `f94z_zKkX1I` | ❌ **BROKEN (`HTTP 404`)** | **`XS2nM_suVTc`** (*"What Is the Palmer Grasp Reflex? | Signs, Retention & OT Activities"* — Harkla) | **`ZkGDm3t2hb8`** (or `XS2nM_suVTc`) |
| **`plantar_babinski`** | `f94z_zKkX1I` | `f94z_zKkX1I` | ❌ **BROKEN (`HTTP 404`)** | **`t2luajmBIyc`** (*"Why Your Child's Feet Are So Sensitive (The Babinski Reflex May Be to Blame)"* — Harkla) | **`t2luajmBIyc`** |
| **`rooting`** | `iXOEAnEJD48` | `iXOEAnEJD48` | ✅ **WORKING (`HTTP 200`)** | **`iXOEAnEJD48`** (*"What Is the Rooting Reflex? | Signs, Timing & OT Tips for Parents"* — Harkla) | **`iXOEAnEJD48`** |

### 2.3 Defensive UI Fallback Recommendations for Video Modals
Even with verified YouTube IDs, families often use KineticBloom on restricted school/clinic Wi-Fi, offline tablets, or browsers with strict tracking protection that block `youtube.com/embed/*`. Engineering should:
1. **Use `https://www.youtube-nocookie.com/embed/${videoId}?rel=0`** to prevent third-party cookie blocking and unrelated video distractions at the end of playback.
2. **Render an Always-Visible "Built-In Clinical Visual Summary" Fallback Card** directly beneath or alongside the `<iframe>` in `CircuitRunner.tsx`, `AssessmentWizard.tsx`, and `ReflexLibrary.tsx` showing the `retainedVsIntegratedImageUrl` / `transientSequenceImageUrl`, key setup cues, and a direct external link (`Open in YouTube ↗`) in case the iframe is blocked or offline.

---

## 3. Deep-Dive Investigation #2: Replacing Hardcoded `'Leo (ASD Level 2)'` with a Privacy-First Functional Neuro-Sensory Intake

### 3.1 Why Hardcoding `'Leo (ASD Level 2)'` Limits Clinical Personalization
Currently, [`src/utils/storage.ts`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/utils/storage.ts#L24-L30) hardcodes `DEFAULT_PROFILE` to `{ name: 'Leo', age: 6, supportLevel: 'level2', preferredReward: 'Lego Space Station Break', targetStreak: 14 }`, and [`src/App.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/App.tsx#L36) initializes `const [childProfile] = useState<ChildProfile>(() => getStoredProfile())` without even providing a setter (`setChildProfile`) or a UI modal to edit it!

From a clinical coaching standpoint, this creates three major issues:
1. **Parent Alienation:** Opening an app for your own child and seeing `"Leo (ASD LEVEL2)"` in the top header and `"How is Leo's nervous system right now?"` makes the app feel like a static demo rather than a personalized clinical coach.
2. **Diagnostic Over-Assumption:** Not every child using KineticBloom has an ASD diagnosis. Many have **ADHD, Sensory Processing Disorder (SPD), Dyspraxia/DCD, Down Syndrome / Hypotonia, Dyslexia, or Anxiety/FPR** without ASD.
3. **Zero Algorithmic Adaptation:** Even though `childProfile` is passed to `CircuitRunner`, `CircuitRunner` only uses `childProfile.name` and `childProfile.preferredReward` for text interpolation! It does **not** use the child's neuro-sensory profile to auto-select the safest exercise pathway (`primary_movement` vs. `assisted_passive` vs. `equipment_sensory`), default audio/metronome settings, or hold durations.

### 3.2 Specification: Privacy-First "Zero-Demographics" Functional Neuro-Sensory Intake
Parents of neurodivergent children are rightfully protective of their child's medical privacy. We do **NOT** need (and should explicitly refuse to collect) HIPAA-sensitive PII/demographics such as legal full name, date of birth, street address, school name, or formal ICD-10 medical records.

Instead, clicking the profile badge in the header (or completing a 60-second onboarding drawer) should open a **Functional Neuro-Sensory Profile Builder** that collects **6 purely functional parameters** and immediately adapts the coaching engine:

| Functional Field | Options / Values | How It Directly Adapts `CircuitRunner` & Prescriptions |
| :--- | :--- | :--- |
| **1. Nickname / Avatar (`nickname`)** | Free text (e.g., `"Maya"`, `"Super Kid"`, or `"Child 1"`) + Emoji avatar (`🦖`, `🚀`, `🦄`, `🌱`) | Personalizes all coaching prompts, First–Then boards, and printed OT summaries without requiring legal names. |
| **2. Neurodevelopmental Support Level (`supportNeed`)** | • `independent_verbal` (Follows multi-step verbal cues / Level 1 / ADHD)<br>• `moderate_scaffolding` (Needs visual/story models & co-regulation / Level 2)<br>• `extensive_hands_on` (Minimally speaking, severe apraxia, or high support / Level 3) | • **`extensive_hands_on`:** Automatically defaults `pathwayIndices` in `CircuitRunner` to **`assisted_passive` (Pathway 2)** so parents aren't asked to give complex verbal motor commands!<br>• **`moderate_scaffolding`:** Auto-expands the **Play Story Script** banner and highlights the **First–Then** visual schedule. |
| **3. Sensory Modulation Profile (`sensoryProfile`)** | • `sensory_seeking` (Craves crashing, spinning, fast movement)<br>• `sensory_defensive` (Avoids touch, loud sounds, bright lights, textures)<br>• `sensory_under_responsive` (Slow to register input, daydreamy)<br>• `mixed_fluctuating` (Varies by time of day / environment) | • **`sensory_defensive`:** Automatically enables **`calm_dark` mode**, mutes sudden sound effects, and prepends a **"Firm Proprioceptive Joint Compression"** reminder before tactile reflexes (`spinal_galant`, `plantar_babinski`, `rooting`).<br>• **`sensory_seeking`:** Recommends a **90-Second Heavy Work Dopamine Primer** (wall pushes / animal walk) before starting slow floor drills, and auto-enables the **60 BPM metronome** to prevent ballistic rushing. |
| **4. Baseline Postural Muscle Tone (`muscleTone`)** | • `hypotonic` (Low tone, "floppy", fatigues fast, W-sits, hypermobile joints)<br>• `hypertonic_tense` (High tone, stiff/rigid muscles, toe-walks)<br>• `typical_variable` (Average muscle tone) | • **`hypotonic`:** Displays a **"Prop & Bolster Alert"** on `tlr`, `landau`, `atnr`, and `stnr` (recommending a rolled towel under the chest/hips and shortening antigravity holds from 5s to 3s to prevent joint locking).<br>• **`hypertonic_tense`:** Emphasizes rhythmic rocking (`fpr`, `tlr_passive_cradle_flexion`) and long exhalations to release extensor spasticity. |
| **5. Coaching & Cue Preference (`cuePreference`)** | • `imaginative_story` (Loves roleplay, animals, space missions)<br>• `literal_clear` (Prefers direct, concrete, low-metaphor instructions)<br>• `hands_free_audio` (Parent wants voice/chime guidance) | • **`literal_clear`:** Prioritizes concise biomechanical `actionInstruction` over metaphorical stories for older kids or literal thinkers.<br>• **`imaginative_story`:** Pins the `resistancePlayScript` inline on the active exercise card so the parent doesn't even have to open a modal. |
| **6. Preferred "Then" Reward (`preferredReward`)** | Presets + Custom text (e.g., `"5 Mins Trampoline"`, `"Lego Break"`, `"Deep Pressure Burrito"`, `"Favorite Song"`) | Populates the **"Then: [Reward]"** slot in the First–Then visual schedule bar at the top of `CircuitRunner`. |

---

## 4. Deep-Dive Investigation #3: Architectural & Clinical Evaluation of Google Auth Login

### 4.1 Why Longitudinal Multi-Device Tracking Matters Clinically
In pediatric functional neurology (INPP, Brain Balance, MNRI), brainstem myelination and cortical inhibition of a retained primitive reflex require **4 to 12 weeks of daily rhythmic repetition** (typically 5–6 days/week). Relying solely on browser `localStorage` (`src/utils/storage.ts`) creates four critical failure modes in real family life:
1. **Multi-Caregiver Fragmentation:** Mom runs the morning circuit on her iPhone before school; Dad runs the bedtime FPR/Moro grounding circuit on an iPad; Grandma or a respite caregiver helps on weekends. With `localStorage`, their streaks, regulation logs, and screener scores are completely siloed on separate devices.
2. **Browser Cache Eviction (Safari ITP):** iOS Safari aggressively purges `localStorage` for web apps not opened for 7 days or when device storage runs low—wiping out weeks of priceless baseline vs. re-test reflex grades right before an IEP meeting or OT evaluation.
3. **Clinician / OT Asynchronous Supervision:** A supervising pediatric OT or Brain Balance coach needs to see whether the family is actually achieving `smooth_slow` quality or getting stuck in `rushed_compensated` momentum during Week 3, so they can adjust the prescription remotely.

### 4.2 Recommended Architecture: "Local-First, Cloud-Synced" with Google OAuth (Firebase Auth + Firestore or Supabase)
To keep KineticBloom **zero-friction** while adding enterprise-grade reliability, we recommend a **Hybrid Local-First + Optional Google Sign-In Architecture**:

```mermaid
flowchart LR
    A["Parent Opens App (Zero Login Wall)"] --> B["Local-First Storage (localStorage / IndexedDB)"]
    B --> C{"Clicks 'Sync with Google'?"}
    C -- "No (Guest Mode)" --> D["100% Local Operation + JSON Export/Import"]
    C -- "Yes (Google OAuth)" --> E["Firebase/Supabase Auth (UID Only)"]
    E --> F["Cloud Sync: De-Identified Functional JSON"]
    F --> G["Multi-Device Sync (Mom Phone ↔ Dad iPad ↔ OT Read-Only Link)"]
```

1. **Never Block Floor Therapy Behind a Login Wall (Local-First Guest Mode):**
   - If a parent opens the app during a child's `Red Zone` meltdown, forcing them to sign in first is a UX disaster. The app must always work 100% offline/locally first (`storage.ts`).
2. **1-Click "Save & Sync Progress with Google" in Header / Progress Tab:**
   - When the parent clicks **Sign in with Google**, authenticate via Firebase Auth (`signInWithPopup` / `GoogleAuthProvider`) or Supabase Auth.
   - **Automatic Local-to-Cloud Merge:** Upon first login, merge any existing local `logs`, `scores`, and `childProfile` into the cloud document (`users/{uid}/children/{childId}`) sorted by `timestamp` and deduplicated by `log.id`.
3. **Privacy-By-Design & HIPAA-Adjacent De-Identification:**
   - Because our **Functional Neuro-Sensory Profile** (Section 3.2) stores only a first-name nickname/pseudonym, functional 0–3 reflex grades, and regulation zone shifts—and **zero Protected Health Information (PHI)** like legal full name, DOB, SSN, or medical record numbers—the cloud payload remains lightweight and privacy-safe.
   - Even better: store the user's Google email/displayName only in the client session, and key the Firestore/Supabase database records strictly by an opaque `uid` + random `childProfileId` UUID, with a **1-click "Export All Data (JSON/CSV)"** and **"Delete Cloud Data"** button for complete parental data sovereignty.
4. **Multi-Child Switcher for Neurodivergent Families:**
   - Because primitive reflex retention is highly heritable (siblings frequently share retained Moro, ATNR, or TLR profiles), a single Google account should support an array of `ChildProfile[]` (e.g., switching between sibling nicknames in 1 click in the header).

---

## 5. Remaining Clinical & Functional Bugs to Fix (Round 2 Code Audit)

During our line-by-line inspection of `/Users/naga.aerakoni/workspace/projects/kinetic-bloom/src`, we identified **6 specific bugs** that engineering agents should fix in Round 3:

### Bug 1: 7 of 11 Reflexes Have Broken (`HTTP 404`) YouTube Video IDs (`src/data/reflexData.ts`)
- **Location:** `src/data/reflexData.ts` lines 229, 400, 764, 872, 919, 1014, 1065, 1187, 1236, 1358, 1407, 1502, 1551, 1646.
- **Problem:** `f94z_zKkX1I` and `k70H75N82Hk` return `HTTP 404`.
- **Fix:** Replace with the verified `HTTP 200` Harkla YouTube IDs documented in **Section 2.2** (`WFWW1fr3dlw`, `hopxSwLLSWI`, `7oOSBuzGUys`, `DQQFcN72gno`, `hgg3TRqb7TM`, `XS2nM_suVTc`, `t2luajmBIyc`, `sP8IBcpFRpM`, `ZkGDm3t2hb8`).

### Bug 2: Inverted Clinical Hierarchy in `generateRecommendedDeck()` (`src/utils/storage.ts` lines 257–265)
- **Location:** `src/utils/storage.ts` lines 257–265:
  ```ts
  // Sort by score (descending), tie-break by Tier (ascending = earlier tier first)
  const sorted = [...allReflexes].sort((a, b) => {
    const scoreA = scores[a] ?? 0;
    const scoreB = scores[b] ?? 0;
    if (scoreB !== scoreA) {
      return scoreB - scoreA;
    }
    return tierOf[a] - tierOf[b];
  });
  ```
- **Problem:** Sorting by `score` descending *before* `tierOf` ascending means a child with **Grade 2 Moro (Tier 1 Survival)** and **Grade 3 Palmar/Plantar/Rooting (Tier 4 Extremities)** will be prescribed `[palmar, plantar_babinski, rooting]` and **skip Tier 1 Moro completely!** This contradicts the clinical rule in `AssessmentWizard.tsx` (line 182): *"Always integrate Tier 1 (FPR & Moro) first."*
- **Fix:** Prioritize **any clinically significant retention (`score >= 2`) by Tier ascending first**, then by `score` descending:
  ```ts
  const sorted = [...allReflexes].sort((a, b) => {
    const scoreA = scores[a] ?? 0;
    const scoreB = scores[b] ?? 0;
    const sigA = scoreA >= 2 ? 1 : 0;
    const sigB = scoreB >= 2 ? 1 : 0;
    // 1. Reflexes with Moderate/Severe retention (Grade 2-3) always beat Mild/Integrated (Grade 0-1)
    if (sigB !== sigA) return sigB - sigA;
    // 2. Among significant retentions, strictly enforce Brainstem-to-Cortex Tier Hierarchy (Tier 1 -> 2 -> 3 -> 4)
    if (tierOf[a] !== tierOf[b]) return tierOf[a] - tierOf[b];
    // 3. Within the same Tier, prioritize the higher severity score
    return scoreB - scoreA;
  });
  ```

### Bug 3: Mismatched `diagramType` Strings Break Custom SVGs in TLR (`src/data/reflexData.ts` vs. `src/components/StepIllustration.tsx`)
- **Location:** `src/data/reflexData.ts` lines 486 and 498 vs. `src/components/StepIllustration.tsx` lines 101 and 120.
- **Problem:** In `reflexData.ts`, TLR’s steps use `diagramType: 'superman_lift'` (line 486) and `diagramType: 'meatball_curl'` (line 498), but `StepIllustration.tsx` switches on `case 'superman_prone':` (line 101) and `case 'meatball_hug':` (line 120)! Furthermore, `StepIllustration.tsx` does not display `step.breathCue` or `step.compensationWarning` even though they were added to `TransientStep` in `types.ts`!
- **Fix:** Support both `'superman_prone' | 'superman_lift'` and `'meatball_hug' | 'meatball_curl'` in `StepIllustration.tsx`, and render `step.breathCue` and `step.compensationWarning` badges on the step cards.

### Bug 4: Stale `"All 9 Reflexes"` Text & Missing Landau/Amphibian in `ReflexLibrary.tsx`
- **Location:** `src/components/ReflexLibrary.tsx` lines 60–77 and line 84.
- **Problem:** The filter pill on line 84 still reads `{ id: 'all', label: 'All 9 Reflexes' }` instead of `'All 11 Reflexes'`, and the 4-Tier banner (lines 65–72) omits `Landau` from Tier 2 and `Amphibian` from Tier 3.
- **Fix:** Update label to `'All 11 Reflexes'` and update the Tier 2 & Tier 3 banner descriptions to include Landau and Amphibian.

### Bug 5: Micro-Win Button Text Says `60s` While Function Sets `30s` (`src/components/CircuitRunner.tsx`)
- **Location:** `src/components/CircuitRunner.tsx` line 281 (`setTimeLeft(30)`) vs. line 821 (`⚡ 60s Micro-Win`) and line 932 (`🌱 60-Second Micro-Win`).
- **Fix:** Align both the timer (`setTimeLeft(60)`) and spoken prompt (`'Adapting drill to 60 second micro win'`)—or update the button labels to `30s Micro-Win`—so the caregiver isn't confused when clicking `60s Micro-Win` jumps the clock to `0:30`.

### Bug 6: Unilateral Left/Right Asymmetry Score Is Not Surfaced in `CircuitRunner.tsx`
- **Location:** `src/components/AssessmentWizard.tsx` line 446 vs. `src/components/CircuitRunner.tsx`.
- **Problem:** `AssessmentWizard` tells the parent: *"⚡ Asymmetry Detected: One side retains higher tone than the other. The daily circuit will focus extra repatterning on the more retained side."* However, `CircuitRunner.tsx` never inspects `scores.lateralized?.[currentReflexId]`.
- **Fix:** In `CircuitRunner.tsx`, check `const lat = scores.lateralized?.[currentReflexId];` and if `lat && lat.left !== lat.right`, render a prominent clinical coaching badge on the active card: e.g., **`⚡ Hemispheric Focus: Perform 2 extra slow reps on the ${lat.left > lat.right ? 'LEFT' : 'RIGHT'} side (Grade ${Math.max(lat.left, lat.right)} vs Grade ${Math.min(lat.left, lat.right)})`**.

---

## 6. Actionable Round 3 Engineering Specs

### Spec 1: Expanded `ChildProfile` Schema (`src/types.ts`)
Update `ChildProfile` in `src/types.ts` to replace the static `'Leo (ASD Level 2)'` assumption with the privacy-first Functional Neuro-Sensory Intake:

```typescript
export type SupportNeedLevel = 'independent_verbal' | 'moderate_scaffolding' | 'extensive_hands_on';
export type SensoryModulationProfile = 'sensory_seeking' | 'sensory_defensive' | 'sensory_under_responsive' | 'mixed_fluctuating';
export type MuscleToneProfile = 'hypotonic' | 'hypertonic_tense' | 'typical_variable';
export type CuePreference = 'imaginative_story' | 'literal_clear' | 'hands_free_audio';

export interface ChildProfile {
  id?: string;
  name: string; // Nickname / Pseudonym only (Zero PII)
  avatarEmoji?: string;
  supportLevel?: 'level1' | 'level2' | 'level3'; // Keep for backward compatibility
  supportNeed?: SupportNeedLevel;
  sensoryProfile?: SensoryModulationProfile;
  muscleTone?: MuscleToneProfile;
  cuePreference?: CuePreference;
  preferredReward?: string;
  targetStreak?: number;
}
```

### Spec 2: Interactive Profile & Cloud Sync Modal (`src/components/ProfileModal.tsx` & `src/App.tsx`)
1. Make the header profile badge (`{childProfile.name}`) in `src/App.tsx` (line 107) an interactive button that opens a **Functional Neuro-Sensory Profile & Sync Modal**.
2. Inside the modal:
   - Allow editing **Nickname**, **Avatar Emoji**, **Support Need Level**, **Sensory Modulation Profile**, **Postural Muscle Tone**, **Cue Preference**, and **Preferred "Then" Reward**.
   - Include a **Privacy Assurance Callout**: *"🔒 Zero Medical PII Required: Use a nickname. All functional settings are stored locally on your device or synced via de-identified cloud backup."*
   - Include **Local Backup (Export/Import JSON)** AND a **Google Account Sync** section so parents and OTs can sync across phone, tablet, and desktop.
3. In `CircuitRunner.tsx`, automatically react to `childProfile`:
   - If `childProfile.supportNeed === 'extensive_hands_on'` or `childProfile.supportLevel === 'level3'`, default `pathwayIndices` to the `assisted_passive` pathway!
   - If `childProfile.muscleTone === 'hypotonic'`, display a **Hypotonia Support Tip** (e.g., *"Low-Tone Adaptation: Place a rolled towel under chest/hips and use 3-second holds without locking joints."*).
   - If `childProfile.sensoryProfile === 'sensory_seeking'`, display a **Heavy Work Primer Tip** before slow floor exercises and auto-enable the `60 BPM` metronome.

---

*Round 2 Verification completed by Head Coach & Clinical Director.*

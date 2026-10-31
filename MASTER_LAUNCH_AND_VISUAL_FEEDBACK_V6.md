# KineticBloom — Master Round 6 Multi-Agent Verification: Pathway/Step Visual Audit, Legal Compliance & Production Launch Blueprint

**Evaluated Target:** `http://localhost:3000/` (`/Users/naga.aerakoni/workspace/projects/kinetic-bloom`)  
**Evaluation Panel (5 Specialized Agents):**
1. **Clinical Visual & Media Accuracy Auditor** $\rightarrow$ [VISUAL_MEDIA_AUDIT_FEEDBACK.md](./VISUAL_MEDIA_AUDIT_FEEDBACK.md)
2. **Special Needs Parent & Caregiver Advocate (ASD Levels 1–3)** $\rightarrow$ [PARENT_FEEDBACK_V6.md](./PARENT_FEEDBACK_V6.md)
3. **Expert Primitive Reflex Integration Head Coach (INPP / MNRI / Harkla / RMTi)** $\rightarrow$ [EXPERT_COACH_FEEDBACK_V6.md](./EXPERT_COACH_FEEDBACK_V6.md)
4. **Healthcare, Pediatric Privacy & Digital Health Compliance Officer** $\rightarrow$ [COMPLIANCE_LAUNCH_FEEDBACK.md](./COMPLIANCE_LAUNCH_FEEDBACK.md)
5. **Lead Technical Product Engineer & Principal Founding Architect** $\rightarrow$ [TECH_PRODUCT_LAUNCH_FEEDBACK.md](./TECH_PRODUCT_LAUNCH_FEEDBACK.md)

---

## Executive Synthesis: Why This Round Matters

While Iterations 1–4 brought KineticBloom's core interactive mechanics, 11-reflex database, custom SVG diagrams, and multi-child state isolation to an impressive milestone, **three critical domains must be resolved to make KineticBloom truly complete and ready for public launch**:

1. **Pathway & Step Photo Accuracy (Fixing the Repeated Main Reflex `.jpg` Problem & Regenerating Corrupted AI Text Images)**
2. **Healthcare, COPPA/HIPAA Privacy, Physical Contraindication Safety Gates & Trademark Compliance**
3. **Production Engineering Hardening (Asset Compression `17MB -> <1MB`, Code Splitting `620KB -> <180KB`, URL Deep-Linking, Offline PWA, Real Supabase Cloud Sync, and Automated Tests)**

---

## Pillar 1: Pathway & Step Image Audit & Generation Architecture
*(Full 51-Pathway & 156-Step Prompt Manifest in [VISUAL_MEDIA_AUDIT_FEEDBACK.md](./VISUAL_MEDIA_AUDIT_FEEDBACK.md) and [EXPERT_COACH_FEEDBACK_V6.md](./EXPERT_COACH_FEEDBACK_V6.md))*

### 1.1 Exact Root Cause Confirmed Across Codebase
- In `src/data/reflexData.ts`, all **51 `exercisePathways`** and all **156+ `transientSteps`** hardcode one of the **11 main reflex `.jpg` files** (`moro_starfish.jpg`, `tlr_superman.jpg`, `atnr_lizard.jpg`, etc.) as both `pathway.imageUrl` and `step.imageUrl`.
- **Consequence 1 (Pathway Mismatch):** When a parent or clinician selects any of the **40 non-primary pathways**—such as *Peanut Ball Supported Starfish* (`moro_assisted_ball`), *Classroom Desk Fencer* (`atnr_desk_fencer`), *Scooter Board Flight* (`landau_scooter_glide`), *Turtle Hiding in Lycra Tunnel* (`tlr_play_turtle`), *Therapy Putty Treasure Hunt* (`palmar_putty_treasure`), or *MNRI® Isometric Resistance*—and clicks **`[ 📷 Photo ]`**, the app shows the solo floor calisthenic photo from Pathway 1! For ASD Level 2 literal learners and ASD Level 3 parents needing exact hands-on co-regulation positioning, this visual contradiction breaks trust.
- **Consequence 2 (Step-by-Step Duplication):** Inside every pathway, Steps 1 (`Setup`), 2 (`Begin`), 3 (`Transient`), and 4 (`Finish`) all point to the exact same static `.jpg` file—rendering the identical photo 3–4 times in a row when toggled to Photo view or viewed in `ReflexLibrary.tsx`.
- **Consequence 3 (Orphaned 4-Panel Storyboard Sheet):** `/public/images/moro_transient_steps.jpg` (a clean 2×2 4-panel sequence sheet: `1 SETUP & START` $\rightarrow$ `2 FETAL TUCK` $\rightarrow$ `3 TRANSIENT OPENING` $\rightarrow$ `4 FULL STARFISH HOLD`) already exists on disk, and `ReflexLibrary.tsx` (lines 442–455) already has JSX to render `activePathway.transientSequenceImageUrl`, **but zero pathways in `reflexData.ts` populate `transientSequenceImageUrl`!**

### 1.2 Existing `.jpg` Files That Must Be Regenerated Immediately (Biomechanical & AI Text Defects)
1. ❌ **`/public/images/stnr_cat_cow.jpg` (CRITICAL CLINICAL & TEXT DEFECT):**
   - **Biomechanical Error:** Panel 2 instructs *"Child's Pose (Head Down, Hips shift back to heels)"*. Shifting the hips back onto the heels during neck flexion is the **#1 retained STNR compensation red flag**! Hips must remain locked at a strict **90° vertical angle directly over the knees** during Cat-Cow.
   - **Corrupted AI Gibberish Text:** Contains garbled AI text (`"quadhoruped position... does sagging or ggevitly back edging..."` and `"Hips hititps Back... These foam mat to luo2n thr onnous round"`).
2. ❌ **`/public/images/tlr_superman.jpg` (AI Typography Defect):**
   - Top banner contains garbled text (`"TONIC LABYRINTHINE REFLEX (TLR) ՈITLUR INTEGRATION"`).
3. ❌ **`/public/images/landau_airplane.jpg` (Misaligned Title & Worksheet Text):**
   - Labels Landau Airplane as `"FLYING SUPERMAN POSE!"` and includes worksheet fill-in-the-blank text (`"Hold for ___ seconds, ___ repetitions."`).
4. 🗑️ **Delete 4 Byte-for-Byte Duplicate Timestamped JPEGs (`2.47 MB` wasted):**
   - Delete `atnr_lizard_crawl_1792282655730.jpg`, `moro_starfish_exercise_1792282640031.jpg`, `spinal_galant_snow_angel_1792282686915.jpg`, and `stnr_cat_cow_1792282673806.jpg`.

### 1.3 How to Generate & Wire Pathway-Specific & Step-Specific Images
1. **Use the Gold-Standard 2×2 4-Panel Storyboard Architecture (`moro_transient_steps.jpg` + `moro_starfish.jpg` style):**
   - Generate a **2×2 4-panel storyboard sheet** (`/images/pathways/<pathway_id>_sheet.webp`) for each pathway showing `Panel 1: Setup`, `Panel 2: Begin`, `Panel 3: Transient Hold`, and `Panel 4: Finish` in the warm storybook pediatric OT illustration style (soft sage/cream room, teal puzzle mat or classroom desk, warm caregiver hands visible on all `assisted_passive` and `isometric_resistance` pathways, **zero paragraph text**—only clean numbered badges `1`, `2`, `3`, `4` and directional arrows).
2. **Wire Quadrant Cropping (`imagePanelIndex: 1 | 2 | 3 | 4`) or Sliced Step Images in `StepIllustration.tsx` & `ReflexLibrary.tsx`:**
   - Either slice each 2×2 sheet into `/images/steps/<pathway_id>_step1..4.webp` OR add a CSS quadrant crop (`object-position: 0% 0%` for Step 1, `100% 0%` for Step 2, `0% 100%` for Step 3, `100% 100%` for Step 4 with `scale(2)`) so that every step card shows its **exact step posture** when toggled to `[ 📷 Photo ]`!
   - Wire `transientSequenceImageUrl` in `reflexData.ts` (starting immediately with `/images/moro_transient_steps.jpg` on `moro_starfish`).
   - Until a pathway has its dedicated photo generated, change the toggle button label in `StepIllustration.tsx` and `PathwayHeroVisual.tsx` from `"📷 Photo"` to `"📷 Reflex Overview"` when falling back to `reflex.imageUrl` so parents are never misled.

---

## Pillar 2: Legal, Regulatory, Safety & Accessibility Launch Compliance
*(Full drop-in code & legal copy in [COMPLIANCE_LAUNCH_FEEDBACK.md](./COMPLIANCE_LAUNCH_FEEDBACK.md))*

1. **P0 — Mandatory First-Launch Physical Safety & Contraindication Gate (`SafetyConsentModal.tsx`):**
   - Block floor exercises until the caregiver acknowledges physical safety contraindications:
     - **Atlantoaxial Instability (AAI) / Down Syndrome (Trisomy 21):** Contraindication for cervical rotation/flexion/extension (`atnr`, `stnr`, `tlr`, `moro` neck tilt) without physician clearance.
     - **Epilepsy / Seizure Disorders:** Caution on 60 BPM rhythmic vestibular rocking (`rhythmic_movement`).
     - **Recent Concussion, VP Shunts, Cervical/Spinal Surgery, or G-Tubes/Stomas in Prone Positions.**
     - **AAP Weighted Blanket Safety Rule (`fpr_passive`):** Blanket must never exceed **10% of the child's body weight**, must never cover head/face/neck, and child must be able to remove it independently.
2. **P0 — FDA General Wellness Exemption Language Scrub:**
   - Reframe `"Pediatric Primitive Reflex Screener"`, `"Diagnostic grading"`, `"Grade 3: Severe Retention"`, and `"Dose"` as `"Home Movement Observation Guide"`, `"Observation Level 0–3"`, and `"Suggested Practice"`, and add a print watermark (`CAREGIVER HOME OBSERVATION LOG — NOT A CLINICAL DIAGNOSIS`).
3. **P0 — Trademark Remediation (`Zones of Regulation®`):**
   - `"Red Zone / Yellow Zone / Green Zone / Blue Zone"` is a registered trademark of **Think Social Publishing, Inc. / Leah Kuypers**. Rename the check-in states in `CircuitRunner.tsx` and `ProgressDashboard.tsx` to safe autonomic descriptors:
     - **`Overload State (SOS / Fight-or-Flight)`**
     - **`Revved-Up State (Wiggly / Restless)`**
     - **`Anchored State (Calm & Ready)`**
     - **`Low-Battery State (Tired / Slow)`**
   - Add a fair-use educational attribution footer disclaiming affiliation with INPP, MNRI®, BRMT/RMTi, Harkla®, and Zones of Regulation®.
4. **P0 — COPPA / FTC Right-to-Erasure & YouTube Privacy Shield:**
   - Add `"Delete Child Profile"` and `"Clear All Local Data / Factory Reset"` (`clearAllKineticBloomData()`) buttons to `ProfileModal.tsx`.
   - Wrap embedded `youtube-nocookie.com` iframes in an adult Click-to-Load Privacy Consent curtain.
5. **P1 — WCAG 2.2 Level AA Accessibility:**
   - Add `role="dialog"`, `aria-modal="true"`, `Escape` key handler, and focus trapping to all modals; add `aria-live="polite"` phase announcements to `CircuitRunner.tsx`; add `@media (prefers-reduced-motion: reduce)` support (and suppress `canvas-confetti` when reduced motion is enabled); upgrade `text-slate-400` labels on light backgrounds to `text-slate-600`.

---

## Pillar 3: Lead Technical Product Engineering & Launch Architecture
*(Full code specs, Vitest/Playwright suites, and Supabase SQL in [TECH_PRODUCT_LAUNCH_FEEDBACK.md](./TECH_PRODUCT_LAUNCH_FEEDBACK.md))*

1. **P0 — Fix Streak Calculation Bug & Onboarding Persistence:**
   - Fix `src/utils/storage.ts:593` where `Math.max(streak, logs.length > 0 ? 1 : 0)` forces a streak of `1` even when the last logged session was weeks ago.
   - Persist `showOnboarding` dismissal to `localStorage` (`kineticbloom_onboarding_dismissed_v1`) in `App.tsx:39` so the 3-step banner doesn't reappear on every browser refresh.
   - Sync `activeTab` and `selectedReflexId` with URL query params (`?tab=library&reflex=atnr`) via `useUrlNavigation()` so browser Back/Forward buttons and deep links work.
2. **P0 — Image Compression (`17.08 MB` $\rightarrow$ `<1 MB`) & Code Splitting (`620.7 KB` $\rightarrow$ `<180 KB`):**
   - Convert JPEGs to `.avif` and `.webp`, delete the 4 unused duplicate timestamped JPEGs, and add `loading="lazy" decoding="async" width={1200} height={896}` to all `<img>` tags.
   - Lazy-load `AssessmentWizard`, `ReflexLibrary`, `ProgressDashboard`, `OfflineReferences`, and `ProfileModal` with `React.lazy()` + `Suspense` and configure `manualChunks` in `vite.config.ts`.
3. **P1 — Installable Offline iPad PWA & Production `index.html`:**
   - Configure `vite-plugin-pwa` (`manifest.webmanifest` + Workbox caching) and upgrade `index.html` with OpenGraph/Twitter social preview cards, Apple PWA meta tags, and `WebApplication` JSON-LD schema.
   - Wrap `<App />` in `<ClinicalErrorBoundary>` with a 1-click Emergency JSON Backup download button.
4. **P1 — Automated Testing & CI/CD Pipeline:**
   - Add the provided **Vitest** unit test suite (`src/utils/__tests__/storage.test.ts`) and **Playwright** E2E suite (`e2e/critical-journey.spec.ts`), plus `.github/workflows/ci.yml` and `vercel.json`.
5. **P2 — Real Zero-PII Supabase Cloud Sync & 8-Week `.ics` Calendar Habit Export:**
   - Replace `simulateGoogleSignIn()` with real Supabase Google OAuth + RLS tables (`child_profiles`, `assessment_snapshots`, `regulation_logs`, `therapist_share_links`) and add the 1-tap `downloadDailyTherapyIcs()` 8-week calendar habit reminder.

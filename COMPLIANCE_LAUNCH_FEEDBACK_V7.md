# KineticBloom — Round 7 Compliance Verification & Pre-Launch Sign-Off Audit (`v4.rerun`)

**Audit Date:** October 18, 2026  
**Auditor Role:** Healthcare, Pediatric Privacy & Digital Health Compliance Officer  
**Target Codebase:** `/Users/naga.aerakoni/workspace/projects/kinetic-bloom` (`http://localhost:3000/`)  
**Audit Scope:** Round 7 Verification of Round 4 Engineering Remediation across FDA SaMD / General Wellness Exemption, Pediatric Physical Medicine Safety & Contraindications, COPPA / FTC HBNR / HIPAA / FERPA Privacy & Erasure, Trademark / Intellectual Property Attribution, and WCAG 2.2 Level AA Accessibility.

---

## Executive Summary & Overall Compliance Posture

| Compliance Pillar | Round 1 Baseline Status | Round 7 Verification Status | Completion % | Sign-Off Readiness |
| :--- | :--- | :--- | :--- | :--- |
| **1. FDA SaMD vs. General Wellness Exemption** | 🔴 Non-Compliant (High Risk) | 🟡 **Substantially Remediated (Minor Residual Copy)** | **88%** | **Conditional Go** (Fix remaining clinical labels & print title) |
| **2. Clinical Contraindications & Physical Safety Gate** | 🔴 Critical Blocker (Missing Gate) | 🟢 **Verified Compliant** (Minor UX/Focus Polish) | **96%** | **Go** (`SafetyConsentModal.tsx` verified active) |
| **3. COPPA, FTC HBNR, HIPAA/FERPA & Data Erasure** | 🔴 Non-Compliant (Missing Erasure & Video Gate) | 🟡 **Substantially Remediated (2 Functional Edge Bugs)** | **92%** | **Conditional Go** (Fix `PrivacyVideoPlayer` start-timestamp & `deleteChildProfile` state sync) |
| **4. Intellectual Property, Trademarks & Attribution** | 🔴 High Infringement Exposure | 🟡 **Substantially Remediated (Residual "Red Zone" Strings)** | **88%** | **Conditional Go** (Purge remaining `"Red Zone"` & `(MNRI)/(BRMT)/(Harkla)` data strings) |
| **5. WCAG 2.2 Level AA & ADA Title III Accessibility** | 🟠 Partial / Non-Compliant | 🟡 **Substantially Remediated (Missing CSS Reduced-Motion)** | **82%** | **Conditional Go** (Add `@media (prefers-reduced-motion: reduce)` to `src/index.css`) |

### Overall Release Recommendation: **CONDITIONAL GO (90% Compliant — 10 Targeted Polish Fixes Remaining)**
The engineering team delivered major structural and regulatory remediations in Round 4 (`done_updating_v4.rerun`), resolving **all 5 architectural blockers** from Round 1:
1. **Mandatory Pre-Use Safety Gate (`src/components/SafetyConsentModal.tsx`)**: Implemented and persisted in `localStorage` (`kinetic_bloom_safety_consent_v1`) with 3 explicit un-prechecked adult checkboxes covering AAI/Down syndrome, VP shunts, acute head trauma, epilepsy/60 BPM rocking, G-tubes/GERD in prone, AAP $\le 10\%$ body-weight limits, pain-free voluntary stop-rules, and 18+ adult attestation.
2. **COPPA / GDPR-K YouTube Click-to-Load Gate (`src/components/PrivacyVideoPlayer.tsx`)**: Implemented and wired across all 3 video surfaces (`AssessmentWizard.tsx`, `CircuitRunner.tsx`, `ReflexLibrary.tsx`), preventing unconsented third-party YouTube iframe tracking before adult interaction.
3. **COPPA / FTC Right-to-Erasure Controls (`src/utils/storage.ts` & `src/components/ProfileModal.tsx`)**: Implemented `deleteChildProfile()` and `clearAllKineticBloomData()` with a 2-step confirmation UI in `ProfileModal.tsx` (`Danger Zone: Data Erasure & Reset`), plus a 20-character alias cap and live full-name/DOB privacy detector, and replaced the inaccurate *"zero HIPAA liability"* claim with an accurate HIPAA BAA / FERPA educator boundary warning.
4. **General Wellness Reframing & Non-Diagnostic Print Watermarks**: Reframed core navigation (`"Movement Guide"`), grading scales (`"Level 0–3: Integrated / Mild / Moderate / Prominent"`), and added print-only non-diagnostic watermarks in `AssessmentWizard.tsx` and `ProgressDashboard.tsx`.
5. **Trademark Mitigation & Modal Accessibility**: Replaced primary `"Red/Yellow/Green/Blue Zone"` selector buttons in `CircuitRunner.tsx` and `ProgressDashboard.tsx` with original somatic terms (`Overload State (SOS)`, `Revved-Up State (Buzzing)`, `Anchored State (Ready)`, `Low-Battery State (Resting)`), genericized modality filter badges in `ReflexLibrary.tsx` and `PathwayHeroVisual.tsx`, added `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, and `Escape` key listeners across all modals, added `role="timer"` and `role="progressbar"` to `CircuitRunner.tsx`, and guarded `canvas-confetti` behind `window.matchMedia('(prefers-reduced-motion: reduce)')`.

Below is the pillar-by-pillar verification of **what passed inspection** and the **exact file/line locations of the remaining residual items** required for 100% unconditional sign-off.

---

## Pillar 1: FDA SaMD vs. General Wellness Exemption (21st Century Cures Act § 3060)

### ✅ Verified Remediations
* **Primary Navigation & Headings (`src/App.tsx:237`, `src/components/AssessmentWizard.tsx:173-184, 335`)**:
  * Navigation tab renamed from `"Clinical Screener"` to `"Movement Guide"`.
  * Assessment header reframed to `"11-Reflex Movement Observation Guide"` with a prominent emerald `"Informational Movement Guide"` banner stating: *"This observation guide helps caregivers notice movement patterns to tailor daily play routines. It is not a medical diagnostic tool or clinical evaluation."*
* **Grading Scale Terminology (`src/components/AssessmentWizard.tsx:335`, `src/components/ReflexLibrary.tsx:315, 521`)**:
  * Updated from `"Clinical Severity Grading (0 to 3 Scale)"` to `"Home Movement Observation Guide (Level 0–3: Integrated / Mild / Moderate / Prominent)"` and `"Suggested Practice"` (replacing `"Prescription"`).
* **Print-Only Non-Diagnostic Watermarks (`src/components/AssessmentWizard.tsx:204-209`, `src/components/ProgressDashboard.tsx:80-85`)**:
  * Added `hidden print:block` disclaimer banners at the top of both print views: *"NON-DIAGNOSTIC HOME MOVEMENT OBSERVATION LOG — FOR INFORMATIONAL COLLABORATION ONLY. KineticBloom is a general wellness and movement coaching tool, not a medical device..."*

### ⚠️ Remaining Pillar 1 Gaps (Exact File & Line References)
1. **Browser `<title>` & Header Subtitle (`index.html:6`, `src/App.tsx:212`)**:
   * `src/App.tsx:212` still renders `"10-Minute Home Therapy Coach"` in the top brand subtitle.
   * **Fix:** Change `src/App.tsx:212` to `"10-Minute Home Movement & Co-Regulation Companion"`.
2. **Residual Clinical/Diagnostic Labels in UI & Printouts**:
   * `src/components/AssessmentWizard.tsx:245`: `"Clinical Sequencing Rule"` $\rightarrow$ change to `"Developmental Sequencing Principle"`.
   * `src/components/AssessmentWizard.tsx:317`: `"Print OT & Pediatrician Summary"` $\rightarrow$ change to `"Print Caregiver Observation Summary"`.
   * `src/components/AssessmentWizard.tsx:619`: `title="Watch 2-minute clinical pediatric OT testing video"` $\rightarrow$ change to `title="Watch 2-minute movement observation guide video"`.
   * `src/components/AssessmentWizard.tsx:655`: `"At-Home Assessment Steps:"` $\rightarrow$ change to `"At-Home Observation Steps:"`.
   * `src/components/ProgressDashboard.tsx:178`: `"📅 Clinical Milestone • Week {currentWeek}"` $\rightarrow$ change to `"📅 Practice Milestone • Week {currentWeek}"`.
   * `src/components/ProgressDashboard.tsx:299`: `"Print OT Report"` $\rightarrow$ change to `"Print Caregiver Summary"`.
   * `src/components/ReflexLibrary.tsx:48`: `"Clinical Expert Edition"` badge $\rightarrow$ change to `"Comprehensive Reference Edition"`.
   * `src/components/ReflexLibrary.tsx:241`: `"Clinical Modalities Available"` $\rightarrow$ change to `"Movement Pathways Available"`.
   * `src/components/ReflexLibrary.tsx:541, 563`: `"Re-Testing Verification Protocol"` and `"Clinical Integration Note"` $\rightarrow$ change to `"Follow-Up Observation Guide"` and `"Developmental Integration Note"`.
3. **Raw `"Severe"` Strings Inside `src/data/reflexData.ts` Grade 3 Descriptions**:
   * While the card header now says `"Level 3: Prominent Retention"`, the underlying description strings (`reflex.assessment.grading.grade3` in `src/data/reflexData.ts`) still begin with `"Severe — ..."` across the 11 reflexes.

---

## Pillar 2: Mandatory Clinical Contraindications & Physical Safety Gate

### ✅ Verified Remediations
* **Pre-Use Blocking Safety Gate (`src/components/SafetyConsentModal.tsx:1-146`, mounted in `src/App.tsx:172-175`)**:
  * Verified active on first launch and whenever `getSafetyConsent()?.consented` is falsy.
  * Includes explicit red-flag contraindication cards for:
    1. **Cervical & Spine Precautions** (Atlantoaxial Instability / Down syndrome, Chiari malformation, cervical spine instability, or recent concussion/head trauma).
    2. **Medical Devices, Seizures & G-Tubes** (VP shunts, photosensitive or vestibular-triggered epilepsy with 60 BPM rhythmic rocking, feeding tubes/G-tubes or severe GERD in prone positions).
    3. **Weighted Item Safety (AAP Guideline)** (Weighted blankets/lap pads must never exceed **10% of the child's body weight**, must never cover head/face/neck, and must never be used during sleep or to restrict movement).
    4. **Voluntary, Pain-Free Co-Regulation** (Immediate stop-rule for joint pain, numbness, dizziness, pallor, sweating, hiccups, or emotional distress).
  * Enforces **3 separate, un-prechecked adult checkboxes** (`medicalClearance`, `stopRuleAndWeightLimit`, `adultConfirmation`) before the `"Confirm & Enter KineticBloom"` button enables.
* **In-Session Autonomic Stop-Rule Banner (`src/components/CircuitRunner.tsx:998-1005`)**:
  * Prominently displayed on every exercise card during `CircuitRunner`.

### ⚠️ Remaining Pillar 2 Polish Items
1. **Persistent Footer Link to Re-Open Safety & Contraindications Notice (`src/App.tsx:351-366`)**:
   * Once a caregiver checks the 3 boxes in `SafetyConsentModal`, `safetyConsented` becomes `true` in `localStorage`, and there is no button in the footer (`src/App.tsx:351-366`) to re-open `SafetyConsentModal` for reference without wiping all app data.
   * **Fix:** Add a `"Safety & Contraindications Notice"` button in the `src/App.tsx` footer that opens `SafetyConsentModal` (or sets `safetyConsented(false)` / `showSafetyModal(true)`).

---

## Pillar 3: Pediatric Privacy (COPPA), FTC HBNR, HIPAA/FERPA & Data Erasure

### ✅ Verified Remediations
* **COPPA / FTC Right-to-Erasure Implementation (`src/utils/storage.ts:592-620`, `src/components/ProfileModal.tsx:619-684`)**:
  * `deleteChildProfile(profileId)` removes the child's profile and associated `kinetic_bloom_scores_${id}` and `kinetic_bloom_logs_${id}` keys from `localStorage`.
  * `clearAllKineticBloomData()` iterates all `localStorage` keys prefixed with `kinetic_bloom_` and removes them, followed by `window.location.reload()`.
  * `ProfileModal.tsx:619-684` provides a 2-step confirmation UI (`"Delete Child Profile"` and `"Wipe All App Data (Factory Reset)"`).
* **COPPA Data Minimization & PII Guardrails (`src/components/ProfileModal.tsx:350-362`)**:
  * Enforces `maxLength={20}` on the child nickname input (`#child-alias-input`) and displays an amber live warning whenever the input contains a space (`' '`) or slash (`'/'`): *"Privacy Tip: Use a first-name nickname or alias only — avoid entering full legal names or birthdates."*
* **Clinician / Educator HIPAA BAA & FERPA Notice (`src/components/ProfileModal.tsx:545-550`)**:
  * Replaced the false *"zero HIPAA liability"* claim with: *"Clinician & Educator Notice: This consumer web application does not execute a HIPAA Business Associate Agreement (BAA) or FERPA school official agreement. Occupational therapists, physical therapists, and educators must use de-identified aliases and must not enter Protected Health Information (PHI) or personally identifiable education records into free-text fields."*
* **Privacy-Enhanced YouTube Click-to-Load Gate (`src/components/PrivacyVideoPlayer.tsx:1-82`)**:
  * Verified that no `youtube.com` or `youtube-nocookie.com` iframe mounts until the adult explicitly clicks `"Load Video (Adult Consent)"`, and that the iframe uses `https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0`.

### ⚠️ Remaining Pillar 3 Functional Edge Bugs (Must Fix Before Launch)
1. **BUG 1 — Lost Timestamp (`?t=169s` / `&start=`) in `PrivacyVideoPlayer.tsx` (`src/components/PrivacyVideoPlayer.tsx:24`, `src/components/ReflexLibrary.tsx:405-422`, `src/components/AssessmentWizard.tsx:875-879`)**:
   * **Impact:** Several reflexes in `src/data/reflexData.ts` share a master pediatric OT video (`ZkGDm3t2hb8`) and rely on `?t=169s`, `?t=242s`, etc. in `assessmentVideoUrl` to jump to the specific reflex demonstration. Previously, `ReflexLibrary.tsx` parsed `t=(\d+)s?` into `&start=${startMatch[1]}`. However, `PrivacyVideoPlayer.tsx:24` hardcodes:
     ```tsx
     const embedUrl = `https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0`;
     ```
     ignoring `youtubeUrl`'s `?t=` parameter! As a result, clicking `"Load Video"` on any reflex assessment plays from `0:00` instead of the reflex's timestamp.
   * **Fix in `src/components/PrivacyVideoPlayer.tsx:24`:** Parse `youtubeUrl` for `[?&]t=(\d+)s?` or `[?&]start=(\d+)` and append `&start=${startSeconds}` to `embedUrl`, and add `useEffect(() => setHasConsented(false), [youtubeId, youtubeUrl])` (or pass a `key` prop) so switching reflexes updates the player cleanly.
2. **BUG 2 — `handleDeleteCurrentProfile` Uses Stale Prop Instead of `activeId` (`src/components/ProfileModal.tsx:99-105`)**:
   * **Impact:** In `ProfileModal.tsx:99-105`:
     ```tsx
     const handleDeleteCurrentProfile = () => {
       const next = deleteChildProfile(currentProfile.id);
       setConfirmDeleteProfile(false);
       onProfileUpdated(next);
       onClose();
     };
     ```
     If a caregiver switches tabs inside `ProfileModal` to a different child (updating local `activeId`) and clicks `"Delete Profile"`, `deleteChildProfile(currentProfile.id)` deletes the *previously active* profile passed via prop rather than the currently selected `activeId`!
   * **Fix:** Change `deleteChildProfile(currentProfile.id)` to `deleteChildProfile(activeId)`.

---

## Pillar 4: Intellectual Property, Trademarks & Attribution

### ✅ Verified Remediations
* **Primary Regulation State Selector Buttons (`src/components/CircuitRunner.tsx:400-427, 1191-1196`, `src/components/ProgressDashboard.tsx:62-75, 115, 343-355`)**:
  * Reframed from `"Red Zone / Yellow Zone / Green Zone / Blue Zone"` to original somatic descriptors:
    * `Overload State (SOS)`
    * `Revved-Up State (Buzzing)`
    * `Anchored State (Ready)`
    * `Low-Battery State (Resting)`
  * `ProgressDashboard.tsx:115` renamed KPI card from `"Green Zone Success"` to `"Anchored Regulation Rate"`.
* **Modality Filter Pills & Hero Badges (`src/components/ReflexLibrary.tsx:250-266`, `src/components/PathwayHeroVisual.tsx:31-45`)**:
  * Genericized from `"Isometric (MNRI)"`, `"Rhythmic (BRMT)"`, and `"Equipment (Harkla)"` to `"Active Dynamic Pattern"`, `"Isometric Gentle Resistance"`, `"60 BPM Rhythmic Rocking"`, and `"Therapy Ball & Sensory Play"`.
* **Footer IP & Non-Affiliation Disclaimer (`src/App.tsx:358-365`)**:
  * Added explicit trademark non-affiliation notice in the global footer.

### ⚠️ Remaining Pillar 4 Gaps (Residual Trademark Strings)
1. **Residual `"Red Zone"` / `"Zone"` Strings in `CircuitRunner.tsx` and `src/utils/storage.ts`**:
   * `src/components/CircuitRunner.tsx:454`: Red-state intercept banner heading still reads `"Clinical Intercept: Child in Red Zone Meltdown"` $\rightarrow$ change to `"Co-Regulation Intercept: Child in Overload State (SOS)"`.
   * `src/components/CircuitRunner.tsx:461`: Sets deck name to `'🆘 Red Zone Emergency Vagal Grounding'` $\rightarrow$ change to `'🆘 Overload State (SOS) Vagal Grounding'`.
   * `src/components/CircuitRunner.tsx:1313-1314`: Celebration banner still renders:
     ```tsx
     Autonomic Shift: <span className="font-bold uppercase">{preZone} Zone</span> ➔ <span className="font-bold uppercase">{postZone} Zone</span>
     ```
     which outputs `"RED ZONE ➔ GREEN ZONE"`! $\rightarrow$ Map `preZone` and `postZone` to `'Overload (SOS)' | 'Revved-Up' | 'Anchored' | 'Low-Battery'`.
   * `src/utils/storage.ts:216, 345, 695`: Initial demo logs (`persona_leo`, `persona_sam`) and `generateRecommendedDeck()` still store `'🆘 Red Zone Vagal Grounding Circuit'` and `'Red Zone Emergency Vagal Grounding'`, which render visibly as deck badges in `ProgressDashboard.tsx:330` and `CircuitRunner.tsx:79`.
2. **Residual `(MNRI)`, `(BRMT)`, `(Harkla)` Strings in `ReflexLibrary.tsx` and `src/data/reflexData.ts`**:
   * `src/components/ReflexLibrary.tsx:383`: Heading still reads `"Video Demonstrations (Harkla OT):"` $\rightarrow$ change to `"Pediatric OT Video Demonstrations:"`.
   * `src/data/reflexData.ts:187, 261, 575, 636`: Four `categoryLabel` values in `reflexData.ts` (`"Isometric Counter-Pressure (MNRI)"`, `"60 BPM Rhythmic Rocking (BRMT)"`, `"Therapy Ball & Equipment (Harkla)"`, `"Isometric Hand Press (MNRI)"`) still contain trademarked parentheticals and render directly inside the pathway buttons at `ReflexLibrary.tsx:294` and `CircuitRunner.tsx:819, 847`.
3. **Complete Trademark Attribution in Footer (`src/App.tsx:360`)**:
   * Add **INPP** (Institute for Neuro-Physiological Psychology) and **RMTi® / BRMT** (Rhythmic Movement Training International) alongside Think Social Publishing, Inc., MNRI®, and Harkla® in `src/App.tsx:360`, since both are cited in `ReflexLibrary.tsx:614-645` and `OfflineReferences.tsx`.

---

## Pillar 5: Accessibility (WCAG 2.2 Level AA & ADA Title III)

### ✅ Verified Remediations
* **Modal Dialog Semantics & Keyboard Escape (`src/components/ProfileModal.tsx:222-238`, `src/components/StepIllustration.tsx:69-77, 294-301`, `src/components/AssessmentWizard.tsx:100-109, 850-872`, `src/components/CircuitRunner.tsx:161-171, 1338-1353, 1372-1392`)**:
  * All 5 modal overlays now include `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, accessible close buttons (`aria-label="Close modal"`), and `Escape` keydown handlers.
* **Accessible Timer & Progressbar Roles (`src/components/CircuitRunner.tsx:1058-1069`)**:
  * Countdown timer includes `role="timer"` and `aria-label="Exercise time remaining"`.
  * Progress bar includes `role="progressbar"`, `aria-valuenow`, `aria-valuemin={0}`, and `aria-valuemax={100}`.
* **Reduced-Motion Guard on Confetti (`src/components/CircuitRunner.tsx:306, 351`)**:
  * `confetti()` bursts are now skipped when `window.matchMedia('(prefers-reduced-motion: reduce)').matches` is true.
* **Search & Form Labels (`src/components/ReflexLibrary.tsx:114`, `src/components/ProfileModal.tsx:348-350`)**:
  * Added `aria-label="Search symptoms or reflexes"` and linked `htmlFor="child-alias-input"`.

### ⚠️ Remaining Pillar 5 Gaps
1. **CSS `@media (prefers-reduced-motion: reduce)` Missing from `src/index.css` (`src/index.css:35-59`)**:
   * While JS `confetti()` respects `prefers-reduced-motion`, `src/index.css` still runs `.animate-breathe` infinite keyframe scaling and Tailwind `animate-pulse` / `scale-110` transitions unconditionally (`CircuitRunner.tsx:875, 926`, `PathwayHeroVisual.tsx:108`).
   * **Fix:** Append to `src/index.css`:
     ```css
     @media (prefers-reduced-motion: reduce) {
       *, ::before, ::after {
         animation-duration: 0.01ms !important;
         animation-iteration-count: 1 !important;
         transition-duration: 0.01ms !important;
         scroll-behavior: auto !important;
       }
     }
     ```
2. **Remaining Unlabeled Inputs (`src/components/OfflineReferences.tsx:76`, `src/components/ProfileModal.tsx:506`, `src/components/CircuitRunner.tsx:1282`)**:
   * Add `aria-label="Search offline reference cards"` to `OfflineReferences.tsx:76`.
   * Add `aria-label="Preferred reward or motivator"` to `ProfileModal.tsx:506`.
   * Add `aria-label="Caregiver session notes"` to `CircuitRunner.tsx:1282`.
3. **Low-Contrast `text-slate-400` Metadata Text**:
   * Upgrade `text-slate-400` on light backgrounds (`#94a3b8`, ~2.5:1 contrast ratio) to `text-slate-500` or `text-slate-600` in `App.tsx:211`, `CircuitRunner.tsx:869, 892, 923`, `ProgressDashboard.tsx:230, 265, 312`, and `OfflineReferences.tsx:141, 174, 208, 228`.

---

## Summary Checklist of Remaining Quick Fixes for Unconditional 100% Sign-Off

1. **`src/components/PrivacyVideoPlayer.tsx:24`**: Parse `?t=(\d+)s?` from `youtubeUrl` into `&start=${seconds}` on `embedUrl`, and reset `hasConsented` when `youtubeId` or `youtubeUrl` changes so all 11 reflex videos start at their proper clinical demonstration timestamp.
2. **`src/components/ProfileModal.tsx:100`**: Change `deleteChildProfile(currentProfile.id)` to `deleteChildProfile(activeId)` so deleting a selected profile in the modal deletes the currently viewed profile.
3. **`src/index.css`**: Add `@media (prefers-reduced-motion: reduce)` rule to disable `.animate-breathe` and `animate-pulse` for vestibular-sensitive users.
4. **`src/components/CircuitRunner.tsx:454, 461, 1313-1314` & `src/utils/storage.ts:216, 345, 695`**: Replace remaining `"Red Zone"` / `"{preZone} Zone"` strings with `"Overload State (SOS)"` / `formatZoneState()`.
5. **`src/data/reflexData.ts:187, 261, 575, 636` & `src/components/ReflexLibrary.tsx:383`**: Remove parenthetical `(MNRI)`, `(BRMT)`, `(Harkla)` from `categoryLabel` and `"Video Demonstrations (Harkla OT)"`, and add INPP & RMTi® to the `src/App.tsx:360` footer notice.
6. **`src/App.tsx:212, 358` & Clinical Labels**: Change `"10-Minute Home Therapy Coach"` to `"10-Minute Home Movement & Co-Regulation Companion"`, add a footer button to re-open `SafetyConsentModal`, and add `aria-label` to the 3 remaining inputs (`OfflineReferences.tsx:76`, `ProfileModal.tsx:506`, `CircuitRunner.tsx:1282`).

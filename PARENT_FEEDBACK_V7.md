# KineticBloom — Parent & Caregiver Advocate Evaluation (Round 7 Verification)

**Reviewer Role:** Parent & Caregiver Advocate (Representing Families across ASD Support Levels 1, 2, and 3)  
**Application Audited:** KineticBloom (`http://localhost:3000/`)  
**Source Code Inspected:** `/Users/naga.aerakoni/workspace/projects/kinetic-bloom/src`  
**Audit Date:** Round 7 Verification (`PARENT_FEEDBACK_V7.md` — Post-`done_updating_v4.rerun` Audit)

---

## Executive Summary

Round 7 introduces major **physical safety, child privacy (COPPA), data autonomy, and neuro-affirming language upgrades** that directly protect exhausted parents and vulnerable children across **ASD Support Levels 1, 2, and 3**:

- **First-Launch Physical Safety & Contraindication Gate (`SafetyConsentModal.tsx`):** Before a parent ever attempts a drill on the living room rug, KineticBloom now displays a clear, scannable safety gate flagging **Atlantoaxial Instability (AAI / Down Syndrome)**, **VP shunts / elevated intracranial pressure**, **seizure & epilepsy precautions** around 60 BPM rhythmic rocking, **G-tube / feeding tube prone precautions**, and the **AAP $\le 10\%$ body-weight rule** for weighted blankets and lap pads.
- **Click-to-Load Privacy Shield for Third-Party Videos (`PrivacyVideoPlayer.tsx`):** Auto-loading YouTube iframes have been replaced with a COPPA-conscious consent gate (`Load Video (Adult Caregiver Consent)`) that prevents silent third-party cookies/IP tracking until an adult explicitly opts in, while clearly attributing Harkla® as an independent third-party educational resource.
- **Granular Data Erasure & Consumer-Wellness Boundaries (`ProfileModal.tsx`):** Parents now have a two-step **Danger Zone** to delete a single child's profile (`Delete This Profile`) or wipe all browser storage (`Erase All Local Data & Factory Reset`), alongside transparent non-HIPAA/FERPA consumer-wellness disclosures.
- **Copyright-Safe, Neuro-Affirming Autonomic States (`CircuitRunner.tsx`):** Replaced trademarked "Zones" color labels with intuitive parent-friendly **Autonomic States**: **Overload State (SOS)**, **Revved-Up State (Buzzing)**, **Anchored State (Ready)**, and **Low-Battery State (Resting)**, plus OS-level `prefers-reduced-motion` protection before firing celebration confetti.
- **2×2 Quadrant Step Cropping for `moro_transient_steps.jpg` (`StepIllustration.tsx`):** In `StepIllustration.tsx` (lines 118–138), when `sequenceImageUrl` (`activePathway.transientSequenceImageUrl`) is provided, each step card now applies a `scale(2)` + `objectPosition` quadrant crop (`0% 0%`, `100% 0%`, `0% 100%`, `100% 100%`) so Steps 1–4 display distinct panels from `moro_transient_steps.jpg`.

### Why Round 7 Still Cannot Receive a Full Sign-Off on Visual / Photo Accuracy
While the vector SVG default and the `moro_transient_steps.jpg` quadrant crop are smart engineering steps, **our code inspection of `reflexData.ts`, `StepIllustration.tsx`, and `PathwayHeroVisual.tsx` uncovered three concrete bugs/gaps in the Photo mode experience:**

1. **`"📷 Reflex Overview"` Label & Banner Are Currently Dead Code (`reflexData.ts` + `StepIllustration.tsx` + `PathwayHeroVisual.tsx`):**
   - `StepIllustration.tsx` (line 102) checks `{step.imageUrl ? "📷 Photo" : "📷 Reflex Overview"}` and `PathwayHeroVisual.tsx` (line 27) checks `const hasDedicatedStepPhoto = Boolean(currentStep?.imageUrl)`.
   - **However**, in `src/data/reflexData.ts`, **every single `TransientStep` across all 51 pathways still has `"imageUrl"` hardcoded to the primary reflex `.jpg`** (e.g., `"/images/fear_paralysis.jpg"`, `"/images/moro_starfish.jpg"`, `"/images/tlr_superman.jpg"`).
   - Because `step.imageUrl` is always truthy (even though it is just a copy of `fallbackImageUrl`), `Boolean(step.imageUrl)` is **always `true`**! As a result, the button **still says `"📷 Photo"` / `"📷 Step Photo"` on all 51 pathways**, and the helpful `"📷 Reflex Overview"` label and `"Reflex Overview Reference (Use Vector Guide for Exact Step Posture)"` disclaimer banner **never render**!
2. **Zoom Modal in `StepIllustration.tsx` Ignores `sequenceImageUrl`:**
   - When a parent clicks a quadrant-cropped step photo on **Moro Pathway 1 (The Starfish Drill)** to inspect it in the full-screen zoom modal (`StepIllustration.tsx`, lines 311–317), the modal renders `<img src={activeImage} ... />` (`/images/moro_starfish.jpg`) instead of `sequenceImageUrl` (`/images/moro_transient_steps.jpg`).
3. **40 of 51 Secondary Pathways (and 50 of 51 Sequence Sheets) Still Lack Dedicated Artwork & 2 Primary Images Still Have AI Garbled Text:**
   - Only **1 of 51 pathways** (`moro_starfish`) has a `transientSequenceImageUrl` (`/images/moro_transient_steps.jpg`). The other **50 pathways** have no 4-panel sequence sheet, and **40 secondary pathways** (Peanut Ball, Scooter Board, Lycra Tunnel, Therapy Putty, Spiky Roller, Classroom Desk, Parent-Assisted Passive) still fall back to Pathway 1's primary reflex `.jpg` when toggled to Photo mode.
   - Additionally, `/public/images/tlr_superman.jpg` (`"ՈITLUR INTEGRATION"` / `"Supine Flexion (Meatball)"`) and `/public/images/stnr_cat_cow.jpg` (`"Cat (Flexion) - Flexion"` / `"Cow (Extension) - Extension"`) remain unchanged on disk (`163975` and `172189` bytes).

---

## 1. Score Progression: Round 5 ➔ Round 6 ➔ Round 7

| Evaluation Dimension | Round 5 | Round 6 | Round 7 | Delta (R6 ➔ R7) & Parent Impact |
| :--- | :---: | :---: | :---: | :--- |
| **ASD Level 3 Support** (Non-speaking, passive pathways, co-regulation, AAI/G-tube/seizure safety) | 9.5 / 10 | 9.6 / 10 | **9.8 / 10** | **+0.2** — First-launch `SafetyConsentModal` explicitly protects medically complex Level 3 children (AAI, VP shunts, G-tubes, seizure thresholds, $\le 10\%$ weighted blanket limit). |
| **ASD Level 2 Support** (PDA scripts, sensory adaptations, low-demand choices, reduced-motion) | 9.4 / 10 | 9.5 / 10 | **9.7 / 10** | **+0.2** — New Autonomic State chips (`Overload`, `Revved-Up`, `Anchored`, `Low-Battery`), persistent onboarding dismissal, and `prefers-reduced-motion` guard prevent sensory surprises. |
| **ASD Level 1 Support** (Literal mode, classroom/desk stealth resets, child privacy) | 9.6 / 10 | 9.6 / 10 | **9.8 / 10** | **+0.2** — `PrivacyVideoPlayer` prevents silent YouTube tracking, and URL `?tab=` deep-linking lets parents bookmark specific views. |
| **Visual & Anatomical Clarity** (Vector SVGs vs. Photo toggle & pathway-specific accuracy) | 6.8 / 10 | 7.8 / 10 | **8.2 / 10** | **+0.4** — 2×2 quadrant cropping on `moro_transient_steps.jpg` works in step cards, but `step.imageUrl` duplication in `reflexData.ts` prevents `"📷 Reflex Overview"` labels from appearing on the remaining 50 pathways. |
| **Overall Parent Advocacy Score** | **8.8 / 10** | **9.1 / 10** | **9.4 / 10** | **+0.3** — Exceptional clinical safety, privacy, and neuro-affirming UX; fixing the `step.imageUrl` fallback detection and remaining photo assets will bring this to 9.8+. |

---

## 2. What Worked Exceptionally Well in Round 7

### 2.1 First-Launch Physical Safety & Contraindication Gate (`src/components/SafetyConsentModal.tsx`)
- **Why Parents Love It:** Many autistic children (especially Level 2 and Level 3) have co-occurring medical conditions such as hypotonia, Down Syndrome, epilepsy, VP shunts, or G-tube buttons. Having an explicit, plain-English safety checklist on first launch—requiring parent acknowledgment before starting physical exercises—prevents dangerous mistakes (such as prone tummy exercises pressing on a G-tube or neck flexion with Atlantoaxial Instability) and highlights the **AAP $\le 10\%$ body-weight limit** for weighted blankets.

### 2.2 COPPA-Conscious Video Privacy Shield (`src/components/PrivacyVideoPlayer.tsx`)
- **Why Parents Love It:** Parents of neurodivergent children are deeply protective of their family's digital footprint. Replacing auto-loading YouTube embeds with a clean preview card that warns before transmitting IP/device metadata to Google/YouTube—and offers both in-app playback (`Load Video (Adult Caregiver Consent)`) and an external link—is a gold-standard privacy pattern.

### 2.3 Granular Data Erasure & Honest Wellness Framing (`src/components/ProfileModal.tsx`)
- **Why Parents Love It:** If a parent creates a temporary profile for a niece/nephew or shares an iPad with a respite caregiver, they can now delete a single profile (`Delete This Profile`) or wipe the entire app (`Erase All Local Data & Factory Reset`) with a safe 2-step confirmation. The explicit notice that KineticBloom is a local-only consumer wellness tool (not a HIPAA/FERPA cloud medical record) builds genuine trust.

### 2.4 Neuro-Affirming Autonomic State Selector & Reduced-Motion Respect (`src/components/CircuitRunner.tsx`)
- **Why Parents Love It:** Replacing clinical/trademarked color zones with **Overload State (SOS)**, **Revved-Up State (Buzzing)**, **Anchored State (Ready)**, and **Low-Battery State (Resting)** makes immediate intuitive sense to a tired parent at 7:30 PM. Checking `window.matchMedia('(prefers-reduced-motion: reduce)')` before firing confetti ensures visually sensitive children aren't startled at the end of a calming session.

---

## 3. High-Priority Visual & Code Issues Remaining

### Issue 1 (Quick Code Fix): `"📷 Reflex Overview"` Label Never Triggers Because `step.imageUrl` Is Duplicated Across All Steps in `reflexData.ts`
- **Where It Happens:**
  - `src/components/StepIllustration.tsx` (line 102): `{step.imageUrl ? "📷 Photo" : "📷 Reflex Overview"}`
  - `src/components/PathwayHeroVisual.tsx` (lines 26–27, 55, 97): `const hasDedicatedStepPhoto = Boolean(currentStep?.imageUrl);`
  - `src/data/reflexData.ts`: Every single `TransientStep` in all 51 pathways has `"imageUrl"` populated with the primary reflex `.jpg` (e.g., `"imageUrl": "/images/fear_paralysis.jpg"`, `"imageUrl": "/images/moro_starfish.jpg"`).
- **Parent Impact:** Because `step.imageUrl` is identical to `fallbackImageUrl` (and never `undefined`), `Boolean(step.imageUrl)` evaluates to `true` on every step of every pathway. Consequently, both `<StepIllustration />` and `<PathwayHeroVisual />` still label the button **`"📷 Photo"`** / **`"📷 Step Photo"`** on all 50 pathways that don't have step photos, and the helpful disclaimer banner (`"Reflex Overview Reference (Use Vector Guide for Exact Step Posture)"`) never renders.
- **Recommended Fix:**
  1. In `StepIllustration.tsx`, define:
     ```tsx
     const hasDedicatedStepPhoto = Boolean(
       sequenceImageUrl || (step.imageUrl && step.imageUrl !== fallbackImageUrl)
     );
     ```
     and use `{hasDedicatedStepPhoto ? "📷 Step Photo" : "📷 Reflex Overview"}` on the toggle button.
  2. In `PathwayHeroVisual.tsx`, pass `sequenceImageUrl={activePathway.transientSequenceImageUrl}` and define:
     ```tsx
     const hasDedicatedStepPhoto = Boolean(
       pathway.transientSequenceImageUrl ||
       (currentStep?.imageUrl && currentStep.imageUrl !== fallbackImageUrl)
     );
     ```

### Issue 2 (Quick Code Fix): Zoom Modal in `StepIllustration.tsx` Ignores `sequenceImageUrl`
- **Where It Happens:** `src/components/StepIllustration.tsx` (lines 311–317).
- **Parent Impact:** On Moro Pathway 1 (`moro_starfish`), the step card thumbnail in Photo mode now shows the quadrant-cropped panel from `/images/moro_transient_steps.jpg`. However, when a parent taps that photo to zoom in (or switches to the Photo tab inside the zoom modal), lines 311–317 render `<img src={activeImage} ... />` (`/images/moro_starfish.jpg`) instead of `sequenceImageUrl` (`/images/moro_transient_steps.jpg`).
- **Recommended Fix:** In the zoom modal (`modalTab === "photo"`), render `sequenceImageUrl || activeImage` (or show the cropped step quadrant alongside the full 4-panel progression sheet so parents can inspect both the specific step and the full 4-step sequence).

### Issue 3 (Asset Generation): 40 Secondary Pathways & 50 Sequence Sheets Still Share Fallback `.jpg` Files, and 2 Primary `.jpg` Files Have AI Text Glitches
- **Where It Happens:** `/public/images/` and `src/data/reflexData.ts`.
- **Parent Impact:**
  1. **Only 1 of 51 pathways (`moro_starfish`) has a 4-panel `transientSequenceImageUrl` (`/images/moro_transient_steps.jpg`).** All other 50 pathways lack a 4-panel sequence sheet.
  2. **40 out of 51 pathways** (Pathways 2–5 across all 10 reflexes, plus Pathway 6 on Palmar) still point `pathway.imageUrl` to Pathway 1's primary `.jpg`. When a parent selects **Peanut Ball**, **Scooter Board**, **Lycra Tunnel**, **Therapy Putty**, **Spiky Ball**, **Classroom Desk**, or **Parent-Assisted Passive** and clicks the Photo toggle, they see the floor exercise from Pathway 1.
  3. **Corrupted AI Text on Two Primary Reflex Images:**
     - `/public/images/tlr_superman.jpg` still displays garbled header text `"ՈITLUR INTEGRATION"` and shows both `"Superman (Extension)"` and `"Supine Flexion (Meatball)"` on the same card.
     - `/public/images/stnr_cat_cow.jpg` still displays duplicated labels `"Cat (Flexion) - Flexion"` and `"Cow (Extension) - Extension"`.

---

## 4. Prioritized Action Checklist for Next Iteration

1. **[Immediate Code Fix — 5 mins] Fix `hasDedicatedStepPhoto` in `StepIllustration.tsx` & `PathwayHeroVisual.tsx`:** Compare `step.imageUrl !== fallbackImageUrl` (or check `Boolean(sequenceImageUrl)`) so that `"📷 Reflex Overview"` and the `"Reflex Overview Reference"` banner actually activate when a step shares the reflex-level fallback photo.
2. **[Immediate Code Fix — 5 mins] Wire `sequenceImageUrl` into `StepIllustration.tsx` Zoom Modal & `PathwayHeroVisual.tsx`:** Ensure clicking a cropped step photo in `moro_starfish` shows `sequenceImageUrl` in the zoom modal, and allow `PathwayHeroVisual` to display the cropped quadrant when `pathway.transientSequenceImageUrl` is present.
3. **[Asset Fix] Clean Up AI Text on `tlr_superman.jpg` and `stnr_cat_cow.jpg`:** Replace or crop out `"ՈITLUR INTEGRATION"` on `tlr_superman.jpg` and `"Cat (Flexion) - Flexion"` / `"Cow (Extension) - Extension"` on `stnr_cat_cow.jpg`.
4. **[Asset Expansion] Generate Pathway-Specific Illustrations for Secondary & Equipment Pathways:** Prioritize generating dedicated `.jpg`/`.webp` illustrations for equipment-based and passive pathways (Peanut Ball, Scooter Board, Lycra Tunnel, Therapy Putty, Spiky Roller, Classroom Desk, Parent-Assisted Passive) so Photo mode matches the selected pathway.

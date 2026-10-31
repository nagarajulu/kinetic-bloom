# KineticBloom — Round 7 Expert Coach Clinical Verification & Visual Asset Audit (`_V7.md`)

**Auditor:** Principal Pediatric Neuro-Developmental Director & Head Primitive Reflex Integration Coach  
**Frameworks Applied:** INPP (Sally Goddard Blythe), MNRI® (Dr. Svetlana Masgutova), RMTi / BRMT (Dr. Harald Blomberg & Moira Dempsey — 60 BPM Cerebellar Rhythmic Entrainment), Brain Balance®, Harkla Pediatric OT, & Williams & Shellenberger *Pyramid of Learning*  
**Target Codebase:** `/Users/naga.aerakoni/workspace/projects/kinetic-bloom` (`http://localhost:3000/`)  
**Audit Round:** Round 7 Verification of `done_updating_v4.rerun` (`SafetyConsentModal.tsx`, `StepIllustration.tsx`, `PathwayHeroVisual.tsx`, `CircuitRunner.tsx`, `ProgressDashboard.tsx`, `reflexData.ts`, and `public/images/*`)

---

## 1. Executive Summary & Clinical Readiness Score

| Evaluation Pillar | Round 6 Score | Round 7 Score | Status & Clinical Verdict |
| :--- | :---: | :---: | :--- |
| **1. Clinical Contraindications & Safety Guardrails (`SafetyConsentModal.tsx`)** | 82 / 100 | **99 / 100** | **VERIFIED EXCELLENT** — Mandatory 3-checkbox caregiver attestation covering AAI/Down Syndrome (Trisomy 21), VP shunts, epilepsy/seizures, G-tubes/GERD, and AAP $\le 10\%$ weighted blanket limits. |
| **2. Autonomic States Rebrand & FDA Wellness Framing (`CircuitRunner.tsx`, `ProgressDashboard.tsx`)** | 90 / 100 | **99 / 100** | **VERIFIED EXCELLENT** — Clean polyvagal/somatic state nomenclature (*Overload SOS*, *Revved-Up Buzzing*, *Anchored Ready*, *Low-Battery Resting*) + non-diagnostic print watermark. |
| **3. Diagram-First UX & Quadrant Step Cropping (`StepIllustration.tsx`, `PathwayHeroVisual.tsx`)** | 78 / 100 | **90 / 100** | **STRONG ARCHITECTURAL PROGRESS** — Defaulting to `PediatricOtDiagram` vector guides + `moro_transient_steps.jpg` 2×2 quadrant cropping works, but two logic bugs prevent `"📷 Reflex Overview"` and properly aligned quadrants from showing (see Section 3). |
| **4. Physical `.jpg` Image Assets on Disk (`public/images/*`)** | 65 / 100 | **68 / 100** | **ACTION STILL REQUIRED ON DISK** — `stnr_cat_cow.jpg`, `tlr_superman.jpg`, and `landau_airplane.jpg` have not yet been regenerated on disk, and only 1 of 51 pathways (`moro_starfish`) currently has a `transientSequenceImageUrl` 4-panel sheet. |
| **Overall Clinical & Pedagogical Readiness** | **88 / 100** | **93.5 / 100** | **Public-Launch Safety & UX Architecture Ready; Image Asset Generation & 2 Minor Cropping/Fallback Fixes Remaining** |

---

## 2. What Worked Exceptionally Well in This Update

### 2.1 Gold-Standard Clinical Contraindication Gate ([`SafetyConsentModal.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/SafetyConsentModal.tsx))
- **Cervical / Atlantoaxial Instability (AAI) Protection ([`SafetyConsentModal.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/SafetyConsentModal.tsx#L70)):** Explicitly warns caregivers not to perform ATNR neck rotation, STNR/TLR neck flexion/extension, or backward tilt checks if the child has Down Syndrome (Trisomy 21) without physician AAI X-ray clearance, or has a cervical fusion, VP shunt, or recent concussion.
- **Seizure & Vestibular Precaution ([`SafetyConsentModal.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/SafetyConsentModal.tsx#L73)):** Advises consulting a pediatric neurologist before 60 BPM rhythmic rocking or vestibular tilt exercises in children with epilepsy or autonomic seizures.
- **Prone & G-Tube Safety ([`SafetyConsentModal.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/SafetyConsentModal.tsx#L76)):** Protects children with G-tubes, feeding buttons, or severe GERD during prone floor/ball pathways.
- **AAP Weighted Blanket Standard ([`SafetyConsentModal.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/SafetyConsentModal.tsx#L79)):** Enforces the American Academy of Pediatrics rule that weighted blankets must never exceed $\le 10\%$ of body weight, never cover head/neck, and must be removable independently by the child.
- **Voluntary Pain-Free Rule & Persistent 3-Part Attestation ([`SafetyConsentModal.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/SafetyConsentModal.tsx#L84-L141)):** Requires explicit checkboxes for contraindications, non-medical educational framing, and $18+$ adult status before unlocking the app.

### 2.2 Polyvagal Autonomic State Nomenclature & Non-Diagnostic Print Watermark ([`CircuitRunner.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/CircuitRunner.tsx), [`ProgressDashboard.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/ProgressDashboard.tsx))
- **Autonomic State Rebrand ([`CircuitRunner.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/CircuitRunner.tsx#L398-L447) & [`ProgressDashboard.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/ProgressDashboard.tsx#L62-L75)):** Replacing generic color labels with clinically descriptive nervous system states—**Overload State (SOS)**, **Revved-Up State (Buzzing)**, **Anchored State (Ready)**, and **Low-Battery State (Resting)**—gives parents and teachers immediate somatic literacy while maintaining clean IP/trademark separation.
- **FDA General Wellness & Non-Diagnostic Print Header ([`ProgressDashboard.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/ProgressDashboard.tsx#L80-L85)):** The print-only banner (`INFORMATIONAL CAREGIVER PROGRESS LOG — NOT A MEDICAL RECORD`) clearly frames printed reports for school IEP/OT collaboration without crossing into regulated medical-device billing claims.

### 2.3 Diagram-First Pathway Hero & Step Cards ([`PathwayHeroVisual.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/PathwayHeroVisual.tsx), [`StepIllustration.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/StepIllustration.tsx))
- Defaulting both [`PathwayHeroVisual.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/PathwayHeroVisual.tsx#L27) and [`StepIllustration.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/StepIllustration.tsx#L23) to `"diagram"` mode ensures every caregiver first sees a clean, posture-specific [`PediatricOtDiagram`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/PediatricOtDiagrams.tsx) SVG tailored to that exact step's `diagramType` (`peanut_ball`, `weighted_blanket`, `seated_desk`, `scooter_board`, `therapy_putty`, etc.), with interactive step pills (`1`, `2`, `3`, `4`) in the hero footer.
- Wiring `transientSequenceImageUrl: "/images/moro_transient_steps.jpg"` into `moro_starfish` ([`src/data/reflexData.ts`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/data/reflexData.ts#L509)) activates the 4-panel sequence banner in [`ReflexLibrary.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/ReflexLibrary.tsx#L430-L443) and 2×2 quadrant cropping in [`StepIllustration.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/StepIllustration.tsx#L118-L138).

---

## 3. Remaining Clinical & Visual Items to Resolve

### 3.1 Code Logic Bug #1: `"📷 Reflex Overview"` Label Is Currently Unreachable on All 40 Non-Primary Pathways
- **Where:**
  - [`StepIllustration.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/StepIllustration.tsx#L102): `{step.imageUrl ? "📷 Photo" : "📷 Reflex Overview"}`
  - [`PathwayHeroVisual.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/PathwayHeroVisual.tsx#L79): `{currentStep?.imageUrl || pathway.imageUrl ? "📷 Photo" : "📷 Reflex Overview"}`
- **Why It Happens:** In [`src/data/reflexData.ts`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/data/reflexData.ts), every single one of the 51 pathways and ~160 steps **still has `"imageUrl": "/images/<main_reflex>.jpg"` hardcoded on both the pathway and every step object**. Because `step.imageUrl` and `pathway.imageUrl` are always truthy strings, the button **always says `"📷 Photo"`** even when viewing a weighted blanket, peanut ball, or classroom desk pathway that falls back to the main floor-mat image!
- **Recommended Fix:**
  - Either remove the redundant `"imageUrl"` fields from non-primary pathways and their `transientSteps` in [`src/data/reflexData.ts`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/data/reflexData.ts) (so `fallbackImageUrl` is used and the button accurately displays `"📷 Reflex Overview"`), **OR** update the condition in [`PathwayHeroVisual.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/PathwayHeroVisual.tsx#L79) and [`StepIllustration.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/StepIllustration.tsx#L102) to check whether the pathway is a `primary_movement` pathway (or has a `sequenceImageUrl` / dedicated pathway image distinct from `fallbackImageUrl`).

### 3.2 Code Logic Bug #2: `moro_transient_steps.jpg` 4-Quadrant Crop Mapping vs. `moro_starfish`'s 3 Steps (Plus Modal Uncropped Fallback)
- **Where:** [`StepIllustration.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/StepIllustration.tsx#L118-L138) and [`StepIllustration.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/StepIllustration.tsx#L311-L317).
- **Why It Happens:**
  1. [`public/images/moro_transient_steps.jpg`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/moro_transient_steps.jpg) is a 4-panel (`2×2`) illustration:
     - **Top-Left (Panel 1):** `1 SETUP & START` (Neutral supine resting on mat)
     - **Top-Right (Panel 2):** `2 FETAL TUCK` (Fetal ball tuck)
     - **Bottom-Left (Panel 3):** `3 TRANSIENT OPENING` (Limbs opening outward with arrows)
     - **Bottom-Right (Panel 4):** `4 FULL STARFISH HOLD` (Full open Starfish)
  2. However, `moro_starfish.transientSteps` in [`src/data/reflexData.ts`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/data/reflexData.ts#L462-L502) has **3 steps**:
     - `stepNumber: 1` (*"Fetal Ball Starting Position"*) crops to **Top-Left (`1 SETUP & START`)** instead of **Top-Right (`2 FETAL TUCK`)**!
     - `stepNumber: 2` (*"Slow 5-Second Starfish Opening"*) crops to **Top-Right (`2 FETAL TUCK`)** instead of **Bottom-Left/Right (`3 TRANSIENT OPENING` / `4 FULL STARFISH HOLD`)**!
     - `stepNumber: 3` (*"5-Second Cross-Limb Hug Closure"*) crops to **Bottom-Left (`3 TRANSIENT OPENING`)** instead of **Top-Right (`2 FETAL TUCK`)**!
  3. Additionally, when the user clicks a step card to open the **Full-Screen Biomechanical Inspection Modal** ([`StepIllustration.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/StepIllustration.tsx#L312-L316)) and switches to `"📷 Clinical Photo Reference"`, the modal renders `src={activeImage}` (`moro_starfish.jpg`) instead of the cropped `sequenceImageUrl` panel!
- **Recommended Fix:**
  - Either add the 4th setup step (`stepNumber: 1` = Neutral Supine Setup, `stepNumber: 2` = Fetal Tuck, `stepNumber: 3` = Slow 5s Opening, `stepNumber: 4` = Full Starfish Hold & Cross-Hug Return) to `moro_starfish.transientSteps` in [`src/data/reflexData.ts`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/data/reflexData.ts#L462-L502), **or** map the quadrant by `step.diagramType` (`fetal_tuck` / `meatball_hug` $\rightarrow$ Top-Right `100% 0%`, `starfish_open` $\rightarrow$ Bottom-Right `100% 100%`, `mat_setup` $\rightarrow$ Top-Left `0% 0%`), and apply the same quadrant crop inside the expanded modal (`modalTab === "photo"`).

### 3.3 Physical `.jpg` Image Assets on Disk Still Requiring Regeneration (`public/images/*`)
As verified via filesystem inspection of [`/Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/):
1. **[`public/images/stnr_cat_cow.jpg`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/stnr_cat_cow.jpg) (CRITICAL — Must Regenerate on Disk):**
   - Still contains **Panel 2: Child's Pose (Head Down, Hips shift back to heels)**—which is the #1 clinical compensation red flag for a retained STNR (hips MUST remain locked at 90° directly over the knees during Cat-Cow flexion)—plus severe AI-corrupted gibberish text at the bottom (`"quadhoruped position... does sagging or ggevitly back edging... These foam mat to luo2n thr onnous round"`).
2. **[`public/images/tlr_superman.jpg`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/tlr_superman.jpg) (MODERATE — Header Typo):**
   - Still contains the AI-garbled subtitle `"TONIC LABYRINTHINE REFLEX (TLR) ՈITLUR INTEGRATION"`.
3. **[`public/images/landau_airplane.jpg`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/landau_airplane.jpg) (MODERATE — Misleading Title & Worksheet Footer):**
   - Still titled `"FLYING SUPERMAN POSE!"` (conflating Landau 90° Airplane T-wings with TLR Superman) and still displays fill-in-the-blank worksheet text (`"Hold for ___ seconds, ___ repetitions."`).
4. **Coverage of `transientSequenceImageUrl` Across Pathways (Currently 1 of 51 Pathways):**
   - Currently, only `moro_starfish` (1 of 51 pathways) has a `transientSequenceImageUrl` (`moro_transient_steps.jpg`), and the 40 non-primary pathways do not yet have dedicated `.jpg` photos on disk. Using the Round 6 Clinical Prompt Catalog (`EXPERT_COACH_FEEDBACK_V6.md` Section 5) to batch-generate clean, text-free 2-panel/4-panel illustrations will complete the photo library.

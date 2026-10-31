# KineticBloom — Round 6 Clinical Visual Audit, Pathway Image Architecture & Public-Launch Compliance Specification

**Auditor:** Principal Pediatric Neuro-Developmental Director & Head Primitive Reflex Integration Coach  
**Frameworks Applied:** INPP (Sally Goddard Blythe), MNRI® (Dr. Svetlana Masgutova — Archetype & Isometric Neuro-Structural Repatterning), RMTi / BRMT (Dr. Harald Blomberg & Moira Dempsey — 60 BPM Cerebellar Rhythmic Entrainment), Brain Balance®, Harkla Pediatric OT, & Williams & Shellenberger *Pyramid of Learning*  
**Target Codebase:** `/Users/naga.aerakoni/workspace/projects/kinetic-bloom` (`http://localhost:3000/`)  
**Audit Round:** Round 6 (Pathway & Step Photo Duplication Audit, Existing `.jpg` Clinical Biomechanical & Text Defect Review, Complete Pathway/Step Image Generation Blueprint, and Public-Launch Clinical Contraindication Guardrails)

---

## 1. Executive Summary & User Observation Validation

> **User Observation Addressed:**  
> *"Whatever image main reflex uses, same image is shown when we toggle to photo in any of pathway which doesn't seem appropriate to me; why can't we generate new images for those resembling main reflex image example along with pathway step says?"*

### Clinical & Architectural Verdict: **100% Validated — Critical Visual-Pedagogical Mismatch Identified**
A line-by-line inspection of [`src/data/reflexData.ts`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/data/reflexData.ts), [`src/components/ReflexLibrary.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/ReflexLibrary.tsx), [`src/components/DailyPlayRoutine.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/DailyPlayRoutine.tsx), and all 27 image assets in [`public/images/`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/) confirms the user's observation:

1. **All 52 `exercisePathways` and all ~160 `transientSteps` in [`src/data/reflexData.ts`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/data/reflexData.ts) hardcode the parent reflex's single primary `.jpg` file (`reflex.imageUrl`) as both `pathway.imageUrl` and `step.imageUrl`.**
   - While Round 5 successfully built 11 distinct pathway-specific **SVG animations** in [`src/components/ExerciseAnimation.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/ExerciseAnimation.tsx), clicking the **`[ 📷 Photo ]`** toggle on **any** of the 41 non-primary pathways (e.g., *Peanut Ball Assisted Starfish*, *Classroom Desk Reset*, *MNRI® Isometric Cross-Press*, *Weighted Blanket Burrow*, *Lycra Tunnel Crawl*, *Scooter Board Glide*, *Therapy Putty Treasure Hunt*) still renders the primary floor-mat calisthenic `.jpg`!
   - Even worse, inside the **"Setup & Transient Steps"** tab ([`ReflexLibrary.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/ReflexLibrary.tsx#L454-L492)), every individual step card (Steps 1, 2, 3, and 4) renders a `120px × 120px` thumbnail of `step.imageUrl`—which is the **exact same static image repeated 3–4 times in a row** rather than showing the progressive phases of the movement or the unused [`moro_transient_steps.jpg`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/moro_transient_steps.jpg) sequence sheet!
2. **`moro_transient_steps.jpg` Exists on Disk But Is Completely Unwired:**
   - [`public/images/moro_transient_steps.jpg`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/moro_transient_steps.jpg) is already in the repository and illustrates a 4-panel step progression (`1 SETUP & START` → `2 FETAL TUCK` → `3 TRANSIENT OPENING` → `4 FULL STARFISH HOLD`).
   - [`ReflexLibrary.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/ReflexLibrary.tsx#L442-L452) even has conditional JSX to render `activePathway.transientSequenceImageUrl`, yet `transientSequenceImageUrl` appears **zero times** in [`src/data/reflexData.ts`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/data/reflexData.ts)!
3. **Clinical & AI Text Defects Discovered in Existing Primary `.jpg` Files:**
   - Visual inspection of all 12 exercise `.jpg` files in [`public/images/`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/) revealed **one severe clinical biomechanical error** (in [`stnr_cat_cow.jpg`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/stnr_cat_cow.jpg), which depicts *Child's Pose with hips collapsed back onto heels*—the #1 STNR flexor compensation red flag!) and **three files with AI-hallucinated gibberish text or worksheet fill-in-the-blanks** ([`stnr_cat_cow.jpg`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/stnr_cat_cow.jpg), [`tlr_superman.jpg`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/tlr_superman.jpg), and [`landau_airplane.jpg`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/landau_airplane.jpg)).
   - Conversely, [`moro_starfish.jpg`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/moro_starfish.jpg), [`moro_transient_steps.jpg`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/moro_transient_steps.jpg), and [`spinal_galant.jpg`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/spinal_galant.jpg) establish the **Gold-Standard KineticBloom Illustration Style**: warm pastel nursery/clinic lighting, padded play mat, clear directional vector arrows, and numbered multi-panel progression without garbled body paragraphs.

---

## 2. Root-Cause Audit: Image Duplication Across All 52 Pathways & ~160 Transient Steps

### 2.1 Current Inventory of [`public/images/`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/) (27 Total Files)
- **11 Retained-vs-Integrated Comparison Diagrams (`*_retained_vs_integrated.jpg`):** Used in the Overview tab of each reflex.
- **11 Primary Exercise Illustrations:**
  1. [`fear_paralysis.jpg`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/fear_paralysis.jpg) — Reused across **5 pathways** & **17 steps**
  2. [`moro_starfish.jpg`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/moro_starfish.jpg) — Reused across **5 pathways** & **16 steps**
  3. [`tlr_superman.jpg`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/tlr_superman.jpg) — Reused across **5 pathways** & **16 steps**
  4. [`landau_airplane.jpg`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/landau_airplane.jpg) — Reused across **4 pathways** & **12 steps**
  5. [`spinal_galant.jpg`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/spinal_galant.jpg) — Reused across **5 pathways** & **15 steps**
  6. [`amphibian_crawling.jpg`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/amphibian_crawling.jpg) — Reused across **4 pathways** & **12 steps**
  7. [`atnr_lizard.jpg`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/atnr_lizard.jpg) — Reused across **5 pathways** & **16 steps**
  8. [`stnr_cat_cow.jpg`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/stnr_cat_cow.jpg) — Reused across **5 pathways** & **16 steps**
  9. [`palmar_hand.jpg`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/palmar_hand.jpg) — Reused across **5 pathways** & **15 steps**
  10. [`plantar_exercise.jpg`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/plantar_exercise.jpg) — Reused across **4 pathways** & **12 steps**
  11. [`rooting_exercise.jpg`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/rooting_exercise.jpg) — Reused across **4 pathways** & **12 steps**
- **1 Unused Transient Step Sequence Image:**
  - [`moro_transient_steps.jpg`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/moro_transient_steps.jpg) — Present on disk, **0 references** in [`src/data/reflexData.ts`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/data/reflexData.ts).

### 2.2 Why Reusing the Main Reflex Image Breaks Clinical Fidelity in Non-Primary Pathways
When a parent or occupational therapist selects an alternative pathway (because a child is sensory-defensive, in a classroom chair, or using a therapy ball) and toggles **`[ 📷 Photo ]`**, the visual contradiction is jarring:

| Selected Pathway (`id` & Category) | What the Pathway Text & Steps Instruct | What `[ 📷 Photo ]` Currently Shows (`pathway.imageUrl`) | Clinical Mismatch Severity |
| :--- | :--- | :--- | :--- |
| **`fpr_passive`** (*Assisted Passive*) | Child burrowed under a **weighted blanket** with parent applying firm bilateral shoulder grounding & 4-2-6 breathing | [`fear_paralysis.jpg`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/fear_paralysis.jpg): Seated floor hugging knees & standing tree pose | **HIGH** — No blanket, no parent co-regulation shown |
| **`fpr_desk_grounding`** (*Classroom Desk*) | Seated in **school desk chair** pressing feet into floor & pulling up on chair seat pan | [`fear_paralysis.jpg`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/fear_paralysis.jpg): Seated on floor mat / standing barefoot | **HIGH** — Cannot be imitated at a classroom desk |
| **`moro_assisted_ball`** (*Sensory Equipment*) | Child draped **supine over a peanut/therapy ball** while parent stabilizes hips | [`moro_starfish.jpg`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/moro_starfish.jpg): Solo child lying flat on a foam puzzle mat | **CRITICAL** — Parent has no visual guide for safe ball stabilization |
| **`moro_isometric_cross_press`** (*Isometric Resistance*) | Parent applying **30% gentle outward isometric resistance** against crossed wrists/shins | [`moro_starfish.jpg`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/moro_starfish.jpg): Solo child with no caregiver hands shown | **CRITICAL** — MNRI® hand placement is missing |
| **`tlr_equipment_ball`** (*Sensory Equipment*) | Child lying **prone over a therapy ball** walking hands forward to reach floor targets | [`tlr_superman.jpg`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/tlr_superman.jpg): Child lying flat on carpet in Superman & Egg tuck | **CRITICAL** — Missing therapy ball & hip-spotter hand placement |
| **`landau_scooter_glide`** (*Active Play*) | Child lying **prone on a 4-wheel scooter board** pulling or gliding across floor | [`landau_airplane.jpg`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/landau_airplane.jpg): Child lying on foam mat | **HIGH** — No scooter board shown |
| **`galant_rhythmic_tail_wag`** (*Rhythmic 60 BPM*) | Child in **prone/quadruped** while parent rhythmically rocks pelvis side-to-side at 60 BPM | [`spinal_galant.jpg`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/spinal_galant.jpg): Solo child supine doing Snow Angels | **CRITICAL** — Opposite body orientation (supine vs prone) |
| **`atnr_desk_fencer`** (*Classroom Desk*) | Child **seated at school desk** pressing palm into desktop while rotating head toward extended arm | [`atnr_lizard.jpg`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/atnr_lizard.jpg): Child lying prone on stomach on floor mat | **CRITICAL** — Seated vs prone floor posture |
| **`stnr_bear_crab_walk`** (*Active Play*) | Child walking on **hands and feet (Bear Walk)** and transitioning to **Crab Walk** | [`stnr_cat_cow.jpg`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/stnr_cat_cow.jpg): Kneeling Cat-Cow / Child's Pose | **HIGH** — Completely different locomotion pattern |

---

## 3. Clinical & Visual Audit of All 12 Existing Exercise `.jpg` Files

Before generating new pathway and step images, we audited every existing exercise illustration in [`public/images/`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/) for **clinical biomechanical accuracy** and **AI text legibility**:

| Image File | Visual Style & Panels | Clinical Biomechanical Accuracy | Text / Typography Integrity | Verdict & Required Action |
| :--- | :--- | :--- | :--- | :--- |
| **[`moro_starfish.jpg`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/moro_starfish.jpg)** | 2-Panel (`1` Fetal Tuck, `2` Open Starfish) on colorful foam mat | **EXCELLENT (10/10)** — Shows right-over-left vs left-over-right crossing clarity and open abduction | **PERFECT** — Uses only clean numbers `1` and `2` (zero AI text corruption) | **GOLD-STANDARD TEMPLATE** for all 2-panel pathway illustrations |
| **[`moro_transient_steps.jpg`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/moro_transient_steps.jpg)** | 4-Panel (`1 SETUP & START`, `2 FETAL TUCK`, `3 TRANSIENT OPENING`, `4 FULL STARFISH HOLD`) | **EXCELLENT (10/10)** — Shows exact 4-phase transient transition with vectors | **CLEAN** — Short 2–3 word uppercase headers are 100% legible | **GOLD-STANDARD TEMPLATE** for 4-panel `transientSequenceImageUrl` sheets; **wire immediately into `moro_starfish`** |
| **[`spinal_galant.jpg`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/spinal_galant.jpg)** | 1-Panel Supine Snow Angel on teal mat with dashed/solid sweep arrows | **EXCELLENT (9.5/10)** — Shows flat lower back and symmetrical arm/leg sweep arcs | **PERFECT** — Text-free illustration | **KEEP** for `galant_snow_angels` |
| **[`amphibian_crawling.jpg`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/amphibian_crawling.jpg)** | 1-Panel Prone Homolateral Crawl on blue gym mat with vector callouts | **EXCELLENT (10/10)** — Accurately shows 90° right hip/knee flexion with pelvis flat | **CLEAN** — All 5 callout labels are spelled accurately | **KEEP** for `amphibian_belly_crawl` |
| **[`atnr_lizard.jpg`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/atnr_lizard.jpg)** | 2-Panel (`Left Side` vs `Right Side`) Prone Lizard with top-down insets | **EXCELLENT (10/10)** — Accurately pairs head rotation with ipsilateral 90° arm/leg flexion and contralateral extension | **CLEAN** — All labels legible | **KEEP** for `atnr_lizard` |
| **[`fear_paralysis.jpg`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/fear_paralysis.jpg)** | 2-Panel (`Gentle Rocking` + `Deep Pressure Hug` & `Grounding Walk` + `Safe Space Breathing`) | **GOOD (9/10)** — Captures active/solo safety regulation well | **CLEAN** — All 4 labels legible | **KEEP** for `fpr_active_grounding`; generate separate images for the other 4 FPR pathways |
| **[`palmar_hand.jpg`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/palmar_hand.jpg)** | 2-Panel (`Panel 1: Finger-Thumb Opposition`, `Panel 2: Palm Massage & Extension`) | **GOOD (9/10)** — Panel 1 shows finger opposition; Panel 2 actually depicts `palmar_babkin_acupressure`! | **CLEAN** — All labels legible | **KEEP** (or split Panel 1 & Panel 2 into pathway-specific images) |
| **[`plantar_exercise.jpg`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/plantar_exercise.jpg)** | 2-Panel (`Panel 1: Towel Scrunches`, `Panel 2: Ball Rolling`) | **GOOD (9.5/10)** — Panel 1 matches `plantar_towel_scrunch`; Panel 2 matches `plantar_sensory_ball`! | **CLEAN** — All labels legible | **KEEP** and split/expand for the 4 Plantar pathways |
| **[`rooting_exercise.jpg`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/rooting_exercise.jpg)** | 2-Panel (`Oral Motor Desensitization (Parent-Guided Massage)`, `Oral Motor Exercise (Active Play)`) | **EXCELLENT (9.5/10)** — Panel 1 matches `rooting_passive_calming_stroke`; Panel 2 matches `rooting_oral_straw_play` | **CLEAN** — All labels legible | **KEEP** and generate dedicated images for `rooting_cheek_puffs` & `rooting_isometric_cheek` |
| **[`landau_airplane.jpg`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/landau_airplane.jpg)** | 1-Panel Prone Extension on foam puzzle mat | **MODERATE (7.5/10)** — Arms are in 90° Airplane T-wings (good), but header mislabels it **`FLYING SUPERMAN POSE!`** (conflating it with TLR Superman) | **DEFECTIVE WORKSHEET TEXT** — Bottom reads `"Hold for ___ seconds, ___ repetitions."` | **REGENERATE** `landau_airplane.jpg` with clean text-free or `1`–`2` numbered panels (prone rest → Airplane T-wing lift with knees off mat) |
| **[`tlr_superman.jpg`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/tlr_superman.jpg)** | 2-Panel (`1. SUPERMAN POSE` Prone Extension, `2. EGG POSE` Supine Flexion) | **EXCELLENT (9.5/10)** — Clinically spot-on pairing of TLR Extension & TLR Flexion | **AI GARBLED SUBTITLE** — Top subtitle reads `"TONIC LABYRINTHINE REFLEX (TLR) ՈITLUR INTEGRATION"` | **CROP/CLEAN HEADER OR REGENERATE** in clean `moro_starfish.jpg` style |
| **[`stnr_cat_cow.jpg`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/stnr_cat_cow.jpg)** | 2-Panel (`1. Cat-Cow Position`, `2. Child's Pose (Head Down, Hips shift back to heels)`) | **CRITICAL BIOMECHANICAL ERROR (2/10)** — Panel 2 instructs shifting hips back onto heels when the head drops! In INPP/RMTi STNR integration, **sitting the hips back onto the heels when the head flexes IS the retained STNR reflex firing!** The hips MUST stay locked at 90° over the knees during Cat-Cow! | **SEVERE AI GIBBERISH** — `"quadhoruped position... does sagging or ggevitly back edging..."` / `"Hips hititps Back... These foam mat to luo2n thr onnous round"` | **MUST REPLACE IMMEDIATELY** — Clinically contraindicative posture + illegible AI gibberish text |

---

## 4. Visual Architecture Blueprint: How New Pathway & Step Images Should Work

To directly answer the user's question (*"why can't we generate new images for those resembling main reflex image example along with pathway step says?"*), KineticBloom already has the exact TypeScript schema needed in [`src/data/reflexData.ts`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/data/reflexData.ts#L10-L35):

```ts
export interface TransientStep {
  step: number;
  title: string;
  description: string;
  imageUrl?: string;        // Can point to step-specific panel or crop
  biomechanicalCue?: string;
}

export interface ExercisePathway {
  id: string;
  name: string;
  category: PathwayCategory;
  // ...
  imageUrl: string;                    // <-- Currently duplicates reflex.imageUrl! Should be "/images/pathways/${pathway.id}.jpg"
  transientSequenceImageUrl?: string;  // <-- Supported by ReflexLibrary.tsx L442-L452, currently UNUSED!
  transientSteps: TransientStep[];
}
```

### 4.1 Recommended Two-Tier Visual Asset Strategy
Rather than generating 160 separate single-step files (which would bloat bundle size and require 160 prompts), the **clinically optimal, highest-clarity architecture** combines:

1. **52 Pathway-Specific Hero Images (`/public/images/pathways/<pathway_id>.jpg`):**
   - Rendered when the user toggles **`[ 📷 Photo ]`** in the main exercise viewer ([`ReflexLibrary.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/ReflexLibrary.tsx#L397-L407) and [`DailyPlayRoutine.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/DailyPlayRoutine.tsx#L393-L405)).
   - Designed in the **exact 2-panel warm clinical illustration style of [`moro_starfish.jpg`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/moro_starfish.jpg)**:
     - **Panel `1` (Setup / Phase 1):** Starting posture, equipment setup (peanut ball, desk chair, scooter board, weighted blanket, therapy putty), and caregiver hand placement.
     - **Panel `2` (Integration Peak / Phase 2):** Full integration hold or rhythmic vector trajectory with directional arrows.
     - **Zero paragraph text inside the image**—only clean numbered badges (`1`, `2`) and directional arrows! All clinical text is rendered by React in crisp HTML/CSS below the image, eliminating AI text-spelling hallucinations forever.
2. **4-Panel Transient Step Progression Sheets (`/public/images/steps/<pathway_id>_steps.jpg`) + CSS Sprite/Object-Position Cropping for Individual Step Thumbnails:**
   - Wired to `pathway.transientSequenceImageUrl` (which [`ReflexLibrary.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/ReflexLibrary.tsx#L442-L452) already renders as a full-width *"Visual Step-by-Step Progression"* banner at the top of the **"Setup & Transient Steps"** tab!).
   - Designed in the **2×2 4-panel grid format of [`moro_transient_steps.jpg`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/moro_transient_steps.jpg)** (`Panel 1: Setup`, `Panel 2: Initiation`, `Panel 3: Peak Hold`, `Panel 4: Return / Integration`).
   - **Bonus UX Enhancement in [`ReflexLibrary.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/ReflexLibrary.tsx#L469-L476):** Each individual step card (`step 1`, `step 2`, `step 3`, `step 4`) can either reference its own cropped quadrant (`step_1.jpg`–`step_4.jpg`) or apply CSS `object-view-box` / `background-position` on the 2×2 `transientSequenceImageUrl` sheet so that **Step 1 shows Panel 1, Step 2 shows Panel 2, Step 3 shows Panel 3, and Step 4 shows Panel 4**—never repeating the same full thumbnail 4 times!

---

## 5. Complete Clinical Image Specification Catalog (All 11 Reflexes & 52 Pathways)

Below is the **Master Clinical Visual Prompt & Biomechanical Specification Catalog** for generating pathway-accurate images across all 11 reflexes, matching the warm pastel pediatric illustration style of [`moro_starfish.jpg`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/moro_starfish.jpg) and [`moro_transient_steps.jpg`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/moro_transient_steps.jpg).

### Global Style Prompt Prefix (Use for All Generations)
> *"Warm pediatric occupational therapy clinical illustration in the exact style of `moro_starfish.jpg`: soft pastel playroom background with padded foam play mat, friendly diverse 6-year-old child wearing comfortable striped long-sleeve top and joggers, clean bold outlines, soft watercolor shading, teal/coral biomechanical motion arrows, numbered circular badges (`1`, `2`, `3`, `4`), NO body paragraph text or captions inside the image."*

---

### 5.1 Fear Paralysis Reflex (FPR) — 5 Pathways
| Pathway ID & Name | Target File Path | Panel 1 & Panel 2 Clinical Visual Specification (Matching Pathway Steps) |
| :--- | :--- | :--- |
| **`fpr_active_grounding`** *(Active Grounding & Breath)* | `/images/pathways/fpr_active_grounding.jpg` *(Existing `fear_paralysis.jpg` is valid)* | **Panel 1:** Child seated on soft mat hugging knees gently to chest with calm nasal inhale arrow. **Panel 2:** Child standing barefoot with soft knees, hands resting over heart/belly, slow 6-second pursed-lip exhale arrow. |
| **`fpr_passive`** *(Assisted Passive — Weighted Blanket Burrow)* | `/images/pathways/fpr_passive.jpg` | **Panel 1:** Child curled comfortably on side/back under a quilted sensory weighted blanket; caregiver kneeling beside mat with warm, flat hands resting gently over child's outer shoulders (proprioceptive containment). **Panel 2:** Child's shoulders visibly dropping and relaxing as caregiver guides slow 4-2-6 vagal exhale. |
| **`fpr_isometric_heart`** *(MNRI® Isometric — Heart-Guard & Brow Release)* | `/images/pathways/fpr_isometric_heart.jpg` | **Panel 1:** Child lying supine on padded mat with knees bent; caregiver's hands gently cradling child's shoulders as child presses shoulders down into mat at 20% effort (small downward force arrows). **Panel 2:** Caregiver using two fingertips to trace a feather-light horizontal smoothing stroke from center of forehead out to temples while child exhales. |
| **`fpr_rhythmic_infant_rock`** *(BRMT 60 BPM — Supine Foot-to-Head Bounce)* | `/images/pathways/fpr_rhythmic_infant_rock.jpg` | **Panel 1:** Child lying supine with legs relaxed and straight; caregiver seated at child's feet cupping both calcanei (heels) in palms. **Panel 2:** Caregiver gently pulsing/oscillating heels rhythmically toward head at 60 BPM (longitudinal wave arrows traveling up spine so child's head nods passively "yes"). |
| **`fpr_desk_grounding`** *(Classroom Desk — Seated Vagal Anchor)* | `/images/pathways/fpr_desk_grounding.jpg` | **Panel 1:** Child seated upright in a wooden classroom chair at a desk, both feet planted flat on floor, hands gripping the bottom edges of the chair seat pan (upward pull arrows on hands, downward press arrows on feet). **Panel 2:** Child releasing grip, resting forearms softly on desk with shoulders dropped and slow pursed-lip exhale arrow. |

---

### 5.2 Moro Reflex — 5 Pathways
| Pathway ID & Name | Target File Path | Panel 1 & Panel 2 Clinical Visual Specification (Matching Pathway Steps) |
| :--- | :--- | :--- |
| **`moro_starfish`** *(Primary Calisthenic — Starfish Cross-Pattern)* | `/images/moro_starfish.jpg` + **Wire `/images/moro_transient_steps.jpg` to `transientSequenceImageUrl`!** | Already matches Gold Standard! Wire `transientSequenceImageUrl: "/images/moro_transient_steps.jpg"` in [`src/data/reflexData.ts`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/data/reflexData.ts#L316). |
| **`moro_assisted_ball`** *(Sensory Equipment — Peanut Ball Supported Starfish)* | `/images/pathways/moro_assisted_ball.jpg` | **Panel 1:** Child lying supine supported across a blue therapy peanut ball, arms and legs crossed in fetal hug (`Right-over-Left`), caregiver kneeling behind/beside stabilizing pelvis. **Panel 2:** Child opening arms and legs wide into supported Starfish extension over the contour of the peanut ball while caregiver maintains secure hip contact. |
| **`moro_passive_repatterning`** *(Assisted Passive — Co-Regulated Limb Guide)* | `/images/pathways/moro_passive_repatterning.jpg` | **Panel 1:** Child lying supine on mat; caregiver kneeling beside mat holding child's forearms and lower shins, gently guiding them into a slow fetal cross-hug over chest. **Panel 2:** Caregiver slowly opening child's arms and legs outward along the floor into open Starfish while child breathes calmly. |
| **`moro_isometric_cross_press`** *(MNRI® Isometric — Starfish Cross-Press)* | `/images/pathways/moro_isometric_cross_press.jpg` | **Panel 1:** Child supine in tightly crossed Starfish tuck (`Right wrist over Left wrist`, `Right ankle over Left ankle`); caregiver's palms placed gently on the outer surfaces of child's forearms and shins. **Panel 2:** Bidirectional isometric force arrows showing child pushing outward at 30% effort against caregiver's steady stabilizing hands for 5 seconds, followed by relaxed exhale. |
| **`moro_desk_crab_shell`** *(Classroom Desk — Seated Starfish & Crab Shell)* | `/images/pathways/moro_desk_crab_shell.jpg` | **Panel 1:** Child seated at school desk chair opening arms wide to sides and extending ankles forward under desk (Seated Starfish inhale). **Panel 2:** Child rounding forward slightly in chair, wrapping arms across chest (`Left-over-Right`) and crossing ankles (`Left-over-Right`) in tight "Crab Shell" hug on exhale. |

---

### 5.3 Tonic Labyrinthine Reflex (TLR) — 5 Pathways
| Pathway ID & Name | Target File Path | Panel 1 & Panel 2 Clinical Visual Specification (Matching Pathway Steps) |
| :--- | :--- | :--- |
| **`tlr_superman`** *(Primary Calisthenic — Prone Superman & Supine Meatball)* | `/images/tlr_superman.jpg` *(Clean garbled header `ՈITLUR`)* | **Panel 1:** Prone Superman on mat (head, chest, straight arms, and straight legs lifted off mat, gaze at floor 12 inches ahead so neck is not hyperextended). **Panel 2:** Supine Egg/Meatball tuck (knees pulled to chest, hands clasping shins, chin tucked to chest). |
| **`tlr_equipment_ball`** *(Sensory Equipment — Therapy Ball Prone Walkout)* | `/images/pathways/tlr_equipment_ball.jpg` | **Panel 1:** Child draped prone tummy-down over a large therapy ball with hands planted on floor; caregiver kneeling beside ball stabilizing child's pelvis/hips. **Panel 2:** Child walking hands forward so pelvis rolls onto ball, lifting chest and one hand to pick up a colorful puzzle piece on the floor while keeping back and legs straight. |
| **`tlr_isometric_press`** *(MNRI® Isometric — Supine Neck-Flexor & Prone Extensor Hold)* | `/images/pathways/tlr_isometric_press.jpg` | **Panel 1:** Child supine in Egg tuck; caregiver places gentle palm against child's forehead and shins as child applies 25% isometric flexion hold for 5 seconds. **Panel 2:** Child prone in mini-Superman lift; caregiver places gentle palm across upper thoracic back and posterior thighs for 25% isometric extension hold. |
| **`tlr_passive_cradle_flexion`** *(Assisted Passive — Supine Cradle Rock)* | `/images/pathways/tlr_passive_cradle_flexion.jpg` | **Panel 1:** Child curled in supine fetal tuck on soft mat; caregiver supports behind shoulders and knees, gently rocking child head-to-toe at 60 BPM. **Panel 2:** Child resting prone with a rolled towel under chest while caregiver strokes firmly down paraspinal extensor muscles from neck to sacrum. |
| **`tlr_play_turtle`** *(Active Play — Turtle Shell & Tunnel Crawl)* | `/images/pathways/tlr_play_turtle.jpg` | **Panel 1:** Child crawling prone through a stretchy Lycra sensory tunnel, lifting head to look out the exit ("Turtle poking head out of shell"). **Panel 2:** Child rolling onto back inside a soft cushion nest, curling tightly into a "Turtle inside shell" ball. |

---

### 5.4 Landau Reflex — 4 Pathways
| Pathway ID & Name | Target File Path | Panel 1 & Panel 2 Clinical Visual Specification (Matching Pathway Steps) |
| :--- | :--- | :--- |
| **`landau_airplane`** *(Primary Calisthenic — Prone Airplane T-Wings)* | `/images/landau_airplane.jpg` *(Regenerate to fix `FLYING SUPERMAN` title & fill-in-the-blank text)* | **Panel 1:** Child lying prone on foam mat with arms abducted 90° out to the sides like airplane wings, forehead resting on mat. **Panel 2:** Child lifting head, chest, 90° T-wing arms, and straight legs/thighs simultaneously off the mat (knees straight and clear of floor), gaze forward-downward. |
| **`landau_passive_ball`** *(Sensory Equipment — Peanut Ball Prone Glide)* | `/images/pathways/landau_passive_ball.jpg` | **Panel 1:** Child lying prone tummy-down over a peanut therapy ball with arms relaxed downward. **Panel 2:** Caregiver rocking the peanut ball gently forward while child lifts chest and spreads arms 90° wide into Airplane T-wings, legs extending straight behind. |
| **`landau_isometric_scapular`** *(MNRI® Isometric — Scapular & Thoracic Lift)* | `/images/pathways/landau_isometric_scapular.jpg` | **Panel 1:** Child lying prone with arms in 90° Airplane T-wings and chest lifted slightly off mat (legs staying relaxed on floor first to dissociate upper from lower body). **Panel 2:** Caregiver placing gentle downward fingertips on the back of child's forearms/wrists while child holds a 25% upward isometric scapular squeeze for 5 seconds. |
| **`landau_scooter_glide`** *(Active Play — Prone Scooter Board Flight)* | `/images/pathways/landau_scooter_glide.jpg` | **Panel 1:** Child lying prone centered tummy-down on a 4-wheel pediatric scooter board, pushing off gently with hands while keeping legs straight and lifted off the floor. **Panel 2:** Child gliding forward on the scooter board with arms spread wide in 90° Airplane wings and chest/legs lifted against gravity. |

---

### 5.5 Spinal Galant Reflex — 5 Pathways
| Pathway ID & Name | Target File Path | Panel 1 & Panel 2 Clinical Visual Specification (Matching Pathway Steps) |
| :--- | :--- | :--- |
| **`galant_snow_angels`** *(Primary Calisthenic — Supine Snow Angels)* | `/images/spinal_galant.jpg` *(Existing image is clean)* | Keep [`spinal_galant.jpg`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/spinal_galant.jpg) for `galant_snow_angels`; generate a 4-panel sequence sheet (`galant_snow_angels_steps.jpg`) showing: `1` Neutral Supine Low-Back Flatten, `2` Bilateral Overhead Sweep, `3` Unilateral Right-Only Sweep, `4` Contralateral Diagonal Sweep. |
| **`galant_isometric_trunk`** *(MNRI® Isometric — Side-Lying Pelvic Stabilizer)* | `/images/pathways/galant_isometric_trunk.jpg` | **Panel 1:** Child lying on their side with knees bent 90°; caregiver places one stabilizing hand on child's iliac crest (pelvis) and the other on the ribcage. **Panel 2:** Child gently side-flexing hip upward ~1 inch against caregiver's 25% isometric resistance for 5 seconds, then melting flat to reset lumbar tactile sensitivity. |
| **`galant_passive_trunk_crescent`** *(Assisted Passive — Bilateral Lumbar Desensitization & Crescent)* | `/images/pathways/galant_passive_trunk_crescent.jpg` | **Panel 1:** Child lying prone on soft mat; caregiver using both flat palms simultaneously (firm bilateral pressure, never ticklish unilateral stroking) to glide down both sides of the lumbar spine from ribs to sacrum. **Panel 2:** Child lying supine while caregiver gently curves child's legs and torso into a tiny left-then-right banana crescent stretch. |
| **`galant_rhythmic_tail_wag`** *(BRMT 60 BPM — Prone Pelvic Tail-Wag)* | `/images/pathways/galant_rhythmic_tail_wag.jpg` | **Panel 1:** Child resting in prone or all-fours puppy posture; caregiver kneeling beside child with hands cupping both sides of the pelvis. **Panel 2:** Caregiver rhythmically rocking the pelvis side-to-side at 60 BPM (curved bilateral horizontal oscillation arrows across the sacrum). |
| **`galant_sensory_tunnel`** *(Active Play — Textured Army Crawl & Back Rub)* | `/images/pathways/galant_sensory_tunnel.jpg` | **Panel 1:** Child supine on a textured carpet/yoga mat pressing lower back flat ("squishing the bug under your lower back") while sliding arms/legs slowly. **Panel 2:** Child wiggling on belly through a soft pillow fort tunnel with even pressure across the lower back. |

---

### 5.6 Amphibian Reflex — 4 Pathways
| Pathway ID & Name | Target File Path | Panel 1 & Panel 2 Clinical Visual Specification (Matching Pathway Steps) |
| :--- | :--- | :--- |
| **`amphibian_belly_crawl`** *(Primary Calisthenic — Homolateral & Cross-Crawl)* | `/images/amphibian_crawling.jpg` *(Existing image is clean)* | Keep [`amphibian_crawling.jpg`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/amphibian_crawling.jpg) for `amphibian_belly_crawl`. |
| **`amphibian_isometric_knee_drive`** *(MNRI® Isometric — Prone Frog Knee Slide)* | `/images/pathways/amphibian_isometric_knee_drive.jpg` | **Panel 1:** Child lying prone on mat with right knee slid up to a 90° frog-leg angle along the floor while pelvis remains flat (no hip hike). **Panel 2:** Caregiver placing one hand flat over child's sacrum (to anchor pelvis) and the other hand gently below the bent knee/ankle while child pushes against 25% isometric resistance. |
| **`amphibian_passive_pelvic_glide`** *(Assisted Passive — Guided Frog-Leg Slide)* | `/images/pathways/amphibian_passive_pelvic_glide.jpg` | **Panel 1:** Child lying supine (or prone) relaxed on mat; caregiver holds one hand flat on the child's opposite hip (ASIS) to prevent pelvic rolling. **Panel 2:** Caregiver uses the other hand to smoothly slide the child's right heel up along the mat into 90° knee flexion and back down. |
| **`amphibian_supine_cross`** *(Active Play — Supine Dead-Bug & Cross-Crawl Tap)* | `/images/pathways/amphibian_supine_cross.jpg` | **Panel 1:** Child lying supine on mat lifting right knee to 90° while left leg stays straight and flat on floor. **Panel 2:** Child reaching left hand across midline to tap the lifted right knee (contralateral cross-crawl tap with a colorful star sticker on the knee). |

---

### 5.7 Asymmetrical Tonic Neck Reflex (ATNR) — 5 Pathways
| Pathway ID & Name | Target File Path | Panel 1 & Panel 2 Clinical Visual Specification (Matching Pathway Steps) |
| :--- | :--- | :--- |
| **`atnr_lizard`** *(Primary Calisthenic — Prone Lizard Crawl)* | `/images/atnr_lizard.jpg` *(Existing image is clean)* | Keep [`atnr_lizard.jpg`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/atnr_lizard.jpg) for `atnr_lizard`. |
| **`atnr_isometric_fencer`** *(MNRI® Isometric — Supine Fencer Counter-Pressure)* | `/images/pathways/atnr_isometric_fencer.jpg` | **Panel 1:** Child lying supine in Fencer posture (head turned right, right arm & right leg straight, left arm & left leg bent 90°). **Panel 2:** Caregiver placing gentle stabilizing hands at the extended right wrist and bent left elbow while child holds a 25% isometric press for 5 seconds with shoulders flat. |
| **`atnr_passive_fencer`** *(Assisted Passive — Guided Head-Independent Arm Slide)* | `/images/pathways/atnr_passive_fencer.jpg` | **Panel 1:** Child lying supine looking straight up at a ceiling target sticker while caregiver gently rotates head to the right. **Panel 2:** Caregiver holds child's right arm gently flexed or neutral while head turns, training neck rotation without automatic arm extension. |
| **`atnr_standing_laser`** *(Active Play — Standing Fencer & Cross-Midline Infinity 8)* | `/images/pathways/atnr_standing_laser.jpg` | **Panel 1:** Child standing in front of a large horizontal Lazy-8 (infinity symbol `∞`) poster on the wall, tracing the loop across midline with both hands clasped while head stays centered. **Panel 2:** Child marching slowly in place tapping right hand to left knee while keeping gaze fixed on a wall target. |
| **`atnr_desk_fencer`** *(Classroom Desk — Seated Desktop Fencer Reset)* | `/images/pathways/atnr_desk_fencer.jpg` | **Panel 1:** Child seated at school desk with palms flat on desktop, elbows slightly bent; child slowly turns head 90° to look over left shoulder while **keeping right elbow smoothly bent** (not locking straight!). **Panel 2:** Child turns head 90° to look over right shoulder while keeping both palms and bent elbows completely still on the desk. |

---

### 5.8 Symmetrical Tonic Neck Reflex (STNR) — 5 Pathways
| Pathway ID & Name | Target File Path | Panel 1 & Panel 2 Clinical Visual Specification (Matching Pathway Steps) |
| :--- | :--- | :--- |
| **`stnr_cat_cow`** *(Primary Calisthenic — Quadruped Cat-Cow)* | `/images/stnr_cat_cow.jpg` (**MUST REPLACE EXISTING FILE!**) | **Panel 1 (Cow / Head Up):** Child on hands and knees in strict 90°/90° quadruped box posture (wrists directly under shoulders, knees directly under hips), belly dipping slightly, head lifting to look forward, **elbows locked straight**. **Panel 2 (Cat / Head Down):** Child staying in the **EXACT SAME 90°/90° quadruped box** (hips remain directly over knees at a 90° vertical angle—**DO NOT shift hips back to heels!**), spine rounding upward like an angry cat, chin tucked to look at knees, elbows straight. |
| **`stnr_isometric_quadruped`** *(MNRI® Isometric — Quadruped Rock & Hold)* | `/images/pathways/stnr_isometric_quadruped.jpg` | **Panel 1:** Child in 90°/90° quadruped looking down at knees while caregiver places gentle hands on the front of child's shoulders/pelvis, resisting a 20% forward-rock effort for 5 seconds. **Panel 2:** Child looking forward (Cow) while caregiver places hands behind pelvis as child resists a 20% backward-rock effort with straight elbows. |
| **`stnr_passive_lap_rocking`** *(BRMT 60 BPM — Assisted Quadruped Hip Rocking)* | `/images/pathways/stnr_passive_lap_rocking.jpg` | **Panel 1:** Child on hands and knees over a soft bolster or mat; caregiver kneels beside child holding both hips at the pelvis. **Panel 2:** Caregiver rhythmically rocks child's hips forward and back 3–4 inches at 60 BPM while child keeps elbows straight and neck relaxed. |
| **`stnr_bear_crab_walk`** *(Active Play — Bear Walk to Crab Walk Transition)* | `/images/pathways/stnr_bear_crab_walk.jpg` | **Panel 1 (Bear Walk):** Child walking on hands and feet with knees lifted off the floor, hips high, and arms straight, looking forward at a target. **Panel 2 (Crab Walk):** Child seated and lifting hips into tabletop Crab Walk on hands and feet, carrying a beanbag on their tummy without sagging. |
| **`stnr_desk_cat_cow`** *(Classroom Desk — Seated Spinal Wave)* | `/images/pathways/stnr_desk_cat_cow.jpg` | **Panel 1:** Child seated upright in school desk chair with feet flat on floor (90° knees, legs NOT wrapped around chair legs), hands on knees, arching chest gently forward and looking up (Seated Cow). **Panel 2:** Child rounding upper back and tucking chin to chest while keeping feet planted flat on floor (Seated Cat). |

---

### 5.9 Palmar Grasp Reflex — 5 Pathways
| Pathway ID & Name | Target File Path | Panel 1 & Panel 2 Clinical Visual Specification (Matching Pathway Steps) |
| :--- | :--- | :--- |
| **`palmar_cat_paws`** *(Primary Calisthenic — Cat Paws Squeeze-Spread & Sequential Opposition)* | `/images/palmar_hand.jpg` *(Or dedicated `/images/pathways/palmar_cat_paws.jpg`)* | **Panel 1:** Child flexing fingers only at the knuckles ("Cat Paws" / intrinsic plus hook) and then spreading all 5 fingers wide like sunbeams (`1` Squeeze → `2` Spread). **Panel 2:** Sequential thumb-to-fingertip opposition (`Index → Middle → Ring → Pinky`) while the non-working hand rests flat and quiet on the table (zero overflow). |
| **`palmar_isometric_babkin`** *(MNRI® Isometric — Finger Spread Resistance)* | `/images/pathways/palmar_isometric_babkin.jpg` | **Panel 1:** Caregiver placing a soft loop or fingers around the outside of child's fingertips while child abducts/spreads fingers outward at 25% effort for 5 seconds. **Panel 2:** Child pressing open flat palm down into mat while keeping mouth/jaw completely relaxed (breaking the Babkin hand-to-mouth link). |
| **`palmar_babkin_acupressure`** *(Assisted Passive — Babkin Palm Spiral & Finger Elongation)* | `/images/pathways/palmar_babkin_acupressure.jpg` | **Panel 1:** Caregiver supporting child's open hand and using thumb to trace a slow, firm spiral across the palm crease and thenar eminence (base of thumb). **Panel 2:** Caregiver gently stroking down the length of each individual finger from base to tip while child's jaw remains relaxed. |
| **`palmar_putty_treasure`** *(Sensory Equipment — Therapy Putty Finger Extension & Pinch)* | `/images/pathways/palmar_putty_treasure.jpg` | **Panel 1:** Child Loop-wrapping a ring of therapy putty around bent fingertips and spreading fingers wide to stretch the putty open (extensor strengthening). **Panel 2:** Child using a neat tripod pinch (thumb, index, middle finger) to pull small plastic beads ("treasures") out of the putty while ring/pinky fingers hold a small pom-pom against the palm. |
| **`palmar_wall_push`** *(Classroom Desk — Desktop Finger-Lifts & Wall Push-Offs)* | `/images/pathways/palmar_wall_push.jpg` | **Panel 1:** Child standing arms-length from wall, pressing wide-open palms flat against wall for 5 seconds with jaw relaxed. **Panel 2:** Child seated at desk with both palms flat on desktop, lifting one finger at a time ("piano fingers") while keeping the palm heel anchored. |

---

### 5.10 Plantar & Babinski Reflex — 4 Pathways
| Pathway ID & Name | Target File Path | Panel 1 & Panel 2 Clinical Visual Specification (Matching Pathway Steps) |
| :--- | :--- | :--- |
| **`plantar_towel_scrunch`** *(Primary Calisthenic — Seated Towel Scrunch & Toe Spread)* | `/images/plantar_exercise.jpg` *(Panel 1 matches; or dedicated `/images/pathways/plantar_towel_scrunch.jpg`)* | **Panel 1:** Child seated in chair with heel anchored firmly on floor, curling toes to scrunch a small hand towel toward the heel. **Panel 2:** Child lifting and fanning all 5 toes wide apart to release the towel, followed by picking up a marble with the toes and dropping it into a cup. |
| **`plantar_isometric_resistance`** *(MNRI® Isometric — Foot Arch & Big-Toe Stabilization)* | `/images/pathways/plantar_isometric_resistance.jpg` | **Panel 1:** Child supine/seated while caregiver applies gentle upward resistance under the ball of the foot (metatarsal head) as child points/plantarflexes ankle at 25% effort for 5 seconds. **Panel 2:** Caregiver gently resists dorsiflexion (pulling foot up toward shin) while child keeps toes relaxed and flat (preventing Babinski toe-fanning). |
| **`plantar_passive_grounding`** *(Assisted Passive — Plantar Figure-8 & Lateral Border Stroke)* | `/images/pathways/plantar_passive_grounding.jpg` | **Panel 1:** Caregiver holding child's bare foot and using firm thumb pressure to trace a deep Figure-8 pattern across the sole from heel to metatarsal arch. **Panel 2:** Caregiver firmly stroking from the outer heel up to the pinky toe and across the ball of the foot to the big toe while gently flexing toes downward. |
| **`plantar_sensory_ball`** *(Sensory Equipment — Spiky Roller & Heel-to-Toe Bear Walk)* | `/images/pathways/plantar_sensory_ball.jpg` | **Panel 1:** Child seated rolling a textured sensory foot roller / tennis ball firmly from heel to ball of foot for 30 seconds. **Panel 2:** Child walking barefoot across a sensory mat practicing exaggerated "Heel → Outer Foot → Big Toe Push-Off" Penguin-to-Tiptoe steps. |

---

### 5.11 Rooting & Sucking Reflex — 4 Pathways
| Pathway ID & Name | Target File Path | Panel 1 & Panel 2 Clinical Visual Specification (Matching Pathway Steps) |
| :--- | :--- | :--- |
| **`rooting_cheek_puffs`** *(Primary Calisthenic — Cheek Puff Transfers & Lip Press)* | `/images/pathways/rooting_cheek_puffs.jpg` | **Panel 1:** Child seated looking in a play mirror, puffing both cheeks full of air with lips sealed tightly in midline for 5 seconds, then shifting the air bubble from left cheek to right cheek (`L ↔ R` arrows) without turning the head or moving the hands! **Panel 2:** Child making an exaggerated "Oooo" pursed-lip kiss followed by a wide closed-lip "Eeee" smile. |
| **`rooting_isometric_cheek`** *(MNRI® Isometric — Jaw & Lip Midline Stabilization)* | `/images/pathways/rooting_isometric_cheek.jpg` | **Panel 1:** Caregiver applying gentle lateral finger contact against the outside of child's right cheek while child holds head and jaw centered in midline for 5 seconds without turning toward the touch. **Panel 2:** Child pressing lips firmly together around a flat wooden tongue depressor while caregiver gives a gentle 20% tug for 5 seconds. |
| **`rooting_passive_calming_stroke`** *(Assisted Passive — Perioral Desensitization Sweep)* | `/images/rooting_exercise.jpg` *(Panel 1 matches; or `/images/pathways/rooting_passive_calming_stroke.jpg`)* | **Panel 1:** Caregiver using firm, symmetrical index/middle fingers to stroke from earlobes forward to the corners of the mouth (orbicularis oris) on both cheeks simultaneously. **Panel 2:** Caregiver tracing a firm vertical stroke from beneath the nose down to the upper lip and from the lower lip to the chin tip while child's hands stay calm in lap. |
| **`rooting_oral_straw_play`** *(Active Play — Thick-Liquid Straw Suck & Cotton-Ball Blow)* | `/images/pathways/rooting_oral_straw_play.jpg` | **Panel 1:** Child seated upright drinking thick applesauce/smoothie through a narrow reusable straw (cheeks pulling inward with strong buccinator seal, hands resting flat on table). **Panel 2:** Child blowing steadily through the straw to propel a pom-pom across a tabletop soccer goal. |

---

## 6. Public-Launch Clinical Contraindication & Regulatory Compliance Guardrails

To ensure **KineticBloom** meets pediatric occupational therapy clinical safety and consumer health-tech compliance standards before public deployment, we recommend adding the following two lightweight safety guardrails:

### 6.1 Specific Red-Flag Cervical / Neuromuscular Contraindication Notice (`OnboardingModal.tsx` & `AssessmentWizard.tsx`)
While [`OnboardingModal.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/OnboardingModal.tsx) and [`AssessmentWizard.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/AssessmentWizard.tsx) already include a general educational disclaimer, clinical reflex integration protocols that involve **neck flexion, neck extension, or head rotation** (TLR, Landau, ATNR, STNR) carry specific pediatric contraindications that must be explicitly stated in the Safety Modal:
- **Atlantoaxial Instability (AAI) / Down Syndrome (Trisomy 21) / Connective Tissue Disorders (Ehlers-Danlos):** Never perform passive neck flexion (Egg Tuck / Chin-to-Chest) or loaded neck resistance without prior radiographic clearance from a physician.
- **Acute Vestibular / Seizure / Post-Concussion Sensitivity:** Immediately stop rhythmic rocking or prone inversion over a therapy ball if the child exhibits facial pallor, cold sweating, nausea, nystagmus, or sudden lethargy (autonomic vagal overload).
- **Never Force Range of Motion:** All MNRI® isometric holds must use **only 20%–30% sub-maximal effort**; never pull on joints or force a child past natural comfort.

### 6.2 Immediate High-Priority Fixes for Engineering Implementation
1. **Replace [`public/images/stnr_cat_cow.jpg`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/stnr_cat_cow.jpg) Immediately:** Eliminate the *Child's Pose (hips shifted back to heels)* biomechanical error and the AI gibberish paragraph text (`"quadhoruped position... ggevitly back edging... luo2n thr onnous round"`).
2. **Clean/Regenerate [`public/images/tlr_superman.jpg`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/tlr_superman.jpg) and [`public/images/landau_airplane.jpg`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/public/images/landau_airplane.jpg):** Fix the `"ՈITLUR"` AI typo in `tlr_superman.jpg` and replace the `"FLYING SUPERMAN POSE! ... Hold for ___ seconds"` header/footer in `landau_airplane.jpg`.
3. **Wire `transientSequenceImageUrl: "/images/moro_transient_steps.jpg"` into `moro_starfish` in [`src/data/reflexData.ts`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/data/reflexData.ts#L316):** This immediately activates the built-in 4-panel sequence viewer in [`ReflexLibrary.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/ReflexLibrary.tsx#L442-L452) and serves as the pattern for all remaining pathway sequence sheets.
4. **Update `ReflexLibrary.tsx` Step Thumbnail Rendering:** When `step.imageUrl === activePathway.imageUrl` (i.e. before dedicated step crops exist), either crop into the 4 quadrants of `transientSequenceImageUrl` (`Panel 1` for Step 1, `Panel 2` for Step 2, `Panel 3` for Step 3, `Panel 4` for Step 4) or display a numbered phase badge graphic rather than repeating the exact same uncropped photo 4 times vertically.
5. **Generate Pathway-Specific `.jpg` Illustrations Using Section 5's Clinical Prompt Catalog:** Populate `/public/images/pathways/<pathway_id>.jpg` and wire each `pathway.imageUrl` in [`src/data/reflexData.ts`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/data/reflexData.ts) so toggling **`[ 📷 Photo ]`** on any of the 52 pathways shows the exact equipment, posture, and caregiver hand placement described in that pathway's steps!

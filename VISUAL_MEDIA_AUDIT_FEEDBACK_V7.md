# Clinical Visual & Media Accuracy Audit — Round 7 Verification (`_V7.md`)

**Auditor Role:** Clinical Visual & Media Accuracy Auditor (Pediatric Occupational Therapy Illustration, Anatomical Pedagogy & UX Media Integrity)  
**Target Application:** KineticBloom (`http://localhost:3000/`, source at `/Users/naga.aerakoni/workspace/projects/kinetic-bloom`)  
**Verification Round:** Round 7 (`done_updating_v4.rerun`)  
**Audit Date:** October 18, 2026  

---

## 1. Round 7 Verification Summary: What Worked vs. What Still Needs Fixes

### 1.1 Verified Improvements Implemented in `done_updating_v4.rerun` (✅ Passed)
1. **Duplicate Timestamped JPEGs Cleaned (`public/images/`):**
   - The 4 duplicate timestamped files (`moro_starfish_exercise_1792282640031.jpg`, `atnr_lizard_crawl_1792282655730.jpg`, `stnr_cat_cow_1792282673806.jpg`, `spinal_galant_snow_angel_1792282686915.jpg`) were cleanly removed from `public/images/`, reducing `public/images/` from 29 files to 23 canonical files.
2. **`moro_transient_steps.jpg` Wired & Prop-Threaded (`reflexData.ts`, `ReflexLibrary.tsx`, `CircuitRunner.tsx`, `StepIllustration.tsx`):**
   - `moro_starfish` in [`src/data/reflexData.ts`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/data/reflexData.ts#L502) now sets `"transientSequenceImageUrl": "/images/moro_transient_steps.jpg"`.
   - Both [`src/components/ReflexLibrary.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/ReflexLibrary.tsx#L451) and [`src/components/CircuitRunner.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/CircuitRunner.tsx#L1046) properly pass `sequenceImageUrl={activePathway.transientSequenceImageUrl}` into `<StepIllustration />`.
   - [`src/components/StepIllustration.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/StepIllustration.tsx#L118-L138) implements CSS 2×2 quadrant cropping (`scale(2)` + `objectPosition` / `transformOrigin`) when `sequenceImageUrl` is present on the card thumbnail, plus `Escape` key dismissal and `role="dialog"` / `aria-modal="true"` accessibility semantics on the inspection modal.
3. **Trademark-Neutral Modality Badges (`PathwayHeroVisual.tsx`):**
   - [`src/components/PathwayHeroVisual.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/PathwayHeroVisual.tsx#L29-L46) cleanly replaced third-party trademarked badge strings (`INPP`, `MNRI®`, `BRMT`, `Harkla`) with descriptive clinical labels (`"Active Dynamic Pattern"`, `"Isometric Gentle Resistance"`, `"60 BPM Rhythmic Rocking"`, `"Therapy Ball & Sensory Play"`).

---

## 2. Critical Remaining Bugs & Visual Gaps Discovered in Round 7 (❌ Must Fix)

### Bug 1: `"📷 Reflex Overview"` Fallback Label is Dead Code (Never Triggers on Any of the 156 Steps or 51 Pathways)
- **Where:**
  - [`src/components/StepIllustration.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/StepIllustration.tsx#L102): `{step.imageUrl ? "📷 Photo" : "📷 Reflex Overview"}`
  - [`src/components/PathwayHeroVisual.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/PathwayHeroVisual.tsx#L79): `{currentStep?.imageUrl || pathway.imageUrl ? "📷 Photo" : "📷 Reflex Overview"}`
- **Why It Fails:**
  - In [`src/data/reflexData.ts`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/data/reflexData.ts), **all 51 pathways (`51/51`) and all 156 steps (`156/156`) still have `imageUrl` hardcoded to a non-empty string** pointing to the 11 main reflex images (`/images/moro_starfish.jpg`, `/images/tlr_superman.jpg`, `/images/atnr_lizard.jpg`, etc.).
  - Because `step.imageUrl` and `pathway.imageUrl` are **always truthy**, the ternary condition evaluates to `"📷 Photo"` 100% of the time! The `"📷 Reflex Overview"` label never appears anywhere in the application.
- **Exact Fix Required:**
  - Either strip the redundant `step.imageUrl` from steps that merely duplicate the reflex's primary overview image, OR compare `step.imageUrl` against `fallbackImageUrl` / check `Boolean(sequenceImageUrl)`:
    ```tsx
    // In StepIllustration.tsx:
    const hasDedicatedStepPhoto = Boolean(
      sequenceImageUrl || (step.imageUrl && step.imageUrl !== fallbackImageUrl)
    );
    // Button label:
    {hasDedicatedStepPhoto ? "📷 Step Photo" : "📷 Reflex Overview"}
    ```
  - Similarly, in `PathwayHeroVisual.tsx`, compare `pathway.imageUrl` against the reflex's primary image (`fallbackImageUrl`) or check `pathway.category === "primary_movement" || Boolean(pathway.transientSequenceImageUrl)`:
    ```tsx
    const hasDedicatedPathwayPhoto = Boolean(
      pathway.transientSequenceImageUrl ||
      pathway.category === "primary_movement" ||
      (pathway.imageUrl && fallbackImageUrl && pathway.imageUrl !== fallbackImageUrl)
    );
    // Button label:
    {hasDedicatedPathwayPhoto ? "📷 Photo" : "📷 Reflex Overview"}
    ```

---

### Bug 2: Quadrant Cropping on `moro_starfish` Has an Off-By-One Panel Mismatch & Disappears Inside the Zoom Modal and `PathwayHeroVisual`
1. **3-Step Data vs. 4-Panel Image Mismatch on `moro_starfish`:**
   - `moro_transient_steps.jpg` has **4 numbered panels**:
     - **Panel 1 (Top-Left, `0% 0%`):** `"1 SETUP & START: Initial Position (Sitting relaxed)"`
     - **Panel 2 (Top-Right, `100% 0%`):** `"2 FETAL TUCK: Moving into Core (Knees hugged tight, arms crossed)"`
     - **Panel 3 (Bottom-Left, `0% 100%`):** `"3 TRANSIENT OPENING: Flowing Outward (Arms & legs halfway open)"`
     - **Panel 4 (Bottom-Right, `100% 100%`):** `"4 FULL STARFISH HOLD: Complete Expansion (Arms & legs extended fully)"`
   - However, `moro_starfish` in `src/data/reflexData.ts` (lines 462–501) only defines **3 steps**:
     - `stepNumber: 1` (`"Fetal Ball Starting Position"`) ➔ currently crops **Panel 1** (which shows *Sitting relaxed*, NOT *Fetal Tuck*!).
     - `stepNumber: 2` (`"Slow 5-Second Starfish Opening"`) ➔ currently crops **Panel 2** (which shows *Fetal Tuck*, NOT *Starfish Opening*!).
     - `stepNumber: 3` (`"5-Second Cross-Limb Hug Closure"`) ➔ currently crops **Panel 3** (*Transient Opening*), while **Panel 4 (*Full Starfish Hold*) is never shown at all**!
   - **Fix:** Update `moro_starfish.transientSteps` in `src/data/reflexData.ts` to have **4 steps** matching the 4 panels of `moro_transient_steps.jpg` (Step 1: *Centered Seated Setup*, Step 2: *Fetal Ball Tuck*, Step 3: *Transient Starfish Opening*, Step 4: *Full Starfish Expansion & Cross-Hug Closure*), OR support an explicit `panelIndex?: 1 | 2 | 3 | 4` on `TransientStep`.
2. **Expanded Zoom Modal & `PathwayHeroVisual` Ignore `sequenceImageUrl`:**
   - In [`src/components/StepIllustration.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/StepIllustration.tsx#L312-L316), when the user clicks a `moro_starfish` step card to open the Full-Screen Inspection Modal and clicks **`📷 Clinical Photo Reference`**, it renders `src={activeImage}` (`/images/moro_starfish.jpg`) instead of the cropped quadrant or `sequenceImageUrl` (`/images/moro_transient_steps.jpg`)!
   - In [`src/components/PathwayHeroVisual.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/PathwayHeroVisual.tsx#L98-L103), toggling to `Photo` renders `activePhoto` without using `pathway.transientSequenceImageUrl` quadrant cropping as `activeStepIndex` changes.

---

### Bug 3: 50 of 51 Pathways Still Lack Dedicated Pathway/Step Storyboard Images (`withSeqImg: 1 / 51`)
- Only **1 out of 51 pathways** (`moro_starfish`) currently has `transientSequenceImageUrl` wired (`moro_transient_steps.jpg`).
- The remaining **50 pathways (153 steps)** across all 11 reflexes still display the same 11 main reflex floor/table images when toggled to Photo mode—meaning Peanut Ball, Scooter Board, Lycra Tunnel, Therapy Putty, Spiky Foot Roller, Classroom Desk, MNRI® Isometric, and Passive Co-Regulation pathways still show unrelated primary reflex photos.

---

### Bug 4: AI Text-Rendering Glitches & FDA `"Diagnostic"` Labels Inside Existing JPEGs (`public/images/`)
Visual inspection of all 23 images in `public/images/` revealed **garbled AI text** and **unscrubbed `"Diagnostic"` headers** baked into the pixel art of **8 existing `.jpg` files**:

| Image File Path | Specific Visual / Typography / Regulatory Defect Baked Into Image Pixels |
| :--- | :--- |
| `public/images/tlr_superman.jpg` | Header subtitle reads **`"AITLUR INTEGRATION"`** (garbled AI text). |
| `public/images/stnr_cat_cow.jpg` | Bottom captions read **`"Cat-tot Position (Head Up, quadhoruped position)"`**, **`"sagging or ggevitly back"`**, and **`"Hips hititps Back / These foam mat to luo2n thr onnous round"`**. |
| `public/images/fear_paralysis_retained_vs_integrated.jpg` | Reads **`"Distress and deatreses sensory overload"`**, **`"Sensoy hestiinatient"`**, and footer says **`"Pediatric Occupational Therapy Diagnostic Guide"`** (violates FDA SaMD scrub). |
| `public/images/tlr_retained_vs_integrated.jpg` | Reads **`"Call drooped and, not holding steady"`**, **`"Holding hight-level, steady"`**, and **`"Right violent, steady looking straight"`** (!). |
| `public/images/landau_retained_vs_integrated.jpg` | Header says **`"DIAGNOSTIC COMPARISON"`** and the left panel has two literal prompt-leak labels reading **`"! warning indicator lines"`** instead of clinical callouts. |
| `public/images/atnr_retained_vs_integrated.jpg` | Header reads **`"ASYMMETRICAL TONI| NECK REFLEX) (ATNR)"`**; callouts read **`"Left opposite arm, collap side the vide"`**, **`"Opposite arm, Left downdown"`**, **`"Back tever, lenid, and flat spine"`**, and **`"stable pilla of support"`**. |
| `public/images/palmar_retained_vs_integrated.jpg` | Left middle label reads **`"Massage in Patient Writing"`** (garbled AI text for hand pain/cramping). |
| `public/images/plantar_retained_vs_integrated.jpg` | Header says **`"DIAGNOSTIC INFOGRAPHIC"`** and bottom-left badge reads **`"Shoes wearing unevenly specific cally at toe tips"`**. |
| `public/images/amphibian_retained_vs_integrated.jpg` | Header says **`"DIAGNOSTIC COMPARISON: AMPHIBIAN REFLEX"`** (contains `"DIAGNOSTIC"`). |
| `public/images/rooting_retained_vs_integrated.jpg` | Header says **`"DIAGNOSTIC COMPARISON: ROOTING & SUCKING REFLEXES"`** (contains `"DIAGNOSTIC"`). |

---

## 3. Prioritized Action Plan for Next Engineering & Image Generation Pass

1. **Fix the `"📷 Reflex Overview"` Detection Logic Immediately (`StepIllustration.tsx` & `PathwayHeroVisual.tsx`):**
   - Check `const isDedicatedStepPhoto = Boolean(sequenceImageUrl || (step.imageUrl && step.imageUrl !== fallbackImageUrl));` in `StepIllustration.tsx` so the button accurately reads **`"📷 Step Photo"`** on `moro_starfish` (and any pathway with `sequenceImageUrl` or dedicated step URLs) and **`"📷 Reflex Overview"`** on all fallback steps.
   - Add a subtle overlay pill on fallback photos (`"Reflex Overview Reference — Switch to 📐 Diagram for exact step posture"`) so users are never misled by a floor photo on an equipment or desk pathway.
2. **Align `moro_starfish` Steps (1–4) with `moro_transient_steps.jpg` Panels (1–4) & Wire Modal/Hero Quadrant Cropping:**
   - Add Step 1 (`"Centered Seated Setup"`) to `moro_starfish.transientSteps` in `reflexData.ts` so Steps 1, 2, 3, and 4 map 1-to-1 to Quadrants 1, 2, 3, and 4 of `moro_transient_steps.jpg`.
   - Render the cropped quadrant inside `StepIllustration.tsx`'s expanded modal and inside `PathwayHeroVisual.tsx` when `pathway.transientSequenceImageUrl` is defined.
3. **Regenerate the Corrupted / `"Diagnostic"`-Labeled Existing JPEGs:**
   - Regenerate `stnr_cat_cow.jpg`, `tlr_superman.jpg`, `atnr_retained_vs_integrated.jpg`, `landau_retained_vs_integrated.jpg`, `tlr_retained_vs_integrated.jpg`, `fear_paralysis_retained_vs_integrated.jpg`, `palmar_retained_vs_integrated.jpg`, and `plantar_retained_vs_integrated.jpg` with clean, spell-checked typography and `"HOME OBSERVATION GUIDE"` headers (no `"DIAGNOSTIC"`).
4. **Batch-Generate the Remaining 50 Pathway 2×2 Storyboard Sheets (`/images/pathways/<pathway_id>_sheet.jpg`):**
   - Use the complete **Visual Asset Manifest & Prompt Specification Table** in `VISUAL_MEDIA_AUDIT_FEEDBACK.md` (Section 4) to generate the 2×2 4-panel sequence sheets for each pathway and wire `transientSequenceImageUrl` across all 51 pathways in `src/data/reflexData.ts`. Once wired, `StepIllustration.tsx`'s quadrant cropper will automatically provide step-by-step photos for every pathway in the app!

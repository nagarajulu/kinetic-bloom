# KineticBloom — Round 6 Parent & Caregiver Advocate Evaluation: Pathway/Step Photo Authenticity & Launch Readiness

**Evaluated By:** Parent & Caregiver Advocate (Representing Families of Neurodivergent Children Across ASD Support Levels 1, 2, and 3)  
**Target Application:** KineticBloom (`http://localhost:3000/` | `/Users/naga.aerakoni/workspace/projects/kinetic-bloom`)  
**Evaluation Round:** Round 6 — Deep Audit of Pathway/Step Photo Mismatches, Visual Consistency for Parents & ASD Learners, and Launch Trust

---

## Executive Summary: Why the User's Observation Is 100% Spot-On

The user identified a critical visual authenticity gap across the app's **51 exercise pathways** and **204 transient steps**:
> *"Whatever image the main reflex uses, the same image is shown when we toggle to Photo in any of the pathways, which doesn't seem appropriate to me; why can't we generate new images for those resembling the main reflex image example along with what the pathway step says?"*

As a parent testing this on the living-room floor with an **ASD Level 2 visual-literal learner (Leo)** and an **ASD Level 3 non-speaking child (Sam)**, **this observation hits the nail on the head**:
1. **Why It Matters for Tired Parents (The 3-Second Trust Rule):** When Sam (ASD Level 3) is in a fragile sensory state, the app rightly defaults to **Pathway 2 (`assisted_passive` — Parent-Led Co-Regulation)** or **Pathway 3 (`equipment_sensory` — Peanut Ball / Spiky Roller)**. When a parent taps `[ 📷 Photo ]` to see *how* to position their hands or the therapy ball, seeing the solo floor exercise from Pathway 1 (`moro_starfish.jpg` or `tlr_superman.jpg`) creates instant confusion: *"Wait—the title says Peanut Ball Supine Extension, why is the photo showing a child flat on a puzzle mat?"*
2. **Why It Matters for ASD Level 2 & 3 Visual Learners (Literal Cognitive Mismatch):** Autistic children with literal visual processing (`cuePreference: 'literal_clear'` or `'hands_free_audio'`) rely on the screen image as a **visual contract**. If the parent says *"Let's do Seated Desk Fencer"* or *"Let's crawl into the Lycra Turtle Shell"* and shows the child the `[ 📷 Photo ]` tab, but the photo shows a child lying prone on a floor mat (`atnr_lizard.jpg` or `tlr_superman.jpg`), literal learners frequently reject the prompt (*"That's not a desk! That's not a turtle shell!"*).
3. **Why Step 1, Step 2, Step 3, and Step 4 Need Step-Specific Photo Progressions:** Currently, all 4 `<StepIllustration />` cards inside a pathway point to the **exact same single `.jpg` file**. When a parent toggles `[ 📷 Photo ]` on Step 1 (Setup), Step 2 (Begin), Step 3 (Hold), and Step 4 (Release), all 4 cards display the identical static image instead of the 4-step visual progression shown in `/public/images/moro_transient_steps.jpg`!

---

## Part 1: Complete Audit of Pathway & Step Photo Reuse in `src/data/reflexData.ts`

We programmatically audited `/public/images/` and all **51 pathways** across the **11 reflexes** in [`reflexData.ts`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/data/reflexData.ts):

### 1. Inventory of `/public/images/` vs. `reflexData.ts` Wiring
- There are **11 Reflexes** and **51 Exercise Pathways** (`11` primary pathways + `40` secondary adaptation pathways across `assisted_passive`, `isometric_resistance`, `rhythmic_movement`, `equipment_sensory`, `active_play`, and `classroom_desk`).
- Yet **all 51 pathways** and **all 204 `transientSteps`** are hardcoded to use only **11 reflex-level `.jpg` files**:
  1. `/images/fear_paralysis.jpg` (reused across all **5 FPR pathways** & 20 steps)
  2. `/images/moro_starfish.jpg` (reused across all **5 Moro pathways** & 20 steps)
  3. `/images/tlr_superman.jpg` (reused across all **5 TLR pathways** & 20 steps — *note: also contains a garbled AI subtitle typo `"ՈITLUR INTEGRATION"`*)
  4. `/images/landau_airplane.jpg` (reused across all **4 Landau pathways** & 16 steps)
  5. `/images/spinal_galant.jpg` (reused across all **5 Spinal Galant pathways** & 20 steps)
  6. `/images/amphibian_crawling.jpg` (reused across all **4 Amphibian pathways** & 16 steps)
  7. `/images/atnr_lizard.jpg` (reused across all **5 ATNR pathways** & 20 steps)
  8. `/images/stnr_cat_cow.jpg` (reused across all **5 STNR pathways** & 20 steps)
  9. `/images/palmar_hand.jpg` (reused across all **5 Palmar pathways** & 20 steps)
  10. `/images/plantar_exercise.jpg` (reused across all **4 Plantar/Babinski pathways** & 16 steps)
  11. `/images/rooting_exercise.jpg` (reused across all **4 Rooting pathways** & 16 steps)
- **Orphaned Gold-Standard Asset Found:** `/public/images/moro_transient_steps.jpg` is a gorgeous 4-panel illustrated step sequence (`1 SETUP & START` $\rightarrow$ `2 FETAL TUCK` $\rightarrow$ `3 TRANSIENT OPENING` $\rightarrow$ `4 FULL STARFISH HOLD`), and [`ReflexLibrary.tsx` L435](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/ReflexLibrary.tsx#L435) even has code to render `activePathway.transientSequenceImageUrl`—but `transientSequenceImageUrl` is **never set** anywhere in `reflexData.ts`!

### 2. Full Mismatch Matrix: The 40 Secondary Pathways Showing the Wrong Photo

| Reflex | Primary Pathway Photo (Currently Reused Everywhere) | Secondary Pathways Showing the Wrong Photo When Toggled to `[ 📷 Photo ]` |
| :--- | :--- | :--- |
| **1. Fear Paralysis (FPR)** | `/images/fear_paralysis.jpg` | • `fpr_passive`: Passive Weighted Burrow & Head-Heart Nesting (needs weighted blanket burrow + parent hand on head/heart)<br>• `fpr_isometric_heart`: Head-to-Heart Bilateral Cross Pressure (MNRI)<br>• `fpr_rhythmic_infant_rock`: Supine Rhythmic Foot Bouncing (BRMT 60 BPM)<br>• `fpr_desk_grounding`: Seated Butterfly Grounding & Desk Palmar Press (needs classroom desk posture) |
| **2. Moro Reflex** | `/images/moro_starfish.jpg` | • `moro_passive_repatterning`: Parent-Led Cross-Body Swaddle Hug (needs parent gently folding child's limbs)<br>• `moro_assisted_ball`: Peanut Ball Supine Extension & Roll (needs child draped supine over peanut ball)<br>• `moro_isometric_cross_press`: Cross-Limb Isometric Resistive Embrace (MNRI)<br>• `moro_desk_crab_shell`: Seated Crab-to-Shell Spinal Dissociation (needs seated chair posture) |
| **3. TLR** | `/images/tlr_superman.jpg` *(has `"ՈITLUR"` typo)* | • `tlr_passive_cradle_flexion`: Supported Cradle Flexion Roll (parent-assisted roll)<br>• `tlr_isometric_press`: Supine Occipital & Calcaneal Static Press (MNRI)<br>• `tlr_equipment_ball`: Therapy Ball Prone Rolling Reach & High-Five (needs therapy ball)<br>• `tlr_play_turtle`: Turtle Hiding in Lycra Tunnel Shell (needs Lycra sensory tunnel) |
| **4. Landau Reflex** | `/images/landau_airplane.jpg` | • `landau_passive_ball`: Peanut Ball Supported Prone Extension (needs peanut ball)<br>• `landau_isometric_scapular`: Prone Scapular & Gluteal Isometric Hold (MNRI)<br>• `landau_scooter_glide`: Prone Scooter Board Superman Gliding (needs 4-wheel scooter board) |
| **5. Spinal Galant** | `/images/spinal_galant.jpg` | • `galant_passive_trunk_crescent`: Side-Lying Passive Lumbar Crescent Stretch<br>• `galant_rhythmic_tail_wag`: Quadruped Pelvic Tail Wag (BRMT 60 BPM)<br>• `galant_isometric_trunk`: Lateral Trunk Isometric Resistance (MNRI)<br>• `galant_sensory_tunnel`: Army Belly Crawl Obstacle Tunnel (needs sensory crawl tunnel) |
| **6. Amphibian Reflex** | `/images/amphibian_crawling.jpg` | • `amphibian_passive_pelvic_glide`: Passive Pelvic Glide & Knee Flexion (parent guiding hip/knee)<br>• `amphibian_supine_cross`: Supine Cross-Lateral Amphibian Bicycle (supine elbow-to-knee)<br>• `amphibian_isometric_knee_drive`: Homolateral Knee-Drive Resistance (MNRI) |
| **7. ATNR** | `/images/atnr_lizard.jpg` | • `atnr_passive_fencer`: Supine Assisted Fencer Pose (parent rotating head & stabilizing shoulder)<br>• `atnr_standing_laser`: Standing Fencer Stance with Midline Visual Tracking (standing laser game)<br>• `atnr_isometric_fencer`: Dual-Limb Oppositional Isometric Press (MNRI)<br>• `atnr_desk_fencer`: Seated Desk Fencer Head Turn & Arm Glide (needs classroom desk) |
| **8. STNR** | `/images/stnr_cat_cow.jpg` | • `stnr_passive_lap_rocking`: Lap-Draped Passive Spinal Dissociation<br>• `stnr_bear_crab_walk`: Animal Walk Transitions Bear-to-Crab<br>• `stnr_isometric_quadruped`: Quadruped Cervical Static Resistance (MNRI)<br>• `stnr_desk_cat_cow`: Desk-Edge Cat-Cow & Chin Tuck Reset (needs classroom desk) |
| **9. Palmar Grasp** | `/images/palmar_hand.jpg` | • `palmar_babkin_acupressure`: Thenar Acupressure & Babkin Palmar Sweep<br>• `palmar_putty_treasure`: Therapy Putty Deep Treasure Excavation (needs yellow therapy putty with beads)<br>• `palmar_isometric_babkin`: Palmar-Babkin Jaw Synergy Dissociation (MNRI)<br>• `palmar_wall_push`: Palm-Flat Isometric Wall Pushups (child pressing palms flat on wall) |
| **10. Plantar & Babinski** | `/images/plantar_exercise.jpg` | • `plantar_passive_grounding`: Calcaneal Deep Pressure & Metatarsal Mobilization (parent cupping heel)<br>• `plantar_sensory_ball`: Spiky Foot Roller & Arch Desensitization (needs spiky sensory foot roller)<br>• `plantar_isometric_resistance`: Plantar Flexor & Calcaneal Static Hold (MNRI) |
| **11. Rooting & Sucking** | `/images/rooting_exercise.jpg` | • `rooting_passive_calming_stroke`: Bilateral Mandibular Calming Stroke<br>• `rooting_oral_straw_play`: Heavy Work Thick Smoothie Straw & Pinwheel Whistle (needs smoothie cup/straw & pinwheel)<br>• `rooting_isometric_cheek`: Lingual-Buccinator Static Resistance (MNRI) |

---

## Part 2: Parent & Child Visual Blueprint — How the New Pathway & Step Illustrations Should Work

To give parents and children a **100% coherent, confusion-free visual experience** whether they are viewing `📐 Diagram` or `📷 Photo`:

### 1. Match the Warm Storybook Aesthetic of `moro_transient_steps.jpg` & `moro_starfish.jpg`
- Look at `/public/images/moro_transient_steps.jpg` and `/public/images/moro_starfish.jpg`:
  - **Warm, calming pediatric OT illustration style** (soft teal/sage clothing, warm cream background, puzzle foam mat or cozy therapy room, calm facial expressions).
  - **Zero clinical coldness:** No scary medical skeletons or sterile hospital rooms.
  - **Clean, legible English labels (or label-free with UI overlays):** Avoid AI-hallucinated gibberish text like `"ՈITLUR INTEGRATION"` in `tlr_superman.jpg`.

### 2. Generate Dedicated 4-Panel Step Progression Sheets (`1 Setup -> 2 Begin -> 3 Transient -> 4 Finish`) + Quadrant Step Cropping!
- Look at how `moro_transient_steps.jpg` is structured as a **2×2 4-Panel Grid**:
  - **Top-Left (Panel 1):** Step 1 — Setup & Start Position
  - **Top-Right (Panel 2):** Step 2 — Initial Movement Phase
  - **Bottom-Left (Panel 3):** Step 3 — Transient / Peak Hold Phase
  - **Bottom-Right (Panel 4):** Step 4 — Finish & Integration Phase
- **Genius Engineering + UX Synergy:**
  1. When a pathway has a **2×2 4-panel composite illustration** (`transientSequenceImageUrl` / `imageUrl`), `PathwayHeroVisual.tsx` (in `📷 Photo` mode) and `ReflexLibrary.tsx` (Tab 2: `Setup & Transient Steps`) can display the full 4-panel sequence OR zoom into the active step's panel!
  2. Even better, in [`StepIllustration.tsx`](file:///Users/naga.aerakoni/workspace/projects/kinetic-bloom/src/components/StepIllustration.tsx), when a parent toggles `[ 📷 Photo ]` on **Step 1, Step 2, Step 3, or Step 4**, if the image is a 2×2 4-panel sheet (or if each step has its own `step.imageUrl` / quadrant crop), **Step 1 shows Panel 1, Step 2 shows Panel 2, Step 3 shows Panel 3, and Step 4 shows Panel 4**!
  3. That means a parent or child toggling `[ 📷 Photo ]` on Step 1 vs. Step 2 vs. Step 3 vs. Step 4 will **never again see the same static image repeated 4 times**—each step card will visually show that exact step's posture!

### 3. Crucial Parent-Advocate Requirement for ASD Level 3 (`assisted_passive` & `isometric_resistance`): Show the Parent's Helping Hands!
- For families of children with **ASD Level 3 / Extensive Hands-On Support (Sam)**, the whole point of `assisted_passive` and `isometric_resistance` pathways is **co-regulation with a caregiver**.
- Every `assisted_passive` and `isometric_resistance` illustration MUST show **warm, gentle caregiver hands** supporting the child (e.g., wrapping the weighted blanket burrow, cradling the occiput and sacrum, cupping the calcaneus heel, or providing gentle 20% isometric counter-pressure).

---

## Part 3: Additional Parent-Facing Launch & Trust Polish Items

While the engineering team updates the pathway and step visual assets, here are **3 quick parent-facing polish items** to ensure complete launch readiness:

1. **Wire `transientSequenceImageUrl` in `reflexData.ts`:**
   - `ReflexLibrary.tsx` (L435–448) already has a dedicated UI block in Tab 2 (`Setup & Transient Steps`) to render `activePathway.transientSequenceImageUrl`, but no pathway in `reflexData.ts` currently populates that field (not even `moro_starfish` with `/images/moro_transient_steps.jpg`). Populate `transientSequenceImageUrl` across the pathways so Tab 2 shines!
2. **Fix the Garbled AI Text in `/public/images/tlr_superman.jpg`:**
   - Replace or regenerate `tlr_superman.jpg` so the header does not read `"ՈITLUR INTEGRATION"`.
3. **Clarify "Local Preview" on the Google Sign-In Button in `ProfileModal.tsx` (L557):**
   - When signed out, the button at `ProfileModal.tsx` L557 currently says `"Sign in with Google to Sync & Backup"`, which triggers `simulateGoogleSignIn()` (`Caregiver & Pediatric OT (Local Preview)`). Changing the button label to `"Simulate Cloud Account (Local Preview — Use Export Backup Below for Cross-Device Transfer)"` ensures parents don't mistakenly rely on a simulated button instead of clicking `Export Backup` when moving from their phone to their iPad.

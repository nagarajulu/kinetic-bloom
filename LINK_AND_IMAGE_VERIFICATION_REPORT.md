# KineticBloom: Exhaustive Link, Video & Image Asset Verification Audit Report

**Date of Audit:** October 18, 2026  
**Auditor:** Link & Image Verification Specialist Agent  
**Target Application:** KineticBloom (Pediatric Primitive Reflex Integration & Co-Regulation Platform)  
**Verification Scope:** All 11 Primitive Reflexes, 51 Therapeutic Pathways, Biomechanical SVG Vector Engine (`head_turn_lizard`, `sole_calcaneal_glide`), 22 Canonical Medical Image Assets, 22 Primary & Assessment Video Embeds, 4 Landmark Research DOIs, and Live Production Preview at `http://localhost:3000/`.

---

## 1. Executive Summary & Verification Metrics

An exhaustive, zero-assumption verification audit was conducted across the updated KineticBloom web platform. Every single YouTube video embed was tested directly against the YouTube oEmbed API (`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v={ID}&format=json`), all 22 canonical image files were verified in both `public/images/` and `dist/images/` and tested via live HTTP requests, the biomechanical SVG vector diagrams (`head_turn_lizard` and `sole_calcaneal_glide`) were parsed and validated as strict XML across all 4 movement phases, the production build and oxlint linter were validated for 0 compilation errors, and headless Google Chrome connected via the Chrome DevTools Protocol (CDP) verified zero runtime exceptions and console errors on the live server.

### Key Verification Metrics
| Audit Category | Metric Target | Result | Pass Rate | Status |
|---|---|---|---|---|
| **Primitive Reflexes Audited** | 11 Clinical Reflexes | 11 / 11 Audited | 100% | **PASS** |
| **Therapeutic Pathways Audited** | 51 Multi-Modal Pathways | 51 / 51 Audited | 100% | **PASS** |
| **Canonical Images (`public/images/` & `dist/images/`)** | 22 Medical Illustrations | 22 / 22 Present & Non-Empty (>350KB) | 100% | **PASS** |
| **Image HTTP Serving (`localhost:3000/images/`)** | 22 Live HTTP Requests | 22 / 22 HTTP 200 OK (Content-Length match) | 100% | **PASS** |
| **Image Resolution & Format** | Uniform 1200x896 JPEG | 22 / 22 Exact 1200x896 RGB JPEG | 100% | **PASS** |
| **Primary Video Embeds (oEmbed 200)** | 11 Primary Videos | 11 / 11 Verified (HTTP 200 OK) | 100% | **PASS** |
| **Assessment Video Embeds (oEmbed 200)** | 11 Assessment Videos | 11 / 11 Verified (HTTP 200 OK) | 100% | **PASS** |
| **YouTube Channel Authorship** | Harkla Clinical Channel | 100% Harkla Family (@HarklaFamily) | 100% | **PASS** |
| **Pediatric OT SVG Vector Diagrams** | `head_turn_lizard` & `sole_calcaneal_glide` | 8 / 8 Phase Permutations Valid XML | 100% | **PASS** |
| **Peer-Reviewed Paper DOIs (CrossRef)** | 4 Landmark Papers | 4 / 4 Authentic & Active | 100% | **PASS** |
| **Production Build (`npm run build`)** | `tsc -b && vite build` | 0 Errors (Completed in 156ms) | 100% | **PASS** |
| **Linter Diagnostic (`oxlint`)** | 0 Linting Errors | 0 Errors across 17 files | 100% | **PASS** |
| **Live DOM Initialization (Headless Chrome)** | `http://localhost:3000/` | Full DOM Tree Rendered | 100% | **PASS** |
| **Live Runtime Console Errors (CDP)** | Zero Exceptions / Errors | 0 Console Errors, 0 Uncaught Exceptions | 100% | **PASS** |

---

## 2. Canonical High-Resolution Image Asset Verification Matrix

Every primitive reflex in KineticBloom features both a **dedicated, high-definition primary exercise guide** and a **dedicated diagnostic Retained vs Integrated comparison chart**. All 22 image files exist in both `public/images/` and the production bundle `dist/images/`.

All 22 files were inspected with Python PIL/Pillow for image integrity and format, and queried against `http://localhost:3000/images/{filename}` to verify live server delivery:

| Reflex | Purpose | Image Filename | Public Size | Dist Size | Dimensions | Format | HTTP Status | Server Content-Length | Result |
|---|---|---|---|---|---|---|---|---|---|
| **Fear Paralysis (FPR)** | Primary Guide | `fear_paralysis.jpg` | 801 KB | 801 KB | 1200x896 | JPEG (RGB) | **200 OK** | 820,823 B | **PASS** |
| **Fear Paralysis (FPR)** | Comparison Chart | `fear_paralysis_retained_vs_integrated.jpg` | 654 KB | 654 KB | 1200x896 | JPEG (RGB) | **200 OK** | 670,374 B | **PASS** |
| **Moro Reflex** | Primary Guide | `moro_starfish.jpg` | 616 KB | 616 KB | 1200x896 | JPEG (RGB) | **200 OK** | 631,309 B | **PASS** |
| **Moro Reflex** | Comparison Chart | `moro_retained_vs_integrated.jpg` | 527 KB | 527 KB | 1200x896 | JPEG (RGB) | **200 OK** | 540,427 B | **PASS** |
| **Tonic Labyrinthine (TLR)** | Primary Guide | `tlr_superman.jpg` | 618 KB | 618 KB | 1200x896 | JPEG (RGB) | **200 OK** | 633,220 B | **PASS** |
| **Tonic Labyrinthine (TLR)** | Comparison Chart | `tlr_retained_vs_integrated.jpg` | 647 KB | 647 KB | 1200x896 | JPEG (RGB) | **200 OK** | 663,174 B | **PASS** |
| **Landau Reflex** | Primary Guide | `landau_airplane.jpg` | 797 KB | 797 KB | 1200x896 | JPEG (RGB) | **200 OK** | 816,942 B | **PASS** |
| **Landau Reflex** | Comparison Chart | `landau_retained_vs_integrated.jpg` | 683 KB | 683 KB | 1200x896 | JPEG (RGB) | **200 OK** | 699,654 B | **PASS** |
| **Spinal Galant** | Primary Guide | `spinal_galant.jpg` | 586 KB | 586 KB | 1200x896 | JPEG (RGB) | **200 OK** | 600,395 B | **PASS** |
| **Spinal Galant** | Comparison Chart | `spinal_galant_retained_vs_integrated.jpg` | 667 KB | 667 KB | 1200x896 | JPEG (RGB) | **200 OK** | 683,610 B | **PASS** |
| **Amphibian Reflex** | Primary Guide | `amphibian_crawling.jpg` | 526 KB | 526 KB | 1200x896 | JPEG (RGB) | **200 OK** | 539,642 B | **PASS** |
| **Amphibian Reflex** | Comparison Chart | `amphibian_retained_vs_integrated.jpg` | 651 KB | 651 KB | 1200x896 | JPEG (RGB) | **200 OK** | 667,252 B | **PASS** |
| **ATNR (Fencing)** | Primary Guide | `atnr_lizard.jpg` | 593 KB | 593 KB | 1200x896 | JPEG (RGB) | **200 OK** | 607,751 B | **PASS** |
| **ATNR (Fencing)** | Comparison Chart | `atnr_retained_vs_integrated.jpg` | 487 KB | 487 KB | 1200x896 | JPEG (RGB) | **200 OK** | 499,621 B | **PASS** |
| **STNR (Cat-Cow)** | Primary Guide | `stnr_cat_cow.jpg` | 622 KB | 622 KB | 1200x896 | JPEG (RGB) | **200 OK** | 637,555 B | **PASS** |
| **STNR (Cat-Cow)** | Comparison Chart | `stnr_retained_vs_integrated.jpg` | 353 KB | 353 KB | 1200x896 | JPEG (RGB) | **200 OK** | 362,178 B | **PASS** |
| **Palmar Grasp** | Primary Guide | `palmar_hand.jpg` | 681 KB | 681 KB | 1200x896 | JPEG (RGB) | **200 OK** | 697,439 B | **PASS** |
| **Palmar Grasp** | Comparison Chart | `palmar_retained_vs_integrated.jpg` | 692 KB | 692 KB | 1200x896 | JPEG (RGB) | **200 OK** | 709,190 B | **PASS** |
| **Plantar & Babinski** | Primary Guide | `plantar_exercise.jpg` | 424 KB | 424 KB | 1200x896 | JPEG (RGB) | **200 OK** | 434,202 B | **PASS** |
| **Plantar & Babinski** | Comparison Chart | `plantar_retained_vs_integrated.jpg` | 688 KB | 688 KB | 1200x896 | JPEG (RGB) | **200 OK** | 705,047 B | **PASS** |
| **Rooting & Sucking** | Primary Guide | `rooting_exercise.jpg` | 604 KB | 604 KB | 1200x896 | JPEG (RGB) | **200 OK** | 619,458 B | **PASS** |
| **Rooting & Sucking** | Comparison Chart | `rooting_retained_vs_integrated.jpg` | 688 KB | 688 KB | 1200x896 | JPEG (RGB) | **200 OK** | 705,125 B | **PASS** |

*Summary:* **22/22 (100%)** image files verified. Zero broken paths, zero empty or corrupt images, 100% HTTP 200 responses.

---

## 3. Video Embed & YouTube oEmbed Verification Matrix

All 22 video entries (11 diagnostic assessments and 11 primary exercise pathways) in `src/data/reflexData.ts` were queried against the YouTube oEmbed API (`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v={ID}&format=json`).

**100% of video IDs** returned **HTTP 200 OK**, represent active playable videos, and originate from Harkla's verified pediatric occupational therapy channel (`https://www.youtube.com/@HarklaFamily`).

| Reflex ID & Name | Role | Video ID | Verified Video Title | Channel / Author | oEmbed Status | Playable | Target URL & Cued Timestamp |
|---|---|---|---|---|---|---|---|
| **`fpr`** (Fear Paralysis) | Primary | `sP8IBcpFRpM` | Why They Shut Down (How a Retained Fear Paralysis Reflex Impacts Kids!) | Harkla | **200 OK** | Yes | `https://www.youtube.com/watch?v=sP8IBcpFRpM` |
| **`fpr`** (Fear Paralysis) | Assessment | `ZkGDm3t2hb8` | How to Assess Retained Primitive Reflexes - 6 Most Common Ones | Harkla | **200 OK** | Yes | `https://www.youtube.com/watch?v=ZkGDm3t2hb8` (Overview) |
| **`moro`** (Moro Reflex) | Primary | `WFWW1fr3dlw` | What is the Moro Reflex? Signs, Symptoms & Integration Explained | Harkla | **200 OK** | Yes | `https://www.youtube.com/watch?v=WFWW1fr3dlw` |
| **`moro`** (Moro Reflex) | Assessment | `ZkGDm3t2hb8` | How to Assess Retained Primitive Reflexes - 6 Most Common Ones | Harkla | **200 OK** | Yes | `https://www.youtube.com/watch?v=ZkGDm3t2hb8&t=169s` (2:49) |
| **`tlr`** (Tonic Labyrinthine) | Primary | `xDkduQyZsQg` | TLR vs. Landau Reflex Explained: Signs, Testing & Activities | Harkla | **200 OK** | Yes | `https://www.youtube.com/watch?v=xDkduQyZsQg` |
| **`tlr`** (Tonic Labyrinthine) | Assessment | `ZkGDm3t2hb8` | How to Assess Retained Primitive Reflexes - 6 Most Common Ones | Harkla | **200 OK** | Yes | `https://www.youtube.com/watch?v=ZkGDm3t2hb8&t=302s` (5:02) |
| **`landau`** (Landau Reflex) | Primary | `xDkduQyZsQg` | TLR vs. Landau Reflex Explained: Signs, Testing & Activities | Harkla | **200 OK** | Yes | `https://www.youtube.com/watch?v=xDkduQyZsQg` |
| **`landau`** (Landau Reflex) | Assessment | `xDkduQyZsQg` | TLR vs. Landau Reflex Explained: Signs, Testing & Activities | Harkla | **200 OK** | Yes | `https://www.youtube.com/watch?v=xDkduQyZsQg` |
| **`spinal_galant`** | Primary | `hopxSwLLSWI` | Spinal Galant Reflex Explained \| Primitive Reflexes in Babies & Children | Harkla | **200 OK** | Yes | `https://www.youtube.com/watch?v=hopxSwLLSWI` |
| **`spinal_galant`** | Assessment | `ZkGDm3t2hb8` | How to Assess Retained Primitive Reflexes - 6 Most Common Ones | Harkla | **200 OK** | Yes | `https://www.youtube.com/watch?v=ZkGDm3t2hb8&t=227s` (3:47) |
| **`amphibian`** (Amphibian) | Primary | `7oOSBuzGUys` | Primitive Reflex Integration: Play-Based Strategies | Harkla | **200 OK** | Yes | `https://www.youtube.com/watch?v=7oOSBuzGUys` |
| **`amphibian`** (Amphibian) | Assessment | `7oOSBuzGUys` | Primitive Reflex Integration: Play-Based Strategies | Harkla | **200 OK** | Yes | `https://www.youtube.com/watch?v=7oOSBuzGUys` |
| **`atnr`** (Asymmetrical Tonic) | Primary | `DQQFcN72gno` | What is the Asymmetrical Tonic Neck Reflex (ATNR)? | Harkla | **200 OK** | Yes | `https://www.youtube.com/watch?v=DQQFcN72gno` |
| **`atnr`** (Asymmetrical Tonic) | Assessment | `ZkGDm3t2hb8` | How to Assess Retained Primitive Reflexes - 6 Most Common Ones | Harkla | **200 OK** | Yes | `https://www.youtube.com/watch?v=ZkGDm3t2hb8&t=24s` (0:24) |
| **`stnr`** (Symmetrical Tonic) | Primary | `hgg3TRqb7TM` | What is the STNR Reflex? \| Primitive Reflexes Explained | Harkla | **200 OK** | Yes | `https://www.youtube.com/watch?v=hgg3TRqb7TM` |
| **`stnr`** (Symmetrical Tonic) | Assessment | `ZkGDm3t2hb8` | How to Assess Retained Primitive Reflexes - 6 Most Common Ones | Harkla | **200 OK** | Yes | `https://www.youtube.com/watch?v=ZkGDm3t2hb8&t=91s` (1:31) |
| **`palmar`** (Palmar Grasp) | Primary | `XS2nM_suVTc` | What Is the Palmer Grasp Reflex? Signs, Retention & OT Activities | Harkla | **200 OK** | Yes | `https://www.youtube.com/watch?v=XS2nM_suVTc` |
| **`palmar`** (Palmar Grasp) | Assessment | `ZkGDm3t2hb8` | How to Assess Retained Primitive Reflexes - 6 Most Common Ones | Harkla | **200 OK** | Yes | `https://www.youtube.com/watch?v=ZkGDm3t2hb8&t=381s` (6:21) |
| **`plantar_babinski`** | Primary | `t2luajmBIyc` | Why Your Child's Feet Are So Sensitive (Babinski Reflex) | Harkla | **200 OK** | Yes | `https://www.youtube.com/watch?v=t2luajmBIyc` |
| **`plantar_babinski`** | Assessment | `t2luajmBIyc` | Why Your Child's Feet Are So Sensitive (Babinski Reflex) | Harkla | **200 OK** | Yes | `https://www.youtube.com/watch?v=t2luajmBIyc` |
| **`rooting`** (Rooting/Sucking) | Primary | `iXOEAnEJD48` | What Is the Rooting Reflex? \| Signs, Timing & OT Tips | Harkla | **200 OK** | Yes | `https://www.youtube.com/watch?v=iXOEAnEJD48` |
| **`rooting`** (Rooting/Sucking) | Assessment | `iXOEAnEJD48` | What Is the Rooting Reflex? \| Signs, Timing & OT Tips | Harkla | **200 OK** | Yes | `https://www.youtube.com/watch?v=iXOEAnEJD48` |

---

## 4. Biomechanical SVG Vector Engine Syntax & XML Validation

The updated SVG diagrams in `src/components/PediatricOtDiagrams.tsx` (`head_turn_lizard` and `sole_calcaneal_glide`) were dynamically rendered to string using `react-dom/server` across all 4 movement phases (`setup`, `begin`, `transient`, `finish`) and validated using Python's `xml.etree.ElementTree` parser for strict XML syntax:

```
Testing PediatricOtDiagrams.tsx rendered SVG trees across all phases:
✅ head_turn_lizard [setup]     : tag=svg | viewBox="0 0 200 130" | 19 XML nodes | Valid XML
✅ head_turn_lizard [begin]     : tag=svg | viewBox="0 0 200 130" | 19 XML nodes | Valid XML
✅ head_turn_lizard [transient] : tag=svg | viewBox="0 0 200 130" | 16 XML nodes | Valid XML
✅ head_turn_lizard [finish]    : tag=svg | viewBox="0 0 200 130" | 25 XML nodes | Valid XML
✅ sole_calcaneal_glide [setup] : tag=svg | viewBox="0 0 200 130" | 26 XML nodes | Valid XML
✅ sole_calcaneal_glide [begin] : tag=svg | viewBox="0 0 200 130" | 26 XML nodes | Valid XML
✅ sole_calcaneal_glide [trans] : tag=svg | viewBox="0 0 200 130" | 26 XML nodes | Valid XML
✅ sole_calcaneal_glide [finish]: tag=svg | viewBox="0 0 200 130" | 26 XML nodes | Valid XML
```

### Detailed Diagram Highlights:
1. **`head_turn_lizard` (ATNR Homolateral Prone Crawl):**
   - Precise 90° face-side elbow and knee flexion arcs with degree indicators.
   - Distinct skull-side limb extension with "Palm Up" biomechanical cue and grounding vector.
   - Occiput head guide caregiver hand overlay during `setup` phase.
   - Compensation pins and alignment badges during `finish` phase.
   - Zero closing tag mismatches, valid viewBox `0 0 200 130`.

2. **`sole_calcaneal_glide` (Plantar & Babinski Calcaneal Cup & Grounding Glide):**
   - Anatomical foot sole contour with relaxed non-fanning plantar toes (preventing Babinski flare).
   - Downward metatarsal-to-heel stroke vector with arrow indicators (counter-Babinski pathway).
   - Kidney 1 acupressure point arch pressure zone ring.
   - Deep calcaneal heel cup caregiver support hand.
   - Zero closing tag mismatches, valid viewBox `0 0 200 130`.

---

## 5. Peer-Reviewed Literature & DOI Verification Matrix

All 4 academic research references in `src/data/referencesData.ts` were queried against the official CrossRef API (`https://api.crossref.org/works/{doi}`):

| Reference ID | Peer-Reviewed Article Title | Authors | Journal & Year | Reflex Focus | Registered DOI | Resolution Target | CrossRef Status |
|---|---|---|---|---|---|---|---|
| `mcphillips_lancet_2000` | Effects of replicating primary-reflex movements on specific reading difficulties in children: a randomised, double-blind, controlled trial | McPhillips, M., Hepper, P. G., & Mulhern, G. | *The Lancet*, 355(9203): 537–541 (2000) | ATNR | `10.1016/S0140-6736(99)02179-0` | Elsevier ScienceDirect | **200 OK** |
| `goddard_bjot_1998` | Screening for Neurological Dysfunction in the Specific Learning Difficulty Child | Goddard Blythe, S. & Hyland, D. | *British Journal of Occupational Therapy*, 61(10): 459–464 (1998) | ATNR, STNR, TLR, Moro | `10.1177/030802269806101008` | SAGE Journals | **200 OK** |
| `gieysztor_aoms_2018` | Persistence of primitive reflexes and associated motor problems in healthy preschool children | Gieysztor, E. Z., Choińska, A. M., & Paprocka-Borowicz, M. | *Archives of Medical Science*, 14(1): 167–173 (2018) | ATNR, STNR, TLR, Spinal Galant | `10.5114/aoms.2016.60503` | Termedia / PMC | **200 OK** |
| `konicarova_ndt_2013` | Persisting primitive reflexes in medication-naïve girls with attention-deficit and hyperactivity disorder | Konicarova, J. & Bob, P. | *Neuropsychiatric Disease and Treatment*, 9: 1457–1461 (2013) | Moro, ATNR, Spinal Galant | `10.2147/NDT.S49343` | Dove Medical Press | **200 OK** |

---

## 6. Production Compilation & Linting Diagnostics

### 1. TypeScript & Vite Production Build
```bash
$ npm run build
> kinetic-bloom@0.0.0 build
> tsc -b && vite build

vite v8.3.4 building client environment for production...
✓ 1935 modules transformed.
dist/index.html                   0.46 kB │ gzip:   0.29 kB
dist/assets/index-BortWyMo.css   59.30 kB │ gzip:  10.42 kB
dist/assets/index-CjUT46kj.js   620.39 kB │ gzip: 168.86 kB
✓ built in 156ms
```
- **Exit Code:** `0` (Clean compilation)
- **TypeScript Errors:** `0`
- **Build Duration:** 156ms

### 2. Oxlint Diagnostics
```bash
$ npm run lint
> kinetic-bloom@0.0.0 lint
> oxlint

Finished in 25ms on 17 files with 116 rules using 10 threads.
Found 5 warnings and 0 errors.
```
- **Exit Code:** `0` (Zero errors)
- **Errors Count:** `0` across all 17 project files.

---

## 7. Live Application Health & Chrome DevTools Protocol Audit

A headless Google Chrome instance was launched and attached to `http://localhost:3000/` via Chrome DevTools Protocol (CDP) on port 9223:

1. **HTTP Status Code:** `HTTP/1.1 200 OK`
2. **Production Asset Serving:**
   - HTML root: `200 OK`
   - CSS bundle (`index-BortWyMo.css`): `200 OK` (59.30 kB)
   - JavaScript bundle (`index-CjUT46kj.js`): `200 OK` (620.39 kB)
   - 22 Canonical images (`/images/*.jpg`): `200 OK` (Content-Length matching disk files)
3. **CDP Event Logging:**
   - `Runtime.exceptionThrown`: **0 occurrences**
   - `Runtime.consoleAPICalled` (level: error): **0 occurrences**
   - `Log.entryAdded` (level: error): **0 occurrences**
4. **DOM Tree Initialization:**
   - Navigation header rendered with live Profile / Sensory Mode controls.
   - Quick Start 3-Step Guide rendered.
   - Sensory Zone check-in cards (Red, Yellow, Green, Blue) rendered.
   - Circuit Runner and Library tabs functional.
   - Clinical and legal disclaimers present.

---

## 8. Verification Audit Conclusion

The updated KineticBloom application passes **100% of all link, video, diagram, and image verification checks**:
- **Images:** All 22 canonical medical illustrations exist in both `public/` and `dist/`, exceed 350KB, and return HTTP 200 OK.
- **Videos:** All 22 primary and assessment video embeds return HTTP 200 OK via YouTube's oEmbed API and link directly to Harkla's verified pediatric clinical channel.
- **Biomechanical Diagrams:** `head_turn_lizard` and `sole_calcaneal_glide` render without SVG syntax errors and validate as clean XML across all 4 movement phases.
- **Build & Quality:** Production build completes with 0 errors in 156ms, oxlint reports 0 errors, and live browser execution demonstrates zero console errors.

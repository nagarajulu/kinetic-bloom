# 🌱 KineticBloom
### 10-Minute Home Movement & Primitive Reflex Co-Regulation Companion

[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-61dafb.svg?logo=react&logoColor=black)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4.3-38bdf8.svg?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646cff.svg?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Privacy](https://img.shields.io/badge/Privacy-100%25%20Zero--PII-emerald.svg)](https://kineticbloom.org)
[![Accessibility](https://img.shields.io/badge/Accessibility-WCAG%202.2%20AA-purple.svg)](https://www.w3.org/WAI/WCAG22/quickref/)

**KineticBloom** is a privacy-first, offline-capable progressive web application created for parents, caregivers, and pediatric occupational therapists. It provides guided, gentle 10-minute daily movement circuits to support the integration of retained primitive reflexes and foster autonomic nervous system co-regulation in neurodivergent children (Autism Levels 1–3, ADHD, Sensory Processing Differences, and developmental dyspraxia).

---

## 🌟 Key Features

- **11 Primitive Reflexes & 51 Evidence-Based Pathways:**
  - Comprehensive clinical coverage of Moro, ATNR, STNR, TLR, Spinal Galant, Palmar Grasp, Plantar, Fear Paralysis (FPR), Landau, Amphibian, and Rooting & Sucking.
  - Multi-tier integration modalities: Active Dynamic, Passive Co-Regulation, Isometric Resistance, Rhythmic RMT, Sensory Gym Equipment, and Classroom/Desk Resets.
- **Biomechanical Step-by-Step Visual Guidance:**
  - Dedicated anatomical posture illustrations for setup, movement execution, and integration finishes.
  - Interactive 2×2 quadrant zoom cropper for granular inspection of motor trajectories and compensation red flags.
- **10-Minute Interactive Circuit Runner:**
  - Visual 3-card daily routine tailored to your child's autonomic energy state (Overload, Revved-Up, Anchored, or Low-Battery).
  - Soothing 432 Hz interval chimes, gentle metronome pacing, and customizable "First–Then" visual motivators.
- **Zero-PII & COPPA-Compliant Local Storage:**
  - 100% private to your browser. No account registration, no remote server data collection, and no tracking cookies.
  - Full portable JSON Export & Import: easily back up progress or transfer records between an iPad and desktop without cloud dependencies.
- **Accessibility & Sensory Sensitivity First:**
  - Built-in **Calm Dark Sensory Mode** for sensory-defensive children.
  - Full WCAG 2.2 AA compliance, keyboard navigability, high-contrast typography, and reduced-motion support.

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v20+ recommended)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/nagarajulu/kinetic-bloom.git
cd kinetic-bloom

# Install dependencies
npm install

# Start the local development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Scripts
| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts Vite HMR dev server on port `3000` |
| `npm run build` | Compiles TypeScript and builds optimized production assets in `dist/` |
| `npm run lint` | Runs Oxlint linter across all source files |
| `npm test` | Runs Node.js test suite for local storage and streak logic |
| `npm run preview` | Serves the production build locally for verification |

---

## 🧱 Architecture & Tech Stack

- **Framework:** React 19 (Functional components, custom hooks)
- **Language:** TypeScript 6.0 (Strict mode, zero `any` types in core domain)
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Icons & Visuals:** `lucide-react`, high-definition SVG & pediatric anatomical photography
- **Build Tooling:** Vite 8 with Rolldown bundle splitting (52 kB entry chunk)
- **Audio Synthesis:** Web Audio API (Synthesized 432 Hz pure sine-wave chimes, zero external MP3 dependencies)

---

## 🔒 Privacy & Clinical Disclaimer

**Notice for Caregivers, Clinicians & Educators:**
- KineticBloom is an educational wellness tool designed to support home movement routines and parent-child co-regulation. It is **not** a Medical Device (SaMD) and does not provide clinical diagnoses, medical prognoses, or replace professional physical therapy, occupational therapy, or medical evaluation.
- All session logs, observations, and child aliases remain strictly on the parent's local machine in browser `localStorage`. KineticBloom does not transmit or store Protected Health Information (PHI) or student education records.

---

## 📄 License
MIT License. Created with ❤️ for special-needs families and pediatric practitioners everywhere.

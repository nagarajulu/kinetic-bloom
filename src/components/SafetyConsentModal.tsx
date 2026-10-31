import { useState } from 'react';
import { ShieldAlert, Check, AlertTriangle, HeartHandshake } from 'lucide-react';
import { saveSafetyConsent } from '../utils/storage';

interface SafetyConsentModalProps {
  isOpen: boolean;
  onConsent: () => void;
}

export const SafetyConsentModal = ({ isOpen, onConsent }: SafetyConsentModalProps) => {
  const [checkContraindications, setCheckContraindications] = useState(false);
  const [checkNonMedical, setCheckNonMedical] = useState(false);
  const [checkAdultAge, setCheckAdultAge] = useState(false);

  if (!isOpen) return null;

  const isAllChecked = checkContraindications && checkNonMedical && checkAdultAge;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAllChecked) return;

    saveSafetyConsent({
      consented: true,
      version: '1.0.0',
      timestamp: Date.now(),
      acknowledgedContraindications: true,
      acknowledgedNonMedicalNature: true,
      acknowledgedParentalAge18Plus: true,
    });

    onConsent();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="safety-consent-title"
    >
      <div className="bg-white rounded-3xl max-w-xl w-full p-5 sm:p-7 space-y-5 shadow-2xl relative my-8 border border-slate-200">
        {/* Header */}
        <div className="flex items-start gap-3 border-b border-slate-100 pb-3">
          <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200">
            <ShieldAlert className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <span className="text-[10px] font-bold tracking-wider uppercase text-amber-700 bg-amber-100/60 px-2 py-0.5 rounded-full border border-amber-200">
              Required Caregiver Attestation
            </span>
            <h2 id="safety-consent-title" className="font-extrabold text-lg sm:text-xl text-slate-900 mt-1">
              Safety, Contraindications & Medical Notice
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Please review these critical physical safety guardrails before starting movement exercises.
            </p>
          </div>
        </div>

        {/* Clinical Contraindication Warnings */}
        <div className="space-y-3 text-xs">
          <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl space-y-2 text-rose-950">
            <div className="flex items-center gap-2 font-bold text-rose-900">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>Mandatory Physical Contraindication Warnings:</span>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-[11px] text-rose-900/90 leading-relaxed">
              <li>
                <strong>Cervical / Atlantoaxial Instability (AAI):</strong> Do NOT perform neck rotation (ATNR), neck flexion/extension (STNR/TLR), or backward tilt checks if your child has Down Syndrome (Trisomy 21) without physician AAI X-ray clearance, or if your child has a cervical fusion, VP shunt, or recent concussion.
              </li>
              <li>
                <strong>Seizure & Vestibular Disorders:</strong> Consult your pediatric neurologist before using 60 BPM rhythmic rocking or vestibular tilt exercises if your child has a history of epilepsy or autonomic seizures.
              </li>
              <li>
                <strong>Prone & G-Tube Safety:</strong> Do NOT place children with G-tubes, feeding buttons, or severe GERD flat on their stomachs without physician guidance.
              </li>
              <li>
                <strong>Weighted Blanket Safety (AAP Standard):</strong> Weighted blankets must never exceed 10% of the child's body weight, must never cover head or neck, and child must be capable of removing it independently.
              </li>
            </ul>
          </div>

          <div className="p-3 bg-teal-50 border border-teal-200 rounded-2xl flex items-start gap-2.5 text-xs text-teal-950">
            <HeartHandshake className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
            <div className="text-[11px] text-teal-900 leading-relaxed">
              <strong>Pain-Free & Voluntary Movement Rule:</strong> All exercises must be 100% voluntary and pain-free. Never force a limb past physical resistance. If your child exhibits distress, sudden pallor, or dizziness, stop immediately.
            </div>
          </div>
        </div>

        {/* Attestation Form */}
        <form onSubmit={handleSubmit} className="space-y-3 pt-2 border-t border-slate-100 text-xs">
          <label className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-200">
            <input
              type="checkbox"
              checked={checkContraindications}
              onChange={(e) => setCheckContraindications(e.target.checked)}
              className="mt-0.5 rounded text-teal-600 focus:ring-teal-500 w-4 h-4 shrink-0 cursor-pointer"
            />
            <span className="text-[11px] text-slate-700 leading-relaxed">
              I have read the physical contraindications (AAI/Down Syndrome, VP shunt, seizure precautions, G-tube, and &le;10% weighted blanket limit) and confirm these exercises are safe for my child.
            </span>
          </label>

          <label className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-200">
            <input
              type="checkbox"
              checked={checkNonMedical}
              onChange={(e) => setCheckNonMedical(e.target.checked)}
              className="mt-0.5 rounded text-teal-600 focus:ring-teal-500 w-4 h-4 shrink-0 cursor-pointer"
            />
            <span className="text-[11px] text-slate-700 leading-relaxed">
              I understand KineticBloom is an educational home movement & co-regulation companion, not medical diagnosis or professional occupational therapy treatment.
            </span>
          </label>

          <label className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-200">
            <input
              type="checkbox"
              checked={checkAdultAge}
              onChange={(e) => setCheckAdultAge(e.target.checked)}
              className="mt-0.5 rounded text-teal-600 focus:ring-teal-500 w-4 h-4 shrink-0 cursor-pointer"
            />
            <span className="text-[11px] text-slate-700 leading-relaxed">
              I attest that I am an adult parent, legal guardian, or authorized educator/clinician (18+ years of age).
            </span>
          </label>

          <button
            type="submit"
            disabled={!isAllChecked}
            className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all ${
              isAllChecked
                ? 'bg-teal-600 hover:bg-teal-700 text-white cursor-pointer hover:shadow-lg'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Check className="w-4 h-4" /> I Acknowledge & Enter KineticBloom
          </button>
        </form>
      </div>
    </div>
  );
};

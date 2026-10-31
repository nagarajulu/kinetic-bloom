// Web Audio API and Speech Synthesis Utilities for Hands-Free Floor Execution
// Zero external audio files required. Uses harmonic sine waves and native browser voice synthesis.

let audioCtx: AudioContext | null = null;
let wakeLockSentinel: any = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

/**
 * Play a peaceful harmonic chime (432Hz default - resonant with calming vagal tone).
 */
export function playChime(freq = 432, duration = 1.2): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    // Soft exponential decay
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch (err) {
    console.warn('Audio chime failed:', err);
  }
}

/**
 * Play a gentle 60 BPM woodblock/metronome pulse (calming rhythmic cadence).
 */
export function playPulseTick(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(520, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.05);
  } catch {
    // Graceful fallback
  }
}

/**
 * Upward soothing chime arpeggio for drill/circuit completion.
 */
export function playSuccessChime(): void {
  try {
    const notes = [392, 523.25, 659.25, 783.99]; // G4, C5, E5, G5
    notes.forEach((freq, idx) => {
      setTimeout(() => playChime(freq, 0.9), idx * 140);
    });
  } catch {
    // Graceful fallback
  }
}

/**
 * Speaks a calm, slow voice cue without parents having to look at the screen.
 */
export function speakCue(text: string, enabled = true): void {
  if (!enabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel(); // Cancel any lingering speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.88; // Gentle, slower cadence for regulation
    utterance.pitch = 1.0;
    utterance.volume = 0.8;
    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn('Speech synthesis cue failed:', err);
  }
}

/**
 * Keep the device screen awake during floor therapy so parents don't have to touch it.
 */
export async function requestWakeLock(): Promise<boolean> {
  if (typeof navigator !== 'undefined' && 'wakeLock' in navigator) {
    try {
      wakeLockSentinel = await (navigator as any).wakeLock.request('screen');
      return true;
    } catch {
      return false;
    }
  }
  return false;
}

export function releaseWakeLock(): void {
  try {
    if (wakeLockSentinel) {
      wakeLockSentinel.release();
      wakeLockSentinel = null;
    }
  } catch {
    // ignore
  }
}

// Web Audio API Retro Synthesizer and Tactile Sound FX Engine

class AudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isPlayingTrack: boolean = false;
  private currentInterval: number | null = null;
  private analyser: AnalyserNode | null = null;
  private dataArray: Uint8Array | null = null;

  constructor() {
    // Lazy initialize on first interaction
  }

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMute(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.isPlayingTrack) {
      this.stopMixtape();
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  // Play crisp tactile mechanical click sound
  public playClick(pitch: number = 800) {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(pitch, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch {
      // AudioContext fallback
    }
  }

  // Play smooth harmonic hover blip
  public playHover(freq: number = 440) {
    this.playHoverTone(freq);
  }

  public playHoverTone(freq: number = 440) {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch {
      // ignore
    }
  }

  // Play tone at a given frequency for dials/knobs
  public playFrequency(freq: number = 440) {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {
      // ignore
    }
  }

  // Play futuristic laser sweep sound on copy or special interactions
  public playLaser() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch {
      // ignore
    }
  }

  // Play subtle 8-bit blip for progress
  public playBlip(freq: number = 600) {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.03);
    } catch {
      // ignore
    }
  }

  // Play uplifting 8-bit boot completion fanfare / spring chime
  public playBootComplete() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'triangle';
        const startTime = this.ctx!.currentTime + idx * 0.06;
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.05, startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.25);
      });
    } catch {
      // ignore
    }
  }

  // Play synthesized retro tape chord progression
  public startMixtape(trackBpm: number = 72, rootFreq: number = 220) {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    this.stopMixtape();
    this.isPlayingTrack = true;

    // Chords intervals: Root, minor 3rd, 5th, 7th
    const chordProgressions = [
      [rootFreq, rootFreq * 1.2, rootFreq * 1.5, rootFreq * 1.8], // Am7
      [rootFreq * 0.89, rootFreq * 1.12, rootFreq * 1.33, rootFreq * 1.6], // Fmaj7
      [rootFreq * 0.75, rootFreq * 0.94, rootFreq * 1.12, rootFreq * 1.41], // Cmaj7
      [rootFreq * 0.84, rootFreq * 1.05, rootFreq * 1.26, rootFreq * 1.5]  // Em7
    ];

    let chordIndex = 0;
    const intervalMs = (60 / trackBpm) * 2000;

    const playChordStep = () => {
      if (!this.isPlayingTrack || !this.ctx || this.isMuted) return;
      const currentChord = chordProgressions[chordIndex % chordProgressions.length];
      chordIndex++;

      currentChord.forEach((f, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = i === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(f, this.ctx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(650 + Math.random() * 200, this.ctx.currentTime);

        const duration = (intervalMs / 1000) * 0.9;
        gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.04, this.ctx.currentTime + 0.4);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

        osc.connect(filter);
        filter.connect(gain);
        if (this.analyser) {
          gain.connect(this.analyser);
        }
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      });
    };

    playChordStep();
    this.currentInterval = window.setInterval(playChordStep, intervalMs);
  }

  public stopMixtape() {
    this.isPlayingTrack = false;
    if (this.currentInterval !== null) {
      clearInterval(this.currentInterval);
      this.currentInterval = null;
    }
  }

  public isTrackPlaying(): boolean {
    return this.isPlayingTrack;
  }

  public getAudioFrequencyData(): number[] {
    if (!this.analyser || !this.dataArray) {
      return Array(12).fill(10);
    }
    this.analyser.getByteFrequencyData(this.dataArray);
    const result: number[] = [];
    const step = Math.floor(this.dataArray.length / 12);
    for (let i = 0; i < 12; i++) {
      result.push(this.dataArray[i * step] || Math.floor(Math.random() * 20));
    }
    return result;
  }
}

export const audio = new AudioEngine();

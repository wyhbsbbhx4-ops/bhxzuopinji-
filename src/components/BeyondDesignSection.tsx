import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Disc, Play, Pause, SkipForward, Volume2, Sparkles, RefreshCw, Palette, Camera, BookOpen, Layers } from 'lucide-react';
import { SIDE_QUESTS, MIXTAPE_TRACKS } from '../data/portfolioData';
import { audio } from '../utils/audioSynth';

interface BeyondDesignSectionProps {
  darkMode: boolean;
}

export const BeyondDesignSection: React.FC<BeyondDesignSectionProps> = ({ darkMode }) => {
  // Cassette Mixtape state
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlayingMixtape, setIsPlayingMixtape] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'cassette' | 'generative' | 'artifacts'>('cassette');

  // Generative Canvas Ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvasColor, setCanvasColor] = useState('#E2F952');

  const currentTrack = MIXTAPE_TRACKS[currentTrackIndex];

  // Toggle Mixtape
  const togglePlayMixtape = () => {
    const nextState = !isPlayingMixtape;
    setIsPlayingMixtape(nextState);
    if (nextState) {
      audio.startMixtape(currentTrack.bpm, currentTrack.freq);
    } else {
      audio.stopMixtape();
    }
  };

  const nextTrack = () => {
    audio.playClick(650);
    const nextIdx = (currentTrackIndex + 1) % MIXTAPE_TRACKS.length;
    setCurrentTrackIndex(nextIdx);
    if (isPlayingMixtape) {
      audio.startMixtape(MIXTAPE_TRACKS[nextIdx].bpm, MIXTAPE_TRACKS[nextIdx].freq);
    }
  };

  // Generative Particle Canvas Animation
  useEffect(() => {
    if (activeSubTab !== 'generative') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.fillStyle = darkMode ? 'rgba(18, 18, 18, 0.2)' : 'rgba(245, 244, 239, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw flowing kinetic waves
      const lines = 6;
      for (let i = 0; i < lines; i++) {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = i === 0 ? canvasColor : 'rgba(226, 249, 82, 0.3)';

        for (let x = 0; x < canvas.width; x += 8) {
          const y =
            canvas.height / 2 +
            Math.sin(x * 0.01 + time + i * 0.5) * 45 +
            Math.cos(x * 0.02 - time) * 25;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      animationId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationId);
  }, [activeSubTab, canvasColor, darkMode]);

  return (
    <section
      id="beyond"
      className="relative py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-black/10 dark:border-white/10 bg-noise"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-black/10 dark:border-white/10">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 bg-[#2644F4] rounded-none rotate-45" />
              <span className="font-mono-tag text-xs sm:text-sm tracking-widest uppercase text-neutral-600 dark:text-neutral-400 font-bold">
                04 // BEYOND INTERFACES // SIDE QUESTS & EXPERIMENTS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-neutral-900 dark:text-white">
              Sound, Generative Art & Print
            </h2>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'cassette', label: 'ANALOG MIXTAPE', icon: Disc },
              { id: 'generative', label: 'GENERATIVE CANVAS', icon: Sparkles },
              { id: 'artifacts', label: 'SIDE QUESTS', icon: Layers },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  audio.playClick(600);
                  setActiveSubTab(tab.id as 'cassette' | 'generative' | 'artifacts');
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-mono-tag font-bold tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                  activeSubTab === tab.id
                    ? 'bg-[#2644F4] text-white shadow-md shadow-[#2644F4]/30 scale-105'
                    : 'bg-white/70 dark:bg-white/5 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white border border-black/10 dark:border-white/10'
                }`}
              >
                <tab.icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Sub-tab Panel */}
        <div>
          {/* 1. Analog Cassette Player */}
          {activeSubTab === 'cassette' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Retro Skeuomorphic Cassette Tape */}
              <div className="lg:col-span-7">
                <div className="relative rounded-3xl p-6 sm:p-8 bg-[#141828] border-4 border-neutral-700 dark:border-neutral-800 shadow-2xl overflow-hidden max-w-xl mx-auto">
                  {/* Cassette Texture Overlay */}
                  <div className="absolute inset-0 bg-noise opacity-20" />
                  
                  {/* Tape Header Label */}
                  <div className="relative z-10 bg-[#2644F4] text-white p-4 rounded-xl shadow-md border border-white/20 flex items-center justify-between">
                    <div>
                      <div className="font-condensed font-black text-xl tracking-tight">
                        CASSETTE C-90 // HIGH FIDELITY
                      </div>
                      <div className="font-mono-tag text-[10px] font-bold tracking-widest uppercase text-white/90">
                        {currentTrack.genre} • {currentTrack.bpm} BPM
                      </div>
                    </div>
                    <span className="font-mono-tag font-black text-lg bg-black text-[#2644F4] px-2.5 py-0.5 rounded">
                      SIDE A
                    </span>
                  </div>

                  {/* Dual Tape Reels Window */}
                  <div className="relative z-10 my-8 p-6 rounded-2xl bg-black/90 border-2 border-neutral-800 flex items-center justify-around shadow-inner">
                    {/* Left Spinning Reel */}
                    <div
                      className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-dashed border-neutral-600 bg-neutral-900 flex items-center justify-center ${
                        isPlayingMixtape ? 'animate-spin' : ''
                      }`}
                      style={{ animationDuration: '3s' }}
                    >
                      <div className="w-8 h-8 rounded-full bg-neutral-950 border border-neutral-700 flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#2644F4]" />
                      </div>
                    </div>

                    {/* Middle Clear Window with Tape Ribbon */}
                    <div className="w-20 sm:w-28 h-12 rounded bg-neutral-900/90 border border-neutral-700 flex items-center justify-center relative overflow-hidden">
                      <div className="w-full h-2 bg-[#8b4513] opacity-80" />
                      <span className="absolute font-mono-tag text-[9px] text-[#2644F4] font-bold">
                        {isPlayingMixtape ? 'PLAYING...' : 'STOPPED'}
                      </span>
                    </div>

                    {/* Right Spinning Reel */}
                    <div
                      className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-dashed border-neutral-600 bg-neutral-900 flex items-center justify-center ${
                        isPlayingMixtape ? 'animate-spin' : ''
                      }`}
                      style={{ animationDuration: '3s' }}
                    >
                      <div className="w-8 h-8 rounded-full bg-neutral-950 border border-neutral-700 flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#2644F4]" />
                      </div>
                    </div>
                  </div>

                  {/* Tape Footer Controls */}
                  <div className="relative z-10 flex items-center justify-between pt-2">
                    <div className="font-mono-tag text-xs text-neutral-300">
                      TRACK: <span className="text-[#2644F4] font-bold">{currentTrack.title}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={togglePlayMixtape}
                        className="p-3 rounded-full bg-[#2644F4] hover:bg-[#1a37dd] text-white font-bold shadow-lg shadow-[#2644F4]/30 transition-all hover:scale-110 active:scale-95 cursor-pointer"
                        title={isPlayingMixtape ? 'Pause Tape' : 'Play Tape'}
                      >
                        {isPlayingMixtape ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                      </button>

                      <button
                        onClick={nextTrack}
                        className="p-3 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white font-bold transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                        title="Next Mixtape Track"
                      >
                        <SkipForward className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Tracklist & Sound Philosophy */}
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2644F4]/10 border border-[#2644F4]/30 text-[#2644F4] dark:text-[#8ba2ff] font-mono-tag text-xs font-semibold">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>SYNTHESIZED LO-FI TAPE SESSIONS</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-black text-neutral-900 dark:text-white">
                  Sound Design As An Emotional Interface
                </h3>

                <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
                  Music and sound curation have always formed the backdrop of my design practice.
                  I compose custom audio loops and tactile soundscapes to explore rhythmic pacing and spatial immersion.
                </p>

                {/* Tracklist Items */}
                <div className="space-y-2">
                  {MIXTAPE_TRACKS.map((t, idx) => (
                    <div
                      key={t.id}
                      onClick={() => {
                        audio.playClick(600);
                        setCurrentTrackIndex(idx);
                        if (isPlayingMixtape) {
                          audio.startMixtape(t.bpm, t.freq);
                        }
                      }}
                      className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        currentTrackIndex === idx
                          ? 'bg-[#2644F4]/15 border-[#2644F4] text-neutral-900 dark:text-white shadow-sm'
                          : 'bg-white/60 dark:bg-white/5 border-black/10 dark:border-white/10 text-neutral-600 dark:text-neutral-400 hover:border-[#2644F4]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono-tag text-xs font-bold text-[#2644F4] dark:text-[#8ba2ff]">
                          0{idx + 1}
                        </span>
                        <div>
                          <div className="font-mono-tag text-xs font-bold text-neutral-900 dark:text-white">{t.title}</div>
                          <div className="font-mono-tag text-[10px] text-neutral-500">{t.genre}</div>
                        </div>
                      </div>
                      <span className="font-mono-tag text-xs">{t.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 2. Generative Art Sandbox */}
          {activeSubTab === 'generative' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-white/70 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-[#2644F4]" />
                  <span className="font-mono-tag text-xs font-bold text-neutral-900 dark:text-white">
                    LIVE LISSAJOUS BEZIER WAVE GENERATOR
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono-tag text-xs text-neutral-500">TINT:</span>
                  {['#2644F4', '#38BDF8', '#E2F952', '#F43F5E', '#A855F7'].map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        audio.playClick(800);
                        setCanvasColor(c);
                      }}
                      className="w-5 h-5 rounded-full border border-black/20 dark:border-white/20 transition-transform hover:scale-125"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-neutral-950 overflow-hidden relative shadow-2xl h-80 sm:h-96">
                <canvas
                  ref={canvasRef}
                  width={900}
                  height={400}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 font-mono-tag text-xs text-white/80 bg-black/70 px-3 py-1 rounded backdrop-blur-md">
                  RENDERED WITH WEBGL & HTML5 CANVAS MATH
                </div>
              </div>
            </div>
          )}

          {/* 3. Physical Artifacts & Side Quests */}
          {activeSubTab === 'artifacts' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {SIDE_QUESTS.map((quest) => (
                <motion.div
                  key={quest.id}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl bg-white/70 dark:bg-[#131726] border border-black/10 dark:border-white/10 hover:border-[#2644F4] overflow-hidden flex flex-col justify-between shadow-xl transition-all backdrop-blur-md"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-neutral-950">
                    <img
                      src={quest.previewUrl}
                      alt={quest.title}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#2644F4] font-mono-tag text-[10px] text-white font-bold shadow-md shadow-[#2644F4]/30">
                      {quest.category}
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <h4 className="font-display font-bold text-lg text-neutral-900 dark:text-white">
                      {quest.title}
                    </h4>
                    <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed line-clamp-3">
                      {quest.description}
                    </p>

                    <div className="flex flex-wrap gap-1 pt-2">
                      {quest.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 text-[10px] font-mono-tag text-neutral-600 dark:text-neutral-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Sparkles, Check, Sliders, Volume2, Layers, ArrowRight, Quote } from 'lucide-react';
import { Project } from '../types';
import { audio } from '../utils/audioSynth';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // Interactive prototype state inside modal
  const [knobVal1, setKnobVal1] = useState(65);
  const [knobVal2, setKnobVal2] = useState(40);
  const [activeTab, setActiveTab] = useState<'overview' | 'prototype' | 'design-system'>('overview');
  const [selectedTokenIndex, setSelectedTokenIndex] = useState(0);

  if (!project) return null;

  const handleKnobChange = (val: number, isKnob1: boolean) => {
    if (isKnob1) {
      setKnobVal1(val);
      audio.playHoverTone(200 + val * 4);
    } else {
      setKnobVal2(val);
      audio.playHoverTone(300 + val * 4);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-5xl bg-[#0e121e] border border-[#2644F4]/50 rounded-2xl shadow-2xl overflow-hidden text-white my-8 max-h-[90vh] flex flex-col"
        >
          {/* Modal Header */}
          <div className="p-6 sm:p-8 border-b border-black/20 dark:border-white/10 bg-[#131726] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#2644F4] text-white flex items-center justify-center font-bold shadow-md shadow-[#2644F4]/30">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M12 0L14 9L23 5L17 12L24 16L15 17L16 24L11 18L5 23L7 14L0 12L8 8L3 1L11 6Z" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono-tag text-xs font-bold text-[#2644F4] dark:text-[#8ba2ff]">
                    [{project.year} // {project.categoryLabel}]
                  </span>
                  <span className="text-neutral-400 font-mono-tag text-xs">• {project.client}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-black text-white leading-tight">
                  {project.title}
                </h2>
              </div>
            </div>

            <button
              onClick={() => {
                audio.playClick(500);
                onClose();
              }}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close Case Study"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Navigation Tabs */}
          <div className="px-6 sm:px-8 py-3 bg-[#0d101b] border-b border-black/20 dark:border-white/10 flex gap-2 shrink-0 overflow-x-auto">
            {(['overview', 'prototype', 'design-system'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  audio.playClick(600);
                  setActiveTab(tab);
                }}
                className={`px-4 py-1.5 rounded-full font-mono-tag text-xs font-bold uppercase transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-[#2644F4] text-white shadow-md shadow-[#2644F4]/30 scale-105'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab === 'overview' && '01 // Case Study & Metrics'}
                {tab === 'prototype' && '02 // Live Interactive Sandbox'}
                {tab === 'design-system' && '03 // Design System & Tokens'}
              </button>
            ))}
          </div>

          {/* Scrollable Content Area */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Hero Showcase Image */}
                <div className="relative rounded-xl overflow-hidden border border-white/10 h-64 sm:h-80 md:h-96">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex items-end p-6">
                    <p className="text-lg sm:text-xl font-display font-bold text-white max-w-2xl">
                      {project.tagline}
                    </p>
                  </div>
                </div>

                {/* Metrics Banner */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {project.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1"
                    >
                      <div className="text-2xl sm:text-3xl font-condensed font-black text-[#2644F4] dark:text-[#8ba2ff]">
                        {m.value}
                      </div>
                      <div className="font-mono-tag text-xs text-neutral-300 font-medium">
                        {m.label}
                      </div>
                      {m.change && (
                        <div className="font-mono-tag text-[10px] text-emerald-400 font-bold">
                          {m.change}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Challenge & Solution Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-3">
                    <div className="font-mono-tag text-xs font-bold text-rose-400 uppercase tracking-wider">
                      // THE DESIGN CHALLENGE
                    </div>
                    <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
                      {project.challenge}
                    </p>
                  </div>

                  <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-3">
                    <div className="font-mono-tag text-xs font-bold text-[#2644F4] dark:text-[#8ba2ff] uppercase tracking-wider">
                      // ARCHITECTED SOLUTION
                    </div>
                    <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
                      {project.solution}
                    </p>
                  </div>
                </div>

                {/* Key Features Breakdown */}
                <div className="space-y-4">
                  <h3 className="font-mono-tag text-xs uppercase tracking-wider text-neutral-400 font-bold">
                    // KEY INTERACTION HIGHLIGHTS
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.keyFeatures.map((feat, fIdx) => (
                      <div
                        key={fIdx}
                        className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2"
                      >
                        <h4 className="font-display font-bold text-base text-[#2644F4] dark:text-[#8ba2ff]">
                          {feat.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                          {feat.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Testimonial Quote if available */}
                {project.testimonial && (
                  <div className="p-6 rounded-xl bg-[#2644F4]/10 border border-[#2644F4]/30 space-y-3">
                    <Quote className="w-6 h-6 text-[#2644F4] dark:text-[#8ba2ff]" />
                    <p className="text-base sm:text-lg italic font-display text-white">
                      "{project.testimonial.quote}"
                    </p>
                    <div className="font-mono-tag text-xs text-[#2644F4] dark:text-[#8ba2ff] font-bold">
                      {project.testimonial.author} — {project.testimonial.role}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Interactive Sandbox Tab */}
            {activeTab === 'prototype' && (
              <div className="space-y-6">
                <div className="p-6 rounded-xl bg-black/60 border border-[#2644F4]/40 space-y-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2">
                      <Sliders className="w-5 h-5 text-[#2644F4]" />
                      <span className="font-mono-tag text-sm font-bold text-white">
                        LIVE INTERACTION PLAYGROUND // {project.title}
                      </span>
                    </div>
                    <span className="font-mono-tag text-xs text-[#2644F4] dark:text-[#8ba2ff] animate-pulse">
                      ● REAL-TIME SYNTHESIS ACTIVE
                    </span>
                  </div>

                  {/* Interactive Dial Controls */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-4">
                    <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-4">
                      <div className="flex justify-between items-center font-mono-tag text-xs">
                        <span className="text-neutral-400">FREQUENCY HARMONIC</span>
                        <span className="text-[#2644F4] dark:text-[#8ba2ff] font-bold">{knobVal1}%</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="100"
                        value={knobVal1}
                        onChange={(e) => handleKnobChange(Number(e.target.value), true)}
                        className="w-full accent-[#2644F4] cursor-pointer"
                      />
                      <div className="h-16 rounded-lg bg-black flex items-center justify-center overflow-hidden relative">
                        <div
                          className="h-full bg-[#2644F4] opacity-80 transition-all"
                          style={{ width: `${knobVal1}%` }}
                        />
                        <span className="absolute font-mono-tag text-[10px] font-bold text-white">
                          SPECTRAL BAND: {200 + knobVal1 * 12}Hz
                        </span>
                      </div>
                    </div>

                    <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-4">
                      <div className="flex justify-between items-center font-mono-tag text-xs">
                        <span className="text-neutral-400">REVERB & TAPE SATURATION</span>
                        <span className="text-[#2644F4] dark:text-[#8ba2ff] font-bold">{knobVal2}%</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="100"
                        value={knobVal2}
                        onChange={(e) => handleKnobChange(Number(e.target.value), false)}
                        className="w-full accent-[#2644F4] cursor-pointer"
                      />
                      <div className="h-16 rounded-lg bg-black flex items-center justify-center overflow-hidden relative">
                        <div
                          className="h-full bg-cyan-500 opacity-80 transition-all"
                          style={{ width: `${knobVal2}%` }}
                        />
                        <span className="absolute font-mono-tag text-[10px] font-bold text-white">
                          WARP FACTOR: {(knobVal2 / 20).toFixed(2)}x
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-white/5 font-mono-tag text-xs text-neutral-300 flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-[#2644F4]" />
                    <span>Adjust sliders above to trigger instant Web Audio harmonic synthesis and visual feedback loops.</span>
                  </div>
                </div>
              </div>
            )}

            {/* Design System & Tokens Tab */}
            {activeTab === 'design-system' && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="font-mono-tag text-xs uppercase tracking-wider text-neutral-400 font-bold">
                    // COLOR PALETTE & TOKEN SPECIFICATIONS
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {project.designSystem.colors.map((c, cIdx) => (
                      <div
                        key={c.hex}
                        onClick={() => {
                          audio.playClick(700);
                          setSelectedTokenIndex(cIdx);
                        }}
                        className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3 cursor-pointer hover:border-[#2644F4] transition-colors"
                      >
                        <div
                          className="w-full h-14 rounded-lg shadow-inner border border-white/10"
                          style={{ backgroundColor: c.hex }}
                        />
                        <div>
                          <div className="font-display font-bold text-sm text-white">{c.name}</div>
                          <div className="font-mono-tag text-xs text-neutral-400">{c.hex}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-3">
                    <span className="font-mono-tag text-xs text-[#2644F4] dark:text-[#8ba2ff] uppercase font-bold">
                      // TYPOGRAPHY STACK
                    </span>
                    <ul className="space-y-2 font-mono-tag text-xs text-neutral-300">
                      {project.designSystem.typography.map((font) => (
                        <li key={font} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2644F4]" />
                          <span>{font}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-3">
                    <span className="font-mono-tag text-xs text-[#2644F4] dark:text-[#8ba2ff] uppercase font-bold">
                      // CORE ATOMIC COMPONENTS
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {project.designSystem.components.map((comp) => (
                        <span
                          key={comp}
                          className="px-3 py-1 rounded-full bg-white/10 border border-white/10 font-mono-tag text-xs text-neutral-300"
                        >
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer CTA */}
          <div className="p-6 bg-[#131726] border-t border-black/20 dark:border-white/10 flex items-center justify-between shrink-0">
            <span className="font-mono-tag text-xs text-neutral-400">
              CONFIDENTIAL CASE STUDY // PROPRIETARY IP
            </span>
            <button
              onClick={() => {
                audio.playClick(600);
                onClose();
              }}
              className="px-6 py-2 rounded-full bg-[#2644F4] text-white font-mono-tag text-xs font-bold hover:bg-[#1a37dd] transition-all cursor-pointer shadow-md shadow-[#2644F4]/30"
            >
              CLOSE CASE STUDY
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

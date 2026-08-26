import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Play, Pause, Sparkles, ArrowDown } from 'lucide-react';
import { audio } from '../utils/audioSynth';

interface HeroSectionProps {
  darkMode: boolean;
  onNavigate: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ darkMode, onNavigate }) => {
  const [equalizerLevels, setEqualizerLevels] = useState<number[]>([7, 2, 5, 2, 4, 6, 4, 7]);
  const [isPlayingWave, setIsPlayingWave] = useState(true);
  const [headlineMode, setHeadlineMode] = useState<'sound' | 'design' | 'narrative'>('sound');

  // Parallax scroll hooks
  const { scrollY } = useScroll();
  const yHeroText = useTransform(scrollY, [0, 600], [0, 150]);
  const yEqualizer = useTransform(scrollY, [0, 600], [0, -80]);

  // Dynamic animated equalizer bars simulation
  useEffect(() => {
    if (!isPlayingWave) return;
    const interval = setInterval(() => {
      setEqualizerLevels(prev =>
        prev.map(() => Math.floor(Math.random() * 6) + 2)
      );
    }, 280);
    return () => clearInterval(interval);
  }, [isPlayingWave]);

  const handleEqualizerClick = (index: number) => {
    audio.playHoverTone(220 + index * 60);
    setEqualizerLevels(prev => {
      const next = [...prev];
      next[index] = (next[index] % 8) + 1;
      return next;
    });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-between overflow-hidden bg-noise bg-blueprint-grid border-b border-black/10 dark:border-white/10"
    >
      {/* Massive Condensed Headline */}
      <div className="w-full max-w-7xl mx-auto">
        <motion.div
          style={{ y: yHeroText }}
          className="relative w-full border-b border-black/15 dark:border-white/15 py-6 sm:py-8 select-none"
        >
          <div className="relative flex items-center justify-center overflow-hidden">
            <h1
              id="hero-massive-title"
              className="w-full text-center text-[14vw] sm:text-[12vw] lg:text-[10vw] font-display font-black tracking-tight leading-[130px] select-none text-[#2644F4] drop-shadow-sm transition-all duration-300 hover:tracking-normal cursor-default"
            >
              精选作品
            </h1>
          </div>
        </motion.div>
      </div>

      {/* Middle Section: Clean Editorial Statement */}
      <div className="w-full max-w-4xl mx-auto my-auto py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 text-center sm:text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2644F4]/10 border border-[#2644F4]/30 text-[#2644F4] dark:text-[#8ba2ff] font-mono-tag text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PRODUCT EXPERIENCE DESIGNER // 产品体验设计师</span>
          </div>

          <h2
            id="hero-editorial-headline"
            onClick={() => {
              audio.playClick(700);
              setHeadlineMode(prev => (prev === 'sound' ? 'design' : prev === 'design' ? 'narrative' : 'sound'));
            }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-neutral-900 dark:text-white hover:text-[#2644F4] dark:hover:text-[#6882ff] transition-colors cursor-pointer leading-[1.12]"
            title="Click to cycle headline"
          >
            {headlineMode === 'sound' && '感知细节，洞察本质。'}
            {headlineMode === 'design' && '用敏锐审美打磨极致体验。'}
            {headlineMode === 'narrative' && '以全链路设计推动项目持续前进。'}
          </h2>

          <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 font-normal max-w-3xl leading-relaxed">
            专注产品体验、UI交互、运营视觉与AIGC创意探索。以敏锐的感知力与细节把控力，塑造有温度与业务价值的数字产品。
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4">
            <button
              id="hero-explore-projects-btn"
              onClick={() => {
                audio.playClick(800);
                onNavigate('projects');
              }}
              className="px-7 py-3.5 rounded-full bg-[#2644F4] hover:bg-[#1a37dd] text-white font-mono-tag font-bold text-sm tracking-wider flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#2644F4]/30 cursor-pointer"
            >
              <span>EXPLORE CASE STUDIES 探索案例研究</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Bottom Equalizer Section: Blue Stippled Graphic Equalizer */}
      <motion.div
        style={{ y: yEqualizer }}
        className="w-full max-w-7xl mx-auto pt-6 pb-2"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 font-mono-tag text-xs text-neutral-600 dark:text-neutral-400 uppercase font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#2644F4]" />
            <span>FREQUENCY VISUALIZER // 8-BAND TACTILE EQUALIZER</span>
          </div>
          <button
            onClick={() => {
              audio.playClick(500);
              setIsPlayingWave(!isPlayingWave);
            }}
            className="font-mono-tag text-[11px] text-neutral-600 dark:text-neutral-400 hover:text-[#2644F4] flex items-center gap-1 transition-colors cursor-pointer"
          >
            {isPlayingWave ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlayingWave ? 'FREEZE' : 'ANIMATE'}</span>
          </button>
        </div>

        {/* 8 Columns of Equalizer Blocks */}
        <div className="grid grid-cols-8 gap-2 sm:gap-3 md:gap-4 h-28 sm:h-40 md:h-48 items-end">
          {equalizerLevels.map((level, colIndex) => (
            <div
              key={colIndex}
              onClick={() => handleEqualizerClick(colIndex)}
              className="flex flex-col-reverse gap-1.5 sm:gap-2 h-full justify-start cursor-pointer group"
              title={`Band ${colIndex + 1}: Click to trigger sound`}
            >
              {Array.from({ length: 8 }).map((_, rowIndex) => {
                const isLit = rowIndex < level;
                return (
                  <div
                    key={rowIndex}
                    className={`w-full h-3 sm:h-4 md:h-5 rounded-none transition-all duration-150 ${
                      isLit
                        ? 'equalizer-bar-texture group-hover:brightness-125 group-hover:scale-y-110 shadow-sm shadow-[#2644F4]/40'
                        : 'bg-neutral-300/40 dark:bg-white/5 border border-black/5 dark:border-white/5'
                    }`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};



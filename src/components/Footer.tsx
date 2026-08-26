import React from 'react';
import { ArrowUp } from 'lucide-react';
import { audio } from '../utils/audioSynth';

interface FooterProps {
  darkMode: boolean;
  onReplayIntro?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ darkMode, onReplayIntro }) => {
  const scrollToTop = () => {
    audio.playClick(900);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="main-footer"
      className="relative py-12 px-4 sm:px-6 lg:px-8 border-t border-black/10 dark:border-white/10 bg-[#f4f6fb] dark:bg-[#090c14] text-neutral-900 dark:text-white"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Brand / Copyright */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#2644F4] text-white flex items-center justify-center font-black shadow-md shadow-[#2644F4]/30">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M12 0L14 9L23 5L17 12L24 16L15 17L16 24L11 18L5 23L7 14L0 12L8 8L3 1L11 6Z" />
            </svg>
          </div>
          <div>
            <div className="font-condensed font-black text-lg tracking-tight">
              BHX.DESIGN // 巴涵笑
            </div>
            <div className="font-mono-tag text-[10px] text-neutral-500">
              © {new Date().getFullYear()} ALL RIGHTS RESERVED. CRAFTED WITH REACT & MOTION.
            </div>
          </div>
        </div>

        {/* Center: Tactile Statement & Replay Intro */}
        <div className="flex flex-wrap items-center gap-3 font-mono-tag text-xs text-neutral-600 dark:text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#2644F4]" />
            <span>DESIGNED TO BE FELT, NOT JUST SEEN.</span>
          </div>
          {onReplayIntro && (
            <button
              onClick={() => {
                audio.playLaser();
                onReplayIntro();
              }}
              className="px-2.5 py-1 rounded bg-[#2644F4]/15 hover:bg-[#2644F4] text-[#2644F4] hover:text-white border border-[#2644F4]/30 font-pixel text-[9px] transition-all cursor-pointer"
              title="Replay 8-bit Opening Loader"
            >
              [REPLAY BOOT OS]
            </button>
          )}
        </div>

        {/* Right: Scroll to top */}
        <button
          onClick={scrollToTop}
          className="px-4 py-2 rounded-full bg-white dark:bg-white/5 hover:bg-[#2644F4] hover:text-white dark:hover:bg-[#2644F4] border border-black/10 dark:border-white/10 text-neutral-700 dark:text-neutral-300 font-mono-tag text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm hover:shadow-md hover:shadow-[#2644F4]/30"
          aria-label="Back to top"
        >
          <span>BACK TO TOP</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
};


import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { audio } from '../utils/audioSynth';

interface IntroLoaderProps {
  onComplete: () => void;
}

export const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isSpringing, setIsSpringing] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [dotCount, setDotCount] = useState(3);
  const hasReached100Ref = useRef(false);

  // Animate loading text dots while loading
  useEffect(() => {
    if (isReady) return;
    const dotInterval = setInterval(() => {
      setDotCount((prev) => (prev % 3) + 1);
    }, 400);
    return () => clearInterval(dotInterval);
  }, [isReady]);

  // Organic, smooth retro progress progression from 0 to 100
  useEffect(() => {
    let current = 0;
    let timer: number;

    const step = () => {
      if (hasReached100Ref.current) return;

      // Realistic variable step increment
      const increment = Math.floor(Math.random() * 6) + 3; // 3 to 8%
      current = Math.min(100, current + increment);
      setProgress(current);

      if (current % 15 === 0 && current < 100) {
        audio.playBlip(500 + current * 4);
      }

      if (current < 100) {
        const delay = current > 80 ? 45 : current > 40 && current < 60 ? 65 : 35;
        timer = window.setTimeout(step, delay);
      } else {
        // Reached 100%
        hasReached100Ref.current = true;
        setIsSpringing(true);
        setIsReady(true);
        audio.playBootComplete();
      }
    };

    timer = window.setTimeout(step, 120);

    return () => clearTimeout(timer);
  }, []);

  // Enter website action triggered on clicking START or pressing Enter/Space
  const handleStart = () => {
    if (isDone) return;
    audio.playLaser();
    audio.playClick(1000);
    setIsDone(true);
    setTimeout(() => {
      onComplete();
    }, 450);
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleStart();
      } else if (isReady && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        handleStart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isReady, isDone]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="intro-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03, filter: 'blur(4px)' }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center select-none bg-retro-pixel-grid overflow-hidden text-white cursor-default"
          style={{ backgroundColor: '#181324' }}
        >
          {/* Subtle CRT scanline effect */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: 'linear-gradient(rgba(18, 16, 26, 0) 50%, rgba(0, 0, 0, 0.4) 50%)',
              backgroundSize: '100% 4px',
            }}
          />

          {/* Main Retro OS Container */}
          <div className="relative z-10 flex flex-col items-center justify-center px-6 max-w-lg w-full text-center space-y-7">
            {/* Title: PORTFOLIO OS */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-1"
            >
              <h1
                className="font-pixel text-2xl sm:text-4xl md:text-[40px] font-bold tracking-wider leading-relaxed"
                style={{
                  color: '#2644f4',
                  textShadow: '3px 3px 0px #0e1a6b, -1px -1px 0px #080f3d, 1px -1px 0px #080f3d, -1px 1px 0px #080f3d',
                  imageRendering: 'pixelated',
                }}
              >
                PORTFOLIO OS
              </h1>
            </motion.div>

            {/* Subtitle: loading... OR SYSTEM READY */}
            <div className="flex items-center justify-center h-6">
              {isReady ? (
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="font-pixel text-xs sm:text-sm tracking-widest uppercase text-white font-semibold"
                  style={{
                    textShadow: '1px 1px 0px #000',
                  }}
                >
                  SYSTEM READY
                </motion.span>
              ) : (
                <span
                  className="font-pixel text-xs sm:text-sm tracking-widest lowercase text-white/90"
                  style={{
                    textShadow: '1px 1px 0px #000',
                  }}
                >
                  loading{'.'.repeat(dotCount)}
                </span>
              )}
            </div>

            {/* Progress Bar Container with Spring Animation on 100% */}
            <motion.div
              animate={
                isSpringing
                  ? {
                      scale: [1, 1.1, 0.95, 1.04, 1],
                      y: [0, -4, 2, -1, 0],
                      transition: {
                        duration: 0.55,
                        times: [0, 0.25, 0.5, 0.75, 1],
                        ease: 'easeInOut',
                      },
                    }
                  : { scale: 1, y: 0 }
              }
              className="w-full max-w-xs sm:max-w-sm flex flex-col items-center space-y-3"
            >
              {/* Retro Pixel Progress Bar */}
              <div
                className="w-full h-6 sm:h-7 bg-[#0d1024] border-2 sm:border-[3px] border-white p-0.5 relative shadow-[0_0_14px_rgba(38,68,244,0.35)]"
                style={{
                  imageRendering: 'pixelated',
                }}
              >
                {/* Cobalt Fill Bar */}
                <motion.div
                  className="h-full"
                  style={{
                    backgroundColor: '#2644f4',
                    width: `${progress}%`,
                    boxShadow: isSpringing ? '0 0 18px #2644f4' : 'none',
                    transition: 'width 0.08s ease-out',
                  }}
                />
              </div>

              {/* Percentage Label */}
              <div className="pt-1">
                <span
                  className={`font-pixel text-xs sm:text-sm font-bold tracking-wider transition-colors duration-200 ${
                    progress === 100 ? 'text-white' : 'text-white/80'
                  }`}
                  style={{
                    textShadow: '1px 1px 0px #000',
                  }}
                >
                  {progress}%
                </span>
              </div>
            </motion.div>

            {/* Interactive PRESS START Button */}
            <div className="h-14 flex items-center justify-center">
              {isReady ? (
                <motion.button
                  id="press-start-btn"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={handleStart}
                  onMouseEnter={() => audio.playHover()}
                  className="group px-6 py-2.5 rounded transition-all cursor-pointer select-none focus:outline-none"
                >
                  <motion.div
                    animate={{
                      opacity: [1, 0.45, 1],
                      scale: [1, 1.03, 1],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="font-pixel text-sm sm:text-base tracking-widest text-[#2644f4] group-hover:text-white group-hover:scale-105 transition-transform drop-shadow-[0_0_10px_rgba(38,68,244,0.8)]"
                    style={{
                      textShadow: '2px 2px 0px #0b144d',
                    }}
                  >
                    &gt; PRESS START &lt;
                  </motion.div>
                  <div className="text-[10px] text-white/50 font-pixel mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    [ CLICK OR PRESS ENTER ]
                  </div>
                </motion.button>
              ) : (
                <div className="h-10" />
              )}
            </div>
          </div>

          {/* Bottom Right Skip Button (Always accessible) */}
          <div className="absolute bottom-6 right-6 z-20">
            <button
              onClick={handleStart}
              className="px-3 py-1.5 rounded bg-white/10 hover:bg-[#2644f4] hover:text-white border border-white/20 font-pixel text-[10px] sm:text-xs text-neutral-300 transition-all cursor-pointer shadow-md"
            >
              SKIP ↵
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

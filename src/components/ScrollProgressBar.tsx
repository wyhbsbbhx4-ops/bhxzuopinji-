import React, { useEffect, useState } from 'react';

export const ScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0) {
            const currentProgress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
          } else {
            setScrollProgress(0);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    // Initial calculation
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div
      id="scroll-progress-bar-container"
      className="fixed top-0 left-0 right-0 w-full h-[3px] z-[60] pointer-events-none bg-black/5 dark:bg-white/5"
      aria-hidden="true"
    >
      <div
        id="scroll-progress-bar-fill"
        className="h-full bg-[#2644F4] transition-[width] duration-75 ease-out shadow-[0_0_8px_rgba(38,68,244,0.6)]"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};

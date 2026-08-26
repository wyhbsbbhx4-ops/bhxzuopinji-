import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Moon, Sun, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { audio } from '../utils/audioSynth';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  activeSection: string;
  isMuted: boolean;
  setIsMuted: (val: boolean | ((prev: boolean) => boolean)) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  setDarkMode,
  activeSection,
  isMuted,
  setIsMuted
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    audio.setMute(nextState);
    if (!nextState) {
      audio.playClick(900);
    }
  };

  const toggleTheme = () => {
    audio.playClick(600);
    setDarkMode(prev => !prev);
  };

  const navItems = [
    { label: '关于', id: 'about' },
    { label: '经历', id: 'experience' },
    { label: '作品', id: 'projects' },
    { label: '探索', id: 'beyond' },
    { label: '联系', id: 'contact' },
  ];

  const scrollToSection = (id: string) => {
    audio.playClick(750);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? darkMode
            ? 'bg-[#0b0d14]/90 backdrop-blur-md border-b border-white/10 py-3 shadow-xl'
            : 'bg-[#e7e9ed]/90 backdrop-blur-md border-b border-neutral-300 py-3 shadow-xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Brand Icon & Logo */}
        <div className="flex items-center gap-3">
          <button
            id="brand-logo-btn"
            onClick={() => scrollToSection('hero')}
            className="group flex items-center gap-2.5 cursor-pointer focus:outline-none"
            aria-label="Home"
          >
            {/* Asterisk Sunburst Badge like in reference image */}
            <div className="w-8 h-8 rounded-full bg-[#2644F4] text-white flex items-center justify-center font-black transition-transform duration-300 group-hover:rotate-90 group-hover:scale-110 shadow-md shadow-[#2644F4]/30 shrink-0">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                <path d="M12 0L14 9L23 5L17 12L24 16L15 17L16 24L11 18L5 23L7 14L0 12L8 8L3 1L11 6Z" />
              </svg>
            </div>
            <div className="flex items-baseline gap-2 text-left">
              <span className="font-condensed text-xl tracking-tight font-extrabold leading-none text-neutral-900 dark:text-white">
                BHX.DESIGN
              </span>
              <span className="font-mono-tag text-[11px] tracking-wider text-[#2644F4] dark:text-[#6882ff] font-semibold">
                巴涵笑 // PORTFOLIO
              </span>
            </div>
          </button>

          {/* Availability Beacon */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2644F4]/10 border border-[#2644F4]/30 text-[#2644F4] dark:text-[#8ba2ff] font-mono-tag text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2644F4] animate-ping" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#2644F4] -ml-3" />
            <span className="hidden md:inline">[OPEN FOR COMMISSIONS]</span>
          </div>
        </div>

        {/* Center: Reference-Inspired Pill Navigation */}
        <nav className="hidden lg:flex items-center gap-1.5 p-1 rounded-full bg-black/10 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => scrollToSection(item.id)}
                onMouseEnter={() => audio.playHoverTone(520)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono-tag tracking-wider font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#2644F4] text-white shadow-md shadow-[#2644F4]/30 scale-105'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Controls (Sound + Theme Toggle + CTA) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Audio Synthesizer Toggle */}
          <button
            id="sound-toggle-btn"
            onClick={toggleSound}
            className={`p-2 sm:px-3 sm:py-1.5 rounded-full border text-xs font-mono-tag flex items-center gap-1.5 transition-all cursor-pointer ${
              !isMuted
                ? 'bg-[#2644F4]/15 border-[#2644F4] text-[#2644F4] dark:text-[#8ba2ff]'
                : 'border-neutral-300 dark:border-neutral-700 text-neutral-500 hover:border-neutral-400'
            }`}
            title={isMuted ? 'Turn Sound On' : 'Mute Sound'}
            aria-label="Toggle Sound"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 animate-pulse text-[#2644F4] dark:text-[#8ba2ff]" />}
            <span className="hidden md:inline">{isMuted ? 'MUTE' : 'AUDIO ON'}</span>
          </button>

          {/* Dark/Light Mode Switcher */}
          <button
            id="theme-toggle-btn"
            onClick={toggleTheme}
            className="p-2 sm:px-3 sm:py-1.5 rounded-full border border-neutral-300 dark:border-white/20 text-neutral-800 dark:text-neutral-200 hover:bg-black/5 dark:hover:bg-white/10 text-xs font-mono-tag flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Toggle Dark / Light Theme"
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-[#2644F4]" /> : <Moon className="w-4 h-4 text-neutral-800" />}
            <span className="hidden md:inline">{darkMode ? 'LIGHT' : 'DARK'}</span>
          </button>

          {/* Quick Connect CTA */}
          <button
            id="header-hire-btn"
            onClick={() => scrollToSection('contact')}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#2644F4] hover:bg-[#1f3de0] text-white text-xs font-mono-tag font-bold tracking-wider transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-md shadow-[#2644F4]/30"
          >
            <span>LET'S TALK</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => {
              audio.playClick(600);
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="lg:hidden p-2 rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-300 hover:bg-black/5 dark:hover:bg-neutral-800"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-3 pb-6 bg-[#0e111a] dark:bg-[#0e111a] border-b border-neutral-800 animate-in slide-in-from-top-4 duration-200 text-white">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-left px-4 py-2.5 rounded-xl font-mono-tag text-sm font-bold transition-colors ${
                  activeSection === item.id
                    ? 'bg-[#2644F4] text-white'
                    : 'text-neutral-300 hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('contact')}
              className="mt-2 text-center py-3 rounded-xl bg-[#2644F4] text-white font-mono-tag font-bold text-sm flex items-center justify-center gap-2"
            >
              <span>CONTACT & COMMISSIONS</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

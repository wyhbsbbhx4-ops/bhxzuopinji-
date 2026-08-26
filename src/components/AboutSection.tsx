import React, { useState } from 'react';
import { motion, Variants } from 'motion/react';
import { Sparkles, Award, Layers, Users, Zap, CheckCircle2, ChevronRight } from 'lucide-react';
import { DESIGNER_INFO, MANIFESTO, DESIGN_SKILLS } from '../data/portfolioData';
import { audio } from '../utils/audioSynth';

interface AboutSectionProps {
  darkMode: boolean;
  onOpenContact: () => void;
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: custom * 0.12,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -35 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 35 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const AboutSection: React.FC<AboutSectionProps> = ({ darkMode, onOpenContact }) => {
  const [activeTab, setActiveTab] = useState<'philosophy' | 'skills' | 'stats'>('philosophy');
  const [showManifestoModal, setShowManifestoModal] = useState(false);

  const stats = [
    { label: 'YEARS OF CRAFT', value: DESIGNER_INFO.yearsOfExperience, icon: Zap },
    { label: 'PRODUCTS SHIPPED', value: DESIGNER_INFO.shippedProducts, icon: Layers },
    { label: 'GLOBAL AWARDS', value: DESIGNER_INFO.designAwards, icon: Award },
    { label: 'USERS IMPACTED', value: DESIGNER_INFO.usersImpacted, icon: Users },
  ];

  return (
    <section
      id="about"
      className="relative py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-black/10 dark:border-white/10 bg-noise overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Top Header Marker - Scroll Triggered */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex flex-wrap items-center justify-between gap-4 pb-10 border-b border-black/10 dark:border-white/10"
        >
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 bg-[#2644F4] rounded-none rotate-45" />
            <span className="font-mono-tag text-xs sm:text-sm tracking-widest uppercase text-neutral-600 dark:text-neutral-400 font-bold">
              01 // BIOGRAPHY & DESIGN MANIFESTO
            </span>
          </div>
          <div className="flex items-center gap-2 font-mono-tag text-xs text-neutral-500">
            <span>[LAT: 31.2304° N, 121.4737° E]</span>
            <span className="hidden sm:inline">// SHANGHAI / TOKYO</span>
          </div>
        </motion.div>

        {/* Main Grid: Exact Reference Split (Left: Collage, Right: Narrative & Manifesto) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12 items-start">
          {/* Left Column: Multilayer Editorial Collage with Entrance Scroll Animation */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative w-full max-w-lg mx-auto lg:max-w-none rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-2xl bg-neutral-900 group">
              {/* Top Photo Tile: Hand holding Cassette against sky aesthetic */}
              <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-sky-700">
                <motion.img
                  initial={{ scale: 1.1, filter: 'grayscale(60%)' }}
                  whileInView={{ scale: 1, filter: 'grayscale(0%)' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1000&q=80"
                  alt="Sound & Interaction Hardware"
                  className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-700 hover:scale-105"
                />
                
                {/* Floating Cassette Overlay Icon / Badge in Cobalt Blue */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: -10 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="absolute top-4 left-4 flex flex-col gap-2"
                >
                  <div className="w-10 h-10 rounded-full bg-[#2644F4] text-white flex items-center justify-center font-bold shadow-lg shadow-[#2644F4]/30">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                      <path d="M12 0L14 9L23 5L17 12L24 16L15 17L16 24L11 18L5 23L7 14L0 12L8 8L3 1L11 6Z" />
                    </svg>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="px-3 py-1 rounded-full bg-[#2644F4] text-white font-mono-tag text-[10px] font-bold shadow-sm">
                      CRAFT
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#2644F4] text-white font-mono-tag text-[10px] font-bold shadow-sm">
                      PULSE
                    </span>
                  </div>
                </motion.div>

                {/* Floating Tape Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                  className="absolute bottom-4 right-4 bg-black/85 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/20 font-mono-tag text-[11px] text-[#2644F4] dark:text-[#8ba2ff] flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-[#2644F4] animate-ping" />
                  <span>ANALOG SOUL × DIGITAL RIGOR</span>
                </motion.div>
              </div>

              {/* Bottom Collage Grid: Green Grunge Texture + Pink Halftone "A" Block */}
              <div className="grid grid-cols-12 h-64 sm:h-72 border-t border-neutral-800">
                {/* Green Grunge "STEREO" Vertical Typography Block */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="col-span-5 bg-[#009b4d] relative p-4 flex flex-col justify-between overflow-hidden"
                >
                  {/* Tape strip overlay */}
                  <div className="absolute -top-3 left-6 w-20 h-7 tape-strip rotate-6 z-10" />
                  <div className="absolute top-8 left-2 font-mono-tag text-[9px] text-white/80 uppercase tracking-widest">
                    CH-A / 44.1kHz
                  </div>
                  <div className="my-auto transform -rotate-90 origin-left translate-y-16 -translate-x-2">
                    <span className="text-4xl sm:text-5xl font-condensed font-black tracking-widest text-[#2644F4] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                      STEREO
                    </span>
                  </div>
                  <div className="font-mono-tag text-[9px] text-white/80 font-bold">
                    巴涵笑 // BHX.DESIGN
                  </div>
                </motion.div>

                {/* Pink Halftone Block with Bold Letter "A" */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="col-span-7 bg-[#df96b6] relative p-6 flex flex-col justify-between overflow-hidden"
                >
                  <div className="absolute inset-0 bg-noise opacity-30" />
                  <div className="flex justify-between items-start z-10">
                    <span className="font-mono-tag text-xs font-bold text-black bg-white/80 px-2 py-0.5 rounded">
                      SIDE A // 01
                    </span>
                    <span className="w-3 h-3 rounded-full bg-[#2644F4]" />
                  </div>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                    className="text-center z-10 select-none"
                  >
                    <span className="text-8xl sm:text-9xl font-condensed font-black text-black leading-none tracking-tighter">
                      A
                    </span>
                  </motion.div>
                  <div className="font-mono-tag text-[10px] text-black/80 font-bold z-10 text-right">
                    HI-FIDELITY DESIGN ARCHIVE
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Interactive Collage Quote Stamp */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              className="mt-6 p-4 rounded-xl bg-white/60 dark:bg-white/5 border border-black/10 dark:border-white/10 font-mono-tag text-xs text-neutral-700 dark:text-neutral-300 flex items-center justify-between backdrop-blur-md"
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-[#2644F4]" />
                <span>"Great interface design makes complex technology feel like second nature."</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Editorial Narrative, Tags & Interactive Tabs with Staggered Entrance */}
          <div className="lg:col-span-6 space-y-6">
            {/* Monospace Reference Badges */}
            <motion.div
              custom={0}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-wrap gap-2"
            >
              <span className="px-3.5 py-1 bg-black/10 dark:bg-white/10 text-neutral-900 dark:text-white font-mono-tag text-xs font-bold border border-black/15 dark:border-white/20">
                [ABOUT THE DESIGNER]
              </span>
              <span className="px-3.5 py-1 bg-[#2644F4] text-white font-mono-tag text-xs font-bold shadow-sm shadow-[#2644F4]/30">
                [产品体验设计师 // PRODUCT EXPERIENCE DESIGNER]
              </span>
            </motion.div>

            {/* Big Headline with Editorial Stagger */}
            <motion.h3
              custom={1}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight leading-[1.15] text-neutral-900 dark:text-white"
            >
              {MANIFESTO.heading}
            </motion.h3>

            {/* Subheader & Monospace Body matching reference style */}
            <motion.div
              custom={2}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="space-y-4 font-mono-tag text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed border-l-2 border-[#2644F4] pl-4"
            >
              <p className="font-bold text-neutral-900 dark:text-white tracking-wider">
                DETAIL-DRIVEN. CRAFT-FOCUSED. AI-EMPOWERED.
              </p>
              <p>
                {MANIFESTO.body1}
              </p>
              <p>
                {MANIFESTO.body2}
              </p>
            </motion.div>

            {/* Interactive Tab Switcher for Philosophy / Skills / Stats */}
            <motion.div
              custom={3}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="pt-2"
            >
              <div className="flex gap-2 p-1 rounded-xl bg-black/10 dark:bg-white/5 border border-black/10 dark:border-white/10 max-w-fit backdrop-blur-md">
                <button
                  onClick={() => {
                    audio.playClick(600);
                    setActiveTab('philosophy');
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono-tag font-bold transition-all cursor-pointer ${
                    activeTab === 'philosophy'
                      ? 'bg-[#2644F4] text-white shadow-md shadow-[#2644F4]/30'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                  }`}
                >
                  PILLARS
                </button>
                <button
                  onClick={() => {
                    audio.playClick(680);
                    setActiveTab('skills');
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono-tag font-bold transition-all cursor-pointer ${
                    activeTab === 'skills'
                      ? 'bg-[#2644F4] text-white shadow-md shadow-[#2644F4]/30'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                  }`}
                >
                  TOOLSTACK & SKILLS
                </button>
                <button
                  onClick={() => {
                    audio.playClick(750);
                    setActiveTab('stats');
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono-tag font-bold transition-all cursor-pointer ${
                    activeTab === 'stats'
                      ? 'bg-[#2644F4] text-white shadow-md shadow-[#2644F4]/30'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                  }`}
                >
                  IMPACT NUMBERS
                </button>
              </div>

              {/* Tab Content Display with Layout Animation */}
              <div className="mt-4 min-h-[160px]">
                {activeTab === 'philosophy' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                  >
                    {MANIFESTO.badges.map((badge, idx) => (
                      <motion.div
                        key={badge}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: idx * 0.05 }}
                        className="p-3 rounded-xl bg-white/70 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center gap-2.5 hover:border-[#2644F4] transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#2644F4] shrink-0" />
                        <span className="font-mono-tag text-xs font-bold text-neutral-800 dark:text-neutral-200">
                          {badge}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {activeTab === 'skills' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3"
                  >
                    {DESIGN_SKILLS.map((grp, grpIdx) => (
                      <motion.div
                        key={grp.category}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.25, delay: grpIdx * 0.08 }}
                        className="space-y-1.5"
                      >
                        <span className="font-mono-tag text-[11px] text-[#2644F4] dark:text-[#8ba2ff] font-semibold uppercase">
                          {grp.category}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {grp.items.map((item) => (
                            <span
                              key={item}
                              className="px-2.5 py-1 rounded bg-white/80 dark:bg-white/10 border border-black/10 dark:border-white/10 text-xs font-mono-tag text-neutral-800 dark:text-neutral-200 hover:border-[#2644F4]"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {activeTab === 'stats' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-2 gap-3"
                  >
                    {stats.map((st, sIdx) => (
                      <motion.div
                        key={st.label}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: sIdx * 0.06 }}
                        className="p-3.5 rounded-xl bg-white/70 dark:bg-white/5 border border-black/10 dark:border-white/10"
                      >
                        <st.icon className="w-4 h-4 text-[#2644F4] mb-1" />
                        <div className="text-2xl sm:text-3xl font-condensed font-black text-neutral-900 dark:text-white">
                          {st.value}
                        </div>
                        <div className="font-mono-tag text-[10px] text-neutral-500">
                          {st.label}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Reference Yellow/Blue Pill Button: "WHY WE DO IT" */}
            <motion.div
              custom={4}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="pt-2 flex items-center gap-4"
            >
              <button
                id="why-we-do-it-btn"
                onClick={() => {
                  audio.playClick(850);
                  setShowManifestoModal(true);
                }}
                className="px-6 py-2.5 rounded-full bg-[#2644F4] hover:bg-[#1a37dd] text-white font-mono-tag font-bold text-xs tracking-wider transition-all hover:scale-105 active:scale-95 shadow-md shadow-[#2644F4]/30 flex items-center gap-2 cursor-pointer"
              >
                <span>WHY WE DO IT</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenContact}
                className="font-mono-tag text-xs text-neutral-600 dark:text-neutral-400 hover:text-[#2644F4] underline underline-offset-4 transition-colors cursor-pointer"
              >
                REQUEST DESIGN RESUME / PDF
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Philosophy Deep Dive Modal */}
      {showManifestoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="max-w-xl w-full bg-[#0e111a] border border-[#2644F4] p-6 sm:p-8 rounded-2xl shadow-2xl space-y-4 text-white">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[#2644F4]" />
                <span className="font-mono-tag font-bold text-sm text-white">
                  [DESIGN MANIFESTO & ETHOS]
                </span>
              </div>
              <button
                onClick={() => {
                  audio.playClick(500);
                  setShowManifestoModal(false);
                }}
                className="p-1 rounded text-neutral-400 hover:text-white font-mono-tag text-xs cursor-pointer"
              >
                [ESC / CLOSE]
              </button>
            </div>

            <h4 className="text-2xl font-display font-black text-white">
              Every detail is a promise kept to the user.
            </h4>

            <div className="font-mono-tag text-xs sm:text-sm text-neutral-300 space-y-3 leading-relaxed">
              <p>
                1. <strong>Tactility Over Flatness</strong>: Even in glass screens, human fingers crave feedback. We build micro-springs and auditory ticks that ground software in physical reality.
              </p>
              <p>
                2. <strong>Speed Is A Design Feature</strong>: A lag of 100ms breaks flow. Interfaces must respond synchronously to human intention.
              </p>
              <p>
                3. <strong>Editorial Soul</strong>: We reject bland cookie-cutter templates in favor of typographic drama, calculated tension, and unforgettable brand rhythm.
              </p>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => {
                  audio.playClick(600);
                  setShowManifestoModal(false);
                }}
                className="px-5 py-2 rounded-full bg-[#2644F4] text-white font-mono-tag font-bold text-xs hover:bg-[#1a37dd] cursor-pointer"
              >
                GOT IT // RETURN TO PORTFOLIO
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};


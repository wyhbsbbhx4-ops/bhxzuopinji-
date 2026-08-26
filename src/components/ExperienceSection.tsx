import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'motion/react';
import { MapPin, Calendar, CheckCircle, Award, Plus, Minus } from 'lucide-react';
import { EXPERIENCES } from '../data/portfolioData';
import { audio } from '../utils/audioSynth';

interface ExperienceSectionProps {
  darkMode: boolean;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: custom * 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ darkMode }) => {
  const [filter, setFilter] = useState<'All' | 'Full-time' | 'Agency' | 'Consulting'>('All');
  const [expandedId, setExpandedId] = useState<string | null>('exp-1');

  const filteredExperiences = EXPERIENCES.filter(item => {
    if (filter === 'All') return true;
    return item.type === filter;
  });

  const toggleExpand = (id: string) => {
    audio.playClick(620);
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <section
      id="experience"
      className="relative py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-black/10 dark:border-white/10 bg-noise overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Bar - Scroll Triggered */}
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
              02 // CAREER TIMELINE & WORK EXPERIENCE
            </span>
          </div>

          {/* Filter Pills with Scroll Reveal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="flex flex-wrap gap-2"
          >
            {(['All', 'Full-time', 'Agency', 'Consulting'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  audio.playClick(580);
                  setFilter(cat);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-mono-tag font-bold transition-all cursor-pointer ${
                  filter === cat
                    ? 'bg-[#2644F4] text-white shadow-md shadow-[#2644F4]/30 scale-105'
                    : 'bg-white/70 dark:bg-white/5 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white border border-black/10 dark:border-white/10'
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </motion.div>
        </motion.div>

        {/* Timeline List with Staggered Scroll-Triggered Cards */}
        <div className="mt-10 space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredExperiences.map((exp, index) => {
              const isExpanded = expandedId === exp.id;
              return (
                <motion.div
                  key={exp.id}
                  layout
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className={`rounded-2xl border transition-all duration-300 backdrop-blur-md ${
                    isExpanded
                      ? 'bg-white/90 dark:bg-[#131726] border-[#2644F4] shadow-xl shadow-[#2644F4]/10'
                      : 'bg-white/60 dark:bg-white/5 border-black/10 dark:border-white/10 hover:border-[#2644F4]/50 hover:bg-white/80 dark:hover:bg-white/10'
                  }`}
                >
                  {/* Collapsed Header Bar */}
                  <div
                    onClick={() => toggleExpand(exp.id)}
                    className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none"
                  >
                    <div className="flex items-start md:items-center gap-4">
                      <motion.div
                        whileHover={{ scale: 1.08, rotate: 3 }}
                        className="w-10 h-10 rounded-xl bg-[#2644F4]/10 dark:bg-white/10 border border-[#2644F4]/30 dark:border-white/10 flex items-center justify-center text-[#2644F4] dark:text-[#8ba2ff] font-mono-tag font-bold text-sm shrink-0"
                      >
                        {`0${index + 1}`}
                      </motion.div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-xl sm:text-2xl font-display font-black text-neutral-900 dark:text-white">
                            {exp.role}
                          </h3>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-tag font-bold bg-[#2644F4]/10 text-[#2644F4] dark:text-[#8ba2ff] border border-[#2644F4]/30">
                            {exp.type}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 mt-1 font-mono-tag text-xs text-neutral-600 dark:text-neutral-400">
                          <span className="font-bold text-neutral-900 dark:text-white">{exp.company}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {exp.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-4 pl-14 md:pl-0">
                      <div className="flex items-center gap-2 font-mono-tag text-xs text-neutral-600 dark:text-neutral-400 bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10">
                        <Calendar className="w-3.5 h-3.5 text-[#2644F4]" />
                        <span>{exp.period}</span>
                      </div>

                      <div
                        className="w-8 h-8 rounded-full border border-neutral-300 dark:border-white/20 flex items-center justify-center text-neutral-700 dark:text-neutral-300 hover:text-white hover:bg-[#2644F4] hover:border-[#2644F4] transition-colors"
                        aria-label={isExpanded ? 'Collapse' : 'Expand'}
                      >
                        {isExpanded ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content Drawer */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="px-6 sm:px-8 pb-8 pt-2 border-t border-black/10 dark:border-white/10 space-y-6"
                    >
                      <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.05 }}
                        className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal"
                      >
                        {exp.description}
                      </motion.p>

                      {/* Key Achievements Bullet Points with Staggered Entrance */}
                      <div className="space-y-2.5">
                        <span className="font-mono-tag text-xs text-[#2644F4] dark:text-[#8ba2ff] uppercase font-bold tracking-wider">
                          // KEY CONTRIBUTIONS & IMPACT
                        </span>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {exp.highlights.map((h, hIdx) => (
                            <motion.div
                              key={hIdx}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.25, delay: 0.1 + hIdx * 0.06 }}
                              className="p-3.5 rounded-xl bg-white/80 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 flex items-start gap-2.5 hover:border-[#2644F4]/40 transition-colors"
                            >
                              <CheckCircle className="w-4 h-4 text-[#2644F4] shrink-0 mt-0.5" />
                              <span className="leading-snug">{h}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Skills & Metric Badge */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className="flex flex-wrap items-center justify-between gap-4 pt-2"
                      >
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="font-mono-tag text-[11px] text-neutral-500 mr-2">TECH / STACK:</span>
                          {exp.skills.map((sk) => (
                            <span
                              key={sk}
                              className="px-2.5 py-1 rounded bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 text-[11px] font-mono-tag text-neutral-700 dark:text-neutral-300"
                            >
                              {sk}
                            </span>
                          ))}
                        </div>

                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2644F4] text-white font-mono-tag text-xs font-bold shadow-md shadow-[#2644F4]/30">
                          <Award className="w-3.5 h-3.5" />
                          <span>{exp.metric}</span>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

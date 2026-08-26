import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowUpRight, Sliders, ExternalLink, Layers, Eye } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project, ProjectCategory } from '../types';
import { audio } from '../utils/audioSynth';

interface ProjectsSectionProps {
  darkMode: boolean;
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ darkMode, onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  const categories: { label: string; value: ProjectCategory }[] = [
    { label: 'ALL WORK', value: 'all' },
    { label: 'PRODUCT / UI', value: 'product-ui' },
    { label: 'INTERACTION & AUDIO', value: 'interaction' },
    { label: 'DESIGN SYSTEMS', value: 'design-system' },
    { label: 'SPATIAL & CREATIVE TECH', value: 'creative-tech' },
  ];

  const filteredProjects = PROJECTS.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  return (
    <section
      id="projects"
      className="relative py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-black/10 dark:border-white/10 bg-noise"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header and Filter Pills */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-black/10 dark:border-white/10">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 bg-[#2644F4] rounded-none rotate-45" />
              <span className="font-mono-tag text-xs sm:text-sm tracking-widest uppercase text-neutral-600 dark:text-neutral-400 font-bold">
                03 // FEATURED CASE STUDIES & SHIPPED SYSTEMS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-neutral-900 dark:text-white">
              Selected Digital Artifacts
            </h2>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                id={`filter-pill-${cat.value}`}
                onClick={() => {
                  audio.playClick(600);
                  setSelectedCategory(cat.value);
                }}
                onMouseEnter={() => audio.playHoverTone(500)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono-tag font-bold tracking-wider transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat.value
                    ? 'bg-[#2644F4] text-white shadow-md shadow-[#2644F4]/30 scale-105'
                    : 'bg-white/70 dark:bg-white/5 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white border border-black/10 dark:border-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-stretch">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              // Asymmetric editorial span: alternate between 7 cols and 5 cols
              const spanClass = index % 3 === 0 ? 'lg:col-span-7' : index % 3 === 1 ? 'lg:col-span-5' : 'lg:col-span-12';

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  className={`${spanClass} group relative flex flex-col justify-between rounded-2xl bg-white/70 dark:bg-[#131726]/80 border border-black/10 dark:border-white/10 hover:border-[#2644F4] transition-all duration-300 overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-[#2644F4]/10 cursor-pointer backdrop-blur-md`}
                  onClick={() => {
                    audio.playClick(750);
                    onSelectProject(project);
                  }}
                  onMouseEnter={() => {
                    setHoveredProjectId(project.id);
                    audio.playHoverTone(440);
                  }}
                  onMouseLeave={() => setHoveredProjectId(null)}
                >
                  {/* Top Metadata Bar */}
                  <div className="p-5 sm:p-6 flex items-center justify-between border-b border-black/10 dark:border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="font-mono-tag text-xs font-black text-[#2644F4] dark:text-[#8ba2ff]">
                        [{project.year}]
                      </span>
                      <span className="font-mono-tag text-xs text-neutral-600 dark:text-neutral-400 uppercase font-semibold">
                        // {project.client}
                      </span>
                    </div>

                    <div className="w-8 h-8 rounded-full border border-black/15 dark:border-white/20 group-hover:border-[#2644F4] group-hover:bg-[#2644F4] group-hover:text-white flex items-center justify-center transition-all duration-200 text-neutral-800 dark:text-neutral-200">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Project Image & Live Overlay */}
                  <div className="relative h-64 sm:h-72 lg:h-80 w-full overflow-hidden bg-neutral-950">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter group-hover:contrast-105"
                    />
                    
                    {/* Hover Tint Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-xs">
                      <span className="px-5 py-2.5 rounded-full bg-[#2644F4] text-white font-mono-tag font-bold text-xs tracking-wider flex items-center gap-2 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <Eye className="w-4 h-4" />
                        <span>OPEN PROJECT PAGE & GALLERY</span>
                      </span>
                    </div>

                    {/* Metric pill badge anchored at bottom */}
                    {project.metrics.length > 0 && (
                      <div className="absolute bottom-4 left-4 bg-black/85 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/20 font-mono-tag text-xs text-white flex items-center gap-2">
                        <span className="text-[#2644F4] dark:text-[#8ba2ff] font-black">{project.metrics[0].value}</span>
                        <span className="text-neutral-300">{project.metrics[0].label}</span>
                      </div>
                    )}

                    {/* Image Count Badge */}
                    {project.gallery && (
                      <div className="absolute top-4 right-4 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 font-mono-tag text-[10px] text-white flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2644F4]" />
                        <span>{project.gallery.length} ARTIFACTS</span>
                      </div>
                    )}
                  </div>

                  {/* Bottom Text Content */}
                  <div className="p-6 sm:p-8 space-y-4">
                    <div>
                      <span className="font-mono-tag text-[10px] uppercase font-bold text-[#2644F4] dark:text-[#8ba2ff] tracking-wider">
                        {project.categoryLabel}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-display font-black text-neutral-900 dark:text-white group-hover:text-[#2644F4] dark:group-hover:text-[#6882ff] transition-colors leading-tight">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-normal line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    {/* Tags List */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 text-[11px] font-mono-tag text-neutral-700 dark:text-neutral-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

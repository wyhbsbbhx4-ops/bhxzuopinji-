import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Sliders,
  Maximize2,
  ExternalLink,
  Layers,
  Quote,
  Eye,
  Check,
  Share2,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Grid,
  List,
  Compass,
  CornerDownRight
} from 'lucide-react';
import { Project, ProjectImage } from '../types';
import { PROJECTS } from '../data/portfolioData';
import { audio } from '../utils/audioSynth';
import { ImageLightboxModal } from './ImageLightboxModal';

interface ProjectDetailPageProps {
  project: Project;
  darkMode: boolean;
  setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  isMuted: boolean;
  setIsMuted: (val: boolean | ((prev: boolean) => boolean)) => void;
  onBackToHome: () => void;
  onSelectProject: (proj: Project) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  project,
  darkMode,
  setDarkMode,
  isMuted,
  setIsMuted,
  onBackToHome,
  onSelectProject,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [activeGalleryFilter, setActiveGalleryFilter] = useState<string>('all');
  const [galleryViewMode, setGalleryViewMode] = useState<'bento' | 'stream'>('bento');
  const [copiedLink, setCopiedLink] = useState(false);

  // Interactive prototype state
  const [knobVal1, setKnobVal1] = useState(65);
  const [knobVal2, setKnobVal2] = useState(40);
  const [selectedTokenIndex, setSelectedTokenIndex] = useState(0);

  // Find next and previous projects
  const currentIndex = PROJECTS.findIndex((p) => p.id === project.id);
  const prevProject = PROJECTS[(currentIndex - 1 + PROJECTS.length) % PROJECTS.length];
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  const galleryImages: ProjectImage[] = project.gallery || [
    {
      id: `${project.id}-cover`,
      url: project.coverImage,
      title: `${project.title} // Primary Overview`,
      caption: project.description,
      category: 'ui',
      categoryLabel: 'Hero View',
      aspectRatio: 'landscape',
    },
  ];

  const filteredGallery = galleryImages.filter((img) => {
    if (activeGalleryFilter === 'all') return true;
    return img.category === activeGalleryFilter;
  });

  const availableCategories = Array.from(new Set(galleryImages.map((img) => img.category)));

  // Scroll to top on project mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [project.id]);

  const handleKnobChange = (val: number, isFreq: boolean) => {
    if (isFreq) {
      setKnobVal1(val);
      audio.playFrequency(200 + val * 10);
    } else {
      setKnobVal2(val);
      audio.playFrequency(400 + val * 8);
    }
  };

  const handleShare = () => {
    audio.playLaser();
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#0d101a] text-white' : 'bg-[#f4f6fb] text-[#111111]'} transition-colors duration-300 font-sans`}>
      {/* Sticky Project Detail Top Navbar */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 dark:bg-[#0d101a]/85 border-b border-black/10 dark:border-white/10 px-4 sm:px-6 lg:px-8 py-3.5 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Back Button & Breadcrumbs */}
          <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
            <button
              onClick={() => {
                audio.playClick(500);
                onBackToHome();
              }}
              className="px-3.5 py-1.5 rounded-full bg-[#2644F4] hover:bg-[#1a37dd] text-white font-mono-tag text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-[#2644F4]/30 shrink-0 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>RETURN TO INDEX</span>
            </button>

            <div className="hidden md:flex items-center gap-2 font-mono-tag text-xs text-neutral-500 dark:text-neutral-400 truncate">
              <span>INDEX</span>
              <span>//</span>
              <span>PROJECTS</span>
              <span>//</span>
              <span className="text-neutral-900 dark:text-white font-bold truncate">
                {project.title}
              </span>
            </div>
          </div>

          {/* Right Navigation & Utility Controls */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Prev / Next Switchers */}
            <div className="flex items-center rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-0.5">
              <button
                onClick={() => {
                  audio.playClick(600);
                  onSelectProject(prevProject);
                }}
                className="p-1.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 text-neutral-600 dark:text-neutral-300 transition-colors cursor-pointer"
                title={`Previous: ${prevProject.title}`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
              <span className="px-2 font-mono-tag text-[11px] text-neutral-500 dark:text-neutral-400">
                {currentIndex + 1} / {PROJECTS.length}
              </span>
              <button
                onClick={() => {
                  audio.playClick(600);
                  onSelectProject(nextProject);
                }}
                className="p-1.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 text-neutral-600 dark:text-neutral-300 transition-colors cursor-pointer"
                title={`Next: ${nextProject.title}`}
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer"
              title="Share Project URL"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Sound Toggle */}
            <button
              onClick={() => {
                const nextMute = !isMuted;
                setIsMuted(nextMute);
                audio.setMute(nextMute);
              }}
              className="p-2 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer"
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-neutral-400" /> : <Volume2 className="w-4 h-4 text-[#2644F4] dark:text-[#8ba2ff]" />}
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={() => {
                audio.playClick(800);
                setDarkMode((prev) => !prev);
              }}
              className="p-2 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer"
              title="Toggle Theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Project Hero Presentation */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-black/10 dark:border-white/10 bg-noise">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Top Meta Tags */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 rounded-full bg-[#2644F4] text-white font-mono-tag text-xs font-bold shadow-sm">
              // {project.categoryLabel}
            </span>
            <span className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 text-neutral-700 dark:text-neutral-300 font-mono-tag text-xs font-medium border border-black/10 dark:border-white/10">
              CLIENT: {project.client}
            </span>
            <span className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 text-neutral-700 dark:text-neutral-300 font-mono-tag text-xs font-medium border border-black/10 dark:border-white/10">
              RELEASE: {project.year}
            </span>
          </div>

          {/* Project Title and Tagline */}
          <div className="space-y-4 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight leading-none text-neutral-900 dark:text-white">
              {project.title}
            </h1>
            <p className="text-lg sm:text-xl text-neutral-700 dark:text-neutral-300 font-medium leading-relaxed">
              {project.tagline}
            </p>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
            {project.metrics.map((m, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/80 dark:bg-[#131726]/90 border border-black/10 dark:border-white/10 shadow-sm space-y-1 backdrop-blur-md"
              >
                <div className="text-3xl sm:text-4xl font-display font-black text-[#2644F4] dark:text-[#8ba2ff]">
                  {m.value}
                </div>
                <div className="font-mono-tag text-xs text-neutral-600 dark:text-neutral-400 font-medium">
                  {m.label} {m.change && <span className="text-emerald-500 font-bold ml-1">({m.change})</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Anchor Navigation */}
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-black/10 dark:border-white/10">
            <span className="font-mono-tag text-xs text-neutral-500 dark:text-neutral-400 mr-2">
              JUMP TO SECTION:
            </span>
            <a
              href="#gallery-section"
              className="px-3.5 py-1.5 rounded-lg bg-white/70 dark:bg-white/5 hover:bg-[#2644F4] hover:text-white dark:hover:bg-[#2644F4] border border-black/10 dark:border-white/10 text-xs font-mono-tag font-bold transition-all"
            >
              [01. IMAGE GALLERY ({galleryImages.length})]
            </a>
            <a
              href="#case-study"
              className="px-3.5 py-1.5 rounded-lg bg-white/70 dark:bg-white/5 hover:bg-[#2644F4] hover:text-white dark:hover:bg-[#2644F4] border border-black/10 dark:border-white/10 text-xs font-mono-tag font-bold transition-all"
            >
              [02. CASE STUDY & SYSTEM]
            </a>
            <a
              href="#prototype-sandbox"
              className="px-3.5 py-1.5 rounded-lg bg-white/70 dark:bg-white/5 hover:bg-[#2644F4] hover:text-white dark:hover:bg-[#2644F4] border border-black/10 dark:border-white/10 text-xs font-mono-tag font-bold transition-all"
            >
              [03. LIVE PROTOTYPE]
            </a>
          </div>
        </div>
      </section>

      {/* 01. IMAGE GALLERY & VISUAL SHOWCASE (核心图片画廊) */}
      <section id="gallery-section" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-black/20">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Gallery Section Header & Filter Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-black/10 dark:border-white/10">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#2644F4] rounded-sm" />
                <span className="font-mono-tag text-xs font-bold uppercase tracking-widest text-neutral-600 dark:text-neutral-400">
                  01 // VISUAL ARTIFACTS & SCREEN GALLERY
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-black text-neutral-900 dark:text-white">
                Project Image Gallery
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-xl">
                Click any image below to trigger the interactive high-resolution Lightbox Inspector with zoom, raw views, and detailed design rationale.
              </p>
            </div>

            {/* Gallery Category Filter & View Mode */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Category Pills */}
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => {
                    audio.playClick(600);
                    setActiveGalleryFilter('all');
                  }}
                  className={`px-3 py-1.5 rounded-full font-mono-tag text-xs font-bold transition-all cursor-pointer ${
                    activeGalleryFilter === 'all'
                      ? 'bg-[#2644F4] text-white shadow-md shadow-[#2644F4]/30'
                      : 'bg-white/80 dark:bg-white/5 text-neutral-700 dark:text-neutral-300 border border-black/10 dark:border-white/10'
                  }`}
                >
                  ALL ({galleryImages.length})
                </button>
                {availableCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      audio.playClick(600);
                      setActiveGalleryFilter(cat);
                    }}
                    className={`px-3 py-1.5 rounded-full font-mono-tag text-xs font-bold uppercase transition-all cursor-pointer ${
                      activeGalleryFilter === cat
                        ? 'bg-[#2644F4] text-white shadow-md shadow-[#2644F4]/30'
                        : 'bg-white/80 dark:bg-white/5 text-neutral-700 dark:text-neutral-300 border border-black/10 dark:border-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* View Layout Switcher */}
              <div className="flex items-center rounded-lg bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 p-1">
                <button
                  onClick={() => {
                    audio.playClick(600);
                    setGalleryViewMode('bento');
                  }}
                  className={`p-1.5 rounded ${galleryViewMode === 'bento' ? 'bg-[#2644F4] text-white' : 'text-neutral-500 dark:text-neutral-400'}`}
                  title="Bento Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    audio.playClick(600);
                    setGalleryViewMode('stream');
                  }}
                  className={`p-1.5 rounded ${galleryViewMode === 'stream' ? 'bg-[#2644F4] text-white' : 'text-neutral-500 dark:text-neutral-400'}`}
                  title="Large Stream View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Gallery Images Grid */}
          <div
            className={
              galleryViewMode === 'bento'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6'
                : 'space-y-12'
            }
          >
            {filteredGallery.map((img, idx) => {
              const spanClass =
                galleryViewMode === 'stream'
                  ? 'w-full'
                  : img.aspectRatio === 'ultrawide'
                  ? 'lg:col-span-12'
                  : idx % 3 === 0
                  ? 'lg:col-span-7'
                  : idx % 3 === 1
                  ? 'lg:col-span-5'
                  : 'lg:col-span-6';

              return (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  className={`${spanClass} group relative rounded-2xl overflow-hidden bg-white dark:bg-[#131726] border border-black/10 dark:border-white/10 shadow-md hover:shadow-2xl hover:border-[#2644F4] transition-all duration-300 flex flex-col justify-between cursor-pointer`}
                  onClick={() => {
                    audio.playClick(700);
                    setSelectedImageIndex(idx);
                  }}
                >
                  {/* Top Bar on Image Card */}
                  <div className="p-4 flex items-center justify-between border-b border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02]">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-[#2644F4] text-white font-mono-tag text-[10px] uppercase font-bold">
                        {img.categoryLabel}
                      </span>
                      <span className="font-mono-tag text-xs text-neutral-500 dark:text-neutral-400">
                        FIG. {String(idx + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <div className="w-7 h-7 rounded-full bg-black/5 dark:bg-white/10 group-hover:bg-[#2644F4] group-hover:text-white flex items-center justify-center text-neutral-600 dark:text-neutral-300 transition-colors">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Image Display */}
                  <div className="relative overflow-hidden bg-neutral-950 flex items-center justify-center min-h-[260px] sm:min-h-[340px]">
                    <img
                      src={img.url}
                      alt={img.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Hover Prompt */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-xs">
                      <span className="px-4 py-2 rounded-full bg-[#2644F4] text-white font-mono-tag text-xs font-bold tracking-wider flex items-center gap-2 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <Eye className="w-4 h-4" />
                        <span>CLICK TO INSPECT FULLSCREEN</span>
                      </span>
                    </div>
                  </div>

                  {/* Caption & Description */}
                  <div className="p-5 space-y-1.5 bg-white/90 dark:bg-[#131726]/90 backdrop-blur-md">
                    <h3 className="font-display font-bold text-base sm:text-lg text-neutral-900 dark:text-white group-hover:text-[#2644F4] dark:group-hover:text-[#8ba2ff] transition-colors">
                      {img.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
                      {img.caption}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 02. IN-DEPTH CASE STUDY & DESIGN SYSTEM (深度案例与设计规范) */}
      <section id="case-study" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-black/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Section Heading */}
          <div className="space-y-2 pb-6 border-b border-black/10 dark:border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#2644F4] rounded-sm" />
              <span className="font-mono-tag text-xs font-bold uppercase tracking-widest text-neutral-600 dark:text-neutral-400">
                02 // DESIGN PHILOSOPHY & ARCHITECTURAL FOUNDATION
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-neutral-900 dark:text-white">
              The Architecture & Process
            </h2>
          </div>

          {/* Challenge & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-white dark:bg-[#131726] border border-black/10 dark:border-white/10 shadow-sm space-y-4">
              <div className="flex items-center gap-2 font-mono-tag text-xs font-bold text-rose-500 uppercase tracking-wider">
                <CornerDownRight className="w-4 h-4" />
                <span>// THE DESIGN CHALLENGE</span>
              </div>
              <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
                {project.challenge}
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-[#131726] border border-black/10 dark:border-white/10 shadow-sm space-y-4">
              <div className="flex items-center gap-2 font-mono-tag text-xs font-bold text-[#2644F4] dark:text-[#8ba2ff] uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>// ARCHITECTED SOLUTION</span>
              </div>
              <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Key Features List */}
          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 dark:text-white">
              Core Architectural Highlights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {project.keyFeatures.map((feat, fIdx) => (
                <div
                  key={fIdx}
                  className="p-6 rounded-2xl bg-white/70 dark:bg-[#131726]/80 border border-black/10 dark:border-white/10 shadow-sm space-y-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#2644F4]/10 text-[#2644F4] dark:text-[#8ba2ff] font-mono-tag font-bold text-xs flex items-center justify-center">
                    0{fIdx + 1}
                  </div>
                  <h4 className="font-display font-bold text-lg text-neutral-900 dark:text-white">
                    {feat.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Design System Blueprint */}
          <div className="p-8 rounded-2xl bg-white dark:bg-[#131726] border border-black/10 dark:border-white/10 shadow-lg space-y-8">
            <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#2644F4]" />
                <span className="font-mono-tag text-sm font-bold text-neutral-900 dark:text-white">
                  DESIGN SYSTEM // TOKENS & BLUEPRINT
                </span>
              </div>
              <span className="font-mono-tag text-xs text-neutral-500">
                AAA ACCESSIBILITY COMPLIANT
              </span>
            </div>

            {/* Colors */}
            <div className="space-y-3">
              <span className="font-mono-tag text-xs text-neutral-500 uppercase font-bold">
                COLOR PALETTE SWATCHES
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {project.designSystem.colors.map((c, cIdx) => (
                  <div
                    key={c.name}
                    onClick={() => {
                      audio.playClick(700);
                      setSelectedTokenIndex(cIdx);
                    }}
                    className="p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 space-y-2.5 cursor-pointer hover:border-[#2644F4] transition-all"
                  >
                    <div
                      className="w-full h-12 rounded-lg shadow-inner border border-black/10 dark:border-white/10"
                      style={{ backgroundColor: c.hex }}
                    />
                    <div className="font-mono-tag text-xs font-bold text-neutral-900 dark:text-white">
                      {c.name}
                    </div>
                    <div className="font-mono-tag text-[10px] text-neutral-500">
                      {c.hex}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography & Components */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-black/10 dark:border-white/10">
              <div className="space-y-3">
                <span className="font-mono-tag text-xs text-[#2644F4] dark:text-[#8ba2ff] uppercase font-bold">
                  // TYPOGRAPHY HIERARCHY
                </span>
                <ul className="space-y-2 font-mono-tag text-xs text-neutral-700 dark:text-neutral-300">
                  {project.designSystem.typography.map((font) => (
                    <li key={font} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2644F4]" />
                      <span>{font}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <span className="font-mono-tag text-xs text-[#2644F4] dark:text-[#8ba2ff] uppercase font-bold">
                  // ATOMIC COMPONENT SPECIMEN
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.designSystem.components.map((comp) => (
                    <span
                      key={comp}
                      className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 font-mono-tag text-xs text-neutral-700 dark:text-neutral-300"
                    >
                      {comp}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial if available */}
          {project.testimonial && (
            <div className="p-8 rounded-2xl bg-[#2644F4]/10 border border-[#2644F4]/30 space-y-4">
              <Quote className="w-8 h-8 text-[#2644F4] dark:text-[#8ba2ff]" />
              <p className="text-xl sm:text-2xl italic font-display text-neutral-900 dark:text-white leading-relaxed">
                "{project.testimonial.quote}"
              </p>
              <div className="font-mono-tag text-xs text-[#2644F4] dark:text-[#8ba2ff] font-bold">
                {project.testimonial.author} — {project.testimonial.role}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 03. INTERACTIVE PROTOTYPE SANDBOX (可交互原型探索) */}
      <section id="prototype-sandbox" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-black/10 dark:border-white/10 bg-noise">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="space-y-2 pb-6 border-b border-black/10 dark:border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#2644F4] rounded-sm" />
              <span className="font-mono-tag text-xs font-bold uppercase tracking-widest text-neutral-600 dark:text-neutral-400">
                03 // LIVE EXPERIMENTAL LAB
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-neutral-900 dark:text-white">
              Interactive Micro-Sandbox
            </h2>
          </div>

          <div className="p-8 rounded-2xl bg-white dark:bg-[#131726] border border-black/10 dark:border-white/10 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-[#2644F4]" />
                <span className="font-mono-tag text-sm font-bold text-neutral-900 dark:text-white">
                  REAL-TIME SYNTHESIS & HAPTIC FEEDBACK // {project.title}
                </span>
              </div>
              <span className="font-mono-tag text-xs text-[#2644F4] dark:text-[#8ba2ff] animate-pulse">
                ● WEBAUDIO ACTIVE
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-4">
              <div className="p-6 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 space-y-4">
                <div className="flex justify-between items-center font-mono-tag text-xs">
                  <span className="text-neutral-600 dark:text-neutral-400">FREQUENCY HARMONIC OSCILLATOR</span>
                  <span className="text-[#2644F4] dark:text-[#8ba2ff] font-bold">{knobVal1}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={knobVal1}
                  onChange={(e) => handleKnobChange(Number(e.target.value), true)}
                  className="w-full accent-[#2644F4] cursor-pointer"
                />
                <div className="h-16 rounded-lg bg-neutral-950 flex items-center justify-center overflow-hidden relative">
                  <div
                    className="h-full bg-[#2644F4] opacity-80 transition-all"
                    style={{ width: `${knobVal1}%` }}
                  />
                  <span className="absolute font-mono-tag text-[10px] font-bold text-white">
                    SPECTRAL BAND: {200 + knobVal1 * 12}Hz
                  </span>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 space-y-4">
                <div className="flex justify-between items-center font-mono-tag text-xs">
                  <span className="text-neutral-600 dark:text-neutral-400">REVERB & TAPE SATURATION</span>
                  <span className="text-[#2644F4] dark:text-[#8ba2ff] font-bold">{knobVal2}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={knobVal2}
                  onChange={(e) => handleKnobChange(Number(e.target.value), false)}
                  className="w-full accent-[#2644F4] cursor-pointer"
                />
                <div className="h-16 rounded-lg bg-neutral-950 flex items-center justify-center overflow-hidden relative">
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
          </div>
        </div>
      </section>

      {/* Next Project Teaser Banner (下一个项目推荐) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/[0.03] dark:bg-black/40">
        <div className="max-w-7xl mx-auto">
          <div
            onClick={() => {
              audio.playClick(850);
              onSelectProject(nextProject);
            }}
            className="group relative rounded-3xl overflow-hidden bg-white dark:bg-[#131726] border border-black/10 dark:border-white/10 p-8 sm:p-12 shadow-xl hover:border-[#2644F4] transition-all cursor-pointer flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="space-y-4 max-w-xl">
              <span className="font-mono-tag text-xs font-bold text-[#2644F4] dark:text-[#8ba2ff] tracking-widest uppercase">
                // UP NEXT IN ARCHIVE
              </span>
              <h3 className="text-3xl sm:text-4xl font-display font-black text-neutral-900 dark:text-white group-hover:text-[#2644F4] dark:group-hover:text-[#8ba2ff] transition-colors">
                {nextProject.title}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                {nextProject.description}
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-2 font-mono-tag text-xs font-bold text-neutral-900 dark:text-white group-hover:translate-x-2 transition-transform">
                  <span>EXPLORE NEXT CASE STUDY</span>
                  <ArrowRight className="w-4 h-4 text-[#2644F4]" />
                </span>
              </div>
            </div>

            <div className="w-full md:w-80 h-48 rounded-2xl overflow-hidden bg-neutral-950 shrink-0 border border-black/10 dark:border-white/10">
              <img
                src={nextProject.coverImage}
                alt={nextProject.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal if any image is clicked */}
      {selectedImageIndex !== null && (
        <ImageLightboxModal
          images={filteredGallery}
          initialIndex={selectedImageIndex}
          onClose={() => setSelectedImageIndex(null)}
          projectTitle={project.title}
        />
      )}
    </div>
  );
};

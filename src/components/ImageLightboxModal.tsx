import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2, Download, Copy, Check, Sparkles } from 'lucide-react';
import { ProjectImage } from '../types';
import { audio } from '../utils/audioSynth';

interface ImageLightboxModalProps {
  images: ProjectImage[];
  initialIndex: number;
  onClose: () => void;
  projectTitle: string;
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({
  images,
  initialIndex,
  onClose,
  projectTitle
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [copied, setCopied] = useState(false);

  const currentImage = images[currentIndex] || images[0];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, images.length]);

  const handleNext = () => {
    audio.playClick(650);
    setZoomLevel(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    audio.playClick(550);
    setZoomLevel(1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const toggleZoom = () => {
    audio.playClick(700);
    setZoomLevel((prev) => (prev === 1 ? 1.75 : 1));
  };

  const handleCopyLink = () => {
    audio.playLaser();
    navigator.clipboard.writeText(currentImage.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!currentImage) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-xl text-white select-none">
        {/* Top Control Bar */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between bg-black/50 shrink-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#2644F4] text-white flex items-center justify-center font-bold text-xs shadow-md shadow-[#2644F4]/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono-tag text-xs font-bold text-[#2644F4] dark:text-[#8ba2ff]">
                  [{projectTitle}]
                </span>
                <span className="font-mono-tag text-xs text-neutral-400">
                  • IMAGE {currentIndex + 1} OF {images.length}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-display font-bold text-white truncate max-w-xs sm:max-w-md">
                {currentImage.title}
              </h3>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={toggleZoom}
              className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-neutral-200 hover:text-white transition-all font-mono-tag text-xs flex items-center gap-1.5 cursor-pointer"
              title="Toggle Zoom"
            >
              {zoomLevel > 1 ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
              <span className="hidden sm:inline">{zoomLevel > 1 ? '100%' : '175%'}</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-white/10 hover:bg-[#2644F4] text-neutral-200 hover:text-white transition-all font-mono-tag text-xs flex items-center gap-1.5 cursor-pointer"
              title="Copy Image URL"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span className="hidden sm:inline">{copied ? 'COPIED' : 'COPY URL'}</span>
            </button>

            <a
              href={currentImage.url}
              target="_blank"
              rel="noreferrer"
              className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-neutral-200 hover:text-white transition-all font-mono-tag text-xs flex items-center gap-1.5 cursor-pointer"
              title="Open Raw Image"
            >
              <Maximize2 className="w-4 h-4" />
              <span className="hidden sm:inline">RAW VIEW</span>
            </a>

            <button
              onClick={() => {
                audio.playClick(450);
                onClose();
              }}
              className="p-2 rounded-full bg-white/10 hover:bg-red-500/80 text-white transition-colors cursor-pointer ml-2"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Center Main Stage */}
        <div className="relative flex-1 flex items-center justify-center p-4 sm:p-8 overflow-hidden">
          {/* Previous Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 z-20 p-3 rounded-full bg-black/60 hover:bg-[#2644F4] text-white border border-white/20 hover:border-transparent transition-all cursor-pointer shadow-2xl backdrop-blur-md group"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-0.5" />
          </button>

          {/* Next Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 z-20 p-3 rounded-full bg-black/60 hover:bg-[#2644F4] text-white border border-white/20 hover:border-transparent transition-all cursor-pointer shadow-2xl backdrop-blur-md group"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-0.5" />
          </button>

          {/* Active Image with Motion Transition */}
          <motion.div
            key={currentImage.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: zoomLevel }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="max-w-6xl max-h-[72vh] flex items-center justify-center cursor-zoom-in overflow-auto rounded-xl shadow-2xl border border-white/10"
            onClick={toggleZoom}
          >
            <img
              src={currentImage.url}
              alt={currentImage.title}
              className="max-h-[70vh] w-auto max-w-full object-contain rounded-lg transition-transform duration-300"
            />
          </motion.div>
        </div>

        {/* Bottom Caption & Thumbnail Strip */}
        <div className="p-4 sm:p-6 border-t border-white/10 bg-black/80 backdrop-blur-md shrink-0 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Caption Text */}
          <div className="max-w-2xl text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
              <span className="px-2 py-0.5 rounded bg-[#2644F4] text-white font-mono-tag text-[10px] uppercase font-bold tracking-wider">
                {currentImage.categoryLabel}
              </span>
              <span className="text-xs font-bold font-display text-white">
                {currentImage.title}
              </span>
            </div>
            <p className="text-xs text-neutral-300 font-normal leading-relaxed">
              {currentImage.caption}
            </p>
          </div>

          {/* Thumbnail Strip */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-full py-1">
            {images.map((img, idx) => (
              <button
                key={img.id}
                onClick={() => {
                  audio.playClick(600);
                  setZoomLevel(1);
                  setCurrentIndex(idx);
                }}
                className={`relative w-14 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                  currentIndex === idx
                    ? 'border-[#2644F4] scale-110 shadow-lg shadow-[#2644F4]/50'
                    : 'border-white/20 opacity-50 hover:opacity-100'
                }`}
              >
                <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
};

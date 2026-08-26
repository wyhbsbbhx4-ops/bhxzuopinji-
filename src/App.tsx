import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { BeyondDesignSection } from './components/BeyondDesignSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectDetailPage } from './components/ProjectDetailPage';
import { IntroLoader } from './components/IntroLoader';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { Project } from './types';
import { PROJECTS } from './data/portfolioData';

export default function App() {
  const [hasLoadedIntro, setHasLoadedIntro] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMuted, setIsMuted] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Apply light-mode class to body or root element
  useEffect(() => {
    if (!darkMode) {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
  }, [darkMode]);

  // Handle URL hash routing (e.g., #/project/pulse-os)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/project/') || hash.startsWith('#project-')) {
        const projectId = hash.replace('#/project/', '').replace('#project-', '');
        const found = PROJECTS.find((p) => p.id === projectId);
        if (found) {
          setSelectedProject(found);
          return;
        }
      }
      // If returning to home or an anchor
      if (!hash.includes('project')) {
        setSelectedProject(null);
      }
    };

    // Initial check on mount
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Track active section for navbar highlighting on home page
  useEffect(() => {
    if (selectedProject) return; // Skip when on project detail page

    const handleScroll = () => {
      const sections = ['hero', 'about', 'experience', 'projects', 'beyond', 'contact'];
      const scrollPosition = window.scrollY + 250;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedProject]);

  const handleNavigate = (sectionId: string) => {
    if (selectedProject) {
      setSelectedProject(null);
      window.location.hash = sectionId;
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenProjectPage = (proj: Project) => {
    setSelectedProject(proj);
    window.location.hash = `#/project/${proj.id}`;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleBackToHome = () => {
    setSelectedProject(null);
    window.location.hash = 'projects';
    setTimeout(() => {
      const el = document.getElementById('projects');
      if (el) {
        el.scrollIntoView({ behavior: 'instant' });
      }
    }, 50);
  };

  // If a project is selected, render the dedicated Project Detail & Image Gallery Page
  if (selectedProject) {
    return (
      <>
        <ScrollProgressBar />
        <ProjectDetailPage
          project={selectedProject}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          isMuted={isMuted}
          setIsMuted={setIsMuted}
          onBackToHome={handleBackToHome}
          onSelectProject={handleOpenProjectPage}
        />
      </>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#121212] text-white' : 'bg-[#f5f4ef] text-[#111111]'} transition-colors duration-300`}>
      {/* Fixed Viewport Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* 0. Pixel Opening Loader (PORTFOLIO OS) */}
      {!hasLoadedIntro && (
        <IntroLoader onComplete={() => setHasLoadedIntro(true)} />
      )}

      {/* Sticky Editorial Navbar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        activeSection={activeSection}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
      />

      {/* 1. 封面 (Hero / Cover) */}
      <HeroSection
        darkMode={darkMode}
        onNavigate={handleNavigate}
      />

      {/* 2. 个人介绍 (About / Bio & Manifesto) */}
      <AboutSection
        darkMode={darkMode}
        onOpenContact={() => handleNavigate('contact')}
      />

      {/* 3. 工作经历 (Experience / Career Timeline) */}
      <ExperienceSection
        darkMode={darkMode}
      />

      {/* 4. 项目经历 (Projects / Case Studies) */}
      <ProjectsSection
        darkMode={darkMode}
        onSelectProject={handleOpenProjectPage}
      />

      {/* 5. 设计之外 (Beyond Design / Creative Explorations) */}
      <BeyondDesignSection
        darkMode={darkMode}
      />

      {/* 6. 联系方式 (Contact / Transmit) */}
      <ContactSection
        darkMode={darkMode}
      />

      {/* Footer */}
      <Footer
        darkMode={darkMode}
        onReplayIntro={() => {
          window.scrollTo({ top: 0, behavior: 'instant' });
          setHasLoadedIntro(false);
        }}
      />
    </div>
  );
}


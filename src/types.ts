export type ProjectCategory = 'all' | 'product-ui' | 'interaction' | 'design-system' | 'creative-tech';

export interface ProjectMetric {
  label: string;
  value: string;
  change?: string;
}

export interface ProjectImage {
  id: string;
  url: string;
  title: string;
  caption: string;
  category: 'ui' | 'system' | 'interaction' | 'render' | 'mobile';
  categoryLabel: string;
  aspectRatio?: 'landscape' | 'portrait' | 'square' | 'ultrawide';
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  client: string;
  year: string;
  category: ProjectCategory;
  categoryLabel: string;
  coverImage: string;
  accentColor: string;
  tags: string[];
  metrics: ProjectMetric[];
  description: string;
  challenge: string;
  solution: string;
  gallery?: ProjectImage[];
  designSystem: {
    typography: string[];
    colors: { name: string; hex: string }[];
    components: string[];
  };
  keyFeatures: {
    title: string;
    description: string;
  }[];
  prototypeType?: 'sound-synthesizer' | 'interactive-toggle' | 'data-viz' | 'fluid-gesture';
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: 'Full-time' | 'Agency' | 'Consulting' | 'Founding';
  description: string;
  highlights: string[];
  skills: string[];
  metric: string;
}

export interface SideQuest {
  id: string;
  title: string;
  category: 'Sound Design' | 'Generative Art' | '3D & Motion' | 'Physical Zines';
  description: string;
  previewUrl: string;
  linkText: string;
  tags: string[];
}

export interface MixtapeTrack {
  id: string;
  title: string;
  artist: string;
  genre: string;
  duration: string;
  bpm: number;
  freq: number;
}

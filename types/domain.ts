export type ProjectListItem = {
  id: string;
  title: string;
  description: string;
  overview: string;
  howItWorks: string[];
  tools: string[];
  limitations: string[];
  image: string; // path under public
  tags: string[];
  slug: string;
  githubUrl?: string;
};

export type ProjectDetail = {
  id: string;
  title: string;
  subtitle?: string;
  tags: string[];
  coverImage: string;
  githubUrl?: string;
  demoUrl?: string;
  description?: string;
  overview: string;
  howItWorks: string[];
  ragHighlights?: string;
  nlpHighlights?: string;
  architecture?: string[];
  features?: string[];
  technicalHighlights?: string[];
  limitations?: string[];
  techStack?: string[];
  mainSections?: string[];
};

export type Certification = {
  id: number;
  title: string;
  issuer: string;
  date: string; // ISO date (YYYY-MM-DD)
  image: string; // path under public
  tags: string[];
  slug: string;
  certificateUrl?: string;
};

export interface ProfileLinks {
  github: string;
  portfolio: string;
  linkedin: string;
  [key: string]: string;
}

export interface ProjectSummary {
  name: string;
  desc: string;
  tags: string[];
  link?: string;
  thumb?: string;
}

export interface ExperienceItem {
  company: string;
  title: string;
  period: string;
  bullets: string[];
}

export interface EducationItem {
  school: string;
  degree: string;
  period: string;
  location?: string;
  url?: string;
}

export interface Profile {
  name: string;
  role: string;
  summary: string;
  about: string;
  location: string;
  email: string;
  phone?: string;
  avatar?: string;
  interests?: string[];
  links: ProfileLinks;
  projects: ProjectSummary[];
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
  languages: string[];
}

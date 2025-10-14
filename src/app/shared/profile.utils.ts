import { EducationItem, ExperienceItem, Profile, ProjectSummary } from './profile.model';
import { FALLBACK_PROFILE } from './profile.defaults';

function normaliseProject(project: Partial<ProjectSummary> | null | undefined): ProjectSummary {
  const tags = Array.isArray(project?.tags) && project.tags.length ? project.tags : ['Angular'];
  return {
    name: project?.name ?? 'Untitled project',
    desc: project?.desc ?? 'Details coming soon.',
    tags,
    link: project?.link || undefined,
    thumb: project?.thumb || undefined,
  };
}

function normaliseExperience(entry: Partial<ExperienceItem> | null | undefined): ExperienceItem {
  const bullets = Array.isArray(entry?.bullets) ? entry.bullets.filter(Boolean) : [];
  return {
    company: entry?.company ?? 'Company',
    title: entry?.title ?? 'Frontend Developer',
    period: entry?.period ?? '—',
    bullets,
  };
}

function normaliseEducation(entry: Partial<EducationItem> | null | undefined): EducationItem {
  return {
    school: entry?.school ?? 'University',
    degree: entry?.degree ?? 'Degree',
    period: entry?.period ?? '',
    location: entry?.location || undefined,
    url: entry?.url || undefined,
  };
}

export function normaliseProfile(raw: Partial<Profile> | null | undefined): Profile {
  const fallback = FALLBACK_PROFILE;

  const links = {
    ...fallback.links,
    ...(raw?.links ?? {})
  };

  const projectsSource = Array.isArray(raw?.projects) && raw.projects.length
    ? raw.projects
    : fallback.projects;

  const experienceSource = Array.isArray(raw?.experience) && raw.experience.length
    ? raw.experience
    : fallback.experience;

  const educationSource = Array.isArray(raw?.education) && raw.education.length
    ? raw.education
    : fallback.education;

  const skillsSource = Array.isArray(raw?.skills) && raw.skills.length
    ? raw.skills
    : fallback.skills;

  const languagesSource = Array.isArray(raw?.languages) && raw.languages.length
    ? raw.languages
    : fallback.languages;

  return {
    ...fallback,
    ...raw,
    links,
    projects: projectsSource.map(normaliseProject),
    experience: experienceSource.map(normaliseExperience),
    education: educationSource.map(normaliseEducation),
    skills: skillsSource,
    languages: languagesSource,
  };
}

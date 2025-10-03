import { Component, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataService } from '../../shared/data.service';

interface ProfileLinks {
  github: string;
  portfolio: string;
  linkedin: string;
}

interface ProjectSummary {
  name: string;
  desc: string;
  tags: string[];
  link?: string;
}

interface ExperienceItem {
  company: string;
  title: string;
  period: string;
  bullets: string[];
}

interface EducationItem {
  school: string;
  degree: string;
  period: string;
  location?: string;
}

interface ProfileSummary {
  name: string;
  role: string;
  summary: string;
  about: string;
  location: string;
  email: string;
  phone?: string;
  avatar?: string;
  links: ProfileLinks;
  projects: ProjectSummary[];
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
  languages: string[];
}

interface SkillHighlight {
  title: string;
  body: string;
}

const FALLBACK_PROFILE: ProfileSummary = {
  name: 'Fisnik Canaj',
  role: 'Frontend Developer',
  summary:
    'Front-end Developer with 8+ years of experience specialising in Angular and modern JS tooling. I design clean architectures, optimise performance, and deliver reliable UX for teams shipping at pace.',
  about:
    'Beyond contract roles I have built WordPress news portals, multilingual e-commerce apps, and R&D concepts like a 3D chess DApp. I enjoy taking ownership from architecture to polish and partnering closely with designers and product leaders.',
  location: 'Pristina, Kosovo',
  email: 'canajfisnik@gmail.com',
  avatar: 'assets/my-face.jpg',
  links: {
    github: 'https://github.com/fisnikcanaj1',
    portfolio: 'https://snikcanaj1.github.io',
    linkedin: 'https://www.linkedin.com/in/fisnik-canaj-angular-4b75a8157'
  },
  projects: [
    {
      name: 'Angular Admin UI',
      desc: 'Design system-driven dashboard experience with reusable tables, forms, and charts.',
      tags: ['Angular', 'Signals', 'Design System']
    },
    {
      name: 'E-commerce Checkout',
      desc: 'Optimised Stripe checkout flow with localisation, saved payments, and analytics hooks.',
      tags: ['Stripe', 'UX', 'Analytics']
    },
    {
      name: 'Automation Portal',
      desc: 'Node & Puppeteer powered publishing automations for a content-heavy newsroom.',
      tags: ['Automation', 'Node', 'WordPress']
    },
    {
      name: 'Mobile Betting Widgets',
      desc: 'Real-time betting components with RxJS and WebSockets for live odds experiences.',
      tags: ['RxJS', 'Realtime', 'UI']
    }
  ],
  experience: [
    {
      company: 'Ancient Gaming',
      title: 'Frontend Developer',
      period: '2023 – Present',
      bullets: [
        'CSGORoll Angular 18 upgrade and wagering flows with GraphQL/Apollo.',
        'Shipped wishlist and favourites journeys that improved engagement metrics.'
      ]
    },
    {
      company: 'Solution25',
      title: 'Frontend/Angular Developer',
      period: '2022 – 2023',
      bullets: [
        'Extended Volvo Cars checkout journeys for regional markets.',
        'Brought NX-driven upgrades and Cypress coverage to shared libraries.'
      ]
    }
  ],
  education: [
    {
      school: 'University for Business and Technology (UBT)',
      degree: 'BSc, Computer Science and Engineering',
      period: '2014',
      location: 'Pristina, Kosovo'
    }
  ],
  skills: ['Angular', 'TypeScript', 'RxJS', 'NgRx', 'Tailwind CSS'],
  languages: ['English', 'Albanian']
};

const TOP_SKILLS: SkillHighlight[] = [
  {
    title: 'Frontend Architecture',
    body: 'Standalone Angular, NX mono-repos, Signal & NgRx state patterns, design systems that scale.'
  },
  {
    title: 'Performance Engineering',
    body: 'Hydration control, deferrable views, bundle analytics, Core Web Vitals-driven regressions.'
  },
  {
    title: 'Product Impact',
    body: 'Conversion-minded UX: favourites, auth, checkout flows and A/B experimentation.'
  },
  {
    title: 'Team Enablement',
    body: 'Code reviews, pairing, documentation, and CI pipelines that unblock cross-functional squads.'
  }
];

function normaliseProject(project: any): ProjectSummary {
  const tags = Array.isArray(project?.tags) && project.tags.length ? project.tags : ['Angular'];
  return {
    name: project?.name ?? 'Untitled project',
    desc: project?.desc ?? 'Details coming soon.',
    tags,
    link: project?.link || undefined
  };
}

function normaliseExperience(entry: any): ExperienceItem {
  const bullets = Array.isArray(entry?.bullets) ? entry.bullets.filter(Boolean) : [];
  return {
    company: entry?.company ?? 'Company',
    title: entry?.title ?? 'Frontend Developer',
    period: entry?.period ?? '—',
    bullets
  };
}

function normaliseEducation(entry: any): EducationItem {
  return {
    school: entry?.school ?? 'University',
    degree: entry?.degree ?? 'Degree',
    period: entry?.period ?? '',
    location: entry?.location || undefined
  };
}

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  private readonly dataService = inject(DataService);

  private readonly rawProfile = computed(() => this.dataService.profile());

  readonly profile = computed<ProfileSummary>(() => {
    const current = this.rawProfile();
    if (!current) return FALLBACK_PROFILE;

    const links: ProfileLinks = {
      ...FALLBACK_PROFILE.links,
      ...(current.links ?? {})
    };

    const projectsSource = Array.isArray(current.projects) && current.projects.length
      ? current.projects
      : FALLBACK_PROFILE.projects;

    const experienceSource = Array.isArray(current.experience) && current.experience.length
      ? current.experience
      : FALLBACK_PROFILE.experience;

    const educationSource = Array.isArray(current.education) && current.education.length
      ? current.education
      : FALLBACK_PROFILE.education;

    const skillsSource = Array.isArray(current.skills) && current.skills.length
      ? current.skills
      : FALLBACK_PROFILE.skills;

    const languagesSource = Array.isArray(current.languages) && current.languages.length
      ? current.languages
      : FALLBACK_PROFILE.languages;

    return {
      ...FALLBACK_PROFILE,
      ...current,
      links,
      projects: projectsSource.map(normaliseProject),
      experience: experienceSource.map(normaliseExperience),
      education: educationSource.map(normaliseEducation),
      skills: skillsSource,
      languages: languagesSource
    };
  });

  readonly topSkills = TOP_SKILLS;
  readonly featuredProjects = computed<ProjectSummary[]>(() => this.profile().projects.slice(0, 6));
  readonly additionalProjects = computed<ProjectSummary[]>(() => this.profile().projects.slice(6));

  ngOnInit(): void {
    void this.dataService.load();
  }
}

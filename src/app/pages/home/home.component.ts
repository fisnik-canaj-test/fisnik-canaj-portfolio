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

interface ProfileSummary {
  name: string;
  role: string;
  summary: string;
  about: string;
  avatar?: string;
  links: ProfileLinks;
  projects: ProjectSummary[];
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
  avatar: 'my-face.jpg',
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
  ]
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

    return {
      ...FALLBACK_PROFILE,
      ...current,
      links,
      projects: projectsSource.map(normaliseProject)
    };
  });

  readonly topSkills = TOP_SKILLS;

  readonly projectPreview = computed<ProjectSummary[]>(() => this.profile().projects.slice(0, 4));

  ngOnInit(): void {
    void this.dataService.load();
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChipCloudComponent } from '../../components/chip-cloud.component';
import { ExperienceItem, ExperienceTimelineComponent } from '../../components/experience-timeline.component';
import { DataService } from '../../shared/data.service';

const FALLBACK_PROFILE_META = {
  name: 'Fisnik Canaj',
  role: 'Frontend Developer',
  summary:
    'Frontend engineer specialising in Angular migrations, high-traffic gaming platforms, and performance-first UI systems.',
  location: 'Pristina, Kosovo',
  email: 'canajfisnik@gmail.com',
  links: {
    github: 'https://github.com/fisnikcanaj1',
    portfolio: 'https://snikcanaj1.github.io',
    linkedin: 'https://www.linkedin.com/in/fisnik-canaj-angular-4b75a8157'
  },
  languages: ['English', 'Albanian']
};

const FALLBACK_TIMELINE: ExperienceItem[] = [
  {
    company: 'Ancient Gaming',
    title: 'Frontend Developer',
    period: 'Nov 2023 – Present',
    bullets: [
      'CSGORoll – Angular 16/17 betting features with GraphQL/Apollo, NgRx, and RxJS.',
      'Created favourites and stability improvements for high-traffic journeys.',
      'Partnered with design to refine UI/UX across the wagering experience.',
      'Hypedrop – Admin auth and account flows built with Qwik, GraphQL, Builder.io, and Tailwind.',
      'Implemented login, password reset, and account management pages.'
    ]
  },
  {
    company: 'Solution25',
    title: 'Frontend/Angular Developer',
    period: 'Jun 2022 – Oct 2023',
    bullets: [
      'Extended Volvo online car purchase modules for Switzerland & Liechtenstein.',
      'Added features to Cisco Health Care and coordinated with partner teams.',
      'Raised quality by introducing Cypress smoke suites and optimising Service Plan workloads.'
    ]
  },
  {
    company: 'UNE',
    title: 'Frontend Developer',
    period: 'Nov 2021 – May 2022',
    bullets: [
      'Shipped UX and responsiveness refinements across marketing surfaces.',
      'Developed reusable Vue.js components with Sass, Webpack, and Laravel backends.'
    ]
  },
  {
    company: 'ATIS',
    title: 'Frontend Developer',
    period: 'Feb 2020 – Oct 2021',
    bullets: [
      'Delivered an Angular booking SPA with lazy loading and modular routing.',
      'Built complex reservation forms for E-Dea integrated with RESTful APIs.',
      'Identified automation opportunities to streamline operations.'
    ]
  },
  {
    company: 'Celonis',
    title: 'Frontend UI Developer',
    period: 'Aug 2018 – Oct 2020',
    bullets: [
      'Crafted UI components, filtering interfaces, and chart visualisations for process mining.',
      'Improved usability using Angular, Sass, and vanilla JavaScript.'
    ]
  },
  {
    company: 'Open Data Kosovo (ODK)',
    title: 'Frontend Developer',
    period: 'Jun 2018 – Sep 2018',
    bullets: [
      'Completed internship delivery with Bootstrap and PHP to improve civic data access.'
    ]
  },
  {
    company: 'NEO DESIGN',
    title: 'User Interface Developer',
    period: 'Feb 2017 – Aug 2017',
    bullets: [
      'Enhanced UI handoff and execution using JavaScript, jQuery, Bootstrap, HTML, and CSS.'
    ]
  },
  {
    company: 'Freelance',
    title: 'Frontend Developer',
    period: 'Jan 2014 – Jan 2017',
    bullets: [
      'Self-taught through React, Vue, Angular, and Python projects.',
      'Delivered client portfolios while strengthening algorithm and data-structure foundations.'
    ]
  }
];

const FALLBACK_SKILLS = [
  'Angular (2–20)',
  'TypeScript',
  'RxJS',
  'NgRx',
  'Tailwind CSS',
  'GraphQL',
  'Qwik',
  'Builder.io',
  'Cypress',
  'Vue.js',
  'Laravel'
];

const EXPERIENCE_HIGHLIGHTS = [
  {
    title: 'Angular evolution',
    body: 'Angular 16→20 migrations, SSR hydration, and performance tuning guided by Lighthouse & Core Web Vitals.'
  },
  {
    title: 'Design systems',
    body: 'Reusable component libraries, Storybook docs, and accessibility reviews that keep teams aligned.'
  },
  {
    title: 'Data-driven UX',
    body: 'Experimentation loops, analytics wiring, and conversion-minded UI for commerce and gaming platforms.'
  }
];

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, ExperienceTimelineComponent, ChipCloudComponent, RouterLink],
  template: `
    <div class="experience-page space-y-12">
      <header class="project-card experience-hero">
        <div class="project-card__inner experience-hero__inner">
          <div class="experience-hero__copy">
            <p class="experience-hero__eyebrow">Work Experience</p>
            <h1 class="experience-hero__title">Experience timeline</h1>
            <p class="experience-hero__summary">{{ meta().summary }}</p>
          </div>
          <div class="experience-hero__badges">
            <span class="experience-hero__badge" *ngIf="meta().location">
              <svg aria-hidden="true" viewBox="0 0 20 20"><path fill="currentColor" d="M10 2a6 6 0 0 0-6 6c0 3.59 5.13 9.29 5.35 9.53a.9.9 0 0 0 1.3 0C10.87 17.29 16 11.59 16 8a6 6 0 0 0-6-6Zm0 3a3 3 0 1 1-3 3 3 3 0 0 1 3-3Z"/></svg>
              {{ meta().location }}
            </span>
            <span class="experience-hero__badge" *ngIf="meta().languages?.length">
              <svg aria-hidden="true" viewBox="0 0 20 20"><path fill="currentColor" d="M10 2a8 8 0 1 0 8 8 8.01 8.01 0 0 0-8-8Zm0 14.5a6.5 6.5 0 0 1 0-13 6.5 6.5 0 0 1 0 13Z"/></svg>
              {{ meta().languages.join(', ') }}
            </span>
            <span class="experience-hero__badge" *ngIf="yearsOfExperience() > 0">
              <svg aria-hidden="true" viewBox="0 0 20 20"><path fill="currentColor" d="M3 5.5A2.5 2.5 0 0 1 5.5 3h9A2.5 2.5 0 0 1 17 5.5v9A2.5 2.5 0 0 1 14.5 17h-9A2.5 2.5 0 0 1 3 14.5Zm2-.5v4h4V5Zm6 0v4h4V5Zm4 6h-4v4h3.5a.5.5 0 0 0 .5-.5Zm-6 4v-4H5v3.5a.5.5 0 0 0 .5.5Z"/></svg>
              {{ yearsOfExperience() }} years delivering
            </span>
          </div>
          <div class="experience-hero__actions">
            <a class="btn" routerLink="/projects">View selected work</a>
            <a class="btn btn-outline" href="assets/resume/Fisnik_Canaj-Frontend-Developer.pdf" target="_blank" rel="noopener">Download CV</a>
          </div>
        </div>
      </header>

      <div class="experience-layout grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(260px,320px)]">
        <div class="space-y-8">
          <app-experience-timeline [items]="timeline()" />
        </div>
        <aside class="experience-aside space-y-6">
          <article class="project-card project-card--compact">
            <div class="project-card__inner experience-aside__inner">
              <h2 class="experience-aside__title">Capabilities in focus</h2>
              <ul class="experience-aside__highlights">
                <li *ngFor="let item of highlights()">
                  <h3>{{ item.title }}</h3>
                  <p>{{ item.body }}</p>
                </li>
              </ul>
            </div>
          </article>

          <article class="project-card project-card--compact">
            <div class="project-card__inner experience-aside__inner">
              <h2 class="experience-aside__title">Skills & tools</h2>
              <app-chip-cloud [chips]="skills()" accent="Angular (2–20)" />
            </div>
          </article>

          <article class="project-card project-card--compact">
            <div class="project-card__inner experience-aside__inner experience-aside__inner--contact">
              <h2 class="experience-aside__title">Collaborate</h2>
              <p class="experience-aside__text">
                Need help with an Angular migration, admin platform, or performance audit?
              </p>
              <div class="experience-aside__links">
                <a class="sidebar-link" [href]="'mailto:' + meta().email">Email {{ meta().name.split(' ')[0] }}</a>
                <a *ngIf="meta().links.linkedin" class="sidebar-link sidebar-link--ghost" [href]="meta().links.linkedin" target="_blank" rel="noopener">LinkedIn</a>
                <a *ngIf="meta().links.github" class="sidebar-link sidebar-link--ghost" [href]="meta().links.github" target="_blank" rel="noopener">GitHub</a>
              </div>
            </div>
          </article>
        </aside>
      </div>
    </div>
  `
})
export class ExperienceComponent implements OnInit {
  private readonly dataService = inject(DataService);
  private readonly profile = computed(() => this.dataService.profile());

  readonly meta = computed(() => {
    const current = this.profile();
    if (!current) {
      return FALLBACK_PROFILE_META;
    }

    return {
      ...FALLBACK_PROFILE_META,
      ...current,
      links: {
        ...FALLBACK_PROFILE_META.links,
        ...(current.links ?? {})
      },
      languages: Array.isArray(current.languages) && current.languages.length
        ? current.languages
        : FALLBACK_PROFILE_META.languages,
      summary: current.summary ?? FALLBACK_PROFILE_META.summary,
      role: current.role ?? FALLBACK_PROFILE_META.role,
      name: current.name ?? FALLBACK_PROFILE_META.name,
      location: current.location ?? FALLBACK_PROFILE_META.location,
      email: current.email ?? FALLBACK_PROFILE_META.email,
    };
  });

  readonly timeline = computed<ExperienceItem[]>(() => {
    const experience = this.profile()?.experience;
    if (Array.isArray(experience) && experience.length) return experience;
    return FALLBACK_TIMELINE;
  });

  readonly skills = computed(() => this.profile()?.skills ?? FALLBACK_SKILLS);

  readonly highlights = computed(() => EXPERIENCE_HIGHLIGHTS);

  readonly yearsOfExperience = computed(() => {
    const items = this.timeline();
    const nowYear = new Date().getFullYear();
    const earliest = items.reduce((min, item) => {
      const match = item.period.match(/(\d{4})/);
      if (!match) {
        return min;
      }
      const year = Number.parseInt(match[1], 10);
      return Number.isNaN(year) ? min : Math.min(min, year);
    }, nowYear);

    const years = nowYear - earliest + 1;
    return years > 0 ? years : 0;
  });

  async ngOnInit(): Promise<void> {
    await this.dataService.load();
  }
}

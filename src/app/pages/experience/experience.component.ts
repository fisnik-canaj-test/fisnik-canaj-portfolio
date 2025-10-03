import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChipCloudComponent } from '../../components/chip-cloud.component';
import { ExperienceItem, ExperienceTimelineComponent } from '../../components/experience-timeline.component';
import { DataService } from '../../shared/data.service';

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
  'Angular (2–18)',
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

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, ExperienceTimelineComponent, ChipCloudComponent, RouterLink],
  template: `
    <section class="space-y-10">
      <header class="space-y-3">
        <p class="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-text-secondary">Work Experience</p>
        <h1 class="text-3xl font-heading font-semibold text-slate-900 dark:text-text-primary">Experience timeline</h1>
        <p class="max-w-3xl text-sm text-slate-600 dark:text-text-primary/80">
          Highlights from agency and in-house roles—Angular SSR upgrades, admin platforms, and performance-focused UI delivery.
        </p>
      </header>

      <app-experience-timeline [items]="timeline()" />

      <section class="space-y-3">
        <h2 class="text-lg font-heading text-slate-900 dark:text-text-primary">Skills & tools in rotation</h2>
        <app-chip-cloud [chips]="skills()" accent="Angular (2–18)" />
      </section>

      <section class="rounded-3xl border border-border/60 bg-white/70 p-6 shadow-soft dark:border-white/10 dark:bg-surface-card/80">
        <h3 class="text-lg font-heading text-slate-900 dark:text-text-primary">What teams rely on me for</h3>
        <ul class="mt-3 space-y-2 text-sm text-slate-600 dark:text-text-primary/80">
          <li>Angular migrations and SSR performance tuning, from planning to post-release measurement.</li>
          <li>Reusable component systems that keep design and engineering moving in lockstep.</li>
          <li>CI/CD guardrails—Cypress smoke suites, analytics instrumentation, and documentation.</li>
        </ul>
      </section>

      <div class="flex flex-wrap gap-3">
        <a class="btn" routerLink="/projects">View project case studies</a>
        <a class="btn btn-outline" href="/assets/resume/Fisnik_Canaj-Frontend-Developer.pdf" target="_blank" rel="noopener">Download full CV</a>
      </div>
    </section>
  `
})
export class ExperienceComponent implements OnInit {
  private readonly dataService = inject(DataService);
  private readonly profile = computed(() => this.dataService.profile());

  readonly timeline = computed<ExperienceItem[]>(() => {
    const experience = this.profile()?.experience;
    if (Array.isArray(experience) && experience.length) return experience;
    return FALLBACK_TIMELINE;
  });

  readonly skills = computed(() => this.profile()?.skills ?? FALLBACK_SKILLS);

  async ngOnInit(): Promise<void> {
    await this.dataService.load();
  }
}

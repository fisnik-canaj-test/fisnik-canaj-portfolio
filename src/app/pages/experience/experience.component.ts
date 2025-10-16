import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChipCloudComponent } from '../../components/chip-cloud.component';
import { ExperienceItem, ExperienceTimelineComponent } from '../../components/experience-timeline.component';
import { DataService } from '../../shared/data.service';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
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
            @if (meta().location) {
              <span class="experience-hero__badge">
                <svg aria-hidden="true" viewBox="0 0 20 20"><path fill="currentColor" d="M10 2a6 6 0 0 0-6 6c0 3.59 5.13 9.29 5.35 9.53a.9.9 0 0 0 1.3 0C10.87 17.29 16 11.59 16 8a6 6 0 0 0-6-6Zm0 3a3 3 0 1 1-3 3 3 3 0 0 1 3-3Z"/></svg>
                {{ meta().location }}
              </span>
            }
            @if (meta().languages.length) {
              <span class="experience-hero__badge">
                <svg aria-hidden="true" viewBox="0 0 20 20"><path fill="currentColor" d="M10 2a8 8 0 1 0 8 8 8.01 8.01 0 0 0-8-8Zm0 14.5a6.5 6.5 0 0 1 0-13 6.5 6.5 0 0 1 0 13Z"/></svg>
                {{ meta().languages.join(', ') }}
              </span>
            }
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
                @for (item of highlights(); track item.title) {
                  <li>
                    <h3>{{ item.title }}</h3>
                    <p>{{ item.body }}</p>
                  </li>
                }
              </ul>
            </div>
          </article>

          <article class="project-card project-card--compact">
            <div class="project-card__inner experience-aside__inner">
              <h2 class="experience-aside__title">Skills & tools</h2>
              <app-chip-cloud [chips]="skills()" [accent]="primarySkill()" />
            </div>
          </article>

        </aside>
      </div>
    </div>
  `
})
export class ExperienceComponent implements OnInit {
  private readonly dataService = inject(DataService);
  readonly profile = this.dataService.profile;

  readonly meta = computed(() => {
    const current = this.profile();
    return {
      name: current.name,
      role: current.role,
      summary: current.summary,
      location: current.location,
      email: current.email,
      links: current.links,
      languages: current.languages,
    };
  });

  readonly timeline = computed<ExperienceItem[]>(() => this.profile().experience);

  readonly skills = computed(() => this.profile().skills);

  readonly primarySkill = computed(() => {
    const skills = this.skills();
    const angularMatch = skills.find((skill) => /angular/i.test(skill));
    return angularMatch ?? skills[0] ?? 'Angular';
  });

  readonly highlights = computed(() => EXPERIENCE_HIGHLIGHTS);

  async ngOnInit(): Promise<void> {
    await this.dataService.load();
  }
}

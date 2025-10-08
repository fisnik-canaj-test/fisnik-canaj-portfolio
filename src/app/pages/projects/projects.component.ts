import { Component, inject, computed, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../shared/data.service';

interface ProjectRecord {
  name: string;
  desc: string;
  tags: string[];
  link?: string;
}

@Component({
  standalone: true,
  selector: 'app-projects',
  imports: [CommonModule],
  template: `
    <div class="mb-6">
        <h2 class="text-2xl font-bold mb-2">Projects</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400">Selected client work and side projects. Filter by tag.</p>
      </div>
    <div class="flex flex-col gap-2 md:flex-row md:items-end md:justify-between mb-6">

      <div class="flex flex-wrap gap-2 text-sm">
        <button type="button" class="chip" [class.chip--active]="tag() === 'All'" (click)="setTag('All')">All</button>
        <button *ngFor="let option of tags()" type="button" class="chip" [class.chip--active]="option === tag()" (click)="setTag(option)">{{ option }}</button>
      </div>
    </div>
    <ng-container *ngIf="p(); else loading">
    <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <article class="project-card" *ngFor="let proj of filtered()">
        <div class="project-card__inner">
          <div class="project-card__header">
            <h3 class="project-card__title">{{ proj.name }}</h3>
            <a
              *ngIf="proj.link && proj.link !== '#'"
              class="project-card__link"
              [href]="proj.link"
              target="_blank"
              rel="noopener"
            >
              <span class="sr-only">Open {{ proj.name }}</span>
              <svg viewBox="0 0 20 20" aria-hidden="true" class="project-card__icon">
                <path d="M7.5 4.5h8v8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M4.5 15.5 15.5 4.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
          </div>

          <p class="project-card__desc">{{ proj.desc }}</p>

          <div class="project-card__tags">
            <span class="project-card__tag" *ngFor="let t of proj.tags">{{ t }}</span>
          </div>
        </div>
      </article>
      <p *ngIf="filtered().length === 0" class="text-sm text-gray-500 dark:text-gray-400">No projects match this filter.</p>
    </div>
    </ng-container>
    <ng-template #loading>
      <p class="text-sm text-gray-500 dark:text-gray-400">Loading projects…</p>
    </ng-template>
  `
})
export class ProjectsComponent implements OnInit {
  ds = inject(DataService);
  p = computed(() => this.ds.profile());
  tag = signal<'All' | string>('All');
  // Fallback content if data hasn't been authored yet
  private readonly fallbackProjects: ProjectRecord[] = [
    { name: 'Angular Admin UI', tags: ['Angular', 'Admin'], desc: 'Reusable dashboard components with tables, forms, and charts.', link: '#' },
    { name: 'E-commerce Checkout', tags: ['Stripe', 'UX'], desc: 'Optimised checkout with address autocomplete and saved payments.', link: '#' },
    { name: 'News Portal', tags: ['WordPress', 'Automation'], desc: 'Publishing workflow with custom scripts and OpenGraph previews.', link: '#' },
  ];

  private readonly all = computed<ProjectRecord[]>(() => {
    const data = this.p()?.projects ?? [];
    return data.length ? data : this.fallbackProjects;
  });

  tags = computed(() => {
    const projects = this.all();
    const bucket = new Set<string>();
    for (const project of projects) {
      for (const t of project.tags ?? []) bucket.add(t);
    }
    return Array.from(bucket).sort((a, b) => a.localeCompare(b));
  });

  setTag(t: string) {
    this.tag.set(t);
  }

  filtered = computed<ProjectRecord[]>(() => {
    const all = this.all();
    const current = this.tag();
    if (current === 'All') return all;
    return all.filter((x) => (x.tags || []).includes(current));
  });


  async ngOnInit() {
    await this.ds.load();
  }
}

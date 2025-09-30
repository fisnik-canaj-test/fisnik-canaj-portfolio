import { Component, inject, computed, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../shared/data.service';

@Component({
  standalone: true,
  selector: 'app-projects',
  imports: [CommonModule],
  template: `
    <div class="flex flex-col gap-2 md:flex-row md:items-end md:justify-between mb-6">
      <div>
        <h2 class="text-2xl font-bold">Projects</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400">Selected client work and side projects. Filter by tag.</p>
      </div>
      <div class="flex flex-wrap gap-2 text-sm">
        <button type="button" class="chip" [class.chip--active]="tag() === 'All'" (click)="setTag('All')">All</button>
        <button *ngFor="let option of tags()" type="button" class="chip" [class.chip--active]="option === tag()" (click)="setTag(option)">{{ option }}</button>
      </div>
    </div>
    <ng-container *ngIf="p(); else loading">
    <div class="grid md:grid-cols-3 gap-6">
      <article class="card" *ngFor="let proj of filtered()">
        <div class="card-body">
          <h3 class="font-semibold">{{ proj.name }}</h3>
          <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">{{ proj.desc }}</p>
          <div class="mt-3 flex flex-wrap gap-2">
            <span class="tag" *ngFor="let t of proj.tags">{{ t }}</span>
          </div>
          <a
            *ngIf="proj.link && proj.link !== '#'"
            class="link mt-3 inline-block"
            [href]="proj.link"
            target="_blank"
            rel="noopener"
          >Open →</a>
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
  private readonly fallbackProjects = [
    { name: 'Angular Admin UI', tags: ['Angular', 'Admin'], desc: 'Reusable dashboard components with tables, forms, and charts.', link: '#' },
    { name: 'E‑commerce Checkout', tags: ['Stripe', 'UX'], desc: 'Optimised checkout with address autocomplete and saved payments.', link: '#' },
    { name: 'News Portal', tags: ['WordPress', 'Automation'], desc: 'Publishing workflow with custom scripts and OpenGraph previews.', link: '#' },
  ];

  private readonly all = computed(() => {
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

  filtered = computed(() => {
    const all = this.all();
    const current = this.tag();
    if (current === 'All') return all;
    return all.filter((x: any) => (x.tags || []).includes(current));
  });

  async ngOnInit() {
    await this.ds.load();
  }
}

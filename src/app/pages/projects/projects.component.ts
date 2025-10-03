import { Component, inject, computed, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../shared/data.service';

interface ProjectRecord {
  name: string;
  desc: string;
  tags: string[];
  link?: string;
}

interface CaseStudy {
  name: string;
  summary: string;
  url: string;
}

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
    <section class="mt-12 space-y-4">
      <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100">Selected Work</h3>
      <p class="text-sm text-gray-600 dark:text-gray-300">Highlights from recent contracts. Each link opens the live product where available.</p>
      <ul class="grid gap-4 md:grid-cols-2">
        <li *ngFor="let item of selectedWork" class="rounded-xl border border-black/5 dark:border-white/10 bg-white/70 p-4 transition hover:-translate-y-0.5 hover:shadow-soft dark:bg-black/40">
          <a class="font-medium link" [href]="item.url" target="_blank" rel="noopener">{{ item.name }}</a>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-300">{{ item.summary }}</p>
        </li>
      </ul>
    </section>
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

  readonly selectedWork: CaseStudy[] = [
    {
      name: 'CSGORoll',
      summary: 'Angular 18 migration plus wishlist, favourites, and probability tooling for the betting experience.',
      url: 'https://csgoroll.com'
    },
    {
      name: 'Hypedrop',
      summary: 'Delivered auth and account flows for the admin interface using Qwik, GraphQL, and Tailwind.',
      url: 'https://hypedrop.com'
    },
    {
      name: 'Cartouche Club',
      summary: 'Resolved SEO blockers, added coupon-driven journeys, and improved product discovery.',
      url: 'https://cartoucheclub.com'
    },
    {
      name: 'Gadgetlend',
      summary: 'Refined the Angular storefront, shipped localisation, and modernised the design system.',
      url: 'https://gadgetlend.de'
    },
    {
      name: 'Gazeta Demos',
      summary: 'Launched a WordPress news platform with custom theming and automation.',
      url: 'https://gazetademos.com'
    },
    {
      name: 'Volvo Cars — Switzerland & Liechtenstein',
      summary: 'Contributed to e-commerce sales flow enhancements for regional markets.',
      url: 'https://www.volvocars.com'
    },
    {
      name: 'Celonis',
      summary: 'Built Angular UI components supporting the process mining platform.',
      url: 'https://www.celonis.com'
    },
    {
      name: 'E-Dea',
      summary: 'Delivered complex booking forms and reservation tooling for transport operations.',
      url: 'https://www.e-dea.com'
    }
  ];

  async ngOnInit() {
    await this.ds.load();
  }
}

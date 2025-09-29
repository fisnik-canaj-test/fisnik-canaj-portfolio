import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../shared/data.service';

@Component({
  standalone: true,
  selector: 'app-projects',
  imports: [CommonModule],
  template: `
  <div class="flex items-center justify-between mb-6">
    <h2 class="text-2xl font-bold">Projects</h2>
    <div class="flex gap-2 text-sm">
      <button class="btn btn-outline" (click)="setTag('all')">All</button>
      <button class="btn btn-outline" (click)="setTag('Angular')">Angular</button>
      <button class="btn btn-outline" (click)="setTag('WP')">WP</button>
      <button class="btn btn-outline" (click)="setTag('Stripe')">Stripe</button>
    </div>
  </div>
  <div class="grid md:grid-cols-3 gap-6">
    <article class="card" *ngFor="let proj of filtered()">
      <div class="card-body">
        <h3 class="font-semibold">{{proj.name}}</h3>
        <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">{{proj.desc}}</p>
        <div class="mt-3 flex flex-wrap gap-2">
          <span class="px-2 py-1 text-xs rounded-full bg-brand-50 text-brand-700 border border-brand-200 dark:bg-brand-900/30 dark:text-brand-200 dark:border-brand-800" *ngFor="let t of proj.tags">{{t}}</span>
        </div>
        <a *ngIf="proj.link !== '#'" class="link mt-3 inline-block" [href]="proj.link" target="_blank">Open →</a>
      </div>
    </article>
  </div>
  `
})
export class ProjectsComponent {
  ds = inject(DataService);
  p = computed(() => this.ds.profile());
  tag = signal<'all'|string>('all');
  setTag(t: string){ this.tag.set(t); }
  filtered = computed(() => {
    const all = this.p()?.projects ?? [];
    const t = this.tag();
    return t === 'all' ? all : all.filter((x:any) => (x.tags||[]).includes(t));
  });
}


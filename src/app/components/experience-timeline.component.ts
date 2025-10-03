import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface ExperienceItem {
  company: string;
  title: string;
  period: string;
  bullets: string[];
}

@Component({
  selector: 'app-experience-timeline',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ol class="relative border-s border-border/60 ps-6">
      <li *ngFor="let item of items" class="mb-8">
        <span class="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-white shadow-lift">
          <span class="text-xs">•</span>
        </span>
        <div class="flex flex-wrap items-baseline gap-2">
          <h3 class="text-lg font-heading text-slate-900 dark:text-text-primary">{{ item.title }}</h3>
          <span class="text-slate-500 dark:text-text-secondary">— {{ item.company }}</span>
          <time class="ms-auto text-xs text-slate-400 dark:text-text-secondary">{{ item.period }}</time>
        </div>
        <ul class="mt-3 space-y-2 text-sm leading-relaxed text-slate-600 dark:text-text-primary/80">
          <li *ngFor="let bullet of item.bullets" class="list-disc ps-4">{{ bullet }}</li>
        </ul>
      </li>
    </ol>
  `
})
export class ExperienceTimelineComponent {
  @Input({ required: true }) items: ExperienceItem[] = [];
}

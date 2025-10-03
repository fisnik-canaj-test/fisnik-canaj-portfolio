import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface ProjectCard {
  name: string;
  desc: string;
  tags: string[];
  link?: string;
  thumb?: string;
}

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article class="card h-full">
      <div class="card-body space-y-4">
        <figure *ngIf="project.thumb" class="overflow-hidden rounded-2xl border border-border/40 bg-black/5">
          <img [src]="project.thumb" [alt]="project.name" class="h-48 w-full object-cover" />
        </figure>
        <div class="flex items-start justify-between gap-4">
          <h3 class="text-lg font-heading text-slate-900 dark:text-text-primary">{{ project.name }}</h3>
          <a
            *ngIf="project.link && project.link !== '#'; else comingSoon"
            class="link text-xs"
            [href]="project.link"
            target="_blank"
            rel="noopener"
          >Visit</a>
          <ng-template #comingSoon>
            <span class="text-xs text-slate-400 dark:text-text-secondary">Coming soon</span>
          </ng-template>
        </div>
        <p class="text-sm text-slate-600 dark:text-text-primary/80">{{ project.desc }}</p>
        <div class="flex flex-wrap gap-2">
          <span *ngFor="let tag of project.tags" class="tag">{{ tag }}</span>
        </div>
      </div>
    </article>
  `
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: ProjectCard;
}

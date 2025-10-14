import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="project-card">
      <div class="project-card__inner">
        <figure *ngIf="project.thumb" class="project-card__thumb">
          <img [src]="project.thumb" [alt]="project.name" />
        </figure>
        <div class="project-card__header">
          <h3 class="project-card__title">{{ project.name }}</h3>
          <ng-container *ngIf="project.link && project.link !== '#'; else comingSoon">
            <a
              class="project-card__link project-card__link--labelled"
              [href]="project.link"
              target="_blank"
              rel="noopener"
            >
              <span class="project-card__link-text">Visit</span>
              <svg viewBox="0 0 20 20" aria-hidden="true" class="project-card__icon">
                <path d="M7.5 4.5h8v8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M4.5 15.5 15.5 4.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
          </ng-container>
          <ng-template #comingSoon>
            <span class="text-xs text-gray-500 dark:text-gray-400">Coming soon</span>
          </ng-template>
        </div>
        <p class="project-card__desc">{{ project.desc }}</p>
        <div class="project-card__tags">
          <span *ngFor="let tag of project.tags" class="project-card__tag">{{ tag }}</span>
        </div>
      </div>
    </article>
  `
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: ProjectCard;
}

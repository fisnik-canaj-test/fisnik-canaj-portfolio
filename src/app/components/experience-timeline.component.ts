import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ol class="experience-timeline">
      @for (item of items(); track item.company + item.period) {
        <li class="experience-timeline__item">
          <span class="experience-timeline__dot" aria-hidden="true"></span>
          <article class="experience-card experience-card--timeline">
            <div class="experience-card__inner">
              <header class="experience-card__header">
                <div>
                  <h3 class="experience-card__title">{{ item.title }}</h3>
                  <p class="experience-card__company">{{ item.company }}</p>
                </div>
                <time class="experience-card__period">{{ item.period }}</time>
              </header>
              <ul class="experience-card__bullets">
                @for (bullet of item.bullets; track bullet) {
                  <li>{{ bullet }}</li>
                }
              </ul>
            </div>
          </article>
        </li>
      }
    </ol>
  `
})
export class ExperienceTimelineComponent {
  readonly items = input.required<ExperienceItem[]>();
}

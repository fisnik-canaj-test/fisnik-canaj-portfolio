import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LinkButtonComponent } from '../../../components/link-button.component';
import { ExperienceItem, EducationItem } from '../../../shared/profile.model';

@Component({
  selector: 'app-home-experience-section',
  standalone: true,
  imports: [CommonModule, LinkButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block'
  },
  template: `
    @let experienceList = experience();
    @let educationList = education();

    <section id="experience" class="scroll-section">
      <span class="text-xs font-semibold uppercase tracking-[0.35em] text-brand-600 dark:text-brand-300">Experience</span>
      <h2 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
        Teams I’ve helped ship for
      </h2>
      <div class="mt-8 grid gap-4">
        @for (item of experienceList; track item.company + item.period) {
          <article class="experience-card">
            <div class="experience-card__inner">
              <header class="experience-card__header">
                <div>
                  <h3 class="experience-card__title">{{ item.title }}</h3>
                  <p class="experience-card__company">{{ item.company }}</p>
                </div>
                <time class="experience-card__period">{{ item.period }}</time>
              </header>

              @if (item.bullets.length) {
                <ul class="experience-card__bullets">
                  @for (bullet of item.bullets; track bullet) {
                    <li>{{ bullet }}</li>
                  }
                </ul>
              }
            </div>
          </article>
        }
      </div>

      <div class="mt-6 flex ">
        <link-button [routerTo]="'/experience'">View full experience timeline</link-button>
      </div>

      @if (educationList.length) {
        <div class="mt-12">
          <div class="flex items-center gap-4">
            <h3 class="text-xs font-semibold uppercase tracking-[0.55em] text-slate-500 dark:text-slate-300">Education</h3>
            <span class="h-px flex-1 bg-slate-200/80 dark:bg-slate-700/60"></span>
          </div>

          <ul class="mt-6 space-y-5">
            @for (edu of educationList; track edu.school + edu.period) {
              <li>
                <ng-template #educationCard>
                  <div class="pointer-events-none absolute inset-0">
                    <div class="absolute inset-0 rounded-[1.75rem] bg-gradient-to-br from-sky-200/20 via-transparent to-indigo-300/20 opacity-0 transition duration-500 ease-out group-hover:opacity-100 dark:from-sky-500/15 dark:to-indigo-400/15"></div>
                    <div class="absolute -right-12 -top-24 h-48 w-48 rounded-full bg-sky-200/30 blur-3xl transition duration-500 group-hover:opacity-80 dark:bg-sky-500/25"></div>
                  </div>
                  <div class="relative flex flex-col gap-3 text-slate-600 dark:text-slate-200">
                    <span class="text-[0.7rem] font-semibold uppercase tracking-[0.45em] text-slate-400 dark:text-slate-300">Education</span>
                    <h4 class="text-lg font-semibold text-slate-900 dark:text-slate-50">{{ edu.degree }}</h4>
                    <p class="text-sm leading-relaxed text-slate-600 dark:text-slate-200">{{ edu.school }}</p>
                    <p class="text-[0.72rem] uppercase tracking-[0.32em] text-slate-400 dark:text-slate-400">
                      {{ edu.period }}
                      @if (edu.location) {
                        <span> · {{ edu.location }}</span>
                      }
                    </p>
                  </div>
                  <span class="pointer-events-none absolute right-6 top-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/70 text-slate-400 transition duration-300 group-hover:scale-105 group-hover:border-brand-400 group-hover:text-brand-500 dark:border-slate-700/70 dark:text-slate-500 dark:group-hover:border-brand-300 dark:group-hover:text-brand-200">
                    <svg viewBox="0 0 20 20" aria-hidden="true" class="h-4 w-4">
                      <path d="M7.5 4.5h8v8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M4.5 15.5 15.5 4.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                </ng-template>

                @if (edu.url) {
                  <a
                    class="group relative block overflow-hidden rounded-[1.75rem] border border-slate-200/60 bg-gradient-to-br from-white/95 via-white/55 to-white/20 p-6 shadow-[0_40px_80px_-45px_rgba(15,23,42,0.65)] backdrop-blur-lg transition duration-300 hover:-translate-y-1 hover:border-brand-400/50 hover:shadow-[0_55px_110px_-55px_rgba(14,165,233,0.55)] dark:border-slate-800/70 dark:from-slate-900/90 dark:via-slate-900/70 dark:to-slate-900/40 dark:shadow-[0_45px_120px_-60px_rgba(8,47,73,0.85)]"
                    [href]="edu.url!"
                    target="_blank"
                    rel="noopener"
                  >
                    <ng-container *ngTemplateOutlet="educationCard"></ng-container>
                  </a>
                } @else {
                  <div class="group relative overflow-hidden rounded-[1.75rem] border border-slate-200/60 bg-gradient-to-br from-white/95 via-white/55 to-white/20 p-6 shadow-[0_40px_80px_-45px_rgba(15,23,42,0.65)] backdrop-blur-lg dark:border-slate-800/70 dark:from-slate-900/90 dark:via-slate-900/70 dark:to-slate-900/40 dark:shadow-[0_45px_120px_-60px_rgba(8,47,73,0.85)]">
                    <ng-container *ngTemplateOutlet="educationCard"></ng-container>
                  </div>
                }
              </li>
            }
          </ul>
        </div>
      }
    </section>
  `
})
export class HomeExperienceSectionComponent {
  readonly experience = input<ExperienceItem[]>([]);
  readonly education = input<EducationItem[]>([]);
}

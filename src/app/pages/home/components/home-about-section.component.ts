import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Profile } from '../../../shared/profile.model';

@Component({
  selector: 'app-home-about-section',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block'
  },
  template: `
    @let data = profile();
    @let highlightsList = highlights();

    <section id="about" class="scroll-section">
      <span class="text-xs font-semibold uppercase tracking-[0.35em] text-brand-600 dark:text-brand-300">About</span>
      <h2 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
        {{ data.role }} focused on dependable product delivery
      </h2>
      <div class="mt-6 space-y-4 text-base leading-relaxed text-gray-600 dark:text-gray-300">
        <p>{{ data.about }}</p>
      </div>

      <div class="mt-10">
        <h3 class="text-sm font-semibold uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400">Skill Highlights</h3>
        <div class="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          @for (item of highlightsList; track item.title) {
            <article class="rounded-2xl border border-black/10 bg-white/60 p-5 shadow-sm backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-md dark:border-white/10 dark:bg-white/5">
              <h4 class="text-sm font-semibold text-gray-900 dark:text-gray-100">{{ item.title }}</h4>
              <p class="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{{ item.body }}</p>
            </article>
          }
        </div>
      </div>

      <div class="mt-10">
        <h3 class="text-sm font-semibold uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400">Toolbox</h3>
        <div class="toolbox-panel">
          <ul class="toolbox-grid">
            @for (skill of data.skills; track skill) {
              <li class="toolbox-card">
                <span class="toolbox-card__accent" aria-hidden="true"></span>
                <span class="toolbox-card__label">{{ skill }}</span>
              </li>
            }
          </ul>
        </div>
      </div>
    </section>
  `
})
export class HomeAboutSectionComponent {
  readonly profile = input.required<Profile>();
  readonly highlights = input<ReadonlyArray<{ title: string; body: string }>>([]);
}

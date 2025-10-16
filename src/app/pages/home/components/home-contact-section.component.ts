import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContactFormComponent } from '../../../components/contact-form.component';

@Component({
  selector: 'app-home-contact-section',
  standalone: true,
  imports: [CommonModule, ContactFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block'
  },
  template: `
    <section id="contact" class="scroll-section">
      <span class="text-xs font-semibold uppercase tracking-[0.35em] text-brand-600 dark:text-brand-300">Contact</span>
      <h2 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
        Let’s partner on your next release
      </h2>
      <p class="mt-4 max-w-2xl text-base leading-relaxed text-gray-600 dark:text-gray-300">
        I’m available for senior Front End developer.
      </p>

      <div class="mt-10 grid gap-6 md:gap-8">
        <app-contact-form successCopy="Thanks! I’ll follow up shortly." />
      </div>
    </section>
  `
})
export class HomeContactSectionComponent {}

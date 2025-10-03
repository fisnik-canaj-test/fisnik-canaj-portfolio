import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ContactFormComponent } from '../../components/contact-form.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ContactFormComponent],
  template: `
    <section class="space-y-8">
      <header class="space-y-3">
        <p class="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-text-secondary">Let's talk</p>
        <h1 class="text-3xl font-heading font-semibold text-slate-900 dark:text-text-primary">Contact</h1>
        <p class="text-sm text-slate-600 dark:text-text-primary/80 max-w-2xl">
          Ready for a quick intro or want a walkthrough of recent Angular work? Drop a note here or email canajfisnik@gmail.com directly.
        </p>
      </header>

      <app-contact-form />

      <div class="rounded-3xl border border-border/60 bg-white/70 p-6 shadow-soft dark:border-white/10 dark:bg-surface-card/80">
        <h2 class="text-lg font-heading text-slate-900 dark:text-text-primary">Direct links</h2>
        <ul class="mt-3 space-y-2 text-sm text-slate-600 dark:text-text-primary/80">
          <li><a class="link" href="mailto:canajfisnik@gmail.com">canajfisnik@gmail.com</a></li>
          <li><a class="link" href="https://www.linkedin.com/in/fisnik-canaj-angular-4b75a8157" target="_blank" rel="noopener">LinkedIn</a></li>
          <li><a class="link" href="https://github.com/fisnikcanaj1" target="_blank" rel="noopener">GitHub</a></li>
        </ul>
      </div>
    </section>
  `
})
export class ContactComponent {}

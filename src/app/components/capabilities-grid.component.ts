import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

interface CapabilityItem {
  title: string;
  body: string;
}

@Component({
  selector: 'app-capabilities-grid',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="mt-16 space-y-6">
      <header>
        <h2 class="text-2xl font-heading font-semibold text-slate-900 dark:text-text-primary">Capabilities</h2>
        <p class="mt-2 text-sm text-slate-500 dark:text-text-secondary">Where I tend to create the most leverage for teams.</p>
      </header>
      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article class="card" *ngFor="let capability of items">
          <div class="card-body space-y-3">
            <h3 class="text-lg font-heading text-slate-900 dark:text-text-primary">{{ capability.title }}</h3>
            <p class="text-sm text-slate-600 dark:text-text-primary/80 leading-relaxed">{{ capability.body }}</p>
          </div>
        </article>
      </div>
    </section>
  `
})
export class CapabilitiesGridComponent {
  @Input({ required: true }) items: CapabilityItem[] = [];
}

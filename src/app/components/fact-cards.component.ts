import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

interface FactCard {
  title: string;
  value: string;
  description: string;
}

@Component({
  selector: 'app-fact-cards',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <article class="card" *ngFor="let item of facts">
        <div class="card-body space-y-3">
          <p class="text-xs uppercase tracking-wide text-slate-500 dark:text-text-secondary">{{ item.title }}</p>
          <p class="text-2xl font-heading font-semibold text-slate-900 dark:text-text-primary">{{ item.value }}</p>
          <p class="text-sm text-slate-600 dark:text-text-primary/80">{{ item.description }}</p>
        </div>
      </article>
    </section>
  `
})
export class FactCardsComponent {
  @Input({ required: true }) facts: FactCard[] = [];
}

import { Component, inject, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../shared/data.service';

@Component({
  standalone: true,
  selector: 'app-experience',
  imports: [CommonModule],
  template: `
    <header class="mb-8">
      <h1 class="text-2xl font-bold">Experience</h1>
      <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">A concise history of recent roles and outcomes.</p>
    </header>

    <ng-container *ngIf="list().length; else loading">
      <ol class="relative border-s border-brand-200 dark:border-brand-800">
        <li class="mb-10 ms-6" *ngFor="let item of list()">
          <span class="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-white">•</span>
          <h3 class="text-lg font-semibold">{{item.title}} — {{item.company}}</h3>
          <time class="text-xs text-gray-500">{{item.period}}</time>
          <ul class="mt-2 list-disc ps-4 text-sm text-gray-700 dark:text-gray-300">
            <li *ngFor="let b of item.bullets">{{b}}</li>
          </ul>
        </li>
      </ol>

      <section class="mt-10">
        <h2 class="text-lg font-semibold">Skills & tools</h2>
        <div class="mt-3 flex flex-wrap gap-2">
          <span class="tag" *ngFor="let s of skills()">{{ s }}</span>
        </div>
      </section>

      <a class="btn btn-outline mt-8" href="/assets/Fisnik_Canaj__CV_.pdf" target="_blank" rel="noopener">Download full CV</a>
    </ng-container>

    <ng-template #loading>
      <p class="text-sm text-gray-500 dark:text-gray-400">Loading experience…</p>
    </ng-template>
  `
})
export class ExperienceComponent implements OnInit {
  ds = inject(DataService);
  p = computed(() => this.ds.profile());
  // Fallback to keep page meaningful before data exists
  private readonly fallback = [
    { company: 'Client Project', title: 'Frontend Developer', period: '2023 – 2024', bullets: ['Angular feature delivery with GraphQL & NgRx.', 'Improved performance and UX across core journeys.'] },
    { company: 'Agency', title: 'Frontend Engineer', period: '2021 – 2023', bullets: ['E‑commerce enhancements and design system work.', 'CI/CD and testing improvements.'] },
  ];

  list = computed(() => (this.p()?.experience?.length ? this.p()?.experience : this.fallback));
  skills = computed(() => (this.p()?.skills ?? ['Angular', 'TypeScript', 'RxJS', 'NgRx', 'Tailwind', 'GraphQL']));
  async ngOnInit(){ await this.ds.load(); }
}

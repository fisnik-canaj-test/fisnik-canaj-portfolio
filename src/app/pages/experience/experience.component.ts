import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../shared/data.service';

@Component({
  standalone: true,
  selector: 'app-experience',
  imports: [CommonModule],
  template: `
  <h2 class="text-2xl font-bold mb-6">Experience</h2>
  <ol class="relative border-s border-brand-200 dark:border-brand-800">
    <li class="mb-10 ms-6" *ngFor="let item of p()?.experience">
      <span class="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-white">•</span>
      <h3 class="text-lg font-semibold">{{item.title}} — {{item.company}}</h3>
      <time class="text-xs text-gray-500">{{item.period}}</time>
      <ul class="mt-2 list-disc ps-4 text-sm text-gray-700 dark:text-gray-300">
        <li *ngFor="let b of item.bullets">{{b}}</li>
      </ul>
    </li>
  </ol>
  `
})
export class ExperienceComponent {
  ds = inject(DataService);
  p = computed(() => this.ds.profile());
}


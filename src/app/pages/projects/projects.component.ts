import { ChangeDetectionStrategy, Component, inject, computed, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../shared/data.service';
import { ProjectSummary } from '../../shared/profile.model';
import { ProjectsFilterComponent } from '../../components/projects-filter.component';
import { ProjectCardComponent } from '../../components/project-card.component';

@Component({
  standalone: true,
  selector: 'app-projects',
  imports: [CommonModule, ProjectsFilterComponent, ProjectCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="space-y-8">
      <header class="space-y-2">
        <p class="text-xs uppercase tracking-[0.3em] text-brand-500 dark:text-brand-300">Projects</p>
        <h1 class="text-3xl font-bold text-slate-900 dark:text-text-primary dark:border-white/15 dark:text-gray-300">Selected collaborations</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 pb-8">
          Filter by capability to explore client work and product experiments.
        </p>
      </header>

      <app-projects-filter
        [filters]="tags()"
        [selected]="tag()"
        (filterChange)="setTag($event)"
      />

      @if (!loading()) {
        @let projects = filtered();
        @if (projects.length) {
          <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            @for (proj of projects; track proj.name) {
              <app-project-card [project]="proj" />
            }
          </div>
        } @else {
          <p class="text-sm text-gray-500 dark:text-gray-400">No projects match this filter just yet.</p>
        }
      } @else {
        <p class="text-sm text-gray-500 dark:text-gray-400">Loading projects…</p>
      }
    </section>
  `
})
export class ProjectsComponent implements OnInit {
  private readonly dataService = inject(DataService);
  readonly profile = this.dataService.profile;
  readonly tag = signal<'All' | string>('All');
  readonly loading = this.dataService.loading;

  readonly all = computed<ProjectSummary[]>(() => this.profile().projects);

  readonly tags = computed(() => {
    const projects = this.all();
    const bucket = new Set<string>();
    for (const project of projects) {
      for (const t of project.tags ?? []) bucket.add(t);
    }
    return Array.from(bucket).sort((a, b) => a.localeCompare(b));
  });

  setTag(t: string) {
    this.tag.set(t);
  }

  readonly filtered = computed<ProjectSummary[]>(() => {
    const all = this.all();
    const current = this.tag();
    if (current === 'All') return all;
    return all.filter((x) => (x.tags || []).includes(current));
  });

  async ngOnInit() {
    await this.dataService.load();
  }
}

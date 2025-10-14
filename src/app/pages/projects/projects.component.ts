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
        <h1 class="text-3xl font-bold text-slate-900 dark:text-text-primary">Selected collaborations</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Filter by capability to explore client work and product experiments.
        </p>
      </header>

      <app-projects-filter
        [filters]="tags()"
        [selected]="tag()"
        (filterChange)="setTag($event)"
      />

      <ng-container *ngIf="!loading(); else loadingState">
        <ng-container *ngIf="filtered() as projects">
          <div *ngIf="projects.length; else emptyState" class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <app-project-card *ngFor="let proj of projects" [project]="proj" />
          </div>
        </ng-container>
      </ng-container>

      <ng-template #emptyState>
        <p class="text-sm text-gray-500 dark:text-gray-400">No projects match this filter just yet.</p>
      </ng-template>

      <ng-template #loadingState>
        <p class="text-sm text-gray-500 dark:text-gray-400">Loading projects…</p>
      </ng-template>
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

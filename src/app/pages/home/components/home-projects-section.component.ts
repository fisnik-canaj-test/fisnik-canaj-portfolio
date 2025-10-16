import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LinkButtonComponent } from '../../../components/link-button.component';
import { ProjectCardComponent } from '../../../components/project-card.component';
import { ProjectSummary } from '../../../shared/profile.model';

@Component({
  selector: 'app-home-projects-section',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent, LinkButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block'
  },
  template: `
    @let projectsList = projects();

    <section id="projects" #projectsSection class="scroll-section">
      <span class="text-xs font-semibold uppercase tracking-[0.35em] text-brand-600 dark:text-brand-300">Projects</span>
      <h2 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
        Selected collaborations
      </h2>
      <div class="mt-8 grid gap-6">
        @for (project of projectsList; track project.name) {
          <app-project-card [project]="project" />
        }
      </div>

      <div class="mt-8 flex">
        <link-button [routerTo]="'/projects'">View full project catalog</link-button>
      </div>
    </section>
  `
})
export class HomeProjectsSectionComponent {
  readonly projects = input<ProjectSummary[]>([]);
}

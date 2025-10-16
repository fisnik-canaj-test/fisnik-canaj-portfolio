import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../shared/data.service';

@Component({
  standalone: true,
  selector: 'app-resume',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="grid gap-6">
      @let prof = profile();
      <article class="card">
        <div class="card-body">
          <h2 class="text-2xl font-bold">Curriculum Vitae</h2>
          <p class="mt-3 text-gray-600 dark:text-gray-300">
            Senior Angular engineer with 8+ years shipping high-traffic products for gaming, commerce, and enterprise.
            Download the latest CV or reach out using the links below.
          </p>
          <div class="mt-5 flex flex-wrap gap-3">
            <a class="btn" [href]="cvUrl" download>Download PDF</a>
            <a class="btn btn-outline" [href]="cvUrl" target="_blank" rel="noopener">Open in browser</a>
          </div>
          <dl class="mt-6 grid gap-2 text-sm text-gray-600 dark:text-gray-300">
            <div class="flex flex-wrap gap-2">
              <dt class="font-medium text-gray-900 dark:text-gray-100">Email:</dt>
              <dd><a class="link" [href]="'mailto:' + prof.email">{{ prof.email }}</a></dd>
            </div>
            <div class="flex flex-wrap gap-2">
              <dt class="font-medium text-gray-900 dark:text-gray-100">LinkedIn:</dt>
              <dd><a class="link" [href]="prof.links.linkedin" target="_blank" rel="noopener">{{ prof.links.linkedin }}</a></dd>
            </div>
            <div class="flex flex-wrap gap-2">
              <dt class="font-medium text-gray-900 dark:text-gray-100">GitHub:</dt>
              <dd><a class="link" [href]="prof.links.github" target="_blank" rel="noopener">{{ prof.links.github }}</a></dd>
            </div>
          </dl>
        </div>
      </article>

      <article class="card">
        <div class="card-body">
          <h3 class="text-xl font-semibold">Skills</h3>
          <div class="mt-3 flex flex-wrap gap-2">
            @for (skill of prof.skills; track skill) {
              <span class="tag">{{ skill }}</span>
            }
          </div>
        </div>
      </article>

      <article class="card">
        <div class="card-body">
          <h3 class="text-xl font-semibold">Experience</h3>
          <ol class="mt-4 relative border-s border-black/10 dark:border-white/10">
            @for (item of prof.experience; track item.company + item.period) {
              <li class="mb-6 ms-6">
                <span class="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-white">•</span>
                <div class="flex flex-wrap items-baseline gap-x-2">
                  <div class="font-medium">{{ item.title }}</div>
                  <div class="text-gray-500">— {{ item.company }}</div>
                  <time class="ms-auto text-xs text-gray-500">{{ item.period }}</time>
                </div>
                <ul class="mt-2 list-disc ps-4 text-sm text-gray-700 dark:text-gray-300">
                  @for (bullet of item.bullets; track bullet) {
                    <li>{{ bullet }}</li>
                  }
                </ul>
              </li>
            }
          </ol>
        </div>
      </article>

      <div class="grid md:grid-cols-2 gap-6">
        <article class="card">
          <div class="card-body">
            <h3 class="text-xl font-semibold">Education</h3>
            <ul class="mt-3 space-y-3">
              @for (edu of prof.education; track edu.school + edu.period) {
                <li>
                  <div class="font-medium">{{ edu.degree }}</div>
                  <div class="text-sm text-gray-600 dark:text-gray-300">{{ edu.school }} — {{ edu.location }}</div>
                  <div class="text-xs text-gray-500">{{ edu.period }}</div>
                </li>
              }
            </ul>
          </div>
        </article>
        <article class="card">
          <div class="card-body">
            <h3 class="text-xl font-semibold">Languages</h3>
            <div class="mt-3 flex flex-wrap gap-2">
              @for (language of prof.languages; track language) {
                <span class="tag">{{ language }}</span>
              }
            </div>
          </div>
        </article>
      </div>
    </section>
  `
})
export class ResumeComponent implements OnInit {
  private readonly dataService = inject(DataService);
  readonly profile = this.dataService.profile;
  protected readonly cvUrl = 'assets/resume/Fisnik_Canaj__CV_.pdf';
  async ngOnInit(){ await this.dataService.load(); }
}

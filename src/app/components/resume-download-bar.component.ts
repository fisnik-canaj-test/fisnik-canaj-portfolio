import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

interface ResumeLink {
  label: string;
  href: string;
}

@Component({
  selector: 'app-resume-download-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article class="card">
      <div class="card-body flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div class="space-y-2">
          <h2 class="text-2xl font-heading text-slate-900 dark:text-text-primary">Curriculum Vitae</h2>
          <p class="text-sm text-slate-600 dark:text-text-primary/80">
            Senior Angular engineer focused on dependable, SSR-fast interfaces. Reach out via the links or grab the PDF below.
          </p>
          <div class="flex flex-wrap gap-4 text-sm text-slate-500 dark:text-text-secondary">
            <a class="link" [href]="'mailto:' + email">{{ email }}</a>
            <a *ngFor="let link of links" class="link" [href]="link.href" target="_blank" rel="noopener">{{ link.label }}</a>
          </div>
        </div>
        <div class="flex flex-wrap gap-3">
          <a class="btn" [href]="cvUrl" download>Download PDF</a>
          <a class="btn-outline" [href]="cvUrl" target="_blank" rel="noopener">Open in browser</a>
        </div>
      </div>
    </article>
  `
})
export class ResumeDownloadBarComponent {
  @Input({ required: true }) cvUrl!: string;
  @Input({ required: true }) email!: string;
  @Input() links: ResumeLink[] = [];
}

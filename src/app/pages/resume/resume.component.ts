import { Component, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../shared/data.service';

@Component({
  standalone: true,
  selector: 'app-resume',
  imports: [CommonModule],
  template: `
    <section class="grid gap-6">
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
              <dd><a class="link" [href]="'mailto:' + profile().email">{{ profile().email }}</a></dd>
            </div>
            <div class="flex flex-wrap gap-2">
              <dt class="font-medium text-gray-900 dark:text-gray-100">LinkedIn:</dt>
              <dd><a class="link" [href]="profile().links?.linkedin" target="_blank" rel="noopener">{{ profile().links?.linkedin }}</a></dd>
            </div>
            <div class="flex flex-wrap gap-2">
              <dt class="font-medium text-gray-900 dark:text-gray-100">GitHub:</dt>
              <dd><a class="link" [href]="profile().links?.github" target="_blank" rel="noopener">{{ profile().links?.github }}</a></dd>
            </div>
          </dl>
        </div>
      </article>

      <article class="card" *ngIf="profile() as prof">
        <div class="card-body">
          <h3 class="text-xl font-semibold">Skills</h3>
          <div class="mt-3 flex flex-wrap gap-2">
            <span class="tag" *ngFor="let s of prof.skills">{{ s }}</span>
          </div>
        </div>
      </article>

      <article class="card" *ngIf="profile() as prof2">
        <div class="card-body">
          <h3 class="text-xl font-semibold">Experience</h3>
          <ol class="mt-4 relative border-s border-black/10 dark:border-white/10">
            <li *ngFor="let item of prof2.experience" class="mb-6 ms-6">
              <span class="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-white">•</span>
              <div class="flex flex-wrap items-baseline gap-x-2">
                <div class="font-medium">{{ item.title }}</div>
                <div class="text-gray-500">— {{ item.company }}</div>
                <time class="ms-auto text-xs text-gray-500">{{ item.period }}</time>
              </div>
              <ul class="mt-2 list-disc ps-4 text-sm text-gray-700 dark:text-gray-300">
                <li *ngFor="let b of item.bullets">{{ b }}</li>
              </ul>
            </li>
          </ol>
        </div>
      </article>

      <div class="grid md:grid-cols-2 gap-6" *ngIf="profile() as prof3">
        <article class="card">
          <div class="card-body">
            <h3 class="text-xl font-semibold">Education</h3>
            <ul class="mt-3 space-y-3">
              <li *ngFor="let e of prof3.education">
                <div class="font-medium">{{ e.degree }}</div>
                <div class="text-sm text-gray-600 dark:text-gray-300">{{ e.school }} — {{ e.location }}</div>
                <div class="text-xs text-gray-500">{{ e.period }}</div>
              </li>
            </ul>
          </div>
        </article>
        <article class="card">
          <div class="card-body">
            <h3 class="text-xl font-semibold">Languages</h3>
            <div class="mt-3 flex flex-wrap gap-2">
              <span class="tag" *ngFor="let l of prof3.languages">{{ l }}</span>
            </div>
          </div>
        </article>
      </div>
    </section>
  `
})
export class ResumeComponent implements OnInit {
  private ds = inject(DataService);
  p = computed(() => this.ds.profile());
  private readonly fallback = {
    skills: [
      'Angular (2–18)', 'TypeScript', 'RxJS', 'NgRx', 'Tailwind CSS',
      'GraphQL', 'Node.js', 'Express.js', 'Cypress', 'Builder.io'
    ],
    email: 'canajfisnik@gmail.com',
    links: {
      linkedin: 'https://www.linkedin.com/in/fisnik-canaj-angular-4b75a8157',
      github: 'https://github.com/fisnikcanaj1'
    },
    experience: [
      {
        title: 'Frontend Developer',
        company: 'Ancient Gaming',
        period: 'Nov 2023 – Present',
        bullets: [
          'CSGORoll – Angular 16/17 betting features using GraphQL/Apollo and NgRx.',
          'Built favourites and reliability improvements for high-traffic flows.',
          'Hypedrop – Admin login, password reset, and account experiences with Qwik and Tailwind.'
        ]
      }
    ],
    education: [
      {
        degree: 'BSc, Computer Science and Engineering',
        school: 'University for Business and Technology (UBT)',
        location: 'Pristina, Kosovo',
        period: '2014'
      }
    ],
    languages: ['English', 'Albanian']
  };
  profile = computed(() => ({ ...this.fallback, ...(this.p() ?? {}) }));
  protected readonly cvUrl = 'assets/resume/Fisnik_Canaj__CV_.pdf';
  async ngOnInit(){ await this.ds.load(); }
}

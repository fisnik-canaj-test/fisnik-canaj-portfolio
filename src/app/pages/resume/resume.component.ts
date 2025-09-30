import { Component, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../shared/data.service';

interface CaseStudy {
  name: string;
  summary: string;
  url: string;
}

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

      <article class="card">
        <div class="card-body">
          <h3 class="text-xl font-semibold">Selected Work</h3>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Highlights from recent contracts. Each link opens the live product where available.
          </p>
          <ul class="mt-5 space-y-4">
            <li *ngFor="let item of caseStudies" class="border border-black/5 dark:border-white/10 rounded-xl p-4">
              <div class="flex flex-col gap-1">
                <a class="font-medium link" [href]="item.url" target="_blank" rel="noopener">{{ item.name }}</a>
                <p class="text-sm text-gray-600 dark:text-gray-300">{{ item.summary }}</p>
              </div>
            </li>
          </ul>
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
          'Angular feature delivery for CSGORoll and Hypedrop.',
          'Improved stability, performance, and engagement features.'
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

  protected readonly caseStudies: CaseStudy[] = [
    {
      name: 'CSGORoll',
      summary: 'Angular 18 migration plus wishlist, favourites, and probability tooling for the betting experience.',
      url: 'https://csgoroll.com'
    },
    {
      name: 'Hypedrop',
      summary: 'Delivered auth and account flows for the admin interface using Qwik, GraphQL, and Tailwind.',
      url: 'https://hypedrop.com'
    },
    {
      name: 'Cartouche Club',
      summary: 'Resolved SEO blockers, added coupon-driven journeys, and improved product discovery.',
      url: 'https://cartoucheclub.com'
    },
    {
      name: 'Gadgetlend',
      summary: 'Refined the Angular storefront, shipped localisation, and modernised the design system.',
      url: 'https://gadgetlend.de'
    },
    {
      name: 'Gazeta Demos',
      summary: 'Launched a WordPress news platform with custom theming and automation.',
      url: 'https://gazetademos.com'
    },
    {
      name: 'Volvo Cars — Switzerland & Liechtenstein',
      summary: 'Contributed to e-commerce sales flow enhancements for regional markets.',
      url: 'https://www.volvocars.com'
    },
    {
      name: 'Celonis',
      summary: 'Built Angular UI components supporting the process mining platform.',
      url: 'https://www.celonis.com'
    },
    {
      name: 'E-Dea',
      summary: 'Delivered complex booking forms and reservation tooling for transport operations.',
      url: 'https://www.e-dea.com'
    }
  ];
  async ngOnInit(){ await this.ds.load(); }
}

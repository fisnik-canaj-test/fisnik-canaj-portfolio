import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

interface HeroCta {
  label: string;
  routerLink?: string;
  href?: string;
  external?: boolean;
}

interface HeroLink {
  label: string;
  href: string;
}

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="relative overflow-hidden rounded-[2.5rem] gradient-hero p-8 md:p-12 shadow-soft">
      <div class="absolute inset-x-10 -top-20 h-40 rounded-full bg-brand-500/10 blur-3xl"></div>
      <div class="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]">
        <div class="relative z-10 flex flex-col gap-6">
          <span class="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-500">
            <span class="block h-2 w-2 rounded-full bg-brand-500"></span>
            {{ title }}
          </span>
          <h1 class="text-4xl font-heading font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-text-primary">
            Hi, I'm <span class="text-brand-600 dark:text-brand-400">{{ name }}</span>
          </h1>
          <p class="text-xl text-slate-600 dark:text-text-secondary">
            {{ tagline }}
          </p>
          <p class="max-w-2xl text-base leading-relaxed text-slate-600 dark:text-text-primary/80 md:text-lg">
            {{ summary }}
          </p>
          <div class="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-text-secondary">
            <span class="inline-flex items-center gap-2 rounded-full bg-white/60 px-3 py-1 font-medium shadow-lift dark:bg-surface-card/80">
              <svg aria-hidden="true" viewBox="0 0 24 24" class="h-4 w-4 text-brand-500"><path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5.25 6.12 12.16 6.38 12.44.35.36.89.36 1.24 0C12.88 21.16 19 14.25 19 9a7 7 0 0 0-7-7m0 3.5A3.5 3.5 0 1 1 8.5 9 3.5 3.5 0 0 1 12 5.5"/></svg>
              {{ location }}
            </span>
            <span *ngFor="let highlight of highlights" class="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-brand-600 dark:border-brand-400/30 dark:bg-brand-500/15 dark:text-brand-300">
              {{ highlight }}
            </span>
          </div>
          <div class="flex flex-wrap gap-4 pt-2">
            <ng-container *ngIf="primaryCta as cta">
              <a
                *ngIf="cta.routerLink; else primaryExternal"
                [routerLink]="cta.routerLink"
                class="btn"
              >{{ cta.label }}</a>
              <ng-template #primaryExternal>
                <a
                  *ngIf="cta.href"
                  [href]="cta.href"
                  class="btn"
                  [attr.target]="cta.external ? '_blank' : null"
                  [attr.rel]="cta.external ? 'noopener' : null"
                >{{ cta.label }}</a>
              </ng-template>
            </ng-container>
            <ng-container *ngIf="secondaryCta as cta2">
              <a
                *ngIf="cta2.routerLink; else secondaryExternal"
                [routerLink]="cta2.routerLink"
                class="btn-outline"
              >{{ cta2.label }}</a>
              <ng-template #secondaryExternal>
                <a
                  *ngIf="cta2.href"
                  [href]="cta2.href"
                  class="btn-outline"
                  [attr.target]="cta2.external ? '_blank' : null"
                  [attr.rel]="cta2.external ? 'noopener' : null"
                >{{ cta2.label }}</a>
              </ng-template>
            </ng-container>
          </div>
          <div class="flex flex-wrap gap-4 text-sm text-slate-500 dark:text-text-secondary">
            <a
              *ngFor="let item of links"
              class="link inline-flex items-center gap-2"
              [href]="item.href"
              target="_blank"
              rel="noopener"
            >{{ item.label }}</a>
          </div>
        </div>

        <div class="relative z-10 grid gap-4">
          <figure *ngIf="heroImage" class="overflow-hidden rounded-3xl border border-border/40 bg-black/20">
            <img [src]="heroImage" [alt]="heroImageAlt" class="h-64 w-full object-cover" />
          </figure>
          <div *ngIf="avatar" class="card">
            <div class="card-body flex items-center gap-4">
              <img [src]="avatar" [alt]="name" class="h-24 w-24 rounded-full border border-white/40 object-cover shadow-lift" />
              <div class="space-y-1 text-sm">
                <p class="text-xs uppercase tracking-wide text-slate-500 dark:text-text-secondary">Current focus</p>
                <p class="font-medium text-slate-900 dark:text-text-primary">Angular · NgRx · Signals · GraphQL · Tailwind · SSR</p>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-body">
              <p class="text-xs uppercase tracking-wide text-slate-500 dark:text-text-secondary">Stack highlights</p>
              <div class="mt-3 flex flex-wrap gap-2">
                <span *ngFor="let tag of stackTags" class="tag">{{ tag }}</span>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-body space-y-2">
              <p class="text-xs uppercase tracking-wide text-slate-500 dark:text-text-secondary">Ways of working</p>
              <p class="text-sm text-slate-600 dark:text-text-primary/80">
                Clean architectures, performance budgeting, CI/CD enablement, strong async collaboration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class HeroSectionComponent {
  @Input() name = '';
  @Input() title = '';
  @Input() tagline = '';
  @Input() summary = '';
  @Input() location = '';
  @Input() highlights: string[] = [];
  @Input() stackTags: string[] = [];
  @Input() primaryCta?: HeroCta;
  @Input() secondaryCta?: HeroCta;
  @Input() links: HeroLink[] = [];
  @Input() avatar?: string;
  @Input() heroImage = 'assets/design/hero-fisnik@2x.jpg';
  @Input() heroImageAlt = 'Hero illustration';
}

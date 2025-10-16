import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Profile } from '../../../shared/profile.model';
import { NavSection } from '../../../shared/nav-sections';

@Component({
  selector: 'app-home-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block'
  },
  template: `
    @let data = profile();
    @let activeId = activeSectionId();
    @let currentSection = activeNavSection();

    <aside class="flex flex-col justify-between gap-6 h-full max-h-[calc(100vh-160px)] border-b border-black/10 pb-10 dark:border-white/10 lg:sticky lg:top-24  lg:border-none lg:pb-0">

      <div class="flex flex-col gap-6">
        <div>
          <p class="text-xs uppercase tracking-[0.35em] text-brand-600 dark:text-brand-300">{{ data.role }}</p>
          <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
            {{ data.name }}
          </h1>
          <p class="mt-4 text-base leading-relaxed text-gray-600 dark:text-gray-300">
            {{ data.summary }}
          </p>
        </div>

        <div class="flex flex-col gap-3">
          <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span class="uppercase tracking-[0.35em]">Active section</span>
            @if (currentSection.pageRoute) {
              <a
                class="link text-[11px] normal-case tracking-normal"
                [routerLink]="currentSection.pageRoute"
              >
                Open {{ currentSection.label }}
              </a>
            }
          </div>

          <nav class="flex flex-col gap-2 text-xs font-bold text-gray-500 dark:text-gray-400">
            @for (section of navSections(); track section.id) {
              <a
                routerLink="/"
                [fragment]="section.fragment"
                (click)="navigateToSection($event, section)"
                class="group inline-flex items-center gap-3 py-1 transition hover:text-black dark:hover:text-white uppercase"
                [attr.aria-current]="activeId === section.id ? 'true' : null"
                [ngClass]="activeId === section.id ? ['text-black', 'dark:text-white'] : []"
              >
                <span
                  class="h-px transition-all duration-200 group-hover:w-16 group-hover:bg-brand-500"
                  [ngClass]="activeId === section.id ? 'w-16 bg-brand-500' : 'w-8 bg-gray-300'"
                ></span>

                <span>{{ section.label }}</span>
              </a>
            }
          </nav>
        </div>
      </div>

      <div class="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
        @let locationLinkValue = locationLink();
        @if (locationLinkValue) {
          <a
            class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-gray-500 transition hover:border-brand-500 hover:text-brand-600 dark:border-white/15 dark:text-gray-300 dark:hover:border-brand-300 dark:hover:text-brand-200"
            [href]="locationLinkValue"
            target="_blank"
            rel="noopener"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" class="h-4 w-4 pointer-events-none">
              <use href="assets/icons/location.svg#icon-location" xlink:href="assets/icons/location.svg#icon-location"></use>
            </svg>
            <span class="sr-only">Based in {{ data.location }}</span>
          </a>
        } @else {
          <div class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-gray-500 dark:border-white/15 dark:text-gray-300" aria-hidden="true">
            <svg aria-hidden="true" viewBox="0 0 24 24" class="h-4 w-4 pointer-events-none">
              <use href="assets/icons/location.svg#icon-location" xlink:href="assets/icons/location.svg#icon-location"></use>
            </svg>
          </div>
        }

        <a
          class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-gray-500 transition hover:border-brand-500 hover:text-brand-600 dark:border-white/15 dark:text-gray-300 dark:hover:border-brand-300 dark:hover:text-brand-200"
          [href]="'mailto:' + data.email"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" class="h-4 w-4 pointer-events-none">
            <use href="assets/icons/mail.svg#icon-mail" xlink:href="assets/icons/mail.svg#icon-mail"></use>
          </svg>
          <span class="sr-only">Email {{ data.email }}</span>
        </a>

        @if (data.links.linkedin) {
          <a
            class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-gray-500 transition hover:border-brand-500 hover:text-brand-600 dark:border-white/15 dark:text-gray-300 dark:hover:border-brand-300 dark:hover:text-brand-200"
            [href]="data.links.linkedin"
            target="_blank"
            rel="noopener"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" class="h-4 w-4 pointer-events-none">
              <use href="assets/icons/linkedin.svg#icon-linkedin" xlink:href="assets/icons/linkedin.svg#icon-linkedin"></use>
            </svg>
            <span class="sr-only">LinkedIn profile</span>
          </a>
        }

        @if (data.links.github) {
          <a
            class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-gray-500 transition hover:border-brand-500 hover:text-brand-600 dark:border-white/15 dark:text-gray-300 dark:hover:border-brand-300 dark:hover:text-brand-200"
            [href]="data.links.github"
            target="_blank"
            rel="noopener"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" class="h-4 w-4 pointer-events-none">
              <use href="assets/icons/github.svg#icon-github" xlink:href="assets/icons/github.svg#icon-github"></use>
            </svg>
            <span class="sr-only">GitHub profile</span>
          </a>
        }

        @if (data.links.portfolio) {
          <a
            class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-gray-500 transition hover:border-brand-500 hover:text-brand-600 dark:border-white/15 dark:text-gray-300 dark:hover:border-brand-300 dark:hover:text-brand-200"
            [href]="data.links.portfolio"
            target="_blank"
            rel="noopener"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" class="h-4 w-4 pointer-events-none">
              <use href="assets/icons/globe.svg#icon-globe" xlink:href="assets/icons/globe.svg#icon-globe"></use>
            </svg>
            <span class="sr-only">Portfolio</span>
          </a>
        }
      </div>
    </aside>
  `
})
export class HomeSidebarComponent {
  private readonly router = inject(Router);

  readonly profile = input.required<Profile>();
  readonly navSections = input<NavSection[]>([]);
  readonly activeSectionId = input('about');
  readonly activeNavSection = input.required<NavSection>();
  readonly locationLink = input<string | null>(null);

  navigateToSection(event: Event, section: NavSection): void {
    event.preventDefault();
    void this.router.navigate([''], {
      fragment: section.fragment,
      queryParamsHandling: 'preserve'
    });
  }
}

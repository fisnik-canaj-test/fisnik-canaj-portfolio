import { AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { DataService } from '../../shared/data.service';
import { ScrollService } from '../../shared/scroll.service';
import { filter } from 'rxjs';
import { IntersectionObserverService } from '../../shared/intersection-observer.service';
import { NAV_SECTIONS, NavSection } from '../../shared/nav-sections';
import { ProjectSummary } from '../../shared/profile.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HomeSidebarComponent } from './components/home-sidebar.component';
import { HomeAboutSectionComponent } from './components/home-about-section.component';
import { HomeExperienceSectionComponent } from './components/home-experience-section.component';
import { HomeProjectsSectionComponent } from './components/home-projects-section.component';
import { HomeContactSectionComponent } from './components/home-contact-section.component';

interface SkillHighlight {
  title: string;
  body: string;
}

const TOP_SKILLS: SkillHighlight[] = [
  {
    title: 'Frontend Architecture',
    body: 'Standalone Angular, NX mono-repos, Signal & NgRx state patterns, design systems that scale.'
  },
  {
    title: 'Performance Engineering',
    body: 'Hydration control, deferrable views, bundle analytics, Core Web Vitals-driven regressions.'
  },
  {
    title: 'Product Impact',
    body: 'Conversion-minded UX: favourites, auth, checkout flows and A/B experimentation.'
  },
  {
    title: 'Team Enablement',
    body: 'Code reviews, pairing, documentation, and CI pipelines that unblock cross-functional squads.'
  },
  {
    title: 'Design Systems & Accessibility',
    body: 'Accessible component libraries, Storybook-driven documentation, and UI audits that keep multi-brand experiences cohesive.'
  },
  {
    title: 'Platform Reliability',
    body: 'Release hygiene, observability wiring, and smoke-test suites that keep deployments predictable.'
  }
];

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    CommonModule,
    HomeSidebarComponent,
    HomeAboutSectionComponent,
    HomeExperienceSectionComponent,
    HomeProjectsSectionComponent,
    HomeContactSectionComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, AfterViewInit {
  private readonly dataService = inject(DataService);
  private readonly router = inject(Router);
  private readonly scroll = inject(ScrollService);
  private readonly intersectionObserver = inject(IntersectionObserverService);
  private readonly destroyRef = inject(DestroyRef);

  readonly profile = this.dataService.profile;

  readonly topSkills = TOP_SKILLS;

  readonly navSections = NAV_SECTIONS;

  readonly featuredProjects = computed<ProjectSummary[]>(() => {
    const projects = this.profile().projects ?? [];
    const priorityNames = new Set(['CSGORoll', 'Hypedrop', 'Celonis', 'Volvo Cars', 'Avodaq']);

    const priorityProjects = projects.filter((project) => priorityNames.has(project.name));
    const fallbackProjects = projects.filter((project) => !priorityNames.has(project.name));

    return priorityProjects.concat(fallbackProjects).slice(0, 5);
  });

  readonly additionalProjects = computed<ProjectSummary[]>(() => {
    const projects = this.profile().projects ?? [];
    const featuredNames = new Set(this.featuredProjects().map((project) => project.name));
    return projects.filter((project) => !featuredNames.has(project.name));
  });

  readonly locationMapLink = computed<string | null>(() => {
    const location = this.profile().location?.trim();
    if (!location) return null;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
  });
  readonly experiencePreview = computed(() => (this.profile().experience ?? []).slice(0, 3));

  readonly activeSection = signal<string>('about');
  readonly activeNavSection = computed<NavSection>(() => {
    const current = this.activeSection();
    return this.navSections.find((section) => section.id === current) ?? this.navSections[0]!;
  });

  ngOnInit(): void {
    void this.dataService.load();

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.handleFragmentScroll());
  }

  ngAfterViewInit(): void {
    this.setupSectionObserver();
    this.handleFragmentScroll();
  }

  private setupSectionObserver(): void {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    const targets = this.navSections
      .map((section) => document.getElementById(section.id))
      .filter((el): el is HTMLElement => !!el);

    if (!targets.length) {
      return;
    }

    this.intersectionObserver
      .observeElements(targets, {
        root: null,
        rootMargin: '-35% 0px -55% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));
        const top = visible[0];
        if (top?.target?.id) {
          this.activeSection.set(top.target.id);
        }
      });
  }

  private handleFragmentScroll(): void {
    const fragment = this.router.parseUrl(this.router.url).fragment;
    if (!fragment) {
      return;
    }

    const knownSection = this.navSections.some((section) => section.id === fragment);
    if (knownSection) {
      this.activeSection.set(fragment);
    }

    requestAnimationFrame(() => {
      this.scroll.scrollTo(fragment, 24);
    });
  }
}

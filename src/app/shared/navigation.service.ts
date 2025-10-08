import { Injectable, computed, signal } from '@angular/core';
import { NAV_SECTIONS } from './nav-sections';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  readonly navSections = NAV_SECTIONS;

  private readonly _activeSection = signal<string>(NAV_SECTIONS[0]?.id ?? '');
  readonly activeSection = this._activeSection.asReadonly();

  readonly activeNavSection = computed(() => {
    const id = this._activeSection();
    return this.navSections.find((section) => section.id === id) ?? this.navSections[0]!;
  });

  setActiveSection(sectionId: string): void {
    if (!sectionId || sectionId === this._activeSection()) {
      return;
    }

    const exists = this.navSections.some((section) => section.id === sectionId);
    if (exists) {
      this._activeSection.set(sectionId);
    }
  }
}

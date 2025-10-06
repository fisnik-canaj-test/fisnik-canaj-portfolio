import { Injectable, signal, inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  private readonly storageKey = 'theme-preference';
  private readonly modeSignal = signal<'light' | 'dark'>(this.getInitialMode());

  readonly mode = this.modeSignal.asReadonly();

  constructor() {
    this.apply();
  }

  toggle(): void {
    this.modeSignal.update((mode) => (mode === 'dark' ? 'light' : 'dark'));
    this.apply();
    this.persist();
  }

  private getInitialMode(): 'light' | 'dark' {
    if (!isPlatformBrowser(this.platformId)) return 'dark';

    const stored = localStorage.getItem(this.storageKey);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }

    return 'dark';
  }

  private apply(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const html = document.documentElement;
    html.classList.toggle('dark', this.modeSignal() === 'dark');
  }

  private persist(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.setItem(this.storageKey, this.modeSignal());
  }
}

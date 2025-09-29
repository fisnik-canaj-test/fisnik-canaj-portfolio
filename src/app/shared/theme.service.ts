import { Injectable, signal, inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  mode = signal<'light'|'dark'>(
    isPlatformBrowser(this.platformId) && globalThis.matchMedia?.('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  );

  constructor(){ this.apply(); }

  toggle(){
    this.mode.update(m => (m === 'dark' ? 'light' : 'dark'));
    this.apply();
  }

  private apply(){
    if (!isPlatformBrowser(this.platformId)) return;
    const html = document.documentElement;
    if (this.mode() === 'dark') html.classList.add('dark');
    else html.classList.remove('dark');
  }
}


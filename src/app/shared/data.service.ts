import { Injectable, signal, inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class DataService {
  private platformId = inject(PLATFORM_ID);
  profile = signal<any>(null);

  async load(){
    if (!isPlatformBrowser(this.platformId)) return; // avoid SSR fetch
    const res = await fetch('/assets/data/profile.json');
    this.profile.set(await res.json());
  }
}


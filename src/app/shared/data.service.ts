import { Injectable, signal, inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class DataService {
  private platformId = inject(PLATFORM_ID);
  profile = signal<any>(null);

  async load(){
    if (!isPlatformBrowser(this.platformId)) return; // avoid SSR fetch
    if (this.profile() !== null) return; // already loaded or in-flight
    try {
      const base = document?.baseURI ?? window.location.origin ?? '/';
      const url = new URL('assets/data/profile.json', base).toString();
      const res = await fetch(url, { cache: 'no-cache' });
      if (!res.ok) throw new Error(String(res.status));
      this.profile.set(await res.json());
    } catch (e) {
      console.error('Failed to load profile.json', e);
      this.profile.set(null);
    }
  }
}

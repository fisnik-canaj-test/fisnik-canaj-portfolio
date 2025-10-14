import { Injectable, inject, signal } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Profile } from './profile.model';
import { FALLBACK_PROFILE } from './profile.defaults';
import { normaliseProfile } from './profile.utils';

@Injectable({ providedIn: 'root' })
export class DataService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly loadingState = signal(false);
  private readonly hydratedState = signal(false);
  private readonly profileState = signal<Profile>(FALLBACK_PROFILE);

  readonly profile = this.profileState.asReadonly();
  readonly loading = this.loadingState.asReadonly();
  readonly hydrated = this.hydratedState.asReadonly();

  async load(): Promise<void> {
    if (this.loadingState()) {
      return;
    }

    if (!isPlatformBrowser(this.platformId)) return;
    if (this.hydratedState()) return;

    this.loadingState.set(true);
    try {
      const base = document?.baseURI ?? window.location.origin ?? '/';
      const url = new URL('assets/data/profile.json', base).toString();
      const res = await fetch(url, { cache: 'no-cache' });
      if (!res.ok) {
        console.error('Failed to load profile.json', { status: res.status, statusText: res.statusText });
        return;
      }
      const payload = (await res.json()) as Partial<Profile>;
      this.profileState.set(normaliseProfile(payload));
    } catch (e) {
      console.error('Failed to load profile.json', e);
    } finally {
      this.hydratedState.set(true);
      this.loadingState.set(false);
    }
  }
}

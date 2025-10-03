import { Component, Inject, NgZone, OnDestroy, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ThemeService } from './shared/theme.service';
import { DataService } from './shared/data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('tempname');
  private removePointerListeners: (() => void) | null = null;

  constructor(
    public theme: ThemeService,
    private ds: DataService,
    private zone: NgZone,
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(PLATFORM_ID) private readonly platformId: Object,
  ) {
    // Preload profile data so deep-linked pages have content immediately.
    void this.ds.load();
  }
  year = new Date().getFullYear();

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.zone.runOutsideAngular(() => {
      const root = this.document.documentElement;
      const updateSpot = (event: PointerEvent) => {
        const { innerWidth, innerHeight } = window;
        if (!innerWidth || !innerHeight) {
          return;
        }
        const x = (event.clientX / innerWidth) * 100;
        const y = (event.clientY / innerHeight) * 100;
        root.style.setProperty('--page-spot-x', `${x}%`);
        root.style.setProperty('--page-spot-y', `${y}%`);
        root.style.setProperty('--page-spot-opacity', '0.22');
      };

      let animationFrame: number | null = null;
      let latestEvent: PointerEvent | null = null;
      let idleTimeout: number | null = null;

      const scheduleUpdate = (event: PointerEvent) => {
        latestEvent = event;
        if (animationFrame !== null) {
          return;
        }
        animationFrame = window.requestAnimationFrame(() => {
          if (latestEvent) {
            updateSpot(latestEvent);
          }
          animationFrame = null;
        });
      };

      const handlePointerMove = (event: PointerEvent) => {
        scheduleUpdate(event);
        if (idleTimeout !== null) {
          window.clearTimeout(idleTimeout);
        }
        idleTimeout = window.setTimeout(() => {
          root.style.setProperty('--page-spot-opacity', '0');
        }, 1500);
      };

      const fadeOut = () => {
        if (idleTimeout !== null) {
          window.clearTimeout(idleTimeout);
          idleTimeout = null;
        }
        root.style.setProperty('--page-spot-opacity', '0');
      };

      window.addEventListener('pointermove', handlePointerMove, { passive: true });
      window.addEventListener('pointerleave', fadeOut, { passive: true });
      window.addEventListener('blur', fadeOut);

      this.removePointerListeners = () => {
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerleave', fadeOut);
        window.removeEventListener('blur', fadeOut);
        if (animationFrame !== null) {
          window.cancelAnimationFrame(animationFrame);
        }
        if (idleTimeout !== null) {
          window.clearTimeout(idleTimeout);
        }
        root.style.setProperty('--page-spot-opacity', '0');
      };
    });
  }

  ngOnDestroy(): void {
    if (this.removePointerListeners) {
      this.removePointerListeners();
      this.removePointerListeners = null;
    }
  }
}

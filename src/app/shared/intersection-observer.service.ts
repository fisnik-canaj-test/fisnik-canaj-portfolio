import { ElementRef, Injectable, inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class IntersectionObserverService {
  private readonly platformId = inject(PLATFORM_ID);

  createAndObserve<T extends Element>(
    element: ElementRef<T> | null | undefined,
    options: IntersectionObserverInit = { root: null, threshold: 0.1 }
  ): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      if (!isPlatformBrowser(this.platformId)) {
        observer.complete();
        return;
      }

      const target = element?.nativeElement;
      if (!target) {
        observer.complete();
        return;
      }

      const intersectionObserver = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (entry) {
          observer.next(entry.isIntersecting);
        }
      }, options);

      intersectionObserver.observe(target);

      return () => intersectionObserver.disconnect();
    }).pipe(distinctUntilChanged());
  }
}

import { ElementRef, Injectable, inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class IntersectionObserverService {
  private readonly platformId = inject(PLATFORM_ID);

  observeElements<T extends Element>(
    elements: readonly (ElementRef<T> | T | null | undefined)[],
    options: IntersectionObserverInit = { root: null, threshold: 0.1 }
  ): Observable<IntersectionObserverEntry[]> {
    return new Observable<IntersectionObserverEntry[]>((subscriber) => {
      if (!isPlatformBrowser(this.platformId)) {
        subscriber.complete();
        return;
      }

      const targets = elements
        .map((target) => {
          if (!target) {
            return null;
          }
          if (target instanceof ElementRef) {
            return target.nativeElement;
          }
          return target;
        })
        .filter((target): target is T => !!target);

      if (!targets.length) {
        subscriber.complete();
        return;
      }

      const observer = new IntersectionObserver((entries) => {
        if (!entries.length) {
          return;
        }
        subscriber.next(entries);
      }, options);

      targets.forEach((target) => observer.observe(target));

      return () => observer.disconnect();
    });
  }

  createAndObserve<T extends Element>(
    element: ElementRef<T> | null | undefined,
    options: IntersectionObserverInit = { root: null, threshold: 0.1 }
  ): Observable<boolean> {
    return this.observeElements([element], options).pipe(
      map((entries) => entries[0]?.isIntersecting ?? false),
      distinctUntilChanged()
    );
  }
}

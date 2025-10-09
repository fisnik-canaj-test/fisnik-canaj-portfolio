import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  private readonly win: Window | null;

  constructor(@Inject(DOCUMENT) private readonly document: Document) {
    this.win = this.document.defaultView;
  }

  scrollTo(id: string, extraOffset = 24): void {
    const targetEl = this.document.querySelector<HTMLElement>(`#${id}`);
    if (!targetEl || !this.win) {
      return;
    }

    const headerOffset = this.getHeaderOffset();
    const totalOffset = headerOffset + extraOffset;

    const rectTop = targetEl.getBoundingClientRect().top;
    const absoluteTop = rectTop + this.document.documentElement.scrollTop;
    const destination = Math.max(absoluteTop - totalOffset, 0);

    this.win.scrollTo({
      top: destination,
      behavior: 'smooth',
    });

    this.focusElement(targetEl);
  }

  private getHeaderOffset(): number {
    const root = this.document.documentElement;
    const inlineValue = root.style.getPropertyValue('--app-header-height');
    const computedValue = this.win?.getComputedStyle(root).getPropertyValue('--app-header-height');

    const value = inlineValue || computedValue || '';
    const parsed = Number.parseInt(value, 10);
    return Number.isNaN(parsed) || parsed <= 0 ? 104 : parsed;
  }

  private focusElement(el: HTMLElement): void {
    const previousTabIndex = el.getAttribute('tabindex');
    const needsTabIndex = !el.hasAttribute('tabindex') && el.tabIndex < 0;

    if (needsTabIndex) {
      el.setAttribute('tabindex', '-1');
    }

    try {
      el.focus({ preventScroll: true });
    } catch {
      el.focus();
    }

    if (needsTabIndex) {
      if (previousTabIndex === null) {
        el.removeAttribute('tabindex');
      } else {
        el.setAttribute('tabindex', previousTabIndex);
      }
    }
  }
}

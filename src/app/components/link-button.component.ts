import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-link-button, link-button',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let routerLinkValue = routerTo();
    @let hrefValue = href();
    @let iconVisible = showIcon();

    <ng-template #slot>
      <ng-content></ng-content>
    </ng-template>

    <ng-template #icon>
      <span class="pointer-events-none">
        <svg aria-hidden="true" viewBox="0 0 20 20" class="h-4 w-4">
          <use href="assets/icons/arrow-up-right.svg#icon-arrow-up-right" xlink:href="assets/icons/arrow-up-right.svg#icon-arrow-up-right"></use>
        </svg>
      </span>
    </ng-template>

    <ng-template #body>
      <span class="inline-flex items-center gap-2">
        <ng-container *ngTemplateOutlet="slot"></ng-container>
        @if (iconVisible) {
          <ng-container *ngTemplateOutlet="icon"></ng-container>
        }
      </span>
    </ng-template>

    @if (routerLinkValue) {
      <a
        [class]="baseClasses"
        [routerLink]="routerLinkValue"
        [queryParams]="queryParams()"
      >
        <ng-container *ngTemplateOutlet="body"></ng-container>
      </a>
    } @else if (hrefValue) {
      <a
        [class]="baseClasses"
        [href]="hrefValue"
        rel="noopener"
        [attr.target]="target()"
      >
        <ng-container *ngTemplateOutlet="body"></ng-container>
      </a>
    } @else {
      <button
        [class]="baseClasses"
        [attr.type]="type()"
      >
        <ng-container *ngTemplateOutlet="body"></ng-container>
      </button>
    }
  `
})
export class LinkButtonComponent {
  readonly routerTo = input<string | null>(null);
  readonly queryParams = input<Record<string, unknown> | null>(null);
  readonly href = input<string | null>(null);
  readonly target = input('_blank');
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly showIcon = input(true);

  readonly baseClasses =
    'inline-flex items-center gap-2 rounded-full border border-slate-300/70 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-brand-500 hover:text-brand-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400 dark:border-slate-700/70 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:border-brand-300 dark:hover:text-brand-200';
}

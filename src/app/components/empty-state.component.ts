import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

interface EmptyStateCta {
  label: string;
  routerLink?: string;
  href?: string;
}

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="card text-center">
      <div class="card-body flex flex-col items-center gap-4">
        <img *ngIf="image" [src]="image" [alt]="title" class="h-48 w-auto" />
        <h3 class="text-2xl font-heading text-slate-900 dark:text-text-primary">{{ title }}</h3>
        <p class="max-w-md text-sm text-slate-600 dark:text-text-primary/80">{{ body }}</p>
        <ng-container *ngIf="cta as action">
          <a
            *ngIf="action.routerLink; else ctaExternal"
            [routerLink]="action.routerLink"
            class="btn-outline"
          >{{ action.label }}</a>
          <ng-template #ctaExternal>
            <a *ngIf="action.href" [href]="action.href" class="btn-outline">{{ action.label }}</a>
          </ng-template>
        </ng-container>
      </div>
    </div>
  `
})
export class EmptyStateComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) body!: string;
  @Input() image?: string;
  @Input() cta?: EmptyStateCta;
}

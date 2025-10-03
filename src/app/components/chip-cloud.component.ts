import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chip-cloud',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-wrap gap-2">
      <span *ngFor="let chip of chips" class="chip" [class.chip--active]="accent === chip">{{ chip }}</span>
    </div>
  `
})
export class ChipCloudComponent {
  @Input() chips: string[] = [];
  @Input() accent?: string;
}

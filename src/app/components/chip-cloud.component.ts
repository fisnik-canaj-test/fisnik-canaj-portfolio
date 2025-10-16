import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-chip-cloud',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-wrap gap-2">
      @for (chip of chips(); track chip) {
        <span class="chip" [class.chip--active]="accent() === chip">{{ chip }}</span>
      }
    </div>
  `
})
export class ChipCloudComponent {
  readonly chips = input<string[]>([]);
  readonly accent = input<string | undefined>(undefined);
}

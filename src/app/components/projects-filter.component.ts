import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, input } from '@angular/core';

@Component({
  selector: 'app-projects-filter',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-wrap gap-2">
      <button
        type="button"
        class="chip"
        [class.chip--active]="selected() === 'All'"
        (click)="choose('All')"
      >All</button>
      @for (filter of filters(); track filter) {
        <button
          type="button"
          class="chip"
          [class.chip--active]="selected() === filter"
          (click)="choose(filter)"
        >{{ filter }}</button>
      }
    </div>
  `
})
export class ProjectsFilterComponent {
  readonly filters = input<string[]>([]);
  readonly selected = input('All');
  @Output() filterChange = new EventEmitter<string>();

  choose(filter: string) {
    if (filter === this.selected()) return;
    this.filterChange.emit(filter);
  }
}

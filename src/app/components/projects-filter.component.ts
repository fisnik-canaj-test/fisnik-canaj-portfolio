import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

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
        [class.chip--active]="selected === 'All'"
        (click)="choose('All')"
      >All</button>
      <button
        *ngFor="let filter of filters"
        type="button"
        class="chip"
        [class.chip--active]="selected === filter"
        (click)="choose(filter)"
      >{{ filter }}</button>
    </div>
  `
})
export class ProjectsFilterComponent {
  @Input() filters: string[] = [];
  @Input() selected = 'All';
  @Output() filterChange = new EventEmitter<string>();

  choose(filter: string) {
    if (filter === this.selected) return;
    this.filterChange.emit(filter);
  }
}

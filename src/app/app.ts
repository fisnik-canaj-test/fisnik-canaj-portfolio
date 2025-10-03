import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ThemeService } from './shared/theme.service';
import { DataService } from './shared/data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tempname');
  constructor(public theme: ThemeService, private ds: DataService) {
    // Preload profile data so deep-linked pages have content immediately.
    void this.ds.load();
  }
  year = new Date().getFullYear();
}

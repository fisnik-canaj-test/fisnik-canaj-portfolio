import { Component, OnInit, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataService } from '../../shared/data.service';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  template: `
  <section class="relative overflow-hidden rounded-3xl gradient-hero p-8 md:p-12">
    <div class="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h1 class="text-3xl md:text-5xl font-bold tracking-tight">Hi, I'm <span class="text-brand-600">{{p()?.name}}</span> — {{p()?.role}}</h1>
        <p class="mt-4 text-gray-600 dark:text-gray-300 max-w-prose">{{p()?.summary}}</p>
        <div class="mt-6 flex gap-3">
          <a routerLink="/projects" class="btn">View Projects</a>
          <a routerLink="/resume" class="btn btn-outline">Download Resume</a>
        </div>
        <div class="mt-6 text-sm text-gray-500 flex gap-6">
          <a class="link" [href]="p()?.links.github" target="_blank">GitHub</a>
          <a class="link" [href]="p()?.links.portfolio" target="_blank">Portfolio</a>
          <a class="link" [href]="p()?.links.linkedin" target="_blank">LinkedIn</a>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div class="card"><div class="card-body">
          <div class="text-xs uppercase text-gray-500">Stack</div>
          <div class="mt-2 text-sm">Angular · NgRx · RxJS · GraphQL · Tailwind</div>
        </div></div>
        <div class="card"><div class="card-body">
          <div class="text-xs uppercase text-gray-500">Industries</div>
          <div class="mt-2 text-sm">Gaming/Gambling, E‑commerce, Healthcare</div>
        </div></div>
        <div class="card col-span-2"><div class="card-body">
          <div class="text-xs uppercase text-gray-500">Recent</div>
          <div class="mt-2 text-sm">CSGORoll rewrite · Hypedrop account flows · Volvo module</div>
        </div></div>
      </div>
    </div>
  </section>

  <section class="mt-10 grid md:grid-cols-3 gap-6">
    <div class="card" *ngFor="let s of topSkills">
      <div class="card-body">
        <div class="font-semibold">{{s.title}}</div>
        <div class="mt-2 text-sm text-gray-600 dark:text-gray-300">{{s.body}}</div>
      </div>
    </div>
  </section>
  `
})
export class HomeComponent implements OnInit {
  ds = inject(DataService);
  p = computed(() => this.ds.profile());
  topSkills = [
    { title: 'Frontend Architecture', body: 'Standalone Angular, NX monorepo, state with signals/NgRx.' },
    { title: 'Performance', body: 'Hydration, lazy routes, deferrable views, bundle discipline.' },
    { title: 'Product Impact', body: 'UX that converts: favourites, auth, checkout flows.' },
  ];
  async ngOnInit(){ await this.ds.load(); }
}


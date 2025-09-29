import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-resume',
  imports: [CommonModule],
  template: `
  <section class="card">
    <div class="card-body">
      <h2 class="text-2xl font-bold">Resume</h2>
      <p class="mt-2 text-gray-600 dark:text-gray-300">Download my latest CV as PDF.</p>
      <a class="btn mt-4" href="/assets/resume/Fisnik_Canaj_CV.pdf" download>Download PDF</a>
    </div>
  </section>
  `
})
export class ResumeComponent {}


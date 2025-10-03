import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article class="card">
      <form [formGroup]="form" novalidate (ngSubmit)="handleSubmit()" class="card-body space-y-6">
        <header class="space-y-2">
          <h2 class="text-2xl font-heading text-slate-900 dark:text-text-primary">Let's collaborate</h2>
          <p class="text-sm text-slate-600 dark:text-text-primary/80">
            Share a few details about your project or team and I’ll follow up within a day.
          </p>
        </header>
        <div class="grid gap-4 md:grid-cols-2">
          <label class="flex flex-col gap-2 text-sm font-medium text-slate-600 dark:text-text-primary/80">
            Name
            <input
              type="text"
              formControlName="name"
              class="rounded-xl border border-border/60 bg-white/60 px-4 py-3 text-slate-900 outline-none transition ease-brand focus:border-brand-400 focus:ring-2 focus:ring-brand-400/40 dark:bg-surface-card dark:text-text-primary"
              [class.border-red-500]="submitted() && form.controls.name.invalid"
              placeholder="Your name"
            />
          </label>
          <label class="flex flex-col gap-2 text-sm font-medium text-slate-600 dark:text-text-primary/80">
            Email
            <input
              type="email"
              formControlName="email"
              class="rounded-xl border border-border/60 bg-white/60 px-4 py-3 text-slate-900 outline-none transition ease-brand focus:border-brand-400 focus:ring-2 focus:ring-brand-400/40 dark:bg-surface-card dark:text-text-primary"
              [class.border-red-500]="submitted() && form.controls.email.invalid"
              placeholder="you@company.com"
            />
          </label>
        </div>
        <label class="flex flex-col gap-2 text-sm font-medium text-slate-600 dark:text-text-primary/80">
          Message
          <textarea
            rows="5"
            formControlName="message"
            class="rounded-xl border border-border/60 bg-white/60 px-4 py-3 text-slate-900 outline-none transition ease-brand focus:border-brand-400 focus:ring-2 focus:ring-brand-400/40 dark:bg-surface-card dark:text-text-primary"
            placeholder="What would you like to work on?"
          ></textarea>
        </label>
        <div class="flex flex-col gap-2">
          <button type="submit" class="btn w-full md:w-auto">Send message</button>
          <p *ngIf="submitted() && form.invalid" class="text-xs text-red-500">Please fill in the required fields.</p>
          <p *ngIf="submitted() && form.valid" class="text-xs text-brand-500">Thanks! I’ll follow up shortly.</p>
        </div>
      </form>
    </article>
  `
})
export class ContactFormComponent {
  private fb = inject(FormBuilder);
  submitted = signal(false);

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.minLength(10)]],
  });

  handleSubmit(): void {
    this.submitted.set(true);
    if (this.form.invalid) return;
    this.form.reset();
  }
}

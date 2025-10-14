import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

export interface ContactFormPayload {
  name: string;
  email: string;
  company: string;
  message: string;
}

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form
      class="flex flex-col gap-6 rounded-3xl border border-slate-200/60 bg-slate-50/80 p-7 shadow-[0_22px_44px_rgba(15,23,42,0.12)] backdrop-blur-sm transition-colors dark:border-slate-700/50 dark:bg-slate-900/80 md:p-9"
      [formGroup]="form"
      (ngSubmit)="onSubmit()"
      novalidate
    >
      <div class="grid gap-4 sm:grid-cols-2 sm:gap-5">
        <label class="flex flex-col gap-2">
          <span class="text-xs font-semibold uppercase tracking-[0.12em] text-slate-600 dark:text-slate-300">Name *</span>
          <input
            type="text"
            formControlName="name"
            class="w-full rounded-xl border border-indigo-500/20 bg-white/90 px-4 py-3 text-base text-slate-900 transition focus:outline-none focus:ring-4 placeholder:text-slate-400 dark:border-slate-700/60 dark:bg-slate-950/60 dark:text-slate-100 dark:placeholder:text-slate-500"
            [ngClass]="controlInvalid('name') ? 'border-rose-500 ring-2 ring-rose-200/70 focus:border-rose-500 focus:ring-rose-300/70 dark:border-rose-400 dark:focus:border-rose-400 dark:ring-rose-500/40 dark:focus:ring-rose-500/40' : 'focus:border-sky-500/60 focus:ring-sky-200/60 dark:focus:border-sky-400/70 dark:focus:ring-sky-500/30'"
            autocomplete="name"
            placeholder="Your name"
          >
          <span *ngIf="controlInvalid('name')" class="text-xs text-rose-700 dark:text-rose-300">
            <ng-container *ngIf="controls.name.hasError('required'); else nameTooLong">
              Please share your name.
            </ng-container>
            <ng-template #nameTooLong>
              Name looks a bit long—mind shortening it?
            </ng-template>
          </span>
        </label>

        <label class="flex flex-col gap-2">
          <span class="text-xs font-semibold uppercase tracking-[0.12em] text-slate-600 dark:text-slate-300">Email *</span>
          <input
            type="email"
            formControlName="email"
            class="w-full rounded-xl border border-indigo-500/20 bg-white/90 px-4 py-3 text-base text-slate-900 transition focus:outline-none focus:ring-4 placeholder:text-slate-400 dark:border-slate-700/60 dark:bg-slate-950/60 dark:text-slate-100 dark:placeholder:text-slate-500"
            [ngClass]="controlInvalid('email') ? 'border-rose-500 ring-2 ring-rose-200/70 focus:border-rose-500 focus:ring-rose-300/70 dark:border-rose-400 dark:focus:border-rose-400 dark:ring-rose-500/40 dark:focus:ring-rose-500/40' : 'focus:border-sky-500/60 focus:ring-sky-200/60 dark:focus:border-sky-400/70 dark:focus:ring-sky-500/30'"
            autocomplete="email"
            placeholder="you@company.com"
          >
          <span *ngIf="controlInvalid('email')" class="text-xs text-rose-700 dark:text-rose-300">
            <ng-container *ngIf="controls.email.hasError('required'); else emailDetail">
              An email helps me follow up.
            </ng-container>
            <ng-template #emailDetail>
              <ng-container *ngIf="controls.email.hasError('email'); else emailLength">
                Please use a valid email address.
              </ng-container>
              <ng-template #emailLength>
                Email looks a bit long—could you shorten it?
              </ng-template>
            </ng-template>
          </span>
        </label>

        <label class="flex flex-col gap-2">
          <span class="text-xs font-semibold uppercase tracking-[0.12em] text-slate-600 dark:text-slate-300">Company</span>
          <input
            type="text"
            formControlName="company"
            class="w-full rounded-xl border border-indigo-500/20 bg-white/90 px-4 py-3 text-base text-slate-900 transition focus:outline-none focus:ring-4 placeholder:text-slate-400 dark:border-slate-700/60 dark:bg-slate-950/60 dark:text-slate-100 dark:placeholder:text-slate-500"
            [ngClass]="controlInvalid('company') ? 'border-rose-500 ring-2 ring-rose-200/70 focus:border-rose-500 focus:ring-rose-300/70 dark:border-rose-400 dark:focus:border-rose-400 dark:ring-rose-500/40 dark:focus:ring-rose-500/40' : 'focus:border-sky-500/60 focus:ring-sky-200/60 dark:focus:border-sky-400/70 dark:focus:ring-sky-500/30'"
            autocomplete="organization"
            placeholder="Organisation (optional)"
          >
          <span *ngIf="controlInvalid('company')" class="text-xs text-rose-700 dark:text-rose-300">
            Could you shorten the company name?
          </span>
        </label>

        <label class="flex flex-col gap-2 sm:col-span-2">
          <span class="text-xs font-semibold uppercase tracking-[0.12em] text-slate-600 dark:text-slate-300">Project details *</span>
          <textarea
            formControlName="message"
            class="w-full resize-y rounded-xl border border-indigo-500/20 bg-white/90 px-4 py-3 text-base text-slate-900 transition focus:outline-none focus:ring-4 placeholder:text-slate-400 dark:border-slate-700/60 dark:bg-slate-950/60 dark:text-slate-100 dark:placeholder:text-slate-500"
            [ngClass]="controlInvalid('message') ? 'border-rose-500 ring-2 ring-rose-200/70 focus:border-rose-500 focus:ring-rose-300/70 dark:border-rose-400 dark:focus:border-rose-400 dark:ring-rose-500/40 dark:focus:ring-rose-500/40' : 'focus:border-sky-500/60 focus:ring-sky-200/60 dark:focus:border-sky-400/70 dark:focus:ring-sky-500/30'"
            rows="6"
            placeholder="Timelines, goals, links—anything that’s helpful."
          ></textarea>
          <span *ngIf="controlInvalid('message')" class="text-xs text-rose-700 dark:text-rose-300">
            <ng-container *ngIf="controls.message.hasError('required'); else messageRange">
              A short summary helps me understand your needs.
            </ng-container>
            <ng-template #messageRange>
              <ng-container *ngIf="controls.message.hasError('minlength'); else messageLong">
                A few more details will help me respond accurately.
              </ng-container>
              <ng-template #messageLong>
                This message is quite long—could you trim it down a little?
              </ng-template>
            </ng-template>
          </span>
        </label>
      </div>

      <div class="flex flex-wrap items-center gap-4">
        <button
          class="inline-flex items-center justify-center rounded-full bg-gradient-to-tr from-sky-200 to-indigo-200 px-6 py-3 text-base font-semibold tracking-[0.04em] text-slate-900 shadow transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 disabled:pointer-events-none disabled:cursor-progress disabled:opacity-60 disabled:shadow-none dark:text-slate-900"
          type="submit"
          [disabled]="isSending()"
        >
          {{ isSending() ? pendingLabel : submitLabel }}
        </button>
        <div class="flex flex-col gap-1 text-xs">
          <span *ngIf="submitAttempted() && form.invalid" class="text-rose-600 dark:text-rose-300">
            Please fill in the required fields.
          </span>
          <span *ngIf="sendSuccess() === true" class="text-brand-600 dark:text-brand-300">
            {{ successCopy }}
          </span>
          <span *ngIf="sendSuccess() === false" class="text-rose-600 dark:text-rose-300">
            {{ errorCopy }}
          </span>
        </div>
      </div>
    </form>
  `
})
export class ContactFormComponent {
  private readonly fb = inject(FormBuilder);

  @Input() submitLabel = 'Send message';
  @Input() pendingLabel = 'Sending…';
  @Input() successCopy = 'Thanks! I’ll follow up shortly.';
  @Input() errorCopy = 'Something went wrong. Please try again shortly.';
  @Input() submitHandler?: (payload: ContactFormPayload) => Promise<void>;
  @Input() simulateDelay = 1200;

  @Output() submitted = new EventEmitter<ContactFormPayload>();

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(80)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(120)]],
    company: ['', Validators.maxLength(120)],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1200)]],
  });
  readonly controls = this.form.controls;

  readonly isSending = signal(false);
  readonly sendSuccess = signal<boolean | null>(null);
  readonly submitAttempted = signal(false);

  controlInvalid(control: keyof typeof this.controls): boolean {
    const field = this.controls[control];
    return field.invalid && (field.touched || this.submitAttempted());
  }

  async onSubmit(): Promise<void> {
    if (this.isSending()) {
      return;
    }

    this.submitAttempted.set(true);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSending.set(true);
    this.sendSuccess.set(null);

    const payload = this.form.getRawValue();

    try {
      if (this.submitHandler) {
        await this.submitHandler(payload);
      } else {
        await new Promise((resolve) => setTimeout(resolve, this.simulateDelay));
      }
      this.sendSuccess.set(true);
      this.submitted.emit(payload);
      this.form.reset({
        name: '',
        email: '',
        company: '',
        message: '',
      });
      this.form.markAsPristine();
      this.form.markAsUntouched();
      this.submitAttempted.set(false);
    } catch (error) {
      console.error('Contact form submission failed', error);
      this.sendSuccess.set(false);
    } finally {
      this.isSending.set(false);
    }
  }
}

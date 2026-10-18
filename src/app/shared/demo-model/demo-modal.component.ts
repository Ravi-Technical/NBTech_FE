import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select'; 
import { DemoModalData, DemoRequest } from '../demo-modal.model';
import { DemoRequestService } from '../demo-request.service';

@Component({
  selector: 'app-demo-modal',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './demo-modal.component.html',
  styleUrl: './demo-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoModalComponent {
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<DemoModalComponent, DemoRequest>);
  private readonly api = inject<DemoRequestService>(DemoRequestService);
  private readonly injected = inject<DemoModalData | null>(MAT_DIALOG_DATA, { optional: true });

  protected readonly config: Required<Omit<DemoModalData, 'source'>> & { source?: string } = {
    title: this.injected?.title ?? 'Book a demo',
    subtitle:
      this.injected?.subtitle ??
      "Tell us a little about you and we'll reply within one business day.",
    submitLabel: this.injected?.submitLabel ?? 'Request demo',
    source: this.injected?.source,
  };

  protected readonly teamSizes = ['Website Development', 'SEO Service', 'Web Application', 'Enterprise', 'Other'];

  protected readonly submitting = signal(false);
  protected readonly result = signal<DemoRequest | null>(null);
  protected readonly error = signal<string | null>(null);

  protected readonly form = this.fb.nonNullable.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    company: ['', Validators.required],
    phone: ['', Validators.pattern(/^[+\d][\d\s()-]{6,18}$/)],
    service: ['', Validators.required],
  });

  protected async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.error.set(null);

    const request: DemoRequest = this.form.getRawValue();

    try {
      await this.api.submit(request, this.config.source);
      this.result.set(request);
    } catch {
      this.error.set('We could not send your request. Check your connection and try again.');
    } finally {
      this.submitting.set(false);
    }
  }

  protected done(): void {
    this.dialogRef.close(this.result() ?? undefined);
  }
}
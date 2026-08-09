import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Activity, CreateActivityRequest } from '../activity';
import { ActivityStore } from '../activity.store';

@Component({
  selector: 'app-activity-form',
  imports: [ReactiveFormsModule],
  templateUrl: './activity-form.html',
  styleUrl: './activity-form.scss',
})
export class ActivityForm {
  private readonly dialogRef = inject(MatDialogRef<ActivityForm>);
  private readonly activityService = inject(Activity);
  private readonly store = inject(ActivityStore);

  form = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl('', { nonNullable: true }),
  });

  loading = false;

  get nameControl() {
    return this.form.controls.name;
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    const { name, description } = this.form.getRawValue();
    const request: CreateActivityRequest = {
      name: name.trim(),
      description: description.trim() || undefined,
    };

    this.activityService.create(request).subscribe({
      next: (activity) => {
        this.store.addActivity(activity);
        this.dialogRef.close();
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}

import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivityRecord, CreateActivityRecordRequest } from '../activity-record';
import { ActivityRecordStore } from '../activity-record.store';
import { ActivityStore } from '../../activity/activity.store';
type TimeOfDay = 'MORNING' | 'AFTERNOON' | 'EVENING' | 'NIGHT';
@Component({
  selector: 'app-activity-record-form',
  imports: [ReactiveFormsModule],
  templateUrl: './activity-record-form.html',
  styleUrl: './activity-record-form.scss',
})
export class ActivityRecordForm {
  private readonly dialogRef = inject(MatDialogRef<ActivityRecordForm>);
  private readonly activityRecordService = inject(ActivityRecord);
  private readonly store = inject(ActivityRecordStore);
  readonly activityStore = inject(ActivityStore);

  form = new FormGroup({
    activityId: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    date: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    timeOfDay: new FormControl<TimeOfDay | ''>('', { nonNullable: true }),
    durationMinutes: new FormControl<number | null>(null),
    description: new FormControl('', { nonNullable: true }),
  });

  loading = false;

  readonly timeOfDayOptions = [
    { value: 'MORNING', label: 'Morning' },
    { value: 'AFTERNOON', label: 'Afternoon' },
    { value: 'EVENING', label: 'Evening' },
    { value: 'NIGHT', label: 'Night' },
  ];

  get activityIdControl() {
    return this.form.controls.activityId;
  }
  get dateControl() {
    return this.form.controls.date;
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    const { activityId, date, timeOfDay, durationMinutes, description } = this.form.getRawValue();
    const request: CreateActivityRecordRequest = {
      activityId,
      date,
      timeOfDay: timeOfDay || undefined,
      durationMinutes: durationMinutes ?? undefined,
      description: description.trim() || undefined,
    };

    this.activityRecordService.create(request).subscribe({
      next: (record) => {
        this.store.addRecord(record);
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

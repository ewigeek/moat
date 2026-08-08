import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ActivityRecord, CreateActivityRecordRequest } from '../activity-record';
import { ActivityRecordStore } from '../activity-record.store';
import { ActivityStore } from '../../activity/activity.store';

@Component({
  selector: 'app-activity-record-form',
  imports: [
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './activity-record-form.html',
  styleUrl: './activity-record-form.scss',
})
export class ActivityRecordForm {
  private readonly dialogRef = inject(MatDialogRef<ActivityRecordForm>);
  private readonly activityRecordService = inject(ActivityRecord);
  private readonly store = inject(ActivityRecordStore);
  readonly activityStore = inject(ActivityStore);

  activityId = '';
  date: Date | null = null;
  durationMinutes: number | null = null;
  loading = false;

  submit() {
    if (!this.activityId || !this.date) return;

    this.loading = true;
    const request: CreateActivityRecordRequest = {
      activityId: this.activityId,
      date: this.date.toISOString().split('T')[0],
      durationMinutes: this.durationMinutes ?? undefined,
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
}

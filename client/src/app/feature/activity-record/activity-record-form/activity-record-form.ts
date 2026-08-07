import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivityRecord, CreateActivityRecordRequest } from '../activity-record';
import { ActivityRecordStore } from '../activity-record.store';
import { ActivityStore } from '../../activity/activity.store';

@Component({
  selector: 'app-activity-record-form',
  imports: [FormsModule],
  templateUrl: './activity-record-form.html',
  styleUrl: './activity-record-form.scss',
})
export class ActivityRecordForm {
  private readonly activityRecordService = inject(ActivityRecord);
  private readonly store = inject(ActivityRecordStore);
  readonly activityStore = inject(ActivityStore);

  activityId = '';
  date = '';
  durationMinutes: number | null = null;
  loading = false;

  submit() {
    if (!this.activityId || !this.date) return;

    this.loading = true;
    const request: CreateActivityRecordRequest = {
      activityId: this.activityId,
      date: this.date,
      durationMinutes: this.durationMinutes ?? undefined,
    };

    this.activityRecordService.create(request).subscribe({
      next: (record) => {
        this.store.addRecord(record);
        this.activityId = '';
        this.date = '';
        this.durationMinutes = null;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}

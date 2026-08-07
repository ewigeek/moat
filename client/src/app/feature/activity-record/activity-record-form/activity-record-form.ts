import { Component, inject, OnInit, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Activity, ActivityResponse } from '../../activity/activity';
import {
  ActivityRecord,
  ActivityRecordResponse,
  CreateActivityRecordRequest,
} from '../activity-record';

@Component({
  selector: 'app-activity-record-form',
  imports: [FormsModule],
  templateUrl: './activity-record-form.html',
  styleUrl: './activity-record-form.scss',
})
export class ActivityRecordForm implements OnInit {
  private readonly activityRecordService = inject(ActivityRecord);
  private readonly activityService = inject(Activity);

  created = output<ActivityRecordResponse>();

  activities = signal<ActivityResponse[]>([]);
  activityId = '';
  date = '';
  durationMinutes: number | null = null;
  loading = false;

  ngOnInit() {
    this.activityService.getAll().subscribe({
      next: (data) => this.activities.set(data),
    });
  }

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
        this.created.emit(record);
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

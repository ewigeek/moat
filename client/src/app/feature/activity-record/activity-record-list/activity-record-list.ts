import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivityRecord, ActivityRecordResponse } from '../activity-record';
import { ActivityRecordForm } from '../activity-record-form/activity-record-form';

@Component({
  selector: 'app-activity-record-list',
  imports: [ActivityRecordForm],
  templateUrl: './activity-record-list.html',
  styleUrl: './activity-record-list.scss',
})
export class ActivityRecordList implements OnInit {
  private readonly activityRecordService = inject(ActivityRecord);

  records = signal<ActivityRecordResponse[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading.set(true);
    this.activityRecordService.getAll().subscribe({
      next: (data) => {
        this.records.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load activity records');
        this.loading.set(false);
      },
    });
  }

  onCreated(record: ActivityRecordResponse) {
    this.records.update((list) => [...list, record]);
  }
}

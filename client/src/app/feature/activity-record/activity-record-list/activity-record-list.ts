import { Component, inject } from '@angular/core';
import { ActivityRecordStore } from '../activity-record.store';
import { ActivityStore } from '../../activity/activity.store';
import { ActivityRecordForm } from '../activity-record-form/activity-record-form';

@Component({
  selector: 'app-activity-record-list',
  imports: [ActivityRecordForm],
  templateUrl: './activity-record-list.html',
  styleUrl: './activity-record-list.scss',
})
export class ActivityRecordList {
  readonly store = inject(ActivityRecordStore);
  readonly activityStore = inject(ActivityStore);

  getActivityName(activityId: string): string {
    return this.activityStore.activities().find((a) => a.id === activityId)?.name ?? activityId;
  }
}

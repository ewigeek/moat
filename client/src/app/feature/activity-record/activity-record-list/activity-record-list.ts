import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ActivityRecordStore } from '../activity-record.store';
import { ActivityStore } from '../../activity/activity.store';
import { ActivityRecordForm } from '../activity-record-form/activity-record-form';

@Component({
  selector: 'app-activity-record-list',
  imports: [MatDialogModule, MatButtonModule, MatTableModule, MatIconModule],
  templateUrl: './activity-record-list.html',
  styleUrl: './activity-record-list.scss',
})
export class ActivityRecordList {
  readonly store = inject(ActivityRecordStore);
  readonly activityStore = inject(ActivityStore);
  private readonly dialog = inject(MatDialog);

  readonly displayedColumns = ['date', 'activity', 'duration', 'actions'];

  openCreateDialog() {
    this.dialog.open(ActivityRecordForm, { width: '420px' });
  }

  getActivityName(activityId: string): string {
    return this.activityStore.activities().find((a) => a.id === activityId)?.name ?? '—';
  }
}

import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ActivityStore } from '../activity.store';
import { ActivityForm } from '../activity-form/activity-form';

@Component({
  selector: 'app-activity-list',
  imports: [MatDialogModule, MatButtonModule, MatTableModule, MatIconModule],
  templateUrl: './activity-list.html',
  styleUrl: './activity-list.scss',
})
export class ActivityList {
  readonly store = inject(ActivityStore);
  private readonly dialog = inject(MatDialog);

  readonly displayedColumns = ['name', 'actions'];

  openCreateDialog() {
    this.dialog.open(ActivityForm, { width: '400px' });
  }
}

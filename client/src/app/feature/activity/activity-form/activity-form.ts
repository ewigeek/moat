import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Activity, CreateActivityRequest } from '../activity';
import { ActivityStore } from '../activity.store';

@Component({
  selector: 'app-activity-form',
  imports: [FormsModule, MatDialogModule, MatButtonModule, MatInputModule, MatFormFieldModule],
  templateUrl: './activity-form.html',
  styleUrl: './activity-form.scss',
})
export class ActivityForm {
  private readonly dialogRef = inject(MatDialogRef<ActivityForm>);
  private readonly activityService = inject(Activity);
  private readonly store = inject(ActivityStore);

  name = '';
  loading = false;

  submit() {
    if (!this.name.trim()) return;

    this.loading = true;
    const request: CreateActivityRequest = { name: this.name };

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
}

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Activity, CreateActivityRequest } from '../activity';
import { ActivityStore } from '../activity.store';

@Component({
  selector: 'app-activity-form',
  imports: [FormsModule],
  templateUrl: './activity-form.html',
  styleUrl: './activity-form.scss',
})
export class ActivityForm {
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
        this.name = '';
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}

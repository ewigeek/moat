import { Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Activity, ActivityResponse, CreateActivityRequest } from '../activity';

@Component({
  selector: 'app-activity-form',
  imports: [FormsModule],
  templateUrl: './activity-form.html',
  styleUrl: './activity-form.scss',
})
export class ActivityForm {
  private readonly activityService = inject(Activity);

  created = output<ActivityResponse>();

  name = '';
  loading = false;

  submit() {
    if (!this.name.trim()) return;

    this.loading = true;
    const request: CreateActivityRequest = { name: this.name };

    this.activityService.create(request).subscribe({
      next: (activity) => {
        this.created.emit(activity);
        this.name = '';
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}

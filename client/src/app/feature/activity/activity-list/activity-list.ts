import { Component, inject, OnInit, signal } from '@angular/core';
import { Activity, ActivityResponse } from '../activity';
import { ActivityForm } from '../activity-form/activity-form';

@Component({
  selector: 'app-activity-list',
  imports: [ActivityForm],
  templateUrl: './activity-list.html',
  styleUrl: './activity-list.scss',
})
export class ActivityList implements OnInit {
  private readonly activityService = inject(Activity);

  activities = signal<ActivityResponse[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading.set(true);
    this.activityService.getAll().subscribe({
      next: (data) => {
        this.activities.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load activities');
        this.loading.set(false);
      },
    });
  }

  onCreated(activity: ActivityResponse) {
    this.activities.update((list) => [...list, activity]);
  }
}

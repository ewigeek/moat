import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Activity, ActivityResponse } from '../activity';

@Component({
  selector: 'app-activity-list',
  imports: [CommonModule],
  templateUrl: './activity-list.html',
  styleUrl: './activity-list.scss',
})
export class ActivityList implements OnInit {
  private readonly activityService = inject(Activity);

  activities = signal<ActivityResponse[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  ngOnInit() {
    console.log('ActivityList init');
    this.loading.set(true);
    this.activityService.getAll().subscribe({
      next: (data) => {
        this.activities.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error:', err);
        this.error.set('Cannot load activities');
        this.loading.set(false);
      },
    });
  }
}

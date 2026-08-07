import { Component, inject } from '@angular/core';
import { ActivityStore } from '../activity.store';
import { ActivityForm } from '../activity-form/activity-form';

@Component({
  selector: 'app-activity-list',
  imports: [ActivityForm],
  templateUrl: './activity-list.html',
  styleUrl: './activity-list.scss',
})
export class ActivityList {
  readonly store = inject(ActivityStore);

  onCreated() {}
}

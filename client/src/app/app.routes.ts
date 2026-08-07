import { Routes } from '@angular/router';
import { ActivityList } from './feature/activity/activity-list/activity-list';
import { ActivityRecordList } from './feature/activity-record/activity-record-list/activity-record-list';

export const routes: Routes = [
  { path: '', redirectTo: 'activities', pathMatch: 'full' },
  { path: 'activities', component: ActivityList },
  { path: 'activity-records', component: ActivityRecordList },
];

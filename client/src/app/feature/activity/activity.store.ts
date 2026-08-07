import { inject } from '@angular/core';
import { signalStore, withState, withMethods, withHooks } from '@ngrx/signals';
import { patchState } from '@ngrx/signals';
import { Activity, ActivityResponse } from './activity';

export interface ActivityState {
  activities: ActivityResponse[];
  loading: boolean;
  error: string | null;
}

const initialState: ActivityState = {
  activities: [],
  loading: false,
  error: null,
};

export const ActivityStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, activityService = inject(Activity)) => ({
    loadAll() {
      patchState(store, { loading: true, error: null });
      activityService.getAll().subscribe({
        next: (activities) => patchState(store, { activities, loading: false }),
        error: () => patchState(store, { error: 'Failed to load activities', loading: false }),
      });
    },
    addActivity(activity: ActivityResponse) {
      patchState(store, { activities: [...store.activities(), activity] });
    },
  })),
  withHooks({
    onInit(store) {
      store.loadAll();
    },
  }),
);

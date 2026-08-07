import { inject } from '@angular/core';
import { signalStore, withState, withMethods, withHooks } from '@ngrx/signals';
import { patchState } from '@ngrx/signals';
import { ActivityRecord, ActivityRecordResponse } from './activity-record';

export interface ActivityRecordState {
  records: ActivityRecordResponse[];
  loading: boolean;
  error: string | null;
}

const initialState: ActivityRecordState = {
  records: [],
  loading: false,
  error: null,
};

export const ActivityRecordStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, activityRecordService = inject(ActivityRecord)) => ({
    loadAll() {
      patchState(store, { loading: true, error: null });
      activityRecordService.getAll().subscribe({
        next: (records) => patchState(store, { records, loading: false }),
        error: () =>
          patchState(store, { error: 'Failed to load activity records', loading: false }),
      });
    },
    addRecord(record: ActivityRecordResponse) {
      patchState(store, { records: [...store.records(), record] });
    },
  })),
  withHooks({
    onInit(store) {
      store.loadAll();
    },
  }),
);

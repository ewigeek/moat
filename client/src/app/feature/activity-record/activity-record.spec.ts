import { TestBed } from '@angular/core/testing';

import { ActivityRecord } from './activity-record';

describe('ActivityRecord', () => {
  let service: ActivityRecord;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivityRecord);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

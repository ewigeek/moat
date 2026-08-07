import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityRecordList } from './activity-record-list';

describe('ActivityRecordList', () => {
  let component: ActivityRecordList;
  let fixture: ComponentFixture<ActivityRecordList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityRecordList],
    }).compileComponents();

    fixture = TestBed.createComponent(ActivityRecordList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

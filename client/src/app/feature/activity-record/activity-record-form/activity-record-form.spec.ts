import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityRecordForm } from './activity-record-form';

describe('ActivityRecordForm', () => {
  let component: ActivityRecordForm;
  let fixture: ComponentFixture<ActivityRecordForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityRecordForm],
    }).compileComponents();

    fixture = TestBed.createComponent(ActivityRecordForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

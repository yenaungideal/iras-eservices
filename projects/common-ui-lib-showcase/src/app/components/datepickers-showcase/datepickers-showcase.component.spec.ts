import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DatePickersShowcaseComponent } from './datepickers-showcase.component';

describe('DatetimepickersShowcaseComponent', () => {
  let component: DatePickersShowcaseComponent;
  let fixture: ComponentFixture<DatePickersShowcaseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DatePickersShowcaseComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePickersShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogStepperComponent } from './dialog-stepper.component';

describe('DialogStepperComponent', () => {
  let component: DialogStepperComponent;
  let fixture: ComponentFixture<DialogStepperComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DialogStepperComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

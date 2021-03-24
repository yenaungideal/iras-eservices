import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalService } from '../modal/modal.service';
import { StepperViewComponent } from './stepper-view.component';
import { TemplateRef } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('StepperViewComponent', () => {
  let component: StepperViewComponent;
  let fixture: ComponentFixture<StepperViewComponent>;
  let service: ModalService;
  let modalContentRef: TemplateRef<any>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [StepperViewComponent],
        providers: [
          { provide: ModalService, useClass: ModalServiceStub },
          {
            provide: MatDialogRef,
            useValue: {
              close: () => {},
            },
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperViewComponent);
    component = fixture.componentInstance;
    component.headings = ['Getting Started', 'Assets'];
    component.activeIndex = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call show modal when clicking icon', () => {
    spyOn(fixture.componentInstance, 'showModal').and.callThrough();
    const continueButton = fixture.debugElement.query(By.css('#stepper-icon'));
    continueButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.showModal).toHaveBeenCalled();
  });
});

class ModalServiceStub {
  hide() {}
  show() {}
}

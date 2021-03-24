import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MaskedInputComponent } from './masked-input.component';
import { ElementRef } from '@angular/core';
import { MaskedTextBoxComponent } from '@progress/kendo-angular-inputs';

export class MockElementRef extends ElementRef<MaskedTextBoxComponent> {}

describe('MaskedInputComponent', () => {
  let component: MaskedInputComponent;
  let fixture: ComponentFixture<MaskedInputComponent>;
  let inputElement: HTMLInputElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MaskedInputComponent],
        providers: [
          {
            provide: ElementRef,
            useClass: MockElementRef,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MaskedInputComponent);
    component = fixture.componentInstance;
    inputElement = fixture.debugElement.nativeElement.shadowRoot.querySelector('.masked-input__field');
    fixture.detectChanges();
  });
});

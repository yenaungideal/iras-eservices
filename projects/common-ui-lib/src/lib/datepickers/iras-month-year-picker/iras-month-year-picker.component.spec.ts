import { ComponentFixture, ComponentFixtureAutoDetect, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IrasMonthYearPickerComponent } from './iras-month-year-picker.component';
import { IrasMonthYearPickerModule } from './iras-month-year-picker.module';

describe('IrasMonthYearPickerComponent', () => {
  let component: IrasMonthYearPickerComponent;
  let fixture: ComponentFixture<IrasMonthYearPickerComponent>;
  let inputElement: HTMLInputElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [IrasMonthYearPickerModule, BrowserAnimationsModule],
        providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(IrasMonthYearPickerComponent);
          component = fixture.componentInstance;
          inputElement = fixture.debugElement.nativeElement.shadowRoot.querySelector(
            '.iras-month-year-picker__masked-input'
          );
        });
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#maskedInputValue should be undefined if write value passes undefined', () => {
    component.value = undefined;
    expect(component.maskedInputValue).toBeUndefined();
  });

  it('#maskedInputValue should be  null', () => {
    component.value = '' as any;
    fixture.detectChanges();
    expect(component.maskedInputValue).toBeNull();
  });

  it('#maskedInputValue should change if correct date provided', () => {
    component.value = '2020-01-14' as any;
    fixture.detectChanges();
    expect(component.maskedInputValue).toBe('01/2020');
  });

  it('#selectedDate prop should not change if previous and current values are equal', () => {
    component.value = '2020-01-01' as any;
    fixture.detectChanges();
    const previousSelectedDate = component.value;
    component.value = new Date('2020-01-01') as any;
    fixture.detectChanges();
    const currentSelectedDate = component.value;

    expect(previousSelectedDate.toString()).toBe(currentSelectedDate.toString());
  });

  it('#maskedInputValue should change when new date is picked', () => {
    component.value = '2020-01-14' as any;
    fixture.detectChanges();
    component.value = new Date('2020-Aug-30');
    fixture.detectChanges();
    const expectedValue = '08/2020';
    expect(component.maskedInputValue).toBe(expectedValue);
  });

  // Function test
  it('getFormattedDate() - tests', () => {
    let dateStr: string;
    // display date tests
    dateStr = component.getFormattedDate({ date: '', formatType: 'display' });
    expect(dateStr).toBeFalsy();
    dateStr = component.getFormattedDate({ date: new Date('2020-30-Aug'), formatType: 'display' });
    expect(dateStr).toBe('08/2020', 'dint format new Date() correctly');
    dateStr = component.getFormattedDate({ date: '2020-09-01', formatType: 'display' });
    expect(dateStr).toBe('09/2020', 'dint format date string correctly');

    dateStr = component.getFormattedDate({ date: '', formatType: 'output' });
    expect(dateStr).toBeFalsy();
    dateStr = component.getFormattedDate({ date: new Date('2020-30-Aug'), formatType: 'output' });
    expect(dateStr).toBe('2020-08', 'dint format new Date() correctly');
    dateStr = component.getFormattedDate({ date: '2020-09-01', formatType: 'output' });
    expect(dateStr).toBe('2020-09', 'dint format date string correctly');
  });

  it('#datePicker should not open on input click', () => {
    component.setDisabledState(true);
    fixture.detectChanges();
    inputElement.click();
    fixture.detectChanges();

    const datePickerPopupRef = document.querySelector<HTMLElement>('.cdk-overlay-pane.mat-datepicker-popup');
    expect(datePickerPopupRef).toBeFalsy('datepicker should not open');
  });

  // functional tests for open
  it('#open() - should open if not disabled', () => {
    component.setDisabledState(false);
    fixture.detectChanges();

    component.open();
    fixture.detectChanges();
    const datePickerPopupRef = document.querySelector<HTMLElement>('.cdk-overlay-pane.mat-datepicker-popup');
    expect(datePickerPopupRef).toBeTruthy('datepicker should open');
  });
  it('#open() - should not open if disabled', () => {
    component.setDisabledState(true);
    fixture.detectChanges();

    component.open();
    fixture.detectChanges();
    const datePickerPopupRef = document.querySelector<HTMLElement>('.cdk-overlay-pane.mat-datepicker-popup');
    expect(datePickerPopupRef).toBeFalsy('datepicker should not open');
  });

  it('#registerOnChange should call onChange', () => {
    component.registerOnChange(() => {});
    expect(component.onChange).toBeTruthy();
  });

  it('#registerOnTouched should call onTouch', () => {
    component.registerOnTouched(() => {});
    expect(component.onTouch).toBeTruthy();
  });

  it('#onDatePickerClose should work', () => {
    const spyNext = spyOn(component.monthYearPickerClosed$, 'next').and.callThrough();
    const spyComplete = spyOn(component.monthYearPickerClosed$, 'complete').and.callThrough();
    component.onDatePickerClose();
    expect(spyNext).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  });

  it('#onDateChange should emit the dateChanged event', () => {
    const spy = spyOn(component.dateChanged, 'emit').and.callThrough();
    component.onDateChange(new Date());
    expect(spy).toHaveBeenCalled();
  });

  it('#onBackspacePressed should work', () => {
    const spy = spyOn(component, 'onMaskedInputValueChange').and.callThrough();
    component.maskedInputValue = '';
    fixture.detectChanges();
    component.onBackspacePressed('');
    expect(spy).toHaveBeenCalled();
  });

  it('#onMonthYearPickerKeyDown should prevent space', () => {
    const spy = spyOn(component, 'onMonthYearPickerKeyDown').and.callThrough();
    var e = {
      code: 'Space',
      preventDefault: () => {
        return 'test';
      },
    };
    component.onMonthYearPickerKeyDown(e);
    expect(spy).toHaveBeenCalled();
  });
});

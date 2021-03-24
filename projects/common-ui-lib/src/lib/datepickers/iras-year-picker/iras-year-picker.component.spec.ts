import { ComponentFixture, ComponentFixtureAutoDetect, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IrasYearPickerComponent } from './iras-year-picker.component';
import { IrasYearPickerModule } from './iras-year-picker.module';

describe('IrasYearPickerComponent', () => {
  let component: IrasYearPickerComponent;
  let fixture: ComponentFixture<IrasYearPickerComponent>;
  let inputElement: HTMLInputElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [IrasYearPickerModule, BrowserAnimationsModule],
        providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(IrasYearPickerComponent);
          component = fixture.componentInstance;
          inputElement = fixture.debugElement.nativeElement.shadowRoot.querySelector('.iras-year-picker__masked-input');
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
    expect(component.maskedInputValue).toBe('2020');
  });

  it('#maskedInputValue should change when new date is picked', () => {
    component.value = '2020-01-14' as any;
    fixture.detectChanges();
    component.value = new Date('2020-Aug-30');
    fixture.detectChanges();
    const expectedValue = '2020';
    expect(component.maskedInputValue).toBe(expectedValue);
  });

  // Function test
  it('getFormattedDate() - tests', () => {
    let dateStr: string;
    const expectedValue = '2020';
    // display date tests
    dateStr = component.getFormattedDate({ date: '', formatType: 'display' });
    expect(dateStr).toBeFalsy();
    dateStr = component.getFormattedDate({ date: new Date('2020-30-Aug'), formatType: 'display' });
    expect(dateStr).toBe(expectedValue, 'dint format new Date() correctly');
    dateStr = component.getFormattedDate({ date: '2020-09-01', formatType: 'display' });
    expect(dateStr).toBe(expectedValue, 'dint format date string correctly');

    dateStr = component.getFormattedDate({ date: '', formatType: 'output' });
    expect(dateStr).toBeFalsy();
    dateStr = component.getFormattedDate({ date: new Date('2020-30-Aug'), formatType: 'output' });
    expect(dateStr).toBe(expectedValue, 'dint format new Date() correctly');
    dateStr = component.getFormattedDate({ date: '2020-09-01', formatType: 'output' });
    expect(dateStr).toBe(expectedValue, 'dint format date string correctly');
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

  // functional tests for open
  it('#open() - should open with monthActive true if not disabled', () => {
    component.setDisabledState(false);
    component.monthViewActive = true;
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

  it('#ngOnInit should change maxDate minDate and selectedDate', () => {
    const maxYear = '2020';
    const minYear = '2020';
    const selectedYear = '2020';

    component.maxYear = maxYear;
    component.minYear = minYear;
    component.selectedYear = selectedYear;
    fixture.detectChanges();

    component.ngOnInit();
    expect(component.maxDate).toEqual(new Date(`${maxYear}-Jan`));
    expect(component.minDate).toEqual(new Date(`${minYear}-Jan`));
    expect(component.selectedDate).toEqual(new Date(`${selectedYear}-Jan`));
  });

  it('#writeValue should change value', () => {
    const year = '2020';
    component.writeValue(year);
    expect(component.maskedInputValue).toEqual(year);
  });

  it('#writeValue should change value with default value', () => {
    component.writeValue(undefined);
    expect(component.value).toEqual(undefined);
  });

  it('#registerOnChange should call onChange', () => {
    component.registerOnChange(() => {});
    expect(component.onChange).toBeTruthy();
  });

  it('#registerOnTouched should call onTouch', () => {
    component.registerOnTouched(() => {});
    expect(component.onTouch).toBeTruthy();
  });

  it('#onDateChange should emit the dateChanged event', () => {
    const spy = spyOn(component.dateChanged, 'emit').and.callThrough();
    component.onDateChange(new Date());
    expect(spy).toHaveBeenCalled();
  });

  it('#onDatePickerClose should work', () => {
    const spyNext = spyOn(component.datePickerClosed$, 'next').and.callThrough();
    const spyComplete = spyOn(component.datePickerClosed$, 'complete').and.callThrough();
    component.onDatePickerClose();
    expect(spyNext).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  });

  it('#onBackspacePressed should work', () => {
    const spy = spyOn(component, 'onMaskedInputValueChange').and.callThrough();
    component.maskedInputValue = '';
    fixture.detectChanges();
    component.onBackspacePressed('');
    expect(spy).toHaveBeenCalled();
  });

  it('#onYearSelected should change the value and emit the date picker close', () => {
    const spy = spyOn(component.datePicker, 'close').and.callThrough();
    const option = new Date('2020');
    component.onYearSelected(option);
    expect(component.maskedInputValue).toEqual('2020');
    expect(spy).toHaveBeenCalled();
  });

  it('#onYearPickerKeyDown should prevent space', () => {
    const spy = spyOn(component, 'onYearPickerKeyDown').and.callThrough();
    var e = {
      code: 'Space',
      preventDefault: () => {
        return 'test';
      },
    };
    component.onYearPickerKeyDown(e);
    expect(spy).toHaveBeenCalled();
  });
});

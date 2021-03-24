import { formatDate } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MaskInputEnum } from '../../masked-input/mask.enum';
import { DATE_PICKER_FORMATS, PickDateAdapter } from '../datepicker-format.service';

@Component({
  selector: 'iras-month-year-picker',
  templateUrl: './iras-month-year-picker.component.html',
  styleUrls: ['./iras-month-year-picker.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: IrasMonthYearPickerComponent, multi: true },
    {
      provide: DateAdapter,
      useClass: PickDateAdapter,
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: DATE_PICKER_FORMATS,
    },
  ],
})
export class IrasMonthYearPickerComponent {
  @Input() hasError = false;
  @Input() disabled = false;
  @Input() selectedDate = new Date();
  @Input() required = false;
  @Output() dateChanged = new EventEmitter();
  @Input() placeholder = 'mm/yyyy';
  @Input() minDate: Date;
  @Input() maxDate: Date;
  maskedInputValue: string;
  dateMask = `${MaskInputEnum.number}${MaskInputEnum.number}/${MaskInputEnum.number}${MaskInputEnum.number}${MaskInputEnum.number}${MaskInputEnum.number}`;
  readonly startView = 'multi-year';
  initialHighlightAt = new Date();
  monthYearPickerClosed$: Subject<void> = new Subject();
  monthViewActive: boolean;
  @ViewChild('datePicker') datePicker: MatDatepicker<any>;
  @ViewChild('monthYearPickerContainerElementRef') monthYearPickerContainerElementRef: ElementRef;
  @Input() set value(val: Date) {
    if (val !== undefined && this.selectedDate !== val) {
      let maskedInputValue = null;
      if (val) {
        maskedInputValue = this.getFormattedDate({ date: val, formatType: 'display' });
      }
      this.maskedInputValue = maskedInputValue;
    }
  }
  get value(): Date {
    return this.selectedDate;
  }

  constructor() {}

  open() {
    if (this.disabled) {
      return;
    }
    this.datePicker.startAt = new Date('en-SG');
    this.datePicker.open();
    this.onTouch();
  }
  onDatePickerOpen() {
    const source = fromEvent(document, 'click').pipe(takeUntil(this.monthYearPickerClosed$));
    source.subscribe((event) => {
      if (this.monthViewActive) {
        const clickedTargetClosestPeriodButton = (event.target as any).closest(
          'button.mat-focus-indicator.mat-calendar-period-button.mat-button.mat-button-base'
        );
        if (!!clickedTargetClosestPeriodButton && clickedTargetClosestPeriodButton.click) {
          clickedTargetClosestPeriodButton.click();
        }
      }
      this.monthViewActive = document.querySelectorAll('.mat-calendar-body-cell-content').length === 12;
    });
  }
  onDatePickerClose() {
    this.monthYearPickerClosed$.next();
    this.monthYearPickerClosed$.complete();
  }
  getFormattedDate({ date, formatType }: { date: any; formatType: 'output' | 'display' }) {
    if (!date) {
      return;
    }
    let formattedDate = null;
    if (formatType === 'display') {
      formattedDate = formatDate(
        date,
        `${DATE_PICKER_FORMATS.itemFormats.monthNumeric}/${DATE_PICKER_FORMATS.itemFormats.year}`,
        'en'
      );
    } else {
      formattedDate = formatDate(
        date,
        `${DATE_PICKER_FORMATS.itemFormats.year}-${DATE_PICKER_FORMATS.itemFormats.monthNumeric}`,
        'en'
      );
    }

    return formattedDate;
  }

  onChange: any = () => {};
  onTouch: any = () => {};

  writeValue(value: string): void {
    this.value = value as any;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onDateChange(event) {
    this.dateChanged.emit(event ? this.getFormattedDate({ date: event, formatType: 'output' }) : event);
  }

  onBackspacePressed(event: any) {
    if (!this.maskedInputValue) {
      this.onMaskedInputValueChange();
    }
  }

  onMaskedInputValueChange() {
    this.notifyAboutValueChange();
  }

  onMonthSelected(month: any) {
    this.value = month;
    this.datePicker.close();
  }

  notifyAboutValueChange() {
    let outputValue = this.maskedInputValue;
    const splits = this.maskedInputValue?.replace(/ /g, '').split('/');
    try {
      if (!outputValue) {
        throw new Error('date is empty');
      }

      if (splits.length < 2) {
        throw new Error('could not split masked value');
      }
      const month = splits[0].length === DATE_PICKER_FORMATS.itemFormats.monthNumeric.length && splits[0];
      const year = splits[1].length === DATE_PICKER_FORMATS.itemFormats.year.length && +splits[1];
      if (!(month && year)) {
        throw new Error('year does not match format.');
      }
      const str = `${year}-${month}-01`;
      outputValue = this.getFormattedDate({ date: str, formatType: 'output' });

      const displayValue = this.getFormattedDate({ date: str, formatType: 'display' });
      if (this.maskedInputValue !== displayValue) {
        throw new Error('date range out of bounds');
      } else {
        this.selectedDate = new Date(outputValue);
      }
    } catch (error) {
      outputValue = splits?.join('') || '';
    }
    if (this.maskedInputValue !== null) {
      this.onChange(outputValue);
      this.dateChanged.emit(outputValue);
    }
  }

  onMonthYearPickerKeyDown(event: any) {
    if (event?.code === 'Space') {
      event.preventDefault();
    }
  }
}

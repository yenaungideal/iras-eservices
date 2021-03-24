import { formatDate } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Subject } from 'rxjs';
import { MaskInputEnum } from '../../masked-input/mask.enum';
import { DATE_PICKER_FORMATS, PickDateAdapter } from '../datepicker-format.service';
import { DatePickerUtilities } from '../datepickers.util';

@Component({
  selector: 'iras-date-picker',
  templateUrl: './iras-date-picker.component.html',
  styleUrls: ['./iras-date-picker.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: IrasDatePickerComponent, multi: true },
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
export class IrasDatePickerComponent extends DatePickerUtilities {
  @Input() hasError = false;
  @Input() disabled = false;
  @Input() selectedDate: Date;
  @Input() required = false;
  @Output() dateChanged = new EventEmitter();
  @Input() placeholder = 'dd/mm/yyyy';
  @Input() minDate: Date;
  @Input() maxDate: Date;
  @ViewChild('datePicker') datePicker: MatDatepicker<any>;

  maskedInputValue: string;
  dateMask = `${MaskInputEnum.number}${MaskInputEnum.number}/${MaskInputEnum.number}${MaskInputEnum.number}/${MaskInputEnum.number}${MaskInputEnum.number}${MaskInputEnum.number}${MaskInputEnum.number}`;
  initialHighlightAt = new Date();
  readonly startView = 'month';
  datePickerClosed$: Subject<void> = new Subject();
  monthViewActive: boolean;

  showError: boolean;

  @ViewChild('datePickerContainerElementRef') datePickerContainerElementRef: ElementRef;
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

  constructor() {
    super();
  }

  getFormattedDate({ date, formatType }: { date: any; formatType: 'output' | 'display' }) {
    if (!date) {
      return;
    }
    let formattedDate = null;
    if (formatType === 'display') {
      formattedDate = formatDate(
        date,
        `${DATE_PICKER_FORMATS.itemFormats.date}/${DATE_PICKER_FORMATS.itemFormats.monthNumeric}/${DATE_PICKER_FORMATS.itemFormats.year}`,
        'en'
      );
    } else {
      formattedDate = formatDate(
        date,
        `${DATE_PICKER_FORMATS.itemFormats.year}-${DATE_PICKER_FORMATS.itemFormats.monthNumeric}-${DATE_PICKER_FORMATS.itemFormats.date}`,
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

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    this.dateChanged.emit(event ? this.getFormattedDate({ date: event, formatType: 'output' }) : event);
  }

  open() {
    this.openDatePicker(this);
  }
  onDatePickerOpen() {
    this.onDatePickerOpened(this);
  }
  onDatePickerClose() {
    this.onDatePickerClosed(this);
  }

  onBackspacePressed(event: any) {
    if (!this.maskedInputValue) {
      this.onMaskedInputValueChange();
    }
  }

  onMaskedInputValueChange() {
    this.notifyAboutValueChange();
  }
  onYearSelected(year: any) {}

  onMonthSelected(month: any) {}

  notifyAboutValueChange() {
    let outputValue = this.maskedInputValue;
    const splits = this.maskedInputValue?.replace(/ /g, '').split('/');
    try {
      if (!outputValue) {
        throw new Error('date is empty');
      }

      if (splits.length < 3) {
        throw new Error('could not split masked value');
      }
      const date: number = splits[0].length === DATE_PICKER_FORMATS.itemFormats.date.length && +splits[0];
      const month: number = splits[1].length === DATE_PICKER_FORMATS.itemFormats.monthNumeric.length && +splits[1];
      const year: number = splits[2].length === DATE_PICKER_FORMATS.itemFormats.year.length && +splits[2];
      if (!(date && month && year)) {
        throw new Error('year does not match format.');
      }

      const str = `${year}-${month}-${date}`;
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

    // when reset is triggered this value is set to null by angular thus this comparison
    if (this.maskedInputValue !== null) {
      this.onChange(outputValue);
      this.dateChanged.emit(outputValue);
    }
  }

  onDatePickerKeyDown(event: any) {
    if (event?.code === 'Space') {
      event.preventDefault();
    }
  }
}

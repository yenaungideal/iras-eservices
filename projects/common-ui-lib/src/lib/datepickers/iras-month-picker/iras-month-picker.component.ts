import { formatDate } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
  OnInit,
  ElementRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { Subject, fromEvent } from 'rxjs';
import { MaskInputEnum } from '../../masked-input/mask.enum';
import { DATE_PICKER_FORMATS, PickDateAdapter } from '../datepicker-format.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'iras-month-picker',
  templateUrl: './iras-month-picker.component.html',
  styleUrls: ['./iras-month-picker.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: IrasMonthPickerComponent, multi: true },
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
export class IrasMonthPickerComponent implements OnInit {
  @Input() hasError = false;
  @Input() disabled = false;
  @Input() required = false;
  @Input() selectedMonth: string; // eg: 01
  @Output() dateChanged = new EventEmitter();
  @ViewChild('datePicker') datePicker: MatDatepicker<any>;
  currentYear = new Date().getFullYear();
  @Input() placeholder = `01/${this.currentYear}`;
  minDate = new Date(this.currentYear, 0);
  maxDate = new Date(this.currentYear, 11);
  selectedDate = this.minDate;
  maskedInputValue: string;
  dateMask = `00/0000`;
  readonly startView = 'multi-year';
  initialHighlightAt = new Date();
  monthPickerClosed$: Subject<void> = new Subject();
  monthViewActive: boolean;
  @ViewChild('monthPickerContainerElementRef') monthPickerContainerElementRef: ElementRef;
  @Input() set value(val: Date) {
    if (val !== undefined) {
      let maskedInputValue = null;
      if (val) {
        maskedInputValue = this.getFormattedDate({ date: val, formatType: 'display' });
      }

      if (maskedInputValue === this.maskedInputValue) {
        this.notifyAboutValueChange();
      }
      this.maskedInputValue = maskedInputValue;
    }
  }
  get value(): Date {
    return this.selectedDate;
  }

  constructor() {}
  ngOnInit() {
    if (this.selectedMonth) {
      this.selectedDate = new Date(`${this.currentYear}-${this.selectedMonth}`);
    }
  }

  onChange: any = () => {};
  onTouch: any = () => {};

  writeValue(value: string): void {
    if (value) {
      this.value = new Date(`${this.currentYear}-${value}`);
    } else {
      this.value = value as any;
    }
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
  open() {
    if (this.disabled) {
      return;
    }

    this.datePicker.startAt = new Date('en-SG');

    this.datePicker.open();
    const yearElementFinderInterval = setInterval(() => {
      const yearElement = Array.from(
        document.querySelectorAll('.mat-calendar-body-cell:not(.mat-calendar-body-disabled)')
      ).find((item) => item.textContent.trim() === `${this.currentYear}`) as any;
      if (yearElement) {
        clearInterval(yearElementFinderInterval);
        yearElement.click();
      }
    }, 50);

    this.onTouch();
  }

  onDatePickerOpen() {
    const source = fromEvent(document, 'click').pipe(takeUntil(this.monthPickerClosed$));
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
    this.monthPickerClosed$.next();
    this.monthPickerClosed$.complete();
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
      const month = splits[0].length === DATE_PICKER_FORMATS.itemFormats.monthNumeric.length && +splits[0];
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

  onMonthPickerKeyDown(event: any) {
    if (event?.code === 'Space') {
      event.preventDefault();
    }
  }
}

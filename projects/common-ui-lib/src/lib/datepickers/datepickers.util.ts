import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable()
export abstract class DatePickerUtilities {
  openDatePicker(controls: any) {
    if (controls.disabled) {
      return;
    }
    controls.datePicker.startAt = new Date('en-SG');
    controls.datePicker.open();
    controls.onTouch();
  }
  onDatePickerOpened(controls: any) {
    const source = fromEvent(document, 'click').pipe(takeUntil(controls.datePickerClosed$));
    source.subscribe((event) => {
      if (controls.monthViewActive) {
        const clickedTargetClosestPeriodButton = (event.target as any).closest(
          'button.mat-focus-indicator.mat-calendar-period-button.mat-button.mat-button-base'
        );
        if (!!clickedTargetClosestPeriodButton && clickedTargetClosestPeriodButton.click) {
          clickedTargetClosestPeriodButton.click();
        }
      }
      controls.monthViewActive = document.querySelectorAll('.mat-calendar-body-cell-content').length === 12;
    });
  }
  onDatePickerClosed(controls: any) {
    controls.datePickerClosed$.next();
    controls.datePickerClosed$.complete();
  }
}

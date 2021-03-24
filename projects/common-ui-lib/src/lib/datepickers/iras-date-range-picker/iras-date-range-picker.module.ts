import { NgModule } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IrasMaskedInputModule } from '../../masked-input/masked-input.module';
import { IrasDateRangePickerComponent } from './iras-date-range-picker.component';
import { IrasDatePickerModule } from '../iras-date-picker/iras-date-picker.module';

@NgModule({
  declarations: [IrasDateRangePickerComponent],

  imports: [
    MatDatepickerModule,
    IrasDatePickerModule,
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    IrasMaskedInputModule,
  ],
  exports: [
    IrasDateRangePickerComponent,
    IrasDatePickerModule,
    MatDatepickerModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    IrasMaskedInputModule,
  ],
})
export class IrasDateRangePickerModule {}

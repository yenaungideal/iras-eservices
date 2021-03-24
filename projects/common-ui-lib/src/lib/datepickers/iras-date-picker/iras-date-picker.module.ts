import { NgModule } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IrasMaskedInputModule } from '../../masked-input/masked-input.module';
import { IrasDatePickerComponent } from './iras-date-picker.component';

@NgModule({
  declarations: [IrasDatePickerComponent],

  imports: [
    MatDatepickerModule,
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    IrasMaskedInputModule,
  ],
  exports: [
    IrasDatePickerComponent,
    MatDatepickerModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    IrasMaskedInputModule,
  ],
})
export class IrasDatePickerModule {}

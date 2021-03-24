import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaskedInputComponent } from './masked-input.component';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [MaskedInputComponent],
  imports: [CommonModule, FormsModule, InputsModule, FlexLayoutModule, ReactiveFormsModule],
  exports: [FormsModule, InputsModule, FlexLayoutModule, ReactiveFormsModule, MaskedInputComponent],
  providers: [],
})
export class IrasMaskedInputModule {}

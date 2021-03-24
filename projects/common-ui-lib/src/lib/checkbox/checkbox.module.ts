import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from './checkbox.component';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
@NgModule({
  declarations: [CheckboxComponent],
  imports: [CommonModule, FormsModule, FlexLayoutModule],
  exports: [FormsModule, FlexLayoutModule, CheckboxComponent],
})
export class IrasCheckboxModule {}

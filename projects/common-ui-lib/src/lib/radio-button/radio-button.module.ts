import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioButtonComponent } from './radio-button.component';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
@NgModule({
  declarations: [RadioButtonComponent],
  imports: [CommonModule, FormsModule, FlexLayoutModule],
  exports: [FormsModule, FlexLayoutModule, RadioButtonComponent],
})
export class IrasRadioButtonModule {}

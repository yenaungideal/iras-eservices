import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IrasButtonsModule } from '../button/button.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogStepperComponent } from './dialog-stepper.component';

@NgModule({
  declarations: [DialogStepperComponent],
  imports: [CommonModule, IrasButtonsModule, FlexLayoutModule, FormsModule, ReactiveFormsModule],
  exports: [IrasButtonsModule, FlexLayoutModule, FormsModule, ReactiveFormsModule, DialogStepperComponent],
})
export class DialogStepperModule {}

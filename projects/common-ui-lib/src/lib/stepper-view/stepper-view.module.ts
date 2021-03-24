import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperViewComponent } from './stepper-view.component';
import { DialogStepperModule } from '../dialog-stepper/dialog-stepper.module';

@NgModule({
  declarations: [StepperViewComponent],
  imports: [CommonModule, DialogStepperModule],
  exports: [StepperViewComponent, DialogStepperModule],
})
export class IrasStepperViewModule {}

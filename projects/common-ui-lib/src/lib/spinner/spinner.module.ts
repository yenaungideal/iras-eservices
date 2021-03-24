import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SpinnerComponent } from './spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@NgModule({
  declarations: [SpinnerComponent],
  imports: [CommonModule, MatProgressSpinnerModule, FlexLayoutModule],
  exports: [SpinnerComponent, MatProgressSpinnerModule, FlexLayoutModule],
})
export class IrasSpinnerModule {}

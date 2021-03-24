import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormInputErrorComponent } from './form-input-error.component';
import { PortalModule } from '@angular/cdk/portal';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [FormInputErrorComponent],
  imports: [CommonModule, PortalModule, FlexLayoutModule],
  exports: [PortalModule, FormInputErrorComponent, FlexLayoutModule],
  providers: [],
})
export class FormInputErrorModule {}

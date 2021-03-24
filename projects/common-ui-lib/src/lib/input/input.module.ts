import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IrasTooltipModule } from '../tooltip/tooltip.module';
import { InputComponent } from './input.component';
import { AmountInputComponent } from './amount-input/amount-input.component';
@NgModule({
  declarations: [InputComponent, AmountInputComponent],
  imports: [CommonModule, IrasTooltipModule, FormsModule, ReactiveFormsModule, FlexLayoutModule],
  exports: [
    CommonModule,
    IrasTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    InputComponent,
    AmountInputComponent,
  ],
  providers: [],
})
export class IrasInputModule {}
export * from './input.util';
export * from './amount-input/amount-input.util';

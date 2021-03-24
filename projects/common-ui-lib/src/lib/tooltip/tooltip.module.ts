import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PortalModule } from '@angular/cdk/portal';
import { PopoverService } from '../popover/popover.service';
import { TooltipComponent } from './tooltip.component';

@NgModule({
  declarations: [TooltipComponent],
  imports: [CommonModule, MatTooltipModule, FlexLayoutModule, PortalModule],
  exports: [MatTooltipModule, FlexLayoutModule, TooltipComponent, PortalModule],
  providers: [PopoverService],
})
export class IrasTooltipModule {}

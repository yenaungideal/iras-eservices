import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { PopoverComponent } from './popover/popover.component';
import { PopoverService } from './popover.service';

@NgModule({
  declarations: [PopoverComponent],
  imports: [CommonModule, OverlayModule, FlexLayoutModule, PortalModule],
  exports: [OverlayModule, FlexLayoutModule, PortalModule],
  providers: [PopoverService],
  entryComponents: [PopoverComponent],
})
export class IrasPopoverModule {}

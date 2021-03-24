import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HighlightPanelComponent } from './highlight-panel.component';

@NgModule({
  declarations: [HighlightPanelComponent],
  imports: [CommonModule, PortalModule],
  exports: [PortalModule, HighlightPanelComponent],
})
export class IrasHighlightPanelModule {}

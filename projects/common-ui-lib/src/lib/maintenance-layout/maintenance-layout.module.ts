import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaintenanceLayoutComponent } from './maintenance-layout.component';

@NgModule({
  declarations: [MaintenanceLayoutComponent],
  imports: [CommonModule, PortalModule],
  exports: [PortalModule, MaintenanceLayoutComponent],
})
export class IrasMaintenanceLayoutModule {}

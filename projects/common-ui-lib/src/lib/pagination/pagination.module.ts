import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PaginationComponent } from './pagination.component';

@NgModule({
  declarations: [PaginationComponent],
  imports: [CommonModule, FlexLayoutModule],
  exports: [PaginationComponent, FlexLayoutModule],
})
export class IrasPaginationModule {}

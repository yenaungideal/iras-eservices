import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IrasLinkModule } from '../link/link.module';
import { ButtonComponent } from './button/button.component';
import { FloatingButtonMenuComponent } from './floating-button-menu/button-menu.component';
import { IconButtonComponent } from './icon-button/icon-button.component';
@NgModule({
  declarations: [ButtonComponent, FloatingButtonMenuComponent, IconButtonComponent],
  imports: [CommonModule, FlexLayoutModule, IrasLinkModule],
  exports: [ButtonComponent, FloatingButtonMenuComponent, IconButtonComponent, FlexLayoutModule, IrasLinkModule],
})
export class IrasButtonsModule {}

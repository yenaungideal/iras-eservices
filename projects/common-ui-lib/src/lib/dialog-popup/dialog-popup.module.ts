import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogPopupComponent } from './dialog-popup.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IrasButtonsModule } from '../button/button.module';
import { IrasRadioButtonModule } from '../radio-button/radio-button.module';
import { IrasModalModule } from '../modal/modal.module';

@NgModule({
  declarations: [DialogPopupComponent],
  imports: [CommonModule, IrasButtonsModule, FlexLayoutModule, IrasRadioButtonModule, IrasModalModule],
  exports: [IrasButtonsModule, FlexLayoutModule, DialogPopupComponent],
})
export class IrasDialogPopupModule {}

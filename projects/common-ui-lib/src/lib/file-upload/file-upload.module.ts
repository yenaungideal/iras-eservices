import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IrasLinkModule } from '../link/link.module';
import { IrasFileUploadComponent } from './file-upload.component';
import { IrasDialogPopupModule } from '../dialog-popup/dialog-popup.module';
import { FormInputErrorModule } from '../form-input-error/form-input-error.module';
import { DragAndDropDirective } from './drag-drop.directive';

@NgModule({
  declarations: [IrasFileUploadComponent, DragAndDropDirective],
  imports: [CommonModule, FlexLayoutModule, IrasLinkModule, IrasDialogPopupModule, FormInputErrorModule],
  exports: [IrasFileUploadComponent, FlexLayoutModule, IrasLinkModule, IrasDialogPopupModule, FormInputErrorModule],
})
export class IrasFileUploadModule {}

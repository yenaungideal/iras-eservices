import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SnackbarService } from './snack-bar.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarComponent } from './snack-bar.component';

@NgModule({
  declarations: [SnackbarComponent],
  imports: [CommonModule, MatSnackBarModule, FlexLayoutModule, ReactiveFormsModule, FormsModule],
  exports: [MatSnackBarModule, PortalModule, FlexLayoutModule, ReactiveFormsModule, FormsModule, SnackbarComponent],
  providers: [SnackbarService],
  entryComponents: [SnackbarComponent],
})
export class IrasSnackbarModule {}

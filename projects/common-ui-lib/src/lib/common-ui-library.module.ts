import { NgModule } from '@angular/core';
import { IrasButtonsModule } from './button/button.module';
import { IrasCardsModule } from './card/cards.module';
import { IrasCheckboxModule } from './checkbox/checkbox.module';
import { IrasDialogPopupModule } from './dialog-popup/dialog-popup.module';
import { IrasDropdownsModule } from './dropdowns/dropdowns.module';
import { FormInputErrorModule as IrasFormInputErrorModule } from './form-input-error/form-input-error.module';
import { IrasInputModule } from './input/input.module';
import { IrasNumericStepperModule } from './numeric-stepper/numeric-stepper.module';
import { IrasLinkModule } from './link/link.module';
import { IrasMaskedInputModule } from './masked-input/masked-input.module';
import { ModalComponent } from './modal/modal.component';
import { IrasModalModule } from './modal/modal.module';
import { ModalService } from './modal/modal.service';
import { IrasPaginationModule } from './pagination/pagination.module';
import { IrasPopoverModule } from './popover/popover.module';
import { PopoverService } from './popover/popover.service';
import { IrasRadioButtonModule } from './radio-button/radio-button.module';
import { IrasSpinnerModule } from './spinner/spinner.module';
import { IrasStepperViewModule } from './stepper-view/stepper-view.module';
import { IrasTitleModule } from './title/title.module';
import { IrasTooltipModule } from './tooltip/tooltip.module';
import { IrasMonthYearPickerModule } from './datepickers/iras-month-year-picker/iras-month-year-picker.module';
import { IrasMonthPickerModule } from './datepickers/iras-month-picker/iras-month-picker.module';
import { IrasYearPickerModule } from './datepickers/iras-year-picker/iras-year-picker.module';
import { IrasDatePickerModule } from './datepickers/iras-date-picker/iras-date-picker.module';
import { IrasDateRangePickerModule } from './datepickers/iras-date-range-picker/iras-date-range-picker.module';
import { RequiredSymbolModule } from './required-symbol/required-symbol.module';
import { IrasTextAreaModule } from './text-area/text-area.module';
import { SnackbarComponent } from './snack-bar/snack-bar.component';
import { SnackbarService } from './snack-bar/snack-bar.service';
import { IrasSnackbarModule } from './snack-bar/snack-bar.module';
import { MultiSnackbarComponent } from './multi-snack-bar/multi-snack-bar.component';
import { MultiSnackbarService } from './multi-snack-bar/multi-snack-bar.service';
import { IrasMultiSnackbarModule } from './multi-snack-bar/multi-snack-bar.module';
import { IrasFileUploadModule } from './file-upload/file-upload.module';
import { DialogStepperModule } from './dialog-stepper/dialog-stepper.module';
import { IrasEmptyStateBoxModule } from './empty-state-box/empty-state-box.module';
import { IrasTimePickerModule } from './time-picker/time-picker.module';
import { IrasMaintenanceLayoutModule } from './maintenance-layout/maintenance-layout.module';
import { IrasErrorModule } from './error/error.module';
import { IrasHighlightPanelModule } from './highlight-panel/highlight-panel.module';

@NgModule({
  exports: [
    // Common Component Modules
    IrasButtonsModule,
    IrasTitleModule,
    IrasStepperViewModule,
    IrasPaginationModule,
    IrasDropdownsModule,
    IrasDialogPopupModule,
    IrasCheckboxModule,
    IrasRadioButtonModule,
    IrasCardsModule,
    IrasMaintenanceLayoutModule,
    IrasLinkModule,
    IrasInputModule,
    IrasNumericStepperModule,
    IrasTextAreaModule,
    IrasMaskedInputModule,
    IrasFormInputErrorModule,
    IrasMaskedInputModule,
    IrasModalModule,
    IrasTooltipModule,
    IrasPopoverModule,
    IrasSpinnerModule,
    IrasFileUploadModule,
    DialogStepperModule,
    IrasEmptyStateBoxModule,
    // Date Pickers
    IrasDatePickerModule,
    IrasMonthYearPickerModule,
    IrasMonthPickerModule,
    IrasYearPickerModule,
    IrasDateRangePickerModule,
    RequiredSymbolModule,
    IrasSnackbarModule,
    IrasTimePickerModule,
    IrasErrorModule,
    IrasHighlightPanelModule,
    IrasMultiSnackbarModule,
  ],
  providers: [ModalService, SnackbarService, MultiSnackbarService, PopoverService],
  entryComponents: [ModalComponent, SnackbarComponent, MultiSnackbarComponent],
  declarations: [],
})
export class CommonUiLibraryModule {}

import { AutocompleteDropdownShowcaseComponent } from '../components/autocomplete-dropdown-showcase/autocomplete-dropdown-showcase.component';
import { ButtonMenuShowcaseComponent } from '../components/button-menu-showcase/button-menu-showcase.component';
import { ButtonShowcaseComponent } from '../components/button-showcase/button-showcase.component';
import { CardShowcaseComponent } from '../components/card-showcase/card-showcase.component';
import { CheckboxInputShowcaseComponent } from '../components/checkbox-input-showcase/checkbox-input-showcase.component';
import { DatePickersShowcaseComponent } from '../components/datepickers-showcase/datepickers-showcase.component';
import { DialogPopupShowcaseComponent } from '../components/dialog-popup-showcase/dialog-popup-showcase.component';
import { DropdownShowcaseComponent } from '../components/dropdown-showcase/dropdown-showcase.component';
import { FileUploadShowcaseComponent } from '../components/file-upload-showcase/file-upload-showcase/file-upload-showcase.component';
import { IconsShowcaseComponent } from '../components/icons-showcase/icons-showcase.component';
import { InputShowcaseComponent } from '../components/input-showcase/input-showcase.component';
import { IrasDateTimePickerShowcaseComponent } from '../components/date-time-picker-showcase/iras-date-time-picker-showcase.component';
import { MaskedInputShowcaseComponent } from '../components/masked-input-showcase/masked-input-showcase.component';
import { ModalShowcaseComponent } from '../components/modal-showcase/modal-showcase.component';
import { PaginationShowcaseComponent } from '../components/pagination-showcase/pagination-showcase.component';
import { PdfExportShowcaseComponent } from '../components/pdf-export-showcase/pdf-export-showcase.component';
import { PostSubmitErrorShowcaseComponent } from '../components/post-submit-error-showcase/post-submit-error-showcase.component';
import { RadioInputShowcaseComponent } from '../components/radio-input-showcase/radio-input-showcase.component';
import { SnackBarComponentShowcaseComponent } from '../components/snack-bar-showcase/snack-bar-showcase.component';
import { MultiSnackBarComponentShowcaseComponent } from '../components/multi-snack-bar-showcase/multi-snack-bar-showcase.component';
import { SpinnerShowcaseComponent } from '../components/spinner-showcase/spinner-showcase.component';
import { StepperViewShowcaseComponent } from '../components/stepper-view-showcase/stepper-view-showcase.component';
import { TabsShowcaseComponent } from '../components/tabs-showcase/tabs-showcase.component';
import { TitlesShowcaseComponent } from '../components/titles-showcase/titles-showcase.component';
import { TooltipShowcaseComponent } from '../components/tooltip-showcase/tooltip-showcase.component';
import { TypographyShowcaseComponent } from '../components/typography-showcase/typography-showcase.component';
import { MultiSelectDropdownShowcaseComponent } from '../components/multi-select-dropdown-showcase/multi-select-dropdown-showcase.component';
import { MultiSelectNestedDropdownShowcaseComponent } from '../components/multi-select-nested-dropdown-showcase/multi-select-nested-dropdown-showcase.component';
import { MaintenanceLayoutShowcaseComponent } from '../components/maintenance-layout-showcase/maintenance-layout-showcase.component';
import { EmptyStateBoxShowcaseComponent } from '../components/empty-state-box-showcase/empty-state-box-showcase.component';
import { NumericStepperShowcaseComponent } from '../components/numeric-stepper-showcase/numeric-stepper-showcase.component';
import { ErrorShowcaseComponent } from '../components/error-showcase/error-showcase.component';
import { HighlightPanelShowcaseComponent } from '../components/highlight-panel-showcase/highlight-panel-showcase.component';

export const sortedRoutes = [
  { path: 'autocomplete-dropdown', component: AutocompleteDropdownShowcaseComponent },
  { path: 'button', component: ButtonShowcaseComponent },
  { path: 'button-menu', component: ButtonMenuShowcaseComponent },
  { path: 'card', component: CardShowcaseComponent },
  { path: 'checkbox', component: CheckboxInputShowcaseComponent },
  { path: 'datepickers', component: DatePickersShowcaseComponent },
  { path: 'dialog-popups', component: DialogPopupShowcaseComponent },
  { path: 'dropdown', component: DropdownShowcaseComponent },
  { path: 'empty-state-box', component: EmptyStateBoxShowcaseComponent },
  { path: 'multi-select-dropdown', component: MultiSelectDropdownShowcaseComponent },
  { path: 'multi-select-nested-dropdown', component: MultiSelectNestedDropdownShowcaseComponent },
  { path: 'maintenance-layout', component: MaintenanceLayoutShowcaseComponent },
  { path: 'file-upload', component: FileUploadShowcaseComponent },
  { path: 'icons', component: IconsShowcaseComponent },
  { path: 'input', component: InputShowcaseComponent },
  { path: 'masked-input', component: MaskedInputShowcaseComponent },
  { path: 'modal', component: ModalShowcaseComponent },
  { path: 'pagination', component: PaginationShowcaseComponent },
  { path: 'pdf-export', component: PdfExportShowcaseComponent },
  { path: 'post-submit-error', component: PostSubmitErrorShowcaseComponent },
  { path: 'radio', component: RadioInputShowcaseComponent },
  { path: 'snack-bar', component: SnackBarComponentShowcaseComponent },
  { path: 'multi-snack-bar', component: MultiSnackBarComponentShowcaseComponent },
  { path: 'spinner', component: SpinnerShowcaseComponent },
  { path: 'stepper', component: StepperViewShowcaseComponent },
  { path: 'tabs', component: TabsShowcaseComponent },
  { path: 'titles', component: TitlesShowcaseComponent },
  { path: 'popover', component: TooltipShowcaseComponent },
  { path: 'typography', component: TypographyShowcaseComponent },
  { path: 'error', component: ErrorShowcaseComponent },
  { path: 'highlight-panel', component: HighlightPanelShowcaseComponent },
  { path: 'datetime-picker', component: IrasDateTimePickerShowcaseComponent },
  { path: 'numeric-stepper', component: NumericStepperShowcaseComponent },
].sort((a, b) => (a.path > b.path ? 1 : -1));

sortedRoutes.push({ path: '**', component: InputShowcaseComponent });
export const MENU_ROUTES_CHILDREN = sortedRoutes;
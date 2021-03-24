import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  TemplateRef,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalService } from '../modal/modal.service';
import { ModalComponent } from '../modal/modal.component';
@Component({
  selector: 'iras-dialog-popup',
  templateUrl: './dialog-popup.component.html',
  styleUrls: ['./dialog-popup.component.scss'],
})
export class DialogPopupComponent implements OnInit, OnChanges {
  @Input() title: string;
  @Input() description1: string;
  @Input() description2: string;
  @Input() isOkAction = true;
  @Input() okActionText = 'Continue';
  @Input() okActionStyle = 'btn btn-primary';
  @Input() isCancelAction = true;
  @Input() cancelActionText = 'Cancel';
  @Input() cancelActionStyle = 'btn btn-primary-invert';
  @Input() showTitleIcon = true;
  @Input() showFileUploadConflictPanel = false;
  @Input() dialogOpen = false;
  @Input() width = '414px';
  @Input() height = 'auto';
  @Input() fileUploadDuplicates: any[];
  @Output() dialogClose: EventEmitter<string> = new EventEmitter();
  @Output() dialogContinue: EventEmitter<any> = new EventEmitter();

  currentDuplicateFileName: string;
  replaceDuplicateSelected: boolean;
  replaceAllDuplicateSelected: boolean;
  hasSingleConflict: boolean;
  duplicateFileIndex: number;
  dialogRef: MatDialogRef<ModalComponent>;
  dialogClosedStatus: string;
  uploadConflictRadioOptions = [
    {
      label: 'Upload and replace',
      selected: false,
      buttonTheme: 'primary',
      disabled: false,
    },
    {
      label: 'Skip this file',
      selected: false,
      buttonTheme: 'primary',
      disabled: false,
    },
  ];
  @ViewChild('dialogContentRef', { static: false }) dialogModalContentRef: TemplateRef<any>;

  constructor(public modalService: ModalService) {}

  ngOnInit() {
    if (this.fileUploadDuplicates?.length > 0) {
      this.initUpload();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      this.dialogModalContentRef &&
      changes.dialogOpen &&
      changes.dialogOpen.previousValue !== changes.dialogOpen.currentValue
    ) {
      if (changes.dialogOpen.currentValue) {
        this.dialogRef = this.modalService.show({
          data: {
            templateContentRef: this.dialogModalContentRef,
          },
          panelClass: 'default-modal',
          backdropClass: 'default-modal-dialog-backdrop',
          disableClose: true,
        });

        this.dialogRef.afterClosed().subscribe((_) => {
          this.dialogClose.emit(this.dialogClosedStatus);
        });
      }
    }
  }

  public onBack(status) {
    this.dialogClosedStatus = status;
    this.dialogRef.close();
  }

  public onContinue(status) {
    if (this.fileUploadDuplicates?.length > 0) {
      this.onFileUploadDuplicates();
    } else {
      this.dialogContinue.emit(status);
    }
    this.dialogRef.close();
  }

  initUpload() {
    if (this.fileUploadDuplicates?.length > 0) {
      if (this.fileUploadDuplicates.length === 1) {
        this.uploadConflictRadioOptions.splice(1, 1);
        this.hasSingleConflict = true;
      } else {
        this.hasSingleConflict = false;
      }

      this.currentDuplicateFileName = this.fileUploadDuplicates[0].name;
      this.duplicateFileIndex = 0;
      this.replaceAllDuplicateSelected = true;
    }
  }

  onRadioChecked(event: any) {
    if (
      event.target.nextElementSibling.textContent.toLowerCase() ===
        this.uploadConflictRadioOptions[0].label.toLowerCase() &&
      event.target.checked
    ) {
      this.replaceDuplicateSelected = true;
    } else {
      this.replaceDuplicateSelected = false;
    }
  }

  onFileUploadDuplicates() {
    if (this.replaceAllDuplicateSelected) {
      if (this.replaceDuplicateSelected) {
        // Replace all files
        this.dialogContinue.emit({ toBeUpload: true, index: -1 });
      } else {
        // Skip all files
        this.dialogContinue.emit({ toBeUpload: false, index: -1 });
      }
    } else {
      if (this.replaceDuplicateSelected) {
        // Replace selected file and load the next file
        if (this.fileUploadDuplicates.length > this.duplicateFileIndex) {
          this.dialogContinue.emit({ toBeUpload: true, index: this.duplicateFileIndex });
          this.updateCurrentFileIndex();
        }
      } else {
        // Skip the selected file and load the next file
        if (this.fileUploadDuplicates.length > this.duplicateFileIndex) {
          this.dialogContinue.emit({ toBeUpload: false, index: this.duplicateFileIndex });
          this.updateCurrentFileIndex();
        }
      }
    }
  }

  updateCurrentFileIndex() {
    if (this.fileUploadDuplicates && this.fileUploadDuplicates.length > 0) {
      this.duplicateFileIndex++;

      if (this.duplicateFileIndex === this.fileUploadDuplicates.length - 1) {
        this.hasSingleConflict = true;
        if (this.uploadConflictRadioOptions.length > 1) {
          this.uploadConflictRadioOptions.splice(1, 1);
        }
      }

      if (this.duplicateFileIndex < this.fileUploadDuplicates.length) {
        this.currentDuplicateFileName = this.fileUploadDuplicates[this.duplicateFileIndex].name;
      }
    }
  }
}

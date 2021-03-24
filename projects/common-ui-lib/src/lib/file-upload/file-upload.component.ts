import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FileUploadErrorStatus } from './models/file-upload-error-status.model';
import { SupportingDocumentError, Document, SupportingDocument } from './models/attachment.model';

@Component({
  selector: 'iras-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IrasFileUploadComponent implements OnInit {
  // max no. of files
  @Input() maxNoFiles = 25;
  @Output() fileUploaded = new EventEmitter();

  // Array to store the raw 'File' from upload
  files: any[] = [];
  document = new Document();

  listOfUploadedFileThatHasErrors: Array<SupportingDocumentError>;
  listOfSupportingFileThatHasErrors: Array<SupportingDocumentError>;

  // For duplicate file handling
  isDuplicateFilePopupShown: boolean;
  filesContainingDuplicate: any[] = [];

  showErrorDialogTitleIcon: boolean;

  // validations
  validFileFormats = ['pdf', 'jpg', 'png', 'xlsx'];
  // Reference from: SIT\IRAS.ISDSSolution\IRAS.ISDS.UI\UserControls\UserControl\ucFileUploadDragAndDrop_RWD.ascx
  // Line: 121
  englishPattern = /^[a-zA-Z0-9._-\s]+$/;
  maxNoChar = 50;
  maxFileSize = 10;
  maxTotalFileSize = 50;

  // For error handling of File upload
  isFileUploadErrorMessageShown: boolean;
  fileUploadErrorMessage: string;
  totalFilesSize: number;

  fileFormatErrorMessageArray = [
    'Unsupported file type',
    'Filename contains invalid character(s)',
    `File name exceed ${this.maxNoChar} characters`,
    `File size exceeded ${this.maxFileSize}.00 MB`,
    `Total file size exceeded ${this.maxTotalFileSize}.00 MB`,
  ];

  @ViewChild('fileDropRef', { static: false }) fileDropEl: ElementRef;

  constructor() {}

  ngOnInit(): void {
    this.isFileUploadErrorMessageShown = true;
    this.isDuplicateFilePopupShown = false;
    this.fileUploadErrorMessage = '';
    this.totalFilesSize = 0;
    this.showErrorDialogTitleIcon = false;
    this.listOfSupportingFileThatHasErrors = [];
    this.document.supportingDocuments = [];
  }

  // On file drop handler
  onFileDropped($event: any) {
    if (this.filesContainingDuplicate && this.filesContainingDuplicate.length <= 0) {
      this.prepareFilesList($event);
    }
  }

  // Handle file from browsing
  fileBrowseHandler(files: any) {
    this.prepareFilesList(files);
  }

  // Delete file from files list
  // @param index (File index)
  deleteFile(index: number, fileSize: number) {
    // Update the "totalFilesSize", since a file is removed
    this.totalFilesSize -= fileSize;

    this.files.splice(index, 1);
    this.updateStore('delete', '', index);
  }

  deleteFileForErrorRow(index: number) {
    this.listOfSupportingFileThatHasErrors.splice(index, 1);
  }

  onDuplicateFileOkClick(params: any) {
    // Upload and replace, Apply for all conflicts
    if (params.toBeUpload && params.index === -1) {
      this.onDuplicateFilesOkClick();
    }

    // Skip this file, Apply for all conflicts
    if (!params.toBeUpload && params.index === -1) {
      // Close the Popup window
      this.onDuplicateFilesCancelClick();
    }

    // Upload and replace, Not apply for all conflicts(only selected)
    if (params.toBeUpload && params.index > -1) {
      // Replace the old uploaded file from new file
      this.replaceUploadSelectedFile(params.index);
      // Close the Popup window if no conflicts/duplicated
      if (this.filesContainingDuplicate.length === params.index + 1) {
        this.isDuplicateFilePopupShown = false;
        // Clear the array holding the duplicate files
        this.filesContainingDuplicate = [];
      }
    }

    // Skip this file, Not apply for all conflicts(only selected)
    if (!params.toBeUpload && params.index > -1) {
      // Close the Popup window if no conflicts/duplicated
      if (this.filesContainingDuplicate.length === params.index + 1) {
        this.isDuplicateFilePopupShown = false;
        // Clear the array holding the duplicate files
        this.filesContainingDuplicate = [];
      }
    }
  }

  onDuplicateFilesCancelClick() {
    // Close the Popup window
    this.isDuplicateFilePopupShown = false;

    // Clear the array holding the duplicate files
    this.filesContainingDuplicate = [];
  }

  onDuplicateFilesOkClick() {
    for (const item of this.filesContainingDuplicate) {
      // For checking if there is files already updated. For duplicate file handling
      let isFileAlreadyUploaded = -1;
      let sizeOfTheFileToBeDeleted = 0;

      // Return "-1" if file name is not a exact match
      isFileAlreadyUploaded = this.files.findIndex((file) => file.name.toLowerCase() === item.name.toLowerCase());

      // Delete the previous file to avoid duplicate
      if (isFileAlreadyUploaded !== -1) {
        // Get the size of the file to be removed
        sizeOfTheFileToBeDeleted = this.files[isFileAlreadyUploaded].size;

        this.deleteFile(isFileAlreadyUploaded, sizeOfTheFileToBeDeleted);
      }

      this.files.push(item);
      this.updateStore('create', item, 0);
    }

    // Close the Popup window
    this.onDuplicateFilesCancelClick();
  }

  replaceUploadSelectedFile(index: number) {
    var toBeReplaced = this.filesContainingDuplicate[index];
    // For checking if there is files already updated. For duplicate file handling
    let isFileAlreadyUploaded = -1;
    let sizeOfTheFileToBeDeleted = 0;

    // Return "-1" if file name is not a exact match
    isFileAlreadyUploaded = this.files.findIndex((file) => file.name.toLowerCase() === toBeReplaced.name.toLowerCase());

    // Delete the previous file to avoid duplicate
    if (isFileAlreadyUploaded !== -1) {
      // Get the size of the file to be removed
      sizeOfTheFileToBeDeleted = this.files[isFileAlreadyUploaded].size;

      this.deleteFile(isFileAlreadyUploaded, sizeOfTheFileToBeDeleted);
    }

    this.files.push(toBeReplaced);
    this.updateStore('create', toBeReplaced, 0);
  }

  checkIsFileValidForUpload(file: any) {
    // e.g. sample_file.pdf
    const fileName: string = file.name;

    const indexOfLastDot = fileName.lastIndexOf('.');

    // Check to see if the file has an extension
    if (indexOfLastDot === -1) {
      return FileUploadErrorStatus.UnsupportedFileType;
    }

    // e.g. it will return "sample_file"
    const fileNameWithoutExtension = fileName.substring(0, indexOfLastDot);

    // Check File name cannot exceed 50 characters long
    if (fileNameWithoutExtension.length > this.maxNoChar) {
      return FileUploadErrorStatus.FileExceed50Characters;
    }

    // Check File name = English
    if (!this.englishPattern.test(fileNameWithoutExtension)) {
      return FileUploadErrorStatus.FileInvalidFileName;
    }

    // e.g. it will return "pdf"
    const fileExtension = fileName.substring(indexOfLastDot + 1).toLowerCase();

    // Check for correct file format: PDF, JPG, PNG
    if (!this.validFileFormats.includes(fileExtension)) {
      return FileUploadErrorStatus.UnsupportedFileType;
    }

    // Maximum size allowed for one file should not exceed 10 MB (10,000,000).
    if (file.size > this.maxFileSize * 1024 * 1000) {
      return FileUploadErrorStatus.FileExceed10MB;
    }

    // Total file size uploaded should not exceed 50 MB (50,000,000).
    if (this.totalFilesSize + file.size > this.maxTotalFileSize * 1024 * 1000) {
      return FileUploadErrorStatus.FileExceed50MB;
    }

    // Set File Upload error back to default
    this.isFileUploadErrorMessageShown = false;
    this.fileUploadErrorMessage = '';

    return FileUploadErrorStatus.NoError;
  }

  // format bytes
  // @param bytes (File size in bytes)
  // @param decimals (Decimals point)
  formatBytes(bytes: any, decimals: any = 2) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  onUploadedFilePreviewClick(indexOfFileToShow: number) {
    // YY > TO DO > Need to find a more "elegant" solution
    const fileReader = new FileReader();

    fileReader.readAsDataURL(this.files[indexOfFileToShow]);

    fileReader.onload = (event) => {
      const pdfWindow = window.open('');
      pdfWindow.document.write('<iframe src="' + event.target.result + '" width="100%" height="100%"></iframe>');
    };
  }

  // Convert Files list to normal array list
  // @param files (Files List)
  private prepareFilesList(files: Array<any>) {
    // > YY > TO DO:
    //        There is a bug where drag & drop a group of files and the files are sorted in a weird order

    // Clear the temporary file error list
    this.listOfUploadedFileThatHasErrors = [];

    for (const item of files) {
      // Check the validity of the file that was being uploaded
      const isThereFileUploadError = this.checkIsFileValidForUpload(item);

      if (isThereFileUploadError === FileUploadErrorStatus.FileExceed50MB) {
        this.isFileUploadErrorMessageShown = true;
        this.fileUploadErrorMessage = `Total file size exceeded ${this.maxTotalFileSize}.00 MB`;
      } else {
        // For Files that cleared the validation rule for file upload
        if (isThereFileUploadError === FileUploadErrorStatus.NoError) {
          // Clear the inline error (50 MB), when user managed to add in a new file
          this.isFileUploadErrorMessageShown = false;
          this.fileUploadErrorMessage = '';

          // For checking if there is files already updated. For duplicate file handling
          let isFileAlreadyUploaded = -1;

          // Return "-1" if file name is not a exact match
          isFileAlreadyUploaded = this.files.findIndex((file) => file.name.toLowerCase() === item.name.toLowerCase());

          // Delete the previous file to avoid duplicate
          if (isFileAlreadyUploaded !== -1) {
            this.filesContainingDuplicate.push(item);
          } else {
            if (this.files.length !== this.maxNoFiles) {
              this.files.push(item);
              this.updateStore('create', item, 0);
            }
          }
        } else {
          const errorFile: SupportingDocumentError = {
            fileName:
              item.name.length > this.maxNoChar + 1 ? item.name.substring(0, this.maxNoChar) + '...' : item.name,
            fileFormatErrorMsg: this.fileFormatErrorMessageArray[isThereFileUploadError],
          };

          this.listOfUploadedFileThatHasErrors.push(errorFile);
        }
      }
    }

    if (this.listOfUploadedFileThatHasErrors.length > 0) {
      this.listOfSupportingFileThatHasErrors = Object.assign([], this.listOfUploadedFileThatHasErrors);
    }

    // Throw Duplicate Popup if there are duplicate records in the array
    if (this.filesContainingDuplicate.length > 0) {
      this.isDuplicateFilePopupShown = true;
    }

    this.fileDropEl.nativeElement.value = '';
  }

  private updateStore(action: string, file: any, index: number) {
    const tempSupportingDocuments = JSON.parse(JSON.stringify(this.document.supportingDocuments));
    switch (action) {
      case 'create':
        const newFile: SupportingDocument = {
          fileName: file.name,
          fileSizeText: this.formatBytes(file.size),
          fileSizeActual: file.size,
        };
        this.totalFilesSize += file.size;
        tempSupportingDocuments.push(newFile);
        break;
      case 'delete':
        tempSupportingDocuments.splice(index, 1);
        break;
      default:
        break;
    }
    this.document.supportingDocuments = tempSupportingDocuments;
    this.fileUploaded.emit(this.files);
  }
}

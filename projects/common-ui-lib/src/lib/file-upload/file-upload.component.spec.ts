import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IrasFileUploadComponent } from './file-upload.component';
import { FileUploadErrorStatus } from './models/file-upload-error-status.model';
import { SupportingDocument } from './models/attachment.model';
import { ComponentMessages } from '@progress/kendo-angular-l10n';

describe('FileUploadComponent', () => {
  let component: IrasFileUploadComponent;
  let fixture: ComponentFixture<IrasFileUploadComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [IrasFileUploadComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(IrasFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should format bytes correctly', () => {
    // Act
    const result = component.formatBytes('20485', 2);

    expect(result).toEqual('20 KB');
  });

  it('should show invalid file type correctly', () => {
    // Arrange
    const keyName = 'name';
    const blob = new Blob([''], { type: 'text/html' });
    blob[keyName] = 'testFile.txt';

    // Act
    const result = component.checkIsFileValidForUpload(blob);

    // Assert
    expect(result).toEqual(FileUploadErrorStatus.UnsupportedFileType);
  });

  it('shoul show max file size collectly', () => {
    // Arrange
    const keyName = 'name';
    const blob = new Blob([''], { type: 'text/html' });
    blob[keyName] = 'testFile123456789012345678901234567890123456789012345678901234567890.txt';

    // Act
    const result = component.checkIsFileValidForUpload(blob);

    // Assert
    expect(result).toEqual(FileUploadErrorStatus.FileExceed50Characters);
  });

  it('should show invalid file size correctly', () => {
    // Arrange
    const keyName = 'name';
    const blob = new Blob([''], { type: 'image/png' });
    blob[keyName] = 'testFile.jpg';
    Object.defineProperty(blob, 'size', { value: 11000000, writable: false });

    // Act
    const result = component.checkIsFileValidForUpload(blob);

    // Assert
    expect(result).toEqual(FileUploadErrorStatus.FileExceed10MB);
  });

  it('should show invalid file name correctly', () => {
    // Arrange
    const keyName = 'name';
    const blob = new Blob([''], { type: 'image/png' });
    blob[keyName] = 'testFile().jpg';
    Object.defineProperty(blob, 'size', { value: 10000001, writable: false });

    // Act
    const result = component.checkIsFileValidForUpload(blob);

    // Assert
    expect(result).toEqual(FileUploadErrorStatus.FileInvalidFileName);
  });

  it('should show valid file correctly', () => {
    // Arrange
    const keyName = 'name';
    const blob = new Blob([''], { type: 'image/png' });
    blob[keyName] = 'testFile.jpg';
    Object.defineProperty(blob, 'size', { value: 10000000, writable: false });

    // Act
    const result = component.checkIsFileValidForUpload(blob);

    // Assert
    expect(result).toEqual(FileUploadErrorStatus.NoError);
  });

  it('should show valid file extension', () => {
    // Arrange
    const keyName = 'name';
    const blob = new Blob([''], { type: 'image/png' });
    blob[keyName] = 'testFile';
    Object.defineProperty(blob, 'size', { value: 10000000, writable: false });

    // Act
    const result = component.checkIsFileValidForUpload(blob);

    // Assert
    expect(result).toEqual(FileUploadErrorStatus.UnsupportedFileType);
  });

  it('should prepare files correctly', () => {
    // Arrange
    const listOfSupportingDocument: Array<SupportingDocument> = [
      {
        fileName: 'file1.jpg',
        fileSizeText: '20 KB',
        fileSizeActual: 20484,
      },
      {
        fileName: 'file2.jpg',
        fileSizeText: '10 KB',
        fileSizeActual: 10245,
      },
      {
        fileName: 'file3.jpg',
        fileSizeText: '20 KB',
        fileSizeActual: 20484,
      },
    ];

    const listOfRawFiles: any[] = [];

    const keyName = 'name';
    const blob1 = new Blob([''], { type: 'image/png' });
    blob1[keyName] = 'file1.jpg';
    Object.defineProperty(blob1, 'size', { value: 20484, writable: false });

    const blob2 = new Blob([''], { type: 'image/png' });
    blob2[keyName] = 'file2.jpg';
    Object.defineProperty(blob2, 'size', { value: 10245, writable: false });

    const blob3 = new Blob([''], { type: 'image/png' });
    blob3[keyName] = 'file3.jpg';
    Object.defineProperty(blob3, 'size', { value: 20484, writable: false });

    listOfRawFiles.push(blob1);
    listOfRawFiles.push(blob2);
    listOfRawFiles.push(blob3);

    // Act
    component.fileBrowseHandler(listOfRawFiles);

    // Assert
    expect(component.document.supportingDocuments).toEqual(listOfSupportingDocument);
  });

  it('should delete files correctly', () => {
    // Arrange
    const listOfSupportingDocument: Array<SupportingDocument> = [
      {
        fileName: 'file1.jpg',
        fileSizeText: '20 KB',
        fileSizeActual: 20484,
      },
      {
        fileName: 'file3.jpg',
        fileSizeText: '20 KB',
        fileSizeActual: 20484,
      },
    ];

    const listOfRawFiles: any[] = [];

    const keyName = 'name';
    const blob1 = new Blob([''], { type: 'image/png' });
    blob1[keyName] = 'file1.jpg';
    Object.defineProperty(blob1, 'size', { value: 20484, writable: false });

    const blob2 = new Blob([''], { type: 'image/png' });
    blob2[keyName] = 'file2.jpg';
    Object.defineProperty(blob2, 'size', { value: 10245, writable: false });

    const blob3 = new Blob([''], { type: 'image/png' });
    blob3[keyName] = 'file3.jpg';
    Object.defineProperty(blob3, 'size', { value: 20484, writable: false });

    listOfRawFiles.push(blob1);
    listOfRawFiles.push(blob2);
    listOfRawFiles.push(blob3);

    // Act
    component.fileBrowseHandler(listOfRawFiles);

    component.deleteFile(1, 10245);

    // Assert
    expect(component.document.supportingDocuments).toEqual(listOfSupportingDocument);
  });

  it('should call on duplicate file ok', () => {
    spyOn(component, 'onDuplicateFilesOkClick').and.callThrough();
    spyOn(component, 'replaceUploadSelectedFile').and.callThrough();

    component.onDuplicateFileOkClick({ toBeUpload: true, index: -1 });
    component.onDuplicateFileOkClick({ toBeUpload: false, index: -1 });
  });

  it('should run for all duplicate files ok', () => {
    component.filesContainingDuplicate = [
      {
        name: '1 TESTJPG.jpg',
        size: 5332,
        type: 'image/jpeg',
      },
      {
        name: '2 TESTJPG.jpg',
        size: 5332,
        type: 'image/jpeg',
      },
      {
        name: '3 TESTJPG.jpg',
        size: 5332,
        type: 'image/jpeg',
      },
    ];

    component.files = [
      {
        name: '1 TESTJPG.jpg',
        size: 5332,
        type: 'image/jpeg',
      },
      {
        name: '2 TESTJPG.jpg',
        size: 5332,
        type: 'image/jpeg',
      },
      {
        name: '3 TESTJPG.jpg',
        size: 5332,
        type: 'image/jpeg',
      },
    ];

    component.onDuplicateFilesOkClick();
  });

  it('should replace uploaded selected file', () => {
    component.filesContainingDuplicate = [
      {
        name: '1 TESTJPG.jpg',
        size: 5332,
        type: 'image/jpeg',
      },
      {
        name: '2 TESTJPG.jpg',
        size: 5332,
        type: 'image/jpeg',
      },
      {
        name: '3 TESTJPG.jpg',
        size: 5332,
        type: 'image/jpeg',
      },
    ];

    component.files = [
      {
        name: '1 TESTJPG.jpg',
        size: 5332,
        type: 'image/jpeg',
      },
      {
        name: '2 TESTJPG.jpg',
        size: 5332,
        type: 'image/jpeg',
      },
      {
        name: '3 TESTJPG.jpg',
        size: 5332,
        type: 'image/jpeg',
      },
    ];
    component.replaceUploadSelectedFile(1);
  });

  it(' shoud delete file for error row', () => {
    component.deleteFileForErrorRow(0);
  });

  it('should upload dropped files', () => {
    const listOfRawFiles: any[] = [];

    const keyName = 'name';
    const blob1 = new Blob([''], { type: 'image/png' });
    blob1[keyName] = 'file1.jpg';
    Object.defineProperty(blob1, 'size', { value: 256, writable: false });

    const blob2 = new Blob([''], { type: 'image/png' });
    blob2[keyName] = 'file2.jpg';
    Object.defineProperty(blob2, 'size', { value: 256, writable: false });

    listOfRawFiles.push(blob1);
    listOfRawFiles.push(blob2);

    component.files = [];
    component.onFileDropped(listOfRawFiles);
    expect(component.files.length).toEqual(2);
  });

  it('should preview upload file', () => {
    const listOfRawFiles: any[] = [];

    const keyName = 'name';
    const blob1 = new Blob([''], { type: 'image/png' });
    blob1[keyName] = 'file1.jpg';
    Object.defineProperty(blob1, 'size', { value: 256, writable: false });

    component.files = [];

    listOfRawFiles.push(blob1);
    component.fileBrowseHandler(listOfRawFiles);

    component.onUploadedFilePreviewClick(0);
  });
});

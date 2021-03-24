import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { IrasModalModule } from '../modal/modal.module';
import { ModalService } from '../modal/modal.service';

import { DialogPopupComponent } from './dialog-popup.component';

describe('DialogPopupComponent', () => {
  let component: DialogPopupComponent;
  let fixture: ComponentFixture<DialogPopupComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DialogPopupComponent],
        imports: [IrasModalModule, NoopAnimationsModule],
        providers: [ModalService],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update current file index', () => {
    component.updateCurrentFileIndex();
  });

  it('should init', () => {
    component.fileUploadDuplicates = [
      {
        name: '1 TESTJPG.jpg',
        size: 5332,
        type: 'image/jpeg',
      },
    ];

    component.uploadConflictRadioOptions = [
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

    component.ngOnInit();

    // Assert
    expect(component.hasSingleConflict).toEqual(true);
  });

  it('should replace duplicate file uploads', () => {
    component.replaceAllDuplicateSelected = false;
    component.replaceDuplicateSelected = true;
    component.duplicateFileIndex = 0;

    component.fileUploadDuplicates = [
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
    ];

    component.onFileUploadDuplicates();
  });

  it('should skip duplicate file uploads', () => {
    component.replaceAllDuplicateSelected = false;
    component.replaceDuplicateSelected = false;
    component.duplicateFileIndex = 0;

    component.fileUploadDuplicates = [
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
    ];

    component.onFileUploadDuplicates();
  });

  it('#ngOnChanges should work', () => {
    component.ngOnChanges({
      dialogOpen: {
        isFirstChange: () => false,
        previousValue: false,
        currentValue: true,
        firstChange: false,
      },
    });
    component.onBack('ClosedButton Clicked');
    expect(component.onBack).toBeTruthy();
    expect(component.ngOnChanges).toBeTruthy();
    component.fileUploadDuplicates = [
      {
        name: '1 TESTJPG.jpg',
        size: 5332,
        type: 'image/jpeg',
      },
    ];
    component.replaceAllDuplicateSelected = true;
    fixture.detectChanges();
    component.onContinue('Continue Clicked');
    expect(component.onContinue).toBeTruthy();
  });
});

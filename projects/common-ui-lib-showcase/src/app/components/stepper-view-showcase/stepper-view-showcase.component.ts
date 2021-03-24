import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ModalService } from '../../../../../common-ui-lib/src/lib/modal/modal.service';

@Component({
  selector: 'app-stepper-view-showcase.component',
  templateUrl: './stepper-view-showcase.component.html',
  styleUrls: ['./stepper-view-showcase.component.scss'],
})
export class StepperViewShowcaseComponent implements OnInit {
  @ViewChild('modalContentRef', { static: false }) modalContentRef: TemplateRef<any>;
  // Stepper View
  headingTitles: Array<string> = [
    '1 Getting Started',
    '2 Property/ Land',
    '3 ABSD Rate (if applicable)',
    '4 Remission (if applicable)',
    '5 Summary',
    '6 Payment (if applicable)',
    '7 Acknowledgement',
  ];

  public dialog2Opened = false;

  currentIndex = 0;

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {}

  onStepBack() {
    if (this.currentIndex === 0) {
      return;
    }
    this.currentIndex = this.currentIndex - 1;
  }

  onStepNext() {
    if (this.currentIndex >= this.headingTitles.length || this.currentIndex === this.headingTitles.length - 1) {
      return;
    }
    this.currentIndex = this.currentIndex + 1;
  }

  onDialogContinue(event: any) {
    console.log('[onDialogContinue] ', event);
  }

  showModal() {
    this.modalService.show({
      data: {
        templateContentRef: this.modalContentRef,
      },
      panelClass: 'modal-showcase',
      backdropClass: 'modal-showcase-backdrop',
    });
  }

  hideModal() {
    this.modalService.hide();
  }
}

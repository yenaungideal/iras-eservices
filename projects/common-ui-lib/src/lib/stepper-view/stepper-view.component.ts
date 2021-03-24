import { Component, Input, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { ModalService } from '../modal/modal.service';

@Component({
  selector: 'iras-stepper-view',
  templateUrl: './stepper-view.component.html',
  styleUrls: ['./stepper-view.component.scss'],
})
export class StepperViewComponent implements OnInit {
  currentIndex = 0;

  @ViewChild('modalContentRef', { static: false }) modalContentRef: TemplateRef<any>;

  @Input() headings: Array<string> = [];
  @Input() activeIndex = 0;

  public dialog2Opened = false;

  constructor(public modalService: ModalService) {}

  ngOnInit(): void {}

  showModal() {
    this.modalService.show({
      data: {
        templateContentRef: this.modalContentRef,
      },
      panelClass: 'default-modal',
      backdropClass: 'default-modal-dialog-backdrop',
    });
  }

  hideModal() {
    this.modalService.hide();
  }
}

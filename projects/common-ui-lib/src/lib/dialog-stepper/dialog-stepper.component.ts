import { Component, EventEmitter, Output, Input } from '@angular/core';
@Component({
  selector: 'dialog-stepper',
  templateUrl: './dialog-stepper.component.html',
  styleUrls: ['./dialog-stepper.component.scss'],
})
export class DialogStepperComponent {
  @Input() headings: Array<string>;
  @Input() activeIndex: number;
  isCancelAction = true;
  @Input() cancelActionText = 'Close';
  @Input() cancelActionStyle = 'btn btn-primary-invert';
  @Output() dialogClose = new EventEmitter();

  constructor() {}

  closeButton() {
    this.dialogClose.emit();
  }
}

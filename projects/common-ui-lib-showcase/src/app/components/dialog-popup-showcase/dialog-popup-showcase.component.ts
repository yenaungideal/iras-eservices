import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-popup-showcase',
  templateUrl: './dialog-popup-showcase.component.html',
})
export class DialogPopupShowcaseComponent implements OnInit {
  // Dialog popups
  public dialog1Opened = false;
  public dialog2Opened = false;
  public dialog3Opened = false;
  public dialog4Opened = false;

  constructor() {}

  ngOnInit() {}

  onDialogContinue(event: any, dialogStatus) {
    if (dialogStatus === 'dialog1Opened') {
      this.dialog1Opened = false;
    }

    if (dialogStatus === 'dialog3Opened') {
      this.dialog3Opened = false;
    }

    if (dialogStatus === 'dialog4Opened') {
      this.dialog4Opened = false;
    }
    console.log(event);
  }

  onDialogClosed(closedBy,dialogStatus) {
    if (dialogStatus === 'dialog1Opened') {
      this.dialog1Opened = false;
    }

    if (dialogStatus === 'dialog2Opened') {
      this.dialog2Opened = false;
    }

    if (dialogStatus === 'dialog3Opened') {
      this.dialog3Opened = false;
    }

    if (dialogStatus === 'dialog4Opened') {
      this.dialog4Opened = false;
    }
    console.log(closedBy);
  }
}

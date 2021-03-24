import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-menu-showcase',
  templateUrl: './button-menu-showcase.component.html',
  styleUrls: ['./button-menu-showcase.component.scss'],
})
export class ButtonMenuShowcaseComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onBtnMenuSelectionChange(item: any) {
    console.log(item);
  }
}

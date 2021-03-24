import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'iras-maintenance-layout',
  templateUrl: './maintenance-layout.component.html',
  styleUrls: ['./maintenance-layout.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class MaintenanceLayoutComponent implements OnInit {
  @Input() header: string;
  @Input() description: string;
  @Input() cssClass: string;
  constructor() {}

  ngOnInit(): void {}

  getContainerClassList() {
    return `${this.cssClass || ''}`;
  }
}

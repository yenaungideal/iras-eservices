import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maintenance-layout-showcase',
  templateUrl: './maintenance-layout-showcase.component.html',
  styleUrls: ['./maintenance-layout-showcase.component.scss'],
})
export class MaintenanceLayoutShowcaseComponent implements OnInit {
  header = 'Maintenance in progress';
  description = 'myTax Portal will not be available from 2:00 AM to 5:00 AM (Singapore Time) on 6 Jan 2021 (Wed)';
  constructor() {}

  ngOnInit(): void {}
}

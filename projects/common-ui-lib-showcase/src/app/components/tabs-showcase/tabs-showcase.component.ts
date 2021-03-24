import { Component, OnInit, ViewChild } from '@angular/core';
import { TabStripComponent } from '@progress/kendo-angular-layout';

@Component({
  selector: 'app-tabs-showcase.component',
  templateUrl: './tabs-showcase.component.html',
})
export class TabsShowcaseComponent implements OnInit {
  tabTitles = ['Financial Records', 'Non-Financial Records/ In-Progress'];
  @ViewChild('tabStrip', { static: false }) tabStrip: TabStripComponent;

  ngOnInit(): void {}

  onTabSelect(tab: any) {
    console.log(tab.title);
  }
}

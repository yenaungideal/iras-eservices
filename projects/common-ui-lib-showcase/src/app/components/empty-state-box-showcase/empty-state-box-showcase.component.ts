import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-empty-state-box-showcase',
  templateUrl: './empty-state-box-showcase.component.html',
  styleUrls: ['./empty-state-box-showcase.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class EmptyStateBoxShowcaseComponent {
  headerText = 'No records found';
  descriptionText =
    'There are no records for this month. We recommend that you use the search function to locate other records.';
  headerTextOnly = 'No records found';
  headerTextSearchResult = 'No records found';
  headerTextSearchDescription =
    'There are no records for this month. We recommend that you use the search function to locate other records.';
}

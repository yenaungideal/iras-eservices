import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination-showcase',
  templateUrl: './pagination-showcase.component.html',
})
export class PaginationShowcaseComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  updateActivePage(activePageIdx: number) {
    console.log('[Pagination] Current Page: ', activePageIdx);
  }
}

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PaginationComponent],
        imports: [HttpClientTestingModule],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    component.activePageIndex = 2;
    component.numPages = 2;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#changePage should emit the stateChanged with actie page index', () => {
    const spy = spyOn(component.stateChanged, 'emit').and.callThrough();
    const option = 2;
    component.changePage(option);
    expect(spy).toHaveBeenCalledWith(option);
  });

  it('#changePageByAddOne should change the page by adding page index one', () => {
    const spy = spyOn(component.stateChanged, 'emit').and.callThrough();
    const currentPage = 1;
    component.changePageByAddOne(currentPage);
    expect(spy).toHaveBeenCalledWith(2);
  });

  it('#changePageByAddOne should return if active page and pageIndex are equal', () => {
    const spy = spyOn(component.stateChanged, 'emit').and.callThrough();
    const currentPage = 2;
    component.activePage = 2;
    component.numPages = 2;
    fixture.detectChanges();
    component.changePageByAddOne(currentPage);
    expect(spy).not.toHaveBeenCalledWith(2);
  });

  it('#changePageByMinusOne should change the page by reducing page index one', () => {
    const spy = spyOn(component.stateChanged, 'emit').and.callThrough();
    const currentPage = 2;
    component.activePage = 2;
    fixture.detectChanges();
    component.changePageByMinusOne(currentPage);
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('#changePageByMinusOne should return if active page is equal 1', () => {
    const spy = spyOn(component.stateChanged, 'emit').and.callThrough();
    const currentPage = 1;
    component.activePage = 1;
    fixture.detectChanges();
    component.changePageByMinusOne(currentPage);
    expect(spy).not.toHaveBeenCalledWith(1);
  });

  it('#jumpToFirstPage should reset the pages array slice', () => {
    const spy = spyOn(component.stateChanged, 'emit').and.callThrough();
    component.paginationSizeMax = 10;
    fixture.detectChanges();
    component.jumpToFirstPage();
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('#jumpToLastPage should change the last page index', () => {
    const spy = spyOn(component.stateChanged, 'emit').and.callThrough();
    component.numPages = 10;
    component.paginationSizeMax = 10;
    fixture.detectChanges();
    component.jumpToLastPage();
    expect(spy).toHaveBeenCalledWith(10);
  });

  it('#pageLengthAddOne should return if paginationMinDisplay is equal current page index', () => {
    const spy = spyOn(component, 'pageLengthAddOne').and.callThrough();
    component.paginationMinDisplay = 32;
    component.numPages = 33;
    component.paginationSizeMax = 1;
    fixture.detectChanges();
    component.pageLengthAddOne();
    expect(spy).toHaveBeenCalled();
  });

  it('#pageLengthMinusOne should change the paginationMinDisplay and paginationNumMaxDisplay ', () => {
    component.numPages = 3;
    component.paginationSizeMax = 3;
    component.paginationMinDisplay = 3;
    component.paginationNumMaxDisplay = 3;
    fixture.detectChanges();
    component.pageLengthMinusOne();
    expect(component.paginationMinDisplay).toEqual(2);
    expect(component.paginationNumMaxDisplay).toEqual(2);
  });
});

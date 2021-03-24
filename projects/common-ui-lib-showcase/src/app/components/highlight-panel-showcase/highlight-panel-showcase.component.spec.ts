import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightPanelShowcaseComponent } from './highlight-panel-showcase.component';

describe('HighlightPanelShowcaseComponent', () => {
  let component: HighlightPanelShowcaseComponent;
  let fixture: ComponentFixture<HighlightPanelShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HighlightPanelShowcaseComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlightPanelShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightPanelComponent } from './highlight-panel.component';
import { IrasHighlightPanelModule } from './highlight-panel.module';

describe('HighlightPanelComponent', () => {
  let component: HighlightPanelComponent;
  let fixture: ComponentFixture<HighlightPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HighlightPanelComponent],
      imports: [IrasHighlightPanelModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlightPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

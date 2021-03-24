import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MaintenanceLayoutShowcaseComponent } from './maintenance-layout-showcase.component';

describe('MaintenanceLayoutShowcaseComponent', () => {
  let component: MaintenanceLayoutShowcaseComponent;
  let fixture: ComponentFixture<MaintenanceLayoutShowcaseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceLayoutShowcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceLayoutShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

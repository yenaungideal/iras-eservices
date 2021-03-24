import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ButtonMenuShowcaseComponent } from './button-menu-showcase.component';

describe('ButtonMenuShowcaseComponent', () => {
  let component: ButtonMenuShowcaseComponent;
  let fixture: ComponentFixture<ButtonMenuShowcaseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonMenuShowcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonMenuShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IrasDropdownsModule } from '../dropdowns.module';
import { IrasMultiSelectDropdownComponent } from './iras-multi-select-dropdown.component';

describe('IrasMultiSelectDropdownComponent', () => {
  let component: IrasMultiSelectDropdownComponent;
  let fixture: ComponentFixture<IrasMultiSelectDropdownComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        schemas: [NO_ERRORS_SCHEMA],
        imports: [IrasDropdownsModule, BrowserAnimationsModule],
        declarations: [IrasMultiSelectDropdownComponent],
      })
        .compileComponents()
        .then((_) => {
          fixture = TestBed.createComponent(IrasMultiSelectDropdownComponent);
          component = fixture.componentInstance;
          component.data = [
            {
              key: 'selectAll',
              selected: false,
              text: 'Select All',
            },
            {
              selected: false,
              key: 'A',
              text: 'Test 1',
            },
            {
              selected: false,
              text: 'Test 2',
              key: 'B',
            },
          ];
          fixture.detectChanges();
        });
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('selectOpened has default value', () => {
    expect(component.selectOpened).toEqual(false);
  });

  it('selectFocused has default value', () => {
    expect(component.selectFocused).toEqual(false);
  });

  it('dropdownOptionContanierHeight has default value', () => {
    expect(component.dropdownOptionContanierHeight).toEqual(300);
  });

  it('#writeValue should set value', () => {
    const spy = spyOn(component, 'notifyChange').and.callThrough();
    const option = ['A', 'B'];
    component.writeValue(option);
    expect(spy).toHaveBeenCalledWith(option);
  });

  it('#removeSelectedOption should call notifyChange and emit selected value', () => {
    const spy = spyOn(component, 'notifyChange').and.callThrough();
    component.data = [
      {
        key: 'selectAll',
        selected: false,
        text: 'Select All',
      },
      {
        selected: true,
        key: 'A',
        text: 'Test 1',
      },
      {
        selected: false,
        text: 'Test 2',
        key: 'B',
      },
    ];
    fixture.detectChanges();
    const option = [
      {
        key: 'selectAll',
        selected: false,
        text: 'Select All',
      },
      {
        selected: false,
        key: 'A',
        text: 'Test 1',
      },
      {
        selected: false,
        text: 'Test 2',
        key: 'B',
      },
    ];
    component.removeSelectedOption('A');
    expect(component.data).toEqual(option);
    expect(spy).toHaveBeenCalledWith([]);
  });

  it('#onOptionChanged should emit the notify change with selected keys', () => {
    const spy = spyOn(component, 'notifyChange').and.callThrough();
    const onOptionChanged = {
      selected: true,
      text: 'ABC Pte Ltd, UEN-LOCAL CO 199012345A',
      key: 'B',
    };
    component.onOptionChanged(onOptionChanged);
    expect(spy).toHaveBeenCalledWith(['B']);
  });

  it('#onOptionChanged should emit the notify change with select all', () => {
    const spy = spyOn(component, 'notifyChange').and.callThrough();
    const onOptionChanged = {
      key: 'selectAll',
      text: 'Select All',
      selected: true,
    };
    component.onOptionChanged(onOptionChanged);
    expect(spy).toHaveBeenCalledWith(['A', 'B']);
  });

  it('#onOptionChanged should emit the notify change with unSelect all', () => {
    const spy = spyOn(component, 'notifyChange').and.callThrough();
    const onOptionChanged = {
      key: 'selectAll',
      text: 'Select All',
      selected: false,
    };
    component.onOptionChanged(onOptionChanged);
    expect(spy).toHaveBeenCalledWith([]);
  });

  it('#onOptionChanged should emit the notify change with parent level selected key', () => {
    const spy = spyOn(component, 'notifyChange').and.callThrough();
    const onOptionChanged = {
      selected: true,
      key: 'A',
      text: 'Test 1',
    };
    component.onOptionChanged(onOptionChanged);
    expect(spy).toHaveBeenCalledWith(['A']);
  });

  it('#onOptionChanged should emit the notify change with parent level unSelect key', () => {
    const spy = spyOn(component, 'notifyChange').and.callThrough();
    const onOptionChanged = {
      selected: false,
      key: 'A',
      text: 'Test 1',
    };

    component.onOptionChanged(onOptionChanged);
    expect(spy).toHaveBeenCalledWith([]);
  });

  it('#registerOnChange should call onChange', () => {
    component.registerOnChange(() => {});
    expect(component.onChange).toBeTruthy();
  });

  it('#registerOnTouched should call onTouch', () => {
    component.registerOnTouched(() => {});
    expect(component.onTouch).toBeTruthy();
  });

  it('#setDisabledState should change the disabled state', () => {
    component.disabled = false;
    fixture.detectChanges();
    component.setDisabledState(true);
    expect(component.disabled).toBeTrue();
  });

  it('#showDropdown should trigger the dropdown.show method', () => {
    const spy = spyOn(component.dropdown, 'show').and.callThrough();
    component.disabled = false;
    fixture.detectChanges();
    component.showDropdown({});
    expect(spy).toHaveBeenCalled();
  });

  it('#ngOnChanges should work', () => {
    component.ngOnChanges({
      data: {
        isFirstChange: () => false,
        previousValue: [
          {
            selected: false,
            key: 'A',
            text: '99A Newton Road S(307987) #10-01, #10-02',
          },
          {
            selected: false,
            text: 'ABC Pte Ltd, UEN-LOCAL CO 199012345A',
            key: 'B',
          },
        ],
        currentValue: [
          {
            selected: false,
            key: 'A',
            text: 'Test 1',
          },
          {
            selected: false,
            text: 'Test 2',
            key: 'B',
          },
        ],
        firstChange: false,
      },
    });
    expect(component.data.length).toEqual(3);
  });
});

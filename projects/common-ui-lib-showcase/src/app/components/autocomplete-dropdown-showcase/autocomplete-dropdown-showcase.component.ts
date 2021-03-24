import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-autocomplete-dropdown-showcase',
  templateUrl: 'autocomplete-dropdown-showcase.component.html',
  styleUrls: ['./autocomplete-dropdown-showcase.component.scss'],
})
export class AutocompleteDropdownShowcaseComponent implements OnInit {
  dropdownForm: FormGroup;
  dropdownPlaceholder = 'Enter Country Name';
  dropdownLabel = 'Country of Nationality';
  dropDownData = [
    { text: 'Singapore', key: '1' },
    { text: 'Malaysia', key: '2' },
    { text: 'Hongkong', key: '3' },
    { text: 'China', key: '4' },
    { text: 'India', key: '5' },
    { text: 'Sri Lanka', key: '6' },
    { text: 'Thailand', key: '7' },
    { text: 'India South', key: '8' },
    { text: 'India North', key: '9' },
  ];
  disabled = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.dropdownForm = this.formBuilder.group({
      transaction: [this.dropDownData[1].key, Validators.required],
    });
  }

  get transaction() {
    return this.dropdownForm.controls.transaction;
  }

  patchValue() {
    this.dropdownForm.patchValue({
      transaction: this.dropDownData[2].key,
    });
  }

  onDropdownSelect(event: any) {
    console.log(event);
  }

  toggle() {
    if (this.dropdownForm.controls.transaction.dirty) {
      this.dropdownForm.controls.transaction.reset();
    } else {
      this.dropdownForm.controls.transaction.markAsDirty();
    }
  }
  disable() {
    this.disabled = !this.disabled;
  }

  reset() {
    this.dropdownForm.patchValue({
      transaction: null,
    });
  }

  resetForm() {
    this.dropdownForm.patchValue({
      transaction: null,
    });
    this.dropdownForm.reset();
  }

  changeList() {
    this.dropDownData = [
      {
        text: 'Data1',
        key: '1',
      },
      {
        text: 'Data2',
        key: '2',
      },
    ];
    this.dropdownForm.controls.transaction.reset();
  }
}

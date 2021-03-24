import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dropdown-showcase',
  templateUrl: './dropdown-showcase.component.html',
  styleUrls: ['./dropdown-showcase.component.scss'],
})
export class DropdownShowcaseComponent implements OnInit {
  dropdownForm: FormGroup;
  dropdownPlaceholder = 'Select a transaction type to begin';
  dropdownLabel = 'Nature of Transaction';
  dropDownData = [
    { text: 'Lease/ Tenancy Agreement', key: '1' },
    { text: 'Assignment of Lease between owners', key: '2' },
    { text: 'Novation/ Assignment of Lease between tenants', key: '3' },
    { text: 'Surrender of Lease', key: '4' },
    { text: 'Variation of Lease', key: '5' },
  ];
  disabled = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.dropdownForm = this.formBuilder.group({
      transaction: ['', Validators.required],
    });
  }

  get transaction() {
    return this.dropdownForm.controls.transaction;
  }

  patchValue() {
    this.dropdownForm.patchValue({
      transaction: this.dropDownData[1].key,
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

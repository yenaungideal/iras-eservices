import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { printFormValueAndValidity } from '../../utils/print-form-value-and-validity';

@Component({
  selector: 'app-radio-input-showcase',
  templateUrl: './radio-input-showcase.component.html',
  styleUrls: ['./radio-input-showcase.component.scss'],
})
export class RadioInputShowcaseComponent implements OnInit {
  documentSignedInList = [
    {
      label: 'Singapore',
      selected: false,
      buttonTheme: 'primary',
      disabled: false,
    },
    {
      label: 'Overseas',
      selected: false,
      buttonTheme: 'primary',
      disabled: false,
    },
  ];

  intentList = [
    {
      label: 'To hold the property in trust for the beneficial owner',
      selected: true,
      buttonTheme: 'primary',
    },
    {
      label: 'To transfer the property via conveyance direction to another person or entity',
      selected: false,
      buttonTheme: 'danger',
    },
  ];

  documentSignForm: FormGroup;
  intentForm: FormGroup;
  documentHasError: boolean;
  isDisabled: boolean;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.documentSignForm = this.formBuilder.group({
      radio: ['', [Validators.required]],
    });

    this.intentForm = this.formBuilder.group({
      radio: ['', [Validators.required]],
    });

    this.intentForm.valueChanges.subscribe((val) => {
      printFormValueAndValidity(this.documentSignForm);
    });
    this.documentSignForm.valueChanges.subscribe((val) => {
      printFormValueAndValidity(this.documentSignForm);
    });
  }

  patchValue() {
    this.documentSignForm.patchValue({
      radio: {
        label: 'Singapore',
        selected: true,
        buttonTheme: 'primary',
      },
    });
  }

  reset() {
    this.documentHasError = false;
    this.documentSignForm.patchValue({
      radio: null,
    });
  }

  toggleError() {
    this.documentHasError = !this.documentHasError;
  }

  disable() {
    this.isDisabled = !this.isDisabled;
    if (this.isDisabled) {
      for (const option of this.documentSignedInList) {
        option.disabled = true;
      }
      if (this.documentSignForm.controls.radio.value) {
        this.documentSignForm.controls.radio.value.selected = true;
        this.documentSignForm.controls.radio.value.disabled = true;
      }
    } else {
      for (const option of this.documentSignedInList) {
        option.disabled = false;
      }
      if (this.documentSignForm.controls.radio.value) {
        this.documentSignForm.controls.radio.value.selected = true;
        this.documentSignForm.controls.radio.value.disabled = false;
      }
    }

    this.documentSignForm.patchValue({
      radio: this.documentSignForm.controls.radio.value,
    });
  }
}

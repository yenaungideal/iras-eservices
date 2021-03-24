import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-button-showcase',
  templateUrl: './button-showcase.component.html',
  styleUrls: ['./button-showcase.component.scss'],
})
export class ButtonShowcaseComponent implements OnInit {
  inputForm: FormGroup;
  showSpinner = false;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.inputForm = this.formBuilder.group({
      fullName: ['', Validators.required],
    });
  }

  onInputFormSubmit() {
    if (!this.inputForm.valid) {
      return;
    }

    console.log('valid');
  }

  onSpinnerButtonClick() {
    this.showSpinner = !this.showSpinner;
  }

  onButtonClick() {
    console.log('Button Click');
  }

  get fullName(): any {
    return this.inputForm.controls.fullName;
  }
}

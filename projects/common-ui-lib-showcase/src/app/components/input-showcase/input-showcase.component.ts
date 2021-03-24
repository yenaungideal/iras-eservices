import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { regexInputPattern } from '../../../../../common-ui-lib/src/public-api';
import { forbiddenNameValidator } from '../../utils/forbidden-name.directive';

@Component({
  selector: 'app-input-showcase',
  templateUrl: './input-showcase.component.html',
  styleUrls: ['./input-showcase.component.scss'],
})
export class InputShowcaseComponent implements OnInit {
  singleInputForm: FormGroup;
  NAME_LENGTH = 8;
  maxValue = 2000;
  minValue = 500;
  inlineInputForm: FormGroup;
  textAreaForm: FormGroup;
  disabled = false;
  mobileRegex = '^[0-9]{8}$';
  customInputForm: FormGroup;
  numericPattern = regexInputPattern.numericPattern;
  sixteenDigitNumerRegex = '^[0-9]{16}$';
  sixteenDigitVoucherControl = new FormControl('', [
    Validators.required,
    Validators.pattern(this.sixteenDigitNumerRegex),
  ]);
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.singleInputForm = this.formBuilder.group({
      paymentRef: ['', [Validators.required, Validators.minLength(4), Validators.pattern('^\\d+\\.\\d{2}$')]],
      fileRef: ['', [Validators.required, Validators.minLength(this.NAME_LENGTH), forbiddenNameValidator(/bob/i)]],
    });

    this.textAreaForm = this.formBuilder.group({
      paragraph: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    });

    this.customInputForm = this.formBuilder.group({
      customNumericInput: ['', [Validators.required, Validators.pattern(/[0-9]{1,3}[.]\d{2}/)]],
      paymentAmount: ['590', [Validators.required, Validators.min(this.minValue), Validators.max(this.maxValue)]],

      phoneNumber: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]],
      emailInput: ['', [Validators.required, Validators.email]],
    });

    this.singleInputForm.valueChanges.subscribe((val) => {
      console.log('valueChange: ', val);
    });

    this.singleInputForm.statusChanges.subscribe((status) => {
      console.log('statusChange: ', status);
    });

    this.inlineInputForm = this.formBuilder.group({
      levelNo: ['', [Validators.required]],
      unitNo: ['', [Validators.required]],
    });

    this.inlineInputForm.valueChanges.subscribe((val) => {
      console.log('inline-input-form valueChange: ', val);
    });

    this.inlineInputForm.statusChanges.subscribe((status) => {
      console.log('inline-input-form statusChange: ', status);
    });
  }

  get fileRef(): any {
    return this.singleInputForm.controls.fileRef;
  }

  get paymentRef(): any {
    return this.singleInputForm.controls.paymentRef;
  }
  get paymentAmount(): any {
    return this.customInputForm.controls.paymentAmount;
  }
  get phoneNumber(): any {
    return this.customInputForm.controls.phoneNumber;
  }

  get paragraph(): any {
    return this.textAreaForm.controls.paragraph;
  }

  get customNumericInput(): any {
    return this.customInputForm.controls.customNumericInput;
  }

  get emailInput(): any {
    return this.customInputForm.controls.emailInput;
  }
  disable() {
    this.disabled = !this.disabled;
  }

  changeState() {
    console.log('Link clicked.');
  }

  onNumericBlur(event: any) {
    console.log(event + this.customInputForm.controls.paymentAmount);
  }

  resetFileRefControl() {
    this.fileRef.reset();
  }
}

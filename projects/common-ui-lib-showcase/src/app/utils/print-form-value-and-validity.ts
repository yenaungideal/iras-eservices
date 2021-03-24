import { FormGroup } from '@angular/forms';

export const printFormValueAndValidity = (form: FormGroup) => {
  const controls = Object.keys(form.controls).map((k) => {
    return {
      controlName: k,
      value: form.controls[k].value,
      valid: form.controls[k].valid,
      pristine: form.controls[k].valid,
      touched: form.controls[k].touched,
      dirty: form.controls[k].dirty,
    };
  });
  console.log(controls);
};

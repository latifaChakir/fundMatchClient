import {FormBuilder, Validators} from "@angular/forms";

export function forgetPassValidator(fb: FormBuilder) {
  return fb.group({
    email: ["", [Validators.required, Validators.email]],
  });
}

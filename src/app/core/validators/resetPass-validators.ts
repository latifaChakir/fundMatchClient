import {FormBuilder, Validators} from "@angular/forms";

export function resetPassValidator(fb: FormBuilder) {
  return fb.group({
    newPassword: ["", [Validators.required, Validators.minLength(6)]],
  });
}

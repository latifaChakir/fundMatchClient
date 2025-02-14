import {FormBuilder, Validators} from "@angular/forms";

export function createRegisterValidator(fb: FormBuilder) {
  return fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    isActive: true
  });
}

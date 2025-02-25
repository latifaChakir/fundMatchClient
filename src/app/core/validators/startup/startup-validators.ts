import {FormBuilder, Validators} from "@angular/forms";

export function createStartupValidator(fb: FormBuilder) {
  return fb.group({
    name: ['', Validators.required],
  });
}

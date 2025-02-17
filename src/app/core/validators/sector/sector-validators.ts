import {FormBuilder, Validators} from "@angular/forms";

export function createSectorValidator(fb: FormBuilder) {
  return fb.group({
    name: ['', Validators.required],
  });
}

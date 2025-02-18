import {FormBuilder, Validators} from "@angular/forms";

export function createStageValidator(fb: FormBuilder) {
  return fb.group({
    name: ['', Validators.required],
  });
}

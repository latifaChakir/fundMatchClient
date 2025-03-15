import {FormBuilder, Validators} from "@angular/forms";

export function createRoleValidator(fb: FormBuilder) {
  return fb.group({
    name: ['', Validators.required],
  });
}

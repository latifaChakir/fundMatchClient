import {FormBuilder, Validators} from "@angular/forms";

export function createprojectValidator(fb: FormBuilder) {
  return fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    fundingAmount: ['', Validators.required],
    createdAt: ['', Validators.required],
    viewCount: ['', Validators.required],
    stage: ['', Validators.required],
  });
}

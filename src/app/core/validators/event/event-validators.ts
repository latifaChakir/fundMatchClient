import {FormBuilder, Validators} from "@angular/forms";

export function createEventValidator(fb: FormBuilder) {
  return fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    type: ['', Validators.required],
    location: ['', Validators.required],
    date: ['', Validators.required],
    cost: ['', Validators.required],
    maxParticipants: ['', Validators.required],
    sector: ['', Validators.required],
  });
}

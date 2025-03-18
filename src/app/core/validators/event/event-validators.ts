import {FormBuilder, Validators, AbstractControl } from "@angular/forms";

export function createEventValidator(fb: FormBuilder) {
  return fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    type: ['', Validators.required],
    location: ['', Validators.required],
    date: ['', [Validators.required, futureDateValidator]],
    cost: ['', Validators.required],
    maxParticipants: ['', Validators.required],
    sector: ['', Validators.required],
  });
}
export function futureDateValidator(control: AbstractControl): { [key: string]: boolean } | null {
  if (!control.value) {
    return null;
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const selectedDate = new Date(control.value);

  return selectedDate > today ? null : { pastDate: true };
}


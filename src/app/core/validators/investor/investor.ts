import { FormBuilder, Validators } from "@angular/forms";

export function createInvestor(fb: FormBuilder) {
  return fb.group({
    basic: fb.group({
      organization: ['', Validators.required],
      location: ['', Validators.required],
      contactInfo: ['', [Validators.required, Validators.email]]
    }),
    investment: fb.group({
      sectors: [[], Validators.required],
      minInvestment: [null],
      maxInvestment: [null],
      investmentType: [''],
      experienceYears: [null],
      averageInvestmentsPerYear: [null],
      investmentStrategy: [''],
      preferredGeographies: [[]]
    })
  })
}

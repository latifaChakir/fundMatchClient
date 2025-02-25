import { FormBuilder, Validators } from "@angular/forms";

export function createInvestorValidator(fb: FormBuilder) {
  return fb.group({
    organization: ['', Validators.required],
    sectors: [[], Validators.required],
    minInvestment: [null, [Validators.required, Validators.min(0)]],
    maxInvestment: [null, [Validators.required, Validators.min(0)]],
    investmentType: ['', Validators.required],
    location: ['', Validators.required],
    experienceYears: [null, [Validators.required, Validators.min(0)]],
    averageInvestmentsPerYear: [null, [Validators.required, Validators.min(0)]],
    investmentStrategy: ['', Validators.required],
    preferredGeographies: [[], Validators.required],
    contactInfo: ['', [Validators.required, Validators.email]],
  });
}

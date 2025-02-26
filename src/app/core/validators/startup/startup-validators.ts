import { FormBuilder, Validators, FormGroup } from "@angular/forms";

export function createStartupValidator(fb: FormBuilder): FormGroup {
  return fb.group({
    general: fb.group({
      companyName: ['', Validators.required],
      description: ['', Validators.required],
      pitchVideoUrl: [''],
      foundedYear: ['', [Validators.required, Validators.min(1900)]],
      headquarters: ['', Validators.required],
      contactInfo: ['', Validators.required],
    }),
    financials: fb.group({
      fundingNeeded: ['', [Validators.required, Validators.min(0)]],
      revenue: ['', [Validators.required, Validators.min(0)]],
      growthRate: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      teamSize: ['', [Validators.required, Validators.min(1)]],
    }),
    sectorsAndStages: fb.group({
      sectors: [[], Validators.required],
      stages: [[], Validators.required],
    })
  });
}

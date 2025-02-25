import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, NonNullableFormBuilder} from "@angular/forms";

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.css']
})
export class StartupComponent implements OnInit{
  startupForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.startupForm = this.fb.group({
      general: this.fb.group({
        companyName: ['', Validators.required],
        description: ['', Validators.required],
        pitchVideoUrl: [''],
        foundedYear: ['', [Validators.required, Validators.min(1900)]],
        headquarters: ['', Validators.required],
      }),
      financials: this.fb.group({
        fundingNeeded: ['', [Validators.required, Validators.min(0)]],
        revenue: ['', [Validators.required, Validators.min(0)]],
        growthRate: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
        teamSize: ['', [Validators.required, Validators.min(1)]],
      }),
      sectorsAndStages: this.fb.group({
        sectors: [[], Validators.required],
        stages: [[], Validators.required],
      })
    }) as NonNullable<FormGroup>;
  }

  ngOnInit() {}

  submit() {
    if (this.startupForm.valid) {
      console.log('Form Submitted:', this.startupForm.value);
    }
  }
}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Store} from "@ngrx/store";
import {Investor} from "../../../core/models/investor/investor.model";
import {InvestorActions} from "../../../core/stores/investor/investor.actions";
import {createInvestorValidator} from "../../../core/validators/investor/investor-validators";

@Component({
  selector: 'app-add-investor',
  templateUrl: './add-investor.component.html',
  styleUrl: './add-investor.component.css'
})
export class AddInvestorComponent implements OnInit{
  @Output() closePopup = new EventEmitter<void>();
  @Output() openPopup = new EventEmitter<void>();
  @Input() initialRequestData: Investor | null = null;
  investorForm!: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) { }
  ngOnInit() {
    this.investorForm = createInvestorValidator(this.fb);
    if (this.initialRequestData) {
      this.investorForm.patchValue(this.initialRequestData);
    }
  }
  onSubmit() {
    const formValues = this.investorForm.getRawValue();
    const investor: Investor = {
      id: this.initialRequestData ? this.initialRequestData.id : undefined,
      organization: formValues.organization,
      sectors: formValues.sectors,
      minInvestment: formValues.minInvestment,
      maxInvestment: formValues.maxInvestment,
      investmentType: formValues.investmentType,
      location: formValues.location,
      experienceYears: formValues.experienceYears,
      averageInvestmentsPerYear: formValues.averageInvestmentsPerYear,
      investmentStrategy: formValues.investmentStrategy,
      preferredGeographies: formValues.preferredGeographies,
      contactInfo: formValues.contactInfo,
    };

    if (this.initialRequestData) {
      this.store.dispatch(InvestorActions.updateInvestor({ investor }));
    } else {
      this.store.dispatch(InvestorActions.addInvestor({ investor }));
    }

    this.investorForm.reset();
    this.cancel();
    this.initialRequestData = null;
  }

  cancel(): void {
    this.closePopup.emit();
  }
}

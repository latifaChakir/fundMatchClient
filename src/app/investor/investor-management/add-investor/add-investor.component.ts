import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Store} from "@ngrx/store";
import {Investor} from "../../../core/models/investor/investor.model";
import {InvestorActions} from "../../../core/stores/investor/investor.actions";
import {createInvestorValidator} from "../../../core/validators/investor/investor-validators";
import {Observable} from "rxjs";
import {Sector} from "../../../core/models/sector/sector.model";
import {selectSectors} from "../../../core/stores/sector/sector.reducer";
import {SectorActions} from "../../../core/stores/sector/sector.actions";
import {map} from "rxjs/operators";

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
  sectors$: Observable<Sector[]>;
  sectorsData$: Observable<any[]>;
  preferredGeographies: string[] = [
    "Afrique", "Amérique du Nord", "Amérique du Sud",
    "Asie", "Europe", "Océanie", "Moyen-Orient"
  ];
  constructor(private fb: FormBuilder, private store: Store) {
    this.sectors$ = this.store.select(selectSectors);
    this.sectorsData$ = this.sectors$.pipe(
      map(sectors => sectors.map(sector => ({ id: sector.id, text: sector.name })))
    );
  }
  ngOnInit() {
    this.store.dispatch(SectorActions.loadSectors());
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
      preferredGeographies: formValues.preferredGeographies,
      sectors: formValues.sectors.map((id: number) => ({ id })),
      minInvestment: formValues.minInvestment,
      maxInvestment: formValues.maxInvestment,
      investmentType: formValues.investmentType,
      location: formValues.location,
      experienceYears: formValues.experienceYears,
      averageInvestmentsPerYear: formValues.averageInvestmentsPerYear,
      investmentStrategy: formValues.investmentStrategy,
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

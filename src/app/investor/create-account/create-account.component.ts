import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Sector} from "../../core/models/sector/sector.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Store} from "@ngrx/store";
import {selectSectors} from "../../core/stores/sector/sector.reducer";
import {map} from "rxjs/operators";
import {SectorActions} from "../../core/stores/sector/sector.actions";
import {InvestorActions} from "../../core/stores/investor/investor.actions";
import {Investor} from "../../core/models/investor/investor.model";
import {createInvestor} from "../../core/validators/investor/investor";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent implements OnInit{
  sectors$: Observable<Sector[]>;
  preferredGeographies: string[] = [
    "Afrique", "Amérique du Nord", "Amérique du Sud",
    "Asie", "Europe", "Océanie", "Moyen-Orient"
  ];
  investorForm: FormGroup;
  sectorsData$: Observable<any[]>;

  constructor(private fb: FormBuilder, private store: Store) {
    this.sectors$ = this.store.select(selectSectors);
    this.investorForm = createInvestor(this.fb);
    this.sectorsData$ = this.sectors$.pipe(
      map(sectors => sectors.map(sector => ({ id: sector.id, text: sector.name })))
    );

  }

  ngOnInit() {
    this.store.dispatch(SectorActions.loadSectors());
  }


  submit() {
    if (this.investorForm.valid) {
      const formValues = this.investorForm.getRawValue();
      const investor: Investor = {
        organization: formValues.basic.organization,
        location: formValues.basic.location,
        contactInfo: formValues.basic.contactInfo,
        minInvestment: formValues.investment.minInvestment,
        maxInvestment: formValues.investment.maxInvestment,
        investmentType: formValues.investment.investmentType,
        experienceYears: formValues.investment.experienceYears,
        averageInvestmentsPerYear: formValues.investment.averageInvestmentsPerYear,
        investmentStrategy: formValues.investment.investmentStrategy,
        preferredGeographies: formValues.investment.preferredGeographies,
        sectors: formValues.investment.sectors.map((id: number) => ({ id }))
      };

      this.store.dispatch(InvestorActions.addInvestor({ investor }));
      this.investorForm.reset();
    } else {
      console.log("Formulaire invalide", this.investorForm.errors);
    }
  }
}

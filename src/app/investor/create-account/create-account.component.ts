import {Component, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import {Sector} from "../../core/models/sector/sector.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Store} from "@ngrx/store";
import {selectSectors} from "../../core/stores/sector/sector.reducer";
import {map, switchMap, take} from "rxjs/operators";
import {SectorActions} from "../../core/stores/sector/sector.actions";
import {InvestorActions} from "../../core/stores/investor/investor.actions";
import {Investor} from "../../core/models/investor/investor.model";
import {createInvestor} from "../../core/validators/investor/investor";
import {selectFilteredInvestors} from "../../core/stores/investor/investor.reducer";
import {UserService} from "../../core/services/user/user.service";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent implements OnInit{
  sectors$: Observable<Sector[]>;
  investors$: Observable<Investor[]>;
  private currentUserId!: number;
  error: string | null = null;
  success: string | null = null;
  selectedInvestor$: Observable<Investor | null> = of(null);
  preferredGeographies: string[] = [
    "Afrique", "Amérique du Nord", "Amérique du Sud",
    "Asie", "Europe", "Océanie", "Moyen-Orient"
  ];
  investorForm: FormGroup;
  sectorsData$: Observable<any[]>;
  existingInvestor: Investor | null = null;

  constructor(private fb: FormBuilder, private store: Store, private userService: UserService) {
    this.sectors$ = this.store.select(selectSectors);
    this.investors$ = this.store.select(selectFilteredInvestors);
    this.investorForm = createInvestor(this.fb);
    this.sectorsData$ = this.sectors$.pipe(
      map(sectors => sectors.map(sector => ({ id: sector.id, text: sector.name })))
    );
  }

  ngOnInit() {
    this.store.dispatch(SectorActions.loadSectors());
    this.store.dispatch(InvestorActions.loadInvestors());
    this.userService.getCurrentUser().subscribe(user => {
      this.currentUserId = user.id;

      this.selectedInvestor$ = this.investors$.pipe(
        map(investors => investors.find(investor => investor.user?.id === this.currentUserId) || null)
      );

      this.selectedInvestor$.pipe().subscribe(investor => {
        if (investor) {
          this.existingInvestor = investor;
          this.loadInvestorData(investor);
        }
      });
    });
  }
  loadInvestorData(investor: Investor) {
    this.investorForm.patchValue({
      basic: {
        organization: investor.organization,
        location: investor.location,
        contactInfo: investor.contactInfo
      },
      investment: {
        minInvestment: investor.minInvestment,
        maxInvestment: investor.maxInvestment,
        investmentType: investor.investmentType,
        experienceYears: investor.experienceYears,
        averageInvestmentsPerYear: investor.averageInvestmentsPerYear,
        investmentStrategy: investor.investmentStrategy,
        preferredGeographies: investor.preferredGeographies,
        sectors: investor.sectors?.map(sector => sector.id) || []
      }
    });
  }

  saveProfile() {
    if (this.investorForm.valid) {
      const formValues = this.investorForm.getRawValue();
      const investorData: Investor = {
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
        sectors: formValues.investment.sectors.map((id: number) => ({ id })),
      };

      if (this.existingInvestor) {
        const updatedInvestor = {
          ...this.existingInvestor,
          ...investorData,
          id: this.existingInvestor.id
        };
        this.store.dispatch(InvestorActions.updateInvestor({ investor: updatedInvestor }));
        this.success="Your Profile has been updated successfully.";
      } else {
        this.store.dispatch(InvestorActions.addInvestor({ investor: investorData }));
        this.success="Your Profile has been created successfully.";

      }
    } else {
      console.log("Formulaire invalide", this.investorForm.errors);
      this.error="Error invalide";
    }
  }

  submit() {
    this.saveProfile();
  }
}

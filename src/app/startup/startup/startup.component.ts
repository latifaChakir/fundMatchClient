import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Observable, of } from "rxjs";
import { map, take } from "rxjs/operators";
import { Stage } from "../../core/models/stage/stage.model";
import { Sector } from "../../core/models/sector/sector.model";
import { Store } from "@ngrx/store";
import { selectStages } from "../../core/stores/stage/stage.reducer";
import { selectSectors } from "../../core/stores/sector/sector.reducer";
import { createStartupValidator } from "../../core/validators/startup/startup-validators";
import { StageActions } from "../../core/stores/stage/stage.actions";
import { SectorActions } from "../../core/stores/sector/sector.actions";
import { StartupActions } from "../../core/stores/startup/startup.actions";
import { Startup } from "../../core/models/startup/startup.model";
import { selectFilteredStartups } from "../../core/stores/startup/startup.reducer";
import { UserService } from "../../core/services/user/user.service";

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.css']
})
export class StartupComponent implements OnInit {
  stages$: Observable<Stage[]>;
  sectors$: Observable<Sector[]>;
  startupForm: FormGroup;
  imageFile: File | null = null;
  sectorsData$: Observable<any[]>;
  stagesData$: Observable<any[]>;
  private currentUserId!: number;
  existingStartup: Startup | null = null;
  startups$: Observable<Startup[]>;
  selectedStartup$: Observable<Startup | null> = of(null);
  error: string | null = null;
  success: string | null = null;

  constructor(private fb: FormBuilder, private store: Store, private userService: UserService) {
    this.stages$ = this.store.select(selectStages);
    this.sectors$ = this.store.select(selectSectors);
    this.startups$ = this.store.select(selectFilteredStartups);
    this.startupForm = createStartupValidator(this.fb);
    this.sectorsData$ = this.sectors$.pipe(
      map(sectors => sectors.map(sector => ({ id: sector.id, text: sector.name })))
    );

    this.stagesData$ = this.stages$.pipe(
      map(stages => stages.map(stage => ({ id: stage.id, text: stage.name })))
    );
  }

  ngOnInit() {
    this.store.dispatch(StageActions.loadStages());
    this.store.dispatch(SectorActions.loadSectors());
    this.store.dispatch(StartupActions.loadStartups());

    this.userService.getCurrentUser().subscribe(user => {
      this.currentUserId = user.id;

      this.selectedStartup$ = this.startups$.pipe(
        map(startups => startups.find(startup => startup.user?.id === this.currentUserId) || null)
      );

      this.selectedStartup$.pipe(take(1)).subscribe(startup => {
        if (startup) {
          this.existingStartup = startup;
          this.loadInvestorData(startup);
        }
      });
    });
  }

  loadInvestorData(startup: Startup) {
    this.startupForm.patchValue({
      general: {
        companyName: startup.companyName || '',
        headquarters: startup.headquarters || '',
        pitchVideoUrl: startup.pitchVideoUrl || '',
        foundedYear: startup.foundedYear || '',
        contactInfo: startup.contactInfo || '',
        description: startup.description || ''
      },
      financials: {
        fundingNeeded: startup.fundingNeeded || '',
        revenue: startup.revenue || '',
        growthRate: startup.growthRate || '',
        teamSize: startup.teamSize || ''
      },
      sectorsAndStages: {
        sectors: startup.sectors?.map(sector => sector.id) || [],
        stages: startup.stages?.map(stage => stage.id) || []
      }
    });
  }

  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.imageFile = fileList[0];
      console.log('Fichier image sélectionné :', this.imageFile);
    }
  }

  saveProfile() {
    if (this.startupForm.valid) {
      const formValues = this.startupForm.value;
      const formData = new FormData();

      formData.append('companyName', formValues.general.companyName);
      formData.append('headquarters', formValues.general.headquarters);
      formData.append('pitchVideoUrl', formValues.general.pitchVideoUrl);
      formData.append('foundedYear', formValues.general.foundedYear);
      formData.append('contactInfo', formValues.general.contactInfo);
      formData.append('description', formValues.general.description);

      formData.append('fundingNeeded', formValues.financials.fundingNeeded);
      formData.append('revenue', formValues.financials.revenue);
      formData.append('growthRate', formValues.financials.growthRate);
      formData.append('teamSize', formValues.financials.teamSize);
      if (this.imageFile) {
        formData.append('file', this.imageFile);
      }
      const sectorIds = formValues.sectorsAndStages.sectors.map((id: number) => id).join(',');
      const stageIds = formValues.sectorsAndStages.stages.map((id: number) => id).join(',');

      formData.append('sectors', sectorIds);
      formData.append('stages', stageIds);
      if (this.existingStartup && this.existingStartup.id) {
        formData.append('id', this.existingStartup.id.toString());

        this.store.dispatch(StartupActions.updateStartup({ startup: formData }));
        this.success = "Your startup profile has been updated successfully.";
      } else {
        this.store.dispatch(StartupActions.addStartup({ startup: formData }));
        this.success = "Your startup profile has been created successfully.";
      }

    } else {
      this.markFormGroupTouched(this.startupForm);
      console.log("Formulaire invalide", this.startupForm.errors);
      this.error = "Please check the form for errors.";
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  submit() {
    this.saveProfile();
  }
}

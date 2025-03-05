import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Stage } from "../../core/models/stage/stage.model";
import { Sector } from "../../core/models/sector/sector.model";
import { Store } from "@ngrx/store";
import { selectStages } from "../../core/stores/stage/stage.reducer";
import { selectSectors } from "../../core/stores/sector/sector.reducer";
import { createStartupValidator } from "../../core/validators/startup/startup-validators";
import { StageActions } from "../../core/stores/stage/stage.actions";
import { SectorActions } from "../../core/stores/sector/sector.actions";
import { StartupActions } from "../../core/stores/startup/startup.actions";

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

  constructor(private fb: FormBuilder, private store: Store) {
    this.stages$ = this.store.select(selectStages);
    this.sectors$ = this.store.select(selectSectors);
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
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.imageFile = event.target.files[0];
      console.log('Fichier image sélectionné :', this.imageFile);
    }
  }


  submit() {
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
      } else {
        console.error('Aucun fichier image sélectionné.');
      }
      const sectorIds = formValues.sectorsAndStages.sectors.map((id: number) => id).join(',');
      const stageIds = formValues.sectorsAndStages.stages.map((id: number) => id).join(',');

      formData.append('sectors', sectorIds);
      formData.append('stages', stageIds);

      this.store.dispatch(StartupActions.addStartup({ startup: formData }));
      this.startupForm.reset();
    } else {
      console.log("Formulaire invalide", this.startupForm.errors);
    }
  }
}

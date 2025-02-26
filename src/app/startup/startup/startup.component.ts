import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable, combineLatest } from "rxjs";
import { map } from "rxjs/operators";
import { Stage } from "../../core/models/stage/stage.model";
import { Sector } from "../../core/models/sector/sector.model";
import { Store } from "@ngrx/store";
import { selectStages } from "../../core/stores/stage/stage.reducer";
import { selectSectors } from "../../core/stores/sector/sector.reducer";
import { createStartupValidator } from "../../core/validators/startup/startup-validators";
import {StageActions} from "../../core/stores/stage/stage.actions";
import {SectorActions} from "../../core/stores/sector/sector.actions";

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.css']
})
export class StartupComponent implements OnInit {
  stages$: Observable<Stage[]>;
  sectors$: Observable<Sector[]>;
  startupForm: FormGroup;

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

  submit() {
    if (this.startupForm.valid) {
      console.log('Form Submitted:', this.startupForm.value);
    }
  }
}

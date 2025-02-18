import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import { of } from 'rxjs';
import {StageService} from "../../services/stage/stage.service";
import {StageActions} from "./stage.actions";

@Injectable()
export class StageEffects {
  constructor(private actions$: Actions, private stageService: StageService) {}

  loadStages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StageActions.loadStages),
      mergeMap(() =>
        this.stageService.getStages().pipe(
          map((stages) => StageActions.loadStagesSuccess({ stages })),
          catchError((error) => of(StageActions.loadStagesFailure({ error: error.message })))
        )
      )
    )
  );

  getStageById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StageActions.getStageById),
      mergeMap((action) =>
        this.stageService.getStageById(action.id).pipe(
          map((stage) => {
            return StageActions.getStageByIdSuccess({ stage });
          }),
          catchError((error) => {
            return of(StageActions.getStageByIdFailure({ error: error.message }));
          })
        )
      )
    )
  );

  addStage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StageActions.addStage),
      mergeMap((action) =>
        this.stageService.saveStage(action.stage).pipe(
          map((stage) => StageActions.addStageSuccess({ stage })), // Utiliser le secteur extrait
          catchError((error) => of(StageActions.addStageFailure({ error: error.message })))
        )
      )
    )
  );


  updateStage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StageActions.updateStage),
      mergeMap((action) => {
        const stageId = action.stage.id;
        if (!stageId) {
          console.error("Stage ID is not valid:", action.stage);
          return of(StageActions.updateStageFailure({ error: "Invalid Stage ID" }));
        }

        return this.stageService.updateStage(action.stage, stageId).pipe(
          map((stage) => StageActions.updateStageSuccess({ stage })),
          catchError((error) => of(StageActions.updateStageFailure({ error: error.message })))
        );
      })
    )
  );

  deleteStage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StageActions.deleteStage),
      mergeMap((action) =>
        this.stageService.deleteStage(action.id).pipe(
          map(() => StageActions.deleteStageSuccess({ id: action.id })),
          catchError((error) => of(StageActions.deleteStageFailure({ error: error.message })))
        )
      )
    )
  );
}

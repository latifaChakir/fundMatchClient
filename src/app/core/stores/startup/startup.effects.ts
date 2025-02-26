import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import { of } from 'rxjs';
import {StartupActions} from "./startup.actions";
import {StartupService} from "../../services/startup/startup.service";

@Injectable()
export class StartupEffects {
  constructor(private actions$: Actions, private startupService: StartupService) {}

  loadStartups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StartupActions.loadStartups),
      mergeMap(() =>
        this.startupService.getStartups().pipe(
          map((startups) => StartupActions.loadStartupsSuccess({ startups })),
          catchError((error) => of(StartupActions.loadStartupsFailure({ error: error.message })))
        )
      )
    )
  );

  getStartupById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StartupActions.getStartupById),
      mergeMap((action) =>
        this.startupService.getStartupById(action.id).pipe(
          map((startup) => {
            return StartupActions.getStartupByIdSuccess({ startup });
          }),
          catchError((error) => {
            return of(StartupActions.getStartupByIdFailure({ error: error.message }));
          })
        )
      )
    )
  );

  addStartup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StartupActions.addStartup),
      mergeMap((action) =>
        this.startupService.saveStartup(action.startup).pipe(
          map((startup) => StartupActions.addStartupSuccess({ startup })),
          catchError((error) => of(StartupActions.addStartupFailure({ error: error.message })))
        )
      )
    )
  );


  updateStartup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StartupActions.updateStartup),
      mergeMap((action) => {
        const startupId = action.startup.id;
        if (!startupId) {
          console.error("Startup ID is not valid:", action.startup);
          return of(StartupActions.updateStartupFailure({ error: "Invalid Startup ID" }));
        }

        return this.startupService.updateStartup(action.startup, startupId).pipe(
          map((startup) => StartupActions.updateStartupSuccess({ startup })),
          catchError((error) => of(StartupActions.updateStartupFailure({ error: error.message })))
        );
      })
    )
  );

  deleteStartup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StartupActions.deleteStartup),
      mergeMap((action) =>
        this.startupService.deleteStartup(action.id).pipe(
          map(() => StartupActions.deleteStartupSuccess({ id: action.id })),
          catchError((error) => of(StartupActions.deleteStartupFailure({ error: error.message })))
        )
      )
    )
  );
}

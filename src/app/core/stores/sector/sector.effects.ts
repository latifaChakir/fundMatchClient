import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import { of } from 'rxjs';
import { SectorActions } from './sector.actions';
import {SectorService} from "../../services/sector/sector.service";

@Injectable()
export class SectorEffects {
  constructor(private actions$: Actions, private sectorService: SectorService) {}

  loadSectors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SectorActions.loadSectors),
      mergeMap(() =>
        this.sectorService.getSectors().pipe(
          map((sectors) => SectorActions.loadSectorsSuccess({ sectors })),
          catchError((error) => of(SectorActions.loadSectorsFailure({ error: error.message })))
        )
      )
    )
  );

  getSectorById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SectorActions.getSectorById),
      mergeMap((action) =>
        this.sectorService.getSectorById(action.id).pipe(
          map((sector) => {
            return SectorActions.getSectorByIdSuccess({ sector });
          }),
          catchError((error) => {
            return of(SectorActions.getSectorByIdFailure({ error: error.message }));
          })
        )
      )
    )
  );

  addSector$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SectorActions.addSector),
      mergeMap((action) =>
        this.sectorService.saveSector(action.sector).pipe(
          map((sector) => SectorActions.addSectorSuccess({ sector })), // Utiliser le secteur extrait
          catchError((error) => of(SectorActions.addSectorFailure({ error: error.message })))
        )
      )
    )
  );


  updateSector$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SectorActions.updateSector),
      mergeMap((action) => {
        const sectorId = action.sector.id;
        if (!sectorId) {
          console.error("Sector ID is not valid:", action.sector);
          return of(SectorActions.updateSectorFailure({ error: "Invalid sector ID" }));
        }

        return this.sectorService.updateSector(action.sector, sectorId).pipe(
          map((sector) => SectorActions.updateSectorSuccess({ sector })),
          catchError((error) => of(SectorActions.updateSectorFailure({ error: error.message })))
        );
      })
    )
  );

  deleteSector$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SectorActions.deleteSector),
      mergeMap((action) =>
        this.sectorService.deleteSector(action.id).pipe(
          map(() => SectorActions.deleteSectorSuccess({ id: action.id })),
          catchError((error) => of(SectorActions.deleteSectorFailure({ error: error.message })))
        )
      )
    )
  );
}

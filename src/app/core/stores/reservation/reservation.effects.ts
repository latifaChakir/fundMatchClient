import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import { of } from 'rxjs';
import {ReservationService} from "../../services/reservation/reservation.service";
import {Reservation} from "../../models/reservation/reservation.model";
import {ReservationActions} from "../reservation/reservation.actions";

@Injectable()
export class ReservationEffects {
  constructor(private actions$: Actions, private reservationService: ReservationService) {}

  loadReservations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReservationActions.loadReservations),
      mergeMap(() =>
        this.reservationService.getReservations().pipe(
          map((reservations) => ReservationActions.loadReservationsSuccess({ reservations })),
          catchError((error) => of(ReservationActions.loadReservationsFailure({ error: error.message })))
        )
      )
    )
  );

  getReservationById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReservationActions.getReservationById),
      mergeMap((action) =>
        this.reservationService.getReservationById(action.id).pipe(
          map((reservation) => {
            return ReservationActions.getReservationByIdSuccess({ reservation });
          }),
          catchError((error) => {
            return of(ReservationActions.getReservationByIdFailure({ error: error.message }));
          })
        )
      )
    )
  );

  addReservation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReservationActions.addReservation),
      mergeMap((action) =>
        this.reservationService.saveReservation(action.reservation).pipe(
          map((reservation) => ReservationActions.addReservationSuccess({ reservation })),
          catchError((error) => of(ReservationActions.addReservationFailure({ error: error.message })))
        )
      )
    )
  );


  updateReservation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReservationActions.updateReservation),
      mergeMap((action) => {
        const reservationId = action.reservation.id;
        if (!reservationId) {
          console.error("Reservation ID is not valid:", action.reservation);
          return of(ReservationActions.updateReservationFailure({ error: "Invalid Reservation ID" }));
        }

        return this.reservationService.updateReservation(action.reservation, reservationId).pipe(
          map((reservation) => ReservationActions.updateReservationSuccess({ reservation })),
          catchError((error) => of(ReservationActions.updateReservationFailure({ error: error.message })))
        );
      })
    )
  );

  deleteReservation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReservationActions.deleteReservation),
      mergeMap((action) =>
        this.reservationService.deleteReservation(action.id).pipe(
          map(() => ReservationActions.deleteReservationSuccess({ id: action.id })),
          catchError((error) => of(ReservationActions.deleteReservationFailure({ error: error.message })))
        )
      )
    )
  );

  updateReservationStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReservationActions.updateReservationStatus),
      mergeMap((action) =>
        this.reservationService.updateReservationStatus(action.reservationId).pipe(
          map((reservation: Reservation) => {
            if (reservation) {
              return ReservationActions.updateReservationStatusSuccess({ reservation });
            } else {
              return ReservationActions.updateReservationStatusFailure({ error: 'Status update failed' });
            }
          }),
          catchError((error) => of(ReservationActions.updateReservationStatusFailure({ error: error.message })))
        )
      )
    )
  );




}

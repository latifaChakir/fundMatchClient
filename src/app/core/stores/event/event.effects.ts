import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import { of } from 'rxjs';
import {EventActions} from "./event.actions";
import {EventService} from "../../services/event/event.service";
import {Event} from "../../models/event/event.model";

@Injectable()
export class EventEffects {
  constructor(private actions$: Actions, private eventService: EventService) {}

  loadEvents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventActions.loadEvents),
      mergeMap(() =>
        this.eventService.getEvents().pipe(
          map((events) => EventActions.loadEventsSuccess({ events })),
          catchError((error) => of(EventActions.loadEventsFailure({ error: error.message })))
        )
      )
    )
  );

  getEventById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventActions.getEventById),
      mergeMap((action) =>
        this.eventService.getEventById(action.id).pipe(
          map((event) => {
            return EventActions.getEventByIdSuccess({ event });
          }),
          catchError((error) => {
            return of(EventActions.getEventByIdFailure({ error: error.message }));
          })
        )
      )
    )
  );

  addEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventActions.addEvent),
      mergeMap((action) =>
        this.eventService.saveEvent(action.event).pipe(
          map((event) => EventActions.addEventSuccess({ event })),
          catchError((error) => of(EventActions.addEventFailure({ error: error.message })))
        )
      )
    )
  );


  updateEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventActions.updateEvent),
      mergeMap((action) => {
        const eventId = action.event.id;
        if (!eventId) {
          console.error("Event ID is not valid:", action.event);
          return of(EventActions.updateEventFailure({ error: "Invalid Event ID" }));
        }

        return this.eventService.updateEvent(action.event, eventId).pipe(
          map((event) => EventActions.updateEventSuccess({ event })),
          catchError((error) => of(EventActions.updateEventFailure({ error: error.message })))
        );
      })
    )
  );

  deleteEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventActions.deleteEvent),
      mergeMap((action) =>
        this.eventService.deleteEvent(action.id).pipe(
          map(() => EventActions.deleteEventSuccess({ id: action.id })),
          catchError((error) => of(EventActions.deleteEventFailure({ error: error.message })))
        )
      )
    )
  );

  updateEventStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventActions.updateEventStatus),
      mergeMap((action) =>
        this.eventService.updateEventStatus(action.eventId).pipe(
          map((event: Event) => {
            if (event) {
              return EventActions.updateEventStatusSuccess({ event });
            } else {
              return EventActions.updateEventStatusFailure({ error: 'Status update failed' });
            }
          }),
          catchError((error) => of(EventActions.updateEventStatusFailure({ error: error.message })))
        )
      )
    )
  );

}

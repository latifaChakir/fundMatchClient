import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {Reservation} from "../../models/reservation/reservation.model";


export const ReservationActions = createActionGroup({
  source: 'Reservation/API',
  events: {
    'Load Reservations':  emptyProps(),
    'Load Reservations Success': props<{ reservations: Reservation[] }>(),
    'Load Reservations Failure': props<{ error: string }>(),

    'Add Reservation': props<{ reservation: Reservation }>(),
    'Add Reservation Success': props<{ reservation: Reservation }>(),
    'Add Reservation Failure': props<{ error: string }>(),

    'Get Reservation By Id ': props<{id: number}>(),
    'Get Reservation By Id Success': props<{ reservation: Reservation }>(),
    'Get Reservation By Id Failure': props<{ error: string }>(),

    'Update Reservation': props<{ reservation: Reservation }>(),
    'Update Reservation Success': props<{ reservation: Reservation }>(),
    'Update Reservation Failure': props<{ error: string }>(),

    'Delete Reservation': props<{ id: number }>(),
    'Delete Reservation Success': props<{ id: number }>(),
    'Delete Reservation Failure': props<{ error: string }>(),

    'Filter Reservations': props<{ searchTerm: string }>(),

    'Update Reservation Status': props<{ reservationId: number }>(),
    'Update Reservation Status Success':props<{ reservation: Reservation }>(),
    'Update Reservation Status Failure': props<{ error: string }>(),
  }
});

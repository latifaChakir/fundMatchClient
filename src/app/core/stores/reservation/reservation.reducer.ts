import { createFeature, createReducer, on } from '@ngrx/store';
import {Reservation} from "../../models/reservation/reservation.model";
import {ReservationActions} from "../reservation/reservation.actions";

export interface ReservationState {
  reservations: Reservation[];
  filteredReservations: Reservation[];
  searchTerm: string;
  error: string | null;
}

const initialState: ReservationState = {
  reservations: [],
  filteredReservations: [],
  searchTerm: '',
  error: null,
};

export const ReservationsFeature = createFeature({
  name: 'ReservationsFeatureKey',
  reducer: createReducer(
    initialState,

    on(ReservationActions.loadReservations, (state) => ({
      ...state,
      error: null
    })),
    on(ReservationActions.loadReservationsSuccess, (state, { reservations }) => ({
      ...state,
      filteredReservations: reservations,
      reservations
    })),
    on(ReservationActions.loadReservationsFailure, (state, { error }) => ({
      ...state,
      error
    })),

    on(ReservationActions.addReservation, (state) => ({
      ...state,
      error: null
    })),
    on(ReservationActions.addReservationSuccess, (state, { reservation }) => ({
      ...state,
      reservations: [...state.reservations, reservation],
      filteredReservations: [...state.filteredReservations, reservation],
      error: null
    })),

    on(ReservationActions.addReservationFailure, (state, { error }) => ({
      ...state,
      error
    })),

    on(ReservationActions.getReservationById, (state) => ({
      ...state,
      error: null
    })),
    on(ReservationActions.getReservationByIdSuccess, (state, { reservation }) => ({
      ...state,
      reservations: state.reservations.map(s => s.id === reservation.id ? reservation : s),
      error: null
    })),
    on(ReservationActions.getReservationByIdFailure, (state, { error }) => ({
      ...state,
      error
    })),

    on(ReservationActions.updateReservation, (state) => ({
      ...state,
      error: null
    })),
    on(ReservationActions.updateReservationSuccess, (state, { reservation }) => ({
      ...state,
      reservations: state.reservations.map(s => s.id === reservation.id ? reservation : s),
      filteredReservations: state.filteredReservations.map(s => s.id === reservation.id ? reservation : s),
      error: null
    })),
    on(ReservationActions.updateReservationFailure, (state, { error }) => ({
      ...state,
      error
    })),

    on(ReservationActions.deleteReservation, (state) => ({
      ...state,
      error: null
    })),
    on(ReservationActions.deleteReservationSuccess, (state, { id }) => ({
      ...state,
      reservations: state.reservations.filter(s => s.id !== id),
      filteredReservations: state.filteredReservations.filter(s => s.id !== id),
      error: null
    })),
    on(ReservationActions.deleteReservationFailure, (state, { error }) => ({
      ...state,
      error
    })),
    on(ReservationActions.filterReservations, (state, { searchTerm }) => ({
      ...state,
      searchTerm,
      filteredReservations: state.reservations.filter(reservation =>
        reservation.status.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    })),
    on(ReservationActions.updateReservationStatus, (state) => ({
      ...state,
      error: null
    })),
    on(ReservationActions.updateReservationStatusSuccess, (state, { reservation }) => ({
      ...state,
      reservations: state.reservations.map(p =>
        p.id === reservation.id ? { ...p, status: reservation.status } : p
      ),
      filteredReservations: state.filteredReservations.map(p =>
        p.id === reservation.id ? { ...p, status: reservation.status } : p
      ),
      error: null
    })),
    on(ReservationActions.updateReservationStatusFailure, (state, { error }) => ({
      ...state,
      error
    })),

  )
});

export const { name: reservationsFeatureKey, reducer: reservationReducer, selectReservations , selectFilteredReservations} = ReservationsFeature;

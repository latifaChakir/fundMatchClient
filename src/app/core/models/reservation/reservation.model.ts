import {Event} from "../event/event.model";
export enum ReservationStatus{
  CONFIRMED = "CONFIRMED",
  CANCELED = "CANCELED",
  ATTEMPTED = "ATTEMPTED",
}
export interface Reservation {
  id?: number;
  event: Event;
  reservationDate : String;
  status : ReservationStatus;
}

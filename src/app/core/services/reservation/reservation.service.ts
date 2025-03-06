import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Reservation} from "../../models/reservation/reservation.model";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private api = `${environment.apiUrl}/reservations`;

  constructor(private http: HttpClient) { }
  saveReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<{ data:Reservation }>(`${this.api}/save`, reservation).pipe(
      map(response => response.data)
    );
  }
  getReservations(): Observable<Reservation[]> {
    return this.http.get<{ data: Reservation[] }>(`${this.api}/all`).pipe(
      map(response => response.data)
    );
  }
  deleteReservation(reservationId: number) {
    return this.http.delete(`${this.api}/${reservationId}`);
  }

  updateReservation(reservation: Reservation, reservationId: number): Observable<Reservation> {
    return this.http.put<{ data: Reservation }>(`${this.api}/${reservationId}`, reservation).pipe(
      map(response => response.data)
    );
  }
  getReservationById(reservationId: number): Observable<Reservation> {
    return this.http.get<{ data: Reservation }>(`${this.api}/${reservationId}`).pipe(
      map(response => response.data)
    );
  }
  updateReservationStatus(reservationId: number): Observable<Reservation>{
    return this.http.get<{ data: Reservation }>(`${this.api}/updateStatus/${reservationId}`, {}).pipe(
      map(response => response.data)
    );
  }
}

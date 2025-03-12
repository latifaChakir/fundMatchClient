import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Event} from "../../models/event/event.model";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private api = `${environment.apiUrl}/events`;

  constructor(private http: HttpClient) { }
  saveEvent(event: FormData): Observable<Event> {
    return this.http.post<{ data:Event }>(`${this.api}/save`, event).pipe(
      map(response => response.data)
    );
  }
  getEvents(): Observable<Event[]> {
    return this.http.get<{ data: Event[] }>(`${this.api}/all`).pipe(
      map(response => response.data)
    );
  }
  deleteEvent(eventId: number) {
    return this.http.delete(`${this.api}/${eventId}`);
  }

  updateEvent(event: Event, eventId: number): Observable<Event> {
    return this.http.put<{ data: Event }>(`${this.api}/${eventId}`, event).pipe(
      map(response => response.data)
    );
  }
  getEventById(eventId: number): Observable<Event> {
    return this.http.get<{ data: Event }>(`${this.api}/${eventId}`).pipe(
      map(response => response.data)
    );
  }

  updateEventStatus(eventId: number): Observable<Event>{
    return this.http.get<{ data: Event }>(`${this.api}/updateStatus/${eventId}`, {}).pipe(
      map(response => response.data)
    );
  }
}

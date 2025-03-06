import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { Event } from '../../../core/models/event/event.model';
import { selectEvents } from "../../../core/stores/event/event.reducer";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  selectedEvent: Event | null = null;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const eventId = Number(params.get('id'));
      if (!isNaN(eventId)) {
        this.loadEvent(eventId);
      }
    });
  }

  loadEvent(eventId: number): void {
    this.store.select(selectEvents).pipe(take(1)).subscribe(events => {
      this.selectedEvent = events.find(ev => ev.id === eventId) || null;
    });
  }
}

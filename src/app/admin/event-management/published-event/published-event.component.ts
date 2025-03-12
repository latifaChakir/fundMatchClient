import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Event} from "../../../core/models/event/event.model";
import {Store} from "@ngrx/store";
import {selectFilteredEvents} from "../../../core/stores/event/event.reducer";
import {EventActions} from "../../../core/stores/event/event.actions";

@Component({
  selector: 'app-published-event',
  templateUrl: './published-event.component.html',
  styleUrl: './published-event.component.css'
})
export class PublishedEventComponent implements OnInit{
  p: number = 1;
  events$: Observable<Event[]>;
  constructor(private store: Store) {
    this.events$ = this.store.select(selectFilteredEvents);
  }
  ngOnInit() {
    this.store.dispatch(EventActions.loadEvents());
  }
  onSearchChange(event: any) {
    console.log(event.target.value);
    const value = event.target.value;
    this.store.dispatch(EventActions.filterEvents({ searchTerm: value }));
  }
  updateStatus(eventId: number) {
    this.store.dispatch(EventActions.updateEventStatus({ eventId }));
  }
}

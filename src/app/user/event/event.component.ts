import {Component, OnInit} from '@angular/core';
import {map, Observable} from "rxjs";
import {Sector} from "../../core/models/sector/sector.model";
import {Store} from "@ngrx/store";
import {selectSectors} from "../../core/stores/sector/sector.reducer";
import {SectorActions} from "../../core/stores/sector/sector.actions";
import {Event, EventType} from "../../core/models/event/event.model";
import {selectFilteredEvents} from "../../core/stores/event/event.reducer";
import {EventActions} from "../../core/stores/event/event.actions";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})
export class EventComponent implements OnInit{
  sectors$: Observable<Sector[]>;
  events$: Observable<Event[]>;
  eventTypes = Object.values(EventType);
  p: number = 1;

  constructor(private store: Store) {
    this.sectors$ = this.store.select(selectSectors);
    this.events$ = this.store.select(selectFilteredEvents).pipe(
      map(events => events.filter(event => event.isPublished))
    );
  }

  ngOnInit() {
    this.store.dispatch(SectorActions.loadSectors());
    this.store.dispatch(EventActions.loadEvents());
  }
  onSearchChange(event: any) {
    console.log(event.target.value);
    const value = event.target.value;
    this.store.dispatch(EventActions.filterEvents({ searchTerm: value }));
  }
}

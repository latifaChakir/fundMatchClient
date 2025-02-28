import {Component, OnInit} from '@angular/core';
import {Observable, take} from "rxjs";
import {Event} from "../../../core/models/event/event.model";
import {Store} from "@ngrx/store";
import {selectEvents, selectFilteredEvents} from "../../../core/stores/event/event.reducer";
import {EventActions} from "../../../core/stores/event/event.actions";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})
export class EventComponent implements OnInit{
  p: number = 1;
  showModal = false;
 events$: Observable<Event[]>;
  selectedEvent: Event | null = null;
  visible: boolean = false;
  eventIdToDelete: number | null = null;
  constructor(private store: Store) {
    this.events$ = this.store.select(selectFilteredEvents);
  }
  ngOnInit() {
    this.store.dispatch(EventActions.loadEvents());
  }
  closePopup(): void {
    this.showModal = false;
    this.selectedEvent = null;
  }
  openPopup() : void{
    this.showModal = true;
  }
  editEvent(eventId: number): void {
    this.store.dispatch(EventActions.getEventById({ id: eventId }));
    this.store.select(selectEvents).pipe(
      take(1)
    ).subscribe(events => {
      const eventToEdit = events.find(event => event.id === eventId);
      if (eventToEdit) {
        this.selectedEvent = eventToEdit;
        this.openPopup();
      }
    });
  }

  showDeleteConfirmation(id: number) {
    this.eventIdToDelete = id;
    this.visible = true;
  }

  confirmDeleteEvent() {
    if (this.eventIdToDelete !== null) {
      this.store.dispatch(EventActions.deleteEvent({ id: this.eventIdToDelete }));
    }
    this.visible = false;
  }

  onSearchChange(event: any) {
    console.log(event.target.value);
    const value = event.target.value;
    this.store.dispatch(EventActions.filterEvents({ searchTerm: value }));
  }

}

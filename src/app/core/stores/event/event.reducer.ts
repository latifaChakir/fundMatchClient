import { createFeature, createReducer, on } from '@ngrx/store';
import { EventActions } from './event.actions';
import {Event} from "../../models/event/event.model";

export interface EventState {
  events: Event[];
  filteredEvents: Event[];
  searchTerm: string;
  error: string | null;
}

const initialState: EventState = {
  events: [],
  filteredEvents: [],
  searchTerm: '',
  error: null,
};

export const EventsFeature = createFeature({
  name: 'EventsFeatureKey',
  reducer: createReducer(
    initialState,

    on(EventActions.loadEvents, (state) => ({
      ...state,
      error: null
    })),
    on(EventActions.loadEventsSuccess, (state, { events }) => ({
      ...state,
      filteredEvents: events,
      events
    })),
    on(EventActions.loadEventsFailure, (state, { error }) => ({
      ...state,
      error
    })),

    on(EventActions.addEvent, (state) => ({
      ...state,
      error: null
    })),
    on(EventActions.addEventSuccess, (state, { event }) => ({
      ...state,
      events: [...state.events, event],
      filteredEvents: [...state.filteredEvents, event],
      error: null
    })),

    on(EventActions.addEventFailure, (state, { error }) => ({
      ...state,
      error
    })),

    on(EventActions.getEventById, (state) => ({
      ...state,
      error: null
    })),
    on(EventActions.getEventByIdSuccess, (state, { event }) => ({
      ...state,
      events: state.events.map(s => s.id === event.id ? event : s),
      error: null
    })),
    on(EventActions.getEventByIdFailure, (state, { error }) => ({
      ...state,
      error
    })),

    on(EventActions.updateEvent, (state) => ({
      ...state,
      error: null
    })),
    on(EventActions.updateEventSuccess, (state, { event }) => ({
      ...state,
      events: state.events.map(s => s.id === event.id ? event : s),
      filteredEvents: state.filteredEvents.map(s => s.id === event.id ? event : s),
      error: null
    })),
  on(EventActions.updateEventFailure, (state, { error }) => ({
      ...state,
      error
    })),

    on(EventActions.deleteEvent, (state) => ({
      ...state,
      error: null
    })),
    on(EventActions.deleteEventSuccess, (state, { id }) => ({
      ...state,
      events: state.events.filter(s => s.id !== id),
      filteredEvents: state.filteredEvents.filter(s => s.id !== id),
      error: null
    })),
    on(EventActions.deleteEventFailure, (state, { error }) => ({
      ...state,
      error
    })),
    on(EventActions.filterEvents, (state, { searchTerm }) => ({
      ...state,
      searchTerm,
      filteredEvents: state.events.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    })),
  )
});

export const { name: eventsFeatureKey, reducer: eventReducer, selectEvents , selectFilteredEvents} = EventsFeature;

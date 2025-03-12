import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {Event} from "../../models/event/event.model";


export const EventActions = createActionGroup({
  source: 'Event/API',
  events: {
    'Load Events':  emptyProps(),
    'Load Events Success': props<{ events: Event[] }>(),
    'Load Events Failure': props<{ error: string }>(),

    'Add Event': props<{ event:any  }>(),
    'Add Event Success': props<{ event: Event }>(),
    'Add Event Failure': props<{ error: string }>(),

    'Get Event By Id ': props<{id: number}>(),
    'Get Event By Id Success': props<{ event: Event }>(),
    'Get Event By Id Failure': props<{ error: string }>(),

    'Update Event': props<{ event: any }>(),
    'Update Event Success': props<{ event: Event }>(),
    'Update Event Failure': props<{ error: string }>(),

    'Delete Event': props<{ id: number }>(),
    'Delete Event Success': props<{ id: number }>(),
    'Delete Event Failure': props<{ error: string }>(),

    'Filter Events': props<{ searchTerm: string }>(),

    'Update Event Status': props<{ eventId: number }>(),
    'Update Event Status Success':props<{ event: Event }>(),
    'Update Event Status Failure': props<{ error: string }>(),
  }
});

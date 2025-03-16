import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {Startup} from "../../models/startup/startup.model";


export const StartupActions = createActionGroup({
  source: 'Startup/API',
  events: {
    'Load Startups':  emptyProps(),
    'Load Startups Success': props<{ startups: Startup[] }>(),
    'Load Startups Failure': props<{ error: string }>(),

    'Add Startup': props<{ startup: any }>(),
    'Add Startup Success': props<{ startup: Startup }>(),
    'Add Startup Failure': props<{ error: string }>(),

    'Get Startup By Id ': props<{id: number}>(),
    'Get Startup By Id Success': props<{ startup: Startup }>(),
    'Get Startup By Id Failure': props<{ error: string }>(),

    'Update Startup': props<{ startup: any }>(),
    'Update Startup Success': props<{ startup: Startup }>(),
    'Update Startup Failure': props<{ error: string }>(),

    'Delete Startup': props<{ id: number }>(),
    'Delete Startup Success': props<{ id: number }>(),
    'Delete Startup Failure': props<{ error: string }>(),

    'Filter Startups': props<{ searchTerm: string }>(),
  }
});

import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Sector } from '../../models/sector/sector.model';

export const SectorActions = createActionGroup({
  source: 'Sector/API',
  events: {
    'Load Sectors':  emptyProps(),
    'Load Sectors Success': props<{ sectors: Sector[] }>(),
    'Load Sectors Failure': props<{ error: string }>(),

    'Add Sector': props<{ sector: Sector }>(),
    'Add Sector Success': props<{ sector: Sector }>(),
    'Add Sector Failure': props<{ error: string }>(),

    'Get Sector By Id ': props<{id: number}>(),
    'Get Sector By Id Success': props<{ sector: Sector }>(),
    'Get Sector By Id Failure': props<{ error: string }>(),

    'Update Sector': props<{ sector: Sector }>(),
    'Update Sector Success': props<{ sector: Sector }>(),
    'Update Sector Failure': props<{ error: string }>(),

    'Delete Sector': props<{ id: number }>(),
    'Delete Sector Success': props<{ id: number }>(),
    'Delete Sector Failure': props<{ error: string }>(),
  }
});

import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {Stage} from "../../models/stage/stage.model";


export const StageActions = createActionGroup({
  source: 'stage/API',
  events: {
    'Load Stages':  emptyProps(),
    'Load Stages Success': props<{ stages: Stage[] }>(),
    'Load Stages Failure': props<{ error: string }>(),

    'Add Stage': props<{ stage: Stage }>(),
    'Add Stage Success': props<{ stage: Stage }>(),
    'Add Stage Failure': props<{ error: string }>(),

    'Get Stage By Id ': props<{id: number}>(),
    'Get Stage By Id Success': props<{ stage: Stage }>(),
    'Get Stage By Id Failure': props<{ error: string }>(),

    'Update Stage': props<{ stage: Stage }>(),
    'Update Stage Success': props<{ stage: Stage }>(),
    'Update Stage Failure': props<{ error: string }>(),

    'Delete Stage': props<{ id: number }>(),
    'Delete Stage Success': props<{ id: number }>(),
    'Delete Stage Failure': props<{ error: string }>(),

    'Filter Stages': props<{ searchTerm: string }>(),
  }
});

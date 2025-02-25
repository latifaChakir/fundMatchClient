import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {Investor} from "../../models/investor/investor.model";


export const InvestorActions = createActionGroup({
  source: 'Investor/API',
  events: {
    'Load Investors':  emptyProps(),
    'Load Investors Success': props<{ investors: Investor[] }>(),
    'Load Investors Failure': props<{ error: string }>(),

    'Add Investor': props<{ investor: Investor }>(),
    'Add Investor Success': props<{ investor: Investor }>(),
    'Add Investor Failure': props<{ error: string }>(),

    'Get Investor By Id ': props<{id: number}>(),
    'Get Investor By Id Success': props<{ investor: Investor }>(),
    'Get Investor By Id Failure': props<{ error: string }>(),

    'Update Investor': props<{ investor: Investor }>(),
    'Update Investor Success': props<{ investor: Investor }>(),
    'Update Investor Failure': props<{ error: string }>(),

    'Delete Investor': props<{ id: number }>(),
    'Delete Investor Success': props<{ id: number }>(),
    'Delete Investor Failure': props<{ error: string }>(),

    'Filter Investors': props<{ searchTerm: string }>(),

  }
});

import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {User} from "../../models/user/user.model";


export const UserActions = createActionGroup({
  source: 'User/API',
  events: {
    'Load Users':  emptyProps(),
    'Load Users Success': props<{ users: User[] }>(),
    'Load Users Failure': props<{ error: string }>(),

    'Filter Users': props<{ searchTerm: string }>(),
  }
});

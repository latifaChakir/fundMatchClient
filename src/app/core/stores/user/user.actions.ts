import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {User} from "../../models/user/user.model";

export const UserActions = createActionGroup({
  source: 'User/API',
  events: {
    'Load Users':  emptyProps(),
    'Load Users Success': props<{ users: User[] }>(),
    'Load Users Failure': props<{ error: string }>(),

    'Filter Users': props<{ searchTerm: string }>(),

    'Update User Status': props<{ userId: number }>(),
    'Update User Status Success':props<{ user: User }>(),
    'Update User Status Failure': props<{ error: string }>(),

    'UnBlock User ': props<{ userId: number }>(),
    'UnBlock User  Success':props<{ user: User }>(),
    'UnBlock User  Failure': props<{ error: string }>(),
  }
});

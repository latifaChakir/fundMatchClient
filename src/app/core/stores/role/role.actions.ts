import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {Role} from "../../models/auth/Register-request.model";


export const RoleActions = createActionGroup({
  source: 'Role/API',
  events: {
    'Load Roles':  emptyProps(),
    'Load Roles Success': props<{ roles: Role[] }>(),
    'Load Roles Failure': props<{ error: string }>(),

    'Add Role': props<{ role: Role }>(),
    'Add Role Success': props<{ role: Role }>(),
    'Add Role Failure': props<{ error: string }>(),

    'Get Role By Id ': props<{id: number}>(),
    'Get Role By Id Success': props<{ role: Role }>(),
    'Get Role By Id Failure': props<{ error: string }>(),

    'Update Role': props<{ role: Role }>(),
    'Update Role Success': props<{ role: Role }>(),
    'Update Role Failure': props<{ error: string }>(),

    'Delete Role': props<{ id: number }>(),
    'Delete Role Success': props<{ id: number }>(),
    'Delete Role Failure': props<{ error: string }>(),

    'Filter Roles': props<{ searchTerm: string }>(),
  }
});

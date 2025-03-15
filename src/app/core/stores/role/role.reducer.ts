import { createFeature, createReducer, on } from '@ngrx/store';
import { RoleActions } from './role.actions';
import {Role} from "../../models/auth/Register-request.model";

export interface RoleState {
  roles: Role[];
  filteredRoles: Role[];
  searchTerm: string;
  error: string | null;
}

const initialState: RoleState = {
  roles: [],
  filteredRoles: [],
  searchTerm: '',
  error: null,
};

export const RolesFeature = createFeature({
  name: 'RolesFeatureKey',
  reducer: createReducer(
    initialState,

    on(RoleActions.loadRoles, (state) => ({
      ...state,
      error: null
    })),
    on(RoleActions.loadRolesSuccess, (state, { roles }) => ({
      ...state,
      filteredRoles: roles,
      roles
    })),
    on(RoleActions.loadRolesFailure, (state, { error }) => ({
      ...state,
      error
    })),

    on(RoleActions.addRole, (state) => ({
      ...state,
      error: null
    })),
    on(RoleActions.addRoleSuccess, (state, { role }) => ({
      ...state,
      roles: [...state.roles, role],
      filteredRoles: [...state.filteredRoles, role],
      error: null
    })),

    on(RoleActions.addRoleFailure, (state, { error }) => ({
      ...state,
      error
    })),

    on(RoleActions.getRoleById, (state) => ({
      ...state,
      error: null
    })),
    on(RoleActions.getRoleByIdSuccess, (state, { role }) => ({
      ...state,
      roles: state.roles.map(s => s.id === role.id ? role : s),
      error: null
    })),
    on(RoleActions.getRoleByIdFailure, (state, { error }) => ({
      ...state,
      error
    })),

    on(RoleActions.updateRole, (state) => ({
      ...state,
      error: null
    })),
    on(RoleActions.updateRoleSuccess, (state, { role }) => ({
      ...state,
      roles: state.roles.map(r => r.id === role.id ? role : r),
      filteredRoles: state.filteredRoles.map(r => r.id === role.id ? role : r),
      error: null
    })),
  on(RoleActions.updateRoleFailure, (state, { error }) => ({
      ...state,
      error
    })),

    on(RoleActions.deleteRole, (state) => ({
      ...state,
      error: null
    })),
    on(RoleActions.deleteRoleSuccess, (state, { id }) => ({
      ...state,
      roles: state.roles.filter(r => r.id !== id),
      filteredRoles: state.filteredRoles.filter(r => r.id !== id),
      error: null
    })),
    on(RoleActions.deleteRoleFailure, (state, { error }) => ({
      ...state,
      error
    })),
    on(RoleActions.filterRoles, (state, { searchTerm }) => ({
      ...state,
      searchTerm,
      filteredRoles: state.roles.filter(role =>
        role.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
  )
});

export const { name: rolesFeatureKey, reducer: roleReducer, selectRoles , selectFilteredRoles} = RolesFeature;

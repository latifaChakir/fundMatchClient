import { createFeature, createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';
import {User} from "../../models/user/user.model";

export interface UserState {
  users: User[];
  filteredUsers: User[];
  searchTerm: string;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  filteredUsers: [],
  searchTerm: '',
  error: null,
};

export const UsersFeature = createFeature({
  name: 'UsersFeatureKey',
  reducer: createReducer(
    initialState,

    on(UserActions.loadUsers, (state) => ({
      ...state,
      error: null
    })),
    on(UserActions.loadUsersSuccess, (state, { users }) => ({
      ...state,
      filteredUsers: users,
      users
    })),
    on(UserActions.loadUsersFailure, (state, { error }) => ({
      ...state,
      error
    })),

    on(UserActions.filterUsers, (state, { searchTerm }) => ({
      ...state,
      searchTerm,
      filteredUsers: state.users.filter(user =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    })),
    on(UserActions.updateUserStatus, (state) => ({
      ...state,
      error: null
    })),
    on(UserActions.updateUserStatusSuccess, (state, { user }) => ({
      ...state,
      users: state.users.map(p =>
        p.id === user.id ? { ...p, isActive: user.isActive } : p
      ),
      filteredUsers: state.filteredUsers.map(p =>
        p.id === user.id ? { ...p, isActive: user.isActive } : p
      ),
      error: null
    })),
    on(UserActions.updateUserStatusFailure, (state, { error }) => ({
      ...state,
      error
    })),

    on(UserActions.unBlockUser, (state) => ({
      ...state,
      error: null
    })),
    on(UserActions.unBlockUserSuccess, (state, { user }) => ({
      ...state,
      users: state.users.map(p =>
        p.id === user.id ? { ...p, isActive: user.isActive } : p
      ),
      filteredUsers: state.filteredUsers.map(p =>
        p.id === user.id ? { ...p, isActive: user.isActive } : p
      ),
      error: null
    })),
    on(UserActions.unBlockUserFailure, (state, { error }) => ({
      ...state,
      error
    })),

  )
});

export const { name: usersFeatureKey, reducer: userReducer, selectUsers , selectFilteredUsers} = UsersFeature;

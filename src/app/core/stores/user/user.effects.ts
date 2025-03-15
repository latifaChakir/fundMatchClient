import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import { of } from 'rxjs';
import {UserService} from "../../services/user/user.service";
import {UserActions} from "./user.actions";
import {User} from "../../models/user/user.model";

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      mergeMap(() =>
        this.userService.getUsers().pipe(
          map((users) => UserActions.loadUsersSuccess({ users })),
          catchError((error) => of(UserActions.loadUsersFailure({ error: error.message })))
        )
      )
    )
  );

  updateUserStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUserStatus),
      mergeMap((action) =>
        this.userService.blockUser(action.userId).pipe(
          map((user: User) => {
            if (user) {
              return UserActions.updateUserStatusSuccess({ user });
            } else {
              return UserActions.updateUserStatusFailure({ error: 'Status update failed' });
            }
          }),
          catchError((error) => of(UserActions.updateUserStatusFailure({ error: error.message })))
        )
      )
    )
  );

  unBlockUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.unBlockUser),
      mergeMap((action) =>
        this.userService.unBlockUser(action.userId).pipe(
          map((user: User) => {
            if (user) {
              return UserActions.unBlockUserSuccess({ user });
            } else {
              return UserActions.unBlockUserFailure({ error: 'unblock user failed' });
            }
          }),
          catchError((error) => of(UserActions.unBlockUserFailure({ error: error.message })))
        )
      )
    )
  );
}

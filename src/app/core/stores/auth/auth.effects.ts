import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from './auth.actions';
import { AuthService } from '../../services/auth/auth.service';
import {catchError, map, of, mergeMap} from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  registerUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerUser),
      mergeMap(({ user }) =>
        this.authService.register(user).pipe(
          map((response) => {
            this.router.navigate(['/login']);
            return AuthActions.registerUserSuccess({ user: response });
          }),
          catchError((error) =>
            of(AuthActions.registerUserFailure({ error: error.message }))
          )
        )
      )
    )
  );

  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginUser),
      mergeMap(action =>
        this.authService.login(action.login).pipe(
          map(user => {
            localStorage.setItem('token', user.token);
            this.router.navigate(['/dashboard']);
            return AuthActions.loginUserSuccess({ user });
          }),
          catchError(error => of(AuthActions.loginUserFailure({ error: error.message })))
        )
      )
    )
  )
  forgetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.forgetPassword),
      mergeMap(({ user }) =>
        this.authService.forgetPassword(user).pipe(
          map(() => AuthActions.forgetUserSuccess({ user })),
          catchError(error => of(AuthActions.forgetUserFailure({ error: error.message })))
        )
      )
    )
  );

  resetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.resetPassword),
      mergeMap(({ user }) =>
        this.authService.resetPassword(user).pipe(
          map(() => {
            this.router.navigate(['/login']);
            return AuthActions.resetUserSuccess({ user });
          }),
          catchError(error => of(AuthActions.resetUserFailure({ error: error.message })))
        )
      )
    )
  );

}

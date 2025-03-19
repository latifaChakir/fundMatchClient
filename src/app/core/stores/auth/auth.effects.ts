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
            const role = this.authService.getUserRole();

            console.log(role);
            if (role === 'Admin') {
              this.router.navigate(['/dashboard']);
            } else if (role === 'Startup') {
              this.router.navigate(['/startup-overview']);
            } else if (role === 'Investor') {
              this.router.navigate(['/create-profile']);
            }
            return AuthActions.loginUserSuccess({ user });
          }),
          catchError(error => {
            const errorMessage = error?.message || 'Une erreur est survenue email ou mot de password incorrect';
            return of(AuthActions.loginUserFailure({ error: errorMessage }));
          })
        )
      )
    )
  )
  forgetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.forgetPassword),
      mergeMap(({ user }) =>
        this.authService.forgetPassword(user).pipe(
          map(() => AuthActions.forgetPasswordSuccess({ user })),
          catchError(error => of(AuthActions.forgetPasswordFailure({ error: error.message })))
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
            return AuthActions.resetPasswordSuccess({ user });
          }),
          catchError(error => of(AuthActions.resetPasswordFailure({ error: error.message })))
        )
      )
    )
  );

}

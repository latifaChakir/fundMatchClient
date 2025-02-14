import { createActionGroup, props } from '@ngrx/store';

import {RegisterRequest} from "../../models/Register-request.model";
import {LoginRequest} from "../../models/login-request.model";
import {RegisterResponse} from "../../models/register-response.interface";
import {LoginResponse} from "../../models/login-response.model";

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Register User': props<{ user: RegisterRequest }>(),
    'Register User Success': props<{ user: RegisterResponse }>(),
    'Register User Failure': props<{ error: string }>(),

    'Login User': props<{ login: LoginRequest }>(),
    'Login User Success': props<{ user: LoginResponse }>(),
    'Login User Failure': props<{ error: string }>(),
  }
});

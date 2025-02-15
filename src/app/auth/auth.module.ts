import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ForgetPasswordComponent} from "./forget-password/forget-password.component";
import {ReactiveFormsModule} from "@angular/forms";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }

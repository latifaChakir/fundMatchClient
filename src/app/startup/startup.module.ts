import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StartupRoutingModule } from './startup-routing.module';
import {StartupComponent} from "./startup/startup.component";
import {SidebarComponent} from "../layouts/sidebar/sidebar.component";
import {NavbarComponent} from "../layouts/navbar/navbar.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MatStep, MatStepper, MatStepperModule} from "@angular/material/stepper";
import {MatFormField} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    StartupComponent
  ],
  imports: [
    CommonModule,
    StartupRoutingModule,
    SidebarComponent,
    NavbarComponent,
    ReactiveFormsModule,
    MatStepper,
    MatStep,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatFormField
  ]
})
export class StartupModule { }

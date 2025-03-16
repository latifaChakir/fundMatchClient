import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvestorRoutingModule } from './investor-routing.module';
import {InvestorComponent} from "./investor-management/investor/investor.component";
import {SidebarComponent} from "../layouts/sidebar/sidebar.component";
import {NavbarComponent} from "../layouts/navbar/navbar.component";
import {AddInvestorComponent} from "./investor-management/add-investor/add-investor.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DialogModule} from "primeng/dialog";
import {NgxPaginationModule} from "ngx-pagination";
import {ProjectSavedComponent} from "./project-saved/project-saved.component";
import {ProfileComponent} from "./profile/profile.component";
import {CreateAccountComponent} from "./create-account/create-account.component";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";


@NgModule({
  declarations: [
    InvestorComponent,
    AddInvestorComponent,
    ProjectSavedComponent,
    ProfileComponent,
    CreateAccountComponent
  ],
  imports: [
    CommonModule,
    InvestorRoutingModule,
    SidebarComponent,
    NavbarComponent,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    NgxPaginationModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    MatStep,
    MatStepLabel,
    MatStepper,
    MatStepperNext,
    MatStepperPrevious,
    MatError
  ]
})
export class InvestorModule { }

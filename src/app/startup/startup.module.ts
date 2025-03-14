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
import {MatOption, MatSelect} from "@angular/material/select";
import {ProjectComponent} from "./project/project.component";
import {AddProjectComponent} from "./add-project/add-project.component";
import {DialogModule} from "primeng/dialog";
import {NgxPaginationModule} from "ngx-pagination";
import {QuillEditorComponent} from "ngx-quill";
import {ProjectCardComponent} from "./project-card/project-card.component";
import {MatProgressBar} from "@angular/material/progress-bar";
import {ManageFeedbackComponent} from "./manage-feedback/manage-feedback.component";

@NgModule({
  declarations: [
    StartupComponent,
    ProjectComponent,
    AddProjectComponent,
    ProjectCardComponent,
    ManageFeedbackComponent
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
    MatFormField,
    MatSelect,
    MatOption,
    DialogModule,
    NgxPaginationModule,
    QuillEditorComponent,
    MatProgressBar,

  ]
})
export class StartupModule { }

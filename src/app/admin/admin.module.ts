import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import {SectorComponent} from "./sector-management/sector/sector.component";
import {NavbarComponent} from "../layouts/navbar/navbar.component";
import {SidebarComponent} from "../layouts/sidebar/sidebar.component";
import {StageComponent} from "./stage-management/stage/stage.component";
import {AddSectorComponent} from "./sector-management/add-sector/add-sector.component";
import {ReactiveFormsModule} from "@angular/forms";
import {DialogModule} from "primeng/dialog";
import {Button} from "primeng/button";
import {CdkOverlayOrigin} from "@angular/cdk/overlay";
import {AddStageComponent} from "./stage-management/add-stage/add-stage.component";
import {NgxPaginationModule} from "ngx-pagination";


@NgModule({
  declarations: [
    SectorComponent,
    AddSectorComponent,
    StageComponent,
    AddStageComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NavbarComponent,
    SidebarComponent,
    ReactiveFormsModule,
    DialogModule,
    Button,
    CdkOverlayOrigin,
    NgxPaginationModule
  ]
})
export class AdminModule { }

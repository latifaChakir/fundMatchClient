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
import {EventComponent} from "./event-management/event/event.component";
import {AddEventComponent} from "./event-management/add-event/add-event.component";
import {QuillEditorComponent} from "ngx-quill";
import {PublishedEventComponent} from "./event-management/published-event/published-event.component";


@NgModule({
  declarations: [
    SectorComponent,
    AddSectorComponent,
    StageComponent,
    AddStageComponent,
    EventComponent,
    AddEventComponent,
    PublishedEventComponent
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
    NgxPaginationModule,
    QuillEditorComponent
  ]
})
export class AdminModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import {SectorComponent} from "./sector-management/sector/sector.component";
import {NavbarComponent} from "../layouts/navbar/navbar.component";
import {SidebarComponent} from "../layouts/sidebar/sidebar.component";
import {StageComponent} from "./stage/stage.component";
import {AddSectorComponent} from "./sector-management/add-sector/add-sector.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    SectorComponent,
    StageComponent,
    AddSectorComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NavbarComponent,
    SidebarComponent,
    ReactiveFormsModule
  ]
})
export class AdminModule { }

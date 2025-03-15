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


@NgModule({
  declarations: [
    InvestorComponent,
    AddInvestorComponent,
    ProjectSavedComponent
  ],
  imports: [
    CommonModule,
    InvestorRoutingModule,
    SidebarComponent,
    NavbarComponent,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    NgxPaginationModule
  ]
})
export class InvestorModule { }

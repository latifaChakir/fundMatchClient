import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import {ChatComponent} from "./chat/chat.component";
import {SidebarComponent} from "../layouts/sidebar/sidebar.component";
import {NavbarComponent} from "../layouts/navbar/navbar.component";
import {ChatExComponent} from "./chat-ex/chat-ex.component";
import {FormsModule} from "@angular/forms";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {BaseChartDirective} from "ng2-charts";


@NgModule({
  declarations: [
    ChatComponent,
    ChatExComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SidebarComponent,
    NavbarComponent,
    FormsModule,
    BaseChartDirective
  ]
})
export class DashboardModule { }

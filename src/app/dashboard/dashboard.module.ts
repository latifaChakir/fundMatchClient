import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import {ChatComponent} from "./chat/chat.component";
import {SidebarComponent} from "../layouts/sidebar/sidebar.component";
import {NavbarComponent} from "../layouts/navbar/navbar.component";


@NgModule({
  declarations: [
    ChatComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SidebarComponent,
    NavbarComponent
  ]
})
export class DashboardModule { }

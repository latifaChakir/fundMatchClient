import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ChatComponent} from "./chat/chat.component";
import {ChatExComponent} from "./chat-ex/chat-ex.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {authGuard} from "../core/guards/auth.guard";
import {roleGuard} from "../core/guards/role.guard";

const routes: Routes = [
  { path: 'app-chat', component: ChatComponent ,canActivate: [authGuard, roleGuard],  data: { roles: ['INVESTOR','ADMIN','STARTUP'] }},
  { path: 'chat', component: ChatExComponent ,canActivate: [authGuard, roleGuard],  data: { roles: ['INVESTOR','ADMIN','STARTUP'] }},
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard, roleGuard],  data: { roles: ['ADMIN'] }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

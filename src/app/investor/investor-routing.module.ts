import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InvestorComponent} from "./investor-management/investor/investor.component";
import {ProjectSavedComponent} from "./project-saved/project-saved.component";
import {ProfileComponent} from "./profile/profile.component";
import {CreateAccountComponent} from "./create-account/create-account.component";
import {authGuard} from "../core/guards/auth.guard";
import {roleGuard} from "../core/guards/role.guard";
import {DashboardComponent} from "./dashboard/dashboard.component";

const routes: Routes = [
  {path:"invertissor-list", component:InvestorComponent , canActivate: [authGuard, roleGuard],  data: { roles: ['ADMIN'] }},
  {path:"project-saved", component:ProjectSavedComponent, canActivate: [authGuard, roleGuard],  data: { roles: ['INVESTOR'] }},
  {path:"investor-profile", component:ProfileComponent  ,canActivate: [authGuard, roleGuard],  data: { roles: ['INVESTOR'] }},
  {path:"create-profile", component:CreateAccountComponent ,canActivate: [authGuard, roleGuard],  data: { roles: ['INVESTOR'] }},
  {path:"investor-dash", component:DashboardComponent ,canActivate: [authGuard, roleGuard],  data: { roles: ['INVESTOR'] }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvestorRoutingModule { }

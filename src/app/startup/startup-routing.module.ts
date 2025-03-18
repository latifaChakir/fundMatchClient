import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StartupComponent} from "./startup/startup.component";
import {ProjectComponent} from "./project/project.component";
import {ProjectCardComponent} from "./project-card/project-card.component";
import {ManageFeedbackComponent} from "./manage-feedback/manage-feedback.component";
import {ProfileComponent} from "./profile/profile.component";
import {authGuard} from "../core/guards/auth.guard";
import {roleGuard} from "../core/guards/role.guard";
import {StatisticComponent} from "./statistic/statistic.component";

const routes: Routes = [
  {path: "startup-overview", component: StartupComponent, canActivate: [authGuard, roleGuard],  data: { roles: ['STARTUP'] }},
  {path: "startup-project", component: ProjectComponent,canActivate: [authGuard, roleGuard],  data: { roles: ['STARTUP'] }},
  {path: "project-card", component: ProjectCardComponent ,canActivate: [authGuard, roleGuard],  data: { roles: ['STARTUP'] }},
  {path: "manage-feedback", component: ManageFeedbackComponent ,canActivate: [authGuard, roleGuard],  data: { roles: ['STARTUP'] }},
  {path: "profil-startup", component: ProfileComponent ,canActivate: [authGuard, roleGuard],  data: { roles: ['STARTUP'] }},
  {path: "dashboard-startup", component: StatisticComponent ,canActivate: [authGuard, roleGuard],  data: { roles: ['STARTUP'] }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StartupRoutingModule { }

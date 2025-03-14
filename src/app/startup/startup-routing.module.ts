import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StartupComponent} from "./startup/startup.component";
import {ProjectComponent} from "./project/project.component";
import {ProjectCardComponent} from "./project-card/project-card.component";
import {ManageFeedbackComponent} from "./manage-feedback/manage-feedback.component";

const routes: Routes = [
  {path: "startup-overview", component: StartupComponent},
  {path: "startup-project", component: ProjectComponent},
  {path: "project-card", component: ProjectCardComponent},
  {path: "manage-feedback", component: ManageFeedbackComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StartupRoutingModule { }

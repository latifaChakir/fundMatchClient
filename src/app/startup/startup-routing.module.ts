import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StartupComponent} from "./startup/startup.component";
import {ProjectComponent} from "./project/project.component";

const routes: Routes = [
  {path: "startup-overview", component: StartupComponent},
  {path: "startup-project", component: ProjectComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StartupRoutingModule { }

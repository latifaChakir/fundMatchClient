import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StartupComponent} from "./startup/startup.component";

const routes: Routes = [
  {path: "dashboard", component: StartupComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StartupRoutingModule { }

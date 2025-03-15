import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InvestorComponent} from "./investor-management/investor/investor.component";
import {ProjectSavedComponent} from "./project-saved/project-saved.component";

const routes: Routes = [
  {path:"invertissor-list", component:InvestorComponent},
  {path:"project-saved", component:ProjectSavedComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvestorRoutingModule { }

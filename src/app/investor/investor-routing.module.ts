import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InvestorComponent} from "./investor-management/investor/investor.component";

const routes: Routes = [
  {path:"invertissor-list", component:InvestorComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvestorRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InvestorComponent} from "./investor-management/investor/investor.component";
import {ProjectSavedComponent} from "./project-saved/project-saved.component";
import {ProfileComponent} from "./profile/profile.component";
import {CreateAccountComponent} from "./create-account/create-account.component";

const routes: Routes = [
  {path:"invertissor-list", component:InvestorComponent},
  {path:"project-saved", component:ProjectSavedComponent},
  {path:"investor-profile", component:ProfileComponent},
  {path:"create-profile", component:CreateAccountComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvestorRoutingModule { }

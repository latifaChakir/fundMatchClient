import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./user/home/home.component";
import {authGuard} from "./core/guards/auth.guard";
import {roleGuard} from "./core/guards/role.guard";

const routes: Routes = [
  { path: '', component: HomeComponent ,canActivate: [authGuard, roleGuard],  data: { roles: ['INVESTOR','ADMIN','STARTUP'] }},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

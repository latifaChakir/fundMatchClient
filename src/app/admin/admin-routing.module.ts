import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SectorComponent} from "./sector-management/sector/sector.component";
import {StageComponent} from "./stage-management/stage/stage.component";
import {EventComponent} from "./event-management/event/event.component";
import {PublishedEventComponent} from "./event-management/published-event/published-event.component";
import {UserManagementComponent} from "./user-management/user-management.component";
import {RoleComponent} from "./role-management/role/role.component";
import {StartupManageComponent} from "./startup-manage/startup-manage.component";
import {authGuard} from "../core/guards/auth.guard";
import {roleGuard} from "../core/guards/role.guard";

const routes: Routes = [
  {path: 'sectors', component: SectorComponent, canActivate: [authGuard, roleGuard],  data: { roles: ['ADMIN'] }},
  {path: 'stages', component: StageComponent , canActivate: [authGuard, roleGuard],  data: { roles: ['ADMIN'] }},
  {path: 'events', component: EventComponent , canActivate: [authGuard, roleGuard],  data: { roles: ['ADMIN'] }},
  {path: 'users', component: UserManagementComponent , canActivate: [authGuard, roleGuard],  data: { roles: ['ADMIN'] }},
  {path: 'roles', component: RoleComponent },
  {path: 'published-events', component: PublishedEventComponent , canActivate: [authGuard, roleGuard],  data: { roles: ['ADMIN'] }},
  {path: 'startup-manage', component: StartupManageComponent , canActivate: [authGuard, roleGuard],  data: { roles: ['ADMIN'] }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

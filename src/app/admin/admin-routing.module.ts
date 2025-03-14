import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SectorComponent} from "./sector-management/sector/sector.component";
import {StageComponent} from "./stage-management/stage/stage.component";
import {EventComponent} from "./event-management/event/event.component";
import {PublishedEventComponent} from "./event-management/published-event/published-event.component";
import {UserManagementComponent} from "./user-management/user-management.component";

const routes: Routes = [
  {path: 'sectors', component: SectorComponent},
  {path: 'stages', component: StageComponent},
  {path: 'events', component: EventComponent},
  {path: 'users', component: UserManagementComponent},
  {path: 'published-events', component: PublishedEventComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

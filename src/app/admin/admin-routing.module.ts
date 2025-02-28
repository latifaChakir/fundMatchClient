import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SectorComponent} from "./sector-management/sector/sector.component";
import {StageComponent} from "./stage-management/stage/stage.component";
import {EventComponent} from "./event-management/event/event.component";

const routes: Routes = [
  {path: 'sectors', component: SectorComponent},
  {path: 'stages', component: StageComponent},
  {path: 'events', component: EventComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

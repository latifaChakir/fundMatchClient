import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EventComponent} from "./event/event.component";
import {ReservationComponent} from "./reservation-event/reservation/reservation.component";

const routes: Routes = [
  { path: 'reservation-page/:id', component: ReservationComponent },
  { path: 'event-page', component: EventComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

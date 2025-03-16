import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EventComponent} from "./event/event.component";
import {ReservationComponent} from "./reservation-event/reservation/reservation.component";
import {PaymentComponent} from "./payment/payment.component";
import {StartupProjectComponent} from "./startup-project/startup-project.component";
import {InvestorsComponent} from "./investors/investors.component";

const routes: Routes = [
  { path: 'reservation-page/:id', component: ReservationComponent },
  { path: 'event-page', component: EventComponent },
  { path: 'investors-page', component: InvestorsComponent },
  { path: 'ticket/:id', component: PaymentComponent },
  { path: 'startup-project/:id', component: StartupProjectComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

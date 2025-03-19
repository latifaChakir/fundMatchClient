import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EventComponent} from "./event/event.component";
import {ReservationComponent} from "./reservation-event/reservation/reservation.component";
import {PaymentComponent} from "./payment/payment.component";
import {StartupProjectComponent} from "./startup-project/startup-project.component";
import {InvestorsComponent} from "./investors/investors.component";
import {MeetingComponent} from "./meeting/meeting.component";
import {NotAuthorizedComponent} from "./not-authorized/not-authorized.component";
import {authGuard} from "../core/guards/auth.guard";
import {roleGuard} from "../core/guards/role.guard";
import {CalendarComponent} from "./calendar/calendar.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";

const routes: Routes = [
  { path: 'reservation-page/:id', component: ReservationComponent ,canActivate: [authGuard, roleGuard],  data: { roles: ['INVESTOR','ADMIN','STARTUP'] }},
  { path: 'event-page', component: EventComponent ,canActivate: [authGuard, roleGuard],  data: { roles: ['INVESTOR','ADMIN','STARTUP'] }},
  { path: 'investors-page', component: InvestorsComponent ,canActivate: [authGuard, roleGuard],  data: { roles: ['INVESTOR','ADMIN','STARTUP'] }},
  { path: 'ticket/:id', component: PaymentComponent ,canActivate: [authGuard, roleGuard],  data: { roles: ['INVESTOR','ADMIN','STARTUP'] }},
  { path: 'startup-project/:id', component: StartupProjectComponent ,canActivate: [authGuard, roleGuard],  data: { roles: ['INVESTOR','ADMIN','STARTUP'] }},
  { path: 'meeting', component: MeetingComponent ,canActivate: [authGuard, roleGuard],  data: { roles: ['INVESTOR','ADMIN','STARTUP'] }},
  { path: 'NotAuthorized', component: NotAuthorizedComponent },
  { path: 'calendar', component: CalendarComponent ,canActivate: [authGuard, roleGuard],  data: { roles: ['INVESTOR','ADMIN','STARTUP'] }},
  { path: 'user-profile', component: UserProfileComponent ,canActivate: [authGuard, roleGuard],  data: { roles: ['INVESTOR','ADMIN','STARTUP'] }},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    scrollOffset: [0, 90]
  })],
  exports: [RouterModule]
})
export class UserRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import {FooterComponent} from "./layout/footer/footer.component";
import {NavComponent} from "./layout/nav/nav.component";
import {StartupDetailComponent} from "./startup-detail/startup-detail.component";
import {PaginatorModule} from "primeng/paginator";
import {QuillEditorComponent} from "ngx-quill";
import {ReactiveFormsModule} from "@angular/forms";
import {EventComponent} from "./event/event.component";
import {NgxPaginationModule} from "ngx-pagination";
import {ReservationComponent} from "./reservation-event/reservation/reservation.component";
import {PaymentComponent} from "./payment/payment.component";
import {StartupProjectComponent} from "./startup-project/startup-project.component";
import {InvestorsComponent} from "./investors/investors.component";
import {MeetingComponent} from "./meeting/meeting.component";
import {NavbarComponent} from "../layouts/navbar/navbar.component";
import {SidebarComponent} from "../layouts/sidebar/sidebar.component";
import {NotAuthorizedComponent} from "./not-authorized/not-authorized.component";
import {CalendarMonthModule} from "angular-calendar";
import {CalendarComponent} from "./calendar/calendar.component";
import {FullCalendarModule} from "@fullcalendar/angular";


@NgModule({
  declarations: [
    FooterComponent,
    NavComponent,
    StartupDetailComponent,
    EventComponent,
    ReservationComponent,
    PaymentComponent,
    StartupProjectComponent,
    InvestorsComponent,
    MeetingComponent,
    NotAuthorizedComponent,
    CalendarComponent
  ],
  exports: [
    NavComponent,
    FooterComponent,
    StartupDetailComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    PaginatorModule,
    QuillEditorComponent,
    ReactiveFormsModule,
    NgxPaginationModule,
    NavbarComponent,
    SidebarComponent,
    CalendarMonthModule,
    FullCalendarModule
  ]
})
export class UserModule { }

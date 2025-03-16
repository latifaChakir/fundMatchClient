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


@NgModule({
  declarations: [
    FooterComponent,
    NavComponent,
    StartupDetailComponent,
    EventComponent,
    ReservationComponent,
    PaymentComponent,
    StartupProjectComponent,
    InvestorsComponent
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
    NgxPaginationModule
  ]
})
export class UserModule { }

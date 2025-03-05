import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import {FooterComponent} from "./layout/footer/footer.component";
import {NavComponent} from "./layout/nav/nav.component";


@NgModule({
  declarations: [
    FooterComponent,
    NavComponent
  ],
  exports: [
    NavComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }

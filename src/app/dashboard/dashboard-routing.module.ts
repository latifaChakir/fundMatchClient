import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ChatComponent} from "./chat/chat.component";
import {ChatExComponent} from "../chat-ex/chat-ex.component";

const routes: Routes = [
  { path: 'app-chat', component: ChatComponent },
  { path: 'chat', component: ChatExComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {NgClass, NgIf} from "@angular/common";
import {AuthService} from "../../core/services/auth/auth.service";
import {MessageNotifService} from "../../core/services/webSocket/message-notif.service";
import {NotificationService} from "../../core/services/webSocket/notification.service";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgClass,
    NgIf,
    TranslatePipe
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  isAdmin: boolean = false;
  isStartup: boolean = false;
  isInvestor: boolean = false;

  constructor(private router: Router, private authService : AuthService,
              private translate: TranslateService) {
                this.translate.setDefaultLang('en');
                this.translate.use('en');
  }
  ngOnInit() {
    this.isAdmin= this.authService.getUserRole() == "Admin";
    this.isStartup= this.authService.getUserRole() == "Startup";
    this.isInvestor= this.authService.getUserRole() == "Investor";
  }
  isActiveRoute(routes: string[]): boolean {
    const currentUrl = this.router.url;
    return routes.some(route => currentUrl.includes(route));
  }

}

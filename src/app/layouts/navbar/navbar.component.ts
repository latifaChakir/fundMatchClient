import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {NotificationService} from "../../core/services/webSocket/notification.service";
import {NgClass, NgForOf} from "@angular/common";
import {MessageNotifService} from "../../core/services/webSocket/message-notif.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    NgClass
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  notifications: string[] = [];
  notificationsMessages: string[] = [];
  constructor(private router:Router,
              private messageNotif: MessageNotifService,
              private notificationService: NotificationService,
              private translate: TranslateService
  ) {
    const savedLang = localStorage.getItem('lang') || 'en';
    this.translate.setDefaultLang(savedLang);
    this.translate.use(savedLang);
  }
  logout(): void {
    console.log('Logging out...');
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
  ngOnInit() {
    this.notificationService.getNotifications().subscribe(notification => {
      this.notifications.push(notification);
    });

    this.messageNotif.getNotificationsMessages().subscribe(notificationMessages => {
      this.notificationsMessages.push(notificationMessages);
    });
  }
  changeLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }
}

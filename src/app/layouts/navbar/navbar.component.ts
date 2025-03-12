import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NotificationService} from "../../core/services/webSocket/notification.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  notifications: string[] = [];
  constructor(private router:Router, private notificationService: NotificationService) {
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
  }
}

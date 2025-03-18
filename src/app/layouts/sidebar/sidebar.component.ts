import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {NgClass, NgIf} from "@angular/common";
import {AuthService} from "../../core/services/auth/auth.service";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgClass,
    NgIf
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  isAdmin: boolean = false;
  isStartup: boolean = false;
  isInvestor: boolean = false;

  constructor(private router: Router, private authService : AuthService) {}
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

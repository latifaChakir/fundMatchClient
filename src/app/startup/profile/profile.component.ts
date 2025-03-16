import {Component, OnInit} from '@angular/core';
import {Startup} from "../../core/models/startup/startup.model";
import {UserService} from "../../core/services/user/user.service";
import {StartupService} from "../../core/services/startup/startup.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  currentStartup?: Startup;
  activeSection: string = 'personal';

  constructor(
    private userService: UserService,
    private StartupService: StartupService
  ) {}

  ngOnInit() {
    this.getStartupByUser();
  }

  getStartupByUser() {
    this.StartupService.getStartupByUser().subscribe({
      next: (Startup: Startup) => {
        this.currentStartup = Startup;
      },
      error: (err) => {
        console.error("Erreur lors de la récupération dE Startup :", err);
      }
    });
  }
  setActiveSection(section: string) {
    this.activeSection = section;
  }
}

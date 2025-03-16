import { Component, OnInit } from '@angular/core';
import { UserService } from "../../core/services/user/user.service";
import { InvestorService } from "../../core/services/investor/investor.service";
import {Investor} from "../../core/models/investor/investor.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentInvestor?: Investor;
  activeSection: string = 'personal';

  constructor(
    private userService: UserService,
    private investorService: InvestorService
  ) {}

  ngOnInit() {
    this.getInvestorByUser();
  }

  getInvestorByUser() {
    this.investorService.getInvestorByUser().subscribe({
      next: (investor: Investor) => {
        this.currentInvestor = investor;
      },
      error: (err) => {
        console.error("Erreur lors de la récupération de l'investisseur :", err);
      }
    });
  }
  setActiveSection(section: string) {
    this.activeSection = section;
  }
}

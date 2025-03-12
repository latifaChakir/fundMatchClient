import { Component, OnInit } from '@angular/core';
import { DashboardService } from "../../core/services/dashboard/dashboard.service";
import { ChartData, ChartType } from "chart.js";
import { Observable } from "rxjs";
import { Sector } from "../../core/models/sector/sector.model";
import { selectFilteredSectors } from "../../core/stores/sector/sector.reducer";
import { Store } from "@ngrx/store";
import { SectorActions } from "../../core/stores/sector/sector.actions";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  users: number = 0;
  sectors: number = 0;
  stages: number = 0;
  investisseurs: number = 0;
  startups: number = 0;
  events: number = 0;
  sectors$: Observable<Sector[]>;

  public doughnutChartLabels: string[] = [];
  public doughnutChartData: ChartData<'doughnut'> = { labels: [], datasets: [{ data: [], backgroundColor: ['#FF6384', '#733AEA', '#FFCE56', '#4BC0C0', '#9966FF'] }] };
  public doughnutChartInvestorsData: ChartData<'doughnut'> = { labels: [], datasets: [{ data: [], backgroundColor: ['#FF6384', '#733AEA', '#FFCE56', '#4BC0C0', '#9966FF'] }] };
  public doughnutChartStagesData: ChartData<'doughnut'> = { labels: [], datasets: [{ data: [], backgroundColor: ['#FF6384', '#733AEA', '#FFCE56', '#4BC0C0', '#9966FF'] }] };

  public doughnutChartType: ChartType = 'doughnut';

  public lineChartLabels: string[] = ['Users', 'Investisseurs', 'Startups', 'Events'];
  public lineChartData: ChartData<'line'> = {
    labels: this.lineChartLabels,
    datasets: [{ label: 'Statistics', data: [150, 80, 120, 40], borderColor: 'rgba(75,192,192,1)', backgroundColor: 'rgba(75,192,192,0.2)', fill: true, tension: 0.4 }]
  };
  public lineChartType: ChartType = 'line';

  constructor(private dashboardService: DashboardService, private store: Store) {
    this.sectors$ = this.store.select(selectFilteredSectors);
  }

  ngOnInit() {
    this.store.dispatch(SectorActions.loadSectors());
    this.getStatistics();
  }

  getStatistics(): void {
    this.dashboardService.getAllStatistics().subscribe({
      next: (data) => {
        this.users = data.users;
        this.investisseurs = data.investisseurs;
        this.events = data.events;
        this.startups = data.startups;

        // Mettre à jour les données du graphique en ligne
        this.lineChartData = {
          labels: this.lineChartLabels,
          datasets: [{ label: 'Statistics', data: [this.users, this.investisseurs, this.startups, this.events], borderColor: 'rgba(75,192,192,1)', backgroundColor: 'rgba(75,192,192,0.2)', fill: true, tension: 0.4 }]
        };

        // Mettre à jour les données du Doughnut Chart pour startupsPerSector
        this.doughnutChartLabels = Object.keys(data.startupsPerSector);
        this.doughnutChartData = {
          labels: this.doughnutChartLabels,
          datasets: [{ data: Object.values(data.startupsPerSector), backgroundColor: ['#FF6384', '#733AEA', '#FFCE56', '#4BC0C0', '#9966FF'] }]
        };

        // Mettre à jour les données du Doughnut Chart pour investorsPerSector
        this.doughnutChartInvestorsData = {
          labels: Object.keys(data.investorsPerSector),
          datasets: [{ data: Object.values(data.investorsPerSector), backgroundColor: ['#FF6384', '#733AEA', '#FFCE56', '#4BC0C0', '#9966FF'] }]
        };

        // Mettre à jour les données du Doughnut Chart pour startupsPerStages
        this.doughnutChartStagesData = {
          labels: Object.keys(data.startupsPerStages),
          datasets: [{ data: Object.values(data.startupsPerStages), backgroundColor: ['#FF6384', '#733AEA', '#FFCE56', '#4BC0C0', '#9966FF'] }]
        };
      },
      error: (err) => {
        console.error("Erreur lors de la récupération des statistiques :", err);
      }
    });
  }
}

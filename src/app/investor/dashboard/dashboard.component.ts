import {Component, OnInit} from '@angular/core';
import {ChartData, ChartType} from "chart.js";
import {DashboardService} from "../../core/services/dashboard/dashboard.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  savedProjectsCount: number = 0;
  totalMeetings: number = 0;
  overdueMeetings: number = 0;
  upcomingMeetings: number = 0;
  public lineChartLabels: string[] = ['Total Saved Projects', 'total Meetings', 'Overdue Meetings', 'Upcoming Meetings'];
  public lineChartData: ChartData<'line'> = {
    labels: this.lineChartLabels,
    datasets: [{ label: 'Statistics', data: [150, 80, 120, 40], borderColor: 'rgba(75,192,192,1)', backgroundColor: 'rgba(75,192,192,0.2)', fill: true, tension: 0.4 }]
  };
  public lineChartType: ChartType = 'line';

  constructor(private dashboardService: DashboardService) {
  }
  ngOnInit() {
    this.getStatistics();
  }
  getStatistics(): void {
    this.dashboardService.getAllStatistics().subscribe({
      next: (data) => {
        this.savedProjectsCount = data.savedProjectsCount;
        this.totalMeetings = data.totalMeetings;
        this.overdueMeetings = data.overdueMeetings;
        this.upcomingMeetings = data.upcomingMeetings;

        this.lineChartData = {
          labels: this.lineChartLabels,
          datasets: [{ label: 'Statistics', data: [this.savedProjectsCount, this.totalMeetings, this.overdueMeetings, this.upcomingMeetings], borderColor: 'rgba(75,192,192,1)', backgroundColor: 'rgba(75,192,192,0.2)', fill: true, tension: 0.4 }]
        };
      },
      error: (err) => {
        console.error("Erreur lors de la récupération des statistiques :", err);
      }
    });
  }

}

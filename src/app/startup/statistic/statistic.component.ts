import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../../core/services/dashboard/dashboard.service";
import {ChartData, ChartType} from "chart.js";

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrl: './statistic.component.css'
})
export class StatisticComponent implements OnInit{
  projectsForCurrentStartup: number = 0;
  completedProjects: number = 0;
  pendingProjects: number = 0;
  totalFeedbackCount: number = 0;
  public lineChartLabels: string[] = ['Total Projects', 'completed Projects', 'pending Projects', 'total Feedback'];
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
        this.projectsForCurrentStartup = data.projectsForCurrentStartup;
        this.completedProjects = data.completedProjects;
        this.pendingProjects = data.pendingProjects;
        this.totalFeedbackCount = data.totalFeedbackCount;

        this.lineChartData = {
          labels: this.lineChartLabels,
          datasets: [{ label: 'Statistics', data: [this.projectsForCurrentStartup, this.completedProjects, this.pendingProjects, this.totalFeedbackCount], borderColor: 'rgba(75,192,192,1)', backgroundColor: 'rgba(75,192,192,0.2)', fill: true, tension: 0.4 }]
        };
      },
      error: (err) => {
        console.error("Erreur lors de la récupération des statistiques :", err);
      }
    });
  }

}

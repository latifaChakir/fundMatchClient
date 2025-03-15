import {Component, OnInit} from '@angular/core';
import {InvestorService} from "../../core/services/investor/investor.service";

@Component({
  selector: 'app-project-saved',
  templateUrl: './project-saved.component.html',
  styleUrl: './project-saved.component.css'
})
export class ProjectSavedComponent implements OnInit{

  savedProjects: any[] = [];
  filteredProjects: any[] = [];
  searchQuery: string = '';
  isLoading: boolean = true;
  error: string | null = null;
  success: string | null = null;
  constructor(private investorService: InvestorService) {}

  ngOnInit(): void {
    this.getSavedProjects();
  }

  getSavedProjects(): void {
    this.investorService.loadBookedProjects().subscribe(
      (data) => {
        this.savedProjects = data.savedProjects;
        this.filteredProjects = this.savedProjects;
        this.isLoading = false;
      },
      (error) => {
        console.error('Erreur lors du chargement des projets sauvegardés', error);
        this.isLoading = false;
      }
    );
  }

  unSaveProject(projectId : number | undefined) {
    if (projectId === undefined) {
      console.warn("Project ID is undefined.");
      return;
    }
    this.investorService.unSaveProject(projectId).subscribe({
      next: (response) => {
        this.success="Vous avez annuler l'enregistrement de ce project";
        this.getSavedProjects();
      },
      error: (error) => {
        this.error = "Erreur lors de sauvegarde de projet.";
      }
    });

  }
  onSearchChange(event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredProjects = this.savedProjects.filter(project =>
      project.title.toLowerCase().includes(query)
    );
  }
}

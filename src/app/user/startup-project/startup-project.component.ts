import { Component, OnInit } from '@angular/core';
import { ProjectService } from "../../core/services/project/project.service";
import { ActivatedRoute } from "@angular/router";
import { Project } from "../../core/models/project/project.model";

@Component({
  selector: 'app-startup-project',
  templateUrl: './startup-project.component.html',
  styleUrls: ['./startup-project.component.css']
})
export class StartupProjectComponent implements OnInit {
  projects: Project[] = [];
  p: number = 1;
  showFullDescription: { [key: number]: boolean } = {};
  showFeedbackEditor = false;
  newFeedback = '';

  constructor(private projectService: ProjectService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const startupId = Number(params.get('id'));
      if (!isNaN(startupId)) {
        this.loadStartupProjects(startupId);
      }
    });
  }

  loadStartupProjects(startupId: number) {
    this.projectService.getStartupProjects(startupId).subscribe({
      next: (projects) => {
        this.projects = projects;
        this.projects.forEach(project => {
          if (project.id !== undefined && project.id !== null) {
            this.showFullDescription[project.id] = false;
          }
        });
      },
      error: (error) => {
        console.error("Erreur lors du chargement des projets :", error);
      }
    });
  }

  toggleDescription(projectId: number | undefined) {
    if (projectId !== undefined) {
      this.showFullDescription[projectId] = !this.showFullDescription[projectId];
    }
  }

  truncateText(text: string, wordLimit: number): string {
    const words = text.split(/\s+/);
    return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : text;
  }

  toggleFeedbackEditor() {
    this.showFeedbackEditor = !this.showFeedbackEditor;
  }
}

import { Component, OnInit } from '@angular/core';
import { ProjectService } from "../../core/services/project/project.service";
import { ActivatedRoute } from "@angular/router";
import {Project, ProjectStage} from "../../core/models/project/project.model";
import {FeedbackService} from "../../core/services/project/feedback.service";
import {Feedback, FeedbackType} from "../../core/models/project/feedback.model";

@Component({
  selector: 'app-startup-project',
  templateUrl: './startup-project.component.html',
  styleUrls: ['./startup-project.component.css']
})
export class StartupProjectComponent implements OnInit {
  projects: Project[] = [];
  projectStages = Object.values(ProjectStage);
  p: number = 1;
  showFullDescription: { [key: number]: boolean } = {};
  showFeedbackEditor = false;
  showFullFeedBack: { [key: number]: boolean } = {};
  newFeedback = '';
  feedbackType: FeedbackType = FeedbackType.NEUTRAL;
  publicFeedbacks: Feedback[] = [];

  constructor(private projectService: ProjectService,
              private feedbackService: FeedbackService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const startupId = Number(params.get('id'));
      if (!isNaN(startupId)) {
        this.loadStartupProjects(startupId);
        this.loadPublicFeedback(startupId);
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

  addFeedback(projectId: number | undefined) {
    if (projectId === undefined) {
      console.warn("Project ID is undefined.");
      return;
    }
    if (!this.newFeedback.trim()) {
      console.warn("Feedback content cannot be empty");
      return;
    }
    const feedback: Feedback = {
      content: this.newFeedback,
      isPrivate: true,
      type: this.feedbackType
    };

    this.feedbackService.addFeedback(projectId, feedback).subscribe({
      next: (response) => {
        console.log("Feedback added successfully", response);
        this.newFeedback = '';
        this.toggleFeedbackEditor();
      },
      error: (error) => {
        console.error("Error adding feedback:", error);
      }
    });
  }

  loadPublicFeedback(startupId: number) {
    this.feedbackService.getPublicFeedbacksByStartup(startupId).subscribe({
      next: (publicFeedbacks) => {
        this.publicFeedbacks = publicFeedbacks;
      },
      error: (error) => {
        console.error("Error loading feedbacks:", error);
      }
    });
  }
  toggleFeedback(feedbackId: number | undefined) {
    if (feedbackId !== undefined) {
      this.showFullFeedBack[feedbackId] = !this.showFullFeedBack[feedbackId];
    }
  }

}

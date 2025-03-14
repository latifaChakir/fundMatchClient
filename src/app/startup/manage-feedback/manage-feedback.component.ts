import { Component, OnInit } from '@angular/core';
import {FeedbackService} from "../../core/services/project/feedback.service";
import {Feedback} from "../../core/models/project/feedback.model";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-manage-feedback',
  templateUrl: './manage-feedback.component.html',
  styleUrls: ['./manage-feedback.component.css']
})
export class ManageFeedbackComponent implements OnInit {
  feedbacks: Feedback[] = [];
  filteredFeedbacks: Feedback[] = [];
  searchQuery: string = '';
  loading: boolean = false;
  error: string | null = null;
  success: string | null = null;
  p: number = 1;
  constructor(private feedbackService: FeedbackService, private store: Store) {}

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    this.loading = true;
    this.feedbackService.loadFeedbacks().subscribe({
      next: (data) => {
        this.feedbacks = data;
        this.filteredFeedbacks = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = "Erreur lors du chargement des feedbacks.";
        this.loading = false;
      }
    });
  }

  markAsPublic(feedbackId: number): void {
    this.feedbackService.markAsPublic(feedbackId).subscribe({
      next: () => {
        this.feedbacks = this.feedbacks.map(fb =>
          fb.id === feedbackId ? { ...fb, isPrivate: false } : fb
        );
        this.success="Feedback a été partager avec succès";
      },
      error: () => {
        this.error = "Erreur lors de la mise à jour du feedback.";
      }
    });
  }

  searchFeedbacks(event: any): void {
    this.searchQuery = event.target.value.toLowerCase();

    if (!this.searchQuery) {
      this.filteredFeedbacks = this.feedbacks;
      return;
    }

    this.filteredFeedbacks = this.feedbacks.filter(feedback =>
      feedback.project?.title?.toLowerCase().includes(this.searchQuery)
    );
  }
}

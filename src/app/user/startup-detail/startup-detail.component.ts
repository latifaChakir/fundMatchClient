import { Component, EventEmitter, Input, OnInit, OnChanges, OnDestroy, SimpleChanges, Output } from '@angular/core';
import { Startup } from "../../core/models/startup/startup.model";
import { Store } from "@ngrx/store";
import { CommentService } from "../../core/services/startup/comment.service";
import { Observable, of, Subscription } from "rxjs";
import { UserService } from "../../core/services/user/user.service";

@Component({
  selector: 'app-startup-detail',
  templateUrl: './startup-detail.component.html',
  styleUrls: ['./startup-detail.component.css']
})
export class StartupDetailComponent implements OnInit, OnChanges, OnDestroy {
  @Output() closePopup = new EventEmitter<void>();
  @Input() initialRequestData: Startup | null = null;
  newComment = '';
  usersLikes$: Observable<any[]> = of([]);
  usersComments$: Observable<any[]> = of([]);
  hasLiked = false;
  currentUserId!: number;
  likesCount = 0;
  commentsCount = 0;
  showCommentEditor = false;

  private likesSubscription: Subscription | null = null;
  private commentsSubscription: Subscription | null = null;
  private userSubscription: Subscription | null = null;

  constructor(
    private store: Store,
    private commentService: CommentService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userSubscription = this.userService.getCurrentUser().subscribe(user => {
      this.currentUserId = user.id;
      if (this.initialRequestData?.id) {
        this.loadLikes(this.initialRequestData.id);
        this.loadComments(this.initialRequestData.id);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['initialRequestData'] && changes['initialRequestData'].currentValue) {
      const startup = changes['initialRequestData'].currentValue;
      if (startup.id && this.currentUserId) {
        this.loadLikes(startup.id);
        this.loadComments(startup.id);
      }
    }
  }

  ngOnDestroy() {
    if (this.likesSubscription) {
      this.likesSubscription.unsubscribe();
    }
    if (this.commentsSubscription) {
      this.commentsSubscription.unsubscribe();
    }
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  loadLikes(startupId: number): void {
    if (this.likesSubscription) {
      this.likesSubscription.unsubscribe();
    }

    this.usersLikes$ = this.commentService.getLikes(startupId);
    this.likesSubscription = this.usersLikes$.subscribe({
      next: (users) => {
        this.likesCount = users.length;
        this.hasLiked = users.some(user => user.id === this.currentUserId);
        console.log('Users who liked:', users, 'Current user has liked:', this.hasLiked);
      },
      error: err => console.error('Error fetching likes', err)
    });
  }

  loadComments(startupId: number): void {
    if (this.commentsSubscription) {
      this.commentsSubscription.unsubscribe();
    }

    this.usersComments$ = this.commentService.getComments(startupId);
    this.commentsSubscription = this.usersComments$.subscribe({
      next: (comments) => {
        this.commentsCount = comments.length;
        console.log('Comments:', comments, 'Comments count:', this.commentsCount);
      },
      error: err => console.error('Error fetching comments', err)
    });
  }

  cancel(): void {
    this.closePopup.emit();
  }

  likeStartup() {
    if (!this.initialRequestData || this.initialRequestData.id === undefined) return;

    this.commentService.likeStartup(this.initialRequestData.id).subscribe(response => {
      this.initialRequestData = {
        ...this.initialRequestData,
        likes: response.likes
      } as Startup;

      this.hasLiked = !this.hasLiked;
      this.likesCount = this.hasLiked ? this.likesCount + 1 : this.likesCount - 1;
      if (this.initialRequestData?.id) {
        this.loadLikes(this.initialRequestData.id);
      }
    });
  }

  addComment() {
    if (!this.initialRequestData || !this.initialRequestData.id || this.newComment.trim() === '') return;
    const commentData = { content: this.newComment };

    this.commentService.addComment(this.initialRequestData.id, commentData).subscribe(response => {
      if (this.initialRequestData) {
        this.initialRequestData = {
          ...this.initialRequestData,
          comments: [...(this.initialRequestData.comments || []), response]
        } as Startup;
      }
      this.newComment = '';
      if (this.initialRequestData?.id) {
        this.loadComments(this.initialRequestData.id);
      }
    });
  }

  toggleCommentEditor() {
    this.showCommentEditor = !this.showCommentEditor;
  }
}

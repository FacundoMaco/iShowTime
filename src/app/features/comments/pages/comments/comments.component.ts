import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommentService } from '../../../../core/services/comment.service';
import { AuthService } from '../../../../services/auth.service';
import { Comment, CommentForm } from '../../../../core/models/comment.model';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent implements OnInit, OnDestroy {
  comments: Comment[] = [];
  commentForm: FormGroup;
  isSubmitting = false;
  editingCommentId: string | null = null;
  editForm: FormGroup;
  
  private commentsSubscription: Subscription | null = null;
  private authSubscription: Subscription | null = null;

  constructor(
    private commentService: CommentService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.commentForm = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      rating: [5, [Validators.min(1), Validators.max(5)]]
    });

    this.editForm = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]]
    });
  }

  ngOnInit(): void {
    this.commentsSubscription = this.commentService.getComments().subscribe(comments => {
      this.comments = comments;
    });
  }

  ngOnDestroy(): void {
    if (this.commentsSubscription) {
      this.commentsSubscription.unsubscribe();
    }
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  onSubmit(): void {
    if (this.commentForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      const currentUser = this.authService.getCurrentUser();
      
      if (currentUser) {
        const commentData: CommentForm = this.commentForm.value;
        this.commentService.addComment(
          commentData,
          currentUser.id,
          currentUser.name,
          currentUser.avatar
        );
        
        this.commentForm.reset({ content: '', rating: 5 });
        this.isSubmitting = false;
      }
    }
  }

  startEdit(comment: Comment): void {
    this.editingCommentId = comment.id;
    this.editForm.patchValue({ content: comment.content });
  }

  cancelEdit(): void {
    this.editingCommentId = null;
    this.editForm.reset();
  }

  saveEdit(): void {
    if (this.editForm.valid && this.editingCommentId) {
      const content = this.editForm.get('content')?.value;
      this.commentService.updateComment(this.editingCommentId, content);
      this.editingCommentId = null;
      this.editForm.reset();
    }
  }

  deleteComment(commentId: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
      this.commentService.deleteComment(commentId);
    }
  }

  canEditComment(comment: Comment): boolean {
    const currentUser = this.authService.getCurrentUser();
    return currentUser?.id === comment.userId;
  }

  canDeleteComment(comment: Comment): boolean {
    const currentUser = this.authService.getCurrentUser();
    return currentUser?.id === comment.userId;
  }

  getStars(rating: number): number[] {
    return Array.from({ length: 5 }, (_, i) => i + 1);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
} 
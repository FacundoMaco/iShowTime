import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Comment, CommentForm } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private _comments = new BehaviorSubject<Comment[]>([]);
  comments$ = this._comments.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.loadComments();
  }

  private loadComments(): void {
    if (isPlatformBrowser(this.platformId)) {
      const storedComments = localStorage.getItem('profileComments');
      if (storedComments) {
        this._comments.next(JSON.parse(storedComments));
      } else {
        // Datos de ejemplo
        const mockComments: Comment[] = [
          {
            id: '1',
            userId: '2',
            userName: 'María García',
            userAvatar: 'assets/img/team/default-avatar-F.png',
            content: '¡Excelente organizador! Los eventos que crea son siempre muy divertidos y bien planificados.',
            createdAt: '2024-01-20T10:30:00Z',
            rating: 5
          },
          {
            id: '2',
            userId: '3',
            userName: 'Carlos López',
            userAvatar: 'assets/img/team/default-avatar-M.png',
            content: 'Muy profesional y puntual. Recomiendo totalmente sus eventos.',
            createdAt: '2024-01-18T15:45:00Z',
            rating: 4
          },
          {
            id: '3',
            userId: '4',
            userName: 'Ana Rodríguez',
            userAvatar: 'assets/img/team/default-avatar-F.png',
            content: 'Gran experiencia en el último evento. Todo salió perfecto.',
            createdAt: '2024-01-15T09:20:00Z',
            rating: 5
          }
        ];
        this._comments.next(mockComments);
        this.saveComments(mockComments);
      }
    }
  }

  private saveComments(comments: Comment[]): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('profileComments', JSON.stringify(comments));
    }
  }

  addComment(commentForm: CommentForm, userId: string, userName: string, userAvatar: string): void {
    const newComment: Comment = {
      id: Date.now().toString(),
      userId,
      userName,
      userAvatar,
      content: commentForm.content,
      rating: commentForm.rating,
      createdAt: new Date().toISOString()
    };

    const currentComments = this._comments.value;
    const updatedComments = [newComment, ...currentComments];
    this._comments.next(updatedComments);
    this.saveComments(updatedComments);
  }

  updateComment(commentId: string, content: string): void {
    const currentComments = this._comments.value;
    const updatedComments = currentComments.map(comment => 
      comment.id === commentId 
        ? { ...comment, content, isEdited: true }
        : comment
    );
    this._comments.next(updatedComments);
    this.saveComments(updatedComments);
  }

  deleteComment(commentId: string): void {
    const currentComments = this._comments.value;
    const updatedComments = currentComments.filter(comment => comment.id !== commentId);
    this._comments.next(updatedComments);
    this.saveComments(updatedComments);
  }

  getComments(): Observable<Comment[]> {
    return this.comments$;
  }

  getCommentsByUserId(userId: string): Comment[] {
    return this._comments.value.filter(comment => comment.userId === userId);
  }
} 
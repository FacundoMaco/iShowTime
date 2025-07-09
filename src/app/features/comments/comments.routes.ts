import { Routes } from '@angular/router';

export const COMMENTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/comments/comments.component').then(m => m.CommentsComponent)
  }
]; 
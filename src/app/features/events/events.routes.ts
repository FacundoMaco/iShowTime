import { Routes } from '@angular/router';

export const eventsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/event-search/event-search.component').then(m => m.EventSearchComponent),
    title: 'ShowTime - Explorar Eventos'
  },
  {
    path: 'create',
    loadComponent: () => import('./pages/create-event/create-event.component').then(m => m.CreateEventComponent),
    title: 'ShowTime - Crear Evento'
  },
  {
    path: 'saved',
    loadComponent: () => import('./pages/saved-events/saved-events.component').then(m => m.SavedEventsComponent),
    title: 'ShowTime - Eventos Guardados'
  },
  {
    path: 'manage',
    loadComponent: () => import('./pages/event-management/event-management.component').then(m => m.EventManagementComponent),
    title: 'ShowTime - Gestionar Eventos'
  },
  {
    path: ':id',
    loadComponent: () => import('./pages/event-detail/event-detail.component').then(m => m.EventDetailComponent),
    title: 'ShowTime - Detalle del Evento'
  }
];

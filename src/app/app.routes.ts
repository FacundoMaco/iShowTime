import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layouts/public-layout/public-layout.component').then(m => m.PublicLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/home/pages/home/home.component').then(m => m.HomeComponent),
        title: 'ShowTime - Descubre Nuevas Experiencias'
      },
      {
        path: 'eventos',
        loadChildren: () => import('./features/events/events.routes').then(m => m.eventsRoutes)
      },
      {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes)
      },
      {
        path: 'nosotros',
        loadComponent: () => import('./features/home/pages/about/about.component').then(m => m.AboutComponent),
        title: 'ShowTime - Nosotros'
      },
      {
        path: 'contacto',
        loadComponent: () => import('./features/home/pages/contact/contact.component').then(m => m.ContactComponent),
        title: 'ShowTime - Contacto'
      },
      {
        path: 'perfil',
        loadComponent: () => import('./pages/profile/profile').then(m => m.Profile),
        title: 'ShowTime - Mi Perfil'
      },
      {
        path: 'configuracion-cuenta',
        loadComponent: () => import('./pages/account-settings/account-settings.component').then(m => m.AccountSettingsComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
    title: 'ShowTime - Iniciar Sesión'
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent),
    title: 'ShowTime - Crear Cuenta'
  },
  {
    path: 'register-success',
    loadComponent: () => import('./pages/register-success/register-success.component').then(m => m.RegisterSuccessComponent),
    title: 'ShowTime - Registro Exitoso'
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./pages/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent),
    title: 'ShowTime - Recuperar Contraseña'
  },
  {
    path: 'password-reset-success',
    loadComponent: () => import('./pages/password-reset-success/password-reset-success.component').then(m => m.PasswordResetSuccessComponent),
    title: 'ShowTime - Contraseña Recuperada'
  }
];

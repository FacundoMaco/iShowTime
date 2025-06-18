import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Inicio } from './pages/inicio/inicio';
import { Events } from './pages/events/events';
import { About } from './pages/about/about';
import { MyEvents } from './pages/my-events/my-events';
import { ResetPassword } from './pages/reset-password/reset-password';
import { RegisterConfirmation } from './pages/register-confirmation/register-confirmation';

export const routes: Routes = [
    { path: '', redirectTo: 'inicio', pathMatch: 'full' },
    { path: 'inicio', component: Inicio },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'events', component: Events },
    { path: 'about', component: About },
    { path: 'my-events', component: MyEvents },
    { path: 'reset-password', component: ResetPassword },
    { path: 'register-confirmation', component: RegisterConfirmation }
];

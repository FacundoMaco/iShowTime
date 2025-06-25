import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Inicio } from './pages/inicio/inicio';
import { Events } from './pages/events/events';
import { About } from './pages/about/about';
import { MyEvents } from './pages/my-events/my-events';
import { ResetPassword } from './pages/reset-password/reset-password';
import { RegisterConfirmation } from './pages/register-confirmation/register-confirmation';
import { EventsPersonal } from './pages/events-personal/events-personal';
import { EventsCreate } from './pages/events-create/events-create';
import { EventsSaved } from './pages/events-saved/events-saved';

export const routes: Routes = [
    { path: '', redirectTo: 'inicio', pathMatch: 'full' },
    { path: 'inicio', component: Inicio },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'eventos', component: Events },
    { path: 'nosotros', component: About },
    { path: 'mis-eventos', component: MyEvents },
    { path: 'reset-password', component: ResetPassword },
    { path: 'register-confirmation', component: RegisterConfirmation },
    { path: 'eventos-personales', component: EventsPersonal },
    { path: 'crear-evento', component: EventsCreate },
    { path: 'eventos-guardados', component: EventsSaved }
];

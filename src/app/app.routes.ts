import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'inicio', pathMatch: 'full' },
    { 
        path: 'inicio', 
        loadComponent: () => import('./pages/inicio/inicio').then(m => m.Inicio),
        title: 'Inicio - iShowTime'
    },
    { 
        path: 'login', 
        loadComponent: () => import('./pages/login/login').then(m => m.Login),
        title: 'Iniciar Sesión - iShowTime'
    },
    { 
        path: 'register', 
        loadComponent: () => import('./pages/register/register').then(m => m.Register),
        title: 'Registrarse - iShowTime'
    },
    { 
        path: 'nosotros', 
        loadComponent: () => import('./pages/nosotros/nosotros').then(m => m.Nosotros),
        title: 'Nosotros - iShowTime'
    },
    { 
        path: 'contacto', 
        loadComponent: () => import('./pages/contacto/contacto').then(m => m.Contacto),
        title: 'Contacto - iShowTime'
    },
    { 
        path: 'eventos', 
        loadComponent: () => import('./pages/eventos/eventos.component').then(m => m.EventosComponent),
        title: 'Eventos - iShowTime'
    },
    { 
        path: 'historial', 
        loadComponent: () => import('./pages/historial/historial.component').then(m => m.HistorialComponent),
        title: 'Historial de Eventos - iShowTime'
    },
    // Ruta para manejar páginas no encontradas
    { 
        path: '**', 
        redirectTo: 'inicio',
        title: 'Página no encontrada - iShowTime'
    }
];

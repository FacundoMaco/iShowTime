import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NotificacionesService, NotificacionEvento } from '../../notificaciones.service';
import { UserService } from '../../user.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-notificaciones',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit, OnDestroy {
  notificaciones: NotificacionEvento[] = [];
  notificacionesNoLeidas: NotificacionEvento[] = [];
  contadorNoLeidas = 0;
  
  // Estados de UI
  mostrarPanel = false;
  cargando = false;
  error = false;
  
  // Configuración
  autoRefresh = true;
  private refreshSubscription?: Subscription;

  constructor(
    private notificacionesService: NotificacionesService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.cargarNotificaciones();
    this.iniciarAutoRefresh();
  }

  ngOnDestroy(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  cargarNotificaciones(): void {
    const user = this.userService.getUser();
    if (!user) {
      console.error('Usuario no autenticado');
      return;
    }

    this.cargando = true;
    this.error = false;

    this.notificacionesService.obtenerNotificaciones(user.id)
      .subscribe({
        next: (notificaciones) => {
          this.notificaciones = notificaciones;
          this.actualizarNotificacionesNoLeidas();
          this.cargando = false;
        },
        error: (error) => {
          console.error('Error al cargar notificaciones:', error);
          this.error = true;
          this.cargando = false;
        }
      });
  }

  verificarEventosProximos(): void {
    const user = this.userService.getUser();
    if (!user) return;

    this.notificacionesService.verificarEventosProximos(user.id)
      .subscribe({
        next: (nuevasNotificaciones) => {
          if (nuevasNotificaciones.length > 0) {
            this.mostrarNotificacionNueva(nuevasNotificaciones[0]);
            this.cargarNotificaciones(); // Recargar lista
          }
        },
        error: (error) => {
          console.error('Error al verificar eventos próximos:', error);
        }
      });
  }

  marcarComoLeida(notificacion: NotificacionEvento): void {
    this.notificacionesService.marcarComoLeida(notificacion.id)
      .subscribe({
        next: () => {
          notificacion.leida = true;
          this.actualizarNotificacionesNoLeidas();
        },
        error: (error) => {
          console.error('Error al marcar como leída:', error);
        }
      });
  }

  marcarTodasComoLeidas(): void {
    const user = this.userService.getUser();
    if (!user) return;

    this.notificacionesService.marcarTodasComoLeidas(user.id)
      .subscribe({
        next: () => {
          this.notificaciones.forEach(n => n.leida = true);
          this.actualizarNotificacionesNoLeidas();
        },
        error: (error) => {
          console.error('Error al marcar todas como leídas:', error);
        }
      });
  }

  eliminarNotificacion(notificacion: NotificacionEvento): void {
    this.notificacionesService.eliminarNotificacion(notificacion.id)
      .subscribe({
        next: () => {
          this.notificaciones = this.notificaciones.filter(n => n.id !== notificacion.id);
          this.actualizarNotificacionesNoLeidas();
        },
        error: (error) => {
          console.error('Error al eliminar notificación:', error);
        }
      });
  }

  togglePanel(): void {
    this.mostrarPanel = !this.mostrarPanel;
    if (this.mostrarPanel) {
      this.cargarNotificaciones();
    }
  }

  cerrarPanel(): void {
    this.mostrarPanel = false;
  }

  toggleAutoRefresh(): void {
    this.autoRefresh = !this.autoRefresh;
    if (this.autoRefresh) {
      this.iniciarAutoRefresh();
    } else {
      this.detenerAutoRefresh();
    }
  }

  private iniciarAutoRefresh(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
    
    // Verificar eventos próximos cada 2 minutos
    this.refreshSubscription = interval(2 * 60 * 1000).subscribe(() => {
      this.verificarEventosProximos();
    });
  }

  private detenerAutoRefresh(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  private actualizarNotificacionesNoLeidas(): void {
    this.notificacionesNoLeidas = this.notificaciones.filter(n => !n.leida);
    this.contadorNoLeidas = this.notificacionesNoLeidas.length;
  }

  private mostrarNotificacionNueva(notificacion: NotificacionEvento): void {
    // Crear notificación del navegador si está disponible
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Evento Próximo', {
        body: `${notificacion.titulo} - ${notificacion.tiempoRestante}`,
        icon: '/assets/icons/notification-icon.png',
        tag: `evento-${notificacion.eventoId}`
      });
    }

    // Mostrar notificación en pantalla
    this.mostrarNotificacionPantalla(notificacion);
  }

  private mostrarNotificacionPantalla(notificacion: NotificacionEvento): void {
    // Crear elemento de notificación temporal
    const notificacionElement = document.createElement('div');
    notificacionElement.className = `notificacion-toast ${notificacion.tipo}`;
    notificacionElement.innerHTML = `
      <div class="notificacion-header">
        <span class="notificacion-titulo">${notificacion.titulo}</span>
        <button class="cerrar-notificacion" onclick="this.parentElement.parentElement.remove()">×</button>
      </div>
      <div class="notificacion-body">
        <p>${notificacion.lugar}</p>
        <p class="tiempo-restante">${notificacion.tiempoRestante}</p>
      </div>
    `;

    // Agregar estilos inline
    notificacionElement.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${this.obtenerColorNotificacion(notificacion.tipo)};
      color: white;
      padding: 1rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10000;
      max-width: 300px;
      animation: slideInRight 0.3s ease-out;
      font-family: 'Manrope', sans-serif;
    `;

    document.body.appendChild(notificacionElement);

    // Remover automáticamente después de 5 segundos
    setTimeout(() => {
      if (notificacionElement.parentElement) {
        notificacionElement.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
          if (notificacionElement.parentElement) {
            notificacionElement.remove();
          }
        }, 300);
      }
    }, 5000);
  }

  private obtenerColorNotificacion(tipo: string): string {
    switch (tipo) {
      case 'urgente':
        return 'linear-gradient(135deg, #dc3545, #c82333)';
      case 'hoy':
        return 'linear-gradient(135deg, #ffc107, #e0a800)';
      case 'proximo':
        return 'linear-gradient(135deg, #17a2b8, #138496)';
      default:
        return 'linear-gradient(135deg, #6c757d, #5a6268)';
    }
  }

  obtenerIconoTipo(tipo: string): string {
    switch (tipo) {
      case 'urgente':
        return '🚨';
      case 'hoy':
        return '📅';
      case 'proximo':
        return '⏰';
      default:
        return '📢';
    }
  }

  obtenerClaseTipo(tipo: string): string {
    return `tipo-${tipo}`;
  }

  formatearFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  solicitarPermisosNotificacion(): void {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          console.log('Permisos de notificación concedidos');
        }
      });
    }
  }
} 
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, interval } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

export interface NotificacionEvento {
  id: number;
  eventoId: number;
  titulo: string;
  fecha: string;
  lugar: string;
  tiempoRestante: string;
  tipo: 'proximo' | 'hoy' | 'urgente';
  leida: boolean;
  fechaCreacion: string;
}

export interface EventoProximo {
  id: number;
  titulo: string;
  fecha: string;
  lugar: string;
  descripcion: string;
  confirmado: boolean;
  tiempoRestante: {
    dias: number;
    horas: number;
    minutos: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  private apiUrl = 'https://api.ishowtime.com/notificaciones'; // URL del backend
  private notificacionesCache: NotificacionEvento[] = [];
  private eventosProximosCache: EventoProximo[] = [];
  private intervaloNotificaciones: any;

  constructor(private http: HttpClient) {
    // Cargar notificaciones desde localStorage
    const stored = localStorage.getItem('notificaciones_eventos');
    if (stored) {
      this.notificacionesCache = JSON.parse(stored);
    }
    
    // Iniciar monitoreo automático de eventos próximos
    this.iniciarMonitoreoAutomatico();
  }

  // Obtener notificaciones del usuario
  obtenerNotificaciones(userId: number): Observable<NotificacionEvento[]> {
    const url = `${this.apiUrl}/usuario/${userId}`;
    
    return this.http.get<NotificacionEvento[]>(url).pipe(
      map(notificaciones => {
        this.notificacionesCache = notificaciones;
        this.guardarNotificacionesLocal();
        return notificaciones;
      }),
      catchError(() => {
        // Fallback local
        return of(this.notificacionesCache);
      })
    );
  }

  // Obtener eventos próximos del usuario
  obtenerEventosProximos(userId: number): Observable<EventoProximo[]> {
    const url = `${this.apiUrl}/usuario/${userId}/eventos-proximos`;
    
    return this.http.get<EventoProximo[]>(url).pipe(
      map(eventos => {
        this.eventosProximosCache = eventos;
        return eventos;
      }),
      catchError(() => {
        // Fallback local - simular eventos próximos
        return of(this.generarEventosProximosSimulados());
      })
    );
  }

  // Marcar notificación como leída
  marcarComoLeida(notificacionId: number): Observable<boolean> {
    const url = `${this.apiUrl}/notificacion/${notificacionId}/leer`;
    
    return this.http.put<boolean>(url, {}).pipe(
      map(() => {
        const notificacion = this.notificacionesCache.find(n => n.id === notificacionId);
        if (notificacion) {
          notificacion.leida = true;
          this.guardarNotificacionesLocal();
        }
        return true;
      }),
      catchError(() => {
        // Fallback local
        const notificacion = this.notificacionesCache.find(n => n.id === notificacionId);
        if (notificacion) {
          notificacion.leida = true;
          this.guardarNotificacionesLocal();
        }
        return of(true);
      })
    );
  }

  // Marcar todas las notificaciones como leídas
  marcarTodasComoLeidas(userId: number): Observable<boolean> {
    const url = `${this.apiUrl}/usuario/${userId}/marcar-todas-leidas`;
    
    return this.http.put<boolean>(url, {}).pipe(
      map(() => {
        this.notificacionesCache.forEach(n => n.leida = true);
        this.guardarNotificacionesLocal();
        return true;
      }),
      catchError(() => {
        // Fallback local
        this.notificacionesCache.forEach(n => n.leida = true);
        this.guardarNotificacionesLocal();
        return of(true);
      })
    );
  }

  // Eliminar notificación
  eliminarNotificacion(notificacionId: number): Observable<boolean> {
    const url = `${this.apiUrl}/notificacion/${notificacionId}`;
    
    return this.http.delete<boolean>(url).pipe(
      map(() => {
        this.notificacionesCache = this.notificacionesCache.filter(n => n.id !== notificacionId);
        this.guardarNotificacionesLocal();
        return true;
      }),
      catchError(() => {
        // Fallback local
        this.notificacionesCache = this.notificacionesCache.filter(n => n.id !== notificacionId);
        this.guardarNotificacionesLocal();
        return of(true);
      })
    );
  }

  // Obtener notificaciones no leídas
  obtenerNoLeidas(): NotificacionEvento[] {
    return this.notificacionesCache.filter(n => !n.leida);
  }

  // Obtener contador de notificaciones no leídas
  obtenerContadorNoLeidas(): number {
    return this.notificacionesCache.filter(n => !n.leida).length;
  }

  // Verificar si hay eventos próximos que requieren notificación
  verificarEventosProximos(userId: number): Observable<NotificacionEvento[]> {
    return this.obtenerEventosProximos(userId).pipe(
      map(eventos => {
        const nuevasNotificaciones: NotificacionEvento[] = [];
        
        eventos.forEach(evento => {
          const tiempoRestante = this.calcularTiempoRestante(evento.fecha);
          const tipo = this.determinarTipoNotificacion(tiempoRestante);
          
          // Verificar si ya existe una notificación para este evento
          const existeNotificacion = this.notificacionesCache.some(
            n => n.eventoId === evento.id && !n.leida
          );
          
          if (!existeNotificacion && tipo !== null) {
            const notificacion: NotificacionEvento = {
              id: Date.now() + Math.random(),
              eventoId: evento.id,
              titulo: evento.titulo,
              fecha: evento.fecha,
              lugar: evento.lugar,
              tiempoRestante: this.formatearTiempoRestante(tiempoRestante),
              tipo,
              leida: false,
              fechaCreacion: new Date().toISOString()
            };
            
            nuevasNotificaciones.push(notificacion);
            this.notificacionesCache.unshift(notificacion);
          }
        });
        
        if (nuevasNotificaciones.length > 0) {
          this.guardarNotificacionesLocal();
        }
        
        return nuevasNotificaciones;
      })
    );
  }

  // Iniciar monitoreo automático (cada 5 minutos)
  iniciarMonitoreoAutomatico(): void {
    this.intervaloNotificaciones = interval(5 * 60 * 1000); // 5 minutos
  }

  // Detener monitoreo automático
  detenerMonitoreoAutomatico(): void {
    if (this.intervaloNotificaciones) {
      this.intervaloNotificaciones.unsubscribe();
    }
  }

  // Calcular tiempo restante hasta el evento
  private calcularTiempoRestante(fechaEvento: string): { dias: number; horas: number; minutos: number } {
    const ahora = new Date();
    const evento = new Date(fechaEvento);
    const diferencia = evento.getTime() - ahora.getTime();
    
    if (diferencia <= 0) {
      return { dias: 0, horas: 0, minutos: 0 };
    }
    
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    
    return { dias, horas, minutos };
  }

  // Determinar tipo de notificación basado en tiempo restante
  private determinarTipoNotificacion(tiempo: { dias: number; horas: number; minutos: number }): 'proximo' | 'hoy' | 'urgente' | null {
    const totalHoras = tiempo.dias * 24 + tiempo.horas;
    
    if (tiempo.dias === 0 && tiempo.horas === 0 && tiempo.minutos <= 30) {
      return 'urgente'; // Menos de 30 minutos
    } else if (tiempo.dias === 0 && tiempo.horas < 24) {
      return 'hoy'; // Hoy
    } else if (tiempo.dias <= 7) {
      return 'proximo'; // Próxima semana
    }
    
    return null; // No requiere notificación
  }

  // Formatear tiempo restante para mostrar
  private formatearTiempoRestante(tiempo: { dias: number; horas: number; minutos: number }): string {
    if (tiempo.dias > 0) {
      return `${tiempo.dias} día${tiempo.dias > 1 ? 's' : ''}`;
    } else if (tiempo.horas > 0) {
      return `${tiempo.horas} hora${tiempo.horas > 1 ? 's' : ''}`;
    } else {
      return `${tiempo.minutos} minuto${tiempo.minutos > 1 ? 's' : ''}`;
    }
  }

  // Generar eventos próximos simulados para demo
  private generarEventosProximosSimulados(): EventoProximo[] {
    const ahora = new Date();
    const eventos: EventoProximo[] = [
      {
        id: 1,
        titulo: 'Hackathon 2024',
        fecha: new Date(ahora.getTime() + 2 * 60 * 60 * 1000).toISOString(), // 2 horas
        lugar: 'Sala de Innovación',
        descripcion: 'Competencia de programación y tecnología.',
        confirmado: true,
        tiempoRestante: { dias: 0, horas: 2, minutos: 0 }
      },
      {
        id: 2,
        titulo: 'Concierto de Primavera',
        fecha: new Date(ahora.getTime() + 24 * 60 * 60 * 1000).toISOString(), // 1 día
        lugar: 'Parque Principal',
        descripcion: 'Música en vivo para celebrar la primavera.',
        confirmado: true,
        tiempoRestante: { dias: 1, horas: 0, minutos: 0 }
      },
      {
        id: 3,
        titulo: 'Feria Universitaria',
        fecha: new Date(ahora.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 días
        lugar: 'Auditorio Central',
        descripcion: 'Una feria para conocer las actividades universitarias.',
        confirmado: false,
        tiempoRestante: { dias: 3, horas: 0, minutos: 0 }
      }
    ];
    
    return eventos;
  }

  // Limpiar notificaciones antiguas (más de 30 días)
  limpiarNotificacionesAntiguas(): void {
    const treintaDiasAtras = new Date();
    treintaDiasAtras.setDate(treintaDiasAtras.getDate() - 30);
    
    this.notificacionesCache = this.notificacionesCache.filter(
      n => new Date(n.fechaCreacion) > treintaDiasAtras
    );
    
    this.guardarNotificacionesLocal();
  }

  private guardarNotificacionesLocal(): void {
    localStorage.setItem('notificaciones_eventos', JSON.stringify(this.notificacionesCache));
  }
} 
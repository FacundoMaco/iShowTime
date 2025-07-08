import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface ConfirmacionAsistencia {
  id: number;
  eventoId: number;
  userId: number;
  confirmado: boolean;
  fechaConfirmacion: string;
}

export interface Evento {
  id: number;
  titulo: string;
  fecha: string;
  lugar: string;
  descripcion: string;
  confirmaciones?: ConfirmacionAsistencia[];
}

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  private apiUrl = 'https://api.ishowtime.com/eventos'; // URL del backend
  private confirmaciones: ConfirmacionAsistencia[] = [];

  constructor(private http: HttpClient) {
    // Cargar confirmaciones desde localStorage
    const stored = localStorage.getItem('confirmaciones_asistencia');
    if (stored) {
      this.confirmaciones = JSON.parse(stored);
    }
  }

  // Confirmar asistencia a un evento
  confirmarAsistencia(eventoId: number, userId: number): Observable<boolean> {
    const confirmacion: ConfirmacionAsistencia = {
      id: Date.now(),
      eventoId,
      userId,
      confirmado: true,
      fechaConfirmacion: new Date().toISOString()
    };

    // Simular llamada al backend
    return this.http.post(`${this.apiUrl}/${eventoId}/confirmar`, confirmacion).pipe(
      map(() => {
        this.confirmaciones.push(confirmacion);
        this.guardarConfirmaciones();
        return true;
      }),
      catchError(() => {
        // Fallback local si el backend no está disponible
        this.confirmaciones.push(confirmacion);
        this.guardarConfirmaciones();
        return of(true);
      })
    );
  }

  // Cancelar confirmación de asistencia
  cancelarAsistencia(eventoId: number, userId: number): Observable<boolean> {
    // Simular llamada al backend
    return this.http.delete(`${this.apiUrl}/${eventoId}/confirmar`).pipe(
      map(() => {
        this.confirmaciones = this.confirmaciones.filter(
          c => !(c.eventoId === eventoId && c.userId === userId)
        );
        this.guardarConfirmaciones();
        return true;
      }),
      catchError(() => {
        // Fallback local si el backend no está disponible
        this.confirmaciones = this.confirmaciones.filter(
          c => !(c.eventoId === eventoId && c.userId === userId)
        );
        this.guardarConfirmaciones();
        return of(true);
      })
    );
  }

  // Verificar si el usuario está confirmado para un evento
  estaConfirmado(eventoId: number, userId: number): boolean {
    return this.confirmaciones.some(
      c => c.eventoId === eventoId && c.userId === userId && c.confirmado
    );
  }

  // Obtener confirmaciones de un usuario
  getConfirmacionesUsuario(userId: number): ConfirmacionAsistencia[] {
    return this.confirmaciones.filter(c => c.userId === userId);
  }

  // Obtener estadísticas de confirmación para un evento
  getEstadisticasEvento(eventoId: number): { confirmados: number; total: number } {
    const confirmados = this.confirmaciones.filter(
      c => c.eventoId === eventoId && c.confirmado
    ).length;
    return { confirmados, total: this.confirmaciones.length };
  }

  private guardarConfirmaciones(): void {
    localStorage.setItem('confirmaciones_asistencia', JSON.stringify(this.confirmaciones));
  }
} 
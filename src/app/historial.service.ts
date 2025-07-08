import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface EventoHistorial {
  id: number;
  titulo: string;
  fecha: string;
  lugar: string;
  descripcion: string;
  fechaAsistencia: string;
  estado: 'asistido' | 'cancelado' | 'pendiente';
}

export interface HistorialResponse {
  eventos: EventoHistorial[];
  total: number;
  pagina: number;
  porPagina: number;
}

@Injectable({
  providedIn: 'root'
})
export class HistorialService {
  private apiUrl = 'https://api.ishowtime.com/historial'; // URL del backend
  private historialCache: EventoHistorial[] = [];

  constructor(private http: HttpClient) {
    // Cargar historial desde localStorage como fallback
    const stored = localStorage.getItem('historial_eventos');
    if (stored) {
      this.historialCache = JSON.parse(stored);
    }
  }

  // Obtener historial de eventos asistidos del usuario
  obtenerHistorialUsuario(userId: number, pagina: number = 1, porPagina: number = 10): Observable<HistorialResponse> {
    const url = `${this.apiUrl}/usuario/${userId}?pagina=${pagina}&porPagina=${porPagina}`;
    
    return this.http.get<HistorialResponse>(url).pipe(
      map(response => {
        this.historialCache = response.eventos;
        this.guardarHistorialLocal();
        return response;
      }),
      catchError(() => {
        // Fallback local si el backend no está disponible
        const eventosFiltrados = this.historialCache
          .filter(evento => evento.estado === 'asistido')
          .sort((a, b) => new Date(b.fechaAsistencia).getTime() - new Date(a.fechaAsistencia).getTime());
        
        const inicio = (pagina - 1) * porPagina;
        const fin = inicio + porPagina;
        const eventosPagina = eventosFiltrados.slice(inicio, fin);
        
        return of({
          eventos: eventosPagina,
          total: eventosFiltrados.length,
          pagina,
          porPagina
        });
      })
    );
  }

  // Obtener estadísticas del historial
  obtenerEstadisticasHistorial(userId: number): Observable<{
    totalAsistidos: number;
    totalCancelados: number;
    totalPendientes: number;
    primerEvento: string | null;
    ultimoEvento: string | null;
  }> {
    const url = `${this.apiUrl}/usuario/${userId}/estadisticas`;
    
    return this.http.get<any>(url).pipe(
      catchError(() => {
        // Fallback local
        const eventos = this.historialCache;
        const totalAsistidos = eventos.filter(e => e.estado === 'asistido').length;
        const totalCancelados = eventos.filter(e => e.estado === 'cancelado').length;
        const totalPendientes = eventos.filter(e => e.estado === 'pendiente').length;
        
        const fechasAsistencia = eventos
          .filter(e => e.estado === 'asistido')
          .map(e => e.fechaAsistencia)
          .sort();
        
        return of({
          totalAsistidos,
          totalCancelados,
          totalPendientes,
          primerEvento: fechasAsistencia[0] || null,
          ultimoEvento: fechasAsistencia[fechasAsistencia.length - 1] || null
        });
      })
    );
  }

  // Buscar eventos en el historial
  buscarEnHistorial(userId: number, termino: string): Observable<EventoHistorial[]> {
    const url = `${this.apiUrl}/usuario/${userId}/buscar?q=${encodeURIComponent(termino)}`;
    
    return this.http.get<EventoHistorial[]>(url).pipe(
      catchError(() => {
        // Fallback local
        const eventos = this.historialCache.filter(e => e.estado === 'asistido');
        const terminoLower = termino.toLowerCase();
        
        return of(eventos.filter(evento => 
          evento.titulo.toLowerCase().includes(terminoLower) ||
          evento.lugar.toLowerCase().includes(terminoLower) ||
          evento.descripcion.toLowerCase().includes(terminoLower)
        ));
      })
    );
  }

  // Filtrar historial por fecha
  filtrarPorFecha(userId: number, fechaInicio: string, fechaFin: string): Observable<EventoHistorial[]> {
    const url = `${this.apiUrl}/usuario/${userId}/filtrar`;
    const params = { fechaInicio, fechaFin };
    
    return this.http.post<EventoHistorial[]>(url, params).pipe(
      catchError(() => {
        // Fallback local
        const eventos = this.historialCache.filter(e => e.estado === 'asistido');
        const inicio = new Date(fechaInicio);
        const fin = new Date(fechaFin);
        
        return of(eventos.filter(evento => {
          const fechaEvento = new Date(evento.fechaAsistencia);
          return fechaEvento >= inicio && fechaEvento <= fin;
        }));
      })
    );
  }

  // Agregar evento al historial (cuando se confirma asistencia)
  agregarAlHistorial(evento: EventoHistorial): void {
    this.historialCache.unshift(evento);
    this.guardarHistorialLocal();
  }

  // Actualizar estado de evento en historial
  actualizarEstadoHistorial(eventoId: number, nuevoEstado: 'asistido' | 'cancelado' | 'pendiente'): void {
    const evento = this.historialCache.find(e => e.id === eventoId);
    if (evento) {
      evento.estado = nuevoEstado;
      evento.fechaAsistencia = new Date().toISOString();
      this.guardarHistorialLocal();
    }
  }

  // Limpiar historial local
  limpiarHistorialLocal(): void {
    this.historialCache = [];
    localStorage.removeItem('historial_eventos');
  }

  private guardarHistorialLocal(): void {
    localStorage.setItem('historial_eventos', JSON.stringify(this.historialCache));
  }
} 
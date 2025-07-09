import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { HistorialService, EventoHistorial, HistorialResponse } from '../../historial.service';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
  historial: EventoHistorial[] = [];
  estadisticas: {
    totalAsistidos: number;
    totalCancelados: number;
    totalPendientes: number;
    primerEvento: string | null;
    ultimoEvento: string | null;
  } = {
    totalAsistidos: 0,
    totalCancelados: 0,
    totalPendientes: 0,
    primerEvento: null,
    ultimoEvento: null
  };

  // Paginación
  paginaActual = 1;
  porPagina = 10;
  totalEventos = 0;
  totalPaginas = 0;

  // Estados de carga
  cargando = false;
  cargandoEstadisticas = false;

  // Filtros
  filtroForm: FormGroup;
  terminoBusqueda = '';
  fechaInicio = '';
  fechaFin = '';

  // Estados de UI
  mostrarFiltros = false;
  sinResultados = false;

  constructor(
    private historialService: HistorialService,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.filtroForm = this.fb.group({
      terminoBusqueda: [''],
      fechaInicio: [''],
      fechaFin: ['']
    });
  }

  ngOnInit(): void {
    this.cargarHistorial();
    this.cargarEstadisticas();
  }

  cargarHistorial(): void {
    const user = this.userService.getUser();
    if (!user) {
      console.error('Usuario no autenticado');
      return;
    }

    this.cargando = true;
    this.sinResultados = false;

    this.historialService.obtenerHistorialUsuario(user.id, this.paginaActual, this.porPagina)
      .subscribe({
        next: (response: HistorialResponse) => {
          this.historial = response.eventos;
          this.totalEventos = response.total;
          this.totalPaginas = Math.ceil(this.totalEventos / this.porPagina);
          this.sinResultados = this.historial.length === 0;
          this.cargando = false;
        },
        error: (error) => {
          console.error('Error al cargar historial:', error);
          this.cargando = false;
          this.sinResultados = true;
        }
      });
  }

  cargarEstadisticas(): void {
    const user = this.userService.getUser();
    if (!user) return;

    this.cargandoEstadisticas = true;

    this.historialService.obtenerEstadisticasHistorial(user.id)
      .subscribe({
        next: (stats) => {
          this.estadisticas = stats;
          this.cargandoEstadisticas = false;
        },
        error: (error) => {
          console.error('Error al cargar estadísticas:', error);
          this.cargandoEstadisticas = false;
        }
      });
  }

  buscarEventos(): void {
    const user = this.userService.getUser();
    if (!user || !this.terminoBusqueda.trim()) {
      this.cargarHistorial();
      return;
    }

    this.cargando = true;
    this.sinResultados = false;

    this.historialService.buscarEnHistorial(user.id, this.terminoBusqueda.trim())
      .subscribe({
        next: (eventos) => {
          this.historial = eventos;
          this.sinResultados = eventos.length === 0;
          this.cargando = false;
        },
        error: (error) => {
          console.error('Error en búsqueda:', error);
          this.cargando = false;
          this.sinResultados = true;
        }
      });
  }

  filtrarPorFecha(): void {
    const user = this.userService.getUser();
    if (!user || (!this.fechaInicio && !this.fechaFin)) {
      this.cargarHistorial();
      return;
    }

    // Si no se especifica fecha fin, usar fecha actual
    const fechaFin = this.fechaFin || new Date().toISOString().split('T')[0];

    this.cargando = true;
    this.sinResultados = false;

    this.historialService.filtrarPorFecha(user.id, this.fechaInicio, fechaFin)
      .subscribe({
        next: (eventos) => {
          this.historial = eventos;
          this.sinResultados = eventos.length === 0;
          this.cargando = false;
        },
        error: (error) => {
          console.error('Error al filtrar por fecha:', error);
          this.cargando = false;
          this.sinResultados = true;
        }
      });
  }

  limpiarFiltros(): void {
    this.filtroForm.reset();
    this.terminoBusqueda = '';
    this.fechaInicio = '';
    this.fechaFin = '';
    this.cargarHistorial();
  }

  cambiarPagina(pagina: number): void {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaActual = pagina;
      this.cargarHistorial();
    }
  }

  obtenerPaginas(): number[] {
    const paginas: number[] = [];
    const inicio = Math.max(1, this.paginaActual - 2);
    const fin = Math.min(this.totalPaginas, this.paginaActual + 2);

    for (let i = inicio; i <= fin; i++) {
      paginas.push(i);
    }
    return paginas;
  }

  formatearFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  obtenerEstadoClase(estado: string): string {
    switch (estado) {
      case 'asistido': return 'estado-asistido';
      case 'cancelado': return 'estado-cancelado';
      case 'pendiente': return 'estado-pendiente';
      default: return '';
    }
  }

  obtenerEstadoTexto(estado: string): string {
    switch (estado) {
      case 'asistido': return '✓ Asistido';
      case 'cancelado': return '✗ Cancelado';
      case 'pendiente': return '⏳ Pendiente';
      default: return estado;
    }
  }

  toggleFiltros(): void {
    this.mostrarFiltros = !this.mostrarFiltros;
  }

  exportarHistorial(): void {
    const user = this.userService.getUser();
    if (!user) return;

    // Crear CSV del historial
    const csvContent = this.crearCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `historial_eventos_${user.id}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  private crearCSV(): string {
    const headers = ['Título', 'Fecha', 'Lugar', 'Estado', 'Fecha Asistencia'];
    const rows = this.historial.map(evento => [
      evento.titulo,
      evento.fecha,
      evento.lugar,
      this.obtenerEstadoTexto(evento.estado),
      evento.fechaAsistencia
    ]);

    return [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');
  }
} 
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { EventosService, Evento } from '../../eventos.service';
import { UserService } from '../../user.service';
import { Subject, takeUntil } from 'rxjs';

interface EventoLocal {
  id: number;
  titulo: string;
  fecha: string;
  lugar: string;
  descripcion: string;
  verificado?: boolean;
}

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventosComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  
  // Cache para operaciones costosas
  private _eventosVerificadosCache: EventoLocal[] | null = null;
  private _eventosNoVerificadosCache: EventoLocal[] | null = null;
  private _eventosAsistidosCache: Set<number> = new Set();

  eventos: EventoLocal[] = [
    { id: 1, titulo: 'Feria Universitaria', fecha: '2024-07-10', lugar: 'Auditorio Central', descripcion: 'Una feria para conocer las actividades universitarias.', verificado: true },
    { id: 2, titulo: 'Hackathon 2024', fecha: '2024-08-05', lugar: 'Sala de Innovación', descripcion: 'Competencia de programación y tecnología.', verificado: true },
    { id: 3, titulo: 'Concierto de Primavera', fecha: '2024-09-15', lugar: 'Parque Principal', descripcion: 'Música en vivo para celebrar la primavera.', verificado: false },
    { id: 4, titulo: 'Conferencia de Tecnología', fecha: '2024-10-20', lugar: 'Centro de Convenciones', descripcion: 'Evento oficial sobre las últimas tendencias en tecnología.', verificado: true },
    { id: 5, titulo: 'Meetup de Desarrolladores', fecha: '2024-11-05', lugar: 'Café Tech', descripcion: 'Encuentro informal de desarrolladores para networking.', verificado: false }
  ];
  eventosAsistidos: EventoLocal[] = [];

  showFormModal = false;
  showDetalleModal = false;
  editando = false;
  eventoForm: FormGroup;
  eventoDetalle: EventoLocal | null = null;
  eventoEditando: EventoLocal | null = null;
  confirmandoAsistencia = false;

  constructor(
    private fb: FormBuilder,
    private eventosService: EventosService,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {
    this.eventoForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(40)]],
      fecha: ['', Validators.required],
      lugar: ['', [Validators.required, Validators.maxLength(40)]],
      descripcion: ['', [Validators.maxLength(200)]]
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // TrackBy functions para optimizar ngFor
  trackByEventoId(index: number, evento: EventoLocal): number {
    return evento.id;
  }

  trackByEventoAsistidoId(index: number, evento: EventoLocal): number {
    return evento.id;
  }

  openCreateModal() {
    this.editando = false;
    this.eventoForm.reset();
    this.showFormModal = true;
    this.cdr.markForCheck();
  }

  openEditModal(evento: Evento) {
    this.editando = true;
    this.eventoEditando = evento;
    this.eventoForm.setValue({
      titulo: evento.titulo,
      fecha: evento.fecha,
      lugar: evento.lugar,
      descripcion: evento.descripcion
    });
    this.showFormModal = true;
    this.cdr.markForCheck();
  }

  closeFormModal() {
    this.showFormModal = false;
    this.eventoEditando = null;
    this.cdr.markForCheck();
  }

  guardarEvento() {
    if (this.eventoForm.invalid) return;
    const formValue = this.eventoForm.value;
    if (this.editando && this.eventoEditando) {
      // Editar evento existente
      this.eventoEditando.titulo = formValue.titulo;
      this.eventoEditando.fecha = formValue.fecha;
      this.eventoEditando.lugar = formValue.lugar;
      this.eventoEditando.descripcion = formValue.descripcion;
      // Invalidar cache
      this.invalidarCache();
    } else {
      // Crear nuevo evento
      const nuevoEvento: Evento = {
        id: Date.now(),
        ...formValue
      };
      this.eventos = [...this.eventos, nuevoEvento];
      // Invalidar cache
      this.invalidarCache();
    }
    this.closeFormModal();
  }

  eliminarEvento(evento: Evento) {
    this.eventos = this.eventos.filter(e => e.id !== evento.id);
    this.eventosAsistidos = this.eventosAsistidos.filter(e => e.id !== evento.id);
    this._eventosAsistidosCache.delete(evento.id);
    
    if (this.eventoDetalle && this.eventoDetalle.id === evento.id) {
      this.closeDetalleModal();
    }
    
    // Invalidar cache
    this.invalidarCache();
    this.cdr.markForCheck();
  }

  openDetalleModal(evento: Evento) {
    this.eventoDetalle = evento;
    this.showDetalleModal = true;
    this.cdr.markForCheck();
  }

  closeDetalleModal() {
    this.showDetalleModal = false;
    this.eventoDetalle = null;
    this.cdr.markForCheck();
  }

  async confirmarAsistencia(evento: EventoLocal) {
    const user = this.userService.getUser();
    if (!user) {
      alert('Debes iniciar sesión para confirmar asistencia');
      return;
    }

    this.confirmandoAsistencia = true;
    this.cdr.markForCheck();
    
    try {
      const resultado = await this.eventosService.confirmarAsistencia(evento.id, user.id).toPromise();
      if (resultado) {
        this.eventosAsistidos = [...this.eventosAsistidos, evento];
        this._eventosAsistidosCache.add(evento.id);
        this.mostrarMensajeConfirmacion('¡Asistencia confirmada exitosamente!');
      }
    } catch (error) {
      console.error('Error al confirmar asistencia:', error);
      this.mostrarMensajeConfirmacion('Error al confirmar asistencia. Inténtalo de nuevo.');
    } finally {
      this.confirmandoAsistencia = false;
      this.cdr.markForCheck();
    }
  }

  async cancelarAsistencia(evento: EventoLocal) {
    const user = this.userService.getUser();
    if (!user) {
      alert('Debes iniciar sesión para cancelar asistencia');
      return;
    }

    this.confirmandoAsistencia = true;
    this.cdr.markForCheck();
    
    try {
      const resultado = await this.eventosService.cancelarAsistencia(evento.id, user.id).toPromise();
      if (resultado) {
        this.eventosAsistidos = this.eventosAsistidos.filter(e => e.id !== evento.id);
        this._eventosAsistidosCache.delete(evento.id);
        this.mostrarMensajeConfirmacion('Asistencia cancelada exitosamente');
      }
    } catch (error) {
      console.error('Error al cancelar asistencia:', error);
      this.mostrarMensajeConfirmacion('Error al cancelar asistencia. Inténtalo de nuevo.');
    } finally {
      this.confirmandoAsistencia = false;
      this.cdr.markForCheck();
    }
  }

  toggleAsistencia(evento: EventoLocal) {
    if (this.isAsistiendo(evento)) {
      this.cancelarAsistencia(evento);
    } else {
      this.confirmarAsistencia(evento);
    }
  }

  isAsistiendo(evento: EventoLocal): boolean {
    return this._eventosAsistidosCache.has(evento.id);
  }

  getEstadisticasEvento(eventoId: number) {
    return this.eventosService.getEstadisticasEvento(eventoId);
  }

  // Métodos optimizados para manejo de verificación
  isEventoVerificado(evento: EventoLocal): boolean {
    return evento.verificado === true;
  }

  getEventosVerificados(): EventoLocal[] {
    if (this._eventosVerificadosCache === null) {
      this._eventosVerificadosCache = this.eventos.filter(evento => evento.verificado);
    }
    return this._eventosVerificadosCache;
  }

  getEventosNoVerificados(): EventoLocal[] {
    if (this._eventosNoVerificadosCache === null) {
      this._eventosNoVerificadosCache = this.eventos.filter(evento => !evento.verificado);
    }
    return this._eventosNoVerificadosCache;
  }

  toggleVerificacion(evento: EventoLocal) {
    // Solo para demostración - en producción esto sería manejado por admin
    evento.verificado = !evento.verificado;
    this.invalidarCache();
    this.mostrarMensajeConfirmacion(
      evento.verificado ? 'Evento marcado como verificado' : 'Verificación removida del evento'
    );
    this.cdr.markForCheck();
  }

  // Método para invalidar cache cuando los datos cambian
  private invalidarCache() {
    this._eventosVerificadosCache = null;
    this._eventosNoVerificadosCache = null;
  }

  private mostrarMensajeConfirmacion(mensaje: string) {
    // Crear un elemento temporal para mostrar el mensaje
    const mensajeElement = document.createElement('div');
    mensajeElement.className = 'mensaje-confirmacion';
    mensajeElement.textContent = mensaje;
    mensajeElement.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #28a745;
      color: white;
      padding: 15px 20px;
      border-radius: 5px;
      z-index: 1000;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      animation: slideIn 0.3s ease;
    `;

    // Agregar estilos de animación
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);

    document.body.appendChild(mensajeElement);

    // Remover el mensaje después de 3 segundos
    setTimeout(() => {
      if (mensajeElement.parentNode) {
        mensajeElement.parentNode.removeChild(mensajeElement);
      }
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    }, 3000);
  }
} 
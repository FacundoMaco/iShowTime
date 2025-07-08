import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { EventosService, Evento } from '../../eventos.service';
import { UserService } from '../../user.service';

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
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent {
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
    private userService: UserService
  ) {
    this.eventoForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(40)]],
      fecha: ['', Validators.required],
      lugar: ['', [Validators.required, Validators.maxLength(40)]],
      descripcion: ['', [Validators.maxLength(200)]]
    });
  }

  openCreateModal() {
    this.editando = false;
    this.eventoForm.reset();
    this.showFormModal = true;
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
  }

  closeFormModal() {
    this.showFormModal = false;
    this.eventoEditando = null;
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
    } else {
      // Crear nuevo evento
      const nuevoEvento: Evento = {
        id: Date.now(),
        ...formValue
      };
      this.eventos.push(nuevoEvento);
    }
    this.closeFormModal();
  }

  eliminarEvento(evento: Evento) {
    this.eventos = this.eventos.filter(e => e.id !== evento.id);
    this.eventosAsistidos = this.eventosAsistidos.filter(e => e.id !== evento.id);
    if (this.eventoDetalle && this.eventoDetalle.id === evento.id) {
      this.closeDetalleModal();
    }
  }

  openDetalleModal(evento: Evento) {
    this.eventoDetalle = evento;
    this.showDetalleModal = true;
  }

  closeDetalleModal() {
    this.showDetalleModal = false;
    this.eventoDetalle = null;
  }

  async confirmarAsistencia(evento: EventoLocal) {
    const user = this.userService.getUser();
    if (!user) {
      alert('Debes iniciar sesión para confirmar asistencia');
      return;
    }

    this.confirmandoAsistencia = true;
    try {
      const resultado = await this.eventosService.confirmarAsistencia(evento.id, user.id).toPromise();
      if (resultado) {
        this.eventosAsistidos.push(evento);
        this.mostrarMensajeConfirmacion('¡Asistencia confirmada exitosamente!');
      }
    } catch (error) {
      console.error('Error al confirmar asistencia:', error);
      this.mostrarMensajeConfirmacion('Error al confirmar asistencia. Inténtalo de nuevo.');
    } finally {
      this.confirmandoAsistencia = false;
    }
  }

  async cancelarAsistencia(evento: EventoLocal) {
    const user = this.userService.getUser();
    if (!user) {
      alert('Debes iniciar sesión para cancelar asistencia');
      return;
    }

    this.confirmandoAsistencia = true;
    try {
      const resultado = await this.eventosService.cancelarAsistencia(evento.id, user.id).toPromise();
      if (resultado) {
        this.eventosAsistidos = this.eventosAsistidos.filter(e => e.id !== evento.id);
        this.mostrarMensajeConfirmacion('Asistencia cancelada exitosamente');
      }
    } catch (error) {
      console.error('Error al cancelar asistencia:', error);
      this.mostrarMensajeConfirmacion('Error al cancelar asistencia. Inténtalo de nuevo.');
    } finally {
      this.confirmandoAsistencia = false;
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
    return this.eventosAsistidos.some(e => e.id === evento.id);
  }

  getEstadisticasEvento(eventoId: number) {
    return this.eventosService.getEstadisticasEvento(eventoId);
  }

  // Métodos para manejo de verificación
  isEventoVerificado(evento: EventoLocal): boolean {
    return evento.verificado === true;
  }

  getEventosVerificados(): EventoLocal[] {
    return this.eventos.filter(evento => evento.verificado);
  }

  getEventosNoVerificados(): EventoLocal[] {
    return this.eventos.filter(evento => !evento.verificado);
  }

  toggleVerificacion(evento: EventoLocal) {
    // Solo para demostración - en producción esto sería manejado por admin
    evento.verificado = !evento.verificado;
    this.mostrarMensajeConfirmacion(
      evento.verificado ? 'Evento marcado como verificado' : 'Verificación removida del evento'
    );
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
      background: #2c3e50;
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      z-index: 3000;
      font-family: 'Manrope', sans-serif;
      font-weight: 600;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(mensajeElement);
    
    setTimeout(() => {
      mensajeElement.style.animation = 'slideOut 0.3s ease-in';
      setTimeout(() => {
        document.body.removeChild(mensajeElement);
      }, 300);
    }, 3000);
  }
} 
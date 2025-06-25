import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Evento {
  id: number;
  titulo: string;
  fecha: string;
  lugar: string;
  descripcion: string;
}

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent {
  eventos: Evento[] = [
    { id: 1, titulo: 'Feria Universitaria', fecha: '2024-07-10', lugar: 'Auditorio Central', descripcion: 'Una feria para conocer las actividades universitarias.' },
    { id: 2, titulo: 'Hackathon 2024', fecha: '2024-08-05', lugar: 'Sala de Innovación', descripcion: 'Competencia de programación y tecnología.' },
    { id: 3, titulo: 'Concierto de Primavera', fecha: '2024-09-15', lugar: 'Parque Principal', descripcion: 'Música en vivo para celebrar la primavera.' }
  ];
  eventosAsistidos: Evento[] = [];

  showFormModal = false;
  showDetalleModal = false;
  editando = false;
  eventoForm: FormGroup;
  eventoDetalle: Evento | null = null;
  eventoEditando: Evento | null = null;

  constructor(private fb: FormBuilder) {
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

  toggleAsistencia(evento: Evento) {
    if (this.isAsistiendo(evento)) {
      this.eventosAsistidos = this.eventosAsistidos.filter(e => e.id !== evento.id);
    } else {
      this.eventosAsistidos.push(evento);
    }
  }

  isAsistiendo(evento: Evento): boolean {
    return this.eventosAsistidos.some(e => e.id === evento.id);
  }
} 
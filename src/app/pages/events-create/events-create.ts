import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService, Event } from '../../services/event.service';

interface EventForm {
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  description: string;
  organizer: string;
  price: string;
  maxAttendees: number;
  contactEmail: string;
  contactPhone: string;
}

@Component({
  selector: 'app-events-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './events-create.html',
  styleUrl: './events-create.css'
})
export class EventsCreate {
  eventForm: EventForm = {
    title: '',
    category: '',
    date: '',
    time: '',
    location: '',
    description: '',
    organizer: '',
    price: '',
    maxAttendees: 50,
    contactEmail: '',
    contactPhone: ''
  };

  categories = [
    'tecnología',
    'académicos',
    'culturales',
    'deportivos',
    'sociales',
    'empresariales',
    'arte',
    'música',
    'otros'
  ];

  showSuccess: boolean = false;
  showError: boolean = false;
  errorMessage: string = '';
  isSubmitting: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private eventService: EventService
  ) { }

  onSubmit(): void {
    if (this.validateForm()) {
      this.isSubmitting = true;
      this.showError = false;
      
      // Usar el servicio para guardar el evento
      this.eventService.saveEvent(this.eventForm)
        .then((savedEvent: Event) => {
          this.isSubmitting = false;
          this.showSuccess = true;
          this.resetForm();
          
          // Ocultar mensaje de éxito después de 3 segundos
          setTimeout(() => {
            this.showSuccess = false;
            this.router.navigate(['/eventos-personales']);
          }, 3000);
        })
        .catch((error: Error) => {
          this.isSubmitting = false;
          this.showError = true;
          this.errorMessage = error.message || 'Error al guardar el evento. Inténtalo de nuevo.';
        });
    }
  }

  validateForm(): boolean {
    this.showError = false;
    this.errorMessage = '';

    if (!this.eventForm.title.trim()) {
      this.showError = true;
      this.errorMessage = 'El título del evento es requerido';
      return false;
    }

    if (!this.eventForm.category) {
      this.showError = true;
      this.errorMessage = 'Debes seleccionar una categoría';
      return false;
    }

    if (!this.eventForm.date) {
      this.showError = true;
      this.errorMessage = 'La fecha del evento es requerida';
      return false;
    }

    if (!this.eventForm.time) {
      this.showError = true;
      this.errorMessage = 'La hora del evento es requerida';
      return false;
    }

    if (!this.eventForm.location.trim()) {
      this.showError = true;
      this.errorMessage = 'La ubicación del evento es requerida';
      return false;
    }

    if (!this.eventForm.description.trim()) {
      this.showError = true;
      this.errorMessage = 'La descripción del evento es requerida';
      return false;
    }

    if (!this.eventForm.organizer.trim()) {
      this.showError = true;
      this.errorMessage = 'El organizador del evento es requerido';
      return false;
    }

    if (!this.eventForm.contactEmail.trim()) {
      this.showError = true;
      this.errorMessage = 'El email de contacto es requerido';
      return false;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.eventForm.contactEmail)) {
      this.showError = true;
      this.errorMessage = 'El formato del email no es válido';
      return false;
    }

    // Validar fecha futura
    const selectedDate = new Date(this.eventForm.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      this.showError = true;
      this.errorMessage = 'La fecha del evento debe ser futura';
      return false;
    }

    // Validar máximo de asistentes
    if (this.eventForm.maxAttendees && this.eventForm.maxAttendees <= 0) {
      this.showError = true;
      this.errorMessage = 'El máximo de asistentes debe ser mayor a 0';
      return false;
    }

    return true;
  }

  resetForm(): void {
    this.eventForm = {
      title: '',
      category: '',
      date: '',
      time: '',
      location: '',
      description: '',
      organizer: '',
      price: '',
      maxAttendees: 50,
      contactEmail: '',
      contactPhone: ''
    };
  }

  getMinDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  onCategoryChange(): void {
    // Lógica adicional para cambios de categoría si es necesaria
  }

  formatPrice(): void {
    if (this.eventForm.price) {
      // Formatear precio si es necesario
      const price = this.eventForm.price.trim();
      if (price && !price.includes('$') && !isNaN(Number(price))) {
        this.eventForm.price = `$${parseFloat(price).toFixed(2)}`;
      }
    }
  }
} 
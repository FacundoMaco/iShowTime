import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
  duration: string; // Nueva propiedad
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
    contactPhone: '',
    duration: '' // Inicializar
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

  // Mock de usuario autenticado
  mockUser = {
    name: 'Juan Pérez',
    email: 'juan.perez@correo.com'
  };

  eventImage: string | null = null; // Para almacenar la imagen en base64

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) { }

  onSubmit(): void {
    if (this.validateForm()) {
      this.isSubmitting = true;
      
      // Simular envío al servidor
      setTimeout(() => {
        this.saveEvent();
        this.isSubmitting = false;
      }, 1000);
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

    return true;
  }

  saveEvent(): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        // Generar ID único
        const newEvent = {
          id: Date.now(),
          ...this.eventForm,
          organizer: this.mockUser.name, // Usar el mockUser
          image: this.eventImage, // Guardar la imagen
          status: 'active',
          createdAt: new Date().toISOString()
        };

        // Obtener eventos existentes
        let existingEvents = JSON.parse(localStorage.getItem('createdEvents') || '[]');
        
        // Agregar nuevo evento
        existingEvents.push(newEvent);
        
        // Guardar en localStorage
        localStorage.setItem('createdEvents', JSON.stringify(existingEvents));
        
        this.showSuccess = true;
        
        // Limpiar formulario
        this.resetForm();
        this.eventImage = null;
        
        // Ocultar mensaje de éxito después de 3 segundos
        setTimeout(() => {
          this.showSuccess = false;
          this.router.navigate(['/eventos-personales']);
        }, 3000);
        
      } catch (error) {
        this.showError = true;
        this.errorMessage = 'Error al guardar el evento. Inténtalo de nuevo.';
      }
    }
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
      contactPhone: '',
      duration: ''
    };
  }

  getMinDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  onCategoryChange(): void {
    // Lógica adicional si es necesaria cuando cambia la categoría
  }

  formatPrice(): void {
    // Asegurar que el precio tenga formato válido
    if (this.eventForm.price && !this.eventForm.price.includes('$') && this.eventForm.price !== 'Gratis' && this.eventForm.price !== 'Entrada Libre') {
      this.eventForm.price = '$' + this.eventForm.price;
    }
  }

  // Método para manejar la imagen seleccionada
  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.eventImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
} 
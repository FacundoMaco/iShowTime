import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface Event {
  id: number;
  category: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  organizer: string;
  price: string;
  image?: string; // Nueva propiedad para imagen
  duration?: string; // Nueva propiedad para duración
}

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './events.html',
  styleUrl: './events.css'
})
export class Events {
  mockEvents: Event[] = [
    {
      id: 1,
      category: 'tecnología',
      title: 'Hackathon Innovate',
      date: '15 de Mayo 2025',
      time: '10:00 AM - 6:00 PM',
      location: 'Campus - San isidro',
      description: 'Una emocionante maratón de programación para desarrollar soluciones innovadoras.',
      organizer: 'Tech Innovators',
      price: 'Gratis'
    },
    {
      id: 2,
      category: 'Académicos',
      title: 'Charla sobre IA',
      date: '15 de Mayo 2025',
      time: '1:00 PM - 5:00 PM',
      location: 'Campus - Monte',
      description: 'Conferencia sobre los últimos avances en inteligencia artificial y su impacto en la sociedad.',
      organizer: 'Facultad de Ciencias',
      price: '$10.00'
    },
    {
      id: 3,
      category: 'tecnología',
      title: 'Taller de ciberseguridad',
      date: '15 de Mayo 2025',
      time: '10:00 AM - 6:00 PM',
      location: 'Campus - San isidro',
      description: 'Taller práctico sobre técnicas de ciberseguridad para proteger tus datos.',
      organizer: 'CyberSec Experts',
      price: '$25.00'
    },
    {
      id: 4,
      category: 'Culturales',
      title: 'Feria gastronómica',
      date: '15 de Mayo 2025',
      time: '7:00 AM - 5:00 PM',
      location: 'Campus - San Miguel',
      description: 'Un evento culinario donde podrás probar diversas delicias locales e internacionales.',
      organizer: 'Cultura y Sabor',
      price: 'Entrada Libre'
    },
    {
      id: 5,
      category: 'Deportivos',
      title: 'Taller de basquet',
      date: '15 de Mayo 2025',
      time: '7:00 PM - 9:00 PM',
      location: 'Campus - Monterrico',
      description: 'Mejora tus habilidades en el baloncesto con entrenadores profesionales.',
      organizer: 'Club Deportivo',
      price: '$15.00'
    },
    {
      id: 6,
      category: 'Académicos',
      title: 'Charla sobre literatura moderna',
      date: '15 de Mayo 2025',
      time: '9:00 AM - 5:00 PM',
      location: 'Campus - San Miguel',
      description: 'Exploración de las tendencias y autores más influyentes de la literatura contemporánea.',
      organizer: 'Círculo de Lectura',
      price: 'Gratis'
    }
  ];

  allEvents: Event[] = [];

  showConfirmation: boolean = false;
  selectedEvent: Event | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      // Leer eventos publicados desde localStorage
      const createdEvents: Event[] = JSON.parse(localStorage.getItem('createdEvents') || '[]');
      // Mezclar los eventos mock y los creados
      this.allEvents = [...createdEvents, ...this.mockEvents];
    } else {
      this.allEvents = [...this.mockEvents];
    }
  }

  attendEvent(eventId: number): void {
    if (isPlatformBrowser(this.platformId)) {
      const eventToSave = this.mockEvents.find(event => event.id === eventId);
      if (eventToSave) {
        let savedEvents: Event[] = JSON.parse(localStorage.getItem('savedEvents') || '[]');
        const eventExists = savedEvents.some(event => event.id === eventToSave.id);

        if (!eventExists) {
          savedEvents.push(eventToSave);
          localStorage.setItem('savedEvents', JSON.stringify(savedEvents));
          console.log(`Evento con ID: ${eventId} guardado.`);
          this.showConfirmation = true;
          setTimeout(() => {
            this.showConfirmation = false;
          }, 3000);
        } else {
          console.log(`Evento con ID: ${eventId} ya está guardado.`);
          // Optionally, show a different message if already saved
        }
      }
    } else {
      console.log('localStorage no disponible en este entorno.');
    }
  }

  reserveEvent(eventId: number): void {
    if (isPlatformBrowser(this.platformId)) {
      const eventToReserve = this.mockEvents.find(event => event.id === eventId);
      if (eventToReserve) {
        let reservedEvents: Event[] = JSON.parse(localStorage.getItem('reservedEvents') || '[]');
        const eventExists = reservedEvents.some(event => event.id === eventToReserve.id);

        if (!eventExists) {
          reservedEvents.push(eventToReserve);
          localStorage.setItem('reservedEvents', JSON.stringify(reservedEvents));
          console.log(`Evento con ID: ${eventId} reservado.`);
          
          // Mostrar confirmación de reserva
          this.showConfirmation = true;
          setTimeout(() => {
            this.showConfirmation = false;
          }, 3000);
        } else {
          console.log(`Evento con ID: ${eventId} ya está reservado.`);
          // Opcional: mostrar mensaje de que ya está reservado
        }
      }
    } else {
      console.log('localStorage no disponible en este entorno.');
    }
  }

  openEventDetails(event: Event): void {
    this.selectedEvent = event;
  }

  closeEventDetails(): void {
    this.selectedEvent = undefined;
  }

  showMiniSearchAlert(): void {
    alert('Búsqueda simple');
  }

  showEventDetail(event: any): void {
    alert(`Evento: ${event.title}\nFecha: ${event.date}\nOrganizador: ${event.organizer || 'N/A'}`);
  }
} 
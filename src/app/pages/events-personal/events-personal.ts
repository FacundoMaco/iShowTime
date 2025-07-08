import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

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
  status: 'active' | 'completed' | 'cancelled';
}

@Component({
  selector: 'app-events-personal',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './events-personal.html',
  styleUrl: './events-personal.css'
})
export class EventsPersonal {
  personalEvents: Event[] = [];
  showConfirmation: boolean = false;
  selectedEvent: Event | undefined;
  filterStatus: 'all' | 'active' | 'completed' | 'cancelled' = 'all';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.loadPersonalEvents();
  }

  loadPersonalEvents(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Cargar eventos guardados y reservados del localStorage
      const savedEvents: Event[] = JSON.parse(localStorage.getItem('savedEvents') || '[]');
      const reservedEvents: Event[] = JSON.parse(localStorage.getItem('reservedEvents') || '[]');
      
      // Combinar y agregar estado a los eventos
      this.personalEvents = [
        ...savedEvents.map(event => ({ ...event, status: 'active' as const })),
        ...reservedEvents.map(event => ({ ...event, status: 'active' as const }))
      ];

      // Eliminar duplicados basados en ID
      this.personalEvents = this.personalEvents.filter((event, index, self) => 
        index === self.findIndex(e => e.id === event.id)
      );
    }
  }

  get filteredEvents(): Event[] {
    if (this.filterStatus === 'all') {
      return this.personalEvents;
    }
    return this.personalEvents.filter(event => event.status === this.filterStatus);
  }

  removeEvent(eventId: number): void {
    if (isPlatformBrowser(this.platformId)) {
      // Remover de eventos guardados
      let savedEvents: Event[] = JSON.parse(localStorage.getItem('savedEvents') || '[]');
      savedEvents = savedEvents.filter(event => event.id !== eventId);
      localStorage.setItem('savedEvents', JSON.stringify(savedEvents));

      // Remover de eventos reservados
      let reservedEvents: Event[] = JSON.parse(localStorage.getItem('reservedEvents') || '[]');
      reservedEvents = reservedEvents.filter(event => event.id !== eventId);
      localStorage.setItem('reservedEvents', JSON.stringify(reservedEvents));

      // Actualizar la lista local
      this.personalEvents = this.personalEvents.filter(event => event.id !== eventId);
      
      this.showConfirmation = true;
      setTimeout(() => {
        this.showConfirmation = false;
      }, 3000);
    }
  }

  openEventDetails(event: Event): void {
    this.selectedEvent = event;
  }

  closeEventDetails(): void {
    this.selectedEvent = undefined;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'active': return 'status-active';
      case 'completed': return 'status-completed';
      case 'cancelled': return 'status-cancelled';
      default: return '';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'active': return 'Activo';
      case 'completed': return 'Completado';
      case 'cancelled': return 'Cancelado';
      default: return '';
    }
  }
} 
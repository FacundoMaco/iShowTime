import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface Event {
  id: number;
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
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  updatedAt?: string;
  attendees?: number;
  imageUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private readonly STORAGE_KEY = 'showtime_events';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // Guardar un nuevo evento
  saveEvent(eventData: Omit<Event, 'id' | 'status' | 'createdAt'>): Promise<Event> {
    return new Promise((resolve, reject) => {
      if (!isPlatformBrowser(this.platformId)) {
        reject(new Error('No disponible en el servidor'));
        return;
      }

      try {
        const newEvent: Event = {
          ...eventData,
          id: Date.now(),
          status: 'active',
          createdAt: new Date().toISOString(),
          attendees: 0
        };

        const events = this.getAllEvents();
        events.push(newEvent);
        this.saveToStorage(events);

        resolve(newEvent);
      } catch (error) {
        reject(error);
      }
    });
  }

  // Obtener todos los eventos
  getAllEvents(): Event[] {
    if (!isPlatformBrowser(this.platformId)) {
      return [];
    }

    try {
      const eventsJson = localStorage.getItem(this.STORAGE_KEY);
      return eventsJson ? JSON.parse(eventsJson) : [];
    } catch (error) {
      console.error('Error al obtener eventos:', error);
      return [];
    }
  }

  // Obtener eventos por categoría
  getEventsByCategory(category: string): Event[] {
    return this.getAllEvents().filter(event => 
      event.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Obtener eventos por organizador
  getEventsByOrganizer(organizer: string): Event[] {
    return this.getAllEvents().filter(event => 
      event.organizer.toLowerCase().includes(organizer.toLowerCase())
    );
  }

  // Obtener un evento por ID
  getEventById(id: number): Event | null {
    const events = this.getAllEvents();
    return events.find(event => event.id === id) || null;
  }

  // Actualizar un evento
  updateEvent(id: number, eventData: Partial<Event>): Promise<Event> {
    return new Promise((resolve, reject) => {
      if (!isPlatformBrowser(this.platformId)) {
        reject(new Error('No disponible en el servidor'));
        return;
      }

      try {
        const events = this.getAllEvents();
        const eventIndex = events.findIndex(event => event.id === id);
        
        if (eventIndex === -1) {
          reject(new Error('Evento no encontrado'));
          return;
        }

        events[eventIndex] = {
          ...events[eventIndex],
          ...eventData,
          updatedAt: new Date().toISOString()
        };

        this.saveToStorage(events);
        resolve(events[eventIndex]);
      } catch (error) {
        reject(error);
      }
    });
  }

  // Eliminar un evento
  deleteEvent(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!isPlatformBrowser(this.platformId)) {
        reject(new Error('No disponible en el servidor'));
        return;
      }

      try {
        const events = this.getAllEvents();
        const filteredEvents = events.filter(event => event.id !== id);
        
        if (filteredEvents.length === events.length) {
          reject(new Error('Evento no encontrado'));
          return;
        }

        this.saveToStorage(filteredEvents);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  }

  // Cambiar estado de un evento
  changeEventStatus(id: number, status: Event['status']): Promise<Event> {
    return this.updateEvent(id, { status });
  }

  // Registrar asistente a un evento
  registerAttendee(eventId: number): Promise<Event> {
    return new Promise((resolve, reject) => {
      const event = this.getEventById(eventId);
      if (!event) {
        reject(new Error('Evento no encontrado'));
        return;
      }

      if (event.maxAttendees && event.attendees && event.attendees >= event.maxAttendees) {
        reject(new Error('Evento lleno'));
        return;
      }

      const currentAttendees = event.attendees || 0;
      this.updateEvent(eventId, { attendees: currentAttendees + 1 })
        .then(resolve)
        .catch(reject);
    });
  }

  // Obtener eventos próximos (próximos 30 días)
  getUpcomingEvents(): Event[] {
    const events = this.getAllEvents();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= new Date() && eventDate <= thirtyDaysFromNow && event.status === 'active';
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  // Buscar eventos por texto
  searchEvents(query: string): Event[] {
    const events = this.getAllEvents();
    const searchTerm = query.toLowerCase();

    return events.filter(event => 
      event.title.toLowerCase().includes(searchTerm) ||
      event.description.toLowerCase().includes(searchTerm) ||
      event.organizer.toLowerCase().includes(searchTerm) ||
      event.location.toLowerCase().includes(searchTerm) ||
      event.category.toLowerCase().includes(searchTerm)
    );
  }

  // Obtener estadísticas de eventos
  getEventStats(): { total: number; active: number; upcoming: number; categories: Record<string, number> } {
    const events = this.getAllEvents();
    const categories: Record<string, number> = {};
    
    events.forEach(event => {
      categories[event.category] = (categories[event.category] || 0) + 1;
    });

    return {
      total: events.length,
      active: events.filter(e => e.status === 'active').length,
      upcoming: this.getUpcomingEvents().length,
      categories
    };
  }

  // Guardar en localStorage
  private saveToStorage(events: Event[]): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(events));
    }
  }

  // Limpiar todos los eventos (para testing)
  clearAllEvents(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.STORAGE_KEY);
    }
  }
} 
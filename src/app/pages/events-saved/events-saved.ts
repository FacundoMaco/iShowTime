import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService, Event } from '../../services/event.service';

@Component({
  selector: 'app-events-saved',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './events-saved.html',
  styleUrl: './events-saved.css'
})
export class EventsSaved implements OnInit {
  allEvents: Event[] = [];
  filteredEvents: Event[] = [];
  
  // Filtros
  searchQuery: string = '';
  selectedCategory: string = '';
  selectedStatus: string = '';
  
  // Estadísticas
  totalEvents: number = 0;
  activeEvents: number = 0;
  totalAttendees: number = 0;
  upcomingEvents: number = 0;
  
  // Mensajes
  showSuccess: boolean = false;
  showError: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  
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

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.allEvents = this.eventService.getAllEvents();
      this.applyFilters();
      this.updateStats();
    }
  }

  applyFilters(): void {
    let filtered = [...this.allEvents];

    // Filtro por búsqueda
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.organizer.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query) ||
        event.category.toLowerCase().includes(query)
      );
    }

    // Filtro por categoría
    if (this.selectedCategory) {
      filtered = filtered.filter(event =>
        event.category.toLowerCase() === this.selectedCategory.toLowerCase()
      );
    }

    // Filtro por estado
    if (this.selectedStatus) {
      filtered = filtered.filter(event => event.status === this.selectedStatus);
    }

    // Ordenar por fecha de creación (más recientes primero)
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    this.filteredEvents = filtered;
  }

  updateStats(): void {
    this.totalEvents = this.allEvents.length;
    this.activeEvents = this.allEvents.filter(e => e.status === 'active').length;
    this.totalAttendees = this.allEvents.reduce((sum, event) => sum + (event.attendees || 0), 0);
    this.upcomingEvents = this.eventService.getUpcomingEvents().length;
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onCategoryFilter(): void {
    this.applyFilters();
  }

  onStatusFilter(): void {
    this.applyFilters();
  }

  editEvent(eventId: number): void {
    // Por ahora redirigimos a la página de crear eventos
    // En el futuro se podría crear una página de edición específica
    this.router.navigate(['/crear-evento'], { 
      queryParams: { edit: eventId } 
    });
  }

  deleteEvent(eventId: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este evento? Esta acción no se puede deshacer.')) {
      this.eventService.deleteEvent(eventId)
        .then(() => {
          this.showSuccess = true;
          this.successMessage = 'Evento eliminado exitosamente';
          this.loadEvents();
          
          setTimeout(() => {
            this.showSuccess = false;
          }, 3000);
        })
        .catch((error: Error) => {
          this.showError = true;
          this.errorMessage = error.message || 'Error al eliminar el evento';
          
          setTimeout(() => {
            this.showError = false;
          }, 3000);
        });
    }
  }

  createNewEvent(): void {
    this.router.navigate(['/crear-evento']);
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'active': return 'Activo';
      case 'inactive': return 'Inactivo';
      case 'pending': return 'Pendiente';
      default: return status;
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  // Método para cambiar el estado de un evento
  changeEventStatus(eventId: number, newStatus: Event['status']): void {
    this.eventService.changeEventStatus(eventId, newStatus)
      .then(() => {
        this.showSuccess = true;
        this.successMessage = `Evento marcado como ${this.getStatusText(newStatus)}`;
        this.loadEvents();
        
        setTimeout(() => {
          this.showSuccess = false;
        }, 3000);
      })
      .catch((error: Error) => {
        this.showError = true;
        this.errorMessage = error.message || 'Error al cambiar el estado del evento';
        
        setTimeout(() => {
          this.showError = false;
        }, 3000);
      });
  }

  // Método para limpiar filtros
  clearFilters(): void {
    this.searchQuery = '';
    this.selectedCategory = '';
    this.selectedStatus = '';
    this.applyFilters();
  }

  // Método para exportar eventos (futura funcionalidad)
  exportEvents(): void {
    if (this.filteredEvents.length === 0) {
      this.showError = true;
      this.errorMessage = 'No hay eventos para exportar';
      return;
    }

    const dataStr = JSON.stringify(this.filteredEvents, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `eventos_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    
    this.showSuccess = true;
    this.successMessage = 'Eventos exportados exitosamente';
    
    setTimeout(() => {
      this.showSuccess = false;
    }, 3000);
  }
} 
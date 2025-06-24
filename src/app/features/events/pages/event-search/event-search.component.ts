import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventCardComponent } from '../../components/event-card/event-card.component';
import { SearchFiltersComponent } from '../../components/search-filters/search-filters.component';

export interface Event {
  id: string;
  title: string;
  category: 'tecnologia' | 'academicos' | 'culturales' | 'deportivos';
  date: string;
  time: string;
  location: string;
  icon: string;
  description?: string;
}

@Component({
  selector: 'app-event-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    EventCardComponent,
    SearchFiltersComponent
  ],
  templateUrl: './event-search.component.html',
  styleUrl: './event-search.component.css'
})
export class EventSearchComponent implements OnInit {
  searchTerm: string = '';
  filteredEvents: Event[] = [];
  allEvents: Event[] = [
    {
      id: '1',
      title: 'Hackathon Innovate',
      category: 'tecnologia',
      date: '15 de Mayo 2025',
      time: '10:00 AM - 6:00 PM',
      location: 'Campus - San Isidro',
      icon: 'fas fa-laptop-code'
    },
    {
      id: '2',
      title: 'Charla sobre IA',
      category: 'academicos',
      date: '15 de Mayo 2025',
      time: '1:00 PM - 5:00 PM',
      location: 'Campus - Monte',
      icon: 'fas fa-brain'
    },
    {
      id: '3',
      title: 'Taller de ciberseguridad',
      category: 'tecnologia',
      date: '15 de Mayo 2025',
      time: '10:00 AM - 6:00 PM',
      location: 'Campus - San Isidro',
      icon: 'fas fa-shield-alt'
    },
    {
      id: '4',
      title: 'Feria gastronómica',
      category: 'culturales',
      date: '15 de Mayo 2025',
      time: '7:00 AM - 5:00 PM',
      location: 'Campus - San Miguel',
      icon: 'fas fa-utensils'
    },
    {
      id: '5',
      title: 'Taller de básquet',
      category: 'deportivos',
      date: '15 de Mayo 2025',
      time: '7:00 PM - 9:00 PM',
      location: 'Campus - Monterrico',
      icon: 'fas fa-basketball-ball'
    },
    {
      id: '6',
      title: 'Charla sobre literatura moderna',
      category: 'academicos',
      date: '15 de Mayo 2025',
      time: '9:00 AM - 5:00 PM',
      location: 'Campus - San Miguel',
      icon: 'fas fa-book-open'
    }
  ];

  ngOnInit(): void {
    this.filteredEvents = [...this.allEvents];
  }

  onSearch(): void {
    this.applyFilters();
  }

  onFiltersChange(filters: { category: string; dateRange: string }): void {
    this.applyFilters(filters.category, filters.dateRange);
  }

  private applyFilters(category: string = 'todos', dateRange: string = ''): void {
    this.filteredEvents = this.allEvents.filter(event => {
      const matchesSearch = this.searchTerm === '' ||
        event.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        event.category.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesCategory = category === 'todos' ||
        event.category.toLowerCase() === category.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }

  onEventAction(action: { type: 'details' | 'save'; eventId: string }): void {
    const event = this.allEvents.find(e => e.id === action.eventId);
    if (action.type === 'details') {
      console.log('Ver detalles de:', event?.title);
      // Aquí navegarías al detalle del evento
    } else if (action.type === 'save') {
      console.log('Guardar evento:', event?.title);
      // Aquí guardarías el evento
    }
  }
}

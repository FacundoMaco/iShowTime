import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

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

export interface EventAction {
  type: 'details' | 'save';
  eventId: string;
}

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {
  @Input({ required: true }) event!: Event;
  @Output() eventAction = new EventEmitter<EventAction>();

  getCategoryDisplayName(category: string): string {
    const categoryMap: { [key: string]: string } = {
      'tecnologia': 'tecnología',
      'academicos': 'Académicos',
      'culturales': 'Culturales',
      'deportivos': 'Deportivos'
    };

    return categoryMap[category] || category;
  }

  getCategoryClass(category: string): string {
    return `category-${category}`;
  }

  onViewDetails(): void {
    this.eventAction.emit({
      type: 'details',
      eventId: this.event.id
    });
  }

  onSaveEvent(): void {
    this.eventAction.emit({
      type: 'save',
      eventId: this.event.id
    });
  }
}

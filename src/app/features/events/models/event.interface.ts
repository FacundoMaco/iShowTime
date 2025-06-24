// Event Interfaces and Types

export type EventCategory = 'tecnologia' | 'academicos' | 'culturales' | 'deportivos';

export interface Event {
  id: string;
  title: string;
  category: EventCategory;
  date: string;
  time: string;
  location: string;
  icon: string;
  description?: string;
  imageUrl?: string;
  capacity?: number;
  attendees?: number;
  price?: number;
  organizer?: string;
  tags?: string[];
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface EventAction {
  type: 'details' | 'save' | 'unsave' | 'register' | 'unregister';
  eventId: string;
  eventData?: Partial<Event>;
}

export interface FilterOptions {
  category: EventCategory | 'todos';
  dateRange: 'hoy' | 'esta-semana' | 'este-mes' | '';
  searchTerm?: string;
  location?: string;
  priceRange?: {
    min: number;
    max: number;
  };
}

export interface EventSearchParams {
  query?: string;
  category?: EventCategory | 'todos';
  dateFrom?: Date;
  dateTo?: Date;
  location?: string;
  page?: number;
  limit?: number;
  sortBy?: 'date' | 'title' | 'popularity';
  sortOrder?: 'asc' | 'desc';
}

export interface EventResponse {
  events: Event[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface CategoryInfo {
  value: EventCategory | 'todos';
  label: string;
  color: string;
  icon: string;
}

export const EVENT_CATEGORIES: CategoryInfo[] = [
  { value: 'todos', label: 'Todos', color: '#73DFE6', icon: 'fas fa-th' },
  { value: 'academicos', label: 'Académicos', color: '#5BBC70', icon: 'fas fa-graduation-cap' },
  { value: 'culturales', label: 'Culturales', color: '#FF6B6B', icon: 'fas fa-palette' },
  { value: 'deportivos', label: 'Deportivos', color: '#4ECDC4', icon: 'fas fa-running' },
  { value: 'tecnologia', label: 'Tecnología', color: '#73DFE6', icon: 'fas fa-laptop-code' }
];

export const DATE_FILTER_OPTIONS = [
  { value: 'hoy', label: 'Hoy' },
  { value: 'esta-semana', label: 'Esta semana' },
  { value: 'este-mes', label: 'Este mes' }
] as const;

import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface FilterOptions {
  category: string;
  dateRange: string;
}

@Component({
  selector: 'app-search-filters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-filters.component.html',
  styleUrl: './search-filters.component.css'
})
export class SearchFiltersComponent {
  @Output() filtersChange = new EventEmitter<FilterOptions>();

  selectedCategory: string = 'todos';
  selectedDateRange: string = '';

  categoryFilters = [
    { value: 'todos', label: 'Todos' },
    { value: 'academicos', label: 'Académicos' },
    { value: 'culturales', label: 'Culturales' },
    { value: 'deportivos', label: 'Deportivos' },
    { value: 'tecnologia', label: 'Tecnología' }
  ];

  dateFilters = [
    { value: 'hoy', label: 'Hoy' },
    { value: 'esta-semana', label: 'Esta semana' },
    { value: 'este-mes', label: 'Este mes' }
  ];

  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.emitFilters();
  }

  onDateRangeChange(dateRange: string): void {
    // Toggle selection - if same date is clicked, deselect it
    this.selectedDateRange = this.selectedDateRange === dateRange ? '' : dateRange;
    this.emitFilters();
  }

  private emitFilters(): void {
    this.filtersChange.emit({
      category: this.selectedCategory,
      dateRange: this.selectedDateRange
    });
  }

  isActiveCategoryFilter(category: string): boolean {
    return this.selectedCategory === category;
  }

  isActiveDateFilter(dateRange: string): boolean {
    return this.selectedDateRange === dateRange;
  }
}

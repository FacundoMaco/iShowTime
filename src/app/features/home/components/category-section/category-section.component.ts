import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Category {
  id: string;
  name: string;
  icon: string;
  route: string;
  color?: string;
}

@Component({
  selector: 'app-category-section',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './category-section.component.html',
  styleUrl: './category-section.component.css'
})
export class CategorySectionComponent {
  // Usando array tradicional para evitar problemas con signals en @for
  categories: Category[] = [
    {
      id: 'academicos',
      name: 'Académicos',
      icon: 'fas fa-book-open',
      route: '/eventos?categoria=academicos',
      color: '#4F46E5'
    },
    {
      id: 'culturales',
      name: 'Culturales',
      icon: 'fas fa-music',
      route: '/eventos?categoria=culturales',
      color: '#7C3AED'
    },
    {
      id: 'deportivos',
      name: 'Deportivos',
      icon: 'fas fa-trophy',
      route: '/eventos?categoria=deportivos',
      color: '#059669'
    },
    {
      id: 'tecnologicos',
      name: 'Tecnológicos',
      icon: 'fas fa-code',
      route: '/eventos?categoria=tecnologicos',
      color: '#DC2626'
    }
  ];

  get categoriesCount(): number {
    return this.categories.length;
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio {
  eventosDestacados = [
    {
      id: 1,
      titulo: 'Concierto de Rock',
      fecha: '15 de Diciembre, 2024',
      lugar: 'Estadio Nacional',
      precio: 'S/ 150',
      imagen: '🎸',
      categoria: 'Música'
    },
    {
      id: 2,
      titulo: 'Festival de Comedia',
      fecha: '20 de Diciembre, 2024',
      lugar: 'Teatro Municipal',
      precio: 'S/ 80',
      imagen: '🎭',
      categoria: 'Comedia'
    },
    {
      id: 3,
      titulo: 'Exposición de Arte',
      fecha: '25 de Diciembre, 2024',
      lugar: 'Museo de Arte Moderno',
      precio: 'S/ 50',
      imagen: '🎨',
      categoria: 'Arte'
    }
  ];

  categorias = [
    { nombre: 'Música', icono: '🎵', color: '#e74c3c' },
    { nombre: 'Teatro', icono: '🎭', color: '#3498db' },
    { nombre: 'Deportes', icono: '⚽', color: '#2ecc71' },
    { nombre: 'Arte', icono: '🎨', color: '#9b59b6' },
    { nombre: 'Comedia', icono: '😂', color: '#f39c12' },
    { nombre: 'Tecnología', icono: '💻', color: '#1abc9c' }
  ];

  estadisticas = [
    { numero: '1000+', descripcion: 'Eventos realizados' },
    { numero: '50K+', descripcion: 'Usuarios satisfechos' },
    { numero: '95%', descripcion: 'Satisfacción del cliente' },
    { numero: '24/7', descripcion: 'Soporte disponible' }
  ];

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  verEvento(eventoId: number) {
    console.log('Ver evento:', eventoId);
    // Aquí se implementaría la navegación al detalle del evento
  }

  explorarCategoria(categoria: string) {
    console.log('Explorar categoría:', categoria);
    // Aquí se implementaría el filtrado por categoría
  }
} 
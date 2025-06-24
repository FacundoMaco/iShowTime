import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  description: string;
}

interface Feature {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  features: Feature[] = [
    {
      icon: 'fas fa-calendar-check',
      title: 'Gestión Inteligente',
      description: 'Organiza y descubre eventos universitarios de manera eficiente con nuestro sistema de categorización avanzado.'
    },
    {
      icon: 'fas fa-users',
      title: 'Comunidad Estudiantil',
      description: 'Conecta con estudiantes de tu universidad y otras instituciones para compartir experiencias únicas.'
    },
    {
      icon: 'fas fa-mobile-alt',
      title: 'Acceso Universal',
      description: 'Plataforma responsive que funciona perfectamente en cualquier dispositivo, en cualquier momento.'
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Seguridad Garantizada',
      description: 'Protegemos tu información personal y garantizamos un ambiente seguro para toda la comunidad.'
    }
  ];

  stats = [
    { number: '10,000+', label: 'Estudiantes Activos' },
    { number: '500+', label: 'Eventos Organizados' },
    { number: '50+', label: 'Universidades' },
    { number: '95%', label: 'Satisfacción' }
  ];

  teamMembers: TeamMember[] = [
    {
      name: 'Bussalleu Salcedo Fabrizio',
      role: 'Estudiante de Informática',
      image: 'assets/images/team/fabrizio.jpg',
      description: 'Apasionado por el desarrollo de software y la innovación tecnológica.'
    },
    {
      name: 'Maco Rebatta Facundo Nicolas',
      role: 'Estudiante de Informática',
      image: 'assets/images/team/facundo.jpg',
      description: 'Interesado en inteligencia artificial y soluciones digitales.'
    },
    {
      name: 'Montenegro López Valentina Étoile',
      role: 'Estudiante de Informática',
      image: 'assets/images/team/valentina.jpg',
      description: 'Enfocada en diseño de interfaces y experiencia de usuario.'
    },
    {
      name: 'Sihuincha Schermuly Mireya Nicole',
      role: 'Estudiante de Informática',
      image: 'assets/images/team/mireya.jpg',
      description: 'Entusiasta de la programación y la gestión de proyectos.'
    },
    {
      name: 'Zavala Arteaga Gabriel Aldo',
      role: 'Estudiante de Informática',
      image: 'assets/images/team/gabriel.jpg',
      description: 'Dedicado a la ciberseguridad y el desarrollo web.'
    }
  ];
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TeamMember {
  nombre: string;
  imagen: string;
  rol?: string;
}

@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.css']
})
export class NosotrosComponent {
  teamMembers: TeamMember[] = [
    {
      nombre: 'Bussalleu Salcedo, Fabrizio',
      imagen: '/assets/default-avatar-B.png'
    },
    {
      nombre: 'Maco Rebatta, Facundo Nicolás',
      imagen: '/assets/default-avatar-F.png'
    },
    {
      nombre: 'Zavala Arteaga, Gabriel Aldo',
      imagen: '/assets/default-avatar-G.png'
    },
    {
      nombre: 'Sihuincha Schermuly, Mireya Nicole',
      imagen: '/assets/default-avatar-M.png'
    },
    {
      nombre: 'Montenegro López, Valentina Étoile',
      imagen: '/assets/default-avatar-V.png'
    }
  ];
} 
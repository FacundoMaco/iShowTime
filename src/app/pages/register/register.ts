import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  nombre: string = '';
  apellido: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  terminos: boolean = false;
  cuentaCreada: boolean = false;

  crearCuenta() {
    // Aquí podrías agregar lógica de validación o integración con backend
    this.cuentaCreada = true;
  }
}

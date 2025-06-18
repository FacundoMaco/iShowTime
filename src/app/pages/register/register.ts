import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  // Propiedades para el formulario de registro (simuladas)
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  passwordMismatchError: boolean = false;

  constructor(private router: Router) { }

  onSubmitRegister(): void {
    this.passwordMismatchError = false;

    if (this.password !== this.confirmPassword) {
      this.passwordMismatchError = true;
      return;
    }

    // Aquí iría la lógica de registro real
    // Por ahora, solo simulamos un registro exitoso y redirigimos
    console.log('Simulando registro de:', this.email);
    this.router.navigate(['/register-confirmation']);
  }
}

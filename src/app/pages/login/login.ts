import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  correo: string = '';
  password: string = '';
  showPass: boolean = false;
  loading: boolean = false;
  error: string = '';

  constructor(private router: Router) {}

  onLogin() {
    if (!this.correo || !this.password) {
      this.error = 'Por favor completa todos los campos';
      return;
    }

    this.loading = true;
    this.error = '';

    // Simular proceso de autenticación
    setTimeout(() => {
      try {
        // Aquí iría la lógica de autenticación real
        console.log('Login attempt:', { correo: this.correo, password: this.password });
        
        // Por ahora, redirigir al inicio
        this.router.navigate(['/inicio']);
      } catch (error) {
        console.error('Error en login:', error);
        this.error = 'Error al iniciar sesión. Inténtalo de nuevo.';
      } finally {
        this.loading = false;
      }
    }, 1500);
  }

  clearError() {
    this.error = '';
  }
} 
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
  loading: boolean = false;
  errores: string[] = [];

  crearCuenta() {
    this.errores = [];
    
    // Validaciones
    if (!this.nombre.trim()) {
      this.errores.push('El nombre es requerido');
    }
    
    if (!this.apellido.trim()) {
      this.errores.push('El apellido es requerido');
    }
    
    if (!this.email.trim()) {
      this.errores.push('El email es requerido');
    } else if (!this.validarEmail(this.email)) {
      this.errores.push('Ingresa un email válido');
    }
    
    if (!this.password) {
      this.errores.push('La contraseña es requerida');
    } else if (this.password.length < 8) {
      this.errores.push('La contraseña debe tener al menos 8 caracteres');
    }
    
    if (this.password !== this.confirmPassword) {
      this.errores.push('Las contraseñas no coinciden');
    }
    
    if (!this.terminos) {
      this.errores.push('Debes aceptar los términos y condiciones');
    }
    
    if (this.errores.length > 0) {
      return;
    }
    
    this.loading = true;
    
    // Simular creación de cuenta
    setTimeout(() => {
      try {
        console.log('Cuenta creada:', {
          nombre: this.nombre,
          apellido: this.apellido,
          email: this.email
        });
        this.cuentaCreada = true;
      } catch (error) {
        console.error('Error al crear cuenta:', error);
        this.errores.push('Error al crear la cuenta. Inténtalo de nuevo.');
      } finally {
        this.loading = false;
      }
    }, 2000);
  }

  private validarEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email) && email.length <= 254; // RFC 5321 limit
  }

  limpiarErrores() {
    this.errores = [];
  }
}
